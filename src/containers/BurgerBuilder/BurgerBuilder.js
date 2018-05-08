import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

let INGREDIENT_PRICES = null;

class BurgerBuilder extends Component {

    state = {

      purchaseable: false,
      purchasing: false,
      //Temporarily set to true to use redux basics
    }

    componentDidMount() {

      //Use redux  thunk

      if (this.props.purchased) {

        this.props.onResetIngredients();

        this.props.onResetOrder();

        this.props.onFetchingIngredients();

      }

      if (!this.props.ings) {

        this.props.onFetchingIngredients();
      }

    }

    purchaseHandler = () => {

      this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {

      this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {

      this.props.history.push({

        pathname: '/checkout'

      });
    }

    updatePurchaseable(ingredients = this.props.ings) {

      const sumIngredientAmount = Object.keys(ingredients).map( igKey => {

        return ingredients[igKey];

      }).reduce((sum,el) => sum + el, 0);

      return sumIngredientAmount > 0;

    }

    addIngredientHandler = (type) => {

      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {...this.state.ingredients}
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const updatedPrice = oldPrice + priceAddition;
      this.setState({ingredients:updatedIngredients, totalPrice: updatedPrice})
      this.updatePurchaseable(updatedIngredients);

    }

    removeIngredientHandler = (type) => {

      const oldCount = this.state.ingredients[type];
      const updatedCount = Math.max(oldCount - 1, 0);
      const updatedIngredients = {...this.state.ingredients}
      updatedIngredients[type] = updatedCount;
      const priceDeduction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const updatedPrice = oldPrice - priceDeduction;
      this.setState({ingredients:updatedIngredients, totalPrice: updatedPrice})
      this.updatePurchaseable(updatedIngredients);
    }

    render() {

      const disabledInfo = {...this.props.ings};

      //use only for having errors;

      const styleFontError = {textAlign: 'center', fontStyle: 'italic', fontWeight: 'bold', fontSize: '1.2rem'};

      for (let key in disabledInfo) {

        disabledInfo[key] = disabledInfo[key] === 0;
      }

      let orderSummary = null;
      let burger = this.props.error ?

            <Aux>

              <p style={styleFontError}>Ingredients can't be loaded! We're sorry for this inconvenience. We will fix this soon!</p>
              <p style={styleFontError}>We'll be back. Expect us !</p>

            </Aux>

            :

            <Spinner />

    if (this.props.ings && this.props.price) {
      burger = <Aux>

                  <Burger ingredients={this.props.ings}/>

                  <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    totalPrice={this.props.price}
                    purchaseable={this.updatePurchaseable() /* funtion with () 'cause it needs to be executed once the component is rendered */}
                    purchasing={this.purchaseHandler}
                  />
                </Aux>;
        orderSummary =          <OrderSummary

                                  ingredients={this.props.ings}
                                  cancelOrder={this.purchaseCancelHandler}
                                  continueOrder={this.purchaseContinueHandler}
                                  totalPrice={this.props.price}>

                                </OrderSummary>;

        }

      if (this.state.loading) {

        orderSummary = <Spinner />;

      }

      return (

        <Aux>

          <Modal
            show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}
            styles={this.state.purchasing ? {transform: 'translateY(0)'} : {transform: 'translateY(-100vh)', opacity: '0'}}>

            {orderSummary}

          </Modal>

          {burger}

        </Aux>
      );
    }
}

const mapStateToProps = state => {
  return {

    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    purchased: state.order.purchased
  }
}

const mapDispatchToProps = dispatch => {

  return {

    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onFetchingIngredients: () => dispatch(actions.fetchingIngredients()),
    onResetIngredients: () => dispatch(actions.resetIngredients()),
    onResetOrder: () => dispatch(actions.resetOrder())

  }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
