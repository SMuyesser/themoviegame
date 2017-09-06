import authReducer from '../reducers/auth';
import gameReducer from '../reducers/game';
import protectedDataReducer from '../reducers/protected-data';

describe('authReducer', () => {
	let initialState;
	let state;

	beforeEach(() => {
		initialState = {
			authToken: null,
			currentPlayer: null
		}
	});

	it('should test reducer for SET_AUTH_TOKEN', () => {
		state = authReducer(state, {
			type: 'SET_AUTH_TOKEN',
			authToken: 'token test'
		});
		expect(state.authToken).toEqual('token test');
	});

	it('should test reducer for SET_CURRENT_PLAYER', () => {
		state = authReducer(state, {
			type: 'SET_CURRENT_PLAYER',
			currentPlayer: 'player name'
		});
		expect(state.currentPlayer).toEqual('player name');
	});
});

describe('gameReducer', () => {
	let initialState;
	let state;

	beforeEach(() => {
		initialState = {			
    		startMovie: "",
			endMovie: "",
			endMovieId: "",
			finalizeStartButton: "Finalize Start Movie",
			finalizeEndButton: "Finalize End Movie",
			gameInProgress: false,
			currentLinkTitle: '',
			linkChain: [],
			feedback: 'Play Again',
			scores: [],
			headerType: 'dashboard'
		}
	});

    it('should test reducer for NEW_GAME', () => {
		state = {
			startMovie: "movie",
			endMovie: "movie2",
			endMovieId: "id",
			finalizeStartButton: "Ready!",
			finalizeEndButton: "Ready!",
			gameInProgress: false,
			currentLinkTitle: 'title',
			linkChain: [],
			feedback: 'Play Again',
			scores: [],
			headerType: 'welcome'
		}
		const wrong = {
			startMovie: 'hi'
		}
	    state = gameReducer(state, {type: 'NEW_GAME'});
	    expect(state).toEqual(initialState)
	});

	it('should test reducer for SET_START_FINALIZE', () => {
		state = initialState;
		state = gameReducer(state, {
			type: 'SET_START_FINALIZE',
			startMovie: 'reducer test movie',
			finalizeStartButton: 'Ready!'
		});
		expect(state.startMovie).toEqual('reducer test movie');
		expect(state.finalizeStartButton).toEqual('Ready!');
	});

	it('should test reducer for SET_END_FINALIZE', () => {
		state = initialState;
		state = gameReducer(state, {
			type: 'SET_END_FINALIZE',
			endMovie: 'reducer test movie',
			endMovieId: 'id',
			finalizeEndButton: 'Ready!'
		});
		expect(state.endMovie).toEqual('reducer test movie');
		expect(state.endMovieId).toEqual('id');
		expect(state.finalizeEndButton).toEqual('Ready!');
	});

	it('should test reducer for ADD_LINK', () => {
		state = initialState;
		state = gameReducer(state, {
			type: 'ADD_LINK',
			name: 'link'
		});
		expect(state.linkChain).toEqual(['link']);
		expect(state.currentLinkTitle).toEqual('link');
	});

	it('should test reducer for SET_SCORES', () => {
		state = initialState;
		const scores = {
            "start" : "STAR TREK",
            "startPic" : "https://image.tmdb.org/t/p/w138_and_h175_bestv2/xPihqTMhCh6b8DHYzE61jrIiNMS.jpg",
            "end" : "GUARDIANS OF THE GALAXY VOL. 2",
            "endPic" : "https://image.tmdb.org/t/p/w138_and_h175_bestv2/y4MBh0EjBlMuOzv9axM4qJlmhzz.jpg",
            "linkCount" : 1,
            "links" : [
                    "Zoe Saldana"
            ]
        }
		state = gameReducer(state, {
			type: 'SET_SCORES',
			scores: scores
		});
		expect(state.scores).toEqual(scores);
	});	

	it('should test reducer for SET_HEADER', () => {
		state = initialState;
		state = gameReducer(state, {
			type: 'SET_HEADER',
			headerType: 'reducer test header'
		});
		expect(state.headerType).toEqual('reducer test header');
	});
});

describe('protectedDataReducer', () => {
	let initialState;
	let state;

	beforeEach(() => {
		initialState = {
			data: '',
			error: null
		}
	});

	it('should test reducer for FETCH_PROTECTED_DATA_SUCCESS', () => {
		state = protectedDataReducer(state, {
			type: 'FETCH_PROTECTED_DATA_SUCCESS',
			data: 'data test'
		});
		expect(state.data).toEqual('data test');
	});

	it('should test reducer for FETCH_PROTECTED_DATA_ERROR', () => {
		state = protectedDataReducer(state, {
			type: 'FETCH_PROTECTED_DATA_ERROR',
			error: 'error test'
		});
		expect(state.error).toEqual('error test');
	});
});