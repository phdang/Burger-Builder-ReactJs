import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const purchaseOrderSuccess = (id, data) => {

  return {
    type: actionTypes.PURCHASE_ORDER_SUCCESS,
    orderId: id,
    orderData: data,
  };
};
export const purchaseOrderFail = () => (error) => ({type: actionTypes.PURCHASE_ORDER_FAIL, error: error});
const purchaseBurgerStart = () => ({type: actionTypes.PURCHASE_ORDER_START});
export const purchaseBurger = (orderData) => dispatch => {
  dispatch(purchaseBurgerStart())
  axios.post('/orders.json', orderData)
  .then(response => {

      dispatch(purchaseOrderSuccess(response.data.name, orderData));
      // include history object
      //console.log(this.props);
      //Reset all the ingredients before forwarding user back to home page
      //this.props.onResetIngredients();
      //this.props.history.push('/');

  })
  .catch(error => {

      dispatch(purchaseOrderFail())

  });

};
export const purchaseInit = () => ({type: actionTypes.PURCHASE_INIT});
export const resetOrder = () => ({type: actionTypes.RESET_ORDER});
