import React from 'react';
import Progress from './components/progress';

class Root extends React.Component {
	constructor(props) {
	  super(props);
	  this.state={
	  	progress: 0
	  };

	  //函数需要绑定，否则报错'setState'undefined
	  //this.changeProgress = this.changeProgress.bind(this);
	}
	componentDidMount() {
		$("#player").jPlayer({
			ready: function(){
				$(this).jPlayer('setMedia', {
					mp3:"http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3"
				}).jPlayer('play');
			},
			supplied: 'mp3',
			wmode: 'window',
			useStateClassSkin: true
		});
		//绑定进度
		$("#player").bind($.jPlayer.event.timeupdate, (e)=> {
			this.setState({
				progress: Math.round(e.jPlayer.status.currentTime)
			});
		});
	}
	componentWillUnmout() {
		//解绑
		$("#player").unbind($.jPlayer.event.timeupdate);
	}
  render() {
    return (
    	<div>
        <h1>Welcome to the React lesson~</h1>
        <h3>Let us play music</h3>
        <Progress
					progress={this.state.progress}
        >
        </Progress>
      </div>
    );
  }
}

export default Root;