import React, { Component } from 'react';
import { Tab, Nav, NavItem, Row, Col } from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import PortSearchSimple from 'components/manage-switches/controls-pane/port-controls/port-search-simple';
import PortSearchCustom from 'components/manage-switches/controls-pane/port-controls/port-search-custom';
import PortDetail from 'components/manage-switches/controls-pane/port-controls/port-detail';

import ConnectionsSearchSimple from 'components/manage-switches/controls-pane/connections-controls/connections-search-simple';
import ConnectionsSearchCustom from 'components/manage-switches/controls-pane/connections-controls/connections-search-custom';
import ConnectionsDetail from 'components/manage-switches/controls-pane/connections-controls/connections-detail';

import APSGroupsSearchSimple from 'components/manage-switches/controls-pane/aps-controls/aps-search-simple';
import APSGroupsSearchCustom from 'components/manage-switches/controls-pane/aps-controls/aps-search-custom';
import APSGroupsDetail from 'components/manage-switches/controls-pane/aps-controls/aps-detail';

import { ui } from 'utils/ui';
import {uiManageSubswitchesConstants, uiMessageConstants} from "constants/ui.constants";
import {uiActions} from "actions/ui.actions";


class ControlsContainer extends Component {

    constructor(props){
        super(props);

        this.tracking = {
            stagePortOne: 1,
            stagePortTwo: 1
        };
        this.lessMore = this.lessMore.bind(this);
    }

    componentWillMount () {
        this.setState({
            inputId: -1,
            outputId: -1
        });
    }

    handleOpenCloseLeftPanel(e){
        e.preventDefault();
        ui.ports.openCloseLeftPanel();
    }

    handleTabClick (tabType) {
        const { dispatch } = this.props;
        this.props.uiMSViewPortsMessages.data.viewType = '';
        dispatch(uiActions.registerLeftPaneTab(tabType));
        dispatch(uiActions.resizePortsContainers());
    }

    selectActivePrimaryKey () {
        let inputId = -1,
            outputId = -1;

        if (this.props.uiMSViewPortsMessages.payload && this.props.uiMSViewPortsMessages.payload.data) {
            inputId = this.props.uiMSViewPortsMessages.payload.data;
            outputId = this.props.uiMSViewPortsMessages.payload.data;
        }

        this.state.inputId = inputId;
        this.state.outputId = outputId;

        let activeKey = (this.props.uiManageSubswitches.tabDetailShow) ? uiManageSubswitchesConstants.TAB_DETAIL : uiManageSubswitchesConstants.TAB_SEARCH;

        switch (this.props.uiMSViewPortsMessages.type) {
            case uiMessageConstants.CONNECTIONS_DETAIL_VIEW:
            case uiMessageConstants.PORTS_DETAIL_VIEW:
            case uiMessageConstants.APS_DETAIL_VIEW:
                activeKey = uiManageSubswitchesConstants.TAB_DETAIL;
                this.props.uiManageSubswitches.tabDetailShow = true;
        }

        return activeKey;
    }

    /**
     * shared between both port-details & connection-details
     *  used in handlers for both components.
     * @param e      event passed upon clicking either up or down arrows
     * @param port   number of port 1 or 2
     */
    lessMore (e, port) {
        let classList = e.target.classList;
        let parent = (port === 1) ? document.querySelector('.js-port-one') : document.querySelector('.js-port-two');
        let jsPrev = parent.querySelector('.js-form-controls-prev');
        let jsNext = parent.querySelector('.js-form-controls-next');
        let jsOne = parent.querySelector('.js-stage-one');
        let jsTwo = parent.querySelector('.js-stage-two');

        let type = classList.contains('js-form-controls-prev') ? 'prev' : 'next';
        let currentStage = (port === 1) ? this.tracking.stagePortOne : this.tracking.stagePortTwo;

        currentStage = (type === 'prev') ? currentStage - 1 : currentStage + 1;

        switch (currentStage) {
            case 1:
                if (!jsPrev.classList.contains('hide')) { jsPrev.classList.add('hide'); }
                if (!jsOne.classList.contains('hide'))  { jsOne.classList.add('hide'); }
                break;
            case 2:
                if (jsPrev.classList.contains('hide'))  { jsPrev.classList.remove('hide'); }
                if (jsNext.classList.contains('hide'))  { jsNext.classList.remove('hide'); }
                if (jsOne.classList.contains('hide'))   { jsOne.classList.remove('hide'); }
                if (!jsTwo.classList.contains('hide'))  { jsTwo.classList.add('hide'); }
                break;
            case 3:
                if (!jsNext.classList.contains('hide')) { jsNext.classList.add('hide'); }
                if (jsTwo.classList.contains('hide'))   { jsTwo.classList.remove('hide'); }
                break;
        }
        if (port === 1) { this.tracking.stagePortOne = currentStage }
        if (port === 2) { this.tracking.stagePortTwo = currentStage }
    }

    render() {
        const { match } = this.props;

        return (
            <div className={"search-detail"}>
                <div>
                    <Tab.Container id="tabs" defaultActiveKey={uiManageSubswitchesConstants.TAB_DETAIL} onSelect={() => {}} activeKey={this.selectActivePrimaryKey()}>
                        <Row className="clearfix">
                            <Col md={12} className={"js-primary-tabs tabs__primary"}>
                                <Nav bsStyle="tabs">
                                    <NavItem eventKey={uiManageSubswitchesConstants.TAB_SEARCH} onSelect={(e) => { this.handleTabClick(e) }}>Search</NavItem>
                                    <NavItem eventKey={uiManageSubswitchesConstants.TAB_DETAIL} onSelect={(e) => { this.handleTabClick(e) }}>Detail</NavItem>
                                </Nav>
                            </Col>
                            <Col md={12}>
                                <Tab.Content animation className={"js-detail-tabs"}>
                                    <Tab.Pane eventKey={uiManageSubswitchesConstants.TAB_SEARCH} >
                                        <Tab.Container id="tabs-search-simple" defaultActiveKey={uiManageSubswitchesConstants.TAB_SEARCH_SIMPLE}>
                                            <Row>
                                                <Col md={12} className={"js-simple-custom-tabs tabs__secondary"}>
                                                    <Nav bsStyle="tabs">
                                                        <NavItem eventKey={uiManageSubswitchesConstants.TAB_SEARCH_SIMPLE} onSelect={(e) => { this.handleTabClick(e) }}>Simple</NavItem>
                                                        <NavItem eventKey={uiManageSubswitchesConstants.TAB_SEARCH_CUSTOM} onSelect={(e) => { this.handleTabClick(e) }}>Custom</NavItem>
                                                    </Nav>
                                                </Col>
                                                <Col md={12}>
                                                    <Tab.Content animation className={"js-simple-search-tab"}>
                                                        <Tab.Pane eventKey={uiManageSubswitchesConstants.TAB_SEARCH_SIMPLE}>

                                                            <Switch>
                                                                <Route path={`/app/subswitches/ports`} component={PortSearchSimple} />
                                                                <Route path={`/app/subswitches/connections`} component={ConnectionsSearchSimple} />
                                                                <Route path={`/app/subswitches/connectionstable`} component={ConnectionsSearchSimple} />
                                                                <Route path={`/app/subswitches/apsgroup`} component={APSGroupsSearchSimple} />
                                                            </Switch>

                                                        </Tab.Pane>
                                                        <Tab.Pane eventKey={uiManageSubswitchesConstants.TAB_SEARCH_CUSTOM}>

                                                            <Switch>
                                                                <Route path={`/app/subswitches/ports`} component={PortSearchCustom} />
                                                                <Route path={`/app/subswitches/connections`} component={ConnectionsSearchCustom} />
                                                                <Route path={`/app/subswitches/connectionstable`} component={ConnectionsSearchCustom} />
                                                                <Route path={`/app/subswitches/apsgroup`} component={APSGroupsSearchCustom} />
                                                            </Switch>

                                                        </Tab.Pane>
                                                    </Tab.Content>
                                                </Col>
                                            </Row>
                                        </Tab.Container>

                                    </Tab.Pane>
                                    <Tab.Pane eventKey={uiManageSubswitchesConstants.TAB_DETAIL} className={"js-detail-tab controls_container"}>

                                        <Switch>
                                            <Route path={`/app/subswitches/ports`} component={() => {
                                              return (<PortDetail outputId={this.state.outputId} inputId={this.state.inputId} handleLessMore={this.lessMore}  />);
                                            }} />
                                            <Route path={`/app/subswitches/connections`} component={() => {
                                                return(<ConnectionsDetail handleLessMore={this.lessMore} />);}} />
                                            <Route path={`/app/subswitches/connectionstable`} component={() => {
                                                return(<ConnectionsDetail handleLessMore={this.lessMore} />);}} />
                                            <Route path={`/app/subswitches/apsgroup`} component={APSGroupsDetail} />
                                        </Switch>

                                    </Tab.Pane>

                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
                <span onClick={this.handleOpenCloseLeftPanel} className={"search-detail__arrow arrow--open"}>&nbsp;</span>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        ...state
    };
}

export default connect(mapStateToProps)(ControlsContainer);




