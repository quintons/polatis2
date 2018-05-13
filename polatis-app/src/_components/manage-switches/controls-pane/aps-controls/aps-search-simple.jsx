/**
 * @fileoverview left hand pane APS Group Search -> Simple
 */

import React, { Component } from 'react';
import { Checkbox, Button } from 'react-bootstrap';

import { FieldGroup, CollapsiblePanel, FromToNumberInputs } from 'components/controls/form.controls';
import { injectIntl } from 'react-intl';
import {lib} from "utils/lib";
import { uiGeneralConstants } from "constants/ui.constants";


class APSGroupsSearchSimple extends Component {

    constructor(props){
        super(props);
        lib.intlContext = this.props.intl;
    }

    render() {
        return (
            <div>
                <p>{lib.getFormatMessage("polatis.ports.controls-container.where-aps-service-matches")}</p>
                <FieldGroup
                    id="serviceMatchesControlText"
                    type="text"
                    label={lib.getFormatMessage("polatis.ports.controls-container.name")}
                    placeholder={lib.getFormatMessage("polatis.ports.controls-container.name")}
                />

                <CollapsiblePanel
                    id={"typeOptionsId"}
                    title={lib.getFormatMessage("polatis.ports.controls-container.type")}>
                        <div>
                            <Checkbox>1+1</Checkbox>
                            <Checkbox>1:1</Checkbox>
                            <Checkbox>1:n</Checkbox>
                            <Checkbox>p:n</Checkbox>
                        </div>
                </CollapsiblePanel>

                <CollapsiblePanel
                    id={"autoRevertOptionsId"}
                    title={lib.getFormatMessage("polatis.ports.controls-container.auto-revert")}>
                        <div>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.revert")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.do-not-revert")}</Checkbox>
                        </div>
                </CollapsiblePanel>

                <CollapsiblePanel
                    id={"modeOptionsId"}
                    title={lib.getFormatMessage("polatis.ports.controls-container.mode")}>
                        <div>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.active")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.valid-configuring")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.protection-locked")}</Checkbox>
                        </div>
                </CollapsiblePanel>

                <CollapsiblePanel
                    id={"alarmId"}
                    title={lib.getFormatMessage("polatis.ports.controls-container.alarm")}>
                        <div>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.degraded-alarm")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.los-alarm")}</Checkbox>
                        </div>
                </CollapsiblePanel>

                <CollapsiblePanel
                    id={"statusOptionsId"}
                    title={lib.getFormatMessage("polatis.ports.controls-container.status")}>
                        <div>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.all-working")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.all-protection")}</Checkbox>
                            <Checkbox>{lib.getFormatMessage("polatis.ports.controls-container.mixed")}</Checkbox>
                        </div>
                </CollapsiblePanel>

                <hr />
                <p>{lib.getFormatMessage("polatis.ports.controls-container.where-any-part-matches")}</p>

                <FieldGroup
                    id="portMatchedControlText"
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

                <Button bsStyle={"default"} bsSize={uiGeneralConstants.SMALL}>{lib.getFormatMessage("polatis.ports.controls-container.search")}</Button>
            </div>
        );
    }
}

export default injectIntl(APSGroupsSearchSimple);