import React, { Component, PropTypes } from 'react';
import { Button, Modal, Input } from 'react-bootstrap';


export default class SettingsDialog extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
            <Modal.Dialog onHide={() => this.handleCancelClick()}>

                <Modal.Header>Settings</Modal.Header>

                <Modal.Body>
                    <form className="form-horizontal">
                    	<Input ref="firstName" type="text" label="First Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
                    	<Input ref="lastName" type="text" label="Last Name" labelClassName="col-xs-2" wrapperClassName="col-xs-10"/>
                    	<Input ref="spamMe" type="checkbox" label="Subscribe to spam" wrapperClassName="col-xs-offset-2 col-xs-10"
                    		   help="Do you want to receive spam in your inbox?"/>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle="primary"
                            onClick={e => this.handleSaveClick()}>Save</Button>
                    <Button onClick={e => this.handleCancelClick()}>Cancel</Button>
                </Modal.Footer>

            </Modal.Dialog>
        );
	}

	handleSaveClick(e) {
		this.props.onSave(this.state);
	}

	handleCancelClick(e) {
		this.props.onCancel();
	}
}


SettingsDialog.propTypes = {
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired
}
