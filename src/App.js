import React, { Component } from 'react';
import './App.css';
import VideoPlayer from './VideoPlayer.js';
import intros from './intros.js';
import later from './later.js';
import dragonball from './dragonball/dragonball.js';
import dragonballBumps from './dragonball/dragonballBumps.js';
import dragonballIntros from './dragonball/dragonballIntros.js';
import dragonballOutros from './dragonball/dragonballOutros.js';


const compiledPlaylist = playlist(dragonball, dragonballBumps, dragonballIntros, dragonballOutros, intros);

function playlist(show, showBumps, showIntros, showOutros, intros) {
  let index = 0;
  let list = [];
  const intro = intros[Math.floor(Math.random() * 23) + 0];
  list.push(makePlaylistObject(list.length - 1, intro.title, intro.sources.m4v));
  for(var i = 0; i < show.length; i++) {
    const bump = showBumps[Math.floor(Math.random() * 12) + 0];
    const showIntro = showIntros[Math.floor(Math.random() * 5) + 0];
    const showOutro = showOutros[Math.floor(Math.random() * 5) + 0]
    list.push(makePlaylistObject(list.length - 1, showIntro.title, showIntro.sources.m4v))
    list.push(makePlaylistObject(list.length - 1, show[i].title, show[i].sources.m4v));
    list.push(makePlaylistObject(list.length - 1, showOutro.title, showOutro.sources.m4v))
    list.push(makePlaylistObject(list.length - 1, bump.title, bump.sources.m4v));
  }
  list.push(makePlaylistObject(list.length -1, later[0].title, later[0].sources.m4v));
  console.log(list);
  return list;
}

function makePlaylistObject(id, title, source) {
  return {
    id: id,
    title: title,
    sources: {
      m4v: source
    },
  }
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
