import React, { Component, PropTypes } from 'react';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import { Button, Modal, Input } from 'react-bootstrap';


const SettingsDialog = React.createClass({
    mixins: [
        LinkedStateMixin
    ],

    propTypes: {
        onSave: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired
    },

    getInitialState: function() {
        return Object.assign({}, this.props.settings);
    },

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         firstName: 'Chris',
    //         lastName: 'Lyon',
    //         spamMe: false
    //     };
    // }

    render: function() {
        return (
            <Modal.Dialog onHide={() => this.handleCloseClick()}>

                <Modal.Header closeButton
                              onHide={() => this.handleCloseClick()}>
                    Settings
                </Modal.Header>

                <Modal.Body>
                    <form className="form-horizontal">

                        <Input ref="firstName" type="text" label="First Name" 
                               valueLink={this.linkState('firstName')}
                               labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>

                        <Input ref="lastName" type="text" label="Last Name"
                               valueLink={this.linkState('lastName')}
                               labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>

                        <Input ref="spamMe" type="checkbox" label="Subscribe to spam"
                               valueLink={this.linkState('spamMe')}
                               wrapperClassName="col-xs-offset-2 col-xs-10"
                               help="Do you want to receive spam in your inbox?"/>

                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle="primary"
                            onClick={e => this.handleSaveClick()}>Save</Button>
                    <Button onClick={e => this.handleCloseClick()}>Cancel</Button>
                </Modal.Footer>

            </Modal.Dialog>
        );
    },

    handleSaveClick: function() {
        this.props.onSave(this.state);
    },

    handleCloseClick: function() {
        this.props.onCancel();
    }
});


export default SettingsDialog;