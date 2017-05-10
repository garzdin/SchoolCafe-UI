import React, { Component } from 'react';

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
              <p>{this.state.user &&this.state.user.displayName}</p>
              <a href="#"><i className="fa fa-circle text-success"></i> Online</a>
            </div>
          </div>
          <ul className="sidebar-menu">
            <li className="header">MAIN NAVIGATION</li>
            <li className="active">
              <a href="#">
                <i className="fa fa-files-o"></i>
                <span>Homework</span>
                <span className="pull-right-container">
                  <span className="label label-primary pull-right">4</span>
                </span>
              </a>
            </li>
          </ul>
        </section>
      </aside>
    );
  }
}

export default Sidebar;
