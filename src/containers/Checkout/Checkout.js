import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
class Checkout extends Component {

  render () {

    return(

      <div>

        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={() => this.props.history.goBack()}
          checkoutContinued={() => this.props.history.replace('/checkout/contact-data')}
          />
        <Route path={this.props.match.path + '/contact-Data'} component={ContactData} />
      </div>
    );

  }
}

const mapStateToProps = state => {

  return {
    ings: state.ingredients
  }

}

export default connect(mapStateToProps)(Checkout);
