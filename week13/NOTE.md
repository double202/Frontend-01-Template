# 每周总结可以写在这里

## 组件化基础

### 对象与组件

* 对象

  * Properties
  * Methods
  * Inherit

* 组件

  * Properties

    > 强调从属关系

  * Methods

  * Inherit

  * Attributes

    > 强调描述性

  * Config & State

  * Event

  * Lifecycle

  * Children


### 如何设计组件状态

| Markup Set | JS set | JS change | User Input Change |           |
| :--------: | :----: | :-------: | :---------------: | :-------: |
|     ×      |   √    |     √     |    ? (不一定)     | property  |
|     √      |   √    |     √     |    ? (不一定)     | attribute |
|     ×      |   ×    |     ×     |         √         |   state   |
|     ×      |   √    |     ×     |         ×         |  config   |

### Lifecycle

