/**
 * @fileoverview show the user list of sessions in a table
 */

import React, { Component } from 'react';

import shortid from 'shortid';
import FormattedMessageNoTag from 'components/controls/formatted-message-notag';
import { uiGeneralConstants } from "constants/ui.constants";
import Spinner from 'components/controls/spinner';

class UserSessions extends Component {

    constructor (props) {
        super(props);
    }

    render() {
        const { sessionSubSetData, username, handleDeleteSessionAction, sessionsFetched, sessionsFetching } = this.props;

        return (
            <div className="table-responsive">
                <table className={"table basic-table"}>
                    <thead>
                    <tr className={"basic-table__header"}>
                        <th className={"table__header-item"}>User name</th>
                        <th className={"table__header-item"}>Session ID</th>
                        <th className={"table__header-item"}>IP address</th>
                        <th className={"table__header-item"}>Port</th>
                        <th className={"table__header-item"}>Interface Type</th>
                        <th className={"table__header-item"}>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>

                    {(sessionsFetching) &&
                        <tr>
                            <td>
                                <Spinner size={uiGeneralConstants.XSMALL} loadingMessage={<FormattedMessageNoTag id="polatis.user-management.users.loading-message" />} />
                            </td>
                        </tr>
                    }
                    { (sessionsFetched && sessionSubSetData.length > 0) && sessionSubSetData.map((session) => {
                        return (<tr key={shortid.generate()} data-session-id={session['session-id']}>
                            <td><p>{session['user-name']}</p></td>
                            <td><p>{session['session-id']}</p></td>
                            <td><p>{session['source-address']}</p></td>
                            <td><p>{session['source-port']}</p></td>
                            <td><p>{session['service-name']}</p></td>
                            <td><span className={"icon-bin"} onClick={() => {
                                handleDeleteSessionAction(session['session-id'])
                            }}>&nbsp;</span></td>
                        </tr>)

                    })}
                    {(sessionsFetched && sessionSubSetData.length <= 0) &&
                        <tr>
                            <td><p><FormattedMessageNoTag id={"polatis.user-management.users-sessions.no-data"} />&nbsp;'{username}'</p></td>
                        </tr>
                    }

                    </tbody>
                </table>
            </div>
        );
    }
}

export default UserSessions;