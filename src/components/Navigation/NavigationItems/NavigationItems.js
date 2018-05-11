import React, {Component} from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Aux from '../../../hoc/Aux/Aux';
//convert into class to debug
const navigationItems = class extends Component {

  render() {

    const navItems = this.props.isAuthenticated ?

    <Aux>

      <NavigationItem link="/" exact>

        Burger Builder

      </NavigationItem>

      <NavigationItem link="/orders">

        Orders

      </NavigationItem>


      <NavigationItem link="/signout">

        Sign out

      </NavigationItem>

    </Aux>

    :

    <Aux>

      <NavigationItem link="/" exact>

        Burger Builder

      </NavigationItem>

      <NavigationItem link="/signin" >

        Sign in

      </NavigationItem>


    </Aux>


    return (

      <ul className={classes.NavigationItems}>

        {navItems}

      </ul>
    );
  }

}

const mapStateToProps = state => {

  return {

    isAuthenticated: state.auth.idToken !== null
  }
};

export default withRouter(connect(mapStateToProps)(navigationItems));
