import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import SortableItem from './SortableItem.js';

const SortableList = SortableContainer(({broadcast, highlighted, items, goToVideo}) => {
  return (
    <ul className="Playlist">
      {items.map((value, index) => (
        <SortableItem
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
