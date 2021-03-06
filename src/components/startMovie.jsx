import React from 'react';
import axios from 'axios';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import {connect} from 'react-redux';
import {setStartFinalize} from '../actions/game';
import {API_BASE_URL} from '../config';

export class StartMovie extends React.Component {

	//options will hold possible movie options matching search entry
	constructor(props){
		super(props);
		this.state = {
		    options: []
		}
	}

	//search form using react-boostrap-typeahead
	render() {
	    return (
			<div className="row">
				<div className="col-lg-6">
					<form className="input-group" onSubmit={e => this.readyFinalizeStart(e)} id="formStart">
					    <AsyncTypeahead
				          {...this.state}
				          ref={(input) => this.input = input}
				          labelKey="title"
				          onSearch={this.handleSearch}
				          placeholder="Search for a starting movie..."
				          renderMenuItemChildren={this.renderMenuItemChildren}>
				        </AsyncTypeahead>
						<span className="input-group-btn">
							<input className="start-movie-btn" type="submit" value={this.props.finalizeStartButton}/>
						</span>
					</form>
				</div>
			</div>
	    );
	}

	//renders dropdown menu with all movie options matching the typeahead
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
	        <span className='optionDetails'>
	        	{option.title}
	        	<span className='year'>Release Date: {option.release_date}</span>
	        </span>
	      </div>
	    );
	}

	//function called when finalize start is clicked
	readyFinalizeStart(event) {
		event.preventDefault();
		const movieTitles = this.state.options.map(movie => {
			return movie.title.toUpperCase();
		})
		const startMovieValue = this.input.state.query.toUpperCase();
		if(startMovieValue.length < 1) {
			alert('Movie field is empty')
			return
		}
		//ensures choice is selected from dropdown 
		else if(movieTitles.indexOf(this.input.state.query.toUpperCase()) === -1) {
			alert('You must select a start movie option from the dropdown menu');
		}
		else {
			let startButton = document.getElementById('formStart');
			startButton.className = 'ready';
			const finalizeStatus = 'Ready!';
			this.props.dispatch(setStartFinalize(finalizeStatus, startMovieValue));
		}
	}

	//function to undo finalize status
	unreadyFinalizeStartButton(event) {
		let startButton = document.getElementById('formStart');
		startButton.className = 'input-group';
		const startMovieValue = '';
		const finalizeStatus = 'Finalize Start Movie';
		this.props.dispatch(setStartFinalize(finalizeStatus, startMovieValue));
	}

	//sets options with movies matching the search
	handleSearch = (query, event) => {
		this.unreadyFinalizeStartButton(event);
	  	query.toString();
	    if (!query) {
	      return;
	    }

	    axios.get(API_BASE_URL+`/game/movieoptions/${query}`)
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

const mapStateToProps = ({game}) => ({
	startMovie: game.startMovie,
	finalizeStartButton: game.finalizeStartButton,
	currentLinkTitle: game.currentLinkTitle
});


export default connect(mapStateToProps)(StartMovie);

