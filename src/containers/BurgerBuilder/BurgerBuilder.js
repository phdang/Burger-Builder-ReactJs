import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {

  salad: 0.25,
  cheese: 0.25,
  meat: 0.5,
  bacon: 0.5
}

class BurgerBuilder extends Component {

    state = {

      ingredients: null,
      totalPrice: 0.25,
      purchaseable: false,
      purchasing: false,
      loading: false,
      error: false
    }

    componentDidMount() {


      axios.get('/ingredients.json')

      .then(response => {
        this.setState({ingredients: response.data});
      })

      .catch(error => {

          this.setState({error: true});

      });
    }

    purchaseHandler = () => {

      this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {

      this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {

      this.setState({loading: true});

      const order = {

        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
        customer: {
          name: 'Dang',
          address: {
            street: 'TestStreet1',
            zipcode: '72000',
            country: 'Vietnam'
          },
          email: 'test@example.com',
          mobile: '08899223312'
        },
        deliveryMethod: 'fastest'
      }

      axios.post('/orders.json', order)
      .then(response => {

          this.setState({loading: false, purchasing: false});

      })
      .catch(error => {

          this.setState({loading: false, purchasing: false});

      });


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

      let orderSummary = null
      let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
      if (this.state.ingredients) {
        burger = <Aux>

                  <Burger ingredients={this.state.ingredients}/>

                  <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    totalPrice={this.state.totalPrice.toFixed(2)}
                    purchaseable={this.state.purchaseable}
                    purchasing={this.purchaseHandler}
                  />
                </Aux>;
        orderSummary =          <OrderSummary

                                  ingredients={this.state.ingredients}
                                  cancelOrder={this.purchaseCancelHandler}
                                  continueOrder={this.purchaseContinueHandler}
                                  totalPrice={this.state.totalPrice}>

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

export default withErrorHandler(BurgerBuilder, axios) ;
