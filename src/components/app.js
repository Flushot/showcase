import React, { Component } from 'react';
import _ from 'lodash';

import ItemGrid from './itemGrid';
import * as utils from '../utils';


export default class App extends Component {
    // constructor(props) {
    //  super(props)
    // }

    render() {
        const titles = _.words('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer varius posuere enim ac dignissim. Praesent at massa eros. Fusce mauris ex, laoreet at lectus nec, bibendum hendrerit lacus. Mauris elementum lobortis nibh at pellentesque. Maecenas a justo turpis. Morbi mauris metus, sodales in erat eget, sodales tincidunt massa.');

        var itemId = 1;
        const items = titles.map(function(word) {
            return {
                id: itemId++,
                title: word
            };
        });

        return (
            <ItemGrid items={items}/>
        );
    }
}
