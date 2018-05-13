import { userConstants } from "constants/user.constants";

// let user = JSON.parse(sessionStorage.getItem('pol_user'));
const initialState = {
    fetching: false,
    fetched: false,
    data: []
};

/**
 * users reducer
 * @param state initial state of the reducer
 * @param action passed back action
 * @returns {*}
 */
export function users(state = initialState, action){
    let users;
    users = (state.data) ? state.data : [];

    switch(action.type){
        case userConstants.USER_LIST_REQUEST:
            return {
                ...state,
                fetching: true,
                fetched: false,
                data: users
            };
        case userConstants.USER_LIST_SUCCESS:
            return {
                fetching: false,
                fetched: true,
                data: action.users
            };
        case userConstants.USER_LIST_FAILURE:
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

/**
 * user data save/delete/edit reducer
 * @param state initial state of the reducer
 * @param action passed back action
 * @returns {*}
 */
export function userDataChange(state = { progress: false, completed: false, data: null }, action){
    let user;
    user = (state.data) ? state.data : null;

    switch(action.type){
        case userConstants.USER_SAVE_REQUEST:
        case userConstants.USER_DELETE_REQUEST:
            return {
                ...state,
                progress: true,
                completed: false,
                data: user
            };
        case userConstants.USER_SAVE_SUCCESS:
        case userConstants.USER_DELETE_SUCCESS:
            return {
                progress: false,
                completed: true,
                data: action.data
            };
        case userConstants.USER_SAVE_FAILURE:
        case userConstants.USER_DELETE_FAILURE:
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