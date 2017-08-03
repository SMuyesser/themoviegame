import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import './main.css';

export class LinkNav extends React.Component {

	componentDidMount() {
		var startId = document.getElementById('startId').textContent;
		console.log(startId);
		axios.get('https://api.themoviedb.org/3/search/movie?api_key=7e9a1ff04b7576b3330211792aa796b5&language=en-US&query='+
			startId+'&page=1&include_adult=false')
		  	.then(function (response) {
			  	var movieId = response.data.results[0].id;
			    console.log(movieId);
			  	axios.get('https://api.themoviedb.org/3/movie/'+movieId+'/credits?api_key=7e9a1ff04b7576b3330211792aa796b5')
			  	.then(function (response) {
			  		var castList = [];
			  		for (var i = 0; i < response.data.cast.length; i++) {
			  			castList.push(response.data.cast[i].name);
			  		}
			  		castList.map((actor) => {
			  			var charListEl = document.getElementById('castList');
			  			var charListElLi = document.createElement('li');
			  			var charListElA = document.createElement('a');
			  			var att = document.createAttribute('href');
			  			att.value = 'www.'+actor+'.com';
			  			charListElA.setAttributeNode(att);
			  			charListElA.innerHTML = actor;
			  			return charListEl.appendChild(charListElLi).appendChild(charListElA);
			  		})
			  	})
			  	.catch(function (error) {
			  		console.log(error);
			  	});
		  	})
			.catch(function (error) {
			    console.log(error);
			});
	}

	render () {
		return (
			<div className="game-row">
				<div className="col-lg-6 guess movie">
					<div className="input-group">
						<h1 id="startId" className="game-text">{this.props.startMovie}</h1>
					</div>
					<ul id="castList">
					</ul>
				</div>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	startMovie: state.startMovie
});

export default connect(mapStateToProps)(LinkNav);