import React, { Component } from 'react';
import config from './config';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      checkInId: null
    }
    this.toggleCheck = this.toggleCheck.bind(this);
    this.checkIn = this.checkIn.bind(this);
    this.checkOut = this.checkOut.bind(this);
  }

  toggleCheck(event) {
    if (this.state.checkInId) {
      this.checkOut();
    } else {
      this.checkIn();
    }
  }

  async checkIn() {
    await fetch(config.apiBaseURL + '/user/check/in', {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(responseJson => {
      if (!('error' in responseJson)) {
        this.setState({ checkInId: responseJson.time._id });
      }
    });
  }

  async checkOut() {
    await fetch(config.apiBaseURL + '/user/check/out?id=' + this.state.checkInId, {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(responseJson => {
      if (!('error' in responseJson)) {
        this.setState({ checkInId: null });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.state.user) {
      this.setState({ user: nextProps.user });
    }
  }

  render() {
    return (
      <header className="main-header">
        <a href="index2.html" className="logo">
          <span className="logo-mini"><b>{config.shortTitlePartOne}</b>{config.shortTitlePartTwo}</span>
          <span className="logo-lg"><b>{config.longTitlePartOne}</b>{config.longTitlePartTwo}</span>
        </a>
        <nav className="navbar navbar-static-top">
          <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span className="sr-only">Toggle navigation</span>
          </a>
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              <li>
                {this.state.user && !this.state.user.teacher && this.state.checkInId ? (
                  <button type="button" className="btn btn-danger" style={{marginTop: 7, marginRight: 12}} onClick={this.toggleCheck}>Check out</button>
                ) : (
                  <button type="button" className="btn btn-success" style={{marginTop: 7, marginRight: 12}} onClick={this.toggleCheck}>Check in</button>
                )}
              </li>
              <li className="dropdown user user-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                  <img src={this.state.user && this.state.user.photo} className="user-image" alt={this.state.user && this.state.user.displayName} />
                  <span className="hidden-xs">{this.state.user && this.state.user.displayName}</span>
                </a>
                <ul className="dropdown-menu">
                  <li className="user-header">
                    <img src={this.state.user && this.state.user.photo} className="img-circle" alt={this.state.user && this.state.user.displayName} />
                    <p>
                      {this.state.user && this.state.user.displayName}
                      <small>{this.state.user && this.state.user.email}</small>
                    </p>
                  </li>
                  <li className="user-footer">
                    <div className="pull-left">
                      <a href="#" className="btn btn-default btn-flat">Profile</a>
                    </div>
                    <div className="pull-right">
                      <a href={`${config.apiBaseURL}/auth/logout`} className="btn btn-default btn-flat">Sign out</a>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default Header;
