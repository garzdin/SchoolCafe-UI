import React, { Component } from 'react';
import config from './config';
import Admin from './Admin';
import Homework from './Homework';

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
            <Admin count={this.state.count} times={this.state.times} />
          ) : (
            <Homework />
          )
        }
      </div>
    );
  }
}

export default Dashboard;
