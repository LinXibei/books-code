/**
 * 现代模块机制
 * 大多模块依赖加载器/管理器
 * 本质上将这种模块，定义封装进一个友好的API
*/
var MyModules = (function Manager() {
  var modules = {};
  function define(name, deps, impl) {
    for (var i = 0; i < deps.length;i++) {
      deps[i] = modules[deps[i]]
    }
    modules[name] = impl.apply(impl, deps);
  };
  function get(name) {
    return modules[name];
  }
  return {
    define: define,
    get: get
  }
})()

MyModules.define("bar", [], function() {
  function hello(who) {
    return "Let me introduce: " + who
  }
  return {
    hello: hello
  }
});
MyModules.define("foo", ["bar"], function(bar) {
  var hungry = "hippo";
  function awesome() {
    console.log(bar.hello(hungry).toUpperCase());
  }
  return {
    awesome: awesome
  }
})

var bar = MyModules.get("bar")
var foo = MyModules.get("foo")

console.log(bar.hello("hippo")); // Let me introduce: hippo
foo.awesome(); // LET ME INTRODUCE: HIPPO

/**
 * 闭包：
 * 当函数可以记住并访问所在的词法作用域，及时函数是在当前词法作用域之外执行
 * 这时就产生了闭包
*/

/**
 * 模块模式：
 * 1.为创建内部作用域而调用了一个包装函数
 * 2.包装函数的返回值必须至少包括一个对内部函数的引用
 * 这样就会创建涵盖这个包装函数内部作用域的闭包
*/