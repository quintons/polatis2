/**
 * @fileoverview user management user detail, used for both editing and creating user details
 */

import React, { Component } from 'react';
import { Form, Col, FormGroup, FormControl, ControlLabel, Button, ButtonToolbar } from 'react-bootstrap';
import shortid from 'shortid';
import { injectIntl } from 'react-intl';

import { lib } from 'utils/lib';
import FormattedMessageNoTag from 'components/controls/formatted-message-notag';
import { userConstants } from 'constants/user.constants'


class UserDetail extends Component {

    constructor (props) {
        super(props);
        lib.intlContext = this.props.intl;

        this.stateValues = {
            usernameControl: { value: '', message: '', isValid: true },
            passwordControl: { value: '' },
            passwordReenterControl: { value: '' },
            passwordGroupControls: { isValid: true, message: '' },
            permissionGroup: { value: '', message: '', isValid: true }
        };

        this.state = this.stateValues;
        this.updateComponent = true;

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps () {
        let { isNewUserView } = this.props;
        console.log('isNewUserView....')
        console.log(isNewUserView)
        if (!isNewUserView) {
            this._retrieveFormValues()
        }
    }

    componentDidUpdate () {
        let { isNewUserView } = this.props;
        if (isNewUserView && this.updateComponent) {
            this._resetFormValues();
            this.updateComponent = false;
        }
    }

    onChange (e) {
        let state = this.state;
        state[e.target.name].value = e.target.value;
        this.setState(state);
        this._formValid(e.target.name);
    }

    onSubmit (e) {
        e.preventDefault();
        const { handleSaveUserAction } = this.props;
        if (this._formValid()) {
            console.log('valid form!');
            handleSaveUserAction({
                username: this.state.usernameControl.value,
                permission: this.state.permissionGroup.value,
                password: this.state.passwordControl.value
            });
        }
    }

    _retrieveFormValues () {
        let state = this.state;
        let { username, permissionType } = this.props;
        console.log('username/permissionType....');
        console.log(username);
        console.log(permissionType);
        state.usernameControl = {value: username, message: '', isValid: true};
        state.passwordControl = {value: ''};
        state.passwordReenterControl = {value: ''};
        state.passwordGroupControls = {isValid: true, message: ''};
        state.permissionGroup = {value: permissionType, message: '', isValid: true};

        this.setState(state);
        this.updateComponent = true;
    }

    _resetFormValues () {
        this.stateValues = {
            usernameControl: { value: '', message: '', isValid: true },
            passwordControl: { value: '' },
            passwordReenterControl: { value: '' },
            passwordGroupControls: { isValid: true, message: '' },
            permissionGroup: { value: '', message: '', isValid: true }
        };

        this.setState(this.stateValues);
    }

    _formValid (currentElementName) {
        return true;
    }

    render() {

        const { isCurrentUserView = false, isNewUserView, permissionType = '' } = this.props;
        const { usernameControl, passwordControl, passwordReenterControl, passwordGroupControls, permissionGroup } = this.state;

        // console.log('render.....');
        // console.log('isNewUserView: ' + isNewUserView);
        // console.log('username: ' + username);
        // console.log('username: ' + this.state.usernameControl.value);

        let usernameClassGroup = `form-group ${!usernameControl.isValid ? 'has-error' : ''}`;
        let reenterPasswordClassGroup = `form-group ${!passwordGroupControls.isValid ? 'has-error' : ''}`;
        let newPasswordClassGroup = `form-group ${!passwordGroupControls.isValid ? 'has-error' : ''}`;
        let permissionsClassGroup = `basic-table__body ${!permissionGroup.isValid ? 'basic-table__body--has-error' : ''}`;

        // create permissions data
        const permissions = [
            {type: userConstants.USER_PERMISSIONS_ADMIN, description: lib.getFormatMessage('polatis.user-management.users.permissions-admin-description')},
            {type: userConstants.USER_PERMISSIONS_USER, description: lib.getFormatMessage('polatis.user-management.users.permissions-user-description')},
            {type: userConstants.USER_PERMISSIONS_VIEW, description: lib.getFormatMessage('polatis.user-management.users.permissions-view-description')},
        ];

        return (

            <Form horizontal onSubmit={this.onSubmit}>

                <p>{this.state.usernameControl.message}</p>
                <p>{this.state.permissionGroup.message}</p>
                <p>{this.state.passwordGroupControls.message}</p>

                <FormGroup controlId={"username"} validationState={null} className={usernameClassGroup}>
                    <ControlLabel><FormattedMessageNoTag id={"polatis.user-management.general.username"} />:</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder={lib.getFormatMessage("polatis.forms.placeholder.enter-text")}
                        value={usernameControl.value}
                        onChange={this.onChange}
                        className={""}
                        name={"usernameControl"}
                    />
                </FormGroup>
                <div className="table-responsive table-container__separator">
                    <table className={"table basic-table"}>
                        <thead>
                        <tr className={"basic-table__header"}>
                            <th className={"table__header-item"}>&nbsp;</th>
                            <th className={"table__header-item"}><FormattedMessageNoTag id={"polatis.user-management.general.permission"} /></th>
                            <th className={"table__header-item"}><FormattedMessageNoTag id={"polatis.user-management.general.description"} /></th>
                        </tr>
                        </thead>
                        <tbody className={permissionsClassGroup}>
                        {permissions.map((permission) => {

                            let _permissionType = '';

                            if (permission.type === userConstants.USER_PERMISSIONS_ADMIN) { _permissionType = 'admin' }
                            if (permission.type === userConstants.USER_PERMISSIONS_USER) { _permissionType = 'user' }
                            if (permission.type === userConstants.USER_PERMISSIONS_VIEW) { _permissionType = 'view' }

                            let selected = false;
                            if (permissionType === _permissionType) {
                                selected = true;
                            }

                            return (
                                <tr key={shortid.generate()}>
                                    <td>
                                        {selected && <input type="radio" value={permission.type} name="permissionGroup" checked={true} onChange={this.onChange}/>}
                                        {!selected && <input type="radio" value={permission.type} name="permissionGroup" checked={this.state.permissionGroup.value === permission.type} onChange={this.onChange}/>}
                                    </td>
                                    <td>{_permissionType}</td>
                                    <td>{permission.description}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                <p className={"admin__validation-message hide"}><FormattedMessageNoTag id={"polatis.forms.message.passwords-do-not-match"} /></p>

                <FormGroup controlId="newPassword" validationState={null} className={newPasswordClassGroup}>
                    <Col componentClass={ControlLabel}><FormattedMessageNoTag id={"polatis.user-management.change-password.new-password"} />:</Col>
                    <FormControl
                        className="password-form__element"
                        type="password"
                        value={passwordControl.value}
                        placeholder={lib.getFormatMessage("polatis.forms.placeholder.enter-text")}
                        onChange={this.onChange}
                        name={"passwordControl"}
                    />
                </FormGroup>

                <FormGroup controlId="reenterPassword" validationState={null} className={reenterPasswordClassGroup}>
                    <Col componentClass={ControlLabel}>Re-enter new password:</Col>
                    <FormControl
                        className="password-form__element"
                        type="password"
                        value={passwordReenterControl.value}
                        placeholder={lib.getFormatMessage("polatis.forms.placeholder.enter-text")}
                        onChange={this.onChange}
                        name={"passwordReenterControl"}
                    />
                </FormGroup>

                <ButtonToolbar>
                    <Button bsStyle={"primary"} className={"pull-right"} type={"submit"}><FormattedMessageNoTag id={"polatis.user-management.users.save"} /></Button>
                    {(isCurrentUserView) && <Button bsStyle={"danger"} onClick={() => {this.props.handleDeleteUserAction(user.id) }} className={"pull-right"} type={"button"}><FormattedMessageNoTag id={"polatis.user-management.users.delete"} /></Button>}
                    {(isNewUserView || isCurrentUserView) && <Button bsStyle={"danger"} onClick={this.props.handleCancelUserAction} className={"pull-right"} type={"button"}><FormattedMessageNoTag id={"polatis.user-management.users.cancel"} /></Button>}
                </ButtonToolbar>

            </Form>
        );
    }
}

export default injectIntl(UserDetail);