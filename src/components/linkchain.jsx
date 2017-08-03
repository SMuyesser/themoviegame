import React from 'react';
import {connect} from 'react-redux';

import './main.css';

export class LinkChain extends React.Component {
	render () {
		return (
			<div className="game-row" id="linkChain">
				<div className="col-lg-6 guess movie">
						<h1 className="game-text" id="linkChainHeader">Link Chain Will Go Here</h1>
						<ul id="selectedLinks">
							<li>{this.props.startMovie}</li>
						</ul>
				</div>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	startMovie: state.startMovie,
	endMovie: state.endMovie
});

export default connect(mapStateToProps)(LinkChain);