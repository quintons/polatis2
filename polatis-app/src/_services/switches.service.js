/**
 * @fileoverview switches (port management) service methods
 */

import { restlib } from 'utils/restlib';
import { lib } from 'utils/lib'

/**
 * exported methods
 * @type {{getPorts: function(): *, connectPorts: function(*=, *=): *, disconnectPorts: function(*=): *, getConnections: function(): *}}
 */
export const switchesService = {
    getPorts, connectPorts, disconnectPorts, getConnections
};

/**
 * gets the port data
 * @returns {*} port data
 */
function getPorts () {

    let etag = lib.ports.getEtag();

    return restlib.getPortConfig(etag).then(portData => {
        return portData;
    })
}

/**
 * connects 2 ports passed
 * @param indexOne id of port (ingress)
 * @param indexTwo id of port (egress)
 * @returns {*}
 */
function connectPorts (indexOne, indexTwo) {
    let data = [{
        ingress: indexOne,
        egress: indexTwo
    }];

    return restlib.editConnection(data).then(connectionData => {
        return connectionData;
    })
}

/**
 * disconnects a port
 * @param index id of port to disconnect
 * @returns {*} returned data
 */
function disconnectPorts (index) {
    return restlib.deleteConnection(index).then(data => {
        return data;
    })
}

/**
 * gets the connection data
 * @returns {*} connection data
 */
function getConnections () {
    let etag = lib.connections.getEtag();

    return restlib.getConnection(etag).then(data => {
        return data;
    })
}
