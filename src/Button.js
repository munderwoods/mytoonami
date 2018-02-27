import React, { Component } from 'react';

class Button extends Component {
  handleClick(e) {
    e.preventDefault();
    this.props.action(this.props.showId);
  }
  render() {
    return (
          <div className="Button">
            <a className="ButtonAnchor" href={this.props.showId} onClick={(e) => this.handleClick(e)}>{this.props.showName}</a>
          </div>
    )
  };
};

export default Button;
