/**
 * @fileoverview details the from controls built up with bootstrap 3.7 out of the box components
 */

import React from 'react';
import { FormGroup, FormControl, ControlLabel, Panel } from 'react-bootstrap';

/**
 * TODO: Work in progress, transforms data into objects to draw the row/cols of a scrollable table.
 */
/**
 *
 * @param jsonData
 */
function getArrayOfData (jsonData) {

    let Row = function (options) {
        this.onClick = options.onClick;
        this.className = options.className;
        this.cols = [];
    };

    let Col = function (options) {
        this.title = options.title;
        this.className = options.className;
        this.width = options.width;
    };

    let RowData = function (colData, onClick, className) {
        let rowData = new Row({ onClick: onClick, className: className });

        for (let i = 0; i < colData.length; i++){
            rowData.onClick = onClick;
            rowData.className = className;
            rowData.cols.push(colData[i]);
        }
        return rowData;
    };

    let tableData = function () {
        // transform json data to array of rows/cols
        let data = new function () { this.rows = [] };

        // loop through json data
        // create each row/col of data
        if (jsonData) {
            // TODO: change Dummy data for real data - transformation?
            //let json  = tableDataTransformation(jsonData);
            let json = {"tableData": [
                {
                    "data": [
                        {"title": "col item 1", "className": "colClassName", "width": ""},
                        {"title": "col item 2", "className": "colClassName", "width": ""},
                        {"title": "col item 3", "className": "colClassName", "width": ""},
                        {"title": "col item 4", "className": "colClassName", "width": ""}
                    ],
                    "onClick": function () { return; },
                    "className": "rowClassName1"
                },
                {
                    "data": [
                        {"title": "col item 1", "className": "colClassName", "width": ""},
                        {"title": "col item 2", "className": "colClassName", "width": ""},
                        {"title": "col item 3", "className": "colClassName", "width": ""},
                        {"title": "col item 4", "className": "colClassName", "width": ""}
                    ],
                    "onClick": function () { return; },
                    "className": "rowClassName2"
                },
                {
                    "data": [
                        {"title": "col item 1", "className": "colClassName", "width": ""},
                        {"title": "col item 2", "className": "colClassName", "width": ""},
                        {"title": "col item 3", "className": "colClassName", "width": ""},
                        {"title": "col item 4", "className": "colClassName", "width": ""}
                    ],
                    "onClick": function () {
                        return;
                    },
                    "className": "rowClassName3"
                }
            ]};

            let rowData = [];

            json.map((rowItem, index) => {

                rowItem.data.map((colItem, index) => {
                    rowData.push(new Col({title: colItem.title, className: colItem.className, width: colItem.width}))
                });
                let row = new RowData(rowData, rowItem.onClick, rowItem.className);
                rowData = [];
                data.rows.push(row);
            })
        }
        return data;
    };

    return tableData();
}

/**
 *
 * @param data
 * @returns {*[]|*}
 */
// TODO: transform passed in json data
let tableDataTransformation = function (data) {
    return data.tableData;
};

/**
 *
 * @param id
 * @param className
 * @param label
 * @param jsonData
 * @returns {*}
 * @constructor
 */
export const ScrollableTable = ({id, className, label, jsonData}) => {
    /*
    --note
    TODO: restlib - not present, unable to do 'predefined searches', with Adam
     */
    // TODO: dummy data, transform passed jsonData
    let dummyData = {"tableData": [
            {
                "data": [
                    {"title": "lorem ipsum dollar sit", "className": "colClassName", "width": "70%"},
                    {"title": "lorem ipsum", "className": "colClassName", "width": "30%"},
                ],
                "onClick": function () { return; },
                "className": "rowClassName1"
            },
            {
                "data": [
                    {"title": "lorem ipsum dollar sit", "className": "colClassName", "width": "70%"},
                    {"title": "lorem ipsum", "className": "colClassName", "width": "30%"},
                ],
                "onClick": function () { return; },
                "className": "rowClassName1"
            },
            {
                "data": [
                    {"title": "lorem ipsum dollar sit", "className": "colClassName", "width": "70%"},
                    {"title": "lorem ipsum", "className": "colClassName", "width": "30%"},
                ],
                "onClick": function () { return; },
                "className": "rowClassName1"
            },
            {
                "data": [
                    {"title": "lorem ipsum dollar sit", "className": "colClassName", "width": "70%"},
                    {"title": "lorem ipsum", "className": "colClassName", "width": "30%"},
                ],
                "onClick": function () { return; },
                "className": "rowClassName1"
            },
            {
                "data": [
                    {"title": "lorem ipsum dollar sit", "className": "colClassName", "width": "70%"},
                    {"title": "lorem ipsum", "className": "colClassName", "width": "30%"},
                ],
                "onClick": function () { return; },
                "className": "rowClassName1"
            },
            {
                "data": [
                    {"title": "lorem ipsum dollar sit", "className": "colClassName", "width": "70%"},
                    {"title": "lorem ipsum", "className": "colClassName", "width": "30%"},
                ],
                "onClick": function () { return; },
                "className": "rowClassName1"
            },
            {
                "data": [
                    {"title": "lorem ipsum dollar sit", "className": "colClassName", "width": "70%"},
                    {"title": "lorem ipsum", "className": "colClassName", "width": "30%"},
                ],
                "onClick": function () { return; },
                "className": "rowClassName1"
            },
            {
                "data": [
                    {"title": "lorem ipsum dollar sit", "className": "colClassName", "width": "70%"},
                    {"title": "lorem ipsum", "className": "colClassName", "width": "30%"},
                ],
                "onClick": function () { return; },
                "className": "rowClassName1"
            }
        ]
    };

    let dataTransformed =  tableDataTransformation(dummyData);

    return (
        <table id={id} className={"scrollable-table table table-striped table-bordered table-condensed table-hover" + className}>
            <caption className={"scrollable-table__caption"}>{label}</caption>
            <tbody className={"scrollable-table__body scrollable-table__body--predefined-search"}>
            {dataTransformed.map((row, index) => {
                let rowItem = row.data;
                let rowClasses = row.className + " scrollable-table__row";
                return <tr key={index} onClick={() => {row.onClick();}} className={rowClasses}>
                    {rowItem.map((col, index) => {
                        return <td key={index} className={col.className} width={col.width}>{col.title}</td>
                    })}
                </tr>
            })}
            </tbody>
        </table>
    );
};

/**
 * used to apply a label and a formcontrol of type that is passed through props
 * example:
        <FieldGroup
            id="idOfController"
            label="labelName"
            placeholder="placeholder text"
            classnameblock={"classNameContainer"}
            componentClass={"classNameOfComponent"}
            fullWidthLabel={true/false}
        />
 * @param id
 * @param label
 * @param classContainer
 * @param fullWidthLabel
 * @param props
 * @returns {*}
 * @constructor
 */
export const FieldGroup  = ({ id, label, classContainer, fullWidthLabel, ...props }) => {
    let fullWidthLabelState = fullWidthLabel || false;
    let classContainerClasses = "form-group " + (classContainer ? classContainer : "");
    let labelClasses = "form__label" + (fullWidthLabelState === true ? " form__label--full-width" : "");
    return (
        <FormGroup controlId={id} className={classContainerClasses}>
            <ControlLabel className={labelClasses}>{label}</ControlLabel>
            <FormControl className={"form__control"} {...props} />
        </FormGroup>
    );
};

/**
 * collapsible panel to contain any kind or amount of child controls.
                <CollapsiblePanel
                     id={"idOfControl"}
                     title="titleOfControl">
                     <div>
                         <Checkbox>1+1</Checkbox>
                         <Checkbox>1:1</Checkbox>
                         <Checkbox>1:n</Checkbox>
                         <Checkbox>p:n</Checkbox>
                     </div>
                </CollapsiblePanel>
 * @param id
 * @param title
 * @param props
 * @returns {*}
 * @constructor
 */
export const CollapsiblePanel = ({id, title, ...props}) => {
    return (
        <Panel id={id}>
            <Panel.Heading className={"panel__heading"}>
                <Panel.Toggle componentClass="span" className={"panel__arrow"}></Panel.Toggle>
                <Panel.Title className={"panel__title"}>{title}</Panel.Title>
            </Panel.Heading>
            <Panel.Collapse>
                <Panel.Body className={"panel__body"}>
                    {props.children}
                </Panel.Body>
            </Panel.Collapse>
        </Panel>
    );
};

/**
 * specifically for showing a single checkbox to the rightr, will require relevant SASS file code
        <CheckBoxRight
            id="idOfControl"
            label="labelOfControl"
            classContainer="classNameContainer"
            fieldName="inputFieldName"
            fieldValue={true/false} <- defaultChecked attribute
        />
 * @param id
 * @param label
 * @param props
 * @returns {*}
 * @constructor
 */
export const CheckBoxRight = ({ id, label, ...props }) => {

    const { classContainer = '', fieldName = '', fieldValue = false } = props;

    return (
        <div id={id} className={"form__input form__input--collapse"}>
            <label htmlFor={fieldName} className={"form__input__label"}>
                {label}
            </label>
            <span className={"form__input-container"}>
                <input type={"checkbox"} id={fieldName} name={fieldName} defaultChecked={fieldValue} />
            </span>
        </div>
    );
};

/**
 * specifically for showing a single radio button to the right, will require relevant SASS file code.
        <RadioRight
            id="idOfControl"
            label="inputLabelName"
            classContainer="classContainer"
            fieldName="inputFieldName"
            fieldValue={true/false} <- defaultChecked attribute
        />
 * @param id
 * @param label
 * @param props
 * @returns {*}
 * @constructor
 */
export const RadioRight = ({ id, label, ...props }) => {

    const { classContainer = '', fieldName = '', fieldValue = false } = props;

    return (
        <div id={id} className={"form__input form__input--collapse"}>
            <label htmlFor={fieldName} className={"form__input__label"}>
                {label}
            </label>
            <span className={"form__input-container"}>
                <input type={"radio"} id={fieldName} name={fieldName} defaultChecked={fieldValue} />
            </span>
        </div>
    );
};

/**
 * as by default controls are set to the left, this control will force the control element to the right.
 * will require relevant SASS file code.
        <FormControlRight
            id="idOfControl"
            label="labelOfControl"
            measurement="measurement text">
            ...child control here
        </FormControlRight>
 * @param id
 * @param label
 * @param props
 * @returns {*}
 * @constructor
 */
export const FormControlRight = ({ id, label, ...props }) => {

    const { collapse = false, fieldName = '', fieldValue = false, measurement } = props;
    let containerClasses = "form__input " + ((collapse === true) ? " form_input--collapse" : "");
    return (
        <div id={id} className={containerClasses}>
            <label htmlFor={fieldName} className={"form__input__label"}>
                {label}
            </label>
            <span className={"form__input-container"}>
                {props.children}
                {measurement && <span className={"form__input__measurement"}>{measurement}</span>}
            </span>
        </div>
    );
};

/**
 * inputs to show From/To values, capable to have default values, and min/max values shown
        <FromToNumberInputs
            id="idOfControl"
            min="0"
            fromLabel="fromLabelName"
            toLabel="toLabelName"
            heading="heading text"
            fromDefaultValue={"200"}
            toDefaultValue={"100"}
        />
 * @param id
 * @param props
 * @returns {*}
 * @constructor
 */
export const FromToNumberInputs = ({id, ...props}) => {

    const { fromLabel, toLabel, fromDefaultValue, toDefaultValue, heading } = { ...props };

    return (
        <FormGroup controlId={id} className={"form-group"}>
            {heading && <label className={"form__label form__label--heading"}>{heading}</label>}
            <div className={"form__numbers-container"}>
                {fromLabel &&
                <div className={"form__number-container"}>
                    <ControlLabel className={"form__label"}>{fromLabel}</ControlLabel>
                    <FormControl type="number" className={"form__control"} defaultValue={fromDefaultValue ? fromDefaultValue : ''} />
                </div>
                }
                {toLabel &&
                <div className={"form__number-container"}>
                    <ControlLabel className={"form__label"}>{toLabel}</ControlLabel>
                    <FormControl type="number" className={"form__control"} defaultValue={toDefaultValue ? toDefaultValue : ''} />
                </div>
                }
            </div>
        </FormGroup>
    );
};

/**
 * wrapper control to contain different types of multiple input children components. example 'NumberInput'
        <MultiInputs id="idOfControl" heading="heading text">
            ...child components of same type
        </MultiInputs>
 * @param id
 * @param heading
 * @param props
 * @returns {*}
 * @constructor
 */
export const MultiInputs = ({id, heading, ...props}) => {
    return (
       <FormGroup controlId={id} className={"form-group"}>
           <label className={"form__label form__label--heading"}>{heading}</label>
           {props.children}
       </FormGroup>
   );
};

/**
 * must be wrapped in a FormGroup or a MultiInputs component
        <NumberInput
            id="idOfControl"
            label="labelName"
            defaultValue={"0"}
            min={"-75"} max={"30"}
            stack={true} <- stack on top of each other or side by side
            measurement={"dbm"}
        />
 * @param label
 * @param defaultValue
 * @param props
 * @param stack
 * @returns {*}
 * @constructor
 */
export const NumberInput = ({label, defaultValue, ...props}) => {
    const { min, max, stack = false, measurement } = {...props};
    let containerClasses = "form__number-container" + ((stack === true) ? " stack" : "");
    return (
        <div className={containerClasses}>
            <ControlLabel className={"form__label"}>{label}</ControlLabel>
            <FormControl type="number" min={min ? min : ''} max={max ? max : ''} className={"form__control"} defaultValue={defaultValue ? defaultValue : ''} />
            {measurement && <span className={"form__input__measurement"}>{measurement}</span>}
        </div>
    );
};

/**
 * form group only containing a single number input wrapped by form group
        <SingleNumberInput
            id="idOfControl"
            label="labelName"
            defaultValue={"0"}
        />
 * @param id
 * @param label
 * @param props
 * @returns {*}
 * @constructor
 */
export const SingleNumberInput = ({id, label, ...props}) => {

    const { defaultValue, heading } = {...props};

    const { collapse = false, fieldName = '', fieldValue = false, measurement } = props;
    let containerClasses = "form__input " + ((collapse === true) ? " form_input--collapse" : "");
    return (
        <div id={id} className={containerClasses}>
            <label htmlFor={fieldName} className={"form__input__label"}>
                {label}
            </label>
            <span className={"form__input-container"}>
                <FormControl type="number" className={"form__control"} defaultValue={defaultValue ? defaultValue : ''} />
                {measurement && <span className={"form__input__measurement"}>{measurement}</span>}
            </span>
        </div>
    );
};