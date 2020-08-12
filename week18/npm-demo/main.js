const npm = require('npm');

// npm.install('webpack', err => console.log('err', err));

let config = {
  "name": "npm-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
  }
};

npm.load(config, () => {
  npm.install('webpack', err => {
    console.log('err///\r\n', err)
  });
})