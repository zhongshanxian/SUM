import React from 'react';

class Progress extends React.Component {
	
  render() {
    return (
    	<p>
    		已播放：{ this.props.progress }s
    	</p>
    );
  }
}

export default  Progress;