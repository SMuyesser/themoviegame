import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import {addLink} from '../actions';
import {API_BASE_URL} from '../config';

import './guesslist.css';


export class GuessList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			currentLinkType: '',
			movieOrCastList: [],
			finalCastPic: '',
			finalMoviePic: '',
			finalCastDesc: '',
			finalMovieDesc: '',
			winStatement: ''
		};
	}

	componentDidMount() {
		//gets and displays cast list of starting movie when component mounts
		var startingMovie = this.props.startMovie;
		var component = this;
		axios.get(API_BASE_URL+'/game/movieoptions/'+startingMovie)
		  	.then((response) => {
			  	var movieId = response.data[0].id;
			  	axios.get(API_BASE_URL+'/game/moviedetails/'+movieId)
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
		axios.get(API_BASE_URL+'/game/castmembermovies/'+castMember.id)
		.then((response) => {
			const movieList = response.data.cast.map(movie => {
				//checks for win
				if(movie.id === this.props.endMovieId) {
					axios.get(API_BASE_URL+'/game/castInfo/'+castMember.id)
					.then((response) => {
						component.setState({
							currentLinkType: 'end',
							movieOrCastList: 'YOU WIN!',
							winStatement: castMember.name+' played '+movie.character+' in '+this.props.endMovie,
							finalCastPic: 'https://image.tmdb.org/t/p/w138_and_h175_bestv2' + castMember.profile_path,
							finalMoviePic: 'https://image.tmdb.org/t/p/w138_and_h175_bestv2' + movie.poster_path,
							finalCastDesc: response.data.biography,
							finalMovieDesc: movie.overview
						});
					})
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
		axios.get(API_BASE_URL+'/game/moviedetails/'+movie.id)
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

		let moviesOrCast = null;
		let guessTitle = <h1>{this.props.startMovie}</h1>;
		if(this.props.linkChain.length > 0) {
			guessTitle = <h1>{this.props.currentLinkTitle}</h1>;
		}
		//if state current link type = end, set state with win info
		if(this.state.currentLinkType === 'end') {
			guessTitle = <div id="gameHeaders">
							<h1>{this.state.movieOrCastList}</h1>
							<h1>{this.state.winStatement}</h1>
						</div>
			moviesOrCast =  <div id="gameWinInfo">
								<div id="gameWinCast">
									<h2>{this.props.currentLinkTitle}</h2>
									<img id="finalCastPic" src={this.state.finalCastPic} alt={this.state.finalCastPic+" image"}></img>
									<p>{this.state.finalCastDesc}</p>
								</div>
								<div id="gameWinMovie">
									<h2>{this.props.endMovie}</h2>
									<img id="finalMoviePic" src={this.state.finalMoviePic} alt={this.state.finalMoviePic+" image"}></img>
									<div id="description">
										<h3>Description</h3>
										<p>{this.state.finalMovieDesc}</p>
									</div>
								</div>
						    </div>
		}
		//if current link type = actors, display cast list
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
				<div className="col-lg-6 guess movie guesslist">
					<div id="guessTitle" className="game-text">{guessTitle}</div>
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