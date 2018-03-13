import intros from './intros.js';
import later from './later.js';
import genericEarly from './genericEarly.js';
import genericMiddle from './genericMiddle.js';
import genericLate from './genericLate.js';



function randomVideo(videos) {
  return shuffle(videos)[0];
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
	return shuffle(list).slice(0, count);
}

function singleEpisodePlaylist(episode, showIntros, showOutros, bumps) {
  console.log(randomVideo(showIntros), showIntros);
  let playlist = [];
    if (showIntros.length > 0) playlist.push(randomVideo(showIntros));
    playlist.push(episode);
    if (showOutros.length > 0) playlist.push(randomVideo(showOutros));
  return playlist.concat(
    takeRandom(bumps, randInt(1) + 1),
  );
}

function compilePlaylist(broadcast) {
	const bumps = genericEarly.concat(genericMiddle, genericLate);
  return [].concat(
    randomVideo(intros),
    [].concat(
      ...broadcast.sortablePlaylist.map(
        episode => singleEpisodePlaylist(
            episode,
            broadcast.showData.find(x => x.id === episode.show).intros,
            broadcast.showData.find(x => x.id === episode.show).outros,
            broadcast.showData.find(x => x.id === episode.show).bumps.concat(bumps),
          )
      ),
    ),
    later[0],
  ).map((video, idx) => ({ ...video, id: idx }));
}

function randInt(max) {
  return Math.floor(Math.random() * max);
}

export  { compilePlaylist};
