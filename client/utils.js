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
