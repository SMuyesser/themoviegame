import React from 'react';
import {connect} from 'react-redux';

import './main.css';

export class GameInfo extends React.Component {
	render () {
		return (
			<div className="game-row">
				<div className="col-lg-6 guess movie">
					<div className="input-group">
						<h1 className="game-text">START:  {this.props.startMovie}</h1>
					</div>
					<div className="input-group">
						<h1 className="game-text">END:  {this.props.endMovie}</h1>
					</div>
					<div className="input-group">
						<h1 className="game-text">MAXIMUM LINKS ALLOWED:  {this.props.maxLinks}  LINKS USED: {this.props.linksUsed}</h1>
					</div>
				</div>
			</div>
		);
	}
};

const mapStateToProps = state => ({
	startMovie: state.startMovie,
	endMovie: state.endMovie,
	maxLinks: state.maxLinks,
	linksUsed: state.linksUsed
});

export default connect(mapStateToProps)(GameInfo);