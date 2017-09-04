import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {addLink, newGame} from '../actions/game';
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
			winStatement: '',
			startMoviePic: ''
		};
	}

	componentDidMount() {
		//gets and displays cast list of starting movie when component mounts
		var startingMovie = this.props.startMovie;
		var component = this;
		axios.get(API_BASE_URL+'/game/movieoptions/'+startingMovie)
		  	.then((response) => {
			  	var movieId = response.data[0].id;
			  	var moviePic = response.data[0].poster_path;
			  	axios.get(API_BASE_URL+'/game/moviedetails/'+movieId)
			  	.then((response) => {
			  		component.setState({
			  			currentLinkType: 'actors',
			  			movieOrCastList: response.data.cast,
			  			startMoviePic: 'https://image.tmdb.org/t/p/w138_and_h175_bestv2'+moviePic
			  		});
			  	})
			  	.catch(function (error) {
			  		console.log(error);
			  	});
		  	})
			.catch(function (error) { 
			    console.log(error);
			});
	}

	newGame() {
        this.props.dispatch(newGame());
    };

	//check status of score update
	checkStatus(response) {
	  if (response.status >= 200 && response.status < 300) {
	    return response
	  } else {
	    var error = new Error(response.statusText)
	    error.response = response
	    throw error
	  }
	}

	//sends scores to db
	update(data) {
		return axios(API_BASE_URL+'/players/scores/'+this.props.playername, {
			method: 'put',
			data: data,
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    }
		})
    	.then(this.checkStatus)
    	.then(()=>console.log('updated!!!'))
	}


	//gets list of selected actors movies, checks if any of those movies are the final movie
	getMoviesFromActor(castMember) {
		this.props.dispatch(addLink(castMember.name));
		const component = this;
		axios.get(API_BASE_URL+'/game/castmembermovies/'+castMember.id)
		.then((response) => {
			const movieList = response.data.cast.map(movie => {
				//checks for win, and sets state for win page
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
						})
						//if win, scores are sent to db and entry is updated
						const scores = {
							start: this.props.startMovie,
							startPic:  this.state.startMoviePic,
							end: this.props.endMovie,
							endPic: this.state.finalMoviePic,
							links: this.props.linkChain,
							linkCount: this.props.linkChain.length
						}
						this.update(scores);
					})
				}
				return {
					'title': movie.title,
					'id': movie.id,
					'poster': movie.poster_path
				}
			});
			//if not win sets up for next link
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
		console.log(this.props);
		let moviesOrCast = null;
		let replayButton = null;
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
			replayButton =  <div className="restart-game-btn-div">
		                        <Link id="restart-game-btn" to="/setup" 
		                              role="button" onClick={() => this.newGame()}>{this.props.feedback}</Link>
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
					{replayButton}
					<ul id="castList">
						{moviesOrCast}
					</ul>
				</div>
			</div>
		);
	}
};

const mapStateToProps = state => {
    const {currentPlayer} = state.auth;
    return {
        loggedIn: currentPlayer !== null,
        playername: currentPlayer ? state.auth.currentPlayer.playername : '',
        scores: state.game.scores,
		startMovie: state.game.startMovie,
		linkChain: state.game.linkChain,
		currentLinkTitle: state.game.currentLinkTitle,
		endMovieId: state.game.endMovieId,
		endMovie: state.game.endMovie,
		feedback: state.game.feedback
    };
};

export default connect(mapStateToProps)(GuessList);