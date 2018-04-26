import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
const modal = (props) => {

  return (

    <Aux>

      <Backdrop clicked={props.modalClosed} show={props.show} />

      <div className={classes.Modal} style={props.styles}>

        {props.children}

      </div>

    </Aux>


  );
}

export default modal;
