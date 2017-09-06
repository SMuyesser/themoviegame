import {
	SET_AUTH_TOKEN,
	setAuthToken,
	SET_CURRENT_PLAYER,
	setCurrentPlayer,
/*	storeAuthInfo,
	login,
	refreshAuthToken*/
} from '../actions/auth';
import {
	NEW_GAME,
	newGame,
	SET_START_FINALIZE,
	setStartFinalize,
	SET_END_FINALIZE,
	setEndFinalize,
	ADD_LINK,
	addLink,
	SET_SCORES,
	setScores,
	SET_HEADER,
	setHeader
} from '../actions/game';
/*import {registerPlayer} from '../actions/players';
*/import {
	FETCH_PROTECTED_DATA_SUCCESS,
	fetchProtectedDataSuccess,
	FETCH_PROTECTED_DATA_ERROR,
	fetchProtectedDataError,
/*	fetchProtectedData
*/} from '../actions/protected-data';
/*import {normalizeResponseErrors} from '../actions/utils';
*/
describe('auth actions', () => {
	describe('setAuthToken', () => {
		it('Should return the action', () => {
			const authToken = 'token';
			const action = setAuthToken(authToken);
			expect(action.type).toEqual(SET_AUTH_TOKEN);
			expect(action.authToken).toEqual(authToken);
		});
	});
	describe('setCurrentPlayer', () => {
		it('Should return the action', () => {
			const currentPlayer = 'player';
			const action = setCurrentPlayer(currentPlayer);
			expect(action.type).toEqual(SET_CURRENT_PLAYER);
			expect(action.currentPlayer).toEqual(currentPlayer);
		});
	});
});

describe('game actions', () => {
	describe('newGame', () => {
		it('Should return the action', () => {
			const action = newGame();
			expect(action.type).toEqual(NEW_GAME);
		});
	});
	describe('setStartFinalize', () => {
		it('Should return the action', () => {
			const finalizeStartButton = 'button';
			const startMovie = 'movie';
			const action = setStartFinalize(finalizeStartButton, startMovie);
			expect(action.type).toEqual(SET_START_FINALIZE);
			expect(action.finalizeStartButton).toEqual(finalizeStartButton);
			expect(action.startMovie).toEqual(startMovie);
		});
	});
	describe('setEndFinalize', () => {
		it('Should return the action', () => {
			const finalizeEndButton = 'button';
			const endMovieId = 'id'
			const endMovie = 'movie';
			const action = setEndFinalize(finalizeEndButton, endMovieId, endMovie);
			expect(action.type).toEqual(SET_END_FINALIZE);
			expect(action.finalizeEndButton).toEqual(finalizeEndButton);
			expect(action.endMovieId).toEqual(endMovieId);
			expect(action.endMovie).toEqual(endMovie);
		});
	});
	describe('addLink', () => {
		it('Should return the action', () => {
			const name = 'link name';
			const action = addLink(name);
			expect(action.type).toEqual(ADD_LINK);
			expect(action.name).toEqual(name);
		});
	});
	describe('setScores', () => {
		it('Should return the action', () => {
			const scores = 'scores';
			const action = setScores(scores);
			expect(action.type).toEqual(SET_SCORES);
			expect(action.scores).toEqual(scores);
		});
	});
	describe('setHeader', () => {
		it('Should return the action', () => {
			const headerType = 'header';
			const action = setHeader(headerType);
			expect(action.type).toEqual(SET_HEADER);
			expect(action.headerType).toEqual(headerType);
		});
	});
});

describe('protected-data actions', () => {
	describe('fetchProtectedDataSuccess', () => {
		it('Should return the action', () => {
			const data = 'data';
			const action = fetchProtectedDataSuccess(data);
			expect(action.type).toEqual(FETCH_PROTECTED_DATA_SUCCESS);
			expect(action.data).toEqual(data);
		});
	});
	describe('fetchProtectedDataError', () => {
		it('Should return the action', () => {
			const error = 'error';
			const action = fetchProtectedDataError(error);
			expect(action.type).toEqual(FETCH_PROTECTED_DATA_ERROR);
			expect(action.error).toEqual(error);
		});
	});
});