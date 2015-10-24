export const ADD_ITEMS = 'ADD_ITEMS';
export const REMOVE_ITEMS = 'REMOVE_ITEMS';
export const SELECT_ITEM = 'SELECT_ITEM';


export function addItems(...items) {
    return {
        type: ADD_ITEMS,
        items: items
    };
}

export function removeItems(...items) {
    return {
        type: REMOVE_ITEMS,
        items: items
    };
}

export function selectItem(itemId) {
    return {
        type: SELECT_ITEM,
        itemId: itemId
    };
}
