import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Throttle} from 'react-throttle';

import {setEndMovie} from '../actions';

import './main.css';

export class EndMovie extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			endOptions: [],
			finalizeEndButton: 'Finalize End Movie'
		}
	}

	selectEndMovie(event) {
		event.preventDefault();
		const endMovieValue = this.input.value;
		this.props.dispatch(setEndMovie(endMovieValue));
	}

	queryEndMovie(event) {
		const value = event.target.value;
		const component = this;
		if (value.length > 3) {
			axios.get('https://api.themoviedb.org/3/search/movie?api_key=7e9a1ff04b7576b3330211792aa796b5&language=en-US&query='+value+'&page=1&include_adult=false')
			.then((response) => {
				component.setState({
					endOptions: response.data.results
				})
				component.unreadyFinalizeEndButton(event);
			})
		}
	}

	readyFinalizeEnd(event) {
		this.selectEndMovie(event);
		event.preventDefault();
		this.setState({
			finalizeEndButton: 'Ready!'
		});
	}

	unreadyFinalizeEndButton(event) {
		event.preventDefault();
		this.setState({
			finalizeEndButton: 'Finalize End Movie',
			endMovie: ''
		});
	}

	render() {
	    return (
			<div className="row">
				<div className="col-lg-6">
					<form className="input-group" onSubmit={e => this.readyFinalizeEnd(e)}>
						<Throttle time="300" handler="onChange">
							<input type="text" className="form-control" placeholder="Find Ending Movie..." 
								   ref={input => this.input = input} onChange={e => this.queryEndMovie(e)}
								   list="endMovieSuggestionList"></input>
						</Throttle>
						<span className="input-group-btn">
							<input className="end-movie-btn" type="submit" id="endMovieId" value={this.state.finalizeEndButton}/>
						</span>
						<datalist id="endMovieSuggestionList" className="options">
							{this.state.endOptions.map((movie, index) => {
								return <option value={movie.title} key={index}/>
							})}
						</datalist>
					</form>
				</div>
			</div>
	    );
	}
};

const mapStateToProps = state => ({
	endMovie: state.endMovie
});

export default connect(mapStateToProps)(EndMovie);



				
