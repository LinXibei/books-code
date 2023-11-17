/**
 * 原型
 * 在于原型链上层时 myObject.foo = "bar" 会出现的三种情况：
*/
// 如果在 [[Prototype]] 链上层存在名为 foo 的普通数据访问属性（参见第 3 章）并且没有, 被标记为只读（writable:false），那就会直接在 myObject 中添加一个名为 foo 的新属性，它是屏蔽属性

// 如果在 [[Prototype]] 链上层存在 foo，但是它被标记为只读（writable:false），那么无法修改已有属性或者在 myObject 上创建屏蔽属性。如果运行在严格模式下，代码会抛出一个错误。否则，这条赋值语句会被忽略。总之，不会发生屏蔽。

// 如果在 [[Prototype]] 链上层存在 foo 并且它是一个 setter（参见第 3 章），那就一定会调用这个 setter。foo 不会被添加到（或者说屏蔽于）myObject，也不会重新定义 foo 这个 setter

// 产生了隐式屏蔽
var anotherObject = {
  a:2
};
var myObject = Object.create( anotherObject );
anotherObject.a; // 2
myObject.a; // 2

anotherObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "a" ); // false
myObject.a++; // 隐式屏蔽！
anotherObject.a; // 2
myObject.a; // 3
myObject.hasOwnProperty( "a" ); // true
