import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import {setStartMovie} from '../actions';

import './main.css';

export class StartMovie extends React.Component {
	selectStartMovie(event) {
		event.preventDefault();
		const startMovieValue = this.input.value;
		this.props.dispatch(setStartMovie(startMovieValue));
		axios.get('https://api.themoviedb.org/3/search/movie?api_key=7e9a1ff04b7576b3330211792aa796b5&language=en-US&query='+
			startMovieValue +'&page=1&include_adult=false')
		  	.then(function (response) {
			  	var movieId = response.data.results[0].id;
			    console.log(movieId);
			  	axios.get('https://api.themoviedb.org/3/movie/'+movieId+'/credits?api_key=7e9a1ff04b7576b3330211792aa796b5')
			  	.then(function (response) {
			  		for (var i = 0; i < response.data.cast.length; i++) {
			  			console.log(response.data.cast[i].name);
			  		}
			  	})
			  	.catch(function (error) {
			  		console.log(error);
			  	});
		  	})
			.catch(function (error) {
			    console.log(error);
			});
	}

	render() {
	    return (
			<div className="row">
				<div className="col-lg-6">
					<form className="input-group" onSubmit={e => this.selectStartMovie(e)} autocomplete="on">
						<span className="input-group-btn">
							<input className="start-movie-btn" type="submit" value="Starting Movie"/>
						</span>
						<input type="text" className="form-control" placeholder="Find Starting Movie..." 
						ref={input => this.input = input}></input>
					</form>
				</div>
			</div>
	    );
	}
};

const mapStateToProps = state => ({
	startMovie: state.startMovie
});

export default connect(mapStateToProps)(StartMovie);