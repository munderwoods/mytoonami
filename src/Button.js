import React, { Component } from 'react';

class Button extends Component {
  handleClick(e) {
    e.preventDefault();
    this.props.broadcast.shows.find((x) => x === this.props.showId) ? this.props.remove(this.props.showId) : this.props.add(this.props.showId);
  }
  render() {
    return (
          <div className={"Button " + this.props.showId + this.props.active}>
            <a className="ButtonAnchor" href={this.props.showId} onClick={(e) => this.handleClick(e)}>{this.props.showName}</a>
          </div>
    )
  };
};

export default Button;
