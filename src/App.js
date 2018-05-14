import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuider from './containers/BurgerBuilder/BurgerBuilder';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));
const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const asyncLogout = asyncComponent(() => import('./containers/Auth/Logout/Logout'));
class App extends Component {

  componentDidMount() {
    this.props.onAutoSignin();
  }

  render() {

    return (
      <BrowserRouter basename="/Burger-Builder-ReactJs/">

        <div>

          <Layout>

            {this.props.isAuthenticated ?

            <Switch>

              <Route path="/" exact component={BurgerBuider} />

              <Route path="/orders" component={asyncOrders} />

              <Route path="/checkout" component={asyncCheckout} />

              <Route path="/signout" component={asyncLogout} />

              <Route path="/signin" component={asyncAuth} />

              <Redirect to="/" />

            </Switch>

          :

          <Switch>

            <Route path="/" exact component={BurgerBuider} />

            <Route path="/signin" component={asyncAuth} />

            <Redirect to="/" />

          </Switch>

         }

          </Layout>

        </div>


      </BrowserRouter>

    );
  }
}
const mapStateToProps = state => {
  return {

    isAuthenticated: state.auth.idToken !== null

  }
}
const mapDispatchToProps = dispatch => {

  return {

    onAutoSignin: () => dispatch(actions.autoSignin())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
