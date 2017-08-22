import React from 'react';
import axios from 'axios';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import {connect} from 'react-redux';
import {setEndFinalize} from '../actions';
import {API_BASE_URL} from '../config';

export class EndMovie extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			options: []
		}
	}

	render() {
	    return (
			<div className="row">
				<div className="col-lg-6">
					<form className="input-group" onSubmit={e => this.readyFinalizeEnd(e)} id="formOption">
					    <AsyncTypeahead
				          {...this.state}
				          ref={(input) => this.input = input}
				          labelKey="title"
				          onSearch={this.handleSearch}
				          onChange={e => this.unreadyFinalizeEndButton(e)}
				          placeholder="Search for a Github user..."
				          renderMenuItemChildren={this.renderMenuItemChildren}>
				        </AsyncTypeahead>
						<span className="input-group-btn">
							<input className="end-movie-btn" type="submit" id="endMovieId" value={this.props.finalizeEndButton}/>
						</span>
					</form>
				</div>
			</div>
	    );
	}

	renderMenuItemChildren(option, props, index) {
	    return (
	      <div className='options' key={option.id}>
	      	<img
	      	  alt={option.title+' image'}
	          src={'https://image.tmdb.org/t/p/w138_and_h175_bestv2'+option.poster_path}
	          style={{
	            height: '60px',
	            marginRight: '10px',
	            width: '45px',
	          }}
	        />
	        <span>{option.title}</span>
	      </div>
	    );
	}

	readyFinalizeEnd(event) {
		event.preventDefault();
		const endMovieValue = this.input.state.query.toUpperCase();
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
		const endMovieValue = '';
		const endMovieId = '';
		const finalizeStatus = 'Finalize End Movie';
		this.props.dispatch(setEndFinalize(finalizeStatus, endMovieId, endMovieValue));
	}

	handleSearch = query => {
	  	query.toString();
	    if (!query) {
	      return;
	    }

	    axios.get(API_BASE_URL+`/movieoptions/${query}`)
		.then((response) => {
			this.setState({
				options: response.data
			})
		})
		.catch(error => {
			console.error(error);
		})
	}
};

const mapStateToProps = state => ({
	endMovie: state.endMovie,
	endMovieId: state.endMovieId,
	finalizeEndButton: state.finalizeEndButton
});

export default connect(mapStateToProps)(EndMovie);



				
