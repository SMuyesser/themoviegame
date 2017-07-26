import React from 'react';

import './main.css';

export default function Game(props) {
    return (
        <div className="game">
			<head>
				<title>Wireframe Game Page</title>
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.css">
				<!-- Latest compiled and minified CSS -->
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
				<!-- Optional theme -->
				<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
				<link rel="stylesheet" type="text/css" href="main.css">
			</head>
			<body>
				<div class="game">
					<div class="game-row">
						<div class="col-lg-6 guess movie">
							<div class="input-group">
								<h1 class="game-text">Movie</h1>
							</div><!-- /input-group -->
						</div><!-- /.col-lg-6 -->
					</div><!-- /row -->
					<div class="game-row">
						<div class="col-lg-6 guess actor">
							<div class="input-group">
								<h1 class="game-text">Actor</h1>
							</div><!-- /input-group -->
						</div><!-- /.col-lg-6 -->
					</div><!-- /row -->
					<div class="game-row">
						<div class="col-lg-6 guess movie">
							<div class="input-group">
								<h1 class="game-text">Movie</h1>
							</div><!-- /input-group -->
						</div><!-- /.col-lg-6 -->
					</div><!-- /row -->
					<div class="game-row">
						<div class="col-lg-6 guess actor">
							<div class="input-group">
								<h1 class="game-text">Actor</h1>
							</div><!-- /input-group -->
						</div><!-- /.col-lg-6 -->
					</div><!-- /row -->
					<div class="game-row">
						<div class="col-lg-6 guess movie">
							<div class="input-group">
								<h1 class="game-text">Movie</h1>
							</div><!-- /input-group -->
						</div><!-- /.col-lg-6 -->
					</div><!-- /row -->
					<div class="game-row">
						<div class="col-lg-6 guess actor">
							<div class="input-group">
								<h1 class="game-text">Actor</h1>
							</div><!-- /input-group -->
						</div><!-- /.col-lg-6 -->
					</div><!-- /row -->
					<div class="game-row">
						<div class="col-lg-6 guess movie">
							<div class="input-group">
								<h1 class="game-text">Movie</h1>
							</div><!-- /input-group -->
						</div><!-- /.col-lg-6 -->
					</div><!-- /row -->
					<div class="game-page-btn">
						<h2>YOU WIN!</h2>
						<a class="btn btn-danger btn-lg restart-game-btn" href="wireframe-set-up-page.html" role="button">Play Again?</a>
					</div>
				</div><!-- /game -->

				<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
				<!-- Latest compiled and minified JavaScript -->
				<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

			</body>
        </div>
    );
};