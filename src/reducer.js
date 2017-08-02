import {SET_START_MOVIE, 
		SET_END_MOVIE,
		SET_MAX_LINKS} from './actions';

const initialState = {
	linkChain: [],
	feedback: "Let's Play!",
	startMovie: "",
	endMovie: "",
	maxLinks: "",
	linksUsed: 0,
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
	else if (action.type === SET_MAX_LINKS) {
		state = Object.assign({}, state, {
			maxLinks: action.maxLinks
		});
	}
	return state;
}