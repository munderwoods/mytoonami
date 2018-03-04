export default function reducer(state={
  shows: [],
}, action) {
  switch(action.type) {
    case "SHOW_SWITCHING_REJECTED":
      return {...state, error: action.payload};
    case "ADD_TO_BROADCAST_FULFILLED":
      return {...state, shows: [...state.shows, action.payload.show]};
    case "REMOVE_FROM_BROADCAST_FULFILLED":
      return {...state, shows: [...state.shows].filter((x) => x !== action.payload.show)};
    default:
  };
  return state;
};
