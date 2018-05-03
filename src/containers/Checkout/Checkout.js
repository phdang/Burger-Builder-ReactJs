import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {

  state = {
    ingredients: null,
    price: 0
  }

  componentWillMount() {

    const query = new URLSearchParams(this.props.location.search);

    const ingredients = {};

    let price = 0;

    //convert search params in url into array [salad: '1']

    for (let param of query.entries()) {

      //console.log(query.entries(), param);
      if (param[0] === 'price') {

        price = param[1];

      } else {

        ingredients[param[0]] = +param[1];

      }
      //convert '1' string to 1 number by adding + sign
    }

    this.setState({ingredients: ingredients, price: price});
  }
  render () {

    return(

      <div>

        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={() => this.props.history.goBack()}
          checkoutContinued={() => this.props.history.replace('/checkout/contact-data')}
          />
        <Route path={this.props.match.path + '/contact-Data'} render={(props) => <ContactData {...props} ingredients={this.state.ingredients} price={this.state.price}/>} />
      </div>
    );

  }
}

export default Checkout;
