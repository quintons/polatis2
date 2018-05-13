/**
 * @fileoverview user service methods
 */

import axios from 'axios';
import {restlib} from "utils/restlib";
import {lib} from "utils/lib";

/**
 * exported methods
 * @type {{login: function(*=, *=): AxiosPromise, logout: function(*=): AxiosPromise, refreshSession: function(): AxiosPromise, changePassword: changePassword, fetchUsers: function(): *, saveUser: function(*=): *, deleteUser: function(*=): *, fetchSessions: function(): *, deleteSession: function(*=): *}}
 */
export const userService = {
    login,
    logout,
    refreshSession,
    changePassword,
    fetchUsers,
    saveUser,
    deleteUser,
    fetchSessions,
    deleteSession
};

/**
 * login to the system using user credentials
 * @string username - username of the user
 * @string password - password of the user
 * @returns {AxiosPromise} - promise returned
 */
function login(username, password){
    // withCredentials: true,
    // "Accept-Credentials":
    return axios({
        method: 'post',
        url: '/auth/login.ss',
        withCredentials: true,
        params: {
            username: username,
            password: password
        },
        headers: {
            "Accept": "application/yang-data+json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * logout from the system
 * @string username - username of the user
 * @returns {AxiosPromise} promise returned
 */
function logout(username){
    return axios({
        method: 'post',
        url: '/auth/logout.ss',
        withCredentials: true,
        params: {
            username: username
        },
        headers: {
            "Accept": "application/yang-data+json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
            'Content-Type': 'application/x-www-form-urlencoded'
         }
     })
}

/**
 * refreshes the session for the logged in user
 * @returns {AxiosPromise} returned promise
 */
function refreshSession(){
    return axios({
        method: 'post',
        url: '/auth/keep.ss',
        headers: {
            "Accept": "application/yang-data+json",
            "Cache-Control": "no-store, no-cache, must-revalidate",
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * changes the password for the user
 * @string newPassword - users new password
 */
function changePassword(newPassword) {

}

/**
 * fetches the users data
 * @returns {*} promise sent back of users data
 */
function fetchUsers() {
    let etag = lib.users.getEtag();

    return restlib.getUser(etag).then(userData => {
        return userData;
    })
}

/**
 * save user details
 * @param userDetail
 * @returns {*} promise returned
 */
function saveUser(userDetail) {
    // let etag = lib.users.getEtag();

    return restlib.editUser(userDetail).then(userData => {
        return userData;
    })
}

/**
 * delete user using the user id
 * @string userId - user id
 * @returns {*} promise returned
 */
function deleteUser(userId) {
    // let etag = lib.users.getEtag();

    return restlib.deleteUser(userId).then(userData => {
        return userData;
    })
}

/**
 * fetches the sessions of all users
 * @returns {*} promise returned
 */
function fetchSessions() {
    let etag = lib.users.getEtag();

    return restlib.getSessions(etag).then(sessionData => {
        return sessionData;
    })
}

/**
 * deletes a single session using the session id
 * @string sessionId - session id
 * @returns {*}
 */
function deleteSession(sessionId) {
    return restlib.editSessions(sessionId).then(sessionData => {
        return sessionData;
    })
}

