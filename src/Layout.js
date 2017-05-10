import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

class Layout extends Component {
  componentWillMount() {
    document.body.classList.add('skin-blue', 'sidebar-mini');
  }

  componentWillUnmount() {
    document.body.classList.remove('skin-blue', 'sidebar-mini');
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.authed) {
      nextProps.history.replace('/login');
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Header />
        <Sidebar />
        {this.props.component}
        <Footer />
      </div>
    );
  }
}

export default Layout;
