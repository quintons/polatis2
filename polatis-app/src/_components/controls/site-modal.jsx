/**
 * @fileoverview Modal used for site wide information. typically with one or both Cancel/Delete button's
 */

import React, { Component } from 'react';
import FormattedMessageNoTag from 'components/controls/formatted-message-notag'
import {connect} from "react-redux";

import { Modal, Button } from 'react-bootstrap';
import {uiGeneralConstants} from "constants/ui.constants";
import Spinner from 'components/controls/spinner'

class SiteModal extends Component {

    constructor(props){
        super(props);

        this.options = {
            submitted: true
        };
    }

    render() {
        const { visible = false, value = '', content = '', processMessage = '', errorMessage = '', handleDelete, handleCancel, dispatch, progress, dataError } = this.props;

        return (
            <div>
                <div className={"static-modal"}>
                    {/*onHide={() => { handlerCancel(); }}*/}
                    <Modal show={visible} className={"site-modal"}>
                        <Modal.Header className={"site-modal_header"}>
                            <span className={"site-modal__icon"}>&nbsp;</span>
                        </Modal.Header>

                        <Modal.Body>
                            {(progress && !dataError) && <p className={"site-modal__content"}>{processMessage}</p>}
                            {!progress && <p className={"site-modal__content"}>{content} '{value}'?</p>}
                            {(dataError) && <p className={"site-modal__content"}>{errorMessage}</p>}
                        </Modal.Body>

                        <Modal.Footer className={"site-modal__footer"}>
                            {(dataError) && <Button className={"site-modal_btn no-margin"} bsSize={"large"} bsStyle={"primary"} onClick={() => { handleCancel(); }}><FormattedMessageNoTag id={"polatis.site-modal.button.close"} /></Button>}
                            {(!dataError) &&
                                <span>
                                    <Button className={"site-modal__btn"} disabled={progress} bsSize={"large"} bsStyle={"danger"} onClick={() => { handleDelete(dispatch, value, dataError); }}>
                                        <FormattedMessageNoTag id={"polatis.site-modal.button.delete"} />
                                        {progress && <Spinner type={uiGeneralConstants.SPINNER_BUTTON} size={uiGeneralConstants.XSMALL} speed={1.5} containerClass={"button__spinner"} />}
                                    </Button>
                                    <Button className={"site-modal_btn"} disabled={progress} bsSize={"large"} bsStyle={"primary"} onClick={() => { handleCancel(); }}>
                                        <FormattedMessageNoTag id={"polatis.site-modal.button.cancel"} />
                                    </Button>
                                </span>
                            }
                        </Modal.Footer>

                    </Modal>
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

export default connect(mapStateToProps)(SiteModal);