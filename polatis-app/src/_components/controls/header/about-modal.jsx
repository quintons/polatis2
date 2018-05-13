/**
 * @fileoverview about modal executed from within the header drop down
 */

import React, { Component } from 'react';
import FormattedMessageNoTag from 'components/controls/formatted-message-notag'

import { Modal, Button } from 'react-bootstrap';

/**
 * About modal class
 */
class AboutModal extends Component {

    constructor(props){
        super(props);
    }

    render() {
        const { serial, firmware, isAboutModalVisible } = this.props;

        return (
            <div>
                <div className={"static-modal"}>
                    <Modal className={"site-modal"} show={isAboutModalVisible} onHide={() => { this.props.onModalClose(); }}>
                        <Modal.Header className={"site-modal_header"}>
                            <Modal.Title><FormattedMessageNoTag id="polatis.header.about.heading"/></Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <ul>
                                <li><p className={"site-modal__content"}><FormattedMessageNoTag id="polatis.header.about.serial"/>: <span>{serial}</span></p></li>
                                <li><p className={"site-modal__content"}><FormattedMessageNoTag id="polatis.header.about.firmware"/>: <span>{firmware}</span></p></li>
                            </ul>
                        </Modal.Body>

                        <Modal.Footer className={"site-modal__footer"}>
                            <Button className={"site-modal_btn no-margin"} bsSize={"large"} bsStyle={"primary"} onClick={() => { this.props.onModalClose(); }}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default AboutModal;
