export function sortListFulfilled(sort) {
  return ({type: "SORT_LIST_FULFILLED", payload: {array: sort.array, oldIndex: sort.oldIndex, newIndex: sort.newIndex}})
}
