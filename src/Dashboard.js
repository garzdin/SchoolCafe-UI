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
      times: [],
      homework: []
    }
    this.setTimes = this.setTimes.bind(this);
    this.getStudentCount = this.getStudentCount.bind(this);
    this.getHomework = this.getHomework.bind(this);
    this.onAddHomework = this.onAddHomework.bind(this);
    this.onDeleteHomework = this.onDeleteHomework.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.state.user) {
      this.setState({ user: nextProps.user });
    }
    if(nextProps.user) {
      this.getHomework();
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

  async getHomework() {
    await fetch(config.apiBaseURL + '/homework', {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(responseJson => {
      if (!('error' in responseJson)) {
        this.setState({ homework: responseJson.homework });
      }
    });
  }

  async onAddHomework(homework) {
    await fetch(config.apiBaseURL + '/homework/add?task=' + encodeURIComponent(homework.task) + '&subject=' + encodeURIComponent(homework.subject), {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(responseJson => {
      if (!('error' in responseJson)) {
        var homework = this.state.homework;
        homework.push(responseJson.homework);
        this.setState({ homework: homework });
      }
    });
  }

  async onDeleteHomework(index) {
    let entry = this.state.homework[index];
    await fetch(config.apiBaseURL + '/homework/remove?id=' + entry._id, {
      credentials: 'include'
    })
    .then(response => response.json())
    .then(responseJson => {
      if (!('error' in responseJson)) {
        var homework = this.state.homework;
        homework.splice(index, 1);
        this.setState({ homework: homework });
      }
    });
  }

  render() {
    return (
      <div className="content-wrapper">
        {
          this.state.user && this.state.user.teacher ? (
            <section className="content">
              <Admin count={this.state.count} times={this.state.times} />
              <Homework
                teacher={this.state.user && this.state.user.teacher}
                homework={this.state.homework}
                onAdd={this.onAddHomework}
                onDelete={this.onDeleteHomework} />
            </section>
          ) : (
            <section className="content">
              <Homework
                teacher={this.state.user && this.state.user.teacher}
                homework={this.state.homework} />
            </section>
          )
        }
      </div>
    );
  }
}

export default Dashboard;
