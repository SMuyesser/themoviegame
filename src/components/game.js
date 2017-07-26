import React from 'react';

import './main.css';

export default function Game(props) {
    return (
        <div className="game">
			<div class="game-row">
				<div class="col-lg-6 guess movie">
					<div class="input-group">
						<h1 class="game-text">Movie</h1>
					</div>
				</div>
			</div>
			<div class="game-row">
				<div class="col-lg-6 guess actor">
					<div class="input-group">
						<h1 class="game-text">Actor</h1>
					</div>
				</div>
			</div>
			<div class="game-row">
				<div class="col-lg-6 guess movie">
					<div class="input-group">
						<h1 class="game-text">Movie</h1>
					</div>
				</div>
			</div>
			<div class="game-page-btn">
				<h2>YOU WIN!</h2>
				<a class="btn btn-danger btn-lg restart-game-btn" href="wireframe-set-up-page.html" role="button">Play Again?</a>
			</div>
		</div>
    );
};