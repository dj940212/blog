## 执行上下文

### 什么是执行上下文

- 变量,函数表达式(变量声明,默认赋值为`undefined`)
- `this`(赋值)
- 函数声明(赋值)

这三种数据的准备情况称之为"执行上下文"或者"执行上下文环境". 

函数每被调用一次,都会产生一个新的执行上下文环境.因为不同的调用会有不同的参数

```js
function fn(x) {
  console.log(arguments)  //[10]
  console.log(x)          //10
}
```

### 执行上下文栈

执行全局代码时，会产生一个执行上下文环境，每次调用函数都又会产生执行上下文环境。当函数调用完成时，这个上下文环境以及其中的数据都会被消除，再重新回到全局上下文环境。处于活动状态的执行上下文环境只有一个。执行上下文环境变换的过程其实就是一个压栈出栈的过程

![](http://images.cnitblog.com/blog/138012/201409/232125295149083.png)

## this取值的四种情况

在函数中this到底取何值，是在函数真正被调用执行的时候确定的，函数定义的时候确定不了。因为this的取值是执行上下文环境的一部分，每次调用函数，都会产生一个新的执行上下文环境.

###构造函数

当函数作为构造函数创建一个对象的时候, `this`指向即将创建的对象. 而当函数直接执行的时候,`this`指向全局

```js
function Foo() {
  this.name = "jack"
  this.age = 18
  console.log(this)  // {name: 'jack, age: 18}
}
new Foo()


function Foo() {
  this.name = "jack"
  this.age = 18
  console.log(this)  // Window {top:Window, window: Window, location: Location}
}
Foo()
```

###函数作为对象的一个属性

如果函数作为对象的一个属性时，并且作为对象的一个属性被调用时，函数中的`this`指向该对象。

```js
var obj = {
  x: 10,
  fn: function() {
    console.log(this)   // Object {x:10, fn: function}
    console.log(this.x) // 10
  }
}

obj.fn()
```

如果`fn`函数被赋值到了另一个变量中，并没有作为`obj`的一个属性被调用，那么`this`的值就是`window`，`this.x`为`undefined`。

``` js
var obj = {
  x: 10,
  fn: function() {
    console.log(this)   // Window {top:Window, window: Window, location: Location}
    console.log(this.x) // undefined
  }
}

var fn1 =  obj.fn
fn1()
```

### 函数用call和apply调用

当一个函数被`call`和`apply`调用时,`this`的值就是传入对象的值. 

``` js
var obj = {
  x: 10
}
var fn = function() {
  console.log(this)  //Object  {x:10}
  console.log(this.x)  //10
}
fn.call(obj)
```

### 全局&调用普通函数

在全局环境下,`this`永远是`Window`, 普通函数在调用时, `this`也是`Window`

```js
console.log(this)  // Window {top:Window, window: Window, location: Location}

function fn() {
  console.log(this)  // Window {top:Window, window: Window, location: Location}  
}
fn()
```

下面的情况虽然`fn`是在`obj.fn`内部定义的,但它仍然是一个普通函数,`this`仍然指向`window`

```js
var obj = {
  x: 10,
  fn: function() {
  	function f() {
      console.log(this)   // Window {top:Window, window: Window, location: Location}
      console.log(this.x) // undefined
  	}
    f()
  }
}
obj.fn()
```



## 作用域

- `JavaScript`没有块级作用域,
- 除了全局作用域之外,只有函数可以创建作用域
- 作用域有上下级的关系. 作用域最大的用处是隔离变量, 不同作用域下同名变量不会有冲突.
- 作用域中变量的值是在执行过程中产生的确定的，而作用域却是在函数创建时就确定了
- 同一个作用域下，不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值, 如果要查找一个作用域下某个变量的值，就需要找到这个作用域对应的执行上下文环境，再在其中寻找变量的值

![](http://images.cnitblog.com/blog/138012/201409/241708372951952.png)



## 自由变量&作用域链

### 什么是自由变量?

在A作用域中使用的变量x，却没有在A作用域中声明（即在其他作用域中声明的），对于A作用域来说，x就是一个自由变量

``` js
var x = 10
function() {
  var b = 20
  console.log(x+b)
}
```

### 在哪获取自由变量的值

如果要获取自由变量的值, 并不是在函数父级作用域中获取,而是在`创建这个函数的作用域中获取`

```js
var x = 10
function fn() {
  console.log(x)
}
function show(fn) {
  var x = 20
  (function() {
    fn()   //10 不是20
  })()
}

show(fn)
```



## 闭包

### 闭包的概念

- 能够读取其他函数内部变量的函数就是闭包

### 闭包应用的两种情况

- 函数作为返回值
- 函数作为参数