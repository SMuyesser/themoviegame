export const NEW_GAME = 'NEW_GAME';
export const newGame = () => ({
	type: NEW_GAME,
	feedback: "It has begun!"
});

export const SET_START_MOVIE = 'SET_START_MOVIE';
export const setStartMovie = (startMovie) => ({
    type: SET_START_MOVIE,
    startMovie
});

export const SET_END_MOVIE = 'SET_END_MOVIE';
export const setEndMovie = (endMovie) => ({
    type: SET_END_MOVIE,
    endMovie
});

export const MAKE_GUESS = 'MAKE_GUESS';
export const makeGuess = (guess) => ({
    type: MAKE_GUESS,
    guess
});
