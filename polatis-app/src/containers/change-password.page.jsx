import React, { Component } from 'react';
import {connect} from "react-redux";
import { Tab, Nav, NavItem, Row, Col, Form, FormGroup, FormControl, Checkbox, Radio, ControlLabel, Panel, Button, MenuItem, DropdownButton } from 'react-bootstrap';
import { injectIntl } from 'react-intl';

import LoggedInUser from "components/controls/logged-in-user";
import LoggedInInterfaceTime from 'components/manage-users/logged-in-interface-time';
import { lib } from 'utils/lib';
import { uiGeneralConstants } from 'constants/ui.constants'
import FormattedMessageNoTag from 'components/controls/formatted-message-notag';
import {uiActions} from "actions/ui.actions";

class ChangePasswordPage extends Component {

    constructor (props) {
        super(props);

        this.state = {
            currentPassword: '',
            newPassword: '',
            reenterPassword: ''
        }

        lib.intlContext = this.props.intl;

        this.resizeAdminContainers = this.resizeAdminContainers.bind(this);
        this.handleCurrentPasswordChange = this.handleCurrentPasswordChange.bind(this);
        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
        this.handleReenterPasswordChange = this.handleReenterPasswordChange.bind(this);
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

    // Handlers
    handleSubmission () {
        // dispatch changing password
    }

    handleCurrentPasswordChange (e) {
        this.setState({ currentPassword: e.target.value });
    }

    handleNewPasswordChange (e) {
        this.setState({ newPassword: e.target.value });
    }

    handleReenterPasswordChange (e) {
        this.setState({ reenterPassword: e.target.value });
    }

    getCurrentPwValidationState () {
        return 'success';
    }

    getNewPwValidationState () {
        return 'success';
    }

    getReenterPwValidationState () {
        return 'success';
    }

    render() {

        const { username } = this.props.authentication.user || '';

        return (
            <div className={"admin-container js-admin-content"}>
                <div className={"login-detail"}>
                    <LoggedInUser username={username} />
                </div>
                <div className={"admin container-fluid"}>
                    <h1 className={"admin__heading"}>
                        <span className={"admin__icon admin__icon--user"}></span>
                        <FormattedMessageNoTag id={"polatis.user-management.change-password.change-password"} />
                    </h1>
                    <Col md={12} sm={12} className={"boundary"}>
                        <div>
                            <ul className={"info-list info-list__items"}>
                                <li className={"info-list__item"}>
                                    <p>
                                        <span className={"info-list__heading"}><FormattedMessageNoTag id={"polatis.user-management.general.permission"} />:</span>
                                        <span className={"info-list__detail"}>Standard</span>
                                    </p>
                                </li>
                                <li className={"info-list__item"}>
                                    <p>
                                        <span className={"info-list__heading"}><FormattedMessageNoTag id={"polatis.user-management.general.username"} />:</span>
                                        <span className={"info-list__detail"}>User 2</span>
                                    </p>
                                </li>
                            </ul>
                            {/* TODO: pass time for web/other interface logged in */}
                            <LoggedInInterfaceTime webHours={"0"} webMinutes={"0"} otherHours={"0"} otherMinutes={"0"} />
                        </div>

                        {/*TODO: validation*/}
                        <p className={"admin__validation-message"}><FormattedMessageNoTag id={"polatis.forms.message.passwords-do-not-match"} /></p>
                        <form horizontal="true" className={"form-horizontal"} onSubmit={this.handleSubmission}>
                            <FormGroup controlId="currentPassword" validationState={this.getCurrentPwValidationState()}>
                                <Col componentClass={ControlLabel}><FormattedMessageNoTag id={"polatis.user-management.change-password.current-password"} />:</Col>
                                <FormControl
                                    className="password-form__element"
                                    type="password"
                                    value={this.state.currentPassword}
                                    placeholder={lib.getFormatMessage("polatis.forms.placeholder.enter-text")}
                                    onChange={this.handleCurrentPasswordChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="newPassword" validationState={this.getNewPwValidationState()}>
                                <Col componentClass={ControlLabel}><FormattedMessageNoTag id={"polatis.user-management.change-password.new-password"} />:</Col>
                                <FormControl
                                    className="password-form__element"
                                    type="password"
                                    value={this.state.newPassword}
                                    placeholder={lib.getFormatMessage("polatis.forms.placeholder.enter-text")}
                                    onChange={this.handleNewPasswordChange}
                                />
                            </FormGroup>
                            <FormGroup controlId="reenterPassword" validationState={this.getReenterPwValidationState()}>
                                <Col componentClass={ControlLabel}>Re-enter new password:</Col>
                                <FormControl
                                    className="password-form__element"
                                    type="password"
                                    value={this.state.reenterPassword}
                                    placeholder={lib.getFormatMessage("polatis.forms.placeholder.enter-text")}
                                    onChange={this.handleReenterPasswordChange}
                                />
                            </FormGroup>
                            <Button bsStyle={"primary"} className={"pull-right"}>{lib.getFormatMessage("polatis.user-management.change-password.save")}</Button>
                        </form>
                    </Col>

                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        ...state
    };
}

export default injectIntl(connect(mapStateToProps)(ChangePasswordPage));