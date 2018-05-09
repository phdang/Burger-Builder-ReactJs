import * as actionTypes from '../actions/actionTypes';
import updateState from '../utilities/utilities';

const initialState = {

  orders: [],
  loading: false,
  purchased: false

}

const reducer = (state = initialState, action) => {

    switch (action.type) {

      case actionTypes.PURCHASE_ORDER_SUCCESS:

        const newOrder = {...action.orderData, id: action.orderId};

        const updatedPurchaseOrderSuccessState = updateState(state, {

          loading: false,
          orders: [...state.orders, newOrder],
          purchased: true

        });

        return updatedPurchaseOrderSuccessState;

      case actionTypes.PURCHASE_ORDER_FAIL:
        const updatedPurchaseOrderFailState = updateState(state, {

          loading: false,
          purchased: false

        });

        return updatedPurchaseOrderFailState;

      case actionTypes.PURCHASE_ORDER_START:

        return updateState(state, {

          loading: true,
          purchased: false

        });

      case actionTypes.PURCHASE_INIT:

        return updateState(state, {purchased: false});

      case actionTypes.RESET_ORDER:

        return initialState;

      case actionTypes.FETCHING_ORDERS_START:

        return updateState(state, {loading: true});

      case actionTypes.FETCHING_ORDERS_SUCCESS:

        return updateState(state, {

          orders: action.orders,
          loading: false

        });

      case actionTypes.FETCHING_ORDERS_FAIL:

        return updateState(state, {loading: false});

      default:
      
        return state;
    }
}
export default reducer;
