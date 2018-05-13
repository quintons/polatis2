/**
 * @fileoverview left hand pane Port Detail
 */

import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';

import { FieldGroup, CollapsiblePanel, SingleNumberInput, MultiInputs, FormControlRight, NumberInput, CheckBoxRight } from 'components/controls/form.controls';
import { injectIntl } from 'react-intl';

import { lib } from "utils/lib";
import { ui } from "utils/ui";
import FormattedMessageNoTag from 'components/controls/formatted-message-notag'
import { uiGeneralConstants } from "constants/ui.constants";
import Info from 'components/controls/info';

class PortDetail extends Component {

    constructor(props){
        super(props);
        lib.intlContext = this.props.intl;

        this.handleLessMore_portOne = this.handleLessMore_portOne.bind(this);
        this.handleLessMore_portTwo = this.handleLessMore_portTwo.bind(this);
    }

    handleChangeAttenuation (e) {
        let parent = ui.getClosest(e.target, '.panel__body');
        if (parent !== null) {
            let refPort = parent.querySelector('.js-reference-port').classList;
            (e.target.value === '3') ? refPort.remove('hide') : refPort.add('hide');
        }
    }

    handleLessMore_portOne (e) {
        this.props.handleLessMore(e, 1);
    }

    handleLessMore_portTwo (e) {
        this.props.handleLessMore(e, 2);
    }

    render() {

        let portSelected = true;

        if (portSelected) {
            return (
                <div className={"details"}>
                    {/*<h1>port detail</h1>*/}
                    <div className={"detail detail__container js-port-one"}>
                        <FieldGroup
                            id="portControlText"
                            type="text"
                            label="Port 2"
                            classContainer={"form-group--header"}
                        />

                        <FormGroup className={"form-group form-group--collapse"}>
                            <ControlLabel className={"form__label"}><FormattedMessageNoTag id={"polatis.ports.controls-container.type"}/></ControlLabel>
                            <FormControl.Static className={"form__static-text"}>Input</FormControl.Static>
                        </FormGroup>

                        <CheckBoxRight
                            id={"enabled"}
                            label={<FormattedMessageNoTag id={"polatis.ports.controls-container.enabled"}/>}
                            classContainer={"form__checkbox--collapse"}
                            fieldName={"enabledCheck"}
                            fieldValue={true}
                        />

                        <FormGroup className={"form-group form-group--collapse"}>
                            <ControlLabel className={"form__label"}><FormattedMessageNoTag id={"polatis.ports.controls-container.connected-to"}/></ControlLabel>
                            <FormControl.Static className={"form__static-text"}>Not connected</FormControl.Static>
                        </FormGroup>

                        <FormGroup className={"form-group form-group--collapse"}>
                            <ControlLabel className={"form__label"}><FormattedMessageNoTag id={"polatis.ports.controls-container.alarm"}/></ControlLabel>
                            <FormControl.Static className={"form__static-text"}>Armed</FormControl.Static>
                        </FormGroup>

                        <div className={"js-stage-one hide"}>
                            <hr/>

                            <FormGroup className={"form-group form-group--collapse"}>
                                <ControlLabel className={"form__label"}><FormattedMessageNoTag id={"polatis.ports.controls-container.power"}/></ControlLabel>
                                <FormControl.Static className={"form__static-text"}>[x] dBm</FormControl.Static>
                            </FormGroup>

                            <FormGroup className={"form-group form-group--collapse"}>
                                <ControlLabel className={"form__label"}><FormattedMessageNoTag id={"polatis.ports.controls-container.aps-service"}/></ControlLabel>
                                <FormControl.Static className={"form__static-text"}>None</FormControl.Static>
                            </FormGroup>
                        </div>

                        <div className={"js-stage-two hide"}>
                            <hr/>

                            <CollapsiblePanel id={"alarmOptionsId"} title={lib.getFormatMessage("polatis.ports.controls-container.alarm")}>
                                <div>
                                    <FormControlRight id={"alarmControl"} collapse={true} label={lib.getFormatMessage("polatis.ports.controls-container.alarm")}>
                                        <FormControl componentClass="select" placeholder="select" className={"alarm__alarmControl"}>
                                            <option value="0">{lib.getFormatMessage("polatis.ports.controls-container.on")}</option>
                                            <option value="1">{lib.getFormatMessage("polatis.ports.controls-container.off")}</option>
                                        </FormControl>
                                    </FormControlRight>
                                    <MultiInputs id={"thresholdFromToControl"} heading={lib.getFormatMessage("polatis.ports.controls-container.threshold")}>
                                        <NumberInput
                                            id={"lowControl"}
                                            label={lib.getFormatMessage("polatis.ports.controls-container.low")}
                                            defaultValue={"0"}
                                            min={"-75"} max={"30"}
                                            stack={true}
                                            measurement={"dbm"}
                                        />
                                        <NumberInput
                                            id={"degradeControl"}
                                            label={lib.getFormatMessage("polatis.ports.controls-container.degrade")}
                                            defaultValue={"0"}
                                            min={"-75"} max={"30"}
                                            stack={true}
                                            measurement={"dbm"}
                                        />
                                        <NumberInput
                                            id={"highControl"}
                                            label={lib.getFormatMessage("polatis.ports.controls-container.high")}
                                            defaultValue={"0"}
                                            min={"-75"} max={"30"}
                                            stack={true}
                                            measurement={"dbm"}
                                        />
                                    </MultiInputs>

                                    <FormControlRight id={"holdOffTimeControl"}
                                                      label={lib.getFormatMessage("polatis.ports.controls-container.hold-off-time")}
                                                      measurement={"sec"}>
                                        <FormControl type="number" className={"form__control"} defaultValue={100} min={0}/>
                                    </FormControlRight>
                                </div>
                            </CollapsiblePanel>

                            <CollapsiblePanel
                                id={"voaOptionsId"}
                                title={lib.getFormatMessage("polatis.ports.controls-container.voa")}>
                                <div>
                                    <FormControlRight id={"attenuationSelect"} label={lib.getFormatMessage("polatis.ports.controls-container.attenuation")}>
                                        <FormControl componentClass="select" onChange={this.handleChangeAttenuation}
                                                     placeholder={lib.getFormatMessage("polatis.forms.placeholder.select")}
                                                     className={"form__select"}>
                                            <option value="0">{lib.getFormatMessage("polatis.ports.controls-container.none")}</option>
                                            <option value="1">{lib.getFormatMessage("polatis.ports.controls-container.absolute")}</option>
                                            <option value="2">{lib.getFormatMessage("polatis.ports.controls-container.converged-absolute")}</option>
                                            <option value="3">{lib.getFormatMessage("polatis.ports.controls-container.relative")}</option>
                                        </FormControl>
                                    </FormControlRight>

                                    <SingleNumberInput
                                        id={"levelId"}
                                        label={lib.getFormatMessage("polatis.ports.controls-container.level")}
                                        defaultValue={"0"}
                                    />
                                    <FormGroup className={"form-group js-reference-port hide"}>
                                        <ControlLabel className={"form__label"}><FormattedMessageNoTag id={"polatis.ports.controls-container.reference-port"}/></ControlLabel>
                                        <FormControl.Static className={"form__static-text"}>{lib.getFormatMessage("polatis.ports.controls-container.none")}</FormControl.Static>
                                    </FormGroup>
                                </div>
                            </CollapsiblePanel>

                            <CollapsiblePanel
                                id={"powerLevelOptionsId"}
                                title={lib.getFormatMessage("polatis.ports.controls-container.power-level")}>
                                <div>
                                    <SingleNumberInput
                                        id={"powerlevelSensitivityId"}
                                        label={lib.getFormatMessage("polatis.ports.controls-container.sensitivity")}
                                        defaultValue={"0"}
                                    />
                                    <SingleNumberInput
                                        id={"wavelengthId"}
                                        label={lib.getFormatMessage("polatis.ports.controls-container.wavelength")}
                                        defaultValue={"0"}
                                    />
                                    <SingleNumberInput
                                        id={"offsetId"}
                                        label={lib.getFormatMessage("polatis.ports.controls-container.offset")}
                                        defaultValue={"0"}
                                    />
                                    <SingleNumberInput
                                        id={"averagingTimeId"}
                                        label={lib.getFormatMessage("polatis.ports.controls-container.averaging-time")}
                                        defaultValue={"0"}
                                    />
                                </div>
                            </CollapsiblePanel>
                        </div>

                        <div className={"form-controls"}>
                            <Button bsStyle={"primary"} bsSize={uiGeneralConstants.SMALL} className={"pull-left"}>{lib.getFormatMessage("polatis.ports.controls-container.reset-to-defaults")}</Button>
                            <span className={"form-controls__icon-container"}>
                                <span className={"form-controls__prev js-form-controls-prev hide"} onClick={this.handleLessMore_portOne}></span>
                                <span className={"form-controls__next js-form-controls-next"} onClick={this.handleLessMore_portOne}></span>
                            </span>
                        </div>

                    </div>

                    <div className={"details__connection-container"}>
                        <hr className={"details__connection-separator"}/>
                        <Button bsStyle={"primary"} bsSize={uiGeneralConstants.SMALL} className={"details__connection-state"}>{lib.getFormatMessage("polatis.ports.controls-container.disconnect")}</Button>
                    </div>

                    <div className={"detail detail__container js-port-two"}>
                        <FieldGroup
                            id="portControlText"
                            type="text"
                            label="Port 2"
                            classContainer={"form-group--header"}
                        />

                        <FormGroup className={"form-group form-group--collapse"}>
                            <ControlLabel className={"form__label"}><FormattedMessageNoTag id={"polatis.ports.controls-container.type"}/></ControlLabel>
                            <FormControl.Static className={"form__static-text"}>Input</FormControl.Static>
                        </FormGroup>

                        <CheckBoxRight
                            id={"enabled"}
                            label={<FormattedMessageNoTag id={"polatis.ports.controls-container.enabled"}/>}
                            classContainer={"form__checkbox--collapse"}
                            fieldName={"enabledCheck"}
                            fieldValue={true}
                        />

                        <FormGroup className={"form-group form-group--collapse"}>
                            <ControlLabel className={"form__label"}><FormattedMessageNoTag id={"polatis.ports.controls-container.connected-to"}/></ControlLabel>
                            <FormControl.Static className={"form__static-text"}>Not connected</FormControl.Static>
                        </FormGroup>

                        <FormGroup className={"form-group form-group--collapse"}>
                            <ControlLabel className={"form__label"}><FormattedMessageNoTag id={"polatis.ports.controls-container.alarm"}/></ControlLabel>
                            <FormControl.Static className={"form__static-text"}>Armed</FormControl.Static>
                        </FormGroup>

                        <div className={"js-stage-one hide"}>
                            <hr/>

                            <FormGroup className={"form-group form-group--collapse"}>
                                <ControlLabel className={"form__label"}><FormattedMessageNoTag id={"polatis.ports.controls-container.power"}/></ControlLabel>
                                <FormControl.Static className={"form__static-text"}>[x] dBm</FormControl.Static>
                            </FormGroup>

                            <FormGroup className={"form-group form-group--collapse"}>
                                <ControlLabel className={"form__label"}><FormattedMessageNoTag id={"polatis.ports.controls-container.aps-service"}/></ControlLabel>
                                <FormControl.Static className={"form__static-text"}>None</FormControl.Static>
                            </FormGroup>
                        </div>

                        <div className={"js-stage-two hide"}>
                            <hr/>

                            <CollapsiblePanel
                                id={"alarmOptionsId"}
                                title={lib.getFormatMessage("polatis.ports.controls-container.alarm")}>
                                <div>
                                    <FormControlRight id={"alarmControl"} collapse={true} label={lib.getFormatMessage("polatis.ports.controls-container.alarm")}>
                                        <FormControl componentClass="select" placeholder="select" className={"alarm__alarmControl"}>
                                            <option value="0">{lib.getFormatMessage("polatis.ports.controls-container.on")}</option>
                                            <option value="1">{lib.getFormatMessage("polatis.ports.controls-container.off")}</option>
                                        </FormControl>
                                    </FormControlRight>
                                    <MultiInputs id={"thresholdFromToControl"} heading={lib.getFormatMessage("polatis.ports.controls-container.threshold")}>
                                        <NumberInput
                                            id={"lowControl"}
                                            label={lib.getFormatMessage("polatis.ports.controls-container.low")}
                                            defaultValue={"0"}
                                            min={"-75"} max={"30"}
                                            stack={true}
                                            measurement={"dbm"}
                                        />
                                        <NumberInput
                                            id={"degradeControl"}
                                            label={lib.getFormatMessage("polatis.ports.controls-container.degrade")}
                                            defaultValue={"0"}
                                            min={"-75"} max={"30"}
                                            stack={true}
                                            measurement={"dbm"}
                                        />
                                        <NumberInput
                                            id={"highControl"}
                                            label={lib.getFormatMessage("polatis.ports.controls-container.high")}
                                            defaultValue={"0"}
                                            min={"-75"} max={"30"}
                                            stack={true}
                                            measurement={"dbm"}
                                        />
                                    </MultiInputs>

                                    <FormControlRight id={"holdOffTimeControl"}
                                                      label={lib.getFormatMessage("polatis.ports.controls-container.hold-off-time")}
                                                      measurement={"sec"}>
                                        <FormControl type="number" className={"form__control"} defaultValue={100} min={0}/>
                                    </FormControlRight>
                                </div>
                            </CollapsiblePanel>

                            <CollapsiblePanel
                                id={"voaOptionsId"}
                                title={lib.getFormatMessage("polatis.ports.controls-container.voa")}>
                                <div>
                                    <FormControlRight id={"attenuationSelect"} label={lib.getFormatMessage("polatis.ports.controls-container.attenuation")}>
                                        <FormControl componentClass="select" onChange={this.handleChangeAttenuation}
                                                     placeholder={lib.getFormatMessage("polatis.forms.placeholder.select")}
                                                     className={"form__select"}>
                                            <option value="0">{lib.getFormatMessage("polatis.ports.controls-container.none")}</option>
                                            <option value="1">{lib.getFormatMessage("polatis.ports.controls-container.absolute")}</option>
                                            <option value="2">{lib.getFormatMessage("polatis.ports.controls-container.converged-absolute")}</option>
                                            <option value="3">{lib.getFormatMessage("polatis.ports.controls-container.relative")}</option>
                                        </FormControl>
                                    </FormControlRight>

                                    <SingleNumberInput
                                        id={"levelId"}
                                        label={lib.getFormatMessage("polatis.ports.controls-container.level")}
                                        defaultValue={"0"}
                                    />
                                    <FormGroup className={"form-group js-reference-port hide"}>
                                        <ControlLabel className={"form__label"}><FormattedMessageNoTag id={"polatis.ports.controls-container.reference-port"}/></ControlLabel>
                                        <FormControl.Static className={"form__static-text"}>{lib.getFormatMessage("polatis.ports.controls-container.none")}</FormControl.Static>
                                    </FormGroup>
                                </div>
                            </CollapsiblePanel>

                            <CollapsiblePanel
                                id={"powerLevelOptionsId"}
                                title={lib.getFormatMessage("polatis.ports.controls-container.power-level")}>
                                <div>
                                    <SingleNumberInput
                                        id={"powerlevelSensitivityId"}
                                        label={lib.getFormatMessage("polatis.ports.controls-container.sensitivity")}
                                        defaultValue={"0"}
                                    />
                                    <SingleNumberInput
                                        id={"wavelengthId"}
                                        label={lib.getFormatMessage("polatis.ports.controls-container.wavelength")}
                                        defaultValue={"0"}
                                    />
                                    <SingleNumberInput
                                        id={"offsetId"}
                                        label={lib.getFormatMessage("polatis.ports.controls-container.offset")}
                                        defaultValue={"0"}
                                    />
                                    <SingleNumberInput
                                        id={"averagingTimeId"}
                                        label={lib.getFormatMessage("polatis.ports.controls-container.averaging-time")}
                                        defaultValue={"0"}
                                    />
                                </div>
                            </CollapsiblePanel>
                        </div>

                        <div className={"form-controls"}>
                            <Button bsStyle={"primary"} bsSize={uiGeneralConstants.SMALL} className={"pull-left"}>{lib.getFormatMessage("polatis.ports.controls-container.reset-to-defaults")}</Button>
                            <span className={"form-controls__icon-container"}>
                                <span className={"form-controls__prev js-form-controls-prev hide"} onClick={this.handleLessMore_portTwo}></span>
                                <span className={"form-controls__next js-form-controls-next"} onClick={this.handleLessMore_portTwo}></span>
                            </span>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <Info size={uiGeneralConstants.SMALL} message={"No port selected"} />
            );
        }
    }
}



export default injectIntl(PortDetail);