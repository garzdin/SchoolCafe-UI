import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from './config';

class Login extends Component {
  componentWillMount() {
    document.body.classList.add('login-page');
  }

  componentWillUnmount() {
    document.body.classList.remove('login-page');
  }

  render() {
    return (
      <div className="login-box">
        <div className="login-logo">
          <Link to="/"><b>{config.longTitlePartOne}</b>{config.longTitlePartTwo}</Link>
        </div>
        <div className="login-box-body">
          <p className="login-box-msg">Sign in to start your session</p>
          <div className="social-auth-links text-center">
            <a href="#" className="btn btn-block btn-social btn-google btn-flat"><i className="fa fa-google-plus"></i> Sign in using Google+</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
