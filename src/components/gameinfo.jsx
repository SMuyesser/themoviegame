import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import './main.css';

export class GameInfo extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			maxLinks: 0,
			cast: []		};
	}

	componentDidMount() {	
		const component = this;	
  	//gets movie details for start movie
	  	axios.get('https://api.themoviedb.org/3/search/movie?api_key=7e9a1ff04b7576b3330211792aa796b5&language=en-US&query='+
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
			  		console.log(this.props.finalLinkCast);
			  		console.log(component.state.cast);
				})
				.catch(error => {
		  			console.error(error);
		  		})
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