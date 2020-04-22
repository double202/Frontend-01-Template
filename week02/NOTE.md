# 每周总结可以写在这里

## 编程语言通识

* **语言按语法分类**

  * 非形式语言 - 语法与语义相关
    * 中文，英文
  * 形式语言（乔姆斯基谱系）
    * <code>0型</code>  无限制文法
    * <code>1型</code>  上下文相关文法
    * <code>2型</code>  上下文无关文法
    * <code>3型</code>  正则文法 - 能用正则表达式编译的文法

* **产生式（`BNF`）**

  * 用尖括号 `<>` 括起来的名称来表示语法结构名 
  * 语法结构分成基础结构和需要用其它语法结构定义的符合结构
    * 基础结构称终结符
    * 符合结构称非终结符
  * 引号和中间的字符表示终结符
  * 可以有括号
  * `*` 表示重复多次
  * `|` 表示或
  * `+` 表示至少一次

  > 用 "a" "b" 规定一门语法，只能由 "a" "b" 以任何顺序组成； "a"" "b" 即终结符

```
"a"
"b"

<Program>::="a"+ | "b"+  // a 或 b 重复出现，不包含 abaa 

<Program>::=<Program>"a"+ | <Program>"b" + 
```

``` 
<Number>::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
 // 十进制数
<DecimalNumber>::= "0" | (("1" | "2" | ... | "9") | +<Number>*)
// 加法表达式
<AdditiveExpression>::= <DecimalNumber> | <AdditiveExpression> "+" <DecimalNumber>
```

```四则运算
<Number>::= "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
 // 十进制数
<DecimalNumber>::= "0" | (("1" | "2" | ... | "9") | +<Number>*)


<PrimaryExpression>::= <DecimalNumber> |
	"("<LogicalExpresion>")"

<MultiplicativeExpression>::= <PrimaryExpression> |
	<MultiplicativeExpression> "*" <PrimaryExpression> |
	<MultiplicativeExpression> "/" <PrimaryExpression>
	

<AdditiveExpression>::= <MultiplicativeExpression> | 
	<AdditiveExpression> "+" <MultiplicativeExpression> |
	<AdditiveExpression> "-" <MultiplicativeExpression>
	
	
<LogicalExpression>::= <AdditiveExpression> |
	<LogicalExpression> "||" <AdditiveExpression> |
	<LogicalExpression> "&&" <AdditiveExpression>
	
```

* **通过产生式理解乔姆斯基谱系**
  * `0型`  无限制文法
    * `?::=?`
  * `1型`  上下文相关文法
    * <code style="color: blue">?</code><A><code style="color: #ffbb00">?</code>::=<code style="color: blue">?</code><B><code style="color: #ffbb00">?</code>      //  只有中间的可以变
  * `2型`  上下文无关文法
    * <A>::=?
  * `3型` 正则文法
    * <A>::=<A>?

* 图灵完备性

  > 在可计算性理论里，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟单带图灵机，那么它是图灵完全的。这个词源于引入图灵机概念的数学家艾伦·图灵。虽然图灵机会受到储存能力的物理限制，图灵完全性通常指“具有无限存储能力的通用物理机器或编程语言”。

  * 命令式 — 图灵机
    * `goto`
    * `if` 和 `while`
  * 声明式 — `lambda`
    * 递归

* **动态与静态**

  * 动态
    * 在用户的设备/在线服务器上
    * 产品实际运行时
    * `RunTime`
  * 静态
    * 在程序员的设备上
    * 产品开发时
    * Compiletime

* 类型系统

  * 动态类型系统和静态类型系统

  * 强类型（无隐式转换）和弱类型 （是否存在隐式转换）

    * `String + Number`
    * `String == Boolean`

  * 复合类型

    * 结构体  ps:  对象
    * 函数签名   `(T1, T2) => T3`

  * 子类型

    > 凡是能用Array<Parent>的地方，都能用Array<Child>  协变
    >
    > 凡是能用Function<Child>的地方，都能用Array<Parent>  逆变

    * 协变 / 逆变

    ```js
    function foo(<Child>) {
        ...
    }
    
    foo(<Parent>)
    ```

> 推荐阅读：`ECMA-262 Grammar Summary` 部分





## JavaScript - 词法，类型

### 词法

* **Unicode**

[unicode](http://www.fileformat.info/info/unicode/)  重点关注 `Blocks`，`Catrgories`


* `InputElement`

  * `WhiteSpace`
    * <TAB>
    * <VT> 
    * <FF>
    * <SP>
    * <NBSP>
    * <ZWNBSP>
  | Code Point | Name                      | Abbreviation |        |
  | ---------- | ------------------------- | ------------ | ------ |
  | U+0009     | CHARACTER TABULATION      | <TAB>        | `"\t"` |
  | U+000B     | LINE TABULATION           | <VT>         | `"\v"` |
  | U+000C     | FORM FEED                 | <FF>         |        |
  | U+0020     | SPACE                     | <SP>         |        |
  | U+00A0     | NO-BREAK SPACE            | <NBSP>       |        |
  | U+FEFF     | ZERO WIDTH NO-BREAK SPACE | <ZWNBSP>     |        |

  * `LineTerminator`
  | Code Point | Name            | Abbreviation |        |
  | ---------- | --------------- | ------------ | ------ |
  | U+000A     | LINE FEED       | <LF>         | `"\n"` |
  | U+000D     | CARRIAGE RETURN | <CR>         | `"\r"` |

  * `Comment`

  * `Token`

    * `Punctuator`

    * `IdentifierName`
      * `Identifier`
      * `Keywords`
      * `FutureReservedWord`：`enum`
    * `Literal`

### 类型

* **Number**

  * Grammar

    * DecimalLiteral
      * 0
      * 0.
      * .2
      * 1e3

    * BinaryIntegerLiteral
      * 0b111
    * OctallntegerLitral
      * 0o10
    * HexIntegerLitral
      * 0xFF

  * Safe Integer

    * `Number.MAX_SAFE_INTEGER`

  * Float Compare

    * `Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON`

    `parseInt(100, 2)`

* **String**
  * Grammar
  	* ""
  	* ''
  	* ``

* **Boolean**

* **Null**

* **Undefined**

