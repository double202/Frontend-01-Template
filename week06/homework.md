* 使用状态机完成 “abababx” 的处理

  ```js
  function match(string) {
      let state = start
      for (let c of string) {
          state = state(c)
      }
      return state === end
  }
  function start(c) {
      if (c === "a") return foundB
      else return start
  }
  function foundB(c) {
      if (c === "b") return foundA2
      else return start(c)
  }
  function foundA2(c) {
      if (c === "a") return foundB2
      else return start(c)
  }
  function foundB2(c) {
      if (c === "b") return foundA3
      else return start(c)
  }
  function foundA3(c) {
      if (c === "a") return foundB3
      else return start(c)
  }
  function foundB3(c) {
      if (c === "b") return foundX
      else return start(c)
  }
  function foundX(c) {
      if (c === "x") return end
      else return foundA2(c)
  }
  function end() {
      return end
  }
  match("ababaabababx")
  ```

* 如何用状态机处理完全未知的 pattern

  ```js
  function match(pattern, string) {
      let state = start
      let originPattern = pattern.split("").reverse()
      for (let c of string) {
          state = state(c, originPattern, pattern)
      }
      return state === end
  }
  
  function start(c, originPattern, pattern) {
      if (c === originPattern[originPattern.length - 1]) {
          originPattern.pop()
          return fn
      } else {
          originPattern = pattern.split("").reverse()
          return start
      }
  }
  
  function fn(c, originPattern, pattern) {
      if (originPattern.length > 1) {
          if (c === originPattern[originPattern.length - 1]) {
              originPattern.pop()
              return fn
          } else {
              originPattern = pattern.split("").reverse()
              return start
          }
      } else if (originPattern.length === 1) {
          if (c === originPattern[0]) return end
          else {
              originPattern = pattern.split("").reverse()
              return start
          }
      } else {
          originPattern = pattern.split("").reverse()
          return start
      }
  }
  
  function end() {
      return end
  }
  
  console.log(match("aab?x", "xxxaaab??xc"))
  ```

  

