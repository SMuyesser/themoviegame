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
export const addLink = (linkChain) => ({
	type: ADD_LINK,
	linkChain
})

export const SHOW_TITLE = 'SHOW_TITLE';
export const showTitle = (currentLinkTitle) => ({
	type: SHOW_TITLE,
	currentLinkTitle
})
