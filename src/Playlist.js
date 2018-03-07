import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value, goToVideo}) =>
  <li className={"PlayBox " + value.show}>
    <a
      className="PlayBoxAnchor"
      href=" "
      onClick={(e) => {
        e.preventDefault();
        const title = e.currentTarget.textContent;
        goToVideo(title)
      }}
    >
      {(value.id +1) + " - " + value.title}
    </a>
  </li>);

const SortableList = SortableContainer(({items, goToVideo}) => {
  return (
    <ul className="Playlist">
      {items.map((value, index) => (
        <SortableItem  key={`item-${index}`} goToVideo={goToVideo} index={index} value={value} />
      ))}
    </ul>
  );
});

class Playlist extends Component {

  onSortEnd = ({oldIndex, newIndex}) => {
    this.props.sortShows(this.props.sortablePlaylist, oldIndex, newIndex);
  };

  render() {
    return <SortableList
        goToVideo={this.props.goToVideo}
        axis={"x"}
        helperClass={"Helper"}
        lockAxis={"x"}
        items={this.props.sortablePlaylist}
        pressDelay={200}
        onSortEnd={this.onSortEnd}
      />;
  }
}

export default Playlist;
