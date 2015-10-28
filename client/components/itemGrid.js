import '../styles/itemGrid.scss';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map, List, Set } from 'immutable';
import { Panel, Badge, ProgressBar } from 'react-bootstrap';
import _ from 'lodash';

import Item from './item';


export default class ItemGrid extends Component {
    static mixins = [
        PureRenderMixin
    ]

    static propTypes = {
        title: PropTypes.string,
        items: ImmutablePropTypes.list,
        emptyMessage: PropTypes.string,
        selectedItemId: PropTypes.string,
        showControls: PropTypes.bool,
        isRefreshing: PropTypes.bool,
        likedItemIds: ImmutablePropTypes.set,
        hatedItemIds: ImmutablePropTypes.set,
        onItemSelected: PropTypes.func.isRequired,
        onItemLiked: PropTypes.func.isRequired,
        onItemHated: PropTypes.func.isRequired,
        onClearRating: PropTypes.func.isRequired
    }

    static defaultProps = {
        title: null,
        items: [],
        emptyMessage: 'Nothing here.',
        selectedItemId: null,
        showControls: true,
        isRefreshing: false,
        likedItemIds: List([]),
        hatedItemIds: List([])
    }

    render() {
        const itemGrid = this;
        console.log('items: %o', 
                    itemGrid.props.items.map(item => item.id + ':' + itemGrid.props.likedItemIds.has(item.id)).toJS());
        return (
            <Panel className="item-grid" 
                   onClick={e => itemGrid.props.onItemSelected(null)}
                   header={this.getTitle()}>

                {this.props.isRefreshing ? (
                    <ProgressBar bsStyle="info" now={100} active striped/>
                ) : (
                    this.props.items.count() > 0 ? (
                        this.props.items.map(function(item) {
                            return <Item key={item.id}
                                         item={item}
                                         showControls={itemGrid.props.showControls}
                                         isLiked={itemGrid.props.likedItemIds.has(item.id)}
                                         isHated={itemGrid.props.hatedItemIds.has(item.id)}
                                         isSelected={itemGrid.props.selectedItemId == item.id}
                                         onClick={e => itemGrid.handleSelection(e, item.id)}
                                         onLiked={e => itemGrid.props.onItemLiked(item.id)}
                                         onHated={e => itemGrid.props.onItemHated(item.id)}
                                         onClearRating={e => itemGrid.props.onClearRating(item.id)}/>;
                        })
                    ) : (
                        <span className="item-grid-empty">{this.props.emptyMessage}</span>
                    )
                )}

            </Panel>
        );
    }

    handleSelection(e, itemId) {
        e.stopPropagation();
        this.props.onItemSelected(itemId);
    }

    getTitle() {
        var title = [];

        if (this.props.title) {
            title.push(<span>{this.props.title}</span>);
            if (this.props.items.count() > 0) {
                title.push(<Badge style={{marginLeft: '5px'}}>{this.props.items.count()}</Badge>);
            }
        }

        if (title.length > 0)
            return <div>{title}</div>;
        else
            return '';
    }
}
