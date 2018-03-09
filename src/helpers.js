function makeSortableList(state) {
  console.log(state)
  let list = [];
  let length = 0;
  for (var i = 0; i < state.shows.length; i++) {
    length = length + state.showData.find(x => x.showData.id === state.shows[i]).showData.episodes.length;
  }
  for (var i = 0; i < length; i++) {
    for (var x =0; x < state.shows.length; x++) {
      if(state.showData[x].showData.episodes[i]) {
        list.push(state.showData[x].showData.episodes[i])
      }
    }
  }
  return list;
}

export { makeSortableList };
