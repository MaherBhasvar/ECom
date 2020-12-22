
import './App.css';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Enquiry from './components/layout/Enquiry';
import { Provider } from 'react-redux'
import store from './store'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import axios from 'axios'
import Alert from './components/layout/Alert'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import Product from './components/layout/Product'
import { getProduct } from './actions/product';
import OrderDetails from './components/layout/OrderDetails';
import SelectAddress from './components/layout/SelectAddress'

axios.defaults.baseURL = 'http://localhost:5000'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {

  useEffect(() => {
    store.dispatch(getProduct())
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router >
        <Fragment>
          <Header />
          <Navbar />
          <Alert />
          <Switch >
            <Route exact path="/" component={Landing} />
            <Route exact path="/enquiry" component={Enquiry} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/addProduct" component={Product} />
            <Route exact path="/orderDetails" component={OrderDetails} />
            <Route exact path="/selectAddress" component={SelectAddress} />
          </Switch>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
