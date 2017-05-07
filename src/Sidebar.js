import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User" />
            </div>
            <div className="pull-left info">
              <p>Alexander Pierce</p>
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
