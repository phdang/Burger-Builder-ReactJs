import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
class Checkout extends Component {

  componentWillMount() {

    this.props.onInitPurchase(this.props.resetIngredients);
  }

  render () {

    let summary = <Redirect to="/" />;

  if (this.props.ings) {
    const redirect = this.props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {redirect}
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancelled={() => this.props.history.goBack()}
          checkoutContinued={() => this.props.history.replace('/checkout/contact-data')}
          />
        <Route path={this.props.match.path + '/contact-Data'} component={ContactData} />
      </div>
  );
  }

    return summary;

  }
}

const mapStateToProps = state => {

  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  }

}

const dispatchToProps = dispatch  => {

  return {
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  }
}

export default connect(mapStateToProps, dispatchToProps)(Checkout);
