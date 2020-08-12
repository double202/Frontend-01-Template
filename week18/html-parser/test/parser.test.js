import { parseHTML } from '../src/parser.js';
const assert = require('assert');

it('parse a single element' ,() => {
  let doc = parseHTML('<div></div>');
  let div = doc.children[0];
  assert.equal(div.type, 'element');
  assert.equal(div.children.length, 0);
  assert.equal(div.attributes.length, 2);
  assert.equal(div.tagName, 'div');
});

it('parse a single element with text content' ,() => {
  let doc = parseHTML('<div>hello</div>');
  let text = doc.children[0].children[0];
  assert.equal(text.content, "hello");
  assert.equal(text.type, 'text');
});

it('tag mismatch' ,() => {
  try {
    let doc = parseHTML('<div></vid>');
  } catch(e) {
    assert.equal(e.message, 'Tag start end doesn\'t match!');
  }
});


it('text content with <' ,() => {
  let doc = parseHTML('<div>a < b</div>');
  let text = doc.children[0].children[0];
  assert.equal(text.content, "a < b");
  assert.equal(text.type, 'text');
});

it('with property' ,() => {
  let doc = parseHTML('<div id=a class=\'cls\' data="abc" ></div>');
  let div = doc.children[0];
  let count = 0;
  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count ++;
      assert.equal(attr.value, 'a');
    }
    if (attr.name === 'class') {
      count ++;
      assert.equal(attr.value, 'cls');
    }
    if (attr.name === 'data') {
      count ++;
      assert.equal(attr.value, 'abc');
    }
  }
  assert.ok(count === 3);
});

it('with property 2' ,() => {
  let doc = parseHTML('<div id=a class=\'cls\' data="abc"></div>');
  let div = doc.children[0];
  let count = 0;
  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count ++;
      assert.equal(attr.value, 'a');
    }
    if (attr.name === 'class') {
      count ++;
      assert.equal(attr.value, 'cls');
    }
    if (attr.name === 'data') {
      count ++;
      assert.equal(attr.value, 'abc');
    }
  }
  assert.ok(count === 3);
});

it('with property 3' ,() => {
  let doc = parseHTML('<div id=a class= \'cls\' data="abc"/>');
  let div = doc.children[0];
  let count = 0;
  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count ++;
      assert.equal(attr.value, 'a');
    }
    if (attr.name === 'class') {
      count ++;
      assert.equal(attr.value, 'cls');
    }
    if (attr.name === 'data') {
      count ++;
      assert.equal(attr.value, 'abc');
    }
  }
  assert.ok(count === 3);
});

it('with property 4' ,() => {
  let doc = parseHTML('<div id=a/>');
  let div = doc.children[0];
  let count = 0;
  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count ++;
      assert.equal(attr.value, 'a');
    }
  }
});

it('with property 4' ,() => {
  let doc = parseHTML('<div id= a/>');
  let div = doc.children[0];
  let count = 0;
  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count ++;
      assert.equal(attr.value, 'a');
    }
  }
  assert.ok(count === 1);
});

it('script' ,() => {
  let content = `<div>abcd</div>
    <span>x</span>
    /script>
    <script
    <
    </
    </s
    </sc
    </scr
    </scri
    </scrip
    </script
  `;
  let doc = parseHTML(`<script>${content}</script>`);
  let text = doc.children[0].children[0];
  assert.equal(text.content, content);
  assert.equal(text.type, "text");
});
it('script with spaces' ,() => {
  let content = `<div>abcd</div>
    <span>x</span>
    /script>
    <script
    <
    </
    </s
    </sc
    </scr
    </scri
    </scrip
    </script `;
  let doc = parseHTML(`<script>${content}</script>`);
  let text = doc.children[0].children[0];
  assert.equal(text.content, content);
  assert.equal(text.type, "text");
});

it('attribute with no value 1' ,() => {
  let doc = parseHTML('<div id class=a/>');
  let div = doc.children[0];
  assert.equal(div.tagName, 'div');
  let count = 0;
  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      count ++;
      assert.equal(attr.value, '');
    }
    if (attr.name === 'class') {
      count ++;
      assert.equal(attr.value, 'a');
    }
  }
  assert.ok(count === 2);
});

it('attribute with no value 2' ,() => {
  let doc = parseHTML('<div id class />');
});

it('tagName toLower' ,() => {
  let doc = parseHTML('<DIV id class />');
  let div = doc.children[0];
  assert.equal(div.tagName, 'div');
});
