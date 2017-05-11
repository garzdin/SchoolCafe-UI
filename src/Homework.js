import React, { Component } from 'react';

class Homework extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var homework = {
      task: this.taskInput.value,
      subject: this.subjectInput.value
    };
    this.props.onAdd(homework);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-lg-12 col-xs-12">
            <div className="box">
              <div className="box-header">
                <h3 className="box-title">Homework</h3>
              </div>
              <div className="box-body no-padding">
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Task</th>
                      <th className="pull-right">Subject</th>
                    </tr>
                    {
                      this.props.homework.length > 0 && this.props.homework.map((row, i) => {
                        return (
                          <tr key={i}>
                            <td>{row.task}</td>
                            <td><span className="badge pull-right">{row.subject}</span></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {this.props.teacher &&
          <div className="row">
            <div className="col-lg-12 col-xs-12">
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Add Homework</h3>
                </div>
                <form role="form" onSubmit={this.handleSubmit}>
                  <div className="box-body">
                    <div className="form-group">
                      <label htmlFor="task">Task</label>
                      <input
                        type="text"
                        className="form-control"
                        id="task"
                        placeholder="Enter task description"
                        ref={(ref) => this.taskInput = ref} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Enter subject"
                        ref={(ref) => this.subjectInput = ref} />
                    </div>
                  </div>
                  <div className="box-footer">
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Homework;
