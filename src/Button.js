import React, { Component } from 'react';

class Button extends Component {
  handleClick(e) {
    this.props.action(this.props.value);
  }
  render() {
    return (
          <div className="Button">
            <button onClick={() => this.handleClick()}>{this.props.value}</button>
          </div>
    )
  };
};

export default Button;
