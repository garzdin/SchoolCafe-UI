import React, { Component } from 'react';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.state.user) {
      this.setState({ user: nextProps.user });
    }
  }

  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <div className="row">
            <div className="col-xs-12">
              <div className="box box-primary">
                <div className="box-body box-profile">
                  <img className="profile-user-img img-responsive img-circle" src="/dist/img/face.png" alt={this.state.user && this.state.user.displayName} />
                  <h3 className="profile-username text-center">{this.state.user && this.state.user.displayName}</h3>
                  <p className="text-muted text-center">{this.state.user && this.state.user.teacher ? 'Teacher' : 'Student'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Profile;
