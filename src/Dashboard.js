import React, { Component } from 'react';
import config from './config';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }

  componentWillMount() {
    this.getOnlineCount();
  }

  async getOnlineCount() {
    await fetch(config.apiBaseURL + '/users/online', {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(responseJson => {
      this.setState({ count: responseJson.count });
    });
  }

  render() {
    return (
      <div className="content-wrapper">
        <section className="content">
          <div className="row">
            <div className="col-lg-12 col-xs-12">
              <div className="small-box bg-yellow">
                <div className="inner">
                  <h3>{this.state.count}</h3>
                  <p>Users Online</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <section className="col-lg-12">
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs pull-right">
                  <li className="pull-left header"><i className="fa fa-area-chart"></i> User Activity</li>
                </ul>
                <div className="tab-content no-padding">
                  <div className="chart tab-pane active" id="revenue-chart" style={{position: 'relative', height: 300}}></div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }
}

export default Dashboard;
