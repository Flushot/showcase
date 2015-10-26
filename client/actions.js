export const SELECT_ITEM = 'SELECT_ITEM';
export const LIKE_ITEM = 'LIKE_ITEM';
export const HATE_ITEM = 'HATE_ITEM';
export const CLEAR_RATING = 'CLEAR_RATING';


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
