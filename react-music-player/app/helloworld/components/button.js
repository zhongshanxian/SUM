import React from 'react';

class Button extends React.Component {
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
          <button onClick={this.counterHandler}>Count {this.state.count}</button>
    	</div>
    );
  }
}


export default Button;
