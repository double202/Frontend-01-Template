# 每周总结可以写在这里

## 排版（Layout）

* 初始化

* 收集元素进行

  > 分行

  * 根据主轴尺寸，把元素分进行
  * 若设置了 `no-wrap`，则强行分配进第一行

* 计算主轴

  > 计算主轴方向

  * 找出所有 Flex 元素
  * 把主轴方向的剩余尺寸按比例分配给这些元素
  * 若剩余空间为负数，所有 flex 元素为0，等比压缩所有元素

* 计算交叉轴

  > 计算交叉轴方向

  * 根据每一行中最大元素尺寸计算行高
  * 根据行高 `flex-align`、`item-align`，确定元素的位置



## 绘制（draw）

* 绘制单个元素
  * 绘制需要依赖一个图形环境
  * 我们这里采用 npm 包 images
* 绘制 DOM
  * 



# CSS

### CSS 总体结构

- `@charset`
- `@import`
- `rules`
  - `@media`
  - `@page`
  - `rule`



