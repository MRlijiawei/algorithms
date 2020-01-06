//1vue原理
function vue() {
    this.$data = {a:1}
    this.el = document.getElementById('app')
    this.virtualdom = ''
    this.observer(this.$data)
    this.render()
}
vue.prototype.observer = function(obj){
    // var value
    // var self = this
    // for (var key in obj) {
    //     value=obj[key]
    //     if(typeof value==='object'){
    //         this.observer(value)
    //     } else {
    //         Object.defineProperty(this.$data.key,{
    //             get: function () {
    //                 // 依赖收集
    //                 return value
    //             },
    //             set: function (newVal) {
    //                 value = newVal
    //                 self.render()
    //             }
    //         })
    //     }
    // }
    // 以上是vue2写法，以下是3写法
    var self = this
    this.$data=new Proxy(this.$data,{
        get(target,key,recevier) {
            // console.log(target,key,recevier)
            return target[key]
        },
        set(target,key,value,recevier){
            return Reflect.set(target, key, value)
            // return target[key] = value
        }
    })
}
vue.prototype.render=function () {
    this.virtualdom='i am' + this.$data.a
    this.el.innerHTML = this.virtualdom
}
//vue是dep.depend()收集依赖，刷新时只刷新关联依赖的节点

// 2.数组监听。只有使用方法才能触发更新。装饰者模式
var arrayPro = Array.prototype
var arrayBk = Object.create(arrayPro)//避免影响原型
var arr = ['push','pop','shift']
arr.forEach(function(method, index){
    arrayBk[method]= function() {
        var ret = arrayPro[method].apply(this,arguments)
        dep.notify()
    }
})
// 提高代码质量,学习设计模式。先学透-然后去看优秀源码体会-再结合工作实际场景思考应用

//3.vue3- Proxy
var ob={
    a:1,b:2
}
// 就不需要借助外部val变量了
var obj = new Proxy(ob,{
    get(target,key,recevier) {
        console.log(target,key,recevier)
        return target[key]
    },
    set(target,key,value,recevier){
        return Reflect.set(target, key, value)
        // return target[key] = value
    }
})
// Proxy不会像2一样直接修改原对象
// 不用for in，可以监听数组，

// 4.Proxy的其他用处
// 4.1类型验证
// 如，一个对象，中国人，age是数组，大于18
// 策略模式
var validator = {
    name:function (value) {
        var reg = /^[\u4E00-\u9FA5]+$/
        if(typeof value==='string' && reg.test(value)) {
            return true
        }
        return false
    },
    //age: ...
}
function person(age,name){
    this.age = age
    this.name = name
    return new Proxy(this,{
        get: function(target,key){
            return target[key]
        },
        set:function (target,key,value) {
            if (validator[key](value)) {
                return Reflect.set(target,key,value)
            } else {
                throw new Error(`${key} is not right`)
            }
        }
    })
}
// 4.2真正的私有变量（见vue router）

// 5.虚拟dom（ast语法树）
<template>
    <div id="123">
        <p>{{mes}}</p>
        <p>1</p>
        <p>2</p>
    </div>
</template>

diff <div>
    props: {
        id:123
    }
    children:[
        diff <p>
        props:...
        children:...
        text:...
    ]

//6.diff算法
xxx(oldNode, vNode){
    //拿出真实dom
    //拿出老节点子元素和新节点子元素
    //如果相同，return
    //如果不同且都不为空，set；否则，更新节点，如果children变化，更新children，新增或删除
}