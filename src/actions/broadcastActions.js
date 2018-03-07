export function addToBroadcast(show) {
  return ({type: "ADD_TO_BROADCAST", payload: {show: show}})
}

export function removeFromBroadcast(show) {
  return ({type: "REMOVE_FROM_BROADCAST", payload: {show: show}})
}

export function addShowData(showData) {
  return ({type: "ADD_SHOW_DATA", payload: {showData: showData}})
}

export function removeShowData(show) {
  return ({type: "REMOVE_SHOW_DATA", payload: {show: show}})
}

export function editPlaylist(playlist) {
  return ({type: "EDIT_PLAYLIST", payload: playlist})
}

export function sortList(sort) {
  return ({type: "SORT_LIST", payload: {array: sort.array, oldIndex: sort.oldIndex, newIndex: sort.newIndex}})
}
