/* test */

import axios from 'axios';

/* Using 'index' parameters on list functions:
**   null  = get all
**   value = get one (e.g. 1 or eth0)
*/

export const restlib = {
    editSessions, getOPMPower, getOPMAlarmConfig, editOPMAlarmConfig, getNotificationLog, getRadiusServers, editRadiusServers, deleteRadiusServers, getOPMConfig, editOPMConfig, getSessions, getUser, editUser, deleteUser, getGroups, editGroups, getActivityLog, editActivityLog, getProtocols, editProtocols, getInfo, getBootDatetime, getStartupMode, editStartupMode, getInterfaceStatus, getMaskNotification, editMaskNotification, getInterface, editInterface, getConnection, editConnection, deleteConnection, getShutterStatus, getPorts, editPorts, getVOA, editVOA, getAPS, editAPS, getRemoteSyslog, editRemoteSyslog, getAlarmClearHysteresis, editAlarmClearHysteresis, getNTPServers, editNTPServers, deleteNTPServers, getSystemAlarms, getSubswitches, editSubswitches, deleteSubswitches, getPortConfig, editPortConfig, getCurrentDatetime, setBaseUrl
};

function parseJson(data) {
	try {
		if (data) {
			let result = JSON.parse(data);
			for (let x in result) return result[x];
		}
	}
	catch (err) {
		console.error(err);
	}
	return null;
}

function setBaseUrl (url) {
	axios.interceptors.request.use(function(config) {
		config.baseURL = url;
		return config;
	});
}

function header_get(etag) {
	let headers = {
		"Accept": "application/yang-data+json",
		"Cache-Control": "no-store, no-cache, must-revalidate"
	};
	if (etag) headers['If-None-Match'] = etag;

	return headers;
}

function header_chg() {
	let headers = {
		"Content-Type": "application/yang-data+json",
		"Cache-Control": "no-store, no-cache, must-revalidate"
	};
	return headers;
}

function getOPMPower (etag, index) {
	let url = '/api/data/opm-power/port';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function getOPMAlarmConfig (etag, index) {
	let url = '/api/data/opm-alarm-config/port';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editOPMAlarmConfig (data) {
	return axios.patch ('/api/data/opm-alarm-config/port', { 'port': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function getNotificationLog (etag, index) {
	let url = '/api/data/notification-log/log';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function getRadiusServers (etag, index) {
	let url = '/api/data/system-config/radius-servers/radius-server';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editRadiusServers (data) {
	return axios.patch ('/api/data/system-config/radius-servers/radius-server', { 'radius-server': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function deleteRadiusServers (index) {
	let url = '/api/data/system-config/radius-servers/radius-server';
	if (index) url += '=' + index;

	return axios.delete (url, {
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		headers: header_chg()
	});
}

function getOPMConfig (etag, index) {
	let url = '/api/data/opm-config/port';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editOPMConfig (data) {
	return axios.patch ('/api/data/opm-config/port', { 'port': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function getSessions (etag, index) {
	let url = '/api/data/sessions/session';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editSessions (sessionId) {
    return axios.patch ('/api/operations/disconnect-session', { 'session-Id': sessionId }, {
        headers: header_chg(),
        auth: {'username':'admin', 'password':'root'},
        'withCredentials': true,
        transformRequest: JSON.stringify,
    });
}

function getUser (etag, index) {
	let url = '/api/data/system-config/user';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editUser (data) {
    return axios.patch ('/api/data/system-config/user', { 'user': data }, {
        headers: header_chg(),
        auth: {'username':'admin', 'password':'root'},
        'withCredentials': true,
        transformRequest: JSON.stringify,
    });
}

function deleteUser (index) {
	let url = '/api/data/system-config/user';
	if (index) url += '=' + index;

	return axios.delete (url, {
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		headers: header_chg()
	});
}

function getGroups (etag, index) {
	let url = '/api/data/groups/group';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editGroups (data) {
	return axios.patch ('/api/data/groups/group', { 'group': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function getActivityLog (etag) {
	return axios.get ('/api/data/system-config/activity-log', {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editActivityLog (data) {
	return axios.patch ('/api/data/system-config/activity-log', { 'activity-log': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function getProtocols (etag, index) {
	let url = '/api/data/system-config/protocols/protocol';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editProtocols (data) {
	return axios.patch ('/api/data/system-config/protocols/protocol', { 'protocol': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function getInfo (etag) {
	return axios.get ('/api/data/product-information', {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function getBootDatetime (etag) {
	return axios.get ('/api/data/system-config/boot-datetime', {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function getStartupMode (etag) {
	return axios.get ('/api/data/system-config/startup-mode', {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editStartupMode (data) {
	return axios.patch ('/api/data/system-config/startup-mode', { 'startup-mode': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function getInterfaceStatus (etag, index) {
	let url = '/api/data/system-config/interface-status';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function getMaskNotification (etag) {
	return axios.get ('/api/data/mask-notification', {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editMaskNotification (data) {
	return axios.patch ('/api/data/mask-notification', { 'mask-notification': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function getInterface (etag, index) {
	let url = '/api/data/system-config/interface';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editInterface (data) {
	return axios.patch ('/api/data/system-config/interface', { 'interface': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function getConnection (etag, index) {
	let url = '/api/data/cross-connects/pair';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editConnection (data) {
	return axios.patch ('/api/data/cross-connects/pair', { 'pair': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function deleteConnection (index) {
	let url = '/api/data/cross-connects/pair';
	if (index) url += '=' + index;

	return axios.delete (url, {
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		headers: header_chg()
	});
}

function getShutterStatus (etag, index) {
	let url = '/api/data/shutter-status/port';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function getPorts (etag, index) {
	let url = '/api/data/ports/port';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editPorts (data) {
	return axios.patch ('/api/data/ports/port', { 'port': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function getVOA (etag, index) {
	let url = '/api/data/voa/port';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editVOA (data) {
	return axios.patch ('/api/data/voa/port', { 'port': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function getAPS (etag, index) {
	let url = '/api/data/aps/protection-service';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editAPS (data) {
	return axios.patch ('/api/data/aps/protection-service', { 'protection-service': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function getRemoteSyslog (etag) {
	return axios.get ('/api/data/system-config/remote-syslog', {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editRemoteSyslog (data) {
	return axios.patch ('/api/data/system-config/remote-syslog', { 'remote-syslog': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function getAlarmClearHysteresis (etag) {
	return axios.get ('/api/data/system-config/alarm-clear-hysteresis', {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editAlarmClearHysteresis (data) {
	return axios.patch ('/api/data/system-config/alarm-clear-hysteresis', { 'alarm-clear-hysteresis': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function getNTPServers (etag, index) {
	let url = '/api/data/system-config/ntp-servers/ntp-server';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editNTPServers (data) {
	return axios.patch ('/api/data/system-config/ntp-servers/ntp-server', { 'ntp-server': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function deleteNTPServers (index) {
	let url = '/api/data/system-config/ntp-servers/ntp-server';
	if (index) url += '=' + index;

	return axios.delete (url, {
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		headers: header_chg()
	});
}

function getSystemAlarms (etag, index) {
	let url = '/api/data/system-alarms/alarm';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function getSubswitches (etag, index) {
	let url = '/api/data/subswitches/subswitch';
	if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editSubswitches (data) {
	return axios.patch ('/api/data/subswitches/subswitch', { 'subswitch': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function deleteSubswitches (index) {
	let url = '/api/data/subswitches/subswitch';
	if (index) url += '=' + index;

	return axios.delete (url, {
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		headers: header_chg()
	});
}

function getPortConfig (etag, index) {
	let url = '/api/data/port-config/port';
	//if (index) url += '=' + index;

	return axios.get(url, {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

function editPortConfig (data) {
	return axios.patch ('/api/data/port-config/port', { 'port': data }, {
		headers: header_chg(),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformRequest: JSON.stringify,
	});
}

function getCurrentDatetime (etag) {
	return axios.get ('/api/data/system-config/current-datetime', {
		headers: header_get(etag),
		auth: {'username':'admin', 'password':'root'},
		'withCredentials': true,
		transformResponse: parseJson
	});
}

