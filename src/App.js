import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './Dashboard';
import Login from './Login';
import Profile from './Profile';
import Homework from './Homework';
import config from './config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false
    }
  }

  componentWillMount() {
    fetch(config.apiBaseURL + '/auth/check', {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(responseJson => {
      this.setState({ authed: responseJson.auth });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={(props) => <Layout {...props} component={<Dashboard />} authed={this.state.authed} />} />
          <Route path="/profile" render={(props) => <Layout {...props} component={<Profile />} authed={this.state.authed} />} />
          <Route path="/homework" render={(props) => <Layout {...props} component={<Homework />} authed={this.state.authed} />} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
