import React from 'react';
import ListItem from '../components/listitem';

class List extends React.Component {
    render() {
    	let Items = this.props.musicList.map((item) => {
    		return (
    			<ListItem
    				key={item.id}
    				data={item}
            focus={this.props.currentMusicItem === item}
    			></ListItem>
    		);
    	});
      return (
          <ul>
              { Items }
          </ul>
      );
    }
}

export default List;