import _ from 'lodash';

import { ActionTypes } from '../actions';


var initialState;

// Attempt to restore state from storage
if (Storage !== undefined) {
    initialState = sessionStorage.uiState;
    if (initialState !== undefined)
        initialState = JSON.parse(initialState);
}

// Default UI state
if (initialState === undefined) {
    initialState = {
        items: [],
        refreshingItems: false,

        selectedItemId: null,

        likedItemIds: [],
        hatedItemIds: [],

        editingSettings: false,
        settings: {
            firstName: 'Chris',
            lastName: 'Lyon',
            spamMe: false
        },

        showLikedItemsDialog: false
    };
}


export function reducer(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.START_REFRESHING_ITEMS:
            return Object.assign({}, state, {
                refreshingItems: true
            });

        case ActionTypes.ITEMS_REFRESHED:
            // Append new items
            return Object.assign({}, state, {
                refreshingItems: false,
                items: state.items.concat(action.items.filter(item => state.items.find(x => x.id === item.id) === undefined))
            });

        case ActionTypes.SELECT_ITEM:
            return Object.assign({}, state, {
                selectedItemId: action.itemId
            });

        case ActionTypes.LIKE_ITEM:
            return Object.assign({}, state, {
                likedItemIds: state.likedItemIds.concat(action.itemId)
            });

        case ActionTypes.HATE_ITEM:
            return Object.assign({}, state, {
                hatedItemIds: state.hatedItemIds.concat(action.itemId)
            });

        case ActionTypes.CLEAR_RATING:
            return Object.assign({}, state, {
                likedItemIds: state.likedItemIds.filter(id => id !== action.itemId),
                hatedItemIds: state.hatedItemIds.filter(id => id !== action.itemId)
            });

        case ActionTypes.EDIT_SETTINGS:
            return Object.assign({}, state, {
                editingSettings: true
            });

        case ActionTypes.SAVE_SETTINGS:
            return Object.assign({}, state, {
                editingSettings: false,
                settings: action.settings
            }, {deep: true});

        case ActionTypes.CANCEL_SETTINGS:
            return Object.assign({}, state, {
                editingSettings: false
            });

        case ActionTypes.SHOW_LIKES_DIALOG:
            return Object.assign({}, state, {
                showLikesDialog: true
            });

        case ActionTypes.CLOSE_LIKES_DIALOG:
            return Object.assign({}, state, {
                showLikesDialog: false
            });

        default:
            return state;
    }
}
