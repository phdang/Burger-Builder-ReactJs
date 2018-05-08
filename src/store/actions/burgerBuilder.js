import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const addIngredient = name => ({type: actionTypes.ADD_INGREDIENT, ingredientName: name});
export const removeIngredient = name => ({type: actionTypes.REMOVE_INGREDIENT, ingredientName: name});
export const resetIngredients = ()  => ({type: actionTypes.RESET_INGREDIENTS});
const setIngredients = (ingredients) => ({type: actionTypes.SET_INGREDIENTS, ingredients: ingredients});
export const setIngredientPrices = (prices) => ({type: actionTypes.SET_INGREDIENT_PRICES, prices: prices});
export const setIngredientFail = () => ({type: actionTypes.SET_INGREDIENTS_FAIL});
export const fetchingIngredients = () => dispatch => {
  axios.get('/ingredients_price.json')
  .then(res => {
    dispatch(setIngredientPrices(res.data));
  })
  .catch(error => {
    dispatch(setIngredientFail());
  });


  axios.get('/ingredients.json')

  .then(res => {
    dispatch(setIngredients(res.data));
  })

  .catch(error => {

    dispatch(setIngredientFail());

  })
};
