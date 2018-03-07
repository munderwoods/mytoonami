import React, { Component } from "react";
import { compilePlaylist} from "./compilePlaylist.js"
import { recompilePlaylist} from "./compilePlaylist.js"

import VideoPlayer from './VideoPlayer.js';
import UserBadge from './UserBadge.js';
import Button from './Button.js';
import Playlist from './Playlist.js';

import { connect } from "react-redux";

import { loginStarted, loginFulfilled, userToServer } from './actions/loginActions.js';
import { incrementVideoFulfilled } from './actions/currentVideoActions.js';
import {
  sortList,
  editPlaylist,
  addShowData,
  removeShowData,
  addToBroadcast,
  removeFromBroadcast
} from './actions/broadcastActions.js';

import { hint, sendUserToServer } from './googleYolo.js';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.yolo=this.yolo.bind(this);
    this.addShow=this.addShow.bind(this);
    this.addToBroadcast=this.addToBroadcast.bind(this);
    this.removeFromBroadcast=this.removeFromBroadcast.bind(this);
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

  makeSortableList() {
    let list = [];
    let length = 0;
    //this.props.broadcast.showData.map((x) => list = [...list, ...x.showData.episodes]);
    for (var i = 0; i < this.props.broadcast.shows.length; i++) {
      length = length + this.props.broadcast.showData.find(x => x.showData.id === this.props.broadcast.shows[i]).showData.episodes.length;
    }
    for (var i = 0; i < length; i++) {
      for (var x =0; x < this.props.broadcast.shows.length; x++) {
        if(this.props.broadcast.showData[x].showData.episodes[i]) {
          list.push(this.props.broadcast.showData[x].showData.episodes[i])
        }
      }
    }
    console.log(length, list);
    return list;
  }

  getShowData(showName) {
    fetch('/api/show/' + showName)
      .then(response => response.json())
      .then(data => this.props.onAddShowData({showData: data}))
      .then(() => this.props.onSortList(
        {array: this.makeSortableList(), oldIndex:0, newIndex:0}
      ))
      .then(() => this.props.onEditPlaylist(compilePlaylist(this.props.broadcast)));
  }

  sortShows(array, oldIndex, newIndex) {
    this.props.onSortListFulfilled({array: array, oldIndex: oldIndex, newIndex: newIndex});
    this.props.onMakePlaylistFulfilled(
      recompilePlaylist(this.props.show, this.props.sortablePlaylist)
    );
  }

  addToBroadcast(showName) {
    this.props.onAddToBroadcast(showName);
    this.addShow(showName);
  }

  removeFromBroadcast(showName) {
    this.props.onRemoveFromBroadcast(showName);
  }

  addShow(showName) {
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
    this.props.onIncrementVideoFulfilled(this.props.playlist.findIndex(
      x => x.title === newVideoTitle.split("-")[1].trim()
    ))
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
					playlist={this.props.broadcast.playlist}
					sortablePlaylist={this.props.broadcast.sortablePlaylist}
					sortShows={this.sortShows}
					show={this.props.broadcast.shows[0]}
					currentVideo={this.props.currentVideo}
					nextVideo={this.nextVideo}
				/>
				<Playlist
					sortablePlaylist={this.props.broadcast.sortablePlaylist}
					sortShows={this.sortShows}
					goToVideo={this.goToVideo}
				/>
        <div style={{display: "flex"}}>
          <Button
            showId={"dragonball"}
            showName={"Dragon Ball"}
            add={this.addToBroadcast}
            remove={this.removeFromBroadcast}
            broadcast={this.props.broadcast}
            active={this.props.broadcast.shows.find(
              (x) => x === "dragonball"
             )
              ? " Active"
              : ""
            }
          />
          <Button
            showId={"cowboybebop"}
            showName={"Cowboy Bebop"}
            add={this.addToBroadcast}
            remove={this.removeFromBroadcast}
            broadcast={this.props.broadcast}
            active={this.props.broadcast.shows.find(
              (x) => x === "cowboybebop"
             )
              ? " Active"
              : ""
            }
          />
        </div>
      </div>
    )
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onLoginStart: e => dispatch(loginStarted(e)),
    onLoginFulfilled: e => dispatch(loginFulfilled(e)),
    onSendUserToServer: e => dispatch(userToServer(e)),
		onIncrementVideoFulfilled: e => dispatch(incrementVideoFulfilled(e)),
    onAddToBroadcast: e => dispatch(addToBroadcast(e)),
    onRemoveFromBroadcast: e => dispatch(removeFromBroadcast(e)),
    onAddShowData: e => dispatch(addShowData(e)),
    onRemoveShowData: e => dispatch(removeShowData(e)),
    onEditPlaylist: e => dispatch(editPlaylist(e)),
    onSortList: e => dispatch(sortList(e)),
  }

}

function mapStateToProps(store) {
  return {
    user: store.login.credential.displayName,
    fetching: store.login.fetching,
    fetched: store.login.fetched,
    signedIn: store.login.loggedIn,
		showData: store.broadcast.showData,
		currentVideo: store.currentVideo.currentVideo,
    sortablePlaylist: store.broadcast.sortablePlaylist,
    broadcast: store.broadcast,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
