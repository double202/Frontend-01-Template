* 写一个正则匹配所有Number字面量

```js
/*
*	十进制 [1-9]|0.|. [0-9] 1^308 9^309
*	二进制 /^(0(b|B))[0-1]{1,69}/
* 	八进制 /^(0(o|O))[0-7]{1,23}/
* 	十六进制 /^(0(x|X))([0-9a-fA-F]){1,17}/
*/

/^(\.\d+|(0|[1-9]\d*)\.?\d*?)([eE][-\+]?\d+)?$|^0[bB][01]+$|^0[oO][0-7]+$|^0[xX][0-9a-fA-F]+$/
```

* 完成 UTF8__Encoding 的函数

```js
function stringToUint(string) {
    var string = btoa(unescape(encodeURIComponent(string))),
        charList = string.split(''),
        uintArray = [];
    for (var i = 0; i < charList.length; i++) {
        uintArray.push(charList[i].charCodeAt(0));
    }
    return new Uint8Array(uintArray);
}
```

* 写一个正则表达式来匹配字符串字面量（单双引号）

```js
"(?:[^"\n\\\r\u2028\u2029]|\\(?:['"\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux]"'\\bfnrtv\n\\\r\u2028\u2029])*"


'(?:[^'\n\\\r\u2028\u2029]|\\(?:["'\\bfnrtv\n\r\u2028\u2029]|\r\n)|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}|\\[^0-9ux]'"\\bfnrtv\n\\\r\u2028\u2029])*'
```

