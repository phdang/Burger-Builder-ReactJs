import React from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends React.Component {

  componentDidMount() {

    this.props.onFetchingOrders(this.props.idToken, this.props.userId);

  }

  render() {

    let orders = <Spinner/>;

    if (!this.props.loading) {

      orders = this.props.orders.map(order => {
        return (<Order key={order.id} price={order.price} ingredients={order.ingredients} purchasedAt={order.purchased_at}/>);
      });

    }

    return (<div>

      {orders}

    </div>);
  }
}
const mapStateToProps = state => {
  return {orders: state.order.orders, loading: state.order.loading, idToken: state.auth.idToken, userId: state.auth.localId}
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchingOrders: (idToken, userId) => dispatch(actions.fetchingOrders(idToken, userId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
