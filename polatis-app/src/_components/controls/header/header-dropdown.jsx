/**
 * @fileoverview header drop down contains the about modal component
 */

import React, { Component } from 'react';
import FormattedMessageNoTag from '../formatted-message-notag'
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import AboutModal from 'components/controls/header/about-modal';

class HeaderDropDown extends Component {

    constructor(props){
        super(props)
    }

    handleShow () {
        this.props.handleShow();
    }

    render() {

        const { serial, firmware, isLoggedInAsAdmin, showAboutModal, handleAboutModalClose } = this.props;

        if (isLoggedInAsAdmin) {

            return (
                <div>
                    <span className={"menu__cog icon-cog"}>&nbsp;</span>
                    <ButtonToolbar>
                        <DropdownButton
                            bsStyle="default pull-right"
                            className={"header__dropdown icon-down-dir"}
                            title=""
                            noCaret
                            id="dropdown-main-heading">
                            <MenuItem eventKey="1" disabled={this.props.hideAboutModal} className={"menu__item"} onSelect={() => {this.props.onModalShow();}}><FormattedMessageNoTag id="polatis.header.headerdropdown.about"/></MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey="2" className={"menu__item"} onSelect={() => {this.props.onLogout();}}>
                                <FormattedMessageNoTag id="polatis.header.headerdropdown.log-out"/>
                            </MenuItem>
                            <LinkContainer to="/app/changepassword">
                                <MenuItem eventKey="6" className={"menu__item"}><FormattedMessageNoTag id="polatis.header.headerdropdown.change-password"/></MenuItem>
                            </LinkContainer>
                            <LinkContainer to="/app/users">
                                <MenuItem eventKey="3" className={"menu__item"}><FormattedMessageNoTag id="polatis.header.headerdropdown.manage-users"/></MenuItem>
                            </LinkContainer>
                            <MenuItem divider/>
                            <LinkContainer to="/app/subswitches">
                                <MenuItem eventKey="4" className={"menu__item"}><FormattedMessageNoTag id="polatis.header.headerdropdown.manage-subswitches"/></MenuItem>
                            </LinkContainer>
                            <MenuItem divider/>
                            <LinkContainer to="/app/maintenance">
                                <MenuItem eventKey="5" className={"menu__item"}><FormattedMessageNoTag id="polatis.header.headerdropdown.maintenance"/></MenuItem>
                            </LinkContainer>
                        </DropdownButton>
                    </ButtonToolbar>
                    <AboutModal serial={serial} firmware={firmware} onModalClose={handleAboutModalClose} isAboutModalVisible={showAboutModal} />
                </div>
            );

        } else {

            return (
                <div>
                    <span className={"menu__cog icon-cog"}>&nbsp;</span>
                    <ButtonToolbar>
                        <DropdownButton
                            bsStyle="default pull-right"
                            className={"header__dropdown icon-down-dir"}
                            title=""
                            noCaret
                            id="dropdown-main-heading">
                            <MenuItem eventKey="1" onSelect={() => {this.props.onShowModal();}}><FormattedMessageNoTag id="polatis.header.headerdropdown.about"/></MenuItem>
                            <MenuItem divider/>
                            <MenuItem eventKey="2" onSelect={() => {this.props.onLogout();}}>
                                <FormattedMessageNoTag id="polatis.header.headerdropdown.log-out"/>
                            </MenuItem>
                            <LinkContainer to="/app/changepassword">
                                <MenuItem eventKey="5"><FormattedMessageNoTag id="polatis.header.headerdropdown.change-password"/></MenuItem>
                            </LinkContainer>
                            <MenuItem divider/>
                            <LinkContainer to="/app/subswitches">
                                <MenuItem eventKey="4"><FormattedMessageNoTag id="polatis.header.headerdropdown.manage-subswitches"/></MenuItem>
                            </LinkContainer>
                        </DropdownButton>
                    </ButtonToolbar>
                    <AboutModal serial={serial} firmware={firmware} onModalClose={this.handleAboutModalClose} isAboutModalVisible={this.state.showAboutModal} />
                </div>
            );
        }
    }
}

export default HeaderDropDown;
