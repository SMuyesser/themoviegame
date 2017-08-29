import {SET_AUTH_TOKEN, SET_CURRENT_PLAYER} from '../actions/auth';

const initialState = {
    authToken: null, // authToken !== null does not mean it has been validated
    currentPlayer: null
};

export default function reducer(state = initialState, action) {
    if (action.type === SET_AUTH_TOKEN) {
        return Object.assign({}, state, {
            authToken: action.authToken
        });
    } else if (action.type === SET_CURRENT_PLAYER) {
        return Object.assign({}, state, {
            currentPlayer: action.currentPlayer
        });
    }
    return state;
}
