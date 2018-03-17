import React, {Component} from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import SortableList from './SortableList.js';

class Playlist extends Component {

  onSortEnd = ({oldIndex, newIndex}) => {
    this.props.sortShows(this.props.sortablePlaylist, oldIndex, newIndex);
  };

  render() {
    return <SortableList
        broadcast={this.props.broadcast}
        highlighted={this.props.highlighted}
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
