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
export const purchaseBurger = (orderData, idToken) => dispatch => {
  dispatch(purchaseBurgerStart());
  const queryParams = "?auth=" + idToken;
  axios.post('/orders.json' + queryParams, orderData)
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
export const fetchingOrdersSuccess = (orders) => ({type: actionTypes.FETCHING_ORDERS_SUCCESS, orders: orders});
export const fetchingOrdersFail = (error) => ({type: actionTypes.FETCHING_ORDERS_FAIL, error: error});
export const fetchingOrdersStart = () => ({type: actionTypes.FETCHING_ORDERS_START});
export const fetchingOrders = (idToken, userId) => dispatch => {
  dispatch(fetchingOrdersStart());
  const queryParams = "?auth=" + idToken + '&orderBy="userId"&equalTo="' + userId + '"' ;
  axios.get('/orders.json' + queryParams).then(res => {

    const fetchedOrders = [];

    for (let key in res.data) {

      fetchedOrders.push({
        ...res.data[key],
        id: key
      });
    }
    dispatch(fetchingOrdersSuccess(fetchedOrders.reverse()));

  }).catch(err => {
    dispatch(fetchingOrdersFail(err));
  });

}
export const canMakeOrder = () => ({type:actionTypes.CAN_MAKE_ORDER});
