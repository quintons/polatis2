import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import {injectIntl} from "react-intl";

import { userActions } from "actions/user.actions";
import FormattedMessageNoTag  from 'components/controls/formatted-message-notag';
import { lib } from 'utils/lib';
import Spinner from 'components/controls/spinner'
import { uiGeneralConstants } from "constants/ui.constants";
import { uiActions } from 'actions/ui.actions';


class LoginPage extends Component {

    constructor(props){
        super(props);

        lib.intlContext = this.props.intl;

        this.state = {
            username: '',
            password: '',
            submitted: false,
            error: null,
            firstRun: true
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleIconSubmit = this.handleIconSubmit.bind(this);
    }

    handleChange(e){
        const { name, value } = e.target;
        this.setState({ [name]: value });
        this.setState({ error: null });
        this.setState({ firstRun: false })
    }

    handleSubmit(e){
        e.preventDefault();

        this.setState({ submitted: true });
        this.setState({ firstRun: false })

        const { username, password } = this.state;
        const { dispatch } = this.props;

        if (username && password){
            dispatch(userActions.login(username, password))
                .then(() => {
                    const { error } = this.props.authentication;
                    this.state.submitted = true;

                    this.setState({ submitted: false });
                    this.setState({ error: error })
                });
        } else {
            this.setState({ submitted: false });
        }
    }

    handleIconSubmit() {
        this.loginForm.submit();
    }

    componentDidMount () {
        if(lib.session.isLoggedIn()){
            this.props.history.push('/app/subswitches');
        }

        const { dispatch } = this.props;
        dispatch(uiActions.setMessage(lib.getFormatMessage('polatis.footer.messages.enter-login-details')));
    }

    render() {
        const { username, password } = this.state;

        let errorInputClasses = "",
            error           = this.state.error,
            errorLogin      = false,
            errorSystem     = false,
            errorUsername   = username.length === 0,
            errorPassword   = password.length === 0;

        if (error == null && (errorUsername || errorPassword)) { errorInputClasses = " form-control login__form-control login__form-control--error"; }

        if (error && error.response && error.response.status && (!errorUsername && !errorPassword)) {
            if (error.response.status === 401) {
                errorLogin = true;
            } else {
                errorSystem = true;
            }
        }

        return (
            <section className={"login"}>
                <form className={"form-signin"} id={"login-form"} onSubmit={this.handleSubmit} ref={(form) => { this.loginForm = form; }}>

                    <div className={"login__heading"}>
                        <h2 className={"heading__main"}><FormattedMessageNoTag id="polatis.login.login-page.heading" /></h2>
                        <h3 className={"heading__sub"}>PolatisOXC</h3>
                    </div>

                    <div className={"login__content"}>

                        {errorLogin && <p className={"login__error-message"}><FormattedMessageNoTag id="polatis.login.login-page.errormessage-login" /></p>}
                        {errorSystem && <p className={"login__error-message"}><FormattedMessageNoTag id="polatis.login.login-page.errormessage-system" /></p>}
                        {(errorUsername || errorPassword && !this.state.firstRun) && <p className={"login__error-message"}><FormattedMessageNoTag id="polatis.login.login-page.errormessage-nodetails" /></p>}

                        <div className={"login__controls"}>
                            <div className={"login__control"}>
                                <label htmlFor="username" className={"login__label"}><FormattedMessageNoTag id="polatis.login.login-page.username" /></label>
                                <div className={"form-control__icon-wrapper"}>
                                    <span className={"icon-user-circle-o"}>&nbsp;</span>
                                    <input type="text" id="username" name="username" className={"form-control login__form-control" + (errorUsername ? errorInputClasses : "")} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className={"login__control"}>
                                <label htmlFor="password" className={"login__label"}><FormattedMessageNoTag id="polatis.login.login-page.password" /></label>
                                <div className={"form-control__icon-wrapper"}>
                                    <span className={"icon-lock"}>&nbsp;</span>
                                    <input type="password" id="password" name="password" className={"form-control login__form-control" + (errorPassword ? errorInputClasses : "")} onChange={this.handleChange} />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={"button__icon-wrapper"}>
                        {!this.state.submitted && <span className={"icon-right-big button__icon"} onClick={this.handleIconSubmit} />}
                        {this.state.submitted && <Spinner type={uiGeneralConstants.SPINNER_BUTTON} size={uiGeneralConstants.SMALL} speed={2} containerClass={"button__spinner"} />}
                        <button className={"btn btn-lg btn-primary btn-block login__button"}><FormattedMessageNoTag id="polatis.login.login-page.login" /></button>
                    </div>
                </form>
            </section>
        );
    }
}

function mapStateToProps(state){
    return {
        ...state
    };
}

export default withRouter(injectIntl(connect(mapStateToProps)(LoginPage)));