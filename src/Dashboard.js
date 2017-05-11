import React, { Component } from 'react';
import config from './config';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      times: []
    }
    this.getOnlineCount = this.getOnlineCount.bind(this);
    this.setTimes = this.setTimes.bind(this);
    this.getTimes = this.getTimes.bind(this);
  }

  componentWillMount() {
    this.getOnlineCount();
    this.getTimes();
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

  async setTimes(times) {
    this.setState({ times: times });
  }

  async getTimes() {
    await fetch(config.apiBaseURL + '/time', {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(responseJson => {
      if (!('error' in responseJson)) {
        var times = []
        responseJson.times.forEach((time) => {
          var timeSpentMs = Date.parse(time.end) - Date.parse(time.start);
          var timeSpent = new Date(1000 * Math.round(timeSpentMs / 1000));
          times.push({hours: timeSpent.getUTCHours(), minutes: timeSpent.getUTCMinutes(), seconds: timeSpent.getUTCSeconds()});
        });
        this.setTimes(times);
      }
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
                  <ResponsiveContainer height={300} width='100%'>
                    {this.state.times &&
                      <AreaChart data={this.state.times} margin={{top: 30, right: 50, left: 0, bottom: 20}}>
                        <XAxis/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Area type='monotone' dataKey='seconds' stroke='#8884d8' fill='#8884d8' />
                      </AreaChart>
                    }
                  </ResponsiveContainer>
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
