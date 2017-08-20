import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import {addLink} from '../actions';
import {API_BASE_URL} from '../config';


export class GuessList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			currentLinkType: '',
			movieOrCastList: []
		};
	}

	componentDidMount() {
		//gets and displays cast list of starting movie when component mounts
		var startingMovie = this.props.startMovie;
		var component = this;
		axios.get(API_BASE_URL+'/movieoptions/'+startingMovie)
		  	.then((response) => {
			  	var movieId = response.data[0].id;
			  	axios.get(API_BASE_URL+'/moviedetails/'+movieId)
			  	.then((response) => {
			  		component.setState({
			  			currentLinkType: 'actors',
			  			movieOrCastList: response.data.cast
			  		})
			  	})
			  	.catch(function (error) {
			  		console.log(error);
			  	});
		  	})
			.catch(function (error) { 
			    console.log(error);
			});
	}

	//gets list of selected actors movies, checks if any of those movies are the final movie
	getMoviesFromActor(castMember) {
		this.props.dispatch(addLink(castMember.name));
		const component = this;
		axios.get(API_BASE_URL+'/castmembermovies/'+castMember.id)
		.then((response) => {
			const movieList = response.data.cast.map(movie => {
				//checks for win
				if(movie.id === this.props.endMovieId) {
					component.setState({
						currentLinkType: 'end',
						movieOrCastList: 'YOU WIN!  '+castMember.name+' was in the cast of '+this.props.endMovie
					});
				}
				return {
					'title': movie.title,
					'id': movie.id,
					'poster': movie.poster_path
				}
			});
			if(component.state.currentLinkType !== 'end') {
				component.setState({
					currentLinkType: 'movies',
					movieOrCastList: movieList
				});
			}
		})
		.catch(function (error) {
	  		console.log(error);
	  	});
	}

	//gets cast list from current movie
	getActorsFromMovie(movie) {
		console.log(movie);
		this.props.dispatch(addLink(movie.title));
		const component = this;
		axios.get(API_BASE_URL+'/moviedetails/'+movie.id)
	  	.then((response) => {
	  		component.setState({
	  			currentLinkType: 'actors',
	  			movieOrCastList: response.data.cast
	  		})
	  	})
		.catch(function (error) {
	  		console.log(error);
	  	});
	}

	render () {
		console.log(this.state.currentLinkType);
		console.log(this.props.linkChain);
		console.log(this.props.currentLinkTitle);
		console.log(this.props.endMovieId);
		let moviesOrCast = null;
		let guessTitle = this.props.startMovie;
		if(this.props.linkChain.length > 0) {
			guessTitle = this.props.currentLinkTitle;
		}
		//if state current link type = actors, display actors
		if(this.state.currentLinkType === 'end') {
			moviesOrCast = <h1>{this.state.movieOrCastList}</h1>
		}
		else if(this.state.currentLinkType === 'actors') {
			moviesOrCast = this.state.movieOrCastList.map((actor) => (
				<li key={actor.id}>
					<button onClick={() => { this.getMoviesFromActor(actor) }}>
						{actor.name}
						<img src={'https://image.tmdb.org/t/p/w138_and_h175_bestv2'+actor.profile_path} alt={actor.name+" image"}/>
					</button>
				</li>
			));			
		}
		//if state current link type = movies, display movie list
		else if(this.state.currentLinkType === 'movies') {
			moviesOrCast = this.state.movieOrCastList.map((movie) => (
				<li key={movie.id}>
					<button onClick={() => { this.getActorsFromMovie(movie) }}>
						{movie.title}
						<img src={'https://image.tmdb.org/t/p/w138_and_h175_bestv2'+movie.poster} alt={movie.title+" image"}/>
					</button>
				</li>
			));	
		}

		return (
			<div className="game-row" id="linkNav">
				<div className="col-lg-6 guess movie">
					<h1 id="startId" className="game-text">{guessTitle}</h1>
					<ul id="castList">
						{moviesOrCast}
					</ul>
				</div>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	startMovie: state.startMovie,
	linkChain: state.linkChain,
	currentLinkTitle: state.currentLinkTitle,
	endMovieId: state.endMovieId,
	endMovie: state.endMovie
});

export default connect(mapStateToProps)(GuessList);