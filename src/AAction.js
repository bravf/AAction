/*
    Copyright (c) 2014 bravf(bravfing@126.com)
*/

var AAction = function (){
    var AAction = {}

    var actionTable = {}
    var actionSelector = 'data-action'
    var paramSelector = 'data-param'

    function add(_actionTable){
        $.extend(true, actionTable, _actionTable||{})
    }

    function trigger(actionName, actionParam, context){
        if (!(actionName in actionTable)){
            printLog('Error:"' + actionName + '"未定义')
            return
        }
        return actionTable[actionName].call(window||context, actionParam)
    }

    function printLog(str){
        if (window.console && console.log){
            console.log(str)
        }
    }

    function toJSON(str){
        var obj, fn

        if (window.JSON && JSON.parse){
            fn = JSON.parse
        }
        else {
            fn = $.parseJSON
        }

        try{
            obj = fn(str)
        }
        catch (ex){
            printLog('Error:"' + str + '"JSON化失败!')
        }

        return obj
    }

    function getActions($dom){
        var actions = []
        var counter = 0

        for (;;++counter){
            var actionName = $dom.attr(actionSelector + '-' + counter)
            if (!actionName){
                break
            }
            var actionParam = $dom.attr(paramSelector + '-' + counter)

            if (actionParam === undefined){
                actionParam = '{}'
            }

            actions.push({
                name : actionName,
                param : toJSON(actionParam)
            })
        }

        return actions
    }

    function init(){
        var $boss = $(document.body || document.documentElement)
        $boss.on('click', '[' + actionSelector + '-0]', function (ev){
            ev.preventDefault()

            var actions = getActions($(this))
            var context = this

            $(actions).each(function (){
                var action = this
                trigger(action.name, action.param, context)
            })
        })
    }

    init()

    AAction.add = add
    AAction.trigger = trigger

    return AAction
}()