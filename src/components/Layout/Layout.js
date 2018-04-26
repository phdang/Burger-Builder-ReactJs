
import React, {Component} from 'react';

import Aux from '../../hoc/Aux';

import classes from './Layout.css';

import Toolbar from '../Navigation/Toolbar/Toolbar';

import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import PropTypes from 'prop-types';

class Layout extends Component {

  state = {

    showSideDrawer: false

  }

  sideDrawerClosedHandler = () => {

    this.setState({showSideDrawer: false});

  }

  sideDrawerOpenedHandler = () => {

    this.setState({showSideDrawer: true});

  }

  render() {

    return (

      <Aux>

        <Toolbar clicked={this.sideDrawerOpenedHandler}/>

        <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer} />

        <div>Toolbar, SideDrawer, Backdrop</div>

        <main className={classes.Content}>

          {this.props.children}

        </main>

      </Aux>


    );

  }
}

Layout.propTypes = {

  children: PropTypes.element.isRequired

};

export default Layout;
