# 每周总结可以写在这里

## JS 执行粒度

- Realm

- 宏任务

- 微任务（Promise）

- 函数调用（Execution Context）

  Execution Context Stack 执行栈

  进入一个函数时，会发生一次 Execution Context Stack 的 push，当函数返回的时候会发生一次 pop

  - code evaluation state 代码执行的位置 |  async 函数、generator 函数 有用，正常函数不需要存

  - Function 如果 Execution Context 执行的是一个函数就会有 Function，可能是 null

  - Script or Module

  - Generator  只有 Generator 产生的 Execution Context 才会有这个属性

  - Realm

  - LexicalEnvironment

    - this
    - new.target
    - super
    - 变量

  - VariableEnvironment

    用于处理 var 的声明

- 语句/声明

- 表达式

- 直接量/变量/this
