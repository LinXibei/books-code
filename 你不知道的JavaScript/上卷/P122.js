/**
 * 遍历
*/

// for..of 循环首先会向被访问对象请求一个迭代器对象，然后通过调用迭代器对象的 next() 方法来遍历所有返回值。
var myArray = [ 1, 2, 3 ];
for (var v of myArray) {
  console.log( v );
}
// 1
// 2
// 3

// 数组有内置的 @@iterator
var myArray = [1, 2, 3];
var it = myArray[Symbol.iterator]()
it.next(); // { value:1, done:false }
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { done:true }

// 实现对象的Symbol.iterator遍历
var obj = {
  a: 2,
  b: 3
}
Object.defineProperty(obj, Symbol.interator, {
  enumerable: false,
  writable: false,
  configurable: true,
  value: function() {
    return {
      next: function() {
        var o = this;
        var idx = 0;
        var ks = Object.keys(o);
        return {
          value: o[ks[idx++]],
          done: (idx > ks.length)
        }
      }
    }
  }
})

// 手动遍历 myObject
var it = myObject[Symbol.iterator]();
it.next(); // { value:2, done:false }
it.next(); // { value:3, done:false }
it.next(); // { value:undefined, done:true }

// 用 for..of 遍历 myObject
for (var v of myObject) {
  console.log( v );
}
// 2
// 3