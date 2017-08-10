import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {setMaxLinks} from '../actions';

import './main.css';

export class GameInfo extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			currentGameLink: [],
			gameStatus: "Not Over"
		};
	}

	checkForWin(currentMovies, finalMovie) {
		var matchedMovies = currentMovies.filter((movie) => {
			return finalMovie.indexOf(movie) > -1
		});
		if(matchedMovies.length > 0){
			//if movie is the final movie max links equals 3 (actor1 + movie2 + actor2) and game is over
			this.setState({
				gameStatus: "Over"
			})
			console.log(matchedMovies);
			console.log(this.state.gameStatus);
			return matchedMovies;
		}
		else {
			//if there is no match, increment max links by 1
			this.props.dispatch(setMaxLinks(this.props.maxLinks+1));
			console.log(this.state.gameStatus);
		}
	}



	componentDidMount() {	
		const component = this;	
  		//gets movie details for start movie
	  	axios.get('https://api.themoviedb.org/3/search/movie?api_key=7e9a1ff04b7576b3330211792aa796b5&language=en-US&query='+this.props.startMovie+'&page=1&include_adult=false')
  		.then((response) => {
		  	//gets cast from starting movie details
		  	var filmId = response.data.results[0].id;
		  	axios.get('https://api.themoviedb.org/3/movie/'+filmId+'/credits?api_key=7e9a1ff04b7576b3330211792aa796b5')
		  	.then((response) => {
		  		//find all cast ids which is needed to get their movie ids
		  		const castIds = response.data.cast.map(actor => {
		  			return actor.id;
		  		});
		  		//get each actors movie id list and push them to allMovieIds:
		  		var movieIds = [];
		  		castIds.map(castId => {
		  			return axios.get('https://api.themoviedb.org/3/person/'+castId+'/movie_credits?api_key=7e9a1ff04b7576b3330211792aa796b5&language=en-US')
		  			.then((response) => {
		  				response.data.cast.map(movie => {
		  					return movieIds.push(movie.id);
		  				})
		  			})
		  			.catch(error => {
		  				console.error(error);
		  			})
		  		})
				console.log(movieIds);
			})
			.catch(error => {
	  			console.error(error);
	  		})
			//check to see if any movies match final movie
			console.log('AAAAAAAAAAAAAAA '+ component.state.currentGameLink);
			console.log('BBBBBBBBBBBBBBB ' + this.props.endMovieId);
			component.checkForWin(component.state.currentGameLink, this.props.endMovieId);
	  		console.log('Current Game Link: '+component.state.currentGameLink);
	  		console.log('Next Game Link: '+component.state.nextGameLink);
	  		//compare current link against final link to see if game is won
		})
		.catch(error => {
  			console.error(error);
  		});

	}
	

	render () {
		return (
			<div className="game-row">
				<div className="col-lg-6 guess">
					<ul id="gameInfoText">
						<li><h1 className="gameInfo-text">START:  {this.props.startMovie}</h1></li>
						<li><h1 className="gameInfo-text">END:  {this.props.endMovie}</h1></li>
						<li><h1 className="gameInfo-text">MAXIMUM LINKS ALLOWED:  {this.props.maxLinks}</h1></li>
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
	maxLinks: state.maxLinks,
	linksUsed: state.linksUsed,
	cast: state.cast
});

export default connect(mapStateToProps)(GameInfo);