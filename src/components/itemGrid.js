import React, { Component } from 'react';

import Item from './item';


export default class ItemGrid extends Component {
    defaultProps: {
        title: 'Lorem Ipsums',
        items: []
    }

    render() {
        return (
            <div className="item-grid">
                <div className="item-grid-title">
                    {this.props.title}
                </div>
                <div className="item-grid-items">
                    {this.props.items.map(function(item) {
                        return <Item key={item.id}
                                     item={item}/>;
                    })}
                </div>
            </div>
        );
    }
}
