export const SELECT_ITEM = 'SELECT_ITEM';
export const LIKE_ITEM = 'LIKE_ITEM';
export const HATE_ITEM = 'HATE_ITEM';
export const CLEAR_RATING = 'CLEAR_RATING';
export const EDIT_SETTINGS = 'EDIT_SETTINGS';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';
export const CANCEL_SETTINGS = 'CANCEL_SETTINGS';


export function selectItem(itemId) {
    return {
        type: SELECT_ITEM,
        itemId: itemId
    };
}

export function likeItem(itemId) {
    return {
        type: LIKE_ITEM,
        itemId: itemId
    };
}

export function hateItem(itemId) {
    return {
        type: HATE_ITEM,
        itemId: itemId
    };
}

export function clearRating(itemId) {
    return {
        type: CLEAR_RATING,
        itemId: itemId
    };
}

export function editSettings() {
    return {
        type: EDIT_SETTINGS
    };
}

export function saveSettings(settings) {
    return {
        type: SAVE_SETTINGS,
        settings: settings
    };
}

export function cancelSettings() {
    return {
        type: CANCEL_SETTINGS
    };
}
