var assert = require('assert'),
	utils = require('../src/utils');


describe('utils', function() {
	describe('#foo()', function() {
		it('bars', function() {
			var result = utils.foo();
			assert.equal(result, 'bar');
		});
	});
});
