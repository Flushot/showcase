import { combineReducers } from 'redux';
import { falcorReducer } from 'redux-falcor';
import _ from 'lodash';
import { Map, List, Set } from 'immutable';

import * as Actions from '../actions';


const initialState = Map({
    selectedItemId: null,

    likedItemIds: Set(),
    hatedItemIds: Set(),

    editingSettings: false,
    settings: Map()
});


export function reducer(state = initialState, action) {
    switch (action.type) {
        case Actions.SELECT_ITEM:
            return state.merge({
                selectedItemId: action.itemId
            });

        case Actions.LIKE_ITEM:
            return state.merge({
                likedItemIds: state.get('likedItemIds').add(action.itemId)
            });

        case Actions.HATE_ITEM:
            return state.merge({
                hatedItemIds: state.get('hatedItemIds').add(action.itemId)
            });

        case Actions.CLEAR_RATING:
            return state.merge({
                likedItemIds: state.get('likedItemIds').remove(action.itemId),
                hatedItemIds: state.get('hatedItemIds').remove(action.itemId)
            });

        case Actions.EDIT_SETTINGS:
            return state.merge({
                editingSettings: true
            });

        case Actions.SAVE_SETTINGS:
            return state.merge({
                editingSettings: false,
                settings: Map(action.settings)
            });

        case Actions.CANCEL_SETTINGS:
            return state.merge({
                editingSettings: false
            });

        default:
            return state;
    }
}
