import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import StartMovie from './startMovie';
import EndMovie from './endMovie';
import Header from './header';
import {setHeader} from '../actions/game';
import './setup.css';

export class Setup extends React.Component {

	componentDidMount() {
	    this.props.dispatch(setHeader('setup'))
	}

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
	        	<Header />
				<div className="page-header">
					<h2 className="game-setup-page-title">How To Play</h2>
					<p>You must alternate selecting movies and cast members from those movies to connect the starting movie to the ending movie using the least amount of links.</p>  
					<ul className="instructions">
						<li>Start by selecting your starting and ending movies below.</li>
						<li>Begin typing a movie title, and then choose an option from the dropdown menu.</li>
						<li>Press ENTER or click finalize to ready each movie.</li>
						<li>When your movies are ready, click begin and have fun.</li>
					</ul> 
				</div>
				<div className="container-fluid game-setup-page">
					<h2 className="game-setup-page-title2">Game Set-Up</h2>
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

const mapStateToProps = ({game}) => ({
	finalizeStartButton: game.finalizeStartButton,
	finalizeEndButton: game.finalizeEndButton,
	startMovie: game.startMovie,
	endMovie: game.endMovie,
	headerType: game.headerType
});

export default connect(mapStateToProps)(Setup);