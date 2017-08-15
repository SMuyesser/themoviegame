import React from 'react';
import {connect} from 'react-redux';

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
			console.log(this.state.gameStatus);
		}
	}

	render () {
		return (
			<div className="game-row">
				<div className="col-lg-6 guess">
					<ul id="gameInfoText">
						<li><h1 className="gameInfo-text">START:  {this.props.startMovie}</h1></li>
						<li><h1 className="gameInfo-text">END:  {this.props.endMovie}</h1></li>
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
	linksUsed: state.linksUsed,
	cast: state.cast
});

export default connect(mapStateToProps)(GameInfo);