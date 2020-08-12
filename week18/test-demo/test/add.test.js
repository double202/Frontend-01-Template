// import {add} from '../src/add.js';
// import assert from 'assert';
var mod = require("../src/add");
var assert = require("assert");


describe('add', function() {
  it('add(3, 4) should be 7', function() {
    // assert.equal(mod.add(3, 4), 7);
    assert.equal(mod.add(3, 4), 7);
  });
});


/*
const test = require('ava');
 
test('add', t => {
  if (mod.add(3, 4) === 7)
    t.pass();
});
*/
