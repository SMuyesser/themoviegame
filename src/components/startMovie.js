import React from 'react';
import {connect} from 'react-redux';

import {setStartMovie} from '../actions';

import './main.css';

export class StartMovie extends React.Component {
	selectStartMovie(event) {
		event.preventDefault();
		const startMovieValue = this.input.value;
		this.props.dispatch(setStartMovie(startMovieValue));
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