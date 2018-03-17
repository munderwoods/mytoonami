import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import SortableItem from './SortableItem.js';

const SortableList = SortableContainer(({scrollToEpisodeAt, broadcast, highlighted, items, goToVideo}) => {
  return (
    <ul className="Playlist">
      {items.map((value, index) => (
        <SortableItem
          scrollToEpisodeAt={scrollToEpisodeAt}
          isCurrent= {(value.title === broadcast.currentEpisode.title) ? true : false}
          broadcast={broadcast}
          highlighted={highlighted}
          key={`item-${index}`}
          goToVideo={goToVideo}
          index={index}
          value={value} />
      ))}
    </ul>
  );
});

export default SortableList;
