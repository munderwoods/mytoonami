import React, { Component } from "react";
import compilePlaylist from "./compilePlaylist.js"

import VideoPlayer from './VideoPlayer.js';
import UserBadge from './UserBadge.js';
import Button from './Button.js';

import { connect } from "react-redux";
import { loginStarted, loginFulfilled, userToServer } from './actions/loginActions.js';
import { showSwitchingStarted, showSwitchingFulfilled } from './actions/showActions.js';
import { makePlaylistFulfilled } from './actions/playlistActions.js';

import { hint, sendUserToServer } from './googleYolo.js';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.yolo=this.yolo.bind(this);
    this.addShow=this.addShow.bind(this);
  }
  compilePlaylist() {
    return compilePlaylist(this.store.show);
  }

  componentDidMount() {
  }

  componentWillMount() {
    this.props.onLoginStart({});
    this.yolo();
  }

  addShow(show) {
    this.props.onShowSwitchingStarted();
    fetch('http://localhost:5000/api/show/' + show)
      .then(response => response.json())
      .then(data => this.props.onShowSwitchingFulfilled({show: show, showData: data}))
      .then(() => this.props.onMakePlaylistFulfilled(compilePlaylist(this.props.showData)));
      }

  yolo() {
    hint().then(((credential) => {
      this.props.onLoginFulfilled(credential);
      sendUserToServer(credential).then(() => this.props.onSendUserToServer());
    }))
  }

  makePlaylist() {
  }

  render () {
    return  (
      <div className="App">
				<div>
					<UserBadge
            login={() => this.yolo()}
            userName={this.props.user}
            signedIn={this.props.signedIn}
          />
				</div>
        <div className="Heading">
          <h1 className="HeroHeading">MYTOONAMI</h1>
        </div>
        <VideoPlayer playlist={this.props.playlist} showData={this.props.showData}/>
        <Button value={"dragonball"} action={this.addShow}/>
      </div>
    )
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onLoginStart: e => dispatch(loginStarted(e)),
    onLoginFulfilled: e => dispatch(loginFulfilled(e)),
    onSendUserToServer: e => dispatch(userToServer(e)),
		onShowSwitchingStarted: e => dispatch(showSwitchingStarted(e)),
		onShowSwitchingFulfilled: e => dispatch(showSwitchingFulfilled(e)),
    onMakePlaylistFulfilled: e => dispatch(makePlaylistFulfilled(e)),
  }

}

function mapStateToProps(store) {
  return {
    user: store.login.credential.displayName,
    fetching: store.login.fetching,
    fetched: store.login.fetched,
    signedIn: store.login.loggedIn,
		show: store.show.show,
		building: store.show.building,
		built: store.show.built,
    showData: store.show.showData,
    playlist: store.playlist.playlist,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
