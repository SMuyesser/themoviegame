import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Throttle} from 'react-throttle';

import {setEndFinalize} from '../actions';
import {API_BASE_URL} from '../config';

export class EndMovie extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			endOptions: []
		}
	}

	queryEndMovie(event) {
		const value = event.target.value;
		const component = this;
		this.unreadyFinalizeEndButton(event);
		if (value.length > 3) {
			axios.get(API_BASE_URL+'/movieoptions/'+value)
			.then((response) => {
				component.setState({
					endOptions: response.data
				})
			})
			.catch(error => {
				console.error(error);
			})
		}
	}

//combine these 2 functions later
	readyFinalizeEnd(event) {
		event.preventDefault();
		const endMovieValue = this.input.value;
		const finalizeStatus = 'Ready!';
		axios.get(API_BASE_URL+'/movieoptions/'+endMovieValue)
		.then(response => {
			const endMovieId = response.data[0].id;
			this.props.dispatch(setEndFinalize(finalizeStatus, endMovieId, endMovieValue));
		})
		.catch(error => {
			console.error(error);
		});
	}

	unreadyFinalizeEndButton(event) {
		event.preventDefault();
		const endMovieValue = '';
		const endMovieId = '';
		const finalizeStatus = 'Finalize End Movie';
		this.props.dispatch(setEndFinalize(finalizeStatus, endMovieId, endMovieValue));
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
							<input className="end-movie-btn" type="submit" id="endMovieId" value={this.props.finalizeEndButton}/>
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
	endMovie: state.endMovie,
	endMovieId: state.endMovieId,
	finalizeEndButton: state.finalizeEndButton
});

export default connect(mapStateToProps)(EndMovie);



				
