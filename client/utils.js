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
