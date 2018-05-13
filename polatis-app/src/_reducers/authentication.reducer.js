import { userConstants } from "constants/user.constants";

let user = JSON.parse(sessionStorage.getItem('pol_user'));
const initialState = user ? { loggedIn: true, user } : {};

/**
 * authentication reducer
 * @param state initial state of the reducer
 * @param action passed back action
 * @returns {*}
 */
export function authentication(state = initialState, action){
    switch(action.type){
        case userConstants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                loggingIn: false,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                loggingIn: false,
                error: action.error
            };
        case userConstants.LOGOUT_REQUEST:
            return {
                ...state,
                loggingOut: true
            };
        case userConstants.LOGOUT_SUCCESS:
            return {
                ...state,
                loggedOut: true,
                loggingOut: false
            };
        case userConstants.LOGOUT_FAILURE:
            return {
                ...state
            };
        default:
            return state;
    }
}