const complier = require('@vue/compiler-sfc');

let output = complier.compileTemplate({
  filename: 'example.vue',
  source: '<div>Hello World!</div>'
})

console.log(JSON.stringify(output, '    '));