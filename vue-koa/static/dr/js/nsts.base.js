var NSTS = NSTS || {};

APIURI = "http://172.16.254.49:82/";
//APIURI = "http://api.anjianba.cn/";
FileURL = "http://172.16.254.49:83/"
WSURI = "ws://172.16.254.49:8000";

//测消息的.默认读最后一个,测试阶段...


//MSGURI = "ws://172.16.254.49:8001";
MSGURI = "ws://52.80.4.155:8001";

$(function () {
    //nav 缩放 
    $(".header_top p strong").click(function () {
        if ($(this).hasClass("shen_s")) {
            $(".menu").animate({ width: '0px' });
            $(".main").animate({ marginLeft: '0px' });
            $(this).removeClass("shen_s");
        } else {
            $(".menu").animate({ width: '210px' });
            $(".main").animate({ marginLeft: '210px' });
            $(this).addClass("shen_s");
        }
    })
    $(".ul_list li div input.Validform_error").css("border-bottom", "solid 1px red")
})

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
//二级菜单导航宽度设置
window.onload = function () {
    $(".nav_list").width($(".nav_list li").length * 160);
};


NSTS.NET = {
    /*
	系统的 ajax 方法
    依赖jQuery
    这里只是对jq的ajax方法做个简单的封装,方便调用,不重复写代码而已.
    调用方法：
    NSTS.NET.GET(uri,para,callback);
    NSTS.NET.POST(uri,data,callback);
    NSTS.NET.PUT(uri,data,callback);
    NSTS.NET.DELETE(uri,callback);
	*/

    /*
    私有方法
    */
    __ajax: (function (uri, type, odata, callback) {
        console.log("【" + type + "】FROM【" + uri + "】");
        console.log("Data:");
        console.log(odata);
        $.ajax({
            type: type,
            url: uri,
            contentType: "application/json",
            data: JSON.stringify(odata),
            success: function (data) {
                console.log("Result Data:")
                console.log(data);
              
                callback(data);
            },
            error: function (data) {
                console.log(data);
            },
            headers: {
                "Authorization": "Bearer " + JSON.parse(getCookie("ticket")).access_token
            }
        })
    }),
    __ajaxSync: (function (uri, type, odata, callback) {
        $.ajax({
            type: type,
            url: uri,
            contentType: "application/json",
            data: JSON.stringify(odata),
            async: false,
            success: function (data) {
                callback(data);
            },
            error: function (data) {
                console.log(data);
            }
            , headers: {
                "Authorization": "Bearer " + JSON.parse(getCookie("ticket")).access_token
            }
        })
    }),

    /*
    获取资源的方法
    uri:资源路径
    para:参数
    callback:回调函数
    */
    GET: (function (uri, para, callback) {
        console.log("【GET】FROM【" + uri + "】");
        if (para != null) {
            console.log("Para:");
            console.log(para);
        }
        if (para != null) {
            uri += + "?" + para;
        }
        
        //fetch(uri, {
        //    header: {
        //        "Authorization": "Bearer " + JSON.parse(getCookie("ticket")).access_token
        //    }
        //}).then(function (response) {
        //    return response.json();
        //}).then(function (data) {
        //    callback(data);
        //}).catch(function (e) {
        //    console.log("error" + e);
        //});



        $.ajax({
            type: "GET",
            url: uri,
            success: function (data) {
                console.log("Result Data , show by your self !");
                callback(data);
            },
            error: function (data) {
                console.log(data);
            },
            // headers: {
            //     "Authorization": "Bearer " + JSON.parse(getCookie("ticket")).access_token
            // }
        })


    }),
    /*
    获取资源的方法
    uri:资源路径
    para:参数
    callback:回调函数
    */
    SYNCGET: (function (uri, para, callback) {
        if (para != null) {
            uri += + "?" + para;
        }
        $.ajax({
            type: "GET",
            url: uri,
            async: false,
            success: function (data) {
                callback(data);
            },
            error: function (data) {
                console.log(data);
            },
            headers: {
                "Authorization": "Bearer " + JSON.parse(getCookie("ticket")).access_token
            }
        })
    }),
    /*
    添加资源的方法
    data:要添加的资源
    uri:代表资源的的路径
    callback:回调函数
    */
    POST: (function (uri, data, callback) {
        this.__ajax(uri, "POST", data, callback);
    }),
    SYNCPOST: (function (uri, data, callback) {
        this.__ajaxSync(uri, "POST", data, callback);
    }),

    /*
   修改资源的方法
   uri:代表资源的绝对路径
   data:要修改的资源实体
   callback:回调函数
   */
    PUT: (function (uri, data, callback) {
        this.__ajax(uri, "PUT", data, callback);
    }),

    /*
    删除资源的方法
    uri:代表资源的绝对路径
    data:要修改的资源实体
    callback:回调函数
    */
    DELETE_F: (function (uri, data, callback) {
        this.__ajax(uri, "DELETE", data, callback);
    }),

    /*
    删除资源的方法
    uri:代表资源的绝对路径
    callback:回调函数
    */
    DELETE: (function (uri, callback) {
        console.log("【Delete】FROM【" + uri + "】");

        $.ajax({
            type: "DELETE",
            url: uri,
            headers: {
                "Authorization": "Bearer " + JSON.parse(getCookie("ticket")).access_token
            },
            success: function (data) {
                console.log("DELETE Result:");
                console.log(data);
                callback(data);
            },
            error: function (data) {
                console.log(data);
            }
        })
    })
}