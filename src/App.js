import React, { Component } from 'react';
import './App.css';
import VideoPlayer from './VideoPlayer.js';
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
  render() {
    return (
      <div className="App">
        <VideoPlayer playlist={compiledPlaylist}/>
      </div>
    );
  }
}

 export default App;
