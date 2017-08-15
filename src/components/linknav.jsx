import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import {addLink, showTitle} from '../actions';

import './main.css';

export class LinkNav extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			currentLinkType: '',
			movieOrCastList: [],
			gameStatus: 'Not Over'
		};
	}

	componentDidMount() {
		//gets and displays cast list of starting movie
		var startId = this.props.startMovie;
		var component = this;
		axios.get('https://api.themoviedb.org/3/search/movie?api_key=7e9a1ff04b7576b3330211792aa796b5&language=en-US&query='+
			startId+'&page=1&include_adult=false')
		  	.then((response) => {
			  	var movieId = response.data.results[0].id;
			  	axios.get('https://api.themoviedb.org/3/movie/'+movieId+'/credits?api_key=7e9a1ff04b7576b3330211792aa796b5')
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

	getMoviesFromActor(castMember) {
		this.props.dispatch(addLink(castMember.name), showTitle(castMember.name));
		const component = this;
		axios.get('https://api.themoviedb.org/3/person/'+castMember.id+'/movie_credits?api_key=7e9a1ff04b7576b3330211792aa796b5&language=en-US')
		.then((response) => {
			const movieList = response.data.cast.map(movie => {
				if(movie.id === this.props.endMovieId) {
					component.setState({
						gameStatus: "Over"
					})
					return alert('YOU WIN!  '+castMember.name+' was in the cast of '+this.props.endMovie);
				} else {
					return {
						'title': movie.title,
						'id': movie.id,
						'poster': movie.poster_path
					}
				}
			});
			component.setState({
				currentLinkType: 'movies',
				movieOrCastList: movieList
			});
		})
		.catch(function (error) {
	  		console.log(error);
	  	});
	}

	getActorsFromMovie(movie) {
		console.log(movie);
		this.props.dispatch(addLink(movie.title), showTitle(movie.title));
		const component = this;
		axios.get('https://api.themoviedb.org/3/movie/'+movie.id+'/credits?api_key=7e9a1ff04b7576b3330211792aa796b5')
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
		if(this.state.currentLinkType === 'actors') {
			moviesOrCast = this.state.movieOrCastList.map((actor, index) => (
				<li key={index}>
					<button onClick={() => { this.getMoviesFromActor(actor) }}>
						{actor.name}
						<img src={'https://image.tmdb.org/t/p/w138_and_h175_bestv2'+actor.profile_path} alt={actor.name+" image"}/>
					</button>
				</li>
			));			
		}
		else if(this.state.currentLinkType === 'movies') {
			moviesOrCast = this.state.movieOrCastList.map((movie, index) => (
				<li key={index}>
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
					<h1 id="startId" className="game-text">{this.props.currentLinkTitle}</h1>
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

export default connect(mapStateToProps)(LinkNav);