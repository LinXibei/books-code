if (!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== "function") {
      throw new TypeError("Function.prototype.bind - what is trying " +
      "to be bound is not callable")
    }
    var aArgs = Array.prototype.slice.call(arguments, 1);
    var fToBind = this, fNOP = function(){};
    var fBound = function() {
      return fToBind.apply(
        this instanceof fNOP && oThis ? this : oThis,
        aArgs.concat(
          Array.prototype.slice.call( arguments )
        )
      )
    }
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
  }
}
/**
 * 会判断硬绑定函数是否是被 new 调用，如果是的话就会使用新创建的 this 替换硬绑定的 this。
 * this instanceof fNOP && oThis ? this : oThis
 * fNOP.prototype = this.prototype;
 * fBound.prototype = new fNOP();
*/

/**
 * 判断this
 * 1. 函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。
 *  var bar = new foo()
 * 2. 函数是否通过 call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是指定的对象。
 * var bar = foo.call(obj2)
 * 3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上下文对象。
 * var bar = obj1.foo()
 * 4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到全局对象。
 * var bar = foo()
*/

/**
 * 例外
 * 1.被忽略的this
 * 2.间接引用
 * 3.软绑定
*/
// 1.被忽略的this
function foo(a,b) {
  console.log( "a:" + a + ", b:" + b );
}
// 把数组“展开”成参数
foo.apply( null, [2, 3] );
// 2.间接引用
function foo() {
  console.log( this.a );
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo(); // 3
(p.foo = o.foo)(); // 2

// 软绑定
if (!Function.prototype.softBind) {
  Function.prototype.softBind = function(obj) {
    var fn = this;
    // 捕获所有 curried 参数
    var curried = [].slice.call( arguments, 1 );
    var bound = function() {
      return fn.apply(
        (!this || this === (window || global)) ?
        obj : this,
        curried.concat.apply( curried, arguments )
      );
    };
    bound.prototype = Object.create( fn.prototype );
    return bound;
  };
}
function foo() {
  console.log("name: " + this.name);
}
var obj = { name: "obj" },
obj2 = { name: "obj2" },
obj3 = { name: "obj3" };
var fooOBJ = foo.softBind( obj );
fooOBJ(); // name: obj
obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2 <---- 看！！！
fooOBJ.call( obj3 ); // name: obj3 <---- 看！
setTimeout( obj2.foo, 10 );
// name: obj <---- 应用了软绑定