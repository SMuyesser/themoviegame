import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import StartMovie from './startMovie';
import EndMovie from './endMovie';
import {setFinalCastOptions} from '../actions';
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

	componentDidUpdate() {
		//gets movie details for end movie
		axios.get('https://api.themoviedb.org/3/search/movie?api_key=7e9a1ff04b7576b3330211792aa796b5&language=en-US&query='+
			this.props.endMovie+'&page=1&include_adult=false')
		  	.then((response) => {
			  	var endMovieId = response.data.results[0].id;
			  	//gets cast from end movie details to check for win
			  	axios.get('https://api.themoviedb.org/3/movie/'+endMovieId+'/credits?api_key=7e9a1ff04b7576b3330211792aa796b5')
			  	.then((response) => {
			  		const ids = response.data.cast.map(actor => {
			  			return actor.id;
			  		});
			  		this.props.dispatch(setFinalCastOptions(ids));
			  	})
			  	.catch(error => {
			  		console.error(error);
			  	})
		  	});
	}


	render() {
	    return (
	        <div className="setup">
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
	endMovie: state.endMovie,
	finalLinkCast: state.finalLinkCast
});

export default connect(mapStateToProps)(Setup);