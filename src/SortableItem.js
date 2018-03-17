import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

const SortableItem = SortableElement(({isCurrent, broadcast, highlighted, value, goToVideo}) =>
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
      }}
    >
      {(value.id + 1) + " - " + value.title}
    </a>
  </li>);


export default SortableItem;
