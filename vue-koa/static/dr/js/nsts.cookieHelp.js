//根据指定名称获取Cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return decodeURIComponent(arr[2]);
    else
        return null;
}

//删除指定Cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+ "; path=/";
}

///设置Cookie值
//time参数：
//        s20是代表20秒, 
//        h是指小时，如12小时则是：h12
//        d是天数，30天则：d30
function setCookie(name, value, time) {
    if (time == undefined) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
    }
    else {
        var strsec = getsec(time);
        var exp = new Date();
        exp.setTime(exp.getTime() + strsec * 1);
        document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toGMTString() + "; path=/";
    }
}

///取时函数
function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    }
    else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    }
    else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}

(function ($) {

    //插件扩展方法
    $.extend({
        "Nsts_GetUserID": function () {
            return JSON.parse(getCookie("ticket")).userID;
        }
    });

    //插件扩展方法
    $.extend({
        "Nsts_GetUserAvatar": function () {
            return JSON.parse(getCookie("ticket")).avatar;
        }
    });
    $.extend({
        "Nsts_CloseFullPage": function () {
            $("#fullpage-content").empty();
            $("#fullpage").hide();
            $('#main').show()
        }
    })
})(window.jQuery);
