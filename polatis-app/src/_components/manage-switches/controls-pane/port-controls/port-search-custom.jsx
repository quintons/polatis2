/**
 * @fileoverview left hand pane Search -> Custom
 */

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import { FieldGroup, ScrollableTable } from 'components/controls/form.controls';
import { injectIntl } from 'react-intl';
import { lib } from "utils/lib";
import { uiGeneralConstants } from "constants/ui.constants";


class PortSearchCustom extends Component {

    constructor(props){
        super(props);
        lib.intlContext = this.props.intl;
    }

    render() {
        return (
            <div className={"search-custom search-custom__container"}>
                <FieldGroup
                    id="nameControlText"
                    label={lib.getFormatMessage("polatis.ports.controls-container.search-string")}
                    placeholder={lib.getFormatMessage("polatis.forms.placeholder.enter-search-string")}
                    classnameblock={"classExample"}
                    componentClass={"textarea"}
                    fullWidthLabel={true}
                />

                <FieldGroup
                    id="nameControlText"
                    type="text"
                    label={lib.getFormatMessage("polatis.ports.controls-container.name")}
                    placeholder={lib.getFormatMessage("polatis.forms.placeholder.enter-search-string-name")}
                    classnameblock={"classExample"}
                />

                <Button bsStyle={"primary"} bsSize={uiGeneralConstants.SMALL}>{lib.getFormatMessage("polatis.ports.controls-container.save")}</Button>
                <hr />

                {/*TODO: pass json data from API*/}
                <ScrollableTable
                    id={"predefinedSearchId"}
                    className={""}
                    label={lib.getFormatMessage("polatis.ports.controls-container.predefined-search")}
                    jsonData={{}}
                />
                <Button bsStyle={"primary"} bsSize={uiGeneralConstants.SMALL}>{lib.getFormatMessage("polatis.ports.controls-container.delete")}</Button>
            </div>
        );
    }
}

export default injectIntl(PortSearchCustom);