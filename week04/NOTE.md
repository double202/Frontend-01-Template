# 每周总结可以写在这里

## 结构化程序设计

* **为什么 promise 比 setTimeout 先执行？**

  <em>setTimeout 是浏览器（宿主环境）的 API，它产生宏任务，而 promise 产生的是 JavaScript 引擎内部的微任务</em>

  <em>每一个宏任务都有一个微任务队列，宏任务执行完成之后，判断微任务队列是否有等待任务，若有执行，若无执行下一个宏任务</em>

  ```js
  new Promise(resolve => (console.log('0'), resolve()))
      .then(() => console.log('1'));
  setTimeout(() => {
      console.log('2');
      new Promise(resolve => resolve())
          .then(() => console.log('3'));
  })
  console.log('4');
  console.log('5');
  
  // 0 4 5 1 2 3
  
  宏任务
  0 4 5  // 第一个宏任务的 同步代码，
  	1  // 第一个宏任务的 异步代码
  
  宏任务
  2      // 第二个宏任务的 同步代码
  	3  // 第二个宏任务的 异步代码
  
  ```

* **EventLoop**

JavaScript 引擎执行 js 代码，顺序执行，依次进入调用栈，判断当前任务是宏任务还是微任务，如果是宏任务，进行入队操作，执行完当前宏任务的同步代码，判断微任务有木有等待的任务，若有依次出队，通过事件循环，重新进入调用栈执行

