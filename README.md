AAction
=======

>* 依赖jQuery或者Zepot
>* 支持多方法绑定
>* 支持传入参数

```
<div
    data-action-0='ie6Console' data-param-0='{"keyword":"我是ie6"}'
    data-action-1='chromeConsole' data-param-1='{"hello":"world"}'
    data-action-2='hasNoParam'
    data-action-3='otherParam' data-param-3='123'
    data-action-4='hehe'
    >
    点我
</div>
<script>
AAction.add({
    'ie6Console' : function (param){
        alert(param.keyword)
    },
    'chromeConsole' : function (param){
        window.console && console.log(param)
    },
    'hasNoParam' : function (){
        alert('没有参数')
    },
    'otherParam' : function (param){
        alert(param)
    }
})
</script>
```

