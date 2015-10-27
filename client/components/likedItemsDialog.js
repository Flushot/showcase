import React, { Component, PropTypes } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Set } from 'immutable';

import ItemGrid from './itemGrid';


export default class LikedItemsDialog extends Component {
    render() {
        return (
            <Modal.Dialog onHide={() => this.handleCloseClick()}>

                <Modal.Header>My Liked Items</Modal.Header>

                <Modal.Body>
                    <ItemGrid items={this.props.items}
                              showControls={true}
                              emptyMessage="It seems you don't like anything."
                              likedItemIds={this.props.likedItemIds}
                              hatedItemIds={Set()}
                              onItemSelected={() => false}
                              onItemLiked={this.props.onItemLiked}
                              onItemHated={this.props.onItemHated}
                              onClearRating={this.props.onClearRating}/>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={e => this.handleCloseClick()}>Close</Button>
                </Modal.Footer>

            </Modal.Dialog>
        );
    }

    handleCloseClick(e) {
        this.props.onClose();
    }
}


LikedItemsDialog.propTypes = {
    onItemLiked: PropTypes.func.isRequired,
    onItemHated: PropTypes.func.isRequired,
    onClearRating: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
}
