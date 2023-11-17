/**
 * 面向委托的设计
*/

// 类理论
class Task {
  id;
  // 构造函数 Task()
  Task(ID) { id = ID; }
  outputTask() { output( id ); }
}
class XYZ inherits Task {
  label;
  // 构造函数 XYZ()
  XYZ(ID,Label) { super( ID ); label = Label; }
  outputTask() { super(); output( label ); }
}
class ABC inherits Task {
  // ...
}

// 委托
Task = {
  setID: function(ID) { this.id = ID; },
  outputID: function() { console.log( this.id ); }
};
// 让 XYZ 委托 Task
XYZ = Object.create( Task );
XYZ.prepareTask = function(ID,Label) {
  this.setID( ID );
  this.label = Label;
};
XYZ.outputTaskDetails = function() {
  this.outputID();
  console.log( this.label );
};


// 典型的（原型）面向对象风格
// 子类 Bar 继承了父类 Foo，然后生成了 b1 和 b2 两个实例。b1 委托了 Bar.prototype，后者委托了 Foo.prototype
function Foo(who) {
  this.me = who;
}
Foo.prototype.identify = function() {
  return "I am " + this.me;
};
function Bar(who) {
  Foo.call( this, who );
}
Bar.prototype = Object.create( Foo.prototype );
Bar.prototype.speak = function() {
  alert( "Hello, " + this.identify() + "." );
};
var b1 = new Bar( "b1" );
var b2 = new Bar( "b2" );
b1.speak();
b2.speak();

// 对象关联风格
Foo = {
  init: function(who) {
    this.me = who;
  },
  identify: function() {
    return "I am " + this.me;
  }
};
Bar = Object.create( Foo );
Bar.speak = function() {
  alert( "Hello, " + this.identify() + "." );
};
var b1 = Object.create( Bar );
b1.init( "b1" );
var b2 = Object.create( Bar );
b2.init( "b2" );
b1.speak();
b2.speak();
