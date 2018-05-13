/**
 * @fileoverview product information component showing only the info of the product
 */

import React, { Component } from 'react';

import FormattedMessageNoTag from 'components/controls/formatted-message-notag';

class ProductInfo extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const productInfoError = this.props.error;

        if (productInfoError) {
            return (
                <div />
            )
        } else {

            const productCode = this.props.productInfo.data['manufacturer'];
            const name = this.props.productInfo.data['model-name'];

            return (
                <div className={"header__detail"}>
                    <ul>
                        <li><span className={"detail__product-code"}><FormattedMessageNoTag id="polatis.header.container.name"/>:</span>{productCode}</li>
                        <li><span className={"detail__name"}><FormattedMessageNoTag id="polatis.header.container.productCode"/>:</span>{name}</li>
                    </ul>
                </div>
            )
        }
    }

}

export default ProductInfo;