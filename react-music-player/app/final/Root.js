import React, { render } from 'react';
import Logo from './components/logo';
import PlayerPage from './page/player';
import { MUSIC_LIST } from './config/config';
import ListPage from './page/list';
import { Router, IndexRoute, Link, Route, browserHistory, hashHistory} from 'react-router';
let PubSub = require('pubsub-js');

class App extends React.Component {
	constructor(props) {
	  super(props);
	  this.state={
	  	musicList: MUSIC_LIST,
	  	currentMusicItem: MUSIC_LIST[0],
	  	repeatType: 'cycle'
	  };

	  //函数需要绑定，否则报错'setState'undefined
	  //this.changeProgress = this.changeProgress.bind(this);
	}
	playWhenEnd() {
		if (this.state.repeatType === 'random') {
			let index = this.findMusicIndex(this.state.currentMusitItem);
			let randomIndex = randomRange(0, this.state.musicList.length - 1);
			while(randomIndex === index) {
				randomIndex = randomRange(0, this.state.musicList.length - 1);
			}
			this.playMusic(this.state.musicList[randomIndex]);
		} else if (this.state.repeatType === 'once') {
			this.playMusic(this.state.currentMusitItem);
		} else {
			this.playNext();
		}
	}
	playMusic(item) {
		$("#player").jPlayer("setMedia", {
			mp3: item.file
		}).jPlayer('play');
		this.setState({
			currentMusicItem: item
		});
	}
	playNext(type = 'next') {
		let index = this.findMusicIndex(this.state.currentMusitItem);
		if (type === 'next') {		
			index = (index + 1) % this.state.musicList.length;
		} else {
			index = (index + this.state.musicList.length - 1) % this.state.musicList.length;
		}
		let musicItem = this.state.musicList[index];
		this.setState({
			currentMusitItem: musicItem
		});
		this.playMusic(musicItem);
	}
	findMusicIndex(music) {
		let index = this.state.musicList.indexOf(music);
		return Math.max(0, index);
	}
	componentDidMount() {
		$("#player").jPlayer({
			supplied: 'mp3',
			wmode: 'window',
			useStateClassSkin: true
		});
		
		this.playMusic(this.state.musicList[0]);

		$("#player").bind($.jPlayer.event.ended, (e) => {
			this.playWhenEnd();
		});
		//订阅PLAY_MUSIC
		PubSub.subscribe('PLAY_MUSIC', (msg, item) => {
			this.playMusic(item);
		});
		//订阅DEL_MUSIC
		PubSub.subscribe('DEL_MUSIC', (msg, item) => {
			this.setState({
				musicList: this.state.musicList.filter((music) => {
					return music !== item;
				})
			});
		});
		PubSub.subscribe('PLAY_NEXT', () => {
			this.playNext();
		});
		PubSub.subscribe('PLAY_PREV', () => {
			this.playNext('prev');
		});
		let repeatList = [
			'cycle',
			'once',
			'random'
		];
		PubSub.subscribe('CHANAGE_REPEAT', () => {
			let index = repeatList.indexOf(this.state.repeatType);
			index = (index + 1) % repeatList.length;
			this.setState({
				repeatType: repeatList[index]
			});
		});
	}
	componentWillUnmout() {
		//解绑
		PubSub.unsubscribe('PLAY_MUSIC');
		PubSub.unsubscribe('DEL_MUSIC');
		PubSub.unsubscribe('PLAY_NEXT');
		PubSub.unsubscribe('PLAY_PREV');
		PubSub.unsubscribe('CHANAGE_REPEAT');
	}
  render() {
    return (
    	<div className="container">
        <Logo />
        {React.cloneElement(this.props.children, this.state)}
      </div>
    );
  }
}

class Root extends React.Component {
	render() {
		return (
			<Router history={hashHistory}>
	      <Route path="/" component={App}>
	        <IndexRoute component={PlayerPage}/>
	        <Route path="/list" component={ListPage} />
	      </Route>
	    </Router>
		);
	}
}

export default Root;