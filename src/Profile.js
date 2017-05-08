import React, { Component } from 'react';

class Profile extends Component {
  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            Dashboard
            <small>Overview</small>
          </h1>
          <ol className="breadcrumb">
            <li><a href="#"><i className="fa fa-dashboard"></i> Home</a></li>
            <li className="active">Dashboard</li>
          </ol>
        </section>
        <section className="content">
          <div className="row">
            <div className="col-lg-3 col-xs-6">
              <div className="small-box bg-yellow">
                <div className="inner">
                  <h3>44</h3>
                  <p>User Registrations</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add"></i>
                </div>
                <a href="#" className="small-box-footer">More info <i className="fa fa-arrow-circle-right"></i></a>
              </div>
            </div>
          </div>
          <div className="row">
            <section className="col-lg-12">
              <div className="nav-tabs-custom">
                <ul className="nav nav-tabs pull-right">
                  <li className="pull-left header"><i className="fa fa-inbox"></i> Sales</li>
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

export default Profile;
