import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utilities'
const controls = {

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
  password: {
    elementType: 'input',
    elementConfig: {
      type: 'password',
      placeholder: 'Your Password'
    },
    value: '',
    validation: {required: true, minLength: 6},
    valid: false,
    touched: false
  }

};

class Auth extends Component {

  state = {
    forms: controls,
    pass: null,
    formisValid: false,
    isSignup: false
  };

  turnToSignup = (event) => {
    event.preventDefault();
    const newControls = {...controls,
      confirm: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Confirm Password'
        },
        value: '',
        validation: {required: true, confirmed: true},
        valid: false,
        touched: false
      }}
    this.setState({forms: newControls, isSignup: true});
  }

  turnToSignin = (event) => {
    event.preventDefault();
    const newControls = {...controls};
    this.setState({forms: newControls, isSignup: false});
  }



  inputChangedHandler = (event, inputIndentifer) => {

      // copy deeply through layer cause it's still referenced deeply

      const updatedForm = {...this.state.forms};
      const updatedFormElement = {...updatedForm[inputIndentifer]};
      const valueInput = event.target.value;
      let pass = this.state.pass;
      updatedFormElement.value = valueInput;

      updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation, pass);
      let touched = updatedFormElement.touched;
      if (!touched) {
        touched = true;
        updatedFormElement.touched = touched;
      }
      updatedForm[inputIndentifer] = updatedFormElement;

      let formIsValid = true;

      for (let inputIndentifer in updatedForm) {

        formIsValid = formIsValid && updatedForm[inputIndentifer].valid;

      }

      if (inputIndentifer === 'password' && this.state.isSignup) {

         pass = valueInput;
         updatedForm.confirm.value = '';
         formIsValid = false;
       }
      if (this.props.error) {

        this.props.onResetErrorForm();

      }

      this.setState({forms: updatedForm, formIsValid: formIsValid, pass: pass});
  }

  submitHandler = (event) => {

    event.preventDefault();

    const formData = {};

    for (let formElementId in this.state.forms) {

        formData[formElementId] = this.state.forms[formElementId].value;

    }

    const credentials = {email: formData.email, password: formData.password, returnSecureToken: true};
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCqKN9NfqyrdH1bMn8gOR_wQPMdel573Fc';

    if (this.state.isSignup) {

      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCqKN9NfqyrdH1bMn8gOR_wQPMdel573Fc';

    }

    this.props.onSubmitForm(url, credentials);

  }

  render() {

    let formElementArray = [];

    for (let key in this.state.forms) {

      formElementArray.push({

        id: key,
        config: this.state.forms[key]

      })
    }

    let validationErrors = null;

    const errorArray = [];

    let form = <Spinner />

    if (!this.props.loading) {

      form = <form>

       {formElementArray.map(formElement => {

         if (!formElement.config.valid && formElement.config.touched) {

           errorArray.push({fieldInValid: formElement.id});
         }


         return (
           <Input
             key={formElement.id}
             label={formElement.id}
             elementType={formElement.config.elementType}
             elementConfig={formElement.config.elementConfig}
             value={formElement.config.value} invalid={!formElement.config.valid}
             shouldVadidate={formElement.config.touched}
             changed={(event) => this.inputChangedHandler(event, formElement.id)}
           />
         );
       })}



         {!this.state.isSignup ?

           <div>
             <Button disabled={!this.state.formIsValid} btnType="Success" clicked={this.submitHandler}>Sign in</Button>
             <Button btnType="Primary" clicked={this.turnToSignup}>Don't have an account ?</Button>
           </div>

          :
          <div>
            <Button disabled={!this.state.formIsValid} btnType="Success" clicked={this.submitHandler}>Sign up</Button>
            <Button btnType="Primary" clicked={this.turnToSignin}>Have an account already ?</Button>
          </div>

        }

       </form>

    }

      if (errorArray.length > 0 || this.props.error) {

        validationErrors = <ul className={classes.ValidationErrors}>

                              {errorArray.map(type => {

                                return (

                                  <li className={classes.ErrorLists} key={type.fieldInValid}> {type.fieldInValid === 'email' ? 'Please fill in  a valid email '  :  type.fieldInValid === 'password' ? 'Password must be at least 6 characters' : 'Retype password does not match'}</li>

                                );
                              })}



                                {this.props.error ? (<li className={classes.ErrorLists}>{this.props.error}</li>) : null}

                          </ul>

      }

      let redirect = null;

      if (this.props.isAuthenticated) {

          redirect = <Redirect to="/" />;

          if (this.props.canMakeOrder) {

            redirect = <Redirect to="/checkout" />
          }
      }

    return (

      <div className={classes.Auth}>

        {redirect}

        {validationErrors}

        {form}

      </div>
    );
  }
}

const mapStateToProps = state => {

  return {

    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.idToken !== null,
    canMakeOrder: state.order.canMakeOrder
  }
};

const mapDispatchToProps = dispatch => {

  return {

    onSubmitForm: (url, credentials) => dispatch(actions.formSubmit(url, credentials)),
    onResetErrorForm: () => dispatch(actions.resetErrorForm())

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
