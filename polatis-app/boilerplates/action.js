/**
 * @fileoverview connection actions, dispatch data requests
 */

import constants from "constants";
import { service } from 'service';

export const actions = {
    actionMethods,
    actionMethod
};

/**
 * action methods, these return an action method depending on success of the returned promise
 * note: this uses the middlewear redux-thunk for making the dispatch method available
 * @returns {function(*)}
 */
function actionMethods (someData) {

    return (dispatch) => {

        dispatch(request());

        // if 304 unmodified response, no dispatch
        service.getPromise(someData).then((data) => {

            dispatch(success(data));

        }).catch((error) => {
            dispatch(failure(error));
        })
    };

    function request () { return { type: constants.TYPE_REQUEST } }
    function success (data) { return { type: constants.TYPE_SUCCESS, data } }
    function failure (error) { return { type: constants.TYPE_FAILURE, error } }
}

function actionMethod(passed){
    return { type: constants.TYPE, payload: { data: passed } }
}