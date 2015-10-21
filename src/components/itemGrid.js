import React, { Component } from 'react';

import Item from './item';


export default class ItemGrid extends Component {
    defaultProps: {
        title: 'Lorem Ipsum',
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
                                     title={item.title}
                                     width={200}
                                     height={200}/>;
                    })}
                </div>
            </div>
        );
    }
}
