function create(Cls, attributes, ...children) {
  // console.log(arguments)
  let o;
  if (typeof Cls === 'string')
    o = new Wrapper(Cls);
  else
    o = new Cls({
      timer: ''
    });
  for (let name in attributes) {
    // o[name] = attributes[name]
    o.setAttribute(name, attributes[name]);
  }

  // console.log(children)
  for (let child of children) {
    if (typeof child === 'string')
      child = new Text(child);
    
    o.appendChild(child); // -_-
    // o.children.push(child); // ①
  }
  return o;
}

class Text {
  constructor(text) {
    this.root = document.createTextNode(text);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class Wrapper {
  constructor(type) {
    this.children = [];
    this.root = document.createElement(type);
  }

  setAttribute(name, value) { // attribute
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    child.mountTo(this.root);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class Parent {
  constructor(config) {
    // console.log('config', config)
    this.children = []; // ①

    this.root = document.createElement('div');
  }
  /*set class(v) { // property
    console.log('Parent::class', v)
  }*/
  setAttribute(name, value) { // attribute
    // console.log('Parent::setAttribute', name, value)
    this.root.setAttribute(name, value);
  }
  /*appendChild(child) { // children
    console.log('Parent::appendChild', child) // -_-
  }*/

  appendChild(child) {
    child.mountTo(this.root);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class Child {
  constructor(config) {
    // console.log('config', config)
    this.children = [];

    this.root = document.createElement('div');
  }

  setAttribute(name, value) { // attribute
    this.root.setAttribute(name, value);
  }

  appendChild(child) {
    child.mountTo(this.root);
  }

  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

/*let component = <div id="a" class="b" style="width: 100px; height: 100px; background: lightgreen;">
  <div></div>
  <p></p>
  <div></div>
  <div></div>
</div>;*/

let component = <div>text</div>;

component.class = 'c'
component.mountTo(document.body);

/*
var component = create(
  Parent,
  {
    id: "a",
    "class": "b"
  },
  create(Child, null),
  create(Child, null),
  create(Child, null)
);
*/

console.log(component);
