/**
 * 混合对象的类
*/
// 多态：任何方法都可以引用继承层次中高层的方法

// 1.显式混入
// 能在许多库和框架中被称为extend(..)，但是为了方便理解我们称之为 mixin(..)。
function mixin(sourceObj, targetObj) {
  for (var key in sourceObj) {
    if (!(key in targetObj)) {
      targetObj[key] = sourceObj[key]
    }
  }
  return targetObj
}
var Vehicle = {
  engines: 1,
  ignition: function() {
    console.log( "Turning on my engine." );
  },
  drive: function() {
    this.ignition();
    console.log( "Steering and moving forward!" );
  }
}
var Car = mixin( Vehicle, {
  wheels: 4,
  drive: function() {
    // 显式多态
    Vehicle.drive.call( this );
    console.log(
      "Rolling on all " + this.wheels + " wheels!"
    );
  }
})
// 混合复制
function mixin( sourceObj, targetObj ) {
  for (var key in sourceObj) {
    targetObj[key] = sourceObj[key];
  }
  return targetObj;
}
var Vehicle = {
// ...
};
  // 首先创建一个空对象并把 Vehicle 的内容复制进去
  // 这两种方法都可以把不重叠的内容从 Vehicle 中显性复制到 Car 中
  // Car 中混合了 Vehicle 的内容
var Car = mixin( Vehicle, { } );
  // 然后把新内容复制到 Car 中
mixin( {
  wheels: 4,
  drive: function() {
  // ...
  }
}, Car );

// 寄生继承
// 显式混入模式的一种变体被称为“寄生继承”，它既是显式的又是隐式的，
//“传统的 JavaScript 类”Vehicle
function Vehicle() {
  this.engines = 1;
}
Vehicle.prototype.ignition = function() {
  console.log( "Turning on my engine." );
};
Vehicle.prototype.drive = function() {
  this.ignition();
  console.log( "Steering and moving forward!" );
};
//“寄生类”Car
function Car() {
  // 首先，car 是一个 Vehicle
  var car = new Vehicle();
  // 接着我们对 car 进行定制
  car.wheels = 4;
  // 保存到 Vehicle::drive() 的特殊引用
  var vehDrive = car.drive;
  // 重写 Vehicle::drive()
  car.drive = function() {
    vehDrive.call( this );
    console.log(
      "Rolling on all " + this.wheels + " wheels!"
    );
  }
  return car;
}
var myCar = new Car();
myCar.drive();
// 发动引擎。
// 手握方向盘！
// 全速前进！

// 2.隐式混入
var Something = {
  cool: function() {
    this.greeting = "Hello World";
    this.count = this.count ? this.count + 1 : 1;
  }
}
Something.cool();
Something.greeting; // "Hello World"
Something.count; // 1
var Another = {
  cool: function() {
  // 隐式把 Something 混入 Another
    Something.cool.call( this );
  }
};
Another.cool();
Another.greeting; // "Hello World"
Another.count; // 1（count 不是共享状态）