# 每周总结可以写在这里

# CSS 选择器

## 选择器语法

### 简单选择器

* *
* div svg|a
* .class
* #id
* tagName
* [attr=value]
* :hover
* ::before

### 复合选择器

* 简单选择器<space>简单选择器<space>简单选择器
* *、div 写在最前，伪类、伪元素写在最后

### 复杂选择器

* A+B
* A~B
* A>B
* A||B

### 伪类选择器

* 链接/行为
  * :any-link    所有链接
  * :link    未访问链接
  * :visited    已访问链接
  * :hover
  * :active
  * :focus
  * :target
* 树结构
  * :empty
  * :nth-child
  * ~~:nth-last-child~~
  * :first-child    ~~:last-child~~    ~~:only-child~~
* 逻辑型
  * :not，只推荐 match 简单选择器以及复合选择器
  * ~~:where~~    ~~:has~~

## 优先级

[specificity](https://specifishity.com/)

* inline-style
* id    [0，X，0，0]
* class    [0，0，Y，0]
* [attr=value]    [0，0，Y，0]
* tagName    [0，0，0，Z]

## 伪元素

* ::before

* ::after

* ::first-line

  > 可用属性

  * font 系列
  * color 系列
  * background 系列
  * word-spacing
  * letter-spacing
  * text-decoration
  * text-transform
  * line-height

* ::first-letter

  > 可用属性

  * font 系列
  * color 系列
  * background 系列
  * word-spacing
  * letter-spacing
  * text-decoration
  * text-transform
  * line-height
  * float
  * vertical-align
  * 盒模型系列：margin，padding，border

## CSS 排版

标签Tag&emsp;&emsp;元素Element&emsp;&emsp;盒Box

排版的基本单位是 **盒**

**盒模型**

* box-sizing
  * content-box
  * border-box

### 正常流 (Normal 、flow)

* 收集**盒**进行
* 计算盒在行中的排布
* 计算行的排布

> **正常行的盒模型** IFC

inline-block 配合 vertical-align:bottom / top /middle 之一使用;

始终

一个 `inline-block` 可能会产生多个盒，**换行**；`$0.getClientRects()`

> **float 与 clear**

> **margin 折叠**

新加一种能容纳正常流的容器，就会产生 BFC，正常流 `overflow:visible;` 

> overfloe:visible 与 BFC

### Flex

* 收集**盒**进行
* 计算盒在行中的排布
* 计算行的排布













