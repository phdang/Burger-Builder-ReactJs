import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {

      return nextProps.show !== this.props.show || nextProps.children !== this.props.children;

    }

  render() {

    return (

      <Aux>

        <Backdrop clicked={this.props.modalClosed} show={this.props.show} />

        <div className={classes.Modal} style={this.props.styles}>

          {this.props.children}

        </div>

      </Aux>


    );
  }


}

export default Modal;
