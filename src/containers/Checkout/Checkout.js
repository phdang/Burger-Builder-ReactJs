import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import Modal from '../../components/UI/Modal/Modal';
class Checkout extends Component {

  state = {
    ingredients: null,
    purchasing: false,
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

  cancelOrderHanlder = (event) => {

    event.preventDefault();

    this.setState({purchasing: false})
  }

  render () {

    const styleStardard = {backgroundColor: 'transparent', border: 'none', boxShadow: 'none', top: '10%'};

    const styleAppear = { ...styleStardard, transform: 'translateY(0)'};

    const styleDisappear = { ...styleStardard, transform: 'translateY(-100vh)', opacity: '0'};

    return(

      <div>



          <CheckoutSummary
            ingredients={this.state.ingredients}
            checkoutCancelled={() => this.props.history.goBack()}
            checkoutContinued={() => {
              //
              this.setState({purchasing: true});

            }}
            />
            <Modal
              show={this.state.purchasing}
              modalClosed={this.cancelOrderHanlder}
              styles={this.state.purchasing ? styleAppear : styleDisappear }>

              <ContactData {...this.props}  ingredients={this.state.ingredients} price={this.state.price} cancelOrder={this.cancelOrderHanlder} />


                {/*<Route path={this.props.match.path + '/contact-Data'} render={(props) => <ContactData {...props}  ingredients={this.state.ingredients} price={this.state.price}/>} /> */}

            </Modal>


      </div>
    );

  }
}

export default Checkout;
