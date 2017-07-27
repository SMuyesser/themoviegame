import React from 'react';

import './main.css';

export default function Game(props) {
    return (
        <div className="game">
			<div className="game-row">
				<div className="col-lg-6 guess movie">
					<div className="input-group">
						<h1 className="game-text">Movie</h1>
					</div>
				</div>
			</div>
			<div className="game-row">
				<div className="col-lg-6 guess actor">
					<div className="input-group">
						<h1 className="game-text">Actor</h1>
					</div>
				</div>
			</div>
			<div className="game-row">
				<div className="col-lg-6 guess movie">
					<div className="input-group">
						<h1 className="game-text">Movie</h1>
					</div>
				</div>
			</div>
			<div className="game-page-btn">
				<h2>Win!</h2>
				<a className="btn btn-danger btn-lg restart-game-btn" href="/setup" role="button">Play Again?</a>
			</div>
		</div>
    );
};


