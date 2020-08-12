# 每周总结可以写在这里

## Dev tools

* Server
  * build：webpack babel vue jsx postcss
  * watch：fsevents
  * mock：
  * http：ws
* Client
  * debugger：vscode devtool
  * source map

```
.nycrc

{
  "all": true,
  "include": [
    "src/*.js"
  ],
  "extends": "@istanbuljs/nyc-config-babel"
}
```

```
.babelrc

{
    "presets": ["@babel/preset-env"],
    "plugins": ["babel-plugin-istanbul"]
}
```

