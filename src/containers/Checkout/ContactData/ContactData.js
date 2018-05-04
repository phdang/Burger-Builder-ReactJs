import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends React.Component {

  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {required: true},
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {required: true, minLength: 6},
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Zip Code'
        },
        value: '',
        validation: {required: true, minLength: 5, maxLength: 5},
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {required: true, minLength:2},
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {required: true, email: true},
        valid: false,
        touched: false
      },
      mobile: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Mobile'
        },
        value: '',
        validation: {required: true, minLength: 8, maxLength: 13},
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [

            {
            value: 'fastest',
            displayValue: 'Fatest'
            },

            {
              value: 'cheapest',
              displayValue: 'Cheapest'
            }
                    ]
        },
        value: 'fatest',
        validation: {},
        valid: true,
      }
    },
    ingredients: null,
    formIsValid: false,
    loading: false
  }
  // value is a string or number, rules is an object
  checkValidity = (value, rules) => {

    let isValid = true;

    if (!rules) {

      return true;
    }

    if (rules.required) {

      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {

      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {

      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.email) {

          //Check valid email

          var re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      isValid = re.test(String(value)) && isValid;
    }

    return isValid;

  }

  inputChangedHandler = (event, inputIndentifer) => {

      // copy deeply through layer cause it's still referenced deeply

      const updatedOrderForm = {...this.state.orderForm};
      const updatedFormElement = {...updatedOrderForm[inputIndentifer]};
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
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
    this.setState({loading: true});

    const formData = {};

    for (let formElementId in this.state.orderForm) {

        formData[formElementId] = this.state.orderForm[formElementId].value;

    }

    const order = {

      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData,
      purchased_at: Date().toString(),
    }

    axios.post('/orders.json', order)
    .then(response => {

        this.setState({loading: false});
        // include history object
        //console.log(this.props);
        this.props.history.push('/');

    })
    .catch(error => {

        this.setState({loading: false});

    });
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

    if (!this.state.loading) {

      form = <form onSubmit={this.orderHandler}>

        {formElementArray.map(formElement => {

          if (!formElement.config.valid && formElement.config.touched) {

            errorArray.push({fieldInValid: formElement.id});
          }

          return (
            <Input key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} invalid={!formElement.config.valid} shouldVadidate={formElement.config.touched} changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
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

export default ContactData;
