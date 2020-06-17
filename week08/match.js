let selectorObj = {}
let parent = {}
let cur = {
    val: ''
}

function emit (cur) {

    if (cur.type === 'descendant') {
        const ancestor = Object.assign({}, selectorObj)
        selectorObj = {
            ancestor
        }
    } else if (cur.type === 'children') {
        const parentNode = Object.assign({}, selectorObj)
        selectorObj = {
            parentNode
        }
    } else if (cur.type === 'next') {
        selectorObj.previousElementSibling = {}
        selectorObj.previousElementSibling[cur.type] = cur.val
    } else if (cur.type === 'after') {
        selectorObj.before = {}
        selectorObj.before[cur.type] = cur.val
    } else {
        selectorObj[cur.type] = cur.val
    }
}

function dealSelector(char, isEmit = false) {
    if (char === ' ') {
        if (Object.keys(cur)[1] && cur.val !== '') {
            emit(cur)
            delete cur.type
        }
        cur.val = ''
        cur.type = 'descendant'
        emit(cur)
        delete cur.type
    } else if (char === '>') {
        if (Object.keys(cur)[1] && cur.val !== '') {
            emit(cur)
            delete cur.type
        }
        cur.val = ''
        cur.type = 'children'
    } else if (char === '+') {
        if (Object.keys(cur)[1] && cur.val !== '') {
            emit(cur)
            delete cur.type
        }
        cur.val = ''
        cur.type = 'next'
    } else if (char === '~') {
        if (Object.keys(cur)[1] && cur.val !== '') {
            emit(cur)
            delete cur.type
        }
        cur.val = ''
        cur.type = 'after'
    } else if (char === ':') {
        if (Object.keys(cur)[1] && cur.val !== '') {
            emit(cur)
            delete cur.type
        }
        cur.val = ''
        cur.type = 'pseudo'
    } else if (char === '.') {
        if (Object.keys(cur)[1] && cur.val !== '') {
            emit(cur)
            delete cur.type
          }
          cur.val = ''
          cur.type = 'className'
    } else if (char === '#') {
        if (Object.keys(cur)[1] && cur.val !== '') {
            emit(cur)
            delete cur.type
        }
        cur.val = ''
        cur.type = 'id'
    } else if (char === '[') {
        if (Object.keys(cur)[1] && cur.val !== '') {
            emit(cur)
            delete cur.type
        }
        cur.val = ''
        cur.type = 'attributes'
    } else if (char === ']') {
        emit(cur)
        delete cur.type
    } else {
        if (cur.type) {
            cur.val += char
        } else {
            cur.type = 'tagName'
            cur.val += char
        }
        if (isEmit) {
            emit(cur)
        }
    }
}

function compare(selectorObj, element, isDescendant = false) {
  let i = 0
  for (let key of Object.keys(selectorObj)) {
    if (typeof(selectorObj[key]) !== 'object') {
      if (key === 'tagName') {
        if (selectorObj[key].toUpperCase() !== element[key]) {
          if (isDescendant && 'HTML' !== element.tagName) {
            return compare(selectorObj, element['parentNode'], true)
          }
          return false
        }
      } else if (selectorObj[key] !== element[key]) {
        if (isDescendant && 'HTML' !== element.tagName) {
          return compare(selectorObj, element['parentNode'], true)
        }
        return false
      }
    } else {
      i ++
      return compare(selectorObj[key], element[key])
    }
  }
  if (i === 0) {
    return true
  }
  if (isDescendant && 'HTML' !== element.tagName) {
    return compare(selectorObj, element['parentNode'], true)
  }
}

function match(selector, element) {
  for(let i = 0; i < selector.length; i ++) {
    dealSelector(selector[i], i === selector.length - 1)
  }
}

match('body div #id.class', document.getElementById('id'))
