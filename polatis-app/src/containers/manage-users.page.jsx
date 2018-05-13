import React, { Component } from 'react';
import {connect} from "react-redux";
import { Col } from 'react-bootstrap';
import { injectIntl } from 'react-intl';

import LoggedInUser from "components/controls/logged-in-user";
import UserDetail from 'components/manage-users/user-detail';
import Sessions from 'components/manage-users/sessions';
import Users from 'components/manage-users/users';
import { lib } from "utils/lib";
import { uiActions } from "actions/ui.actions";
import { uiMessageConstants } from "constants/ui.constants";
import SiteModal from 'components/controls/site-modal';
import {userActions} from "actions/user.actions";

class ManageUsers extends Component {

    constructor (props) {
        super(props);
        lib.intlContext = this.props.intl;

        this.userActions = {
            visible: true,
            content: 'Are you sure you want to delete the user with the user name',
            processMessage: 'Deletion of user in progress...',
            errorMessage: 'Error occurred while deleting user, if this continues contact your administrator.',
            value: '',
            progress: false,
            handleDelete: (dispatch, value) => { this._handleModalDeleteUserAction(dispatch, value); },
            handleCancel: () => { this.setState({ visible: false }); },
            dataError: false
        };

        this.sessionActions = {
            visible: true,
            content: 'Are you sure you want to end the session with ID',
            processMessage: 'deletion of session in progress...',
            errorMessage: 'Error occurred while deleting session, if this continues contact your administrator.',
            value: '',
            progress: false,
            handleDelete: (dispatch, value) => { this._handleModalDeleteSessionAction(dispatch, value); },
            handleCancel: () => { this.setState({ visible: false }); },
            dataError: false
        };

        this.resizeAdminContainers = this.resizeAdminContainers.bind(this);
        this._handleCancelUserAction = this._handleCancelUserAction.bind(this);
        this._handleCurrentUserAction = this._handleCurrentUserAction.bind(this);
        this._handleDeleteUserAction = this._handleDeleteUserAction.bind(this);
        this._handleNewUserAction = this._handleNewUserAction.bind(this);
        this._handleSaveUserAction = this._handleSaveUserAction.bind(this);
        this._handleDeleteSessionAction = this._handleDeleteSessionAction.bind(this);
        this._handleEditSessionAction = this._handleEditSessionAction.bind(this);
        this._refreshUserData = this._refreshUserData.bind(this);
        this._refreshSessionData = this._refreshSessionData.bind(this);

        this._handleModalDeleteSessionAction = this._handleModalDeleteSessionAction.bind(this);
        this._handleModalDeleteUserAction = this._handleModalDeleteUserAction.bind(this);
    }

    resizeAdminContainers () {
        const { dispatch } = this.props;
        dispatch(uiActions.resizeAdminContainers())
    }

    componentWillMount(){
        window.addEventListener("resize", this.resizeAdminContainers);
    }

    componentDidMount(){
        this.resizeAdminContainers();
        window.addEventListener("resize", this.resizeAdminContainers);
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.resizeAdminContainers);
    }

    componentDidUpdate() {
        this.resizeAdminContainers();
    }

    _handleNewUserAction () {
        const { dispatch } = this.props;
        dispatch(uiActions.showNewUserView());
    }

    _handleCurrentUserAction (username) {
        const { dispatch } = this.props;
        dispatch(uiActions.showCurrentUserView(username));
    }

    _handleEditSessionAction (userId) {
        const { dispatch } = this.props;
        // find username from using generated userId.
        let username = this._getUsernameFromUserId(userId);
        // dispatch action to show session view
        dispatch(uiActions.showEditSessionsView(username));
    }

    // TODO: use this in user detail!
    _handleSaveUserAction () {
        const { dispatch } = this.props;
        let saveUserResult = dispatch(userActions.saveUser());

        saveUserResult.then(() => {
            // refresh user list
            this._refreshUserData();
            // close/hide user detail
            dispatch(uiActions.hideUserView());
        }, error => {
            // TODO: saving user error
            console.log('USER SAVE ERROR!');
            console.log(error);
        })
    }

    _handleDeleteUserAction (username) {
        this.userActions.value = username;
        this.setState(this.userActions);
    }

    _handleCancelUserAction () {
        const { dispatch } = this.props;
        dispatch(uiActions.cancelUserAction());
    }

    _handleDeleteSessionAction (sessionId) {
        this.sessionActions.value = sessionId;
        this.setState(this.sessionActions);
    }

    _handleModalDeleteUserAction (dispatch, value) {
        // show button spinner
        // show message 'please wait, deleting user...'
        // execute action (promise)
        this.setState({ progress: true });
        let result = dispatch(userActions.deleteUser(value));
        result.then(() => {
            // TODO: refresh session data
            // TODO: test if error, then refresh data if ok
            this._refreshSessionData();
            this._refreshUserData();
            this.setState({ visible: false });
            this.setState({ progress: false });
        })
    }

    _handleModalDeleteSessionAction (dispatch, value) {
        this.setState({ progress: true });

        let result = dispatch(userActions.deleteSession(value));
        result.then(() => {
            let dataError = this.props.sessionDataChange.error || false;
            this.setState({ dataError: dataError });

            if (!dataError) {
                this._refreshUserData();
                this._refreshSessionData();
                this.setState({ progress: false });
                this.setState({ visible: false });
            }
        });
    }

    _refreshSessionData () {
        const { dispatch } = this.props;
        dispatch(userActions.fetchSessions());
    }

    _refreshUserData () {
        const { dispatch } = this.props;
        dispatch(userActions.fetchUsers());
    }

    _getUsernameFromUserId (userId) {
        // get user data
        let userData = this.props.users.data;

        // filter user data
        let data = userData.filter((user) => {
            if (userId === user.id) { return user.name; }
        });

        return data[0].name || '';
    }

    _getSessionsForUser (username, sessionsData) {
        // get last session for current user
        return sessionsData.data.filter((session) => {
            if (session['user-name'] === username) return username;
        });
    }

    render() {

        const username = this.props.authentication.user.username || '';
        const data = this.props.uiMSViewUserManagementMessages.data || '';

        const isUserDetailVisible = this.props.uiMSViewUserManagementMessages.type === uiMessageConstants.MANAGEUSERS_NEWUSER_VIEW ||
            this.props.uiMSViewUserManagementMessages.type === uiMessageConstants.MANAGEUSERS_CURRENTUSER_VIEW;

        const isNewUserView = this.props.uiMSViewUserManagementMessages.type === uiMessageConstants.MANAGEUSERS_NEWUSER_VIEW;
        const isCurrentUserView = this.props.uiMSViewUserManagementMessages.type === uiMessageConstants.MANAGEUSERS_CURRENTUSER_VIEW;
        const isUserSessionVisible = this.props.uiMSViewUserManagementMessages.type === uiMessageConstants.MANAGEUSERS_EDITSESSIONS_VIEW;

        let propsUsers = {
            handleNewUserAction: this._handleNewUserAction,
            handleCurrentUserAction: this._handleCurrentUserAction,
            handleEditSessionAction: this._handleEditSessionAction,
            getSessionsForUser: this._getSessionsForUser,
            refreshUserData: this._refreshUserData,
            refreshSessionData: this._refreshSessionData,
            isUserDetailVisible: isUserDetailVisible,
            isNewUserView: isNewUserView
        };

        let propsUserDetail = {
            handleSaveUserAction: this._handleSaveUserAction,
            handleDeleteUserAction: this._handleDeleteUserAction,
            handleCancelUserAction: this._handleCancelUserAction,
            refreshUserData: this._refreshUserData,
            isNewUserView: isNewUserView,
            isCurrentUserView: isCurrentUserView,
            permissionType: data
        };

        let propsSessions = {
            handleDeleteSessionAction: this._handleDeleteSessionAction,
            getSessionsForUser: this._getSessionsForUser,
            isUserSessionVisible: isUserSessionVisible
        };

        return (
            <div className={"admin-container js-admin-content"}>
                <div className={"login-detail"}>
                    <LoggedInUser username={username} />
                </div>
                <div className={"admin container-fluid"}>
                    <h1 className={"admin__heading"}><span className={"admin__icon admin__icon--users"} />Manage users and sessions</h1>
                    <Col md={10} sm={10}>
                        <Users {...propsUsers} />
                        <Col md={10} sm={10} className={"nopadding"}>
                            {(isUserDetailVisible) && <UserDetail {...propsUserDetail} />}
                            {(isUserSessionVisible) && <Sessions {...propsSessions} />}
                        </Col>
                    </Col>
                </div>
                <SiteModal {...this.state}  />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        ...state
    };
}

export default injectIntl(connect(mapStateToProps)(ManageUsers));