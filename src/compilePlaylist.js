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

function compilePlaylist(show) {
  const showIntros = dragonballIntros;
  const showOutros = dragonballOutros;
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

export default compilePlaylist;
