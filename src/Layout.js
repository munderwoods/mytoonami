import React, { Component } from "react";

import VideoPlayer from './VideoPlayer.js';
import UserBadge from './UserBadge.js';

import { connect } from "react-redux";
import { loginStarted, loginFulfilled, userToServer } from './actions/loginActions.js';
import { showSwitchingStarted, showSwitchingFulfilled } from './actions/showActions.js';

import { hint, sendUserToServer } from './googleYolo.js';

import intros from './intros.js';
import later from './later.js';
import genericEarly from './genericEarly.js';
import genericMiddle from './genericMiddle.js';
import genericLate from './genericLate.js';

import dragonball from './dragonball/dragonball.js';
import dragonballBumps from './dragonball/dragonballBumps.js';
import dragonballIntros from './dragonball/dragonballIntros.js';
import dragonballOutros from './dragonball/dragonballOutros.js';

const bumps = makeBumps(genericEarly, genericMiddle, genericLate, dragonballBumps);

const compiledPlaylist = playlist(dragonball, bumps, dragonballIntros, dragonballOutros, intros);

function makeBumps(g1, g2, g3, s) {
  return g1.concat(g2, g3, s);
}

function randomVideo(videos) {
  return shuffle(videos)[1];
}

function shuffle(array) {
	var tmp, current, top = array.length;
	if(top) while(--top) {
		current = Math.floor(Math.random() * (top + 1));
		tmp = array[current];
		array[current] = array[top];
		array[top] = tmp;
	}
	return array;
}
function takeRandom(list, count) {
	return shuffle(list).slice(0, count)
}

function singleEpisodePlaylist(episode, showIntros, showOutros) {
  return [
    randomVideo(showIntros),
    episode,
    randomVideo(showOutros),
  ].concat(
      takeRandom(bumps, randInt(1) + 1),
  );
}

function playlist(show, bumps, showIntros, showOutros, intros) {
  return [].concat(
    randomVideo(intros),
    [].concat(
      ...show.map(episode => singleEpisodePlaylist(
        episode,
        showIntros,
        showOutros
      )),
    ),
    later[0],
  ).map((video, idx) => ({ ...video, id: idx }));
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}

class Layout extends Component {
  constructor(props) {
    super(props);
    this.yolo=this.yolo.bind(this);
  }

  componentDidMount() {
  }

  componentWillMount() {
		this.props.onShowSwitchingFulfilled("dragonball");
    this.props.onLoginStart({});
    this.yolo();

  }

  yolo() {
    hint().then(((credential) => {
      this.props.onLoginFulfilled(credential);
      sendUserToServer(credential).then(() => this.props.onSendUserToServer());
    }))
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
        <VideoPlayer playlist={compiledPlaylist} show={dragonball}/>
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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
