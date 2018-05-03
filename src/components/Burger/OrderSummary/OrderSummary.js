
import React, {Component} from 'react';

import Aux from '../../../hoc/Aux/Aux';

import Button from '../../UI/Button/Button';

import PropTypes from 'prop-types';
//convert to class to debug performance recommended using arrow func
class OrderSummary extends Component {

  // componentWillUpdate() {
  //
  //   console.log('OrderSummary inside componentWillUpdate');
  // }

  ingredientSummary = (ingredients) => Object.keys(ingredients).map(igKey => {

      return(

        <li key={igKey}>

            <span style={{textTransform: 'capitalize'}}>

              {igKey}: {this.props.ingredients[igKey]}

            </span>
        </li>

      );

  });


  render() {

  return(

    <Aux>

      <h3>Your Order</h3>

      <p>A delicious burger with the following ingredients:</p>

      <ul>

        {this.ingredientSummary(this.props.ingredients)}


      </ul>

      <p><strong>Total Price: ${this.props.totalPrice}</strong></p>

      <p>Continue to checkout?</p>

      <Button btnType="Danger" clicked={this.props.cancelOrder}>CANCEL</Button>

      <Button btnType="Success" clicked={this.props.continueOrder}>CONTINUE</Button>

    </Aux>

  );
  }
}

OrderSummary.propTypes = {

  ingredients: PropTypes.object.isRequired,
  totalPrice: PropTypes.number.isRequired,
  continueOrder: PropTypes.func,
  cancelOrder: PropTypes.func

};

export default OrderSummary;
