import React from 'react';
import axios from 'axios';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import {connect} from 'react-redux';
import {setEndFinalize} from '../actions/game';
import {API_BASE_URL} from '../config';

export class EndMovie extends React.Component {

	//options will hold possible movie options when searching for end movies
	constructor(props){
		super(props);
		this.state = {
			options: []
		}
	}

	//async typeahead using react-bootstrap-typeahead to ensure selected movie is the correct one
	render() {
	    return (
			<div className="row">
				<div className="col-lg-6">
					<form className="input-group" onSubmit={e => this.readyFinalizeEnd(e)} id="formEnd">
					    <AsyncTypeahead
				          {...this.state}
				          ref={(input) => this.input = input}
				          labelKey="title"
				          onSearch={this.handleSearch}
				          placeholder="Search for an ending movie..."
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

	//function to finalize end movie selection with validation
	readyFinalizeEnd(event) {
		event.preventDefault();
		const movieTitles = this.state.options.map(movie => {
			return movie.title.toUpperCase();
		})
		const endMovieValue = this.input.state.query.toUpperCase();
		if(endMovieValue.length < 1) {
			alert('Movie field is empty')
			return
		}
		//ensures user has to select from dropdown rather than typing anything
		else if(movieTitles.indexOf(this.input.state.query.toUpperCase()) === -1) {
			alert('You must select an end movie option from the dropdown menu');
		}
		else {
			let endButton = document.getElementById('formEnd');
			endButton.className = 'ready';
			const finalizeStatus = 'Ready!';
			axios.get(API_BASE_URL+'/game/movieoptions/'+endMovieValue)
			.then(response => {
				const endMovieId = response.data[0].id;
				this.props.dispatch(setEndFinalize(finalizeStatus, endMovieId, endMovieValue));
			})
			.catch(error => {
				console.error(error);
			});
		}
	}

	//if the entry is changed unreadies
	unreadyFinalizeEndButton(event) {
		let startButton = document.getElementById('formEnd');
		startButton.className = 'input-group';
		const endMovieValue = '';
		const endMovieId = '';
		const finalizeStatus = 'Finalize End Movie';
		this.props.dispatch(setEndFinalize(finalizeStatus, endMovieId, endMovieValue));
	}

	//gets possible options depending on what is typed in form
	handleSearch = (query, event) => {
		this.unreadyFinalizeEndButton(event);
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
	endMovie: game.endMovie,
	endMovieId: game.endMovieId,
	finalizeEndButton: game.finalizeEndButton
});

export default connect(mapStateToProps)(EndMovie);



				
