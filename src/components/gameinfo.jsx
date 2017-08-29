import React from 'react';
import {connect} from 'react-redux';

export class GameInfo extends React.Component {

	render () {
		return (
			<div className="game-row">
				<div className="col-lg-6 guess gameInfo">
					<ul id="gameInfoText">
						<li><h1 className="gameInfo-text">Your Best:  </h1></li>
						<li><h1 className="gameInfo-text">All Time Best: </h1></li>
						<li><h1 className="gameInfo-text">Links Used: {this.props.linkChain.length}</h1></li>
					</ul>
				</div>
			</div>
		);
	}
};

const mapStateToProps = ({game}) => ({
	linkChain: game.linkChain
});

export default connect(mapStateToProps)(GameInfo);

