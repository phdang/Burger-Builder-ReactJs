import React from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class Orders extends React.Component {

  state = {
    orders: [],
    loading: true
  }
  componentDidMount() {

    axios.get('/orders.json').then(res => {

      const fetchedOrders = [];

      for (let key in res.data) {

        fetchedOrders.push({
          ...res.data[key],
          id: key
        });
      }

      this.setState({orders: fetchedOrders, loading: false});

    }).catch(err => {

        this.setState({loading: false});
    });

  }

  render () {

    const orders = this.state.orders.map(order => {
      return(

        <Order key={order.id} price={order.price} ingredients={order.ingredients} purchasedAt={order.purchased_at} />
      );
    });

    return(
      <div>

          {orders}

      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
