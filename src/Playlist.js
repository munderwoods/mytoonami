import React, {Component} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) => <li className="PlayBox"><a className="PlayBoxAnchor" href=" ">{(value.id +1) + " - " + value.title}</a></li>);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul className="Playlist">
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class Playlist extends Component {

  onSortEnd = ({oldIndex, newIndex}) => {
    console.log(oldIndex, newIndex);
    this.props.sortShows(this.props.sortablePlaylist, oldIndex, newIndex);
  };

	componentDidMount() {
}

  render() {
    return <SortableList axis={"x"} helperClass={"Helper"} lockAxis={"x"} items={this.props.sortablePlaylist} onSortEnd={this.onSortEnd} />;
  }

}


export default Playlist;
