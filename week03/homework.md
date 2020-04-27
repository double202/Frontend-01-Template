* **StringToNumber**

  ```js
  function convertStringToNumber(string, x) {
      if (arguments.length < 2) x = 10;
      var letters = ['a', 'b', 'c', 'd', 'e', 'f'];
      var chars = string.toLowerCase().split('');
      var flag = chars.includes('-');
      var number = 0;
      var i = 0;
  
      while (
          i < chars.length &&
          chars[i] !== '.' &&
          !letters.includes(chars[i])
      ) {
          number *= x;
          number += chars[i].codePointAt() - '0'.codePointAt();
          i++;
      }
  
      // 小数 
      if (chars[i] === '.') i++;    
      var fraction = 1;
      while (
          x === 10 &&
          i < chars.length &&
          chars[i] !== 'e' &&
          chars[i] !== '+' &&
          chars[i] !== '-'
      ) {
          fraction /= x;
          number += (chars[i].codePointAt() - '0'.codePointAt()) * fraction;
          i++;
      }
      
  	// 指数
      if (x === 10 &&
          chars[i] ==='-' ||
          chars[i] === '+' ||
          chars[i] === 'e'
      ) i++;
      var index = 0;
      while (x === 10 && i < chars.length) {
          index *= x;
          index += convertStringToNumber(chars[i]);
          if (flag) number /= x ** index
          else number *= x ** index
          i++;
      }
  
      // 十六进制
      while (x === 16 && letters.includes(chars[i])) {
          number *= x;
          number += chars[i].codePointAt() - 87; // a 97
          i++;
      }
  
      return number;
  }
  ```

* **NumberToString**

  ```	js
  function convertNumberToString(number, x = 10) {
      var integer = Math.floor(number);
      var fraction = null;
      if (x === 10) fraction = ('' + number).match(/\.\d*/)[0];
      var string = ''
      while(integer > 0) {
        string = integer % x + string;
        integer = Math.floor(integer / x);
      }
      return fraction ? string + fraction : string;
  }
  ```

* **Special Object**

  > 下标运算（就是使用中括号或者点来做属性访问）或者设置原型跟普通对象不同

  * Bound Function 

    > bind 后的 function 跟原来的函数相关联

  * Array

    > Array 的 length 属性根据最大的下标自动发生变化

  * String

    > 为了支持下标运算，String 的正整数属性访问会去字符串里查找

  * Arguments

    > arguments 的非负整数型下标属性跟对应的变量联动

  * Module Namespace 

  * Object.prototype

    > 作为所有正常对象的默认原型，不能再给它设置原型