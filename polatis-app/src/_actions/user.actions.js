/**
 * @fileoverview user specific action methods
 */


import { push } from 'react-router-redux'
import Cookies from 'js-cookie';

import { userConstants} from "constants/user.constants";
import { userService } from "services/user.service";
import { alertActions} from "./alert.actions";
import { lib } from 'utils/lib';
import {sessionConstants} from "constants/session.constants";

export const userActions = {
    login,
    logout,
    fetchUsers,
    fetchSessions,
    deleteSession,
    saveUser,
    deleteUser
};

/**
 * passes in the username/password and dispatches an action depending on the status of the login request
 * @string username
 * @string password
 * @returns {function(*): *}
 */
function login(username, password){

    return dispatch => {
        dispatch(request({ username }));

        return userService.login(username, password)
            .then(user => {

                // TODO: take out after CORS solved
                let token = user.data.quinton;
                lib.session.saveUsername(JSON.stringify({username: username}));

                // token stored for app storage
                // sets cookie to be sent back to server
                Cookies.set(sessionConstants.SESSIONID, token);

                dispatch(success({ username }));
                dispatch(push('/app/subswitches/ports'));

            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            })
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

/**
 * dispatches an action to log the user out
 * @returns {Function}
 */
function logout(){
    return dispatch => {
        dispatch(requestLogout());

        // get username
        // let username =  lib.getSessionUsername();
        let username = lib.session.getUsername();

        // return error object if not found.
        if (!username) {
            let sessionError = new Error("unable to find the session's username, method: logout, filename: user.actions.js");
            dispatch(failureLogout(sessionError));
            return;
        }

        username = JSON.parse(username).username;

        if (username.length <= 0) {
            // error, no username captured
            let sessionError = new Error("unable to find the session's username, method: logout, filename: user.actions.js");
            dispatch(failureLogout(sessionError));
            return;
        }
        userService.logout(username)
            .then((data) => {
                // clear the session
                sessionStorage.clear();
                Cookies.remove(sessionConstants.SESSIONID);
                // dispatch logout action
                dispatch(successLogout())
                // redirect to login view;
                dispatch(push('/login'));
            },
            error => {
                dispatch(failureLogout(error));
                dispatch(alertActions.error(error));
            });

    };

    function requestLogout() { return { type: userConstants.LOGOUT_REQUEST }  }
    function successLogout() { return { type: userConstants.LOGOUT_SUCCESS }  }
    function failureLogout(error) { return { type: userConstants.LOGOUT_FAILURE, error }  }
}

/**
 * dispatches an action to fetch users and track the status of the data request
 * @returns {function(*): *}
 */
function fetchUsers() {
    return dispatch => {
        dispatch(request());

        return userService.fetchUsers()
            .then(usersData => {

                // transform data to add an 'id' and rename the 'polatis-switch:group' to 'group'
                let data = usersData.data.map((user, index) => {
                    return {id: index, name: user.name, type: user.type, password: user.password, group: user['polatis-switch:group'] };
                });

                dispatch(success(data));
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            })
    };

    function request() { return { type: userConstants.USER_LIST_REQUEST} }
    function success(users) { return { type: userConstants.USER_LIST_SUCCESS, users } }
    function failure(error) { return { type: userConstants.USER_LIST_FAILURE, error } }
}

/**
 * fetches the sessions data for all users
 * @returns {function(*): *}
 */
function fetchSessions() {
    return dispatch => {
        dispatch(request());

        return userService.fetchSessions()
            .then(sessionsData => {
                    dispatch(success(sessionsData.data));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                })
    };

    function request() { return { type: userConstants.SESSIONS_LIST_REQUEST} }
    function success(sessions) { return { type: userConstants.SESSIONS_LIST_SUCCESS, sessions } }
    function failure(error) { return { type: userConstants.SESSIONS_LIST_FAILURE, error } }
}

/**
 * dispatches an action method to request deleting a session
 * @param sessionId
 * @returns {function(*): *}
 */
function deleteSession(sessionId) {
    return dispatch => {
        dispatch(request());

        return userService.deleteSession(sessionId)
            .then(sessionData => {
                    dispatch(success(sessionData));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                })
    };

    function request() { return { type: userConstants.SESSION_DELETE_REQUEST} }
    function success(data) { return { type: userConstants.SESSION_DELETE_SUCCESS, data } }
    function failure(error) { return { type: userConstants.SESSION_DELETE_FAILURE, error } }
}

/**
 * dispatches an action method to save a user to the switch
 * @param userDetail
 * @returns {function(*): *}
 */
function saveUser(userDetail) {
    return dispatch => {
        dispatch(request());

        return userService.saveUser(userDetail)
            .then(userData => {
                    dispatch(success(userData.data));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                })
    };

    function request() { return { type: userConstants.USER_SAVE_REQUEST} }
    function success(data) { return { type: userConstants.USER_SAVE_SUCCESS, data } }
    function failure(error) { return { type: userConstants.USER_SAVE_FAILURE, error } }
}

/**
 * dispatches an action method to delete a user
 * @integer userId
 * @returns {function(*): *}
 */
function deleteUser(userId) {
    return dispatch => {
        dispatch(request());

        return userService.deleteUser(userId)
            .then(userData => {
                    dispatch(success(userData));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                })
    };

    function request() { return { type: userConstants.USER_DELETE_REQUEST} }
    function success(data) { return { type: userConstants.USER_DELETE_SUCCESS, data } }
    function failure(error) { return { type: userConstants.USER_DELETE_FAILURE, error } }
}