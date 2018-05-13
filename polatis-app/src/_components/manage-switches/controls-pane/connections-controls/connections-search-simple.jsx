/**
 * @fileoverview left hand pane Connection Search -> Simple
 */

import React, { Component } from 'react';
import { Checkbox, Button } from 'react-bootstrap';

import { FieldGroup, CollapsiblePanel, FromToNumberInputs, RadioRight } from 'components/controls/form.controls';
import { injectIntl } from 'react-intl';
import { lib } from "utils/lib";
import FormattedMessageNoTag from "components/controls/formatted-message-notag";
import { uiGeneralConstants } from "constants/ui.constants";


class ConnectionsSearchSimple extends Component {

    constructor(props){
        super(props);
        lib.intlContext = this.props.intl;
    }

    render() {
        return (
            <div className={"search-simple search-simple__container"}>

                <RadioRight
                    id={"port-match"}
                    label={<FormattedMessageNoTag id={"polatis.ports.controls-container.either-port-matches"} />}
                    classContainer={"form__checkbox--collapse"}
                    fieldName={"enabledCheck"}
                    fieldValue={false}
                />
                <RadioRight
                    id={"port-match"}
                    label={<FormattedMessageNoTag id={"polatis.ports.controls-container.both-ports-match"} />}
                    classContainer={"form__checkbox--collapse"}
                    fieldName={"enabledCheck"}
                    fieldValue={false}
                />

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
                    id={"statusId"}
                    title={lib.getFormatMessage("polatis.ports.controls-container.status")}>
                        <div>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.enabled")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.disabled")}</Checkbox>
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
                    id={"alarmId"}
                    title={lib.getFormatMessage("polatis.ports.controls-container.alarm")}>
                        <div>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.off")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.armed")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.degraded-alarm")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.los-alarm")}</Checkbox>
                        </div>
                </CollapsiblePanel>

                <hr />
                <p><FormattedMessageNoTag id={"polatis.ports.controls-container.where-connection-matches"}/></p>

                <CollapsiblePanel
                    id={"apsServiceId"}
                    title={lib.getFormatMessage("polatis.ports.controls-container.aps-service")}>
                        <div>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.in-aps-service")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.not-in-aps-service")}</Checkbox>
                        </div>
                </CollapsiblePanel>

                <CollapsiblePanel
                    id={"apsStateId"}
                    title={lib.getFormatMessage("polatis.ports.controls-container.aps-state")}>
                        <div>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.on-working")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.on-protection")}</Checkbox>
                        </div>
                </CollapsiblePanel>

                <Button bsStyle={"primary"} bsSize={uiGeneralConstants.SMALL}>{lib.getFormatMessage("polatis.ports.controls-container.search")}</Button>
            </div>
        );
    }
}

export default injectIntl(ConnectionsSearchSimple);