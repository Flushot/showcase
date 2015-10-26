export const SELECT_ITEM = 'SELECT_ITEM';


export function selectItem(itemId) {
    return {
        type: SELECT_ITEM,
        itemId: itemId
    };
}
