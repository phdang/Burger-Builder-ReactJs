import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuider from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/Burger-Builder-ReactJs/">

        <div>

          <Layout>

            <Switch>

              <Route path="/" exact component={BurgerBuider} />

              <Route path="/checkout" component={Checkout} />

              <Route path="/orders" component={Orders} />

            </Switch>



          </Layout>

        </div>


      </BrowserRouter>

    );
  }
}

export default App;
