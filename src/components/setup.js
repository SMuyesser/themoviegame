import React from 'react';

import './main.css';

export default function Setup(props) {
    return (
        <div className="setup">
			<div class="page-header">
				<h2 class="game-setup-page-title">How To Play</h2>
				<p>Player must alternate selecting movies and castmembers from those movies to connect the starting movie to the ending movie.</p>
				<p>Select your starting and ending movies below.  If you don't like your choices, just click show new movies.</p>
			</div>
			<div class="container-fluid game-setup-page">
				<h2 class="game-setup-page-title">Game Set-Up</h2>
				<div class="row">
					<div class="col-lg-6">
						<div class="input-group">
							<span class="input-group-btn">
								<button class="btn btn-default start-movie-btn" type="button">Starting Movie</button>
							</span>
							<input type="text" class="form-control" placeholder="Find Movie...">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-6">
						<div class="input-group">
							<span class="input-group-btn">
								<button class="btn btn-default end-movie-btn" type="button">Ending Movie</button>
							</span>
							<input type="text" class="form-control" placeholder="Find Movie...">
						</div>
					</div>
				</div>
			<a class="btn btn-default btn-lg show-new-movies-btn" href="#" role="button">Show New Movies</a>
			</div>
			<div class="game-setup-page-begin-btn">
				<a class="btn btn-danger btn-lg begin-game-btn" href="wireframe-game-page.html" role="button">Begin Game</a>
			</div>
		</div>
    );
};