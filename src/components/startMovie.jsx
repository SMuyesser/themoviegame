import React from 'react';
import axios from 'axios';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

import {connect} from 'react-redux';

import {setStartFinalize} from '../actions';
import {API_BASE_URL} from '../config';

export class StartMovie extends React.Component {

	constructor(props){
		super(props);
		this.state = {
		    options: []
		}
	}

	render() {
		console.log(this.state.startOpt);
	    return (
			<div className="row">
				<div className="col-lg-6">
					<form className="input-group" onSubmit={e => this.readyFinalizeStart(e)} id="formOption">
					    <AsyncTypeahead
				          {...this.state}
				          ref={(input) => this.input = input}
				          labelKey="title"
				          onSearch={this.handleSearch}
				          onChange={e => this.unreadyFinalizeStartButton(e)}
				          placeholder="Search for a Github user..."
				          renderMenuItemChildren={this.renderMenuItemChildren}>
				        </AsyncTypeahead>
						<span className="input-group-btn">
							<input className="start-movie-btn" type="submit" id="startMovieId" value={this.props.finalizeStartButton}/>
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

	readyFinalizeStart(event) {
		event.preventDefault();
		const startMovieValue = this.input.state.query.toUpperCase();
		console.log(startMovieValue);
		const finalizeStatus = 'Ready!';
		this.props.dispatch(setStartFinalize(finalizeStatus, startMovieValue));
	}

	unreadyFinalizeStartButton(event) {
		const startMovieValue = '';
		const finalizeStatus = 'Finalize Start Movie';
		this.props.dispatch(setStartFinalize(finalizeStatus, startMovieValue));
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
	startMovie: state.startMovie,
	finalizeStartButton: state.finalizeStartButton,
	currentLinkTitle: state.currentLinkTitle
});

export default connect(mapStateToProps)(StartMovie);

