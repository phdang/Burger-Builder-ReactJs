import * as actionTypes from '../actions/actionTypes';
import updateState from '../utilities/utilities';
const initialState = {
  ingredients: null,
  ingredientPrices: null,
  totalPrice: null,
  error: false
}

const reducer = (state = initialState, action) => {



  switch (action.type) {

    case actionTypes.ADD_INGREDIENT:

      const updatedAddIngredients = updateState(state.ingredients, {

        [action.ingredientName]: state.ingredients[action.ingredientName] + 1

      });

      const updatedAddState = updateState(state, {

        ingredients: updatedAddIngredients,

        totalPrice: state.totalPrice + state.ingredientPrices[action.ingredientName]

      });

      return updatedAddState;

    case actionTypes.REMOVE_INGREDIENT:

      const updatedRemoveIngredients = updateState(state.ingredients, {

        [action.ingredientName]: state.ingredients[action.ingredientName] - 1

      });

      const updatedRemoveState = updateState(state, {

        ingredients: updatedRemoveIngredients,

        totalPrice: state.totalPrice - state.ingredientPrices[action.ingredientName]

      });

      return updatedRemoveState;

    case actionTypes.RESET_INGREDIENTS:

      return initialState;

    case actionTypes.SET_INGREDIENTS:

      const updatedSetIngredients = {

        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese: action.ingredients.cheese,
        meat: action.ingredients.meat

      }

      const updatedSetIngredientsState = updateState(state, {

        ingredients: updatedSetIngredients,

        error: false

      })

      return updatedSetIngredientsState;

    case actionTypes.SET_INGREDIENT_PRICES:

      const updatedSetIngredientPricesState = updateState(state, {

        ingredientPrices: action.prices,
        totalPrice: action.prices.starter

      });

      return updatedSetIngredientPricesState

    case actionTypes.SET_INGREDIENTS_FAIL:

      return updateState(state, {error: true});

    default:
    
      return state;

  }

};

export default reducer;
