import React from 'react';
import {connect} from 'react-redux';

import './main.css';

export class LinkNav extends React.Component {
	render () {
		return (
			<div className="game-row">
				<div className="col-lg-6 guess movie">
					<div className="input-group">
						<h1 className="game-text">GAME WILL GO HERE</h1>
					</div>
				</div>
			</div>
		);
	}
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(LinkNav);