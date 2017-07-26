import React from 'react';

import './main.css';

export default function Setup(props) {
    return (
        <div className="setup">
			<div className="page-header">
				<h2 className="game-setup-page-title">How To Play</h2>
				<p>Player must alternate selecting movies and castmembers from those movies to connect the starting movie to the ending movie.</p>
				<p>Select your starting and ending movies below.  If you don't like your choices, just click show new movies.</p>
			</div>
			<div className="container-fluid game-setup-page">
				<h2 className="game-setup-page-title">Game Set-Up</h2>
				<div className="row">
					<div className="col-lg-6">
						<div className="input-group">
							<span className="input-group-btn">
								<button className="start-movie-btn" type="button">Starting Movie</button>
							</span>
							<input type="text" className="form-control" placeholder="Find Movie..."></input>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-6">
						<div className="input-group">
							<span className="input-group-btn">
								<button className="end-movie-btn" type="button">Ending Movie</button>
							</span>
							<input type="text" className="form-control" placeholder="Find Movie..."></input>
						</div>
					</div>
				</div>
				<a className="show-new-movies-btn" href="wireframe-game-page.html" role="button">Show New Movies</a>
			</div>
			<div className="game-setup-page-begin-btn">
				<a className="btn btn-danger btn-lg begin-game-btn" href="/game" role="button">Begin Game</a>
			</div>
		</div>
    );
};