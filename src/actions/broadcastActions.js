export function addToBroadcast(show) {
  return ({type: "ADD_TO_BROADCAST", payload: {show: show}})
}

export function removeFromBroadcast(show) {
  return ({type: "REMOVE_FROM_BROADCAST", payload: {show: show}})
}

export function addShowData(showData) {
  return ({type: "ADD_SHOW_DATA", payload: {showData: showData.showData}})
}

export function removeShowData(show) {
  return ({type: "REMOVE_SHOW_DATA", payload: {show: show}})
}

export function editPlaylist(playlist) {
  return ({type: "EDIT_PLAYLIST", payload: playlist})
}

export function sortList(sort) {
  return ({type: "SORT_LIST", payload: {array: sort.array, oldIndex: sort.oldIndex, newIndex: sort.newIndex, id: sort.id}})
}

export function loginStarted() {
  return ({type: "LOGIN_STARTED", payload:{fetching: true}})
}

export function loginFulfilled(userData) {
  return ({type: "LOGIN_FULFILLED", payload:{credential: {email: userData.results.credential.email, name: userData.results.credential.name, id: userData.results._id}, showData:userData.showData.map(x => JSON.parse(x)), data: userData.results.data}})
}

export function incrementVideoFulfilled(nextVideo) {
  return ({type: "INCREMENT_VIDEO_FULFILLED", payload: nextVideo})
}
