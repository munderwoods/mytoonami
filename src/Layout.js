import React, { Component } from "react";

import { compilePlaylist } from "./compilePlaylist.js"
import { updateServer, takeByPattern } from "./helpers.js"

import VideoPlayer from './VideoPlayer.js';
import UserBadge from './UserBadge.js';
import Button from './Button.js';
import Playlist from './Playlist.js';

import { connect } from "react-redux";

import {
	loginStarted,
	loginFulfilled,
	incrementVideoFulfilled,
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
    this.autoEditPlaylist=this.autoEditPlaylist.bind(this);
  }

  componentDidMount() {
  }

  componentWillMount() {
    this.props.onLoginStart({});
    this.yolo();
  }

  makeSortableList() {
    return takeByPattern(
      this.props.broadcast.showData.map(show => show.episodes),
			this.props.broadcast.shows.map(show => this.props.broadcast.showData.findIndex(showData => show === showData.id))
		);
  }

	addShowsData() {
		if(this.props.broadcast.sortablePlaylist.length > 0) {
			this.props.broadcast.shows.map(
				(show) => {
					return fetch('/api/show/' + show)
						.then(response => response.json())
						.then(data => this.props.onAddShowData({showData: data}))
				}
			)
		}
	}

  getShowData(showName) {
    fetch('/api/show/' + showName)
      .then(response => response.json())
      .then(data => this.props.onAddShowData({showData: data}))
      .then(() => this.props.onSortList(
        {array: this.makeSortableList(), oldIndex:0, newIndex:0, id: this.props.id}
      ))
      .then(() => {
				this.props.onEditPlaylist(compilePlaylist(this.props.broadcast));
				if (this.props.id) {
          console.log('updating db')
					updateServer({
						data: {
							sortablePlaylist: this.props.broadcast.sortablePlaylist,
							shows: this.props.broadcast.shows,
              currentVideo: this.props.broadcast.currentVideo
						},
						id: this.props.id
					});
				};
			}
		);
  }
  autoEditPlaylist(){
    this.props.onEditPlaylist(compilePlaylist(this.props.broadcast));
  }

  sortShows(array, oldIndex, newIndex) {
    this.props.onSortList({array: array, oldIndex: oldIndex, newIndex: newIndex});
    Promise.resolve(this.props.onEditPlaylist(compilePlaylist(this.props.broadcast))).then(() => updateServer({
        data: {
          sortablePlaylist: this.props.broadcast.sortablePlaylist,
          shows: this.props.broadcast.shows,
          currentVideo: this.props.broadcast.currentVideo
        },
        id: this.props.id
      })
    )
  }

  addToBroadcast(showName) {
    this.props.onAddToBroadcast(showName);
    this.addShow(showName);
  }

  removeFromBroadcast(showName) {
    Promise.resolve(this.props.onRemoveFromBroadcast(showName)).then(() => updateServer({
        data: {
          sortablePlaylist: this.props.broadcast.sortablePlaylist,
          shows: this.props.broadcast.shows,
          currentVideo: this.props.broadcast.currentVideo
        },
        id: this.props.id
      })
    )
  }

  addShow(showName) {
    this.getShowData(showName);
  }

  yolo() {
    hint()
			.then(credential => sendUserToServer(credential))
      .then(userData => {
        this.props.onLoginFulfilled(userData)
      }).catch(err => console.log(err));
  }

	nextVideo() {
    Promise.resolve(this.props.onIncrementVideoFulfilled(this.props.currentVideo + 1)).then(() => updateServer({
        data: {
          sortablePlaylist: this.props.broadcast.sortablePlaylist,
          shows: this.props.broadcast.shows,
          currentVideo: this.props.broadcast.currentVideo
        },
        id: this.props.id
      })
    )
	}

	goToVideo(newVideoTitle) {
    Promise.resolve(this.props.onIncrementVideoFulfilled(this.props.broadcast.playlist.findIndex(x => x.title === newVideoTitle.split("-")[1].trim()))).then(() => updateServer({
        data: {
          sortablePlaylist: this.props.broadcast.sortablePlaylist,
          shows: this.props.broadcast.shows,
          currentVideo: this.props.broadcast.currentVideo
        },
        id: this.props.id
      })
    )
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
					currentVideo={this.props.currentVideo}
					nextVideo={this.nextVideo}
          showData={this.props.broadcast.showData}
          autoEditPlaylist={this.autoEditPlaylist}
          broadcast={this.props.broadcast}
				/>
				<Playlist
					sortablePlaylist={this.props.broadcast.sortablePlaylist}
					sortShows={this.sortShows}
					goToVideo={this.goToVideo}
				/>
        <div className={"Shows"}>
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
          <Button
            showId={"ghostintheshell"}
            showName={"Ghost In The Shell"}
            add={this.addToBroadcast}
            remove={this.removeFromBroadcast}
            broadcast={this.props.broadcast}
            active={this.props.broadcast.shows.find(
              (x) => x === "ghostintheshell"
             )
              ? " Active"
              : ""
            }
          />
          <Button
            showId={"flcl"}
            showName={"FLCL"}
            add={this.addToBroadcast}
            remove={this.removeFromBroadcast}
            broadcast={this.props.broadcast}
            active={this.props.broadcast.shows.find(
              (x) => x === "flcl"
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
		id: store.broadcast.credential.id,
    user: store.broadcast.credential.name,
    fetching: store.broadcast.fetching,
    fetched: store.broadcast.fetched,
    signedIn: store.broadcast.loggedIn,
		showData: store.broadcast.showData,
		currentVideo: store.broadcast.currentVideo,
    sortablePlaylist: store.broadcast.sortablePlaylist,
    broadcast: store.broadcast,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
