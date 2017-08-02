import React from 'react';
import {connect} from 'react-redux';

import './main.css';

export class GameGuess extends React.Component {
	render () {
		return (
			<div className="game-row">
				<div className="col-lg-6 guess movie">
					<div className="input-group">
						<h1 className="game-text">START:  {this.props.startMovie}</h1>
					</div>
				</div>
				<div className="col-lg-6 guess movie">
					<div className="input-group">
						<h1 className="game-text">END:  {this.props.endMovie}</h1>
					</div>
				</div>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	startMovie: state.startMovie,
	endMovie: state.endMovie
});

export default connect(mapStateToProps)(GameGuess);