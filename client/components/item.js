import '../styles/item.scss';

import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Button, ButtonGroup, Glyphicon, OverlayTrigger, Label } from 'react-bootstrap';

import * as Utils from '../utils';


function stopPropagationThen(handler) {
    return function(e) {
        e.stopPropagation();
        handler(e);
    }
}


export default class Item extends Component {
    render() {
        const width = this.props.width,
              height = this.props.height,
              item = this.props.item;

        return (
            <div className={classNames('item', {'selected': this.props.isSelected})}
                 onClick={this.props.onClick}>

                <div style={{position: 'relative'}}>
                    <img src={Utils.getRandomImage(width, height, item.id)}
                         className="item-image"
                         style={{
                            width: width + 'px',
                            height: height + 'px'
                         }}/>
                    {this.props.isHated ? (
                        <img src="http://www.clipartbest.com/cliparts/MTL/LxL/MTLLxLzrc.gif"
                             style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                opacity: 0.7,
                                width: width + 'px',
                                height: height + 'px'
                             }}/>
                    ) : ''}
                </div>

                <div className="item-info">
                    <span className="item-info-id">#{item.id}</span>
                    <span className="item-info-title">{item.title}</span>
                    <div style={{'float': 'right'}}>
                        {this.props.showControls ? (
                            <ButtonGroup>
                                {!(this.props.isLiked || this.props.isHated) ? [
                                    <Button key="like" bsStyle="default" bsSize="xsmall" title="Like it"
                                            onClick={e => stopPropagationThen(this.props.onLiked)(e)}>
                                        <Glyphicon glyph="thumbs-up"/>
                                    </Button>,
                                    <Button key="hate" bsStyle="default" bsSize="xsmall" title="Hate it"
                                            onClick={e => stopPropagationThen(this.props.onHated)(e)}>
                                        <Glyphicon glyph="thumbs-down"/>
                                    </Button>
                                ] : (
                                    <Button bsStyle={this.props.isLiked ? 'success' : 'danger'} bsSize="xsmall" title="Undo rating"
                                            onClick={e => stopPropagationThen(this.props.onClearRating)(e)}>
                                        <Glyphicon glyph="remove"/>
                                        <span style={{marginLeft: '4px'}}>
                                            {this.props.isLiked ? 'Liked' : 'Hated'}
                                        </span>
                                    </Button>
                                )}
                            </ButtonGroup>
                        ) : (
                            (this.props.isLiked || this.props.isHated) ? (
                                this.props.isLiked ? (
                                    <Label bsStyle="success">Liked</Label>
                                ) : (
                                    <Label bsStyle="danger">Hated</Label>
                                )
                            ) : ''
                        )}
                    </div>
                </div>

            </div>
        );
    }
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    showControls: PropTypes.bool,
    isSelected: PropTypes.bool,
    isLiked: PropTypes.bool,
    isHated: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    onLiked: PropTypes.func.isRequired,
    onHated: PropTypes.func.isRequired,
    onClearRating: PropTypes.func.isRequired
};

Item.defaultProps = {
    width: 200,
    height: 200,
    showControls: true,
    isSelected: false,
    isLiked: false,
    isHated: false
};
