/**
 * this用法
 * 
*/
var obj = {
  id: "cool",
  cool: function coolFn() {
    console.log(this.id);
  } 
}

var id = "not cool";
obj.cool();
// cool() 函数丢失了同 this 之间的绑定。
setTimeout(obj.cool, 20) // not cool

// 解决上述问题，我们引入self = this
var obj = {
  count: 0,
  cool: function coolFn() {
    var self = this;
    if (self.count < 1) {
      setTimeout(function timer() {
        self.count++;
        console.log("awesome?")
      }, 100)
    }
  }
}
obj.cool() // awesome? 

// 引入箭头函数
// 当前的词法作用域覆盖了this的值
var obj = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout(() => {
        this.count++;
        console.log("awesome?")
      }, 100)
    }
  }
}
obj.cool() // awesome? 

// 或者使用bind
var obj = {
  count: 0,
  cool: function coolFn() {
    if (this.count < 1) {
      setTimeout(function timer() {
        this.count++;
        console.log("more awesome")
      }.bind(this), 100)
    }
  }
}
obj.cool()