import {
		NEW_GAME,
		SET_START_FINALIZE,
		SET_END_FINALIZE,
		ADD_LINK,
		SHOW_TITLE
} from './actions';

const initialState = {
	startMovie: "",
	endMovie: "",
	endMovieId: "",
	startOptions: [],
	endOptions: [],
	finalizeStartButton: "Finalize Start Movie",
	finalizeEndButton: "Finalize End Movie",
	feedback: "Let's Play!",
	linksUsed: 0,
	gameInProgress: false,
	currentLinkTitle: '',
	linkChain: []
}

export default (state, action) => {
	state = state || initialState;
	if (action.type === NEW_GAME) {
		state = Object.assign({}, initialState);
		return state;
	}
	else if (action.type === SET_START_FINALIZE) {
		state = Object.assign({}, initialState, {
			startMovie: action.startMovie,
			finalizeStartButton: action.finalizeStartButton
		});
		return state;
	}
	else if (action.type === SET_END_FINALIZE) {
		state = Object.assign({}, state, {
			endMovie: action.endMovie,
			endMovieId: action.endMovieId,
			finalizeEndButton: action.finalizeEndButton
		});
		return state;
	}
	else if (action.type === ADD_LINK) {
		state = Object.assign({}, state, {
			linkChain: [...state.linkChain, action.linkChain]
		})
		return state;
	}
	else if (action.type === SHOW_TITLE) {
		state = Object.assign({}, state, {
			currentLinkTitle: action.currentLinkTitle
		})
		return state;
	}
	return state;
}