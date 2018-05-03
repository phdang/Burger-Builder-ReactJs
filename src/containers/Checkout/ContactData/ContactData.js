import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends React.Component {

  state = {
    name : '',
    email: '',
    mobile: '',
    address: {
      street: '',
      postalCotal: '',
    },
    ingredients: null,
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});

    const order = {

      ingredients: this.props.ingredients,
      price: this.props.price,
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
      purchased_at: Date().toString(),
      deliveryMethod: 'fastest'
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

    if (!this.state.loading) {

      form = <form>

        <input className={classes.Input} type="text" name="name" required placeholder="Your Name" />

        <input className={classes.Input} type="email" name="email" required placeholder="Your Email" />

        <input className={classes.Input} type="text" name="mobile" required placeholder="Your Phone Number" />

        <input className={classes.Input} type="text" name="street" required placeholder="Your Street" />

        <input className={classes.Input} type="text" name="postal" required placeholder="Your Postal Code" />

        <Button btnType="Danger" clicked={this.props.cancelOrder}>CANCEL</Button>

        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>

      </form>
    }

    return(

      <div className={classes.ContactData}>

        <h4> Enter your Contact Data</h4>

        {form}

      </div>

    );
  }
}

export default ContactData;
