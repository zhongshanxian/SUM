import React from 'react';
import Button from './components/button';

class Root extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    count: 4
	  };
	  //函数需要绑定，否则报错'setState'undefined
	  this.counterHandler = this.counterHandler.bind(this);
	}
	counterHandler () {
		this.setState({
			count: this.state.count + 1
		});
	}
  render() {
    return (
    	<div>
          <p>hello world，welcome to the React lesson~</p>
          <Button></Button>
      </div>
    );
  }
}

export default Root;
