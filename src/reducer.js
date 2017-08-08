import {
		SET_END_MOVIE,
		SET_MAX_LINKS,
		SET_START_FINALIZE,
		SET_END_FINALIZE
} from './actions';

const initialState = {
	linkChain: [],
	castChoices: [],
	movieChoices: [],
	feedback: "Let's Play!",
	startMovie: "",
	endMovie: "",
	maxLinks: 0,
	linksUsed: 0,
	gameInProgress: false,
	finalizeStartButton: "Finalize Start Movie",
	finalizeEndButton: "Finalize End Movie"
}

export default (state, action) => {
	state = state || initialState;
	if (action.type === SET_MAX_LINKS) {
		state = Object.assign({}, state, {
			maxLinks: action.maxLinks
		});
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
			finalizeEndButton: action.finalizeEndButton
		});
		return state;
	}
	return state;
}