/**
 * @fileoverview ports actions data requests/actions
 */

import { portsConstants } from "constants/ports.constants";
import { switchesService } from "services/switches.service";
import { lib } from 'utils/lib'

export const portsActions = {
    fetchPorts, connectPorts, disconnectPorts
};

/**
 * fetch ports data and dispatching a status
 * @returns {function(*)}
 */
function fetchPorts () {
    return (dispatch) => {
        dispatch(request());

        // if 304 unmodified response, no dispatch
        switchesService.getPorts().then((ports) => {

            lib.ports.saveEtag(ports.headers.etag);
            dispatch(success(ports.data));

        }).catch((error) => {
            (error.toString().indexOf('304') > -1) ? dispatch(cache()) : dispatch(failure(error));
        })
    };

    function cache () { return { type: portsConstants.PORTS_CACHE } }
    function request () { return { type: portsConstants.PORTS_REQUEST } }
    function success (ports) { return { type: portsConstants.PORTS_SUCCESS, ports } }
    function failure (error) { return { type: portsConstants.PORTS_FAILURE, error } }
}

/**
 * connect 2 ports together via there id, then dispatching a status
 * to that connection requerst
 * @param indexOne
 * @param indexTwo
 * @returns {function(*)}
 */
function connectPorts (indexOne, indexTwo) {
    return (dispatch) => {
        dispatch(request());
        // if 304 unmodified response, no dispatch
        switchesService.connectPorts(indexOne, indexTwo).then((connectionsData) => {
            dispatch(success(connectionsData));
        }).catch((error) => {
            dispatch(failure(error));
        })
    };

    function request () { return { type: portsConstants.PORTS_CONNECTION_REQUEST } }
    function success (connectionData) { return { type: portsConstants.PORTS_CONNECTION_SUCCESS, connectionData } }
    function failure (error) { return { type: portsConstants.PORTS_CONNECTION_FAILURE, error } }
}

/**
 * disconnect 2 ports via the id then dispatching a status to that disconnection request
 * @param portIdDisconnected
 * @returns {function(*)}
 */
function disconnectPorts (portIdDisconnected) {
    return (dispatch) => {
        dispatch(request());
        // if 304 unmodified response, no dispatch
        switchesService.disconnectPorts(portIdDisconnected).then((data) => {
            dispatch(success(data));
        }).catch((error) => {
            dispatch(failure(error));
        })
    };

    function request () { return { type: portsConstants.PORTS_DISCONNECTION_REQUEST } }
    function success (connectionData) { return { type: portsConstants.PORTS_DISCONNECTION_SUCCESS, connectionData } }
    function failure (error) { return { type: portsConstants.PORTS_DISCONNECTION_FAILURE, error } }
}
