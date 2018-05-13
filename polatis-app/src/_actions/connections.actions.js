/**
 * @fileoverview connection actions, dispatch data requests
 */

import { connectionsConstants } from "constants/connections.constants";
import { switchesService } from "services/switches.service";
import { lib } from 'utils/lib'

export const connectionsActions = {
    fetchConnections
};

/**
 * fetch the connections from the switch dispatching a status to the store
 * @returns {function(*)}
 */
function fetchConnections () {

    return (dispatch) => {

        dispatch(request());

        // if 304 unmodified response, no dispatch
        switchesService.getConnections().then((connections) => {

            lib.connections.saveEtag(connections.headers.etag);
            dispatch(success(connections.data));

        }).catch((error) => {
            (error.toString().indexOf('304') > -1) ? dispatch(cache()) : dispatch(failure(error));
        })
    };

    function cache () { return { type: connectionsConstants.CONNECTIONS_CACHE } }
    function request () { return { type: connectionsConstants.CONNECTIONS_REQUEST } }
    function success (connections) { return { type: connectionsConstants.CONNECTIONS_SUCCESS, connections } }
    function failure (error) { return { type: connectionsConstants.CONNECTIONS_FAILURE, error } }
}
