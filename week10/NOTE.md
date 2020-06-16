# 重学 API

* 把一个元素子元素逆序

```html
<div id="a">
    <span>1</span>
    <p>2</p>
    <a>3</a>
    <div>4</div>
</div>
<script>
    let element = document.getElementById("a")
    function reverseElement(element) {
        let len = element.childNodes.length
        while(len--) {
            element.appendChild(element.childNodes[len])
        }
    }
</script>
```

## Range

```js
let element = document.getElementById("a")
function reverseElement(element) {
    let range = new Range()
    range.selectNodeContents(element)
    let fragment = range.extractContents()
    
    let len = fragment.childNodes.length
    while(len--) {
        fragment.appendChild(fragment.childNodes[len])
    }
    element.appendChild(fragment)
}
```

* setStart
* setEnd

```js
var range = new Range()
range.setStart(element, 3)
range.setEnd(element, 6)

var range = document.getSelection().getRangeAt(0)
```

* extractContents

```js
var fragment = range.extractContents()
range.insertNode(document.createTextNode("aaa"))
```

* setStartBefore
* setEndBefore
* setStartAfter
* setEndAfter
* selectNode
* selectNodeContents



## CSSOM

> 应用：批量操作元素样式、修改伪元素样式

### document.styleSheets

* document.styleSheets

### Rules

* document.styleSheets[0].cssRules
* document.styleSheets[0].insertRule("p { color: pink }", 0)
* document.styleSheets[0].removeRule(0)

### Rule

* CSSStyleRule

  * <pre>selectorText       String</pre>

  * <pre>style              K-V 结构 </pre> 

* CSSCharsetRule

* CSSImportRule

* CSSMediaRule

* CSSFontFaceRule

* CSSPageRule

* CSSNamespaceRule

* CSSKeyframesRule

* CSSKeyframeRule

* CSSSupportsRule

* ......

### getComputedStyle

* window.getComputedStyle(elt, pseudoElt)
  * elt   想要获取的元素
  * pseudoElt   可选伪元素

### window

* open()
* moveTo()
* moveBy()
* resizeTo()
* resizeBy()
* scrollX 
* scrollY
* scroll()
* scrollBy()
* innerHeight  viewport 的高度
* innerWidth
* devicePixeRatio     物理像素和逻辑像素的比值

Element

* scrollHeight

* scrollTop

* scrollLeft

* getClientRects()   行盒

* getBundingClientRect()  包裹行盒的盒子

  document.documentElement.getBundingClientRect()

