var AAction = function (){
    var AAction = {}

    var actionTable = {}
    var actionSelector = 'data-action'
    var paramSelector = 'data-param'

    function add(_actionTable){
        $.extend(true, actionTable, _actionTable||{})
    }

    function trigger(actionName, actionParam, context){
        return actionTable[actionName].call(window||context, actionParam)
    }

    function toJSON(str){
        var obj
        var fn

        if ($.parseJSON){
            fn = $.parseJSON
        }
        else {
            if (window.JSON && JSON.parse){
                fn = JSON.parse
            }
        }

        try{
            obj = fn(str)
        }
        catch (ex){
            if (window.console){
                console.error(str+' json化失败')
            }
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