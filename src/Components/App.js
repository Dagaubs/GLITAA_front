// This component handles the App template used on every page.
import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';
import Home from './Home';
import AddEvent from './AddEvent';
import Login from './Login';

export default class App extends Component{
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/addEvent' component={AddEvent} />
        <Route path='/login' component={Login} />
      </Switch>
    );
  }
}
//export default connect(mapState)(App);