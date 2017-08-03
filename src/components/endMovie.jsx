import React from 'react';
import {connect} from 'react-redux';

import {setEndMovie} from '../actions';

import './main.css';

export class EndMovie extends React.Component {
	selectEndMovie(event) {
		event.preventDefault();
		const endMovieValue = this.input.value;
		this.props.dispatch(setEndMovie(endMovieValue));
	}

	render() {
	    return (
			<div className="row">
				<div className="col-lg-6">
					<form className="input-group" onSubmit={e => this.selectEndMovie(e)}>
						<span className="input-group-btn">
							<input className="end-movie-btn" type="submit" value="Ending Movie"/>
						</span>
						<input type="text" className="form-control" placeholder="Find Ending Movie..." ref={input => this.input = input}></input>
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



				
