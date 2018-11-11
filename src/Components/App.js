// This component handles the App template used on every page.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import AddEvent from './AddEvent';
import Connection from './Login';
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
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/addEvent' component={AddEvent} />
      </Switch>
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