function Parent () {
  this.name = 'kevin';
}

Parent.prototype.getName = function () {
  console.log(this.name);
}

function Child () {

}

// 1. 原型链继承

Child.prototype = new Parent();

// 2. 借用构造函数
function Child () {
  Parent.call(this);
}

// 3. 组合继承
function Child() {
  Parent.call();
}

Child.prototype = new Child();
Child.prototype.constructor = Child;

// 4. 原型式继承
function createObj(obj) {
  function  F(){}
  F.prototype = 0;
  return new F();
}

// 5. 寄生式继承
function createObj(obj) {
  var clone = Object.create(obj);
  clone.sayName = function () {
    console.log('hi')
  };

  return clone;
}