export default function reducer(state={
  playlist: [],
}, action) {
  switch(action.type) {
    case "MAKE_PLAYLIST_ERROR":
      return {...state, error: action.payload};
    case "MAKE_PLAYLIST_FULFILLED":
      return {...state, playlist: action.payload};
    default:
  };
  return state;
};
