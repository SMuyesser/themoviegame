import {SET_START_MOVIE, 
		SET_END_MOVIE} from './actions';

const initialState = {
	gameChain: [],
	feedback: "Let's Play!",
	startMovie: "",
	endMovie: "",
	gameInProgress: false
}

export default (state, action) => {
	state = state || initialState;
	if (action.type === SET_START_MOVIE) {
		state = Object.assign({}, state, {
			startMovie: action.startMovie
		});
		return state;
	}
	else if (action.type === SET_END_MOVIE) {
		state = Object.assign({}, state, {
			endMovie: action.endMovie
		});
		return state;
	}
	return state;
}