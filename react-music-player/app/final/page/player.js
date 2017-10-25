import React from 'react';
import Progress from '../components/progress';
import { Link } from 'react-router';
import './player.less';
let PubSub = require('pubsub-js');

let duration = null;

class Player extends React.Component {
	constructor(props) {
	  super(props);
	  this.state={
	  	progress: 0,
	  	volume: 0,
	  	isPlay: true,
	  	leftTime: '-'
	  };

	  //函数需要绑定，否则报错'setState'undefined
	  this.play = this.play.bind(this);
	  this.changeProgressHandler = this.changeProgressHandler.bind(this);
	}

	componentDidMount() {
		//绑定进度
		$("#player").bind($.jPlayer.event.timeupdate, (e)=> {
			duration = e.jPlayer.status.duration;
			this.setState({
				volume: e.jPlayer.options.volume * 100,
				progress: e.jPlayer.status.currentPercentAbsolute,
				leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
			});
		});
	}

	componentWillUnmout() {
		//解绑，不解绑会出现报错
		//setState(...): Can only update a mounted or mounting component.
		$("#player").unbind($.jPlayer.event.timeupdate);

	}

	//上下曲控制
	next() {
		PubSub.publish('PLAY_NEXT');
	}
	prev() {
		PubSub.publish('PLAY_PREV');
	}
	changeRepeat() {
		PubSub.publish('CHANAGE_REPEAT');
	}

	//进度条
	changeProgressHandler(progress) {
		$("#player").jPlayer('play', duration*progress);
		this.setState({isPlay:true});
	}

	//控制音量 
	changeVolumeHandler(progress) {
		$("#player").jPlayer('volume', progress);
	}

	//播放
	play() {
		if(this.state.isPlay) {
			$("#player").jPlayer('pause');
		} else {
			$("#player").jPlayer('play');
		}
		this.setState({
			isPlay: !this.state.isPlay
		});
	}

	formatTime(time) {
		time = Math.floor(time);
		let miniute = Math.floor(time / 60);
		let seconds = Math.floor(time % 60);

		return miniute + ':' + (seconds < 10 ? '0' + seconds : seconds);
	}

  render() {
    return (
      <div className="player-page">
        <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
        <div className="mt20 row">
        	<div className="controll-wrapper">
        		<h2 className="music-title">{this.props.currentMusicItem.title}</h2>
        		<h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
        		<div className="row mt20">
        			<div className="left-time -col-auto">-{this.state.leftTime}</div>
        			<div className="volume-container">
        				<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
        				<div className="volume-wrapper">
	                <Progress
										progress={this.state.volume}
										onProgressChange={this.changeVolumeHandler}
	                >
	                </Progress>
        				</div>
        			</div>
        		</div>
        		<div style={{height: 10, lineHeight: '10px'}}>
              <Progress
								progress={this.state.progress}
								onProgressChange={this.changeProgressHandler}
              >
              </Progress>
        		</div>
        		<div className="mt35 row">
        			<div>
          			<i className="icon prev" onClick={this.prev}></i>
          			<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
          			<i className="icon next ml20" onClick={this.next}></i>
        			</div>
        			<div className="-col-auto">
        				<i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat}></i>
        			</div>
        		</div>
        	</div>
        	<div className={`-col-auto cover ${this.state.isPlay ? 'rotate' : ''}`}>
        		<img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
        	</div>
        </div>
      </div>
    );
  }
}

export default Player;
