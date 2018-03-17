import React from 'react';
import {SortableElement} from 'react-sortable-hoc';

const SortableItem = SortableElement(({scrollToEpisodeAt, isCurrent, broadcast, highlighted, value, goToVideo}) =>
  <li className={
    "PlayBox "
      + value.show
      + " "
      + (isCurrent ? "Highlighted" : "")
  }>
    <a
      className="PlayBoxAnchor"
      href=" "
      onClick={(e) => {
        e.preventDefault();
        const title = e.currentTarget.textContent;
        goToVideo(title)
        scrollToEpisodeAt(e.currentTarget.parentElement.parentElement, e.currentTarget.offsetLeft);
      }}
    >
      {(value.id + 1) + " - " + value.title}
    </a>
  </li>);


export default SortableItem;
