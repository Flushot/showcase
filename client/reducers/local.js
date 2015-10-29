import _ from 'lodash';

import * as Actions from '../actions';


// Initial UI state
const initialState = {
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


export function reducer(state = initialState, action) {
    switch (action.type) {
        case Actions.START_REFRESHING_ITEMS:
            return Object.assign({}, state, {
                refreshingItems: true
            });

        case Actions.ITEMS_REFRESHED:
            return Object.assign({}, state, {
                refreshingItems: false,
                items: action.items
            });

        case Actions.SELECT_ITEM:
            return Object.assign({}, state, {
                selectedItemId: action.itemId
            });

        case Actions.LIKE_ITEM:
            return Object.assign({}, state, {
                likedItemIds: state.likedItemIds.concat(action.itemId)
            });

        case Actions.HATE_ITEM:
            return Object.assign({}, state, {
                hatedItemIds: state.hatedItemIds.concat(action.itemId)
            });

        case Actions.CLEAR_RATING:
            return Object.assign({}, state, {
                likedItemIds: state.likedItemIds.filter(id => id !== action.itemId),
                hatedItemIds: state.hatedItemIds.filter(id => id !== action.itemId)
            });

        case Actions.EDIT_SETTINGS:
            return Object.assign({}, state, {
                editingSettings: true
            });

        case Actions.SAVE_SETTINGS:
            return Object.assign({}, state, {
                editingSettings: false,
                settings: Map(action.settings)
            }, {deep: true});

        case Actions.CANCEL_SETTINGS:
            return Object.assign({}, state, {
                editingSettings: false
            });

        case Actions.SHOW_LIKES_DIALOG:
            return Object.assign({}, state, {
                showLikesDialog: true
            });

        case Actions.CLOSE_LIKES_DIALOG:
            return Object.assign({}, state, {
                showLikesDialog: false
            });

        default:
            return state;
    }
}
