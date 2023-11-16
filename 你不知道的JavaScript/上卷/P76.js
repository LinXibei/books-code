/**
 * this指向问题：
 * this是在运行时绑定，它的上下文取决于函数调用时的各种条件
 * this的绑定和函数声明的位置没有任何关系，只取决于函数调用方式
 * 
 * 函数调用过程：
 * 当一个函数被调用时，会创建一个活动记录（也叫做执行上下文）
 * 记录会包含：函数在哪里被调用（调用栈）、函数调用方法、传入的参数等信息
 * this就是记录其中一个属性，会在函数执行时用到
*/

/**
 * 误解1：指向自身
*/
function foo(num) {
  console.log("foo:" + num);
  this.count++;
}
foo.count = 0;

for (var i = 0; i < 10; i++) {
  if (i > 5) {
    foo(i)
  }
}
console.log(foo.count) // 0 , WTF...

// 可以修改为下面：
function foo(num) {
  console.log("foo:" + num);
  this.count++;
}
foo.count = 0;

for (var i = 0; i < 10; i++) {
  if (i > 5) {
    foo.call(foo, i)
  }
}
console.log(foo.count) // 4

/**
 * 误解2：它的作用域
*/
function foo() {
  var a = 2;
  this.bar();
}
function bar() {
  console.log(this.a)
}
foo() // ReferenceError: a is not defined
