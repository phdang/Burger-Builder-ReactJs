import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
  ingredientPrices: null,
  totalPrice: null,
  error: false
}

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case actionTypes.ADD_INGREDIENT:
      return {
        ...state, ingredients: {
          //deep clone object
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + state.ingredientPrices[action.ingredientName]
      }
    case actionTypes.REMOVE_INGREDIENT:
      return {

        ...state, ingredients: {
          //deep clone object
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - state.ingredientPrices[action.ingredientName]
      }
    case actionTypes.RESET_INGREDIENTS:
      return initialState;

    case actionTypes.SET_INGREDIENTS:
      return {...state, ingredients: {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat

      }, error: false};
    case actionTypes.SET_INGREDIENT_PRICES:
      return {...state, ingredientPrices: action.prices, totalPrice: action.prices.starter};

    case actionTypes.SET_INGREDIENTS_FAIL:
      return {...state, error: true};

    default:
      return state;

  }

};

export default reducer;
