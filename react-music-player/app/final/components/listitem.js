import React from 'react';
require('./listitem.less');
let PubSub = require('pubsub-js');

class ListItem extends React.Component {
	constructor(props) {
	  super(props);

	  //函数需要绑定，否则报错'setState'undefined
	}
	deleteHandler(item, event) {
		event.stopPropagation();
		PubSub.publish('DEL_MUSIC', item);
	}
	playMusic(item, e) {
		PubSub.publish('PLAY_MUSIC', item);
	}
  render() {
  	let item = this.props.data;
      return (
          <li onClick={this.playMusic.bind(this, item)} className={`row components-listitem${this.props.focus ? ' focus' : ''}`}>
              <p><span className="bold">{item.title}</span>  -  {item.artist}</p>
              <p onClick={this.deleteHandler.bind(this, item)} className="-col-auto delete"></p>
          </li>
      );
  }
}

export default ListItem;