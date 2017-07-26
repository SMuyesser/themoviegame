import React from 'react';

import './main.css';

export default function Setup(props) {
    return (
        <div className="setup">
			<head>
				<title>Wireframe Set-Up Page</title>
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.css">
				<!-- Latest compiled and minified CSS -->
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
				<!-- Optional theme -->
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
				<link rel="stylesheet" type="text/css" href="main.css">
			</head>
			<body>

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
							</div><!-- /input-group -->
						</div><!-- /.col-lg-6 -->
					</div><!-- /row -->
					<div class="row">
						<div class="col-lg-6">
							<div class="input-group">
								<span class="input-group-btn">
									<button class="btn btn-default end-movie-btn" type="button">Ending Movie</button>
								</span>
								<input type="text" class="form-control" placeholder="Find Movie...">
							</div><!-- /input-group -->
						</div><!-- /.col-lg-6 -->
					</div><!-- /row -->
				<a class="btn btn-default btn-lg show-new-movies-btn" href="#" role="button">Show New Movies</a>
				</div><!-- /game-setup-page -->
				<div class="game-setup-page-begin-btn">
					<a class="btn btn-danger btn-lg begin-game-btn" href="wireframe-game-page.html" role="button">Begin Game</a>
				</div>

				<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
				<!-- Latest compiled and minified JavaScript -->
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

			</body>
        </div>
    );
};