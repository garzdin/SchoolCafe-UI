import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.state.user) {
      this.setState({ user: nextProps.user });
    }
  }

  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img src={this.state.user && this.state.user.photo} className="img-circle" alt="User" />
            </div>
            <div className="pull-left info">
              <p>{this.state.user && this.state.user.displayName}</p>
              <a href="#">
                {
                  this.state.user && this.state.user.teacher ? (
                    'Teacher'
                  ) : (
                    'Student'
                  )
                }
              </a>
            </div>
          </div>
          <ul className="sidebar-menu">
            <li className="header">MAIN NAVIGATION</li>
            <li className="active">
              <Link to="/">
                <i className="fa fa-object-group"></i>
                <span>Dashboard</span>
              </Link>
            </li>
          </ul>
        </section>
      </aside>
    );
  }
}

export default Sidebar;
