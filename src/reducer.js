import {
		NEW_GAME,
		SET_START_FINALIZE,
		SET_END_FINALIZE,
		SET_FINAL_CAST_OPTIONS
} from './actions';

const initialState = {
	startMovie: "",
	endMovie: "",
	startOptions: [],
	endOptions: [],
	finalizeStartButton: "Finalize Start Movie",
	finalizeEndButton: "Finalize End Movie",
	feedback: "Let's Play!",
	maxLinks: 0,
	linksUsed: 0,
	gameInProgress: false,
	finalLinkCast: []
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
			finalizeEndButton: action.finalizeEndButton
		});
		return state;
	}
	else if (action.type === SET_FINAL_CAST_OPTIONS) {
		state = Object.assign({}, state, {
			finalLinkCast: action.finalLinkCast
		})
		return state;
	}
	return state;
}