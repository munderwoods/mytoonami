import React, { Component } from "react";
import { compilePlaylist} from "./compilePlaylist.js"
import { recompilePlaylist} from "./compilePlaylist.js"

import VideoPlayer from './VideoPlayer.js';
import UserBadge from './UserBadge.js';
import Button from './Button.js';
import Playlist from './Playlist.js';

import { connect } from "react-redux";

import { loginStarted, loginFulfilled, userToServer } from './actions/loginActions.js';
import { showSwitchingStarted, showSwitchingFulfilled } from './actions/showActions.js';
import { makePlaylistFulfilled } from './actions/playlistActions.js';
import { incrementVideoFulfilled } from './actions/currentVideoActions.js';
import { sortListFulfilled } from './actions/sortableListActions.js';

import { hint, sendUserToServer } from './googleYolo.js';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.yolo=this.yolo.bind(this);
    this.addShow=this.addShow.bind(this);
    this.nextVideo=this.nextVideo.bind(this);
    this.sortShows=this.sortShows.bind(this);
    this.goToVideo=this.goToVideo.bind(this);
  }

  componentDidMount() {
  }

  componentWillMount() {
    this.props.onLoginStart({});
    this.yolo();
  }

  getShowData(showName) {
    let data = {};
    fetch('/api/show/' + showName)
      .then(response => response.json())
      .then(data => this.props.onShowSwitchingFulfilled({showName: showName, showData: data}))
      .then(() => this.props.onMakePlaylistFulfilled(compilePlaylist(this.props.show)))
      .then(() => this.props.onSortListFulfilled({array: this.props.show.showData.episodes, oldIndex:0, newIndex:0}));
  }

  sortShows(array, oldIndex, newIndex) {
    this.props.onSortListFulfilled({array: array, oldIndex: oldIndex, newIndex: newIndex});
    this.props.onMakePlaylistFulfilled(recompilePlaylist(this.props.show, this.props.sortablePlaylist));
  }

  addShow(showName) {
   this.props.onShowSwitchingStarted();
   this.getShowData(showName);
  }

  yolo() {
    hint().then(((credential) => {
      this.props.onLoginFulfilled(credential);
      sendUserToServer(credential).then(() => this.props.onSendUserToServer());
    }))
  }

	nextVideo() {
		this.props.onIncrementVideoFulfilled(this.props.currentVideo + 1);
	}

	goToVideo(newVideoTitle) {
		this.props.onIncrementVideoFulfilled(this.props.playlist.findIndex(x => x.title === newVideoTitle.split("-")[1].trim()))
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
        <VideoPlayer
					playlist={this.props.playlist}
					sortablePlaylist={this.props.sortablePlaylist}
					sortShows={this.sortShows}
					show={this.props.show}
					currentVideo={this.props.currentVideo}
					nextVideo={this.nextVideo}
				/>
				<Playlist
					sortablePlaylist={this.props.sortablePlaylist}
					sortShows={this.sortShows}
					goToVideo={this.goToVideo}
				/>
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
		onIncrementVideoFulfilled: e => dispatch(incrementVideoFulfilled(e)),
    onSortListFulfilled: e => dispatch(sortListFulfilled(e)),
  }

}

function mapStateToProps(store) {
  return {
    user: store.login.credential.displayName,
    fetching: store.login.fetching,
    fetched: store.login.fetched,
    signedIn: store.login.loggedIn,
		show: store.show,
		building: store.show.building,
		built: store.show.built,
    playlist: store.playlist.playlist,
		currentVideo: store.currentVideo.currentVideo,
    sortablePlaylist: store.sortableList.sortableList,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
