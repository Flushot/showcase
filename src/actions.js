export const ADD_ITEMS = 'ADD_ITEMS';
export const REMOVE_ITEMS = 'REMOVE_ITEMS';


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
