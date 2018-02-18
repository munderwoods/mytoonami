export default function reducer(state={
  credential: {},
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
      return {
        ...state,
        fetching: false,
        fetched: true,
        credential: action.payload,
        loggedIn: true,
      };
    case "USER_SENT_TO_SERVER":
      return {...state, userSentToServer: action.payload.userSentToServer};
    default:
  };
  return state;
};



