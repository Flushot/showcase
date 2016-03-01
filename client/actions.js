import 'isomorphic-fetch'; // adds 'fetch()' global
import { Enum } from 'enumify';

export class ActionTypes extends Enum {};
ActionTypes.initEnum([
    'START_REFRESHING_ITEMS',
    'ITEMS_REFRESHED',

    'SELECT_ITEM',

    'LIKE_ITEM',
    'HATE_ITEM',
    'CLEAR_RATING',

    'EDIT_SETTINGS',
    'SAVE_SETTINGS',
    'CANCEL_SETTINGS',

    'SHOW_LIKES_DIALOG',
    'CLOSE_LIKES_DIALOG'
]);


export function startRefreshingItems() {
    return function(dispatch) {
        dispatch({
            type: ActionTypes.START_REFRESHING_ITEMS
        });
        fetch('/items/')
            .then(function(response) {
                if (response.status < 200 || response.status > 299) {
                    response.json()
                        .then(function(response) {
                            if (response.data.error)
                                alert(response.data.error);
                            else
                                alert('Error ' + response.status);
                        })
                }
                else {
                    response.json()
                        .then(function(response) {
                            dispatch(itemsRefreshed(response));
                        });
                }
            });
    }
}

export function itemsRefreshed(items) {
    return {
        type: ActionTypes.ITEMS_REFRESHED,
        items: items
    }
}

export function selectItem(itemId) {
    return {
        type: ActionTypes.SELECT_ITEM,
        itemId: itemId
    };
}

export function likeItem(itemId) {
    return {
        type: ActionTypes.LIKE_ITEM,
        itemId: itemId
    };
}

export function hateItem(itemId) {
    return {
        type: ActionTypes.HATE_ITEM,
        itemId: itemId
    };
}

export function clearRating(itemId) {
    return {
        type: ActionTypes.CLEAR_RATING,
        itemId: itemId
    };
}

export function editSettings() {
    return { type: ActionTypes.EDIT_SETTINGS };
}

export function saveSettings(settings) {
    return {
        type: ActionTypes.SAVE_SETTINGS,
        settings: settings
    };
}

export function cancelSettings() {
    return { type: ActionTypes.CANCEL_SETTINGS };
}

export function showLikesDialog() {
    return { type: ActionTypes.SHOW_LIKES_DIALOG };
}

export function closeLikesDialog() {
    return { type: ActionTypes.CLOSE_LIKES_DIALOG };
}
