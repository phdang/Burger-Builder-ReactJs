const orderForm = {
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
      placeholder: 'Your Zip Code with 5 Digits'
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
};
export default orderForm;
