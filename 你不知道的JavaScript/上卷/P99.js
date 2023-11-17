/**
 * this词法 
*/

// foo()的this绑定到了obj1，bar的this也会绑定到obj1，箭头函数的绑定无法修改（及时是new 也不行）
function foo() {
  // 返回一个箭头函数
  return () => {
    // this继承自foo()
    console.log(this.a)
  }
}
var obj1 = {
  a: 2
}
var obj2 = {
  a: 3
}
var bar = foo.call(obj1)
bar.call(obj2) // 2，不是3

// 箭头函数常用于回调函数中，如事件处理器或者定时器：
function foo() {
  setTimeout(() => {
    console.log(this.a)
  }, 100)
}
var obj = {
  a: 2
}
foo.call(obj) // 2