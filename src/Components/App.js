// This component handles the App template used on every page.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import Connection from './Connection';
import PrivateRoute from './PrivateRoute';
import Header from './Header';

/*
const App = ({ authenticated, checked }) => (
  <Router>
    { checked &&
      <div>
        <PrivateRoute exact path="/" component={Home} authenticated={authenticated}/>
        <Route path="/login" component={Connection}/>
      </div>
    }
  </Router>
);
*/
export default class App extends Component{
  render() {
    //console.log("Rendering");
    console.log("Session :",this.props.session);
    return (
      <Router>
        <div className="App">
          <Header />
          <Home />
          <Route exact path='/' Component={Home}/>
        </div>
      </Router>
    );
  }
}

const { bool } = PropTypes;

App.propTypes = {
  authenticated: bool.isRequired,
  checked: bool.isRequired
};

const mapState = session => ({
  checked: session.checked,
  authenticated: session.authenticated
});

//export default connect(mapState)(App);