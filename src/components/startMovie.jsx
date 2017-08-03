import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import {setStartMovie} from '../actions';

import './main.css';

export class StartMovie extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			options: []
		}
	}

	selectStartMovie(event) {
		event.preventDefault();
		const startMovieValue = this.input.value;
		this.props.dispatch(setStartMovie(startMovieValue));
	}

	queryStartMovie(event) {
		const value = event.target.value;
		const component = this;
		if (value.length > 3) {
			axios.get('https://api.themoviedb.org/3/search/movie?api_key=7e9a1ff04b7576b3330211792aa796b5&language=en-US&query='+value+'&page=1&include_adult=false')
			.then((response) => {
				component.setState({
					options: response.data.results
				})
			})
		}
	}

	render() {
	    return (
			<div className="row">
				<div className="col-lg-6">
					<form className="input-group" onSubmit={e => this.selectStartMovie(e)} autoComplete="on">
						<span className="input-group-btn">
							<input className="start-movie-btn" type="submit" id="startMovieId" value="Starting Movie"/>
						</span>
						<input type="text" className="form-control" placeholder="Find Starting Movie..." 
							   ref={input => this.input = input} onChange={e => this.queryStartMovie(e)}></input>
						<div className="options">
							{this.state.options.map((movie) => {
								return <div>{movie.title}</div>
							})}
						</div>
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