import React, { Component } from 'react';
import './App.css';
import VideoPlayer from './VideoPlayer.js';
import UserBadge from './UserBadge.js';



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
  return videos[randInt(videos.length)];
}

function takeRandom(list, count, result = []) {
  if(result.length === count) return result;
  const element = list[randInt(list.length)];
  const nextList = list.filter(e => e !== element);
  return takeRandom(nextList, count, [ ...result, element]);
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

class App extends Component {
  constructor(props) {
    super(props);
    this.setState = this.setState.bind(this);
    this.state = {
      credential: {email: null, name: null},
      signedIn: false,

    }
  }
componentDidMount() {
      function getUserFromServer(credential){
        fetch('http://localhost:5000/api/sessions', {
          method: 'POST',
          body: JSON.stringify({
						"email": credential.id,
						"name": credential.displayName
					}),
        });
      }

      window.onGoogleYoloLoad = (googleyolo) => {
        const hintPromise = googleyolo.hint({
            supportedAuthMethods: [
              "https://accounts.google.com"
                ],
            supportedIdTokenProviders: [
              {
                      uri: "https://mytoonami.herokuapp.com",
                      clientId: "258532163434-9ojtut64kehv62ovrs4qcaal8gaomcsb.apps.googleusercontent.com"
                    }
                ]
        });
        hintPromise.then((credential) => {
					if (credential.id) {
            this.setState({ credential: credential, signedIn: true});
						getUserFromServer(credential);
            console.log(this.state);
					}
				}, (error) => {
					switch (error.type) {
						case "userCanceled":
							// The user closed the hint selector. Depending on the desired UX,
							// request manual sign up or do nothing.
							break;
						case "noCredentialsAvailable":
							// No hint available for the session. Depending on the desired UX,
							// request manual sign up or do nothing.
							break;
						case "requestFailed":
							// The request failed, most likely because of a timeout.
							// You can retry another time if necessary.
							break;
						case "operationCanceled":
							// The operation was programmatically canceled, do nothing.
							break;
						case "illegalConcurrentRequest":
							// Another operation is pending, this one was aborted.
							break;
						case "initializationError":
							// Failed to initialize. Refer to error.message for debugging.
							break;
						case "configurationError":
							// Configuration error. Refer to error.message for debugging.
							break;
						default:
							// Unknown error, do nothing.
					}
				});
       // const retrievePromise = googleyolo.retrieve({
       //     supportedAuthMethods: [
       //           "https://accounts.google.com",
       //         ],
       //     supportedIdTokenProviders: [
       //           {
       //                   uri: "https://mytoonami.herokuapp.com",
       //                   clientId: "258532163434-9ojtut64kehv62ovrs4qcaal8gaomcsb.apps.googleusercontent.com"
       //                 }
       //         ]
       // });

        };

}
  render() {
    return (
      <div className="App">
				<div>
					<UserBadge userName={this.state.credential.displayName} signedIn={this.state.signedIn}/>
				</div>
        <div className="Heading">
          <h1 className="HeroHeading">MYTOONAMI</h1>
        </div>
        <VideoPlayer playlist={compiledPlaylist}/>
      </div>
    );
  }
}

 export default App;
