export function makePlaylistFulfilled(playlist) {
  return ({type: "MAKE_PLAYLIST_FULFILLED", payload: playlist})
}

