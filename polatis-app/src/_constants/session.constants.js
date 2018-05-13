/**
 * @fileoverview session specific constants
 */

/**
 *
 * @type {{PORTS_ETAG: string, CONNECTIONS_ETAG: string, USERS_ETAG: string, USERNAME: string, SESSIONID: string, STATE: string}}
 */
export const sessionConstants = {
    // etag constants
    PORTS_ETAG: 'pol_etag:ports',
    CONNECTIONS_ETAG: 'pol_etag:connections',
    USERS_ETAG: 'pol_etag:users',

    USERNAME: 'pol_user',
    SESSIONID: 'pol-session-id',
    STATE: 'pol_state'
};