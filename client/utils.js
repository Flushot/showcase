export function foo() {
	return 'bar';
}


export function getRandomImage(width, height, index=null) {
	if (index === null)
		index = Math.random() * 100;

    const imageCategory = 'fashion',
          imageIds = [1,3,4,5,6,7,8,9,10],
          imageUrl = 'http://lorempixel.com/' + width + '/' + height + '/' + imageCategory + '/' +
                     imageIds[(index % imageIds.length)] + '/';  //?_r=' + Math.random();

    return imageUrl;
}


export function stopPropagationHandler(handler) {
    return function(e) {
        e.stopPropagation();
        handler(e);
    }
}


export function displayIf(boolExpr, trueDom, falseDom='') {
    return boolExpr ? trueDom : falseDom;
}


export function uniqueId() {
  return Math.floor((1 + Math.random()) * 0x10000);
}


var initialState;

/**
 * Gets the initial UI state from local storage.
 *
 * @return {object} initial UI state or an empty object if none found.
 */
export function getInitialUIState() {
    if (initialState !== undefined) {
        return initialState;
    } else {
        initialState = {};

        if (typeof Storage !== 'undefined') {
            var stateBlob = sessionStorage.uiState;
            if (stateBlob !== undefined) {
                initialState = JSON.parse(stateBlob);
            }
        }

        return initialState;
    }
}
