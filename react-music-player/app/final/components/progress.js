import React from 'react';
require('./progress.less');

class Progress extends React.Component {
	constructor(props) {
	  super(props);
    this.state={
      barColor: '#2f9842'
    }
	  //用class方法创造组件，函数需要绑定，否则报错'setState'undefined
	  this.changeProgress = this.changeProgress.bind(this);
	}
  changeProgress(e) {
    let progressBar = this.refs.progressBar;
    let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    //先判断存不存在
    this.props.onProgressChange && this.props.onProgressChange(progress);
    
  }
  render() {
    return (
    	<div 
        className="components-progress" 
        ref="progressBar"
        onClick={this.changeProgress}
      >
    		<div 
          className="progress" 
          style={{width:`${this.props.progress}%`, background: this.state.barColor}}
        >
    		</div>
    	</div>
    );
  }
}

export default Progress;
