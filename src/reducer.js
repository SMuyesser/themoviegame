import {NEW_GAME,
		SET_START_MOVIE,
		SET_END_MOVIE,
		MAKE_GUESS
} from './actions';

const initialState = {
	gameChain: [],
	feedback: "Let's Play!",
	startMovie: "movie1",
	endMovie: "movie2",
	gameInProgress: false
}

export default (state, action) => {
	state = state || initialState;
	if (action.type === NEW_GAME) {
		state = Object.assign({}, initialState, {
			feedback: action.feedback
		});
	return state;
	}
}