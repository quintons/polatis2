/**
 * @fileoverview left hand pane APS Group Detail
 */

import React, { Component } from 'react';
import { Tab, Nav, NavItem, Row, Col, Form, FormGroup, FormControl, Checkbox, Radio, ControlLabel, Panel, Button, MenuItem, DropdownButton } from 'react-bootstrap';

import { FieldGroup, CollapsiblePanel, FromToNumberInputs, SingleNumberInput } from '../../../controls/form.controls';
import { injectIntl } from 'react-intl';
import {lib} from "utils/lib";

class APSGroupsDetail extends Component {

    constructor(props){
        super(props);
        lib.intlContext = this.props.intl;
    }

    render() {
        return (
            <div>
                APS Groups Detail
                {/*<FormattedMessageNoTag id=""/>*/}
                {/*{lib.getFormatMessage("")}*/}
            </div>
        );
    }
}

export default injectIntl(APSGroupsDetail);