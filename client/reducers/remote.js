import { combineReducers } from 'redux';
import { falcorReducer } from 'redux-falcor';
import falcor from 'falcor';
import HttpDataSource from 'falcor-http-datasource';

import * as Actions from '../actions';


var titles = _.words('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer varius posuere enim ac dignissim. Praesent at massa eros. Fusce mauris ex, laoreet at lectus nec, bibendum hendrerit lacus. Mauris elementum lobortis nibh at pellentesque. Maecenas a justo turpis. Morbi mauris metus, sodales in erat eget, sodales tincidunt massa.'),
    itemId = 1,
    items = titles.map(function(word) {
        return {
            id: itemId++,
            title: word
        };
    });


export const model = new falcor.Model({
    // source: new HttpDataSource('/items/')
    cache: {
        items: items
    }
});

export const reducer = falcorReducer;
