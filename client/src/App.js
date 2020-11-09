
import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Enquiry from './components/layout/Enquiry';

const App = () => (
  <Router >
    <Fragment>
      <Header />
      <Switch >
        <Route exact path="/" component={Landing} />
        <Route exact path="/enquiry" component={Enquiry} />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default App;
