/**
 * @fileoverview shows the list of sessions for a user, and a drop down to select different users
 */

import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import shortid from 'shortid';
import { connect } from "react-redux";

import UserSessions from 'components/manage-users/user-sessions';

class Sessions extends Component {

    constructor (props) {
        super(props);
        this.state = {
            sessionSubSetData: '',
            username: ''
        }
    }

    componentWillMount () {
        const { getSessionsForUser, username, sessionsData } = this.props;
        this.setState({ sessionSubSetData: getSessionsForUser(username, sessionsData) });
        this.setState({ username: username });
    }

    handleChangeUsername (e) {
        const { getSessionsForUser, sessionsData } = this.props;
        this.setState({sessionSubSetData: getSessionsForUser(e.target.value, sessionsData)});
        this.setState({username: e.target.value});
    }

    render() {
        const { usersData, handleDeleteSessionAction } = this.props;
        const userSessionListProps = {
            username: this.state.username,
            handleDeleteSessionAction: handleDeleteSessionAction,
            refreshUserData: this.props.refreshUserData,
            sessionSubSetData: this.state.sessionSubSetData,
            sessionsFetching: this.props.sessionsFetching,
            sessionsFetched: this.props.sessionsFetched
        };

        return (

            <form className={"form-horizontal admin"}>

                <FormGroup>
                    <ControlLabel>Sessions for:</ControlLabel>
                    <FormControl type="select" componentClass="select" onChange={(e) => { this.handleChangeUsername(e); }}>
                        {usersData.data.map((user) => {
                            if (user.name === this.state.username) {
                                return (<option value={user.name} key={shortid.generate()} selected>{user.name}</option>);
                            } else {
                                return (<option value={user.name} key={shortid.generate()}>{user.name}</option>);
                            }
                        })}
                    </FormControl>
                </FormGroup>

                <UserSessions {...userSessionListProps} />

            </form>
        );
    }
}

function mapStateToProps(state){
    return {
        ...state,
        username: state.uiMSViewUserManagementMessages.data,
        usersData: state.users,
        usersFetching: state.users.fetching,
        usersFetched: state.users.fetched,
        sessionsData: state.sessions,
        sessionsFetching: state.sessions.fetching,
        sessionsFetched: state.sessions.fetched
    };
}

export default connect(mapStateToProps)(Sessions);