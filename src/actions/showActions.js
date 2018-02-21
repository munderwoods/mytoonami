export function showSwitchingStarted() {
  return ({type: "SHOW_SWITCHING_STARTED", payload:{buidling: true}})
}

export function showSwitchingFulfilled(show) {
  return ({type: "SHOW_SWITCHING_FULFILLED", payload: {show: show}})
}

