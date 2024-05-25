/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Card } from 'antd';
import React from 'react';

const { Meta } = Card;

export default function Product({title, thumbnail, price}) {
    return (
        <Card
            // loading={true}
            hoverable
            bordered
            style={ {
                width: 240,
                // backgroundColor: 'grey',
            } }
            cover={ <img alt="image?" src={thumbnail} /> }
        >
            <Meta title={title} description={`${price}tk`} />
        </Card>
    );
}
