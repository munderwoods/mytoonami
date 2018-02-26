import { arrayMove} from 'react-sortable-hoc';

export default function reducer(state={
  sortableList: [],
}, action) {
  switch(action.type) {
    case "SORT_LIST_ERROR":
      return {...state, error: action.payload};
    case "SORT_LIST_FULFILLED":
      return {...state, sortableList: arrayMove(action.payload.array, action.payload.oldIndex, action.payload.newIndex)};
    default:
  };
  return state;
};
