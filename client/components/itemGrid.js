import '../styles/itemGrid.scss';

import React, { Component, PropTypes } from 'react';
import { Panel } from 'react-bootstrap';
import _ from 'lodash';

import Item from './item';


export default class ItemGrid extends Component {
    render() {
        const itemGrid = this;
        return (
            <Panel header={this.getTitle()}>

                {this.props.items.map(function(item) {
                    return <Item key={item.id}
                                 item={item}
                                 showControls={itemGrid.props.showControls}
                                 isLiked={_.contains(itemGrid.props.likedItemIds, item.id)}
                                 isHated={_.contains(itemGrid.props.hatedItemIds, item.id)}
                                 isSelected={itemGrid.props.selectedItemId == item.id}
                                 onClick={e => itemGrid.props.onItemSelected(item.id)}
                                 onLiked={e => itemGrid.props.onItemLiked(item.id)}
                                 onHated={e => itemGrid.props.onItemHated(item.id)}
                                 onClearRating={e => itemGrid.props.onClearRating(item.id)}/>;
                })}

            </Panel>
        );
    }

    getTitle() {
        if (this.props.title)
            return `${this.props.title} (${this.props.items.length})`;
    }
}

ItemGrid.propTypes = {
    title: PropTypes.string,
    items: PropTypes.array,
    selectedItemId: PropTypes.number,
    showControls: PropTypes.bool,
    likedItemIds: PropTypes.array,
    hatedItemIds: PropTypes.array,
    onItemSelected: PropTypes.func.isRequired,
    onItemLiked: PropTypes.func.isRequired,
    onItemHated: PropTypes.func.isRequired,
    onClearRating: PropTypes.func.isRequired
};

ItemGrid.defaultProps = {
    title: null,
    items: [],
    selectedItemId: null,
    showControls: true,
    likedItemIds: [],
    hatedItemIds: []
};
