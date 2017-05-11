import React, { Component } from 'react';

class Homework extends Component {
  render() {
    return (
      <section className="content">
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
                    <tr>
                      <td>2x^2 + 4x + 5 = 0</td>
                      <td><span className="badge bg-red pull-right">Math</span></td>
                    </tr>
                    <tr>
                      <td>Clean database</td>
                      <td><span className="badge bg-yellow pull-right">Biology</span></td>
                    </tr>
                    <tr>
                      <td>Cron job running</td>
                      <td><span className="badge bg-light-blue pull-right">Psychics</span></td>
                    </tr>
                    <tr>
                      <td>Fix and squish bugs</td>
                      <td><span className="badge bg-green pull-right">Chemistry</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Homework;
