import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Layout from './Layout';
import Dashboard from './Dashboard';
import Login from './Login';
import Profile from './Profile';
import Homework from './Homework';

const HomeComponent = () => {
  return <Layout component={<Dashboard />} />
}

const ProfileComponent = () => {
  return <Layout component={<Profile />} />
}

const HomeworkComponent = () => {
  return <Layout component={<Homework />} />
}

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomeComponent}/>
          <Route path="/login" component={Login}/>
          <Route path="/profile" component={ProfileComponent}/>
          <Route path="/homework" component={HomeworkComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;
