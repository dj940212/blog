## Javasvript深拷贝实现方式

实现深拷贝的方式有很多种

#### 最简单实现深拷贝的方法

``` js
var cloneObj = JSON.parse(JSON.stringify(obj))
```

> 这种方法简单易用,但是存在的问题很明显,拷贝的对象会丢弃构造函数,丢弃值为函数的属性,只会处理那些能被json直接表示的数据类型

#### 比较优雅的实现方式

1.对于一个对象,他可能存在属性值得类型为`Boolean`,`Number`,`Date`,`String`,`RegExp`,`Array`,`Object`,这些所有的对象的全部继承于`Object`

2.我们需要保留对象的构造函数的信息

``` js
Object.prototype.clone = function () {
    var Constructor = this.constructor;
    var obj = new Constructor();

    for (var attr in this) {
        if (this.hasOwnProperty(attr)) {
            if (typeof(this[attr]) !== "function") {
                if (this[attr] === null) {
                    obj[attr] = null;
                }
                else {
                    obj[attr] = this[attr].clone();
                }
            }
        }
    }
    return obj;
};
```

```Js
/* Method of Array */
Array.prototype.clone = function () {
    var thisArr = this.valueOf();
    var newArr = [];
    for (var i=0; i<thisArr.length; i++) {
        newArr.push(thisArr[i].clone());
    }
    return newArr;
};

/* Method of Boolean, Number, String*/
Boolean.prototype.clone = function() { return this.valueOf(); };
Number.prototype.clone = function() { return this.valueOf(); };
String.prototype.clone = function() { return this.valueOf(); };

/* Method of Date*/
Date.prototype.clone = function() { return new Date(this.valueOf()); };

/* Method of RegExp*/
RegExp.prototype.clone = function() {
    var pattern = this.valueOf();
    var flags = '';
    flags += pattern.global ? 'g' : '';
    flags += pattern.ignoreCase ? 'i' : '';
    flags += pattern.multiline ? 'm' : '';
    return new RegExp(pattern.source, flags);
};
```

> 可以保留`Boolean`,`Number`,`Date`,`String`,`RegExp`,`Array`,`Object`,会丢弃值为`Function`的属性

