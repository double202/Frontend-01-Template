function getStyle(element) {
    if (!element.style) element.style = {};

    for (let prop in element.computedStyle) {
        let p = element.computedStyle.value;
        element.style[prop] = element.computedStyl[prop].value;

        if (element.style[prop].toString().match(/px$/)) {
            element.style[prop] = parseInt(element.style[prop]);
        }
        if (element.style[prop].toString().match(/^[0-9\.]+$/)) {
            element.style[prop] = parseInt(element.style[prop]);
        }
    }
    return element.style;
}

function layout(element) {
    if (!element.computedStyle) return;

    let elementStyle = getStyle(element);

    if (elementStyle.display !== "flex") return;

    let items = element.children.filter(it => it.type === "element");
    items.sort((a, b) => (a.order || 0) - (b.order || 0));

    let style = elementStyle;

    ["width", "height"].forEach(size => {
        if (style[size] === "auto" || style[size] === "") {
            style[size] = null;
        }
    })

    if (!style.flexDirection || style.flexDirection === "auto") {
        style.flexDirection = "row";
    }
    if (!style.alignItems || style.alignItems === "auto") {
        style.alignItems = "stretch";
    }
    if (!style.justifyContent || style.justifyContent === "auto") {
        style.justifyContent = "flex-start";
    }
    if (!style.flexWrap || style.flexWrap === "auto") {
        style.flexWrap = "nowrap";
    }
    if (!style.alignContent || style.alignContent === "auto") {
        style.alignContent = "stretch";
    }

    let mainSize, mainStart, mainEnd, mainSign, mainBase,
        crossSize, crossStart, crossEnd, crossSign, crossBase;
    
    if (style.flexDirection === "row") {
        mainSize = "width";
        mainStart = "left";
        mainEnd = "right";
        mainSign = +1; // +
        mainBase = 0;

        crossSize = "height";
        crossStart = "top";
        crossEnd = "bottom";
    }
    if (style.flexDirection === "row-reverse") {
        mainSize = "width";
        mainStart = "right";
        mainEnd = "left";
        mainSign = -1; // -
        mainBase = style.width;

        crossSize = "height";
        crossStart = "bottom";
        crossEnd = "top";
    }
    if (style.flexDirection === "column") {
        mainSize = "height";
        mainStart = "top";
        mainEnd = "bottom";
        mainSign = +1;
        mainBase = 0;

        crossSize = "width";
        crossStart = "left";
        crossEnd = "right";
    }
    if (style.flexDirection === "column-reverse") {
        mainSize = "height";
        mainStart = "bottom";
        mainEnd = "top";
        mainSign = -1;
        mainBase = style.width;

        crossSize = "width";
        crossStart = "left";
        crossEnd = "right";
    }

    if (style.flexWrap === "wrap-reverse") {
        let temp = crossStart;
        crossStart = crossEnd;
        crossEnd = temp;
        crossSign = -1;
    } else {
        crossBae = 0;
        crossSign = +1;
    }

    let isAutoMainSize = false;
    if (!style[mainSize]) { // auto sizing
        elementStyle[mainSize] = 0;
        for (let i = 0; i < items.length; i ++) {
            if (itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0)) {
                elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
            }
        }
        isAutoMainSize = true;
    }

    let flexLine = [];
    let flexLines = [flexLine];

    let mainSpace = elementStyle[mainSize];
    let crossSpace = 0;

    for (let i = 0; i < items.length; i ++) {
        let item = items[i];
        let itemStyle = getStyle(item);

        if (itemStyle[mainSize] === null) {
            itemStyle[mainSize] = 0;
        }


        if (itemStyle.flex) {
            flexLine.push(item);
        } else if (style.flexWrap === "nowrap" && isAutoMainSize) {
            mainSpace -= itemStyle[mainSize];
            if (itemStyle[crossSize] !== null && itemStyle[crossSize]) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSpace]);
            }
            flexLine.push(item);
        } else {
            if (itemStyle[mainSize] > style[mainSize]) { // item 尺寸比外面包裹的容器大
                itemStyle[mainSize] = style[mainSize];
            }
            if (mainSpce < itemStyle[mainSize]) { // 剩余空间放不下 item
                flexLine.mainSpace = mainSpace;
                flexLine.crossSpace = crossSpace;
                flexLine = [item];
                flexLines.push(flexLine); // 创建新行
                mainSpace = style[mainSize];
                crossSpace = 0;
            } else {
                flexLine.push(item);
            }
            if (itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0)) {
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);
            }
            mainSpace -= itemStyle[mainSize];
        }
    }
    flexLine.mainSpace = mainSpace;
    // console.log(items);

    if (style.flexWrap === "nowrap" || isAutoMainSize) {
        flexLine.crossSpace = style[crossSize] !== void 0 ? style[crossSize] : crossSpace;
    } else {
        flexLine.crossSpace = crossSpace;
    }

    if (mainSpace < 0) {
        let  scale = style[mainSize] / (style[mainSize] - mainSpace);
        let currentMain = mainBase;
        for (let i = 0; i < items.length; i ++) {
            let item = items[i];
            let itemStyle = getStyle(item);

            if (itemStyle.flex) {
                itemStyle[mainSize] = 0;
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale;

            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
            currentMain = itemStyle[mainEnd];
        } 
    } else {
        // 处理每一行
        flexLines.forEach(items => {
            let mainSpace = items.mainSpace;
            let felxTotal = 0;
            for (let i = 0; i < items.length; i ++) {
                let item = items[i];
                let itemStyle = getStyle(item);

                if (itemStyle.flex !== null && itemStyle.flex !== void 0) {
                    felxTotal += itemStyle.flex;
                    continue;
                }
            }

            if (felxTotal > 0) {
                // 有 flexible flex items
                let currentMain = mainBase;
                for (let i = 0; i < items.length; i ++) {
                    let item = items[i];
                    let itemStyle = getStyle(item);

                    if (itemStyle.flex) {
                        itemStyle[mainSize] = (mainSpace / felxTotal) * itemStyle.flex;
                    }
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd];
                }
            } else {
                // No felxible flex items, flex-content 开始工作
                let currentMain = mainBase;
                let space = 0; // 元素间距

                if (style.justifyContent === "flex-start") {
                    currentMain = mainBase;
                    space = 0;
                }
                if (style.justifyContent === "flex-end") {
                    currentMain = mainSpace * mainSign + mainBase;
                    space = 0;
                }
                if (style.justifyContent === "center") {
                    currentMain = mainSpace / 2 * mainSign + mainBase;
                    space = 0;
                }
                if (style.justifyContent === "space-between") {
                    space = mainSpace / (items.length - 1) * mainSign; 
                    currentMain = mainBase;
                }
                if (style.justifyContent === "space-around") {
                    space = mainSpace / items.length * mainSign;
                    currentMain = space / 2 + mainBase;
                }

                for (let i = 0; i < items.length; i ++) {
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd] + space;
                }
            }
        });
    }

    // 计算 cross axis sizes
    // align-items, align-self
    crossSpace = 0;

    if (!style[crossSize]) { // auto sizing
        crossSpace = 0;
        elementStyle[crossSize] = 0;
        for (let i = 0; i < flexLines.length; i ++) {
            elementStyle[crossSize] = elementStyle[crossSize] + flexLines[i].crossSpace;
        }
    } else {
        crossSpace = style[crossSize];
        for (let i = 0; i < flexLines.length; i ++) {
            crossSpace -= flexLines[i].crossSpace;
        }
    }

    if (style.flexWrap === "wrap-reverse") {
        crossBase = style[crossSize];
    } else {
        crossBase = 0;
    }

    // let lineSize = style[crossSize] / flexLines.length;

    let space = 0;

    if (style.alignContent === "flex-start") {
        crossBase += 0;
        space = 0;
    }
    if (style.alignContent === "flex-end") {
        crossBase += crossSign * crossSpace;
        space = 0;
    }
    if (style.alignContent === "center") {
        crossBase += crossSign * crossSpace / 2;
        space = 0;
    }
    if (style.alignContent === "space-between") {
        crossBase += 0;
        space = crossSpace / (flexLines.length - 1);
    }
    if (style.alignContent === "space-around") {
        space = crossSpace / flexLines.length;
        crossBase += crossSign * space / 2;
    }
    if (style.alignContent === "stretch") {
        crossBase += 0;
        space = 0;
    }
    flexLines.forEach(items => {
        let lineCrossSize = style.alignContent === "stretch"
        ? items.crossSpace + crossSpace / flexLines.length
        : items.crossSpace;
        for (let i = 0; i < items.length; i ++) {
            let item = items[i];
            let itemStyle = getStyle(item);

            let align = itemStyle.alignSelf || style.alignItems;

            if (itemStyle[crossSize] === null) {
                itemStyle[crossSize] = align === "stretch" ? lineCrossSize : 0;
            }
            if (align === "flex-start") {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if (align === "flex-end") {
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
            }
            if (align === "center") {
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if (align === "stretch") {
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] +
                    crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
            }
        }
        crossBase += crossSign * (lineCrossSize + space);
    });
    console.log(items)
}

module.exports = layout;
