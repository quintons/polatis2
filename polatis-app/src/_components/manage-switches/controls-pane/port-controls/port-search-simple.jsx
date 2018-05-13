/**
 * @fileoverview left hand pane Search -> Simple
 */

import React, { Component } from 'react';
import { Checkbox, Button } from 'react-bootstrap';

import { FieldGroup, CollapsiblePanel, FromToNumberInputs } from 'components/controls/form.controls';
import { injectIntl } from 'react-intl';
import { lib } from "utils/lib";
import { uiGeneralConstants } from "constants/ui.constants";


class PortSearchSimple extends Component {

    constructor(props){
        super(props);
        lib.intlContext = this.props.intl;
    }

    render() {
        return (
            <div className={"search-simple search-simple__container"}>
                <FieldGroup
                    id="nameControlText"
                    type="text"
                    label={lib.getFormatMessage("polatis.ports.controls-container.name")}
                    placeholder=""
                />

                <FromToNumberInputs
                    id="numberFromToControl"
                    min={"0"}
                    fromLabel={lib.getFormatMessage("polatis.ports.controls-container.from")}
                    toLabel={lib.getFormatMessage("polatis.ports.controls-container.to")}
                    heading={lib.getFormatMessage("polatis.ports.controls-container.number")}
                    fromDefaultValue={"200"}
                    toDefaultValue={"100"}
                />

                <CollapsiblePanel
                    id={"portTypeOptionsId"}
                    title={lib.getFormatMessage("polatis.ports.controls-container.port-type")}>
                        <div>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.input")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.output")}</Checkbox>
                        </div>
                </CollapsiblePanel>

                <CollapsiblePanel
                    id={"statusOptionsId"}
                    title={lib.getFormatMessage("polatis.ports.controls-container.status")}>
                        <div>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.enabled")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.disabled")}</Checkbox>
                        </div>
                </CollapsiblePanel>

                <CollapsiblePanel
                    id={"connectionOptionsId"}
                    title={lib.getFormatMessage("polatis.ports.controls-container.connection")}>
                        <div>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.connected")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.not-connected")}</Checkbox>
                        </div>
                </CollapsiblePanel>

                <CollapsiblePanel
                    id={"opmId"}
                    title={lib.getFormatMessage("polatis.ports.controls-container.opm")}>
                        <div>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.fitted")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.not-fitted")}</Checkbox>
                        </div>
                </CollapsiblePanel>

                <CollapsiblePanel
                    id={"alarmOptionsId"}
                    title={lib.getFormatMessage("polatis.ports.controls-container.alarm")}>
                        <div>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.off")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.armed")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.degraded-alarm")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.los-alarm")}</Checkbox>
                        </div>
                </CollapsiblePanel>

                <CollapsiblePanel
                    id={"apsOptionsId"}
                    title={lib.getFormatMessage("polatis.ports.controls-container.aps-service")}>
                        <div>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.in-aps-service")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.not-in-aps-service")}</Checkbox>
                        </div>
                </CollapsiblePanel>

                <CollapsiblePanel
                    id={"apsRolesOptionsId"}
                    title={lib.getFormatMessage("polatis.ports.controls-container.aps-role")}>
                        <div>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.client")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.working")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.protecting")}</Checkbox>
                        </div>
                </CollapsiblePanel>

                <Button bsStyle={"primary"} bsSize={uiGeneralConstants.SMALL}>{lib.getFormatMessage("polatis.ports.controls-container.search")}</Button>
            </div>
        );
    }
}

export default injectIntl(PortSearchSimple);