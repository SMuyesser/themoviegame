import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Throttle} from 'react-throttle';

import {setStartFinalize} from '../actions';

import './main.css';

export class StartMovie extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			startOptions: []
		}
	}

	queryStartMovie(event) {
		const value = event.target.value;
		const component = this;
		if (value.length > 3) {
			axios.get('https://api.themoviedb.org/3/search/movie?api_key=7e9a1ff04b7576b3330211792aa796b5&language=en-US&query='+value+'&page=1&include_adult=false')
			.then((response) => {
				component.setState({
					startOptions: response.data.results
				})
				component.unreadyFinalizeStartButton(event);
			})
			.catch(error => {
				console.error(error);
			})
		}
	}

//combine these 2 functions later
	readyFinalizeStart(event) {
		event.preventDefault();
		const startMovieValue = this.input.value;
		const finalizeStatus = 'Ready!';
		this.props.dispatch(setStartFinalize(finalizeStatus, startMovieValue));
	}

	unreadyFinalizeStartButton(event) {
		event.preventDefault();
		const startMovieValue = '';
		const finalizeStatus = 'Finalize Start Movie';
		this.props.dispatch(setStartFinalize(finalizeStatus, startMovieValue));
	}

	render() {
	    return (
			<div className="row">
				<div className="col-lg-6">
					<form className="input-group" onSubmit={e => this.readyFinalizeStart(e)}>
						<Throttle time="300" handler="onChange">
							<input type="text" className="form-control" placeholder="Find Starting Movie..." 
								   ref={input => this.input = input} onChange={e => this.queryStartMovie(e)}
								   list="startMovieSuggestionList"></input>
						</Throttle>
						<span className="input-group-btn">
							<input className="start-movie-btn" type="submit" id="startMovieId" value={this.props.finalizeStartButton}/>
						</span>
						<datalist id="startMovieSuggestionList" className="movieOptions">
							{this.state.startOptions.map((movie, index) => {
								return <option key={index} value={movie.title} />
							})}
						</datalist>
					</form>
				</div>
			</div>
	    );
	}
};

const mapStateToProps = state => ({
	startMovie: state.startMovie,
	finalizeStartButton: state.finalizeStartButton,
	currentLinkTitle: state.currentLinkTitle
});

export default connect(mapStateToProps)(StartMovie);