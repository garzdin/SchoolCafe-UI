import React, { Component } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class Admin extends Component {
  render() {
    return (
      <section className="content">
        <div className="row">
          <div className="col-lg-12 col-xs-12">
            <div className="small-box bg-yellow">
              <div className="inner">
                <h3>{this.props.count}</h3>
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
                  {this.props.times &&
                    <AreaChart data={this.props.times} margin={{top: 30, right: 50, left: 0, bottom: 20}}>
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
    );
  }
}

export default Admin;
