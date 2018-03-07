import intros from './intros.js';
import later from './later.js';
import genericEarly from './genericEarly.js';
import genericMiddle from './genericMiddle.js';
import genericLate from './genericLate.js';

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

function singleEpisodePlaylist(episode, showIntros, showOutros, bumps) {
  return [
    randomVideo(showIntros),
    episode,
    randomVideo(showOutros),
  ].concat(
      takeRandom(bumps, randInt(1) + 1),
  );
}

function compilePlaylist(broadcast, sortedPlaylist) {
	const bumps = genericEarly.concat(genericMiddle, genericLate);
  return [].concat(
    randomVideo(intros),
    [].concat(
      ...broadcast.sortablePlaylist.map(episode => singleEpisodePlaylist(
        episode,
        broadcast.showData.find(x => x.showData.id === episode.show).showData.intros,
        broadcast.showData.find(x => x.showData.id === episode.show).showData.outros,
        broadcast.showData.find(x => x.showData.id === episode.show).showData.bumps.concat(bumps),
      )),
    ),
    later[0],
  ).map((video, idx) => ({ ...video, id: idx }));
}

function recompilePlaylist(show, sortedPlaylist) {
  const showIntros = show.showData.intros;
  const showOutros = show.showData.outros;
  const showEps = sortedPlaylist;
	const showBumps = show.showData.bumps;
	const bumps = showBumps.concat(genericEarly, genericMiddle, genericLate);
  return [].concat(
    randomVideo(intros),
    [].concat(
      ...showEps.map(episode => singleEpisodePlaylist(
        episode,
        showIntros,
        showOutros,
				bumps
      )),
    ),
    later[0],
  ).map((video, idx) => ({ ...video, id: idx }));
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}

export  { compilePlaylist, recompilePlaylist};
