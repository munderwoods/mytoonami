import React, {Component} from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) => <li className="PlayBox"><a href=" ">{value.title}</a></li>);

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

  state = {
    items: this.props.show,
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
    console.log(this.state.items)
  };

	componentDidMount() {
}

  render() {
    return <SortableList axis={"x"} helperClass={"Helper"} lockAxis={"x"} items={this.state.items} onSortEnd={this.onSortEnd} />;
  }

}


export default Playlist;
