/**
 * 对象
*/

// 对象属性描述符
var obj = {
  a: 2
}
Object.getOwnPropertyDescriptor(obj, a)
// {
// value: 2,
// writable: true, 
// enumerable: true,
// configurable: true
// }

// 1.writable
// writable:false 看作是属性不可改变，相当于你定义了一个空操作 setter。

// 2.Configurable
// 只要属性是可配置的，就可以使用 defineProperty(..) 方法来修改属性描述符
// 注意： 即便属性是 configurable:false，我们还是可以
// 把 writable 的状态由 true 改为 false，但是无法由 false 改为 true
var myObject = {
  a:2
};
myObject.a = 3;
myObject.a; // 3
Object.defineProperty( myObject, "a", {
  value: 4,
  writable: true,
  configurable: false,
  enumerable: true
});
myObject.a; // 4
myObject.a = 5;
myObject.a; // 5
Object.defineProperty(myObject, "a", {
  value: 6,
  writable: true,
  configurable: true,
  enumerable: true
}); // TypeError

// configurable:false 还会禁止删除这个属性
var myObject = {
  a:2
};
myObject.a; // 2
delete myObject.a;
myObject.a; // undefined
Object.defineProperty( myObject, "a", {
  value: 2,
  writable: true,
  configurable: false,
  enumerable: true
});
myObject.a; // 2
delete myObject.a; // !!不要把 delete 看作一个释放内存的工具!!
myObject.a; // 2

// 3.Enumerable
// false时，这个属性就不会出现在枚举中，虽然仍然可以正常访问它。
// in 和 hasOwnProperty的区别在于是否查找[[prototype]]链

/**
 * 不变性
*/
// 1.常量
// 结合 writable:false 和 configurable:false 就可以创建一个真正的常量属性（不可修改、重定义或者删除）
var myObject = {};
Object.defineProperty( myObject, "FAVORITE_NUMBER", {
  value: 42,
  writable: false,
  configurable: false
});
// 2.禁止扩展
// 如 果 你 想 禁 止 一 个 对 象 添 加 新 属 性 并 且 保 留 已 有 属 性， 可 以 使 用 Object.preventExtensions(..)
var myObject = {
  a: 2
}
Object.preventExtensions(myObject)
myObject.b = 3
myObject.b // undefined
// 3.密封
// Object.seal(..) 会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用 Object.preventExtensions(..) 并把所有现有属性标记为 configurable:false
// 密封之后不仅不能添加新属性，也不能重新配置或者删除任何现有属性（虽然可以修改属性的值）

// 4.冻结
// Object.freeze(..) 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用 Object.seal(..) 并把所有“数据访问”属性标记为 writable:false，这样就无法修改它们的值
// 级别最高的不可变性，可能会冻结其他共享对象

// object.create polyfill

if (!Object.create) {
  Object.create = function(o) {
    function F() {}
    F.prototype = o
    return new F()
  }
}