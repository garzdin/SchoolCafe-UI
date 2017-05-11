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
      authed: false,
      user: null
    }
    this.check = this.check.bind(this);
    this.fetchUser = this.fetchUser.bind(this);
    this.setUserStatus = this.setUserStatus.bind(this);
  }

  componentWillMount() {
    this.check();
  }

  componentDidUpdate() {
    if (this.state.authed && !this.state.user) {
      this.fetchUser();
    }
    if (this.state.authed && this.state.user && !this.state.user.teacher) {
      this.setUserStatus(true);
    }
  }

  componentWillUnmount() {
    if (this.state.authed && this.state.user && !this.state.user.teacher) {
      this.setUserStatus(false);
    }
  }

  async check() {
    await fetch(config.apiBaseURL + '/auth/check', {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(responseJson => {
      this.setState({ authed: responseJson.auth });
    });
  }

  async fetchUser() {
    await fetch(config.apiBaseURL + '/user', {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(responseJson => {
      this.setState({ user: responseJson.user });
    });
  }

  async setUserStatus(status) {
    fetch(config.apiBaseURL + '/user/status?online=' + status, {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(responseJson => {
      this.setState({ user: responseJson.user });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={(props) => <Layout {...props} component={<Dashboard />} authed={this.state.authed} user={this.state.user} />} />
          <Route path="/profile" render={(props) => <Layout {...props} component={<Profile />} authed={this.state.authed} user={this.state.user} />} />
          <Route path="/homework" render={(props) => <Layout {...props} component={<Homework />} authed={this.state.authed} user={this.state.user} />} />
          <Route path="/login" render={(props) => <Login {...props} authed={this.state.authed} />} />
        </div>
      </Router>
    );
  }
}

export default App;
