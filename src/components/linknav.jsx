import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import './main.css';

export class LinkNav extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			cast: []
		};
	}

	componentDidMount() {
		var startId = this.props.startMovie;
		var component = this;
		axios.get('https://api.themoviedb.org/3/search/movie?api_key=7e9a1ff04b7576b3330211792aa796b5&language=en-US&query='+
			startId+'&page=1&include_adult=false')
		  	.then((response) => {
			  	var movieId = response.data.results[0].id;
			  	axios.get('https://api.themoviedb.org/3/movie/'+movieId+'/credits?api_key=7e9a1ff04b7576b3330211792aa796b5')
			  	.then((response) => {
			  		component.setState({
			  			cast: response.data.cast
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

	render () {
		const cast = this.state.cast.map((actor, index) => (
			<a href={'https://api.themoviedb.org/3/person/'+actor.id+'/movie_credits?api_key=7e9a1ff04b7576b3330211792aa796b5&language=en-US'} key={index}>
				<li>
					{actor.name}
					<img src={'https://image.tmdb.org/t/p/w138_and_h175_bestv2'+actor.profile_path} alt={actor.name+" image"}/>
				</li>
			</a>
		));

		return (
			<div className="game-row" id="linkNav">
				<div className="col-lg-6 guess movie">
					<h1 id="startId" className="game-text">{this.props.startMovie}</h1>
					<ul id="castList">
						{cast}
					</ul>
				</div>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	startMovie: state.startMovie
});

export default connect(mapStateToProps)(LinkNav);