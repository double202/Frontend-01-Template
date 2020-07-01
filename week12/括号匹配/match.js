/**
 * 核心思想
 *      遇到左括号就入栈  
 *      遇到到右括号 与栈顶元素匹配是否成对 是 => 出栈 否 => false
 *      栈空 整体匹配成功
*/

var match = (string) => {
    let stack = [];
    for (let char of string) {
        if (char === '(' || char === '[' || char === '{')
            stack.push(char);
        if (char === ')') {
            if (stack[stack.length - 1] === '(')
                stack.pop()
            else
                return false;
        }
        if (char === ']') {
            if (stack[stack.length - 1] === '[')
                stack.pop()
            else
                return false;
        }
        if (char === '}') {
            if (stack[stack.length - 1] === '{')
                stack.pop()
            else
                return false;
        }
    }
    return stack.length === 0;
}

