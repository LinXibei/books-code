/**
 * this全面解析
 * 
 * 调用位置：
 * 函数在代码中被调用的位置（不是声明位置）
 * 就是分析调用栈（为了到达当前执行位置所调用的所有函数），事例1
*/

// 事例1
function baz() {
  // 当前调用栈是：baz
  // 因此，当前调用位置是全局作用域
  console.log("baz")
  bar() // <-- bar 的调用位置
}

function bar() {
  // 当前调用栈是：baz --> bar
  // 因此，当前调用位置是在baz
  console.log("bar")
  foo() // <-- foo 的调用位置
}

function foo() {
  // 当前调用栈是：baz --> bar --> foo
  // 因此，当前调用位置是在bar
  console.log("foo")
}

// 默认绑定
function foo() {
  console.log( this.a );
}
var a = 2;
foo();

// 隐式绑定
// 隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象
// 对象属性引用链中只有最顶层或者说最后一层会影响调用位置。

// 隐式丢失
// 一个最常见的this绑定问题：被隐式绑定的函数会丢失绑定对象，也就是它会用默认绑定，从而把 this 绑定到全局对象或者 undefined 上，取决于是否是严格模式
function foo() {
  console.log(this.a)
}
var obj2 = {
  a: 42,
  foo: foo
};
var obj1 = {
  a: 2,
  obj2: obj2
};
obj1.obj2.foo(); // 42

// 虽然 bar 是 obj.foo 的一个引用
// 但是实际上，它引用的是 foo 函数本身
// 此时的bar()，其实是一个不带任何修饰的函数调用，因此应用了默认绑定
function foo() {
  console.log(this.a)
}
var obj = {
  a: 2,
  foo: foo
}
var bar = obj.foo // 函数别名
var a = 'oops, global'
bar() // oops, global 

// 传入回调函数
// 参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值
function foo() {
  console.log(this.a)
}
function doFoo(fn) {
  fn()
}
var obj = {
  a: 2,
  foo: foo
}
var a = "oops, global";
doFoo(obj.foo) // "oops, global"

/**
 * 显式绑定
*/
// 1.硬绑定：调用call、apply、bind
function foo(something) {
  console.log(this.a, something)
  return this.a + something
}
function bind(fn, obj) {
  return function() {
    return fn.apply(obj, arguments)
  }
}
var obj = {
  a: 2
}
var bar = bind(foo, obj)
var b = bar(3)
console.log(b) // 5

// 2.API调用的“上下文”
function foo(el) {
  console.log(el, this.id)
}
var obj = {
  id: "awesome"
}
[1, 2, 3].forEach(foo, obj);

// 3.new绑定