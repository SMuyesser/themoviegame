import {
		NEW_GAME,
		SET_START_FINALIZE,
		SET_END_FINALIZE,
		ADD_LINK,
		SET_SCORES
} from '../actions/game';

const initialState = {
	startMovie: "",
	endMovie: "",
	endMovieId: "",
	finalizeStartButton: "Finalize Start Movie",
	finalizeEndButton: "Finalize End Movie",
	gameInProgress: false,
	currentLinkTitle: '',
	linkChain: [],
	feedback: 'Play Again',
	scores: []
}

export default function reducer(state = initialState, action) {
	if (action.type === NEW_GAME) {
		return Object.assign({}, initialState);
	} else if (action.type === SET_START_FINALIZE) {
		return Object.assign({}, initialState, {
			startMovie: action.startMovie,
			finalizeStartButton: action.finalizeStartButton
		});
	} else if (action.type === SET_END_FINALIZE) {
		return Object.assign({}, state, {
			endMovie: action.endMovie,
			endMovieId: action.endMovieId,
			finalizeEndButton: action.finalizeEndButton
		});
	} else if (action.type === ADD_LINK) {
		return Object.assign({}, state, {
			linkChain: [...state.linkChain, action.name],
			currentLinkTitle: action.name
		})
	} else if (action.type === SET_SCORES) {
		return Object.assign({}, state, {
			scores: action.scores
		})
	}
	return state;
}