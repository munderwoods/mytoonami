import React, {Component} from 'react';
import SortableList from './SortableList.js';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.scroll = this.scroll.bind(this);
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.props.sortShows(this.props.sortablePlaylist, oldIndex, newIndex);
  };

  scroll() {
    console.log(this.list, this.props.children);

  }


  render() {
    return <SortableList
        scrollToEpisodeAt={this.props.scrollToEpisodeAt}
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
