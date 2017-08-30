export const SET_START_FINALIZE = 'SET_START_FINALIZE';
export const setStartFinalize = (finalizeStartButton, startMovie) => ({
    type: SET_START_FINALIZE,
    finalizeStartButton,
    startMovie
});

export const SET_END_FINALIZE = 'SET_END_FINALIZE';
export const setEndFinalize = (finalizeEndButton, endMovieId, endMovie) => ({
    type: SET_END_FINALIZE,
    finalizeEndButton,
    endMovieId,
    endMovie
});

export const NEW_GAME = 'NEW_GAME';
export const newGame = () => ({
	type: NEW_GAME
});

export const ADD_LINK = 'ADD_LINK';
export const addLink = (name) => ({
	type: ADD_LINK,
	name
});

export const SET_SCORES = 'SET_SCORES';
export const setScores = (scores) => ({
    type: SET_SCORES,
    scores
});