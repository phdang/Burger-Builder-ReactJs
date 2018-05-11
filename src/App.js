import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuider from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
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

              <Route path="/orders" component={Orders} />

              <Route path="/checkout" component={Checkout} />

              <Route path="/signout" component={Logout} />

              <Route path="/signin" component={Auth} />

              <Redirect to="/" />

            </Switch>

          :

          <Switch>

            <Route path="/" exact component={BurgerBuider} />

            <Route path="/signin" component={Auth} />

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
