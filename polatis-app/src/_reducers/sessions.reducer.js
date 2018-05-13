import { userConstants } from "constants/user.constants";

// let user = JSON.parse(sessionStorage.getItem('pol_user'));
const initialState = {
    fetching: false,
    fetched: false,
    data: []
};

/**
 * sessions reducer
 * @param state initial state of the reducer
 * @param action passed back action
 * @returns {*}
 */
export function sessions(state = initialState, action){
    let sessions;
    sessions = (state.data) ? state.data : [];

    switch(action.type){
        case userConstants.SESSIONS_LIST_REQUEST:
            return {
                ...state,
                fetching: true,
                fetched: false,
                data: sessions
            };
        case userConstants.SESSIONS_LIST_SUCCESS:
            return {
                fetching: false,
                fetched: true,
                data: action.sessions
            };
        case userConstants.SESSIONS_LIST_FAILURE:
            return {
                fetching: false,
                fetched: false,
                error: action.error
            };
        case userConstants.LOGOUT_SUCCESS:
            return {
                state: undefined
            };
        default:
            return state;
    }
}

export function sessionDataChange(state = { progress: false, completed: false, data: null }, action){
    let user;
    user = (state.data) ? state.data : null;

    switch(action.type){
        case userConstants.SESSION_SAVE_REQUEST:
        case userConstants.SESSION_DELETE_REQUEST:
            return {
                ...state,
                progress: true,
                completed: false,
                data: user
            };
        case userConstants.SESSION_SAVE_SUCCESS:
        case userConstants.SESSION_DELETE_SUCCESS:
            return {
                progress: false,
                completed: true,
                data: action.data
            };
        case userConstants.SESSION_SAVE_FAILURE:
        case userConstants.SESSION_DELETE_FAILURE:
            return {
                progress: false,
                completed: false,
                error: action.error
            };
        case userConstants.LOGOUT_SUCCESS:
            return {
                state: undefined
            };
        default:
            return state;
    }
}