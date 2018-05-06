import * as actionType from './actionType';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 0.25,
}

const INGREDIENT_PRICES = {

    salad: 0.25,
    bacon: 0.5,
    cheese: 0.25,
    meat: 0.5
};


const reducer = (state = initialState, action) => {

  switch (action.type) {

    case actionType.ADD_INGREDIENT:
      return {
        ...state, ingredients: {
          //deep clone object
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      }
    case actionType.REMOVE_INGREDIENT:
      return {

        ...state, ingredients: {
          //deep clone object
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      }
    case actionType.RESET_INGREDIENTS:
      return initialState;

    default:
      return state;

  }

};

export default reducer;
