import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Redirect, Switch } from 'react-router-dom';

import PortsContainer from './manage-ports/ports.container'
import ConnectionsContainer from './manage-ports/connections.container'
import APSGroupContainer from './manage-ports/apsgroup.container'
import ControlsContainer from './manage-ports/left-pane/controls.container'
import LoggedInUser from "components/controls/logged-in-user";
import { uiActions } from 'actions/ui.actions'

import FormattedMessageNoTag  from 'components/controls/formatted-message-notag';
import {injectIntl} from "react-intl";

class ManageSubswitches extends Component {

    constructor(props){
        super(props);
        this.state = {
            isHeaderClosed: false,
            match: this.props.match,
            data: {}
        };

        this.handleToggleHeader = this.handleToggleHeader.bind(this);
        this.resizePortsContainers = this.resizePortsContainers.bind(this);
    }

    handleToggleHeader(e){
        e.preventDefault();
        this.setState({isHeaderClosed: !this.state.isHeaderClosed});
        const { dispatch } = this.props;
        dispatch(uiActions.toggleHeader())
    }

    resizePortsContainers () {
        const { dispatch } = this.props;
        dispatch(uiActions.resizePortsContainers())
    }

    componentWillMount(){
        window.addEventListener("resize", this.resizePortsContainers);
    }

    componentDidMount(){
        this.resizePortsContainers();
        window.addEventListener("resize", this.resizePortsContainers);
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.resizePortsContainers);
    }

    componentDidUpdate() {
        this.resizePortsContainers();
    }

    render() {
        const { username } = this.props.authentication.user || '';
        const { match } = this.props;
        const button_styles = "submenu__hideshow-button " + ((!this.state.isHeaderClosed) ? "icon-resize-full-1" : "icon-resize-small-1");

        return (
            <div>
                <div className="container__left">
                    <div className={"login-detail js-login-detail"}>
                        <LoggedInUser username={username} />
                    </div>
                    <ControlsContainer data={this.state.data} />
                </div>
                <div className={"container__right"}>
                    <div className={"submenu js-submenu"}>
                        <ul className={"submenu__items"}>
                            <li className={"submenu__item"}><Link to={`${match.url}/ports`} className={location.pathname.toLowerCase().endsWith('/ports') ? "submenu__link submenu__link--active" : "submenu__link"}><FormattedMessageNoTag id="polatis.manage-switches.submenu.ports" /></Link></li>
                            <li className={"submenu__item"}><Link to={`${match.url}/connections`}  className={location.pathname.toLowerCase().endsWith('/connections') ? "submenu__link submenu__link--active" : "submenu__link"}><FormattedMessageNoTag id="polatis.manage-switches.submenu.connectionsgrid" /></Link></li>
                            <li className={"submenu__item"}><Link to={`${match.url}/connectionstable`}  className={location.pathname.toLowerCase().endsWith('/connectionstable') ? "submenu__link submenu__link--active" : "submenu__link"}><FormattedMessageNoTag id="polatis.manage-switches.submenu.connectionstable" /></Link></li>
                            <li className={"submenu__item"}><Link to={`${match.url}/apsgroup`}  className={location.pathname.toLowerCase().endsWith('/apsgroup') ? "submenu__link submenu__link--active" : "submenu__link"}><FormattedMessageNoTag id="polatis.manage-switches.submenu.apsgroup" /></Link></li>
                            <li className={"submenu__item submenu__item--hide"}><button className={button_styles} onClick={this.handleToggleHeader} >&nbsp;</button></li>
                        </ul>
                    </div>
                    <div className={"content"}>
                        <Switch>
                            <Route path={`${match.url}/ports`} component={PortsContainer} />
                            <Route path={`${match.url}/connections`} render={() => <ConnectionsContainer type={"grid"} />} />
                            <Route path={`${match.url}/connectionstable`} render={() => <ConnectionsContainer type={"table"} />} />
                            <Route path={`${match.url}/apsgroup`} component={APSGroupContainer} />
                            <Redirect to={`${match.url}/ports`} />
                        </Switch>
                    </div>
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

export default injectIntl(connect(mapStateToProps)(ManageSubswitches));