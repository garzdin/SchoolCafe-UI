import React, { Component } from 'react';
import config from './config';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      count: 0,
      times: []
    }
    this.setTimes = this.setTimes.bind(this);
    this.getStudentCount = this.getStudentCount.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.state.user) {
      this.setState({ user: nextProps.user });
    }
    if (nextProps.user && nextProps.user.teacher) {
      this.getTimes();
      this.getStudentCount();
    }
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

  async getStudentCount() {
    await fetch(config.apiBaseURL + '/count', {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(responseJson => {
      if (!('error' in responseJson)) {
        this.setState({ count: responseJson.count });
      }
    });
  }

  render() {
    return (
      <div className="content-wrapper">
        {
          this.state.user && this.state.user.teacher ? (
            <section className="content">
              <div className="row">
                <div className="col-lg-12 col-xs-12">
                  <div className="small-box bg-yellow">
                    <div className="inner">
                      <h3>{this.state.count}</h3>
                      <p>Students</p>
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
                            <Area type='monotone' dataKey='minutes' stroke='#8884d8' fill='#8884d8' />
                          </AreaChart>
                        }
                      </ResponsiveContainer>
                    </div>
                  </div>
                </section>
              </div>
            </section>
          ) : (
            null
          )
        }
      </div>
    );
  }
}

export default Dashboard;
