import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {

  salad: 0.25,
  cheese: 0.25,
  meat: 0.5,
  bacon: 0.5
}

class BurgerBuilder extends Component {

    state = {

      ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0,


      },

      totalPrice: 0.25,
      purchaseable: false,
      purchasing: false
    }

    purchaseHandler = () => {

      this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {

      this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {

      this.setState({purchasing: false});

      alert('Purchase is gonna proceed soon!');

    }

    updatePurchaseable(ingredients) {

      const sumIngredientAmount = Object.keys(ingredients).map( igKey => {

        return ingredients[igKey];

      }).reduce((sum,el) => sum + el, 0);

      this.setState({purchaseable: sumIngredientAmount > 0});

    }

    addIngredientHandler = (type) => {

      const oldCount = this.state.ingredients[type];
      const updatedCount = oldCount + 1;
      const updatedIngredients = {...this.state.ingredients}
      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const updatedPrice = oldPrice + priceAddition;
      this.setState({totalPrice: updatedPrice, ingredients: updatedIngredients})
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
      this.setState({totalPrice: updatedPrice, ingredients: updatedIngredients})
      this.updatePurchaseable(updatedIngredients);
    }

    render() {

      const disabledInfo = {...this.state.ingredients};

      for (let key in disabledInfo) {

        disabledInfo[key] = disabledInfo[key] === 0;
      }

      return (

        <Aux>

          <Modal
            show={this.state.purchasing}
            modalClosed={this.purchaseCancelHandler}
            styles={this.state.purchasing ? {transform: 'translateY(0)'} : {transform: 'translateY(-100vh)', opacity: '0'}}>

            <OrderSummary

              ingredients={this.state.ingredients}
              cancelOrder={this.purchaseCancelHandler}
              continueOrder={this.purchaseContinueHandler}
              totalPrice={this.state.totalPrice}>

            </OrderSummary>

          </Modal>

          <Burger ingredients={this.state.ingredients}/>

          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            totalPrice={this.state.totalPrice.toFixed(2)}
            purchaseable={this.state.purchaseable}
            purchasing={this.purchaseHandler}
            />

        </Aux>
      );
    }
}

export default BurgerBuilder;
