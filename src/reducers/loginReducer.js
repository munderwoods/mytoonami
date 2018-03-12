export default function reducer(state={
  credential: {credential: {name: ""}},
  fetching: false,
  fetched: false,
  loggedIn: false,
  userSentToServer: false,
  error: null,
}, action) {
  switch(action.type) {
    case "LOGIN_STARTED":
      return {...state, fetching: true};
    case "LOGIN_REJECTED":
      return {...state, fetching: false, error: action.payload};
    case "LOGIN_FULFILLED":
    console.log(action.payload);
      return {
        ...state,
        fetching: false,
        fetched: true,
        credential: action.payload.credential,
        loggedIn: true,
      };
    default:
  };
  return state;
};



