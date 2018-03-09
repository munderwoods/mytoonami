import { arrayMove} from 'react-sortable-hoc';
import {compilePlaylist} from '../compilePlaylist.js';

export default function reducer(state={
  shows: [],
  showData: [],
  playlist: [],
  sortablePlaylist: [],
}, action) {
  switch(action.type) {
    case "ADD_TO_BROADCAST":
      return {...state, shows: [...state.shows, action.payload.show]};
    case "REMOVE_FROM_BROADCAST":
      const showFields = {
        shows: state.shows.filter(x => x !== action.payload.show),
        showData: state.showData.filter(x => x.showData.id !== action.payload.show),
        sortablePlaylist: state.sortablePlaylist.filter(x => x.show !== action.payload.show),
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
    default:
  };
  return state;
};
