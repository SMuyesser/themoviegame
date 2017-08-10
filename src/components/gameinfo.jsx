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
			nextGameLink: [],
			shortestLinkChain: [],
			gameStatus: "Not Over"
		};
	}

/*	containsAny(finalCast, currentCast) {
	    var matchedCast = finalCast.filter((name) => { 
	    	return currentCast.indexOf(name) > -1
	    });   
	    if(matchedCast.length > 0){
	    	this.props.dispatch(setMaxLinks(1));
	    	return matchedCast;
	    } 
	}*/

	checkForWin(currentLink, nextLink) {
		var matchedLink = currentLink.filter((gameLink) => {
			return nextLink.indexOf(gameLink) > -1
		});
		if(matchedLink.length > 0){
			this.props.dispatch(setMaxLinks(this.props.maxLinks+1));
			this.setState({
				gameStatus: "Win"
			})
			console.log(this.state.gameStatus);
			return matchedLink;
		}
		else {
			console.log(this.state.gameStatus);
		}
	}



	componentDidMount() {	
		const component = this;	
  		//gets movie details for start movie
	  	axios.get('https://api.themoviedb.org/3/search/movie?api_key=7e9a1ff04b7576b3330211792aa796b5&language=en-US&query='+this.props.startMovie+'&page=1&include_adult=false')
  		.then((response) => {
		  	//gets cast from starting movie details
		  	var movieId = response.data.results[0].id;
		  	axios.get('https://api.themoviedb.org/3/movie/'+movieId+'/credits?api_key=7e9a1ff04b7576b3330211792aa796b5')
		  	.then((response) => {
		  		//assigns cast to current game link
		  		const ids = response.data.cast.map(actor => {
		  			return actor.id;
		  		});
		  		component.setState({
		  			currentGameLink: ids
		  		})
		  		//get and check for correct actor id to be used next 
		  		ids.map(id => {
		  			axios.get('https://api.themoviedb.org/3/person/'+id+'/movie_credits?api_key=7e9a1ff04b7576b3330211792aa796b5&language=en-US')
		  			.then((response) => {
		  				console.log(response.data.cast.map(movie => {
		  					return movie.title;
		  				}));
		  			})
		  			.catch(error => {
		  				console.error(error);
		  			})
		  		})
	  			console.log("!!!!!!!!!!!!!!!!!!!!");
	  			component.checkForWin(component.state.currentGameLink, this.props.finalLinkCast)
		  		console.log('Final Link Cast: '+this.props.finalLinkCast);
		  		console.log('Current Game Link: '+component.state.currentGameLink);
		  		console.log('Next Game Link: '+component.state.nextGameLink);
		  		console.log("Checked List: "+component.checkForWin(component.state.currentGameLink, component.state.nextGameLink));
		  		//compare current link against final link to see if game is won
			})
			.catch(error => {
	  			console.error(error);
	  		})
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
	maxLinks: state.maxLinks,
	linksUsed: state.linksUsed,
	cast: state.cast,
	finalLinkCast: state.finalLinkCast
});

export default connect(mapStateToProps)(GameInfo);