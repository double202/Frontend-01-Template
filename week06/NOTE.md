# 每周总结可以写在这里

URL (HTTP) => HTML (parse) => DOM (CSS Computing) => DOM with CSS(layout) => DOM with Postion(render) => Bitmap  

## 有限状态机

* 每一个状态都是一个机器
  * 在每一个给机器里，我们可以做计算、存储、输出……
  * 所有的这些机器接受的输入都是一致的
  * 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数（无副作用）
* 每一个机器知道下一个状态
  * 每个机器都有确定的下一个状态，这种状态机是 Moore 状态机
  * 每个机器根据输入决定下一个状态（Mealy）

* 在一个字符串中找到 “a”

  ```js
  function match(string) {
      for (let c of string) {
          if (c === 'a') return true
      }
      return false
  }
  match("I am String")
  ```

* 在一个字符串中找到 “ab”

  ```js
  function match(string) {
      let foundA = false
      for (let c of string) {
          if (c === "a") foundA = true
          else if (foundA && c === "b") return true
          else {
              foundA = false
          }
      }
      return false
  }
  match("I abm String")
  ```

* 在一个字符串中找到 “abcdef”

  ```js
  function match(string){
      let foundA = false
      let foundB = false
      let foundC = false
      let foundD = false
      let foundE = false
      for (let c of string) {
          if (c === "a")  foundA = true
          else if (c === "b") foundB = true
          else if (c === "c") foundC = true
          else if (c === "d") foundD = true
          else if (c === "e") foundE = true
          else if (c === "f") return true
          else {
              foundA = false
              foundB = false
  			foundC = false
  			foundD = false
  			foundE = false
          }
      }
      return false
  }
  match("aabcdefb")
  ```

## JS 中的有限状态机（Mealy）

```js
// 每个函数都是一个状态
function state(input) { // 函数参数就是输入
    // 在函数体中可以自由编写代码，处理每个状态的逻辑，
    return next // 返回值作为下一个状态
}
// 以下是调用
while(input) {
    // 获取输入
    state = state(input) // 把状态机的返回值作为下一个状态
}
```

> 在一个字符串中找到 “abcdef”

```js
function match(string) {
    let state = start
    for (let c of string) {
        state = state(c)
    }
    return state === end
}
function start(c) {
    if (c === "a") return foundA
    else return start
}
function foundA(c) {
    if (c === "b") return foundB
    else return start(c)
}
function foundB(c) {
    if (c === "c") return foundC
    else return start(c)
}
function foundC(c) {
    if (c === "d")return foundD
    else return start(c)
}
function foundD(c) {
    if (c === "e") return foundE
    else return start(c)
}
function foundE(c) {
    if (c === "f") return end
    else return start(c)
}
function end() {
    return end
}
```

* 在字符串中找到诸如 “abcabx” 字符串

  ```js
  function match(string) {
      let state = start
      for (let c of string) {
          state = state(c)
      }
      return state === end
  }
  function start(c) {
      if (c === "a") return foundA
      else return start
  }
  function foundA(c) {
      if (c === "b") return foundB
      else return start(c)
  }
  function foundB(c) {
      if (c === "c") return foundA2
      else return start(c)
  }
  function foundA2(c) {
      if (c === "a")return foundB2
      else return start(c)
  }
  function foundB2(c) {
      if (c === "b") return foundX
      else return start(c)
  }
  function foundX(c) {
      if (c === "x") return end
      else return foundB(c)
  }
  function end() {
      return end
  }
  ```
  

## HTML 的解析

* **文件拆分**

  为了方便文件管理，我们把 parser 单独拆到文件中

  parser 接受 HTML 文本作为参数，返回一棵 DOM 树

* **创建状态机**

* **解析标签**

  主要标签有：开始标签、结束标签、自封闭标签

* **创建元素**

  在状态机中，除了状态迁移，我们还会要加入业务逻辑

  我们在标签结束状态提交标签 Token

* **处理属性**

  属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理

  处理属性的方式跟标签类似

  属性结束时，我们把属性加到标签 Token 上

* **构建 DOM 树**

  从标签构建 DOM 树的基本技巧是使用栈

  遇到开始标签时创建元素并入栈，遇到结束标签时出栈

  自封闭节点可视为入栈后立刻出栈

  任何元素的父元素是它入栈前的栈顶

* **文本节点**

  文本节点与自封闭标签处理相似

  多个文本节点需合并



## CSS 计算

```bash
npm install css
```

* **收集 CSS 规则**

  遇到 style 标签时，我们把 CSS 规则保存起来

  这里我们调用 CSS Parser 来分析 CSS 规则

  这里我们必须要仔细研究此库分析 CSS 规则的格式

* **添加调用**

  当我们创建一个元素后，立即计算 CSS

  理论上，当我们分析一个元素时，所有 CSS 规则已经收集完毕

  在真实浏览器中，可能遇到写在 body 的 style 标签，需要重新 CSS 计算的情况，这里我们忽略

* **获取父元素序列**

  在 computedCSS 函数中，我们必须知道元素的所有父元素才能判断元素与规则是否匹配

  我们从上一步的 stack ，可以获取本元素所有的父元素

  因为我们首先获取的是 “当前元素”，所以我们获得和计算父元素匹配的顺序是从内向外

* **拆分选择器**

  选择器也要从当前元素向外排列

  复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列

* **计算选择器与元素匹配**

  根据选择器的类型和元素属性，计算是否与当前元素匹配

  这里仅仅实现了三种基本选择器，实际的浏览器中要处理符合选择器

* **生成 computed 属性**

  



  







  

  





















