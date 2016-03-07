import _ from 'lodash';

import { ActionTypes } from '../actions';
import * as Utils from '../utils';


var initialState = Utils.getInitialUIState().settings;
if (!initialState) {
    initialState = {
        data: {
            firstName: 'Chris',
            lastName: 'Lyon',
            spamMe: false
        },
        editingSettings: false
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.EDIT_SETTINGS:
            return Object.assign({}, state, {
                editingSettings: true
            });

        case ActionTypes.SAVE_SETTINGS:
            return Object.assign({}, state, {
                editingSettings: false,
                data: action.settings
            }, {deep: true});

        case ActionTypes.CANCEL_SETTINGS:
            return Object.assign({}, state, {
                editingSettings: false
            });

        default:
            return state;
    }
}
