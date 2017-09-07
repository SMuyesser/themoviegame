import React from 'react';
import {connect} from 'react-redux';

import './linkchain.css';

export class LinkChain extends React.Component {

	render () {
		return (
			<div className="game-row" id="linkChain">
				<div className="linkChain">
						<h1 className="game-text" id="linkChainHeader">Game Chain</h1>
						<ul id="selectedLinks">
							<li id="startLi">{this.props.startMovie}</li>
							{this.props.linkChain.map((chainLink, index) => {
								return <li className="middleLi" key={index}>{chainLink}</li>
							})}
							<li id="endLi">{this.props.endMovie}</li>
						</ul>
				</div>
			</div>
		);
	}
};

const mapStateToProps = ({game}) => ({
	startMovie: game.startMovie,
	endMovie: game.endMovie,
	linkChain: game.linkChain
});

export default connect(mapStateToProps)(LinkChain);