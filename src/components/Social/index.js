import React, { Component } from 'react';
import './index.css';
import Facebook from './images/facebook.svg';
import Twitter from './images/twitter.svg';
import Google from './images/google.svg';


class Social extends Component {

	
	render() {

		return (
			<div className="social">
				<img alt="facebook auth" className="facebook" src={Facebook} onClick={this.props.fbLogin} />
				<img alt="twitter auth" className="twitter" src={Twitter} onClick={this.props.ttLogin} />
				<img alt="google auth" className="google" src={Google} onClick={this.props.ggLogin} />
			</div>
		)
	};
	
}

export default Social;