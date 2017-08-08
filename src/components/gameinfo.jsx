import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import './main.css';

export class GameInfo extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			maxLinks: 0,
			finalLinkCast: [],
			cast: [],
		};
	}

	componentDidMount() {
		var component = this;
		//gets movie details for end movie
		axios.get('https://api.themoviedb.org/3/search/movie?api_key=7e9a1ff04b7576b3330211792aa796b5&language=en-US&query='+
			this.props.endMovie+'&page=1&include_adult=false')
		  	.then((response) => {
			  	var endMovieId = response.data.results[0].id;
			  	//gets cast from end movie details to check for win
			  	axios.get('https://api.themoviedb.org/3/movie/'+endMovieId+'/credits?api_key=7e9a1ff04b7576b3330211792aa796b5')
			  	.then((response) => {
			  		const names = response.data.cast.map(actor => {
			  			return actor.name;
			  		});
			  		component.setState({
			  			finalLinkCast: names
			  		})
			  	})
			  	//gets movie details for start movie
			  	.then(axios.get('https://api.themoviedb.org/3/search/movie?api_key=7e9a1ff04b7576b3330211792aa796b5&language=en-US&query='+
					this.props.startMovie+'&page=1&include_adult=false')
			  		.then((response) => {
					  	var movieId = response.data.results[0].id;
					  	//gets cast from starting movie
					  	axios.get('https://api.themoviedb.org/3/movie/'+movieId+'/credits?api_key=7e9a1ff04b7576b3330211792aa796b5')
					  	.then((response) => {
					  		const names = response.data.cast.map(actor => {
					  			return actor.name;
					  		});
					  		component.setState({
					  			cast: names
					  		});
					  		for (var i = 0; i < this.state.cast; i++ ) {
						  		if(this.state.finalLinkCast.includes(this.state.cast[i])) {
						  			console.log('true');
						  		} else {
						  			console.log('false');
						  		}
					  		}
			  				console.log(this.state.finalLinkCast);
			  				console.log(this.state.cast);
						});		
		  			})
		  		);
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
	cast: state.cast
});

export default connect(mapStateToProps)(GameInfo);