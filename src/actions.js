export const SET_MAX_LINKS = 'SET_MAX_LINKS';
export const setMaxLinks = (maxLinks) => ({
    type: SET_MAX_LINKS,
    maxLinks
});

export const SET_START_FINALIZE = 'SET_START_FINALIZE';
export const setStartFinalize = (finalizeStartButton, startMovie) => ({
    type: SET_START_FINALIZE,
    finalizeStartButton,
    startMovie
});

export const SET_END_FINALIZE = 'SET_END_FINALIZE';
export const setEndFinalize = (finalizeEndButton, endMovie) => ({
    type: SET_END_FINALIZE,
    finalizeEndButton,
    endMovie
});

export const NEW_GAME = 'NEW_GAME';
export const newGame = () => ({
	type: NEW_GAME
});
