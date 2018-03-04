export function addToBroadcastFulfilled(show) {
  return ({type: "ADD_TO_BROADCAST_FULFILLED", payload: {show: show}})
}
export function removeFromBroadcastFulfilled(show) {
  return ({type: "REMOVE_FROM_BROADCAST_FULFILLED", payload: {show: show}})
}
