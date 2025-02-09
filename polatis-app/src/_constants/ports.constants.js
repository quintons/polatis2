/**
 * @fileOverview ports connection/disconnection constants
 */

/**
 * ports connection/disconnection constants
 * @type {{PORTS_REQUEST: string, PORTS_SUCCESS: string, PORTS_FAILURE: string, PORTS_CACHE: string, PORTS_CONNECTION_REQUEST: string, PORTS_CONNECTION_SUCCESS: string, PORTS_CONNECTION_FAILURE: string, PORTS_DISCONNECTION_REQUEST: string, PORTS_DISCONNECTION_SUCCESS: string, PORTS_DISCONNECTION_FAILURE: string}}
 */
export const portsConstants = {
    PORTS_REQUEST: 'PORTS_REQUEST',
    PORTS_SUCCESS: 'PORTS_SUCCESS',
    PORTS_FAILURE: 'PORTS_FAILURE',
    PORTS_CACHE: 'PORTS_CACHE',

    PORTS_CONNECTION_REQUEST: 'PORTS_CONNECTION_REQUEST',
    PORTS_CONNECTION_SUCCESS: 'PORTS_CONNECTION_SUCCESS',
    PORTS_CONNECTION_FAILURE: 'PORTS_CONNECTION_FAILURE',

    PORTS_DISCONNECTION_REQUEST: 'PORTS_DISCONNECTION_REQUEST',
    PORTS_DISCONNECTION_SUCCESS: 'PORTS_DISCONNECTION_SUCCESS',
    PORTS_DISCONNECTION_FAILURE: 'PORTS_DISCONNECTION_FAILURE'
};