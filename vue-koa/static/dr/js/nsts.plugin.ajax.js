//Ajax请求插件封装（依赖NstsLayer）
(function ($) {

    //插件默认参数
    var defaluts = {
        type:'GET',
        url: '',
        //data:
        dataType: 'json',//xml,html,script,json,jsonp,text
        timeout: 12000,//12秒过期时间
        //async: false,
        cache:false,//不启用缓存
        dataFilter: function (data, type)
        {
            return data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
        	var message = XMLHttpRequest.statusText + "(" + XMLHttpRequest.status + "):" + XMLHttpRequest.responseText;
        	//alert(message);
        },
        success: function (data, textStatus) {

        },
        complete: function (XMLHttpRequest, textStatus) {
            
        }
    };

    //ajax核心函数
    function AjaxCore(options) {

        defaluts.headers = {
            "Authorization": "Bearer " + JSON.parse(getCookie("ticket")).access_token
        }
        var ajaxOptions = $.extend({}, defaluts, options);
        $.ajax(ajaxOptions);
    }

    //插件扩展方法
    $.extend({
        "NstsGET": function (url,data, success, options) {
            var getOptions;
            var customOptions = {
                url: url
            }
            if (data != undefined || data != null)
            {
                customOptions.data=data;
            }
            if (success != undefined)
            {
                customOptions.success = success
            }
            if (options != undefined) {
                getOptions = $.extend({}, customOptions, options);
            }
            else {
                getOptions = customOptions;
            }
            AjaxCore(getOptions);
        },
        "NstsPOST": function (url, data, success, options) {
            var postOptions;
            var customOptions = {
                type:'POST',
                url: url,
                data:data
            }
            if (success != undefined) {
                customOptions.success = success
            }
            if (options != undefined) {
                postOptions = $.extend({}, customOptions, options);
            }
            else {
                postOptions = customOptions;
            }
            AjaxCore(postOptions);
        },
        "NstsPUT": function (url, data, success, options) {
            var putOptions;
            var customOptions = {
                type: 'PUT',
                url: url,
                data: data
            }
            if (success != undefined) {
                customOptions.success = success
            }
            if (options != undefined) {
                putOptions = $.extend({}, customOptions, options);
            }
            else {
                putOptions = customOptions;
            }
            AjaxCore(putOptions);
        },
        "NstsDEL": function (url) {
            var deleteOptions;
            var customOptions = {
                type: 'Delete',
                url: url
            }
            switch (arguments.length) {
                case 1:
                    deleteOptions = customOptions;
                    break;
                case 2:
                    var arg_type = typeof (arguments[1]);
                    if (arg_type == "function") {
                        customOptions.success = arguments[1];
                    }
                    else {
                        customOptions.data = arguments[1];
                    }
                    deleteOptions = customOptions;
                    break;
                case 3:
                    //处理第二个参数(只能是data或者success)
                    var arg_type2 = typeof (arguments[1]);
                    if (arg_type2 == "function") {
                        customOptions.success = arguments[1];
                    }
                    else {
                        customOptions.data = arguments[1];
                    }
                    //处理第三个参数（只能是success或者options）
                    var arg_type3 = typeof (arguments[2]);
                    if (arg_type3 == "function") {
                        customOptions.success = arguments[2];
                        deleteOptions = customOptions;
                    }
                    else {
                        if (arg_type3 == "object")
                        {
                            deleteOptions = $.extend({}, customOptions, arguments[2]);
                        }
                    }
                    break;
                case 4:
                    customOptions.data = arguments[1];
                    customOptions.succcess = arguments[2];
                    deleteOptions = $.extend({}, customOptions, arguments[3]);
                    break;
                default:
                    throw 'Error（NET.DELETE）:非法的参数个数';
            }
            AjaxCore(deleteOptions);
        }
    });

})(window.jQuery);