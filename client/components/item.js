import '../styles/item.scss';

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classNames from 'classnames';
import { Button, ButtonGroup, Glyphicon, OverlayTrigger, Popover, Label } from 'react-bootstrap';

import * as Utils from '../utils';
const { displayIf } = Utils;


export default class Item extends Component {
    static mixins = [
        PureRenderMixin
    ]

    static propTypes = {
        item: PropTypes.object.isRequired,
        showControls: PropTypes.bool,
        isSelected: PropTypes.bool,
        isLiked: PropTypes.bool,
        isHated: PropTypes.bool,
        onClick: PropTypes.func.isRequired,
        onLiked: PropTypes.func.isRequired,
        onHated: PropTypes.func.isRequired,
        onClearRating: PropTypes.func.isRequired
    }

    static defaultProps = {
        width: 200,
        height: 200,
        showControls: true,
        isSelected: false,
        isLiked: false,
        isHated: false
    }

    render() {
        const width = this.props.width,
              height = this.props.height,
              item = this.props.item;

        return (
            <OverlayTrigger placement="right" 
                            trigger={['hover', 'focus']}
                            delayShow={500}
                            rootClose={true}
                            overlay={
                                <Popover id={'item-' + item.id + '-' + Utils.uniqueId()}>
                                    <h4>{item.title}</h4>
                                    {displayIf(item.description, (
                                        <div>
                                            <hr/>
                                            <p>{item.description}</p>
                                        </div>
                                    ))}
                                </Popover>
                            }>

                <div className={classNames('item', {'selected': this.props.isSelected})}
                     onClick={this.props.onClick}>

                    <div className="item-top" style={{position: 'relative'}}>

                        {/* Item image */}
                        <img src={item.url}
                             className="item-image"
                             style={{
                                width: width + 'px'
                                //height: height + 'px'
                             }}/>

                        {/*  Hated overlay */}
                        {displayIf(this.props.isHated, (
                            <img className="item-splat-overlay"
                                 src="http://www.theeastside.org/assets/gui/tomato/es_tomato-splat-4.png"
                                 style={{
                                    width: width + 'px'
                                    //height: height + 'px'
                                 }}/>
                        ))}

                    </div>

                    <div className="item-info">

                        {/* Title */}
                        <div className="item-info-title">{item.title}</div>

                        {/* Controls */}
                        <div className="item-info-actions">
                            {this.props.showControls ? (
                                <ButtonGroup>
                                    {!(this.props.isLiked || this.props.isHated) ? [

                                        /* Like */
                                        <Button key="like" bsStyle="default" bsSize="xsmall" title="Like it"
                                                onClick={e => Utils.stopPropagationHandler(this.props.onLiked)(e)}>
                                            <Glyphicon glyph="thumbs-up"/>
                                        </Button>,

                                        /* Hate */
                                        <Button key="hate" bsStyle="default" bsSize="xsmall" title="Hate it"
                                                onClick={e => Utils.stopPropagationHandler(this.props.onHated)(e)}>
                                            <Glyphicon glyph="thumbs-down"/>
                                        </Button>

                                    ] : (

                                        /* Undo Rating */
                                        <Button bsStyle={this.props.isLiked ? 'success' : 'danger'} bsSize="xsmall" 
                                                onClick={e => Utils.stopPropagationHandler(this.props.onClearRating)(e)}
                                                title="Undo rating">
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

                                        /* Liked */
                                        <Label bsStyle="success">Liked</Label>

                                    ) : (

                                        /* Hated */
                                        <Label bsStyle="danger">Hated</Label>

                                    )
                                ) : ''
                            )}
                        </div>
                    </div>

                </div>
            </OverlayTrigger>
        );
    }
}
