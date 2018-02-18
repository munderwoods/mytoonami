import React, { Component } from 'react';

class UserBadge extends Component {
  signedIn(bool) {
    return bool ? "Signed in as: " : <a href="#" onClick={(e) => this.handleClick(e)}>Sign in with Google</a>
  }
  handleClick(e) {
    console.log(e);
    this.props.login();
  }
  render() {
    return (
          <div className="UserBadge">
					  <h3 className="UserText">{this.signedIn(this.props.signedIn)}</h3>
            <h3 className="UserName">{this.props.userName}</h3>
          </div>
    )
  };
};

export default UserBadge;
