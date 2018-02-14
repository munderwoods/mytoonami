import React, { Component } from 'react';

class UserBadge extends Component {
  signedIn(bool) {
    console.log(bool);
    return bool ? "Signed in as: " : "Refresh To Sign In"
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
