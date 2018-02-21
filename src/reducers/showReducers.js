export default function reducer(state={
  show: null,
  building: false,
  built: false,
}, action) {
  switch(action.type) {
    case "SHOW_SWITCHING_STARTED":
      return {...state, building: true};
    case "SHOW_SWITCHING_REJECTED":
      return {...state, building: false, error: action.payload};
    case "SHOW_SWITCHING_FULFILLED":
      return {...state, building: false, built: true, show: action.payload.show};
    default:
  };
  return state;
};


