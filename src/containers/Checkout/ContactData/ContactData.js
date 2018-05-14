import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import orderForm from './orderForm/orderForm';
import { connect } from 'react-redux';
import * as actionType from '../../../store/actions/actionTypes';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';
import { checkValidity } from '../../../shared/utilities'
class ContactData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      orderForm: orderForm,
      ingredients: null,
      formIsValid: false,
      loading: false
    };
  }

  componentDidMount() {

    window.scrollTo(0,document.body.scrollHeight);
    document.getElementsByTagName('input')[0].focus();

  }

  inputChangedHandler = (event, inputIndentifer) => {

      // copy deeply through layer cause it's still referenced deeply

      const updatedOrderForm = {...this.state.orderForm};
      const updatedFormElement = {...updatedOrderForm[inputIndentifer]};
      const valueInput = event.target.value;
      updatedFormElement.value = valueInput;

      //Zipcode must contain a number with 5 digits and the first digit is != 0

      if (inputIndentifer === 'zipcode') {

        updatedFormElement.value = valueInput.match(/^[1-9][0-9]{0,4}/) !== null ? String(valueInput.match(/^[1-9][0-9]{0,4}/)) : '';

      }

      updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
      let touched = updatedFormElement.touched;
      if (!touched) {
        touched = true;
        updatedFormElement.touched = touched;
      }
      updatedOrderForm[inputIndentifer] = updatedFormElement;
      let formIsValid = true;
      for (let inputIndentifer in updatedOrderForm) {

        formIsValid = formIsValid && updatedOrderForm[inputIndentifer].valid;

      }

      this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};

    for (let formElementId in this.state.orderForm) {

        formData[formElementId] = this.state.orderForm[formElementId].value;

    }

    const order = {

      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
      purchased_at: Date().toString(),
    }

    this.props.onOrderBurger(order, this.props.idToken);

  }

  render () {

    let form = <Spinner />;

    let formElementArray = [];

    for (let key in this.state.orderForm) {

      formElementArray.push({

        id: key,
        config: this.state.orderForm[key]

      })
    }

    let validationErrors = null;

    const errorArray = [];

    if (!this.props.loading) {

      form = <form onSubmit={this.orderHandler}>

        {formElementArray.map(formElement => {

          if (!formElement.config.valid && formElement.config.touched) {

            errorArray.push({fieldInValid: formElement.id});
          }

          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value} invalid={!formElement.config.valid}
              shouldVadidate={formElement.config.touched}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
          );
        })}

        <Button disabled={!this.state.formIsValid} btnType="Success" clicked={this.orderHandler}>ORDER</Button>

      </form>
    }

    if (errorArray.length > 0) {

      validationErrors = <ul className={classes.ValidationErrors}>

                            {errorArray.map(type => {

                              return (

                                <li className={classes.ErrorLists} key={type.fieldInValid}>Please fill in  a valid {type.fieldInValid}</li>

                              );
                            })}

                        </ul>

    }

    return(

      <div className={classes.ContactData}>

        {validationErrors}

        <h4> Enter your Contact Data</h4>

        {form}

      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    idToken: state.auth.idToken,
    userId: state.auth.localId
  }
}

const mapDispatchToProps = dispatch => {

  return {

    onResetIngredients: () => dispatch({type: actionType.RESET_INGREDIENTS}),
    onOrderBurger: (orderData, idToken) => dispatch(orderActions.purchaseBurger(orderData, idToken))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
