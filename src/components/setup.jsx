import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import StartMovie from './startMovie';
import EndMovie from './endMovie';

import './main.css';

export class Setup extends React.Component {

	checkGameStart(event) {
		console.log(this.props.finalizeStartButton);
		console.log(this.props.finalizeEndButton);
		console.log(this.props.startMovie);
		console.log(this.props.endMovie);
		if (this.props.finalizeStartButton !== 'Ready!' && this.props.finalizeEndButton !== 'Ready!') {
			alert('You must select and ready both start and end movies')
			event.preventDefault();
		} else if (this.props.finalizeStartButton !== 'Ready!') {
			alert('You must select and ready a start movie')
			event.preventDefault();
		} else if (this.props.finalizeEndButton !== 'Ready!') {
			alert('You must select and ready an end movie')
			event.preventDefault();
		}
	}

	render() {
	    return (
	        <div className="setup">
				<div className="page-header">
					<h2 className="game-setup-page-title">How To Play</h2>
					<p>Player must alternate selecting movies and cast members from those movies to connect the starting movie to the ending movie.</p>
					<p>Select your starting and ending movies below.</p>
				</div>
				<div className="container-fluid game-setup-page">
					<h2 className="game-setup-page-title">Game Set-Up</h2>
					<StartMovie />
					<EndMovie />
					<div className="game-setup-page-begin-btn">
						<Link className="btn btn-danger btn-lg begin-game-btn" to="/game" role="button" onClick={e => this.checkGameStart(e)}>Begin Game</Link>
					</div>
				</div>
			</div>
	    );
	}
};

const mapStateToProps = state => ({
	finalizeStartButton: state.finalizeStartButton,
	finalizeEndButton: state.finalizeEndButton,
	startMovie: state.startMovie,
	endMovie: state.endMovie
});

export default connect(mapStateToProps)(Setup);