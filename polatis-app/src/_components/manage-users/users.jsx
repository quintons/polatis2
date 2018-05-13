/**
 * @fileoverview shows a list of users with there respective session and permission type
 */

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from "react-redux";
import shortid from 'shortid';

import { lib } from 'utils/lib';
import FormattedMessageNoTag from 'components/controls/formatted-message-notag';
import { uiGeneralConstants } from "constants/ui.constants";
import Spinner from 'components/controls/spinner';


class Users extends Component {

    constructor (props) {
        super(props);
        this.state = {
            userSearchString: '',
            userSearchCount: 0
        };
    }

    componentWillMount () {
        this.props.refreshUserData();
        this.props.refreshSessionData();
    }

    render() {

        const { usersFetching, usersFetched, usersData, sessionsFetching, sessionsFetched, sessionsData, getSessionsForUser } = this.props;

        return (
            <div className={"table-container table-container__separator"}>
                <div className={"table-container__controls"}>
                    {/*<div className={"search-controls"}>*/}
                        {/*<FormControl*/}
                            {/*type="text"*/}
                            {/*placeholder={lib.getFormatMessage("polatis.forms.placeholder.enter-text")}*/}
                            {/*value={this.state.username}*/}
                            {/*onChange={this.handleChangeUsername}*/}
                            {/*className={"search-controls__input"}*/}
                        {/*/>*/}
                        {/*<span className={"search-controls__result"}>4 users</span>*/}
                    {/*</div>*/}
                    <Button bsStyle={"primary"} disabled={this.props.isNewUserView || (!usersFetched)} bsSize={uiGeneralConstants.SMALL} className={"pull-right"} onClick={this.props.handleNewUserAction}>{lib.getFormatMessage("polatis.user-management.users.new-user")}</Button>
                </div>
                <table className={"table"}>
                    <thead className={"table__header"}>
                        <tr className={"table__header-row"}>
                            <th className={"table__header-item"}><FormattedMessageNoTag id={"polatis.user-management.users-sessions.user-name"} /></th>
                            <th className={"table__header-item"}><FormattedMessageNoTag id={"polatis.user-management.users-sessions.permission"} /></th>
                            <th className={"table__header-item"}>{sessionsFetched ? <FormattedMessageNoTag id={"polatis.user-management.users-sessions.session"} /> : <span>&nbsp;</span>}</th>
                        </tr>
                    </thead>
                    <tbody>

                    {(!usersData || !sessionsData) && <p><FormattedMessageNoTag id="polatis.user-management.users.no-user-session-data" /></p>}

                    {(usersFetching || sessionsFetching) &&
                    <tr>
                        <td>
                            <Spinner size={uiGeneralConstants.XSMALL} loadingMessage={<FormattedMessageNoTag id="polatis.user-management.users.loading-message" />} />
                        </td>
                    </tr>}
                    {(usersFetched) && usersData.data.map((user, index) => {

                        let sessionName;
                        if (sessionsFetched) {
                            let userSessions = getSessionsForUser(user.name, sessionsData);

                            if (userSessions.length > -1) {
                                let recentSession = userSessions[userSessions.length - 1];
                                if (recentSession !== undefined) sessionName = recentSession['service-name'];
                            }

                        }

                        return (
                            <tr key={shortid.generate()} className={"table__row"}>
                                <td className={"table__row-item"}><span className={"icon-user"}>&nbsp;</span><a href="#" onClick={() => {this.props.handleCurrentUserAction(user.name)}}>{user.name}</a></td>
                                <td className={"table__row-item"}><p>{user.group}</p></td>
                                {(sessionsFetched && sessionName) && <td className={"table__row-item"}><a href="#" onClick={() => {this.props.handleEditSessionAction(user.id)}}>{sessionName}</a></td>}
                                {(!sessionsFetched || !sessionName) && <td className={"table__row-item"}>&nbsp;</td>}
                            </tr>
                        );

                    })}
                    </tbody>
                </table>

            </div>
        );

    }
}

function mapStateToProps(state){
    return {
        ...state,
        usersData: state.users,
        usersFetching: state.users.fetching,
        usersFetched: state.users.fetched,
        sessionsData: state.sessions,
        sessionsFetching: state.sessions.fetching,
        sessionsFetched: state.sessions.fetched
    };
}

export default connect(mapStateToProps)(Users);