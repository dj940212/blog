#### 变量的类型

`undefined`, `number`, `string`, `boolean`属于简单的值类型.函数、数组、对象、null、new Number(10)都是对象。他们都是引用类型。

> 一切引用类型都是对象,对象是属性的集合

```js
typeof "x"  //string
typeof 10   //number
typeof true //boolean
typeof x    //undefine
typeof null  //object

typeof function(){}  //function


function(){} instanceof Object   //true
```

#### prototype原型

每个函数都有一个属性`prototype`.其属性值是一个对象,对象中默认只有一个`constructor`属性,默认指向函数本身.

#### __proto__隐式原型

1. 每个对象都有一个`__proto__`,可以称之为隐式原型,`__proto__`指向创建该对象函数的`prototype`.


2. `prototype`也是一个对象,那`fn.prototype.__proto__`指向哪里

``` js
fn.prototype.__proto__ === Object.prototype   //true
```

3. `Object.prototype.__proto__`指向`null`
4. 函数既是函数也是对象,所以函数既有`prototype`也有`__proto__`

```js
function fn(x, y) {
  return x + y
}

var fn1 = new Function('x', 'y', 'return x + y')
console.log(fn1(1+2))
```

5. 依据上述对象的`__proto__`指向创建该对象函数的`prototype`,所以...

```js
Object.__proto__ === Function.prototype  //true
Function.__proto__ === Function.prototype  //true
Function.prototype.__proto__ === Object.prototype  //true
```

#### instanceof

`Instanceof`运算符的第一个变量是一个对象，暂时称为A；第二个变量一般是一个函数，暂时称为B。

Instanceof的判断队则是：沿着A的__proto__这条线来找，同时沿着B的prototype这条线来找，如果两条线能找到同一个引用，即同一个对象，那么就返回true。如果找到终点还未重合，则返回false。

```js
Object instanceof Function   //true
Function instanceof Object   //true
Funtion instanceof Function  //true
```

由上我们可以得出如下关系

![](http://ovs5x36k4.bkt.clouddn.com/181637013624694.png)



#### 继承

1. JavaScript中的继承是通过原型链实现的
2. 访问一个对象的属性时，先在自身的属性中查找，如果没有，再沿着`__proto__`这条链向上找，这就是原型链
3. 可以用`hasOwnProperty`来区分一个属性是自身的还是原型链中的. `for..in..`循环中需要注意

```js
for(item in f1) {
  if(f1.hasOwnProperty){
    console.log(item)
  }
}
```



