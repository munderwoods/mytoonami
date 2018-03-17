const takeByPattern = (lists, pattern) => {

  let listsCopy = lists.map(l => l.slice());
  let relevantLists = listsCopy.filter((_, idx) => pattern.includes(idx));
  let finalList = [];

  const totalRemaining = () => relevantLists.map(l => l.length).reduce((sum, count) => sum + count, 0);

  while(totalRemaining() > 0) {
      pattern.forEach(idx => finalList.push(listsCopy[idx].shift()));
  }

  return finalList.filter(element => element);
}

const updateServer = (data) => {
   return fetch('/api/update', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((response) => response.json())
};

const findCurrentEpisode = (broadcast) => {
  let episode = {};
  for(let i = 0; i < 4; i++) {
    if(broadcast.playlist.length > 2) {
      if(broadcast.sortablePlaylist.find(ep => ep.title === broadcast.playlist[broadcast.currentVideo + i].title)) {
        episode = broadcast.sortablePlaylist.find(ep => ep.title === broadcast.playlist[broadcast.currentVideo + i].title);
      }
    }
  }
  return episode;
}

export { findCurrentEpisode, updateServer, takeByPattern };
