import React from 'react';
import {connect} from 'react-redux';

import './main.css';

export class GameInfo extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			currentGameLink: []
		};
	}

	render () {
		return (
			<div className="game-row">
				<div className="col-lg-6 guess">
					<ul id="gameInfoText">
						<li><h1 className="gameInfo-text">START:  {this.props.startMovie}</h1></li>
						<li><h1 className="gameInfo-text">END:  {this.props.endMovie}</h1></li>
						<li><h1 className="gameInfo-text">LINKS USED: {this.props.linksUsed}</h1></li>
					</ul>
				</div>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	startMovie: state.startMovie,
	endMovie: state.endMovie,
	endMovieId: state.endMovieId,
	linksUsed: state.linksUsed,
	cast: state.cast
});

export default connect(mapStateToProps)(GameInfo);