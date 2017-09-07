//action when player clicks to finalize start movie
export const SET_START_FINALIZE = 'SET_START_FINALIZE';
export const setStartFinalize = (finalizeStartButton, startMovie) => ({
    type: SET_START_FINALIZE,
    finalizeStartButton,
    startMovie
});

//action when player clicks to finalize end movie
export const SET_END_FINALIZE = 'SET_END_FINALIZE';
export const setEndFinalize = (finalizeEndButton, endMovieId, endMovie) => ({
    type: SET_END_FINALIZE,
    finalizeEndButton,
    endMovieId,
    endMovie
});

//action for new game returning state to initial state
export const NEW_GAME = 'NEW_GAME';
export const newGame = () => ({
	type: NEW_GAME
});

//action for adding selected cast or movie to to link chain
export const ADD_LINK = 'ADD_LINK';
export const addLink = (name) => ({
	type: ADD_LINK,
	name
});

//action for setting scores for dashboard
export const SET_SCORES = 'SET_SCORES';
export const setScores = (scores) => ({
    type: SET_SCORES,
    scores
});

//action for changing header for each page
export const SET_HEADER = 'SET_HEADER';
export const setHeader = (headerType) => ({
    type: SET_HEADER,
    headerType
});