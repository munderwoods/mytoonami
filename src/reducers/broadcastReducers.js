import { arrayMove} from 'react-sortable-hoc';
import {compilePlaylist} from '../compilePlaylist.js';

export default function reducer(state={
  credential: {credential: {name: ""}},
  fetching: false,
  fetched: false,
  loggedIn: false,
  userSentToServer: false,
  error: null,
  shows: [],
  showData: [],
  playlist: [],
  sortablePlaylist: [],
  currentVideo: 0,
}, action) {
  switch(action.type) {
    case "LOGIN_STARTED":
      return {...state, fetching: true};
    case "LOGIN_FULFILLED":
      const currentVideo = action.payload.data.currentVideo !== undefined ? action.payload.data.currentVideo : 0;
      return {
        ...state,
        fetching: false,
        fetched: true,
        credential: action.payload.credential,
        loggedIn: true,
				shows: action.payload.data.shows,
				sortablePlaylist: action.payload.data.sortablePlaylist,
        showData: action.payload.showData,
        currentVideo: currentVideo,
      };
    case "ADD_TO_BROADCAST":
      return {...state, shows: [...state.shows, action.payload.show]};
    case "REMOVE_FROM_BROADCAST":
      const showFields = {
        shows: state.shows.filter(x => x !== action.payload.show),
        showData: state.showData.filter(x => x.id !== action.payload.show),
        sortablePlaylist: state.sortablePlaylist.filter(x => x.show !== action.payload.show),
        currentVideo: 0,
      };
      return {
        ...state,
        ...showFields,
        playlist: [...compilePlaylist(showFields)],
      };
    case "ADD_SHOW_DATA":
      return {...state, showData: [...state.showData, action.payload.showData]};
    case "EDIT_PLAYLIST":
      return {...state, playlist: action.payload};
    case "SORT_LIST":
      return {...state, sortablePlaylist: arrayMove(action.payload.array, action.payload.oldIndex, action.payload.newIndex)};
    case "INCREMENT_VIDEO_FULFILLED":
      return {...state, currentVideo: action.payload};
    default:
  };
  return state;
};
