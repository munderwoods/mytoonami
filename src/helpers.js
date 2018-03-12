const takeByPattern = (lists, pattern) => {

  let listsCopy = lists.map(l => l.slice());
  let relevantLists = listsCopy.filter((_, idx) => pattern.includes(idx));
  let finalList = [];

  const totalRemaining = () => relevantLists.map(l => l.length).reduce((sum, count) => sum + count, 0);

  while(totalRemaining() > 0) {
      pattern.forEach(idx => finalList.push(listsCopy[idx].shift()));
  }

  return finalList.filter(element => element);
}

const updateServer = (data) => {
   return fetch('/api/update', {
    method: 'POST',
    body: JSON.stringify(data),
  }).then((response) => response.json())
};

export { updateServer, takeByPattern };
