import { arrayMove} from 'react-sortable-hoc';

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
      return {...state, shows: [...state.shows].filter((x) => x !== action.payload.show)};
    case "ADD_SHOW_DATA":
      return {...state, showData: [...state.showData, action.payload.showData]};
    case "REMOVE_SHOW_DATA":
      return {...state, showData: [...state.shows].filter((x) => x !==action.payload.showData.title)};
    case "EDIT_PLAYLIST":
      return {...state, playlist: action.payload};
    case "SORT_LIST":
      return {...state, sortablePlaylist: arrayMove(action.payload.array, action.payload.oldIndex, action.payload.newIndex)};
    default:
  };
  return state;
};
