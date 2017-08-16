import {
		NEW_GAME,
		SET_START_FINALIZE,
		SET_END_FINALIZE,
		ADD_LINK,
		FEEDBACK
} from './actions';

const initialState = {
	startMovie: "",
	endMovie: "",
	endMovieId: "",
	finalizeStartButton: "Finalize Start Movie",
	finalizeEndButton: "Finalize End Movie",
	feedback: "Let's Play!",
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
			linkChain: [...state.linkChain, action.name],
			currentLinkTitle: action.name
		})
		return state;
	}
	else if (action.type === FEEDBACK) {
		state = Object.assign({}, state, {
			feedback: action.feedback
		})
		return state;
	}
	return state;
}