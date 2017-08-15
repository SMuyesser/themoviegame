import React from 'react';
import {connect} from 'react-redux';

import './main.css';

export class LinkChain extends React.Component {
	render () {
		return (
			<div className="game-row" id="linkChain">
				<div className="col-lg-6 guess movie">
						<h1 className="game-text" id="linkChainHeader">Game Chain</h1>
						<ul id="selectedLinks">
							<li>{this.props.startMovie}</li>
							{this.props.linkChain.map((chainLink, index) => {
								return <li key={index}>{chainLink}</li>
							})}
							<li>{this.props.endMovie}</li>
						</ul>
				</div>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	startMovie: state.startMovie,
	endMovie: state.endMovie,
	linkChain: state.linkChain
});

export default connect(mapStateToProps)(LinkChain);