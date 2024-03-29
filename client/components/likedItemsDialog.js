import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Button, Modal } from 'react-bootstrap';

import ItemGrid from './itemGrid';


export default class LikedItemsDialog extends Component {
    static propTypes = {
        onItemLiked: PropTypes.func.isRequired,
        onItemHated: PropTypes.func.isRequired,
        onClearRating: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired
    }

    render() {
        return (
            <Modal.Dialog onHide={() => this.handleCloseClick()}>

                <Modal.Header closeButton
                              onHide={() => this.handleCloseClick()}>
                    My Liked Items
                </Modal.Header>

                <Modal.Body>
                    <div style={{maxHeight: '400px', overflow: 'auto'}}>
                        <ItemGrid items={this.props.items}
                                  showControls={true}
                                  emptyMessage="It seems you don't like anything."
                                  likedItemIds={this.props.items.map(item => item.id)}
                                  hatedItemIds={[]}
                                  onItemSelected={() => false}
                                  onItemLiked={this.props.onItemLiked}
                                  onItemHated={this.props.onItemHated}
                                  onClearRating={this.props.onClearRating}/>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={e => this.handleCloseClick()}>Close</Button>
                </Modal.Footer>

            </Modal.Dialog>
        );
    }

    handleCloseClick() {
        this.props.onClose();
    }
}
