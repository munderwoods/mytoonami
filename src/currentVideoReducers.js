export default function reducer(state={
  currentVideo: 0,
}, action) {
  switch(action.type) {
    case "INCREMENT_VIDEO_REJECTED":
      return {...state, error: action.payload};
    case "INCREMENT_VIDEO_FULFILLED":
      return {...state, currentVideo: action.payload};
    default:
  };
  return state;
};
