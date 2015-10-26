// import assert from 'assert';
import { assert, expect } from 'chai';

import * as Utils from '../client/utils';


describe('utils', function() {

    describe('#foo()', function() {
        it('bars', function() {
            const result = Utils.foo();
            assert.equal(result, 'bar');
        });
    });

});
