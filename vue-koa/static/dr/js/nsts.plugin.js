document.writeln("<style>");
document.writeln("*{ padding:0px; margin:0px;box-sizing:border-box;}");
document.writeln(".sweet-overlay{background-color: black; opacity:0.4; background:#000;position: fixed;left: 0;right: 0;top: 0;bottom: 0;display: none;z-index: 10000;display: none;}");
document.writeln(".showSweetAlert{background-color: white;font-family: \'Roboto\', sans-serif;width:566px;padding: 17px;border-radius: 4px;text-align: center;position: fixed;left: 50%;top: 50%;margin-left:-300px; margin-top:-150px;overflow: hidden;display: none;z-index: 99999; min-height:300px;max-height:330px;border-radius: 4px; padding: 15px; display: none;}");
document.writeln(".showSweetAlert.active{-webkit-animation: showSweetAlert 0.3s; animation: showSweetAlert 0.3s;}");
document.writeln(".Info h2, .failure h2, .succeed h2{color: #575757;font-size:25px;text-align: center;font-weight: 300;text-transform: none;position: relative;margin: 30px 0 20px;padding: 0;line-height: 40px;display: block;}");
/*提示信息*/
document.writeln(".sa-icon1{width: 80px;height: 80px;border: 4px solid #F8BB86;-webkit-border-radius: 40px;border-radius: 40px;border-radius: 50%;margin: 20px auto;padding: 0;position: relative;box-sizing: content-box; }");
document.writeln(".sa-body{position: absolute;width: 5px;height: 47px;left: 50%;top: 10px;-webkit-border-radius: 2px;border-radius: 2px;margin-left: -2px;background-color: #F8BB86;}");
document.writeln(".sa-dot{position: absolute;width: 7px;height: 7px;-webkit-border-radius: 50%;border-radius: 50%;margin-left: -3px;left: 50%;bottom: 10px;background-color: #F8BB86;}");
document.writeln(".pulseWarning {-webkit-animation: pulseWarning 0.75s infinite alternate;animation: pulseWarning 0.75s infinite alternate;}");
document.writeln(".pulseWarningIns {-webkit-animation: pulseWarningIns 0.75s infinite alternate;animation: pulseWarningIns 0.75s infinite alternate;}");
/*失败状态*/
document.writeln(".icon{width: 80px;height: 80px;border: 4px solid gray;border-radius: 50%;margin: 20px auto;position: relative;box-sizing: content-box;}");
document.writeln(".error {border-color: #d43f3a;color: #ff5b5b;font-size: 12px;font-weight: 500;}");
document.writeln(".line{position: absolute;height: 5px;width: 47px;background-color: #d9534f;display: block;top: 37px;border-radius: 2px;}");
document.writeln(".line.left {-webkit-transform: rotate(45deg);transform: rotate(45deg);left: 17px;}");
document.writeln(".line.right {-webkit-transform: rotate(-45deg);transform: rotate(-45deg);right: 16px;}");
document.writeln(".animateErrorIcon {-webkit-animation: animateErrorIcon 0.5s;animation: animateErrorIcon 0.5s;}");
document.writeln("{color: #575757;font-size: 30px;text-align: center;font-weight: 300;text-transform: none;position: relative;margin: 20px 0;padding: 0;line-height: 40px;display: block;}");
document.writeln(".x-mark{position: relative;display: block;}");
document.writeln(".animateXMark {-webkit-animation: animateXMark 0.5s;animation: animateXMark 0.5s;}");
document.writeln("@-webkit-keyframes animateXMark {0% {transform: scale(0.4);-webkit-transform: scale(0.4);margin-top: 26px;opacity: 0;}50% {transform: scale(0.4);-webkit-transform: scale(0.4);margin-top: 26px;opacity: 0;}80% {transform: scale(1.15);-webkit-transform: scale(1.15);margin-top: -6px;}100% {transform: scale(1);-webkit-transform: scale(1);margin-top: 0;opacity: 1;}}");
document.writeln("@keyframes animateXMark {0% {transform: scale(0.4);-webkit-transform: scale(0.4);margin-top: 26px;opacity: 0;}50% {transform: scale(0.4);-webkit-transform: scale(0.4);margin-top: 26px;opacity: 0;}");
document.writeln("  80% {transform: scale(1.15);-webkit-transform: scale(1.15);margin-top: -6px;}100% {transform: scale(1);-webkit-transform: scale(1);margin-top: 0;opacity: 1;}}");
/*成功状态*/
document.writeln(".sa-icon2{width: 80px;height: 80px;border: 4px solid #eff8e5;-webkit-border-radius: 40px;border-radius: 40px;border-radius: 50%;margin: 20px auto;padding: 0;position: relative;box-sizing: content-box; }");
document.writeln(".sa-placeholder{width: 80px;height: 80px;border: 4px solid #eff8e5;-webkit-border-radius: 40px;border-radius: 40px;border-radius: 50%;box-sizing: content-box;position: absolute;left: -4px;top: -4px;z-index: 2; display:none}");
document.writeln(".sa-fix{width: 5px;height: 90px;background-color: white;position: absolute;left: 28px;top: 8px;z-index: 1;-webkit-transform: rotate(-45deg);transform: rotate(-45deg);display:none}");
document.writeln(".sa-fix:after{border-radius: 0 120px 120px 0;top: -11px;left: 30px;-webkit-transform: rotate(-45deg);transform: rotate(-45deg);-webkit-transform-origin: 0px 60px;transform-origin: 0px 60px;content: \'\';-webkit-border-radius: 40px;border-radius: 40px; border-radius: 50%;position: absolute;width: 60px;height: 120px;background: white;-webkit-transform: rotate(45deg);transform: rotate(45deg);}");
document.writeln(".sa-line{height: 5px;background-color: #A5DC86;display: block;border-radius: 2px;position: absolute;z-index: 2;}");
document.writeln(".sa-tip{width: 25px;left: 14px;top: 46px;-webkit-transform: rotate(45deg);transform: rotate(45deg);}");
document.writeln(".sa-long{width: 47px;right: 8px;top: 38px;-webkit-transform: rotate(-45deg);transform: rotate(-45deg);}");
document.writeln(".animateSuccessTip {-webkit-animation: animateSuccessTip 0.75s;animation: animateSuccessTip 0.75s;}");
document.writeln(".animateSuccessLong {-webkit-animation: animateSuccessLong 0.75s;animation: animateSuccessLong 0.75s;}");
document.writeln(".sa-icon.sa-success.animate::after {-webkit-animation: rotatePlaceholder 4.25s ease-in;animation: rotatePlaceholder 4.25s ease-in;}");
/*提示信息------失败button*/
document.writeln(".cancel1{box-shadow: none !important;margin: 26px 15px 0 15px;padding:7px 32px;font-size: 17px;color: white;border: none;cursor: pointer; background: #757575;-webkit-border-radius: 4px;border-radius: 4px;font-weight: 500;font-family: inherit; outline: none;display: inline-block;}");
document.writeln(".cancel1:hover{background: #616161;}");
document.writeln(".confirm1, .confirm2{box-shadow: none !important;margin: 26px 15px 0 15px;padding:7px 32px;font-size: 17px;color: white;border: none;cursor: pointer; background:#ff5b5b;-webkit-border-radius: 4px;border-radius: 4px;font-weight: 500;font-family: inherit; outline: none;display: inline-block;}");
document.writeln(".confirm1:hover, .confirm2:hover{background:#ff4242}");
/*成功button*/
document.writeln(".confirm3{box-shadow: none !important;margin: 26px 5px 0 5px;padding:7px 32px;font-size: 17px;color: white;border: none;cursor: pointer; background:rgb(76, 175, 80);-webkit-border-radius: 4px;border-radius: 4px;font-weight: 500;font-family: inherit; outline: none;}");
document.writeln(".confirm3:hover{background:rgb(73, 168, 77)}");
/*窗口*/
document.writeln("@-webkit-keyframes showSweetAlert {0% {transform: scale(0.7);-webkit-transform: scale(0.7);}45% {transform: scale(1.05);-webkit-transform: scale(1.05);}80% {transform: scale(0.95);-webkit-transform: scale(0.95);}100% {transform: scale(1); -webkit-transform: scale(1); }}");
document.writeln("@keyframes showSweetAlert {0% {transform: scale(0.7);-webkit-transform: scale(0.7);}45% {transform: scale(1.05);]-webkit-transform: scale(1.05);}80% {transform: scale(0.95);-webkit-transform: scale(0.95);}100% {transform: scale(1);-webkit-transform: scale(1);}}");
document.writeln("@-webkit-keyframes hideSweetAlert {0% {transform: scale(1);-webkit-transform: scale(1);}100% {transform: scale(0.5);-webkit-transform: scale(0.5);}}");
document.writeln("@keyframes hideSweetAlert {0% {transform: scale(1);-webkit-transform: scale(1);}100% {transform: scale(0.5);-webkit-transform: scale(0.5);}}");
/*提示信息function*/
document.writeln("@-webkit-keyframes pulseWarning {0% { border-color: #F8D486;}100% {border-color: #F8BB86}}");
document.writeln("@keyframes pulseWarning {0% {border-color: #F8D486;}100% {border-color: #F8BB86;}}");
document.writeln("@-webkit-keyframes pulseWarningIns {0% {background-color: #F8D486;}100% {background-color: #F8BB86;}}");
document.writeln("@keyframes pulseWarningIns {0% {background-color: #F8D486;}100% {background-color: #F8BB86;}}");
/*失败function*/
document.writeln("@-webkit-keyframes animateErrorIcon {0% {transform: rotateX(100deg);-webkit-transform: rotateX(100deg);opacity: 0;}100% {transform: rotateX(0deg);-webkit-transform: rotateX(0deg);opacity: 1;}}");
document.writeln("@keyframes animateErrorIcon {0% {transform: rotateX(100deg);-webkit-transform: rotateX(100deg);opacity: 0;}100% {transform: rotateX(0deg);-webkit-transform: rotateX(0deg);opacity: 1;}}");
/*成功function*/
document.writeln("@-webkit-keyframes animateSuccessTip {0% {width: 0;left: 1px;top: 19px;}54% {width: 0;left: 1px;top: 19px;}70% {width: 50px;left: -8px;top: 37px;}84% {width: 17px;left: 21px;top: 48px;}100% {width: 25px;left: 14px;top: 45px;}}");
document.writeln("@keyframes animateSuccessTip {0% {width: 0;left: 1px;top: 19px;}54% {width: 0;left: 1px;top: 19px;}70% {width: 50px;left: -8px;top: 37px;}84% {width: 17px;left: 21px;top: 48px;}100% {width: 25px;left: 14px;top: 45px;}}");
document.writeln("@-webkit-keyframes animateSuccessLong {0% {width: 0;right: 46px;top: 54px;}65% {width: 0;right: 46px;top: 54px;}84% {width: 55px;right: 0px; top: 35px;}100% {width: 47px;right: 8px;top: 38px;}}");
document.writeln("@keyframes animateSuccessLong {0% {width: 0;right: 46px;top: 54px;}65% {width: 0;right: 46px;top: 54px;}84% {width: 55px;right: 0px;top: 35px;}100% {width: 47px;right: 8px;top: 38px;}}");
document.writeln("</style>");
document.writeln("<div class=\"sweet-overlay\"></div>");
/*信息提示框*/
document.writeln("<div class=\"showSweetAlert Info\"><div class=\"sa-icon1 sa-warning pulseWarning\"><span class=\"sa-body pulseWarningIns\"></span><span class=\"sa-dot pulseWarningIns\"></span></div><h2></h2><div class=\"sa-button-container\"><button class=\"cancel1\">取消</button><button class=\"confirm1\">确定</button></div></div>");
/*失败提示框*/
document.writeln("<div class=\"showSweetAlert failure\"><div class=\"icon error animateErrorIcon\"><span class=\"x-mark animateXMark\"><span class=\"line left\"></span><span class=\"line right\"></span></span></div><h2></h2> <div class=\"sa-button-container\"><button class=\"confirm2\" >确定</button></div></div>");
/*成功提示框*/
document.writeln("<div class=\"showSweetAlert succeed\"><div class=\"sa-icon2 sa-success animate\"><span class=\"sa-line sa-tip animateSuccessTip\"></span><span class=\"sa-line sa-long animateSuccessLong\"></span><div class=\"sa-placeholder\"></div><div class=\"sa-fix\"></div></div><h2></h2><div class=\"sa-button-container\"><button class=\"confirm3 sure success\">ok!</button></div></div>");
//页面信息提示
var NSTS = NSTS || {};



NSTS.Plugin = {
    Alert: (function () {
        return {
            Success: function (msg,callback) {
                msg = msg == undefined ? "操作成功." : msg;
                $(".sweet-overlay").show();
                $(".succeed").addClass("active").show();
                $(".succeed h2").text(msg);
                $(".success").unbind('click');
                $(".success").click(function () {
                    $(".sweet-overlay, .succeed").hide();
                    $(".date-items").show();
                    callback && callback();
                });
            },
            Error: function (msg, fn) {
                msg = msg == undefined ? "操作失败." : msg;
                $(".sweet-overlay").show();
                $(".failure").addClass("active").show();
                $(".failure h2").text(msg);
                $(".confirm2").unbind('click');
                $(".confirm2").click(function () {                   
                    $(".sweet-overlay, .failure").hide();
                    if (fn != undefined)
                    {
                        fn()
                    }
                })               
            },
            Confirm: function (msg,callback) {
                msg = msg == undefined ? "您确定操作吗?." : msg;
                $(".sweet-overlay, .confirm1").show();
                $(".Info").addClass("active").show();
                $(".Info h2").text(msg);
                $(".confirm1").unbind('click');
                $(".confirm1").click(function () {
                    if (typeof callback === "function") {
                        callback();
                        $(".sweet-overlay, .Info, .confirm1").hide();
                    }
                })
                $(".cancel1").click(function () {
                    $(".sweet-overlay, .Info").hide();
                })
            },
        }
    })(),

    /*倒计时*/
    CountDown: (function () {
        return {
            /*
            totalMin:倒计时的分钟数
            showObj:要显示的对象 span ?
            minOrSec:分钟倒计时或秒倒计时 默认0 秒倒计时, 1:分钟倒计时
            callback:倒计时完成后的回调
            */
            Init: function (totalMinute, showObj, minOrSec, callback) {
                var time = parseInt(totalMinute);
                var minute, second;
                var arr = Array.prototype.slice.call(arguments);
                if (!arr[2]) {
                    time = time * 60;
                    type = '秒钟'
                }
                var count = function () {
                    time--;
                    minute = Math.floor(time / 60);
                    second = Math.floor(time % 60);
                    minute = minute < 10 ? '0' + minute : minute;
                    second = second < 10 ? '0' + second : second;
                    showObj.html(minute + '分' + second + '秒');
                    
                    if (time < 0) {
                        showObj.html("time out");
                    }
                    setTimeout(count, 1000);
                }
                count();
                
                //callback();
            },
        }
    })(),
    //整页Loading效果开始
    PageLoading: (function () {
        return {
            Start:function(){
                $(".sweet-overlay, .load").show();
            },
            End: function () {
                $(".sweet-overlay, .load").hide();
            }
        }
    })(),
    
    //某操作的Loading
    WaitIng: (function () {
        return {
            Start: function () {
                $(".sweet-overlay, .load").show();
            },
            End: function () {
                $(".sweet-overlay, .load").hide();
            }
        }
    })(),
    
    Radio: (function () {
        /**********************
        *  模拟单项选择 radio
        ***********************/
        $(".radio-imitate label").on("click", function () {
            var isMultiple = $(this).parent().hasClass("multiple-choice");
            var flag = $(this).hasClass("active");

            if (!isMultiple) {    // Radio-choice
                if (!flag) {
                    $(this).addClass("active").siblings().removeClass("active");
                }
                else {
                    return;
                }
            }
            else {   //  Multi-choice
                if (!flag) {
                    $(this).addClass("active");
                }
                else {
                    $(this).removeClass("active");
                }
            }

        });
    }),
    Checkbox: (function () {
        /**********************
        *  模拟单项选择 radio
        ***********************/
        $(".checkbox-imitate label").on("click", function () {
           
            var flag = $(this).hasClass("active");
 //  Multi-choice
                if (!flag) {
                    $(this).addClass("active");
                }
                else {
                    $(this).removeClass("active");
                }
           

        });
    }),
    Select: (function () {
        /************************
           *  模拟 select option
           ************************/
        var selectinfo = {
            start: function () {
                this.init();
                this.select();
            },
            init: function () {
                var $this = this;
                $(".select-wrapper input.select-dropdown").click(function (event) {
                    event.stopPropagation();
                    if ($("body").find(".drop-flag").length) {     //删除未消除的插件
                        $("body").find(".drop-flag").remove();
                    }
                    if ($(".select-wrapper input.select-dropdown.active").length > 1) {
                        $this.setValue();
                    }
                    $(this).addClass("active");

                    $(document).on("click.static", function (event) {
                        event.stopPropagation();
                        //var unique_id = $(".select-wrapper input.select-dropdown.active").next().attr("id");
                        //$(".select-wrapper input.select-dropdown.active").removeClass("active");
                        //退出后再进行赋值
                        $this.setValue();
                    });
                });
            },
            select: function () {
                var $this = this;
                $(".dropdown-content li").click(function (e) {
                    e.stopPropagation();
                    if ($(this).hasClass("disabled")) {
                        return;
                    }
                    var multiple = $(this).parent().hasClass("multiple-select-dropdown");
                    var flag = $(this).hasClass("active");
                    if (multiple) {
                        $(this).toggleClass("active");
                    }
                    else {
                        if (!flag) {
                            $(this).addClass("active").siblings().removeClass("active");
                            //var unique_id = $(".select-wrapper input.select-dropdown.active").next().attr("id");
                            // $(".select-wrapper input.select-dropdown.active").removeClass("active");
                            //退出后再进行赋值
                            $this.setValue();
                        }
                        else {
                            $this.setValue();
                            //return;
                        }
                    }
                });
            },
            setValue: function (unique_id) {
                var unique_id = $(".select-wrapper input.select-dropdown.active").next().attr("id");
                var select_value = [];
                var select_id = [];
                var $input = $(".select-wrapper input[name='" + unique_id + "']");
                $(".dropdown-content#" + unique_id).find("li.active").each(function (index, element) {
                    select_value.push($(element).text().trim());
                    select_id.push($(element).data("select-id"));
                });
                if (!select_value.length) {
                    select_value.push("")
                }
                if (!select_id.length) {
                    select_id.push("");
                }
                $input.data("select-id", select_id.join(","));
                $input.val(select_value.join(", ")).trigger("change");
                $(".select-wrapper input.select-dropdown.active").removeClass("active");
                $(document).off("click.static");
            }
        };
        selectinfo.start();
    }),
    TextArea: (function(){
        /**********************
        *  textarea 高度自适应
        ***********************/
        (function textareaHrightAuto() {
            var hiddenDiv = $('.hiddendiv').first();
            if (!hiddenDiv.length) {
                hiddenDiv = $('<div class="hiddendiv common"></div>');
                $('body').append(hiddenDiv);
            }
            var text_area_selector = '.materialize-textarea';

            function textareaAutoResize($textarea) {
                // Set font properties of hiddenDiv

                var fontFamily = $textarea.css('font-family');
                var fontSize = $textarea.css('font-size');
                var lineHeight = $textarea.css('line-height');

                if (fontSize) { hiddenDiv.css('font-size', fontSize); }
                if (fontFamily) { hiddenDiv.css('font-family', fontFamily); }
                if (lineHeight) { hiddenDiv.css('line-height', lineHeight); }

                if ($textarea.attr('wrap') === "off") {
                    hiddenDiv.css('overflow-wrap', "normal")
                        .css('white-space', "pre");
                }

                hiddenDiv.text($textarea.val() + '\n');
                var content = hiddenDiv.html().replace(/\n/g, '<br>');
                hiddenDiv.html(content);


                // When textarea is hidden, width goes crazy.
                // Approximate with half of window size

                if ($textarea.is(':visible')) {
                    hiddenDiv.css('width', $textarea.width());
                }
                else {
                    hiddenDiv.css('width', $(window).width() / 2);
                }

                $textarea.css('height', hiddenDiv.height());
            }

            $(text_area_selector).each(function () {
                var $textarea = $(this);
                if ($textarea.val().length) {
                    textareaAutoResize($textarea);
                }
            });

            $('body').on('keyup keydown autoresize', text_area_selector, function () {
                textareaAutoResize($(this));
            });
        })();
    }),

    SelectPlugin: (function () {
        /**********************
        *  Select 下拉选择插件
        ***********************/
        $.fn.extend({
            Select: function (option) {

                var ul_id, originValue, newSelect = [];
                var $select = $(this);
                var defaults = {
                    isMultiple: false,     //是否多选
                    type: 'common',       //常规形式为一行一个选项
                    showName: null,       //要显示后台数据的具体“数据名”
                    url: null              //后台调取数据路径
                };
                var targetIsStudent;
                var options = $.extend({}, defaults, option);
                var url = APIURI + options.url;
                //点击非选项框区域，赋值、隐藏
                $(document).on("click.student",function (event) {
                    var target = event.target;
                    if ($(target).attr("id") !== ul_id) {
                        $select.next().hide();
                    }
                    //event.stopPropagation();
                    //console.log(event.target.nodeName)
                    //if (event.target.nodeName.toLocaleLowerCase() == 'input') {
                    //    return false;
                    //}
                    //else {
                    //    selectSetValue(ul_id);
                    //}
                });
                (function () {
                    //初始化，将其他的选出框隐藏
                    if ($("body").find(".drop-flag").length) {
                        var pre_ul_id = $("body").find(".drop-flag").attr("id");
                        selectSetValue(pre_ul_id);
                    }
                    //判断是否有初值，有的话 在选项里面进行标注显示
                    originValue = $select.data("select-id");
                    if (!!originValue) {
                        newSelect = newSelect.concat(originValue.toString().split(","));
                    }
                    ul_id = $select.attr("name");


                    NSTS.NET.GET(url, null, function (data) {
                        if (!data.success) {
                            NSTS.Plugin.Alert.Error(data.error);
                            return;
                        }
                        if (options.type == 'common') {
                            commonContent(data);
                            cascadeOptionSelect();
                        }
                        if (options.type == 'cascade') {
                            cascadeContent(data, options.cascade, 0);
                            cascadeOptionSelect();
                        }
                        if (options.type == 'classify') {
                            targetIsStudent = data.data.isStudent; //只有是发送对象的时候才有 是否是学员的字段判断值
                            $select.data("isStudent", targetIsStudent);
                            classifyContnet(data.data);
                            classifyOptionSelect();
                        }
                    });
                })();

                // type: common
                function commonContent(dataOption) {
                    $select.next("ul").remove();
                    var isActive;
                    var item = '';
                    item = '<ul class="dropdown-content select-dropdown select-student drop-flag" style="display:block" id="' + ul_id + '">';
                    $(dataOption.data).each(function (index, element) {
                        item += '<li data-select-id="' + element.id + '" class="option ';
                        if (!newSelect.length) {
                            isActive = '';
                            if (index == 0) {
                                isActive = "active";
                            }
                        }
                        else {
                            isActive = (newSelect.indexOf((element.id + '')) == -1) ? "" : "active";                          
                        }
                        item += isActive;
                        item += '"><span><label></label>';
                        item += element[options.showName];
                        item += '</span></li>';
                    });

                    item += '</ul>';
                    $select.after(item);
                }

                // type: cascade
                function cascadeContent(dataOption, cascade, isActive) {
                    $select.next("ul").remove();
                    var len = cascade.titleArr.length - 1;
                    var html_ul = '<ul class="dropdown-content select-dropdown select-student drop-flag" style="display:block" id="' + ul_id + '">';
                    html_ul += '<li class="searchWrap">';
                    $.each(cascade.searchInfo, function (index, elem) {
                        html_ul += '<a class="' + (isActive == index ? "active" : "") + '" data-search-url="' + elem[1] + '">' + elem[0] + '</a>';
                    });
                    //html_ul += '<a class="searchCM">' + cascade.titleArr[0] + '</a><a class="searchCT">CT识图</a>';
                    html_ul += '</li>';
                    html_ul += '<li class="disabled option"><span><label></label>名称&nbsp&nbsp知识点</span></li>';
                    $(dataOption.data).each(function (index, element) {
                        html_ul += '<li data-select-id="' + element.id + '" class="option ';
                        //var isActive = (parseInt(newSelect.toString()) == element.id) ? "active" : "";
                        var isActive = (newSelect.indexOf(element.id.toString()) >= 0) ? "active" : "";
                        html_ul += isActive;
                        html_ul += '"><span><label></label>';
                        var item = '';
                        $(cascade.titleArr).each(function (i, value) {
                            if (i < len) {
                                item += element[value] + '&nbsp&nbsp';
                            }
                            else if (i == len) {
                                item += element[value];
                            }
                        });
                        html_ul += item + '</span></li>';
                    });

                    html_ul += '</ul>';
                    $select.after(html_ul);
                }
                //对弹出框进行操作  type：cascade
                function cascadeOptionSelect() {
                    $(".dropdown-content .option").click(function (e) {
                        e.stopPropagation();
                        if ($(this).hasClass("disabled")) {
                            return;
                        }
                        var multiple = $(this).parent().hasClass("multiple-select-dropdown");
                        var flag = $(this).hasClass("active");
                        if (options.isMultiple) {
                            $(this).toggleClass("active");
                        }
                        else {
                            if (!flag) {
                                $(this).addClass("active").siblings().removeClass("active");
                                selectSetValue(ul_id);
                            }
                            else {
                                selectSetValue(ul_id);
                                //return;
                            }
                        }
                    });
                    $(".dropdown-content .searchWrap a").click(function (e) {
                        e.stopPropagation();
                        if ($(this).hasClass("active")) {
                            return false;
                        }
                        var searchurl = $(this).data("search-url");
                        var isActive = $(this).index();

                        var url = APIURI + searchurl;
                        NSTS.NET.GET(url, null, function (data) {
                            if (!data.success) {
                                NSTS.Plugin.Alert.Error(data.error);
                                return;
                            }
                            cascadeContent(data, options.cascade, isActive);
                            cascadeOptionSelect();

                        });

                    });
                }

                // type：classfy
                function classifyContnet(dataOption) {
                    $select.next("ul").remove();
                    var html_ul = '<ul class="dropdown-content select-dropdown select-student drop-flag" style="display:block" id="' + ul_id + '">';
                    //if (dataOption.isStudent) {  //一级选项内容
                    html_ul += '<li class="top-level"><span><label></label>全选</span></li><li class="sub-level">';
                    $(dataOption.target).each(function (index, element) {
                        html_ul += '<a data-select-id="' + element.id + '" class="';
                        var isActive = newSelect.toString().indexOf(element.id) == -1 ? "" : "active";
                        html_ul += isActive;
                        html_ul += '">' + element.name + '</a>';
                    });
                    html_ul += '</li>';
                    html_ul += '</ul>';

                    $select.after(html_ul);
                    $(".dropdown-content .top-level").each(function (index, value) {
                        if ($(value).next().find("a").length == $(value).next().find(".active").length) {
                            $(value).addClass("active");
                        }
                    });

                }

                //对弹出框进行操作
                function classifyOptionSelect() {
                    $(".select-dropdown.select-student .top-level").click(function (e) {
                        e.stopPropagation();
                        var multiple = $(this).parent().hasClass("multiple-select-dropdown");
                        var flag = $(this).hasClass("active");
                        if (multiple) {
                            $(this).toggleClass("active");
                            $(this).next().find("a").addClass("active");
                        }
                        else {
                            if (!flag) {
                                $(this).addClass("active");
                                $(this).next().find("a").addClass("active");
                            }
                            else {
                                $(this).removeClass("active");
                                $(this).next().find("a").removeClass("active");
                            }
                        }
                        selectSetValue(ul_id);
                    });

                    // 点击行没用，只能点击具体的<a>标签
                    $(".select-dropdown.select-student .sub-level").click(function (e) {
                        e.stopPropagation();
                        return false;
                    });

                    $(".select-dropdown.select-student .sub-level a").click(function (e) {
                        e.stopPropagation();
                        $(this).toggleClass("active");
                        var $parent = $(this).parent();
                        var aLen = $parent.find("a").length;
                        var activeLen = $parent.find(".active").length;
                        if (aLen == activeLen) {
                            $parent.prev().addClass("active");
                        }
                        else {
                            $parent.prev().removeClass("active");
                        }
                        selectSetValue(ul_id);
                    });
                }

                //弹出框进行选择值后进行赋值
                function selectSetValue(selectID) {
                    var select_value = [];
                    var select_id = [];
                    var $input = $("input[name='" + selectID + "']");
                    var $dropWrap = $(".dropdown-content#" + selectID);
                    if (options.type == 'cascade' || options.type == 'common') {
                        $dropWrap.find("li.active").each(function (index, element) {
                            select_value.push($(element).text().trim().split('|')[0]);
                            select_id.push($(element).data("select-id"));
                        });
                    }
                    if (options.type == 'classify') {
                        $dropWrap.find("a.active").each(function (index, element) {
                            select_value.push($(element).text().trim());
                            select_id.push($(element).data("select-id"));
                        });
                    }

                    if (!select_value.length) {
                        select_value.push("")
                    }
                    if (!select_id.length) {
                        select_id.push("");
                    }
                    if (select_value.length > 5) {
                        select_value = select_value.splice(0, 5).concat(['......']);
                    }
                    $input.data("select-id", select_id.join(","));
                    $input.val(select_value.join(", ")).trigger("change.select");
                    //$dropWrap.remove();
                    console.log(select_value);
                    console.log(select_id);
                    //$(document).off("click.Select");
                }

            },
            imgPreview: function (opts) {
                var _self = this,
                    _this = $(this);
                opts = jQuery.extend({
                    Img: "ImgPr",
                    Width: 600,
                    //Height: 100,
                    ImgType: ["gif", "jpeg", "jpg", "bmp", "png"],
                    Callback: function () { }
                }, opts || {});
                _self.init = function () {
                    var src = _this.data("src");
                    if (RegExp("\.(" + opts.ImgType.join("|") + ")$", "i").test(src)) {
                        _self.getImgNaturalDimensions(src, _self.create);
                    }
                    else {
                        _self.create(src);
                    }
                },
                _self.getImgNaturalDimensions = function (src, callback) {
                    var nWidth, nHeight;
                    if (false && img.naturalWidth) { // 现代浏览器
                        nWidth = img.naturalWidth;
                        nHeight = img.naturalHeight;
                    } else { // IE6/7/8注意IE6/7/8的处理，创建了一个新的img，仅设置其src，这时需要让图片完全载入后才可以获取其宽高。
                        // 因此这里是异步的，可以传一个回调，回调里把原始的宽高作为参数传入。
                        var image = new Image();
                        image.src = src;
                        image.onload = function () {
                            var scaling = opts.Width / image.width;
                            nWidth = opts.Width;
                            nHeight = Math.floor(image.height * scaling);
                            callback(src, nWidth, nHeight);
                        }
                    }
                };
                _self.close = function () {
                    $(".preview-wrap").remove();
                    $(".img-prev-wrap").remove();
                },
                _self.create = function (src, w, h) {
                    var filetype = _this.data("filetype");
                    var item = '';
                    item += '<div class="preview-wrap"><span class="prev-close"></span><span class="close-bg"></span></div>';
                    item += '<div class="img-prev-wrap" style="width:' + opts.Width + 'px">';
                    $.each(opts.titleInfo, function (inedx, elem) {
                        item += '<p>' + elem[0] + ':<span>' + elem[1] + '</span></p>';
                    });
                    if (filetype == 12) {
                        item += '<img src="' + src + '" style="width:' + w + 'px;height:' + h + 'px">';
                    }
                    if (filetype == 11) {
                        item += '<video src="' + src + '" controls="controls" style="width:100%;height:100%"></video>';
                    }
                    item += '</div>';

                    $("body").append(item);

                    _self.bind();
                },
                _self.bind = function () {
                    $(".prev-close").on("click", function () {
                        _self.close();
                    });

                    $(".preview-wrap").on("click.remove", function (e) {
                        e.stopPropagation();
                        _self.close();
                    });
                    $(".img-prev-wrap").on("mousewheel", function (event) {
                        event.preventDefault();
                    });
                }
                _self.init();
            },
            mapDepotSelect: function (opts) {
                var _self = this,
                    _this = $(this),
                    _imgwrap = $(this).parents(".option-wrap").next();
                console.log(_imgwrap);
                 opts = jQuery.extend({
                    Width: 800,
                    Callback: function () { }
                }, opts || {});
                var mapurl = APIURI + 'api/Lesson_ResFiles/QueryMapStorageList/0/100/{}';
                NSTS.NET.GET(mapurl, null, function (data) {
                    if (!data.success) {
                        NSTS.Plugin.Alert.Error(data.error);
                    }
                    _self.imgList(data.data);
                });
                _self.close = function () {
                    $(".preview-wrap").remove();
                    $(".map-depot-wrap").remove();
                },
                _self.imgList = function(data){
                    var item = '';
                    item += '<div class="preview-wrap"><span class="prev-close"></span><span class="close-bg"></span></div>';
                    item += '<div class="map-depot-wrap" style="width:' + opts.Width + 'px">';
                    $.each(data, function (inedx, elem) {
                        item += '<div class="map-depot-info"><img class="map-depot" src="' + elem.fileSiteUrl + '" name="' + elem.resName + '" data-fileid="' + elem.fileID + '"><p>' + elem.resName + '</p></div>';
                    });
                    item += '</div>';
                    $("body").append(item);

                    _self.bind();
                    _self.selectImg();
                },
                _self.bind = function () {
                    $(".prev-close").on("click", function () {
                        _self.close();
                    });

                    $(".preview-wrap").on("click.remove", function (e) {
                        e.stopPropagation();
                        _self.close();
                    });
                },
                _self.selectImg = function () {
                    var selcObj = {};
                    $(".map-depot-wrap img").click(function () {
                        selcObj.FileHttpUrl = $(this).attr("src");
                        selcObj.NewID = $(this).data("fileid");
                        _self.close();
                        opts.Callback(selcObj, _this);
                    });
                    //$(".map-depot-wrap img").hover(function () {
                    //    $(this).css({
                    //        position: 'absolute',
                    //        width: '100%',
                    //        height:'100%',
                    //        top: 0,
                    //        left: 0,
                    //        right: 0,
                    //        bottom: 0,
                    //        zIndex:99
                    //    })
                    //}, function () {
                    //    $(this).css({
                    //        position: 'relative',
                    //        width: '190px',
                    //        height: '190px',
                    //        zIndex:1
                    //    })
                    //});
                }
            },
            //继续添加插件
            otherPlugin: function () {

            }
        });
        
    }),

    /*同时绑定Radio和Select*/
    RadioSelect: (function () {
        this.Radio();
        this.Select();
    }),
    CheckboxSelect: (function () {
        this.Checkbox();
        this.Select();
    }),
    
   
    CTSelect: (function (multi) {
        var ct_url = APIURI + 'api/CourseWare/GetResType/{"CT":2,"TopID":0}';
        NSTS.NET.GET(ct_url, null, function (data) {
            if (!data.success) {
                NSTS.Plugin.Alert(data.error);
                return false;
            }
            item = '';
            if (multi) {
                item += ' <ul class="dropdown-content select-dropdown multiple-select-dropdown" id="ct-type">';
                $(data.data).each(function (index, elem) {
                    var active = (index == 0) ? "active" : "";
                    item += '<li data-select-id="' + elem.id + '" class="'+ active+ '"><span><label></label>' + elem.name + '</span></li>';
                });
            }
            else {
                item += ' <ul class="dropdown-content select-dropdown" id="ct-type">';
                item += '<li data-select-id="-1" class="active"><span><label></label>所有知识点</span></li>';
                $(data.data).each(function (index, elem) {
                    item += '<li data-select-id="' + elem.id + '"><span><label></label>' + elem.name + '</span></li>';
                });
            }
            
            item += '</ul>';
            $("input[name='ct-type']").after(item);
            NSTS.Plugin.Select();
        });
    }),
    ValidateInput: (function (id, errorMsg) {
        // function validateInput(id, errorMsg) {
        $(id).removeClass("input-tip");
        $(id).siblings('.txt-err').remove();
        $(id).addClass("input-tip");
        if ($(id).siblings().size() > 0) {
            $(id).siblings(":last").after('<span class="txt-err"><em style="padding:0 5px" class="nucfont inuc-exclamation-circle"></em>' + errorMsg + '</span>')
        }
        else {
            $(id).after('<span class="txt-err"><em style="padding:0 5px" class="nucfont inuc-exclamation-circle"></em>' + errorMsg + '</span>')
        }
        //  }
    }),
    RemoveInputTips: (function () {
        $('.container :input').focus(function () {
            $(this).removeClass("input-tip");
            $(this).siblings('.txt-err').remove();
        });
    }),
    ClearInputTips: (function () {
        $('.container :input').each(function () {
            $(this).removeClass("input-tip");
            $(this).siblings('.txt-err').remove();
        });
    }),
    ValidateNumber: (function (id) {
        var value=$(id).val();
        if (value<= 0) {
            $(id).val("");
        }
        //var res = /^[0-9]*[1-9][0-9]*$/;
        //if (res.test(value)) {
        //    $(id).val("");
        //}
    }),
   
    //最多两位小数
    ValidateIsFTwoNum: (function (elem) {
        var reg = /^\d+\.?(\d{1,2})?$/;
        while (!reg.test($(elem).val()) && $(elem).val() != "") {
            $(elem).val(checkStr($(elem).val()));
        }
        function checkStr(str) {
            str = str.substring(0, str.length - 1);
            return str;
        }
    }),
    //验证是否在一个范围内
    ValidateIsInRange: (function (elem) {
        var num = $(elem).val();
        var max = $(elem).attr("max");
        var min = $(elem).attr("min");
        if (num < min) {
            $(elem).val('');
        }
        if (num > max) {
            $(elem).val(max)
        }         
    }),
    //验证整数是否在一个范围内
    ValidateIntIsInRange: (function (elem) {
        var num = parseInt($(elem).val());
        var max =  parseInt($(elem).attr("max"));
        var min =  parseInt($(elem).attr("min"));
        if (num < min||$(elem).val()=='') {
            $(elem).val(min);
            return
        }
        if (num > max) {
            $(elem).val(max)
            return
        }     
        var res = /^[0-9]*[1-9][0-9]*$/;
        if (res.test($(elem).val())) {
            $(elem).val(num)
            return
        }
    }),
    //适用级别获取   参数依次为 多选or单选   全部选中or不选中  初始选中项是哪些   input对应id
    ForlevelGET: (function (op1, op2, op3, id) {
        var forlevelSelect;
        var url = APIURI + 'api/Dictionary/GetForlevelMenu/{}';
        NSTS.NET.SYNCGET(url, null, function (data) {
            var opts2 = {
                multiSelect: op1,
                items: data.data,
                selectAll: op2,
                initActiveID:op3
            };       
            forlevelSelect = new SelectOp(id+"-select", $("#"+id), opts2);
        });
        return forlevelSelect;
    }),
    //岗位下拉菜单
    PostGET: (function (op1, op2, op3, id) {
        var forlevelSelect;
        var url = APIURI + 'api/Dictionary/GetPostMenu/{}';
        NSTS.NET.SYNCGET(url, null, function (data) {
            var opts2 = {
                multiSelect: op1,
                items: data.data,
                selectAll: op2,
                initActiveID:op3
            };       
            forlevelSelect = new SelectOp(id+"-select", $("#"+id), opts2);
        });
        return forlevelSelect;
    }),
    //知识点获取 参数依次为  理论图像or全部(0or1or2)  单选or多选  初始选定项是哪些 input对应 id
    KnowledgeGET: (function (op1, op2, op3,op4, id) {
        var knowledgeSelect;
        var url = APIURI + 'api/Dictionary/GetKnowledgeMenu/{"KnowledgeType": '+op1+' }';
        NSTS.NET.SYNCGET(url, null, function (data) {
            var opts2 = {
                multiSelect: op2,
                items: data.data,
                selectAll:op3,
                initActiveID: op4,

                };
            //知识点
            knowledgeSelect = new SelectCascade(id+"-select", $("#"+id), opts2);
        });
        return knowledgeSelect;
    }),
    //所在机构
    UserOrgGET: (function (op1,op2,id) {
        var userOrgSelect;
        var url = APIURI + 'api/Dictionary/GetBodiesTree/{"showoffice":'+op1+'}';
        NSTS.NET.SYNCGET(url, null, function (data) {
            var opts = {
                multiSelect: op2,
                items: data.data,
            };
            userOrgSelect = new SelectTree(id+"-select", $("#"+id), opts);
        });
                return userOrgSelect;
    }),
    GetPieOption: (function (obj) {
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}:{c}({d}%)'
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                data: obj.legendData                                      //饼图 数据1  数组
            },
            series: [{
                name: obj.name,                                                    //饼图  数据2
                type: 'pie',
                data: obj.seriesData,                                                                             //饼图  数据3   
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0,0,0,0.5)'
                    }
                }
            }]
        };
        return option;
    }),

    /**
     * 嵌套环形图
     * param:  object (参数默认值已设好，需要什么传什么就行)
     * return: 返回一个option对象
     */
    GetNestPieOption: function ({
         legendOrient = 'vertical',
         legendX = 'right',
         legendData = [],
         name = '',
         innerData = [],
         outerData = []
     }) {
        let options = {
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}:{c}({d}%)'
            },
            legend: {
               orient: legendOrient,
               x: legendX,
               data: legendData
            },
            series: [
                {
                    name: name,
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '50%'],
                    label: {
                        normal: {
                            position: 'inner',
                        }
                    },
                    data: innerData,
                },
                {
                    name: name,
                    type: 'pie',
                    radius: ['60%', '80%'],
                    data: outerData
                }]
        };

        return options;
    },

    GetBarOption: (function (obj) {
        if(!obj.color){
           obj.color =  {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#9dafcc'
                                }, {
                                    offset: 1,
                                    color: '#545f71'
                                }]
                            )
                        }     
        }
        var option = {
            tooltip: {},

            legend: {
                data: obj.nameData,
                left:'75%'
            },
            xAxis: {
                data: obj.xAxisData,
                splitLine:{
                    show:true
                }
            },
            yAxis: {},
            series: [{
                name: obj.name,
                type: 'bar',
                barMaxWidth:30,
                data: obj.seriesData,
                itemStyle: {
                    normal:obj.color
                }
            }]
        };
        return option;
    }),
}

/*
    说明：下拉选择
    实现：根据自定义的选项进行显示
    参数：
*/
var SelectOp = function (id, parentEle, options) {
    this.element = $("<ul class='select-content'/>");
    this.id = parentEle.attr("id");
    this.element.attr("id", id);
    this.parentEle = parentEle;
    this.required = this.parentEle.data('required') || false;
    this.options = options || {};                   
    this.selectOptions = this.options.items;                // 下拉框的选择项
    this.multiSelect = this.options.multiSelect || false;   //是否多选，默认为false
    this.callback = this.options.callback;                  //回调函数
    this.selectedValue = [];
    this.selectedId = [];
    this.initActiveItem = this.options.initActiveID || [];
    this.init();
    this.initEvent();
};
SelectOp.prototype = {
    init: function () {
        var that = this;
        var optionItem = '';
        this.multiSelect ? null : this.element.addClass("single-select");
        this.multiSelect ? optionItem += '<li class="select-all" data-select-id="0"><span><label></label>全部</span></i>' : null;
        $(that.selectOptions).each(function (index, value) {
            optionItem += '<li class="select-item"  data-select-id="' + value.id + '"><span><label></label>' + value.name + '</span></i>';
        });
        this.element.append(optionItem);
        this.parentEle.after(this.element);

        this.selectAll = this.element.find(".select-all");//全选按钮
        this.selectItem = this.element.find(".select-item");//每一个选项
        this.selectQuit();
        this.initActive();
    },
    initActive: function () {
        var that = this;
        this.needInitSetValue = true;
        if (!this.initActiveItem) {
            return false;
        }
        if (this.options.selectAll) {
            this.selectAll.addClass("active");
            this.selectItem.addClass("active");
            this.parentEle.val("全部");
            return;
        }
        $(this.initActiveItem).each(function (index, value) {
            that.element.find("li[data-select-id='" + value + "']").addClass("active");
            that.selectedValue.push(that.element.find("li[data-select-id='" + value + "']").text());
            that.selectedId.push(value);
        });
        this.parentEle.val(this.selectedValue.join("，"));
        that.setValue();//这个方法会使得回调的时候出错
    },
    resetSelectValue: function (arr) {
        var that = this;
        arr.forEach(function (value, index) {
            var resetItem = that.element.find("li[data-select-id='" + value + "']");
            $(resetItem).addClass("active");
            if (!that.options.multiple && $(resetItem).parents(".select-item")) {
                //单选且有二级选项时，二级选项和一级选项都需要添加 "active"
                $(resetItem).parents(".select-item").addClass("active");
            }
            that.selectedValue.push($(resetItem).text());
            that.selectedId.push(value);
        });
    },
    initEvent: function () {
        var that = this;
        this.parentEle.on("click", function () {
            $(this).toggleClass("active");
        });
        this.selectAll.on("click", function (e) {
            e.stopPropagation();
            if (!$(this).hasClass("active")) {
                $(this).addClass("active");
                that.selectItem.addClass("active");
            }
            else {
                $(this).removeClass("active");
                that.selectItem.removeClass("active");
            }
            that.setValue();
        });

        this.selectItem.on("click", function (e) {
            e.stopPropagation();
            if (!that.multiSelect) {
                if(!$(this).hasClass("active")) {
                   $(this).addClass("active").siblings().removeClass("active");
                } 
                else {
                    if (!that.required) {
                        that.selectItem.removeClass("active");
                    }
                }
                
            }
            else {
                $(this).toggleClass("active");
                if (that.selectItem.length == that.element.find(".select-item.active").length) {
                    that.selectAll.addClass("active");
                }
                else {
                    that.selectAll.removeClass("active");
                }
            }
            that.setValue();
        });
    },
    setValue: function () {
        var that = this;
        this.selectedValue.length = 0;
        this.selectedId.length = 0;
        if (this.selectAll.hasClass("active")) {
            //如果需要返回所有被选择项的id，而不是简单的一个 0
            if (this.options.returnAllSelected) {
                that.element.find(".select-item.active").each(function (index, value) {
                    that.selectedId.push($(value).data("select-id"));
                });
            }
            else {
                this.selectedId.push("0");
            }
            this.selectedValue.push("全部");
        }
        else {
            that.element.find(".select-item.active").each(function (index, value) {
                that.selectedValue.push($(value).text());
                that.selectedId.push($(value).data("select-id"));
            });
        }
        this.parentEle.val(this.selectedValue.join("，"));
        this.parentEle.trigger("change");//手动触发input的change事件
        if (this.needInitSetValue) {    //第一次执行需要赋初始值时，直接返回，不执行回调
            this.needInitSetValue = false;
            return false;
        }
        this.callback && this.callback(that.getValue());
        if (!this.multiSelect) {
            this.parentEle.removeClass("active");
        }
    },
    getValue: function () {
        var data = {};
        data.value = this.selectedValue.join(",");
        data.id = this.selectedId.join(",");
        return data;
    },
    clearValue: function () {
        this.selectedId = [];
        this.element.find(".select-item.active").removeClass("active")
        this.selectedValue = [];
    },
    getElement: function () {
        return this.element;
    },
    selectQuit: function () {
        var that = this;
        $(document).on("click.op", function (event) {
            var target = event.target;
            if ($(target).attr("id") !== that.id) {
                that.parentEle.removeClass("active");
            }
        });
    }
};

function extend(sub, supClass) {
    var F = function () { };
    F.prototype = supClass.prototype;
    sub.prototype = new F();
    sub.supClass = supClass.prototype;
}
//下拉选择，只有二级，鼠标划上二级从右边显示
var SelectCascade = function (id, parentEle, options) {
    SelectOp.call(this, id, parentEle, options);
};
extend(SelectCascade, SelectOp);

SelectCascade.prototype.init = function () {
    var that = this;
    var optionItem = '';
    this.multiSelect ? null : this.element.addClass("single-select");
    this.multiSelect ? optionItem += '<li class="select-all" data-select-id="0"><span><label></label>全部</span></i>' : null;
    $(that.selectOptions).each(function (index, value) {
        optionItem += '<li class="select-item" data-select-id="' + value.id + '"><span><label></label>' + value.name + '</span>';
        if (value.children.length > 0) {
            optionItem += '<ul class="dropdown-sub">';
            $(value.children).each(function (i, elem) {
                optionItem += '<li class="select-item" data-select-id="' + elem.id + '"><span><label></label>' + elem.name + '</span></li>';
            });
            optionItem += '</ul>'
        }
        optionItem += '</li>';
    });
    this.element.append(optionItem);
    this.parentEle.after(this.element);

    this.selectAll = this.element.find(".select-all");//全选按钮
    this.selectItemAll = this.element.find(".select-item");//所有选项
    this.selectItem = this.element.find("> .select-item");//一级选项
    this.subSelectItem = this.selectItem.find(".select-item");//二级选择项
    this.selectQuit();
    this.initActive();
    this.resetPosition();
    
};
SelectCascade.prototype.initActive = function () {
    if (this.initActiveItem.length == 0) {
        return false;
    }
    var that = this;
    this.needInitSetValue = true;
    if (this.options.selectAll) {
        this.selectAll.addClass("active");
        this.selectItemAll.addClass("active");
        this.parentEle.val("全部");
        return;
    }
    $(this.initActiveItem).each(function (index, value) {
        that.element.find("li[data-select-id='" + value + "']").addClass("active");
        //that.selectedValue.push(that.element.find("li[data-select-id='" + value + "']").text());
        //that.selectedId.push(value);
    });
    if (!this.multiSelect) {
        $(this.selectItem).each(function (i, elem) {
            if ($(this).find(".select-item.active").length > 0) {
                $(this).addClass("active");
            }
        });
    }
    else {
        $(this.selectItem).each(function (i, elem) {
            if ($(this).find(".select-item").length != 0 && $(this).find(".select-item.active").length == $(this).find(".select-item").length) {
                $(this).addClass("active");
            }
        });
    }
    this.setValue();
};
SelectCascade.prototype.resetPosition = function () {
    // 没有二级选择项目
    if (this.element.find('ul').length == 0) {
        return false;
    }
    var windowW = $(window).width();
    var windowH = $(window).height();
    var inputW = $("#" + this.id).width();
    var inputH = $("#" + this.id).height();
    var selectLeft = $("#" + this.id).offset().left;
    var selectTop = $("#" + this.id).offset().top;
    var selectH = this.element.height();
    //console.log(windowH, selectTop, selectH);
    if (windowW - selectLeft < 400 * 2) {
        this.element.find(".dropdown-sub").css("transform", "translate(-100%)");
    }
    else {
        this.element.find(".dropdown-sub").css("transform", "translate(100%)");
    }

    //if (windowH - selectTop < selectH) {
    //    $(this.element).css("transform", "translateY(-" + (selectH - inputH) + "px)");
    //}
    //else {
    //    $(this.element).css("transform", "translateY(0)");
    //}

    if (inputW > 1.5 * 400) {
        $(this.element).css('transition','all 0s ease-out').css("max-width", Math.floor(inputW / 2));
    } else {
        $(this.element).css('transition', 'all .3s ease-out').css("max-width", 400);
    }

};
SelectCascade.prototype.initEvent = function () {
    var that = this;
    $(document).resize(function () {
        that.resetPosition();
    });
    this.parentEle.on("click", function () {
        $(this).toggleClass("active");
        that.resetPosition();
    });
    this.selectAll.on("click", function (e) {
        e.stopPropagation();
        if (!$(this).hasClass("active")) {
            $(this).addClass("active");
            that.selectItemAll.addClass("active");
        } else {
            $(this).removeClass("active");
            that.selectItemAll.removeClass("active");
        }
        that.setValue();
    });
    this.selectItem.hover( function (e) {
        if ($(this).find(".dropdown-sub").length > 0) {
            upPosition($(this).find(".dropdown-sub"));//检测是否超出底部
        }
    });
    function upPosition(obj) {
        var windowH = $(window).height();
        var subSelectH = $(obj).height();
        var subSelectTop = $(obj).offset().top;
        if (windowH - subSelectTop < subSelectH) {
            $(obj).css("transform", "translateX(100%) translateY(-100%)").css("margin-top", "35px");
        }
    }
    this.selectItem.on("click", function (e) {
        e.stopPropagation();
        if (!that.multiSelect) {
            if (!$(this).hasClass("active")) {
                that.selectItemAll.removeClass("active");
                $(this).addClass("active");
                $(this).find(".select-item").eq(0).addClass("active");
            }
            else {
                if (!that.required) {
                    that.selectItemAll.removeClass("active");
                }
            }
        }
        else {
            if (!$(this).hasClass("active")) {
                $(this).addClass("active");
                $(this).find(".select-item").addClass("active");
            }
            else {
                $(this).removeClass("active");
                $(this).find(".select-item").removeClass("active");
            }
            if (that.selectItem.length == that.element.find("> .select-item.active").length) {
                that.selectAll.addClass("active");
            }
            else {
                that.selectAll.removeClass("active");
            }
        }
        that.setValue();
    });
    this.subSelectItem.on("click", function (e) {
        e.stopPropagation();
        var $subSelectItemParent = $(this).parents(".select-item");
        if (!that.multiSelect) {
            if (!$(this).hasClass("active")) {
                $(this).addClass("active").siblings().removeClass("active");
                $subSelectItemParent.addClass("active").siblings().removeClass("active");
            }
            else {
                that.selectItemAll.removeClass("active");
            }
        }
        else {
            $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active");
            if ($subSelectItemParent.find(".select-item").length == $subSelectItemParent.find(".select-item.active").length) {
                $subSelectItemParent.addClass("active");
            }
            else {
                $subSelectItemParent.removeClass("active");
            }
            if (that.selectItem.length == that.element.find("> .select-item.active").length) {
                that.selectAll.addClass("active");
            }
            else {
                that.selectAll.removeClass("active");
            }
        }
        that.setValue();
    });
};
SelectCascade.prototype.setValue = function () {
    var that = this;
    this.selectedValue.length = 0;
    this.selectedId.length = 0;
    if (!this.multiSelect) {
        $(this.selectItem).each(function (index, value) {
            if ($(value).hasClass("active")) {
                if (!$(value).find(".select-item").length) {
                    that.selectedValue.push($(value).text());
                    that.selectedId.push($(value).data("select-id"));
                }
                else {
                    that.selectedValue.push($(value).find(".select-item.active").text());
                    that.selectedId.push($(value).find(".select-item.active").data("select-id"));
                }
            }
        });
    }
    else {
        if (this.selectAll.hasClass("active")) {
            that.selectedValue.push("全部");
            that.selectedId.push("0");
        } else {
            $(this.selectItem).each(function (index, value) {
                if ($(value).hasClass("active")) {
                    that.selectedValue.push($(value).find(">span").text());
                    if ($(value).find(".dropdown-sub").length) {
                        $(value).find(".select-item.active").each(function (i, elem) {
                            that.selectedId.push($(elem).data("select-id"));
                        });
                    } else {
                        that.selectedId.push($(value).data("select-id"));
                    }
                }
                else {
                    $(value).find(".select-item.active").each(function (i, elem) {
                        that.selectedValue.push($(elem).text());
                        that.selectedId.push($(elem).data("select-id"));
                    });
                }
            });
        }
    }

    this.parentEle.val(this.selectedValue.join("，"));
    this.parentEle.data('select-id', this.selectedId.join(","));
    this.parentEle.trigger("change");//手动触发input的change事件
    if (this.needInitSetValue) {    //第一次执行需要赋初始值时，直接返回，不执行回调
        this.needInitSetValue = false;
        return false;
    }
    this.callback && this.callback(that.getValue());
    if (!this.multiSelect) {
        this.parentEle.removeClass("active");
    }
};

//下拉选择，三级，在一个平面内显示，形成树形
var SelectTree = function (id, parentEle, options) {
    SelectOp.call(this, id, parentEle, options);
};
extend(SelectTree, SelectOp);

SelectTree.prototype.init = function () {
    this.element.addClass("select-tree");
    var that = this;
    var optionItem = '';
    this.multiSelect ? null : this.element.addClass("single-select");
    $(that.selectOptions).each(function (index, value) {
        optionItem += '<li class="select-item select-item-first" data-select-id="' + value.id + '"><span><label></label>' + value.name + '</span>';
        if (value.children.length > 0) {
            optionItem += '<ul class="dropdown-sub">';
            $(value.children).each(function (i, elem) {
                optionItem += '<li class="select-item select-item-sec" data-select-id="' + elem.levelID + '"><span><label></label>' + elem.name + '</span>';
                if (elem.children.length > 0) {
                    optionItem += '<ul class="dropdown-sub-p">';
                    $(elem.children).each(function (key, item) {
                        optionItem += '<li class="select-item select-item-three" data-select-id="' + item.levelID + '"><span><label></label>' + item.name + '</span></li>';
                    });
                    optionItem += '</ul>';
                }
                optionItem += '</li>';
            });
            optionItem += '</ul>';
        }
        optionItem += '</li>';
    });
    this.element.append(optionItem);
    this.parentEle.after(this.element);

    this.selectItemAll = this.element.find(".select-item");//所有选项
    this.selectItem = this.element.find("> .select-item");//一级选项
    this.subSelectItem = this.selectItem.find(".select-item-sec");//二级选择项
    this.subPSelectItem = this.selectItem.find(".select-item-three");//三级选择项
    this.selectQuit();
    this.initActive();
};
SelectTree.prototype.initEvent = function () {
    var that = this;
    this.parentEle.on("click", function () {
        $(this).addClass("active");
    });
    this.selectItem.on("click", function (e) {
        e.stopPropagation();
        if (!that.multiSelect) {
            if (!$(this).hasClass("active")) {
                that.selectItemAll.removeClass("active");
                $(this).addClass("active");
                //$(this).find(".select-item").eq(0).addClass("active");
                //if ($(this).find(".select-item").eq(0).find(".dropdown-sub-p").length) {
                //    $(this).find(".select-item").eq(0).find(".select-item-three").eq(0).addClass("active");
                //}
            }
        }
        else {
            if (!$(this).hasClass("active")) {
                $(this).addClass("active");
                $(this).find(".select-item").addClass("active");
            }
            else {
                $(this).removeClass("active");
                $(this).find(".select-item").removeClass("active");
            }
        }
        that.setValue();
    });
    this.subSelectItem.on("click", function (e) {
        e.stopPropagation();
        var $subSelectItemParent = $(this).parents(".select-item");
        if (!that.multiSelect) {
            if (!$(this).hasClass("active")) {
                that.selectItemAll.removeClass("active");
                $(this).addClass("active");
            }
        }
        else {
            $(this).hasClass("active") ? $(this).removeClass("active").find(".select-item").removeClass("active") : $(this).addClass("active").find(".select-item").addClass("active");
            if ($subSelectItemParent.find(".select-item-sec").length == $subSelectItemParent.find(".select-item-sec.active").length) {
                $subSelectItemParent.addClass("active");
            }
            else {
                $subSelectItemParent.removeClass("active");
            }
        }
        that.setValue();
    });
    this.subPSelectItem.on("click", function (e) {
        e.stopPropagation();
        var $subPSelectItemParent = $(this).parents(".select-item-sec");
        if (!that.multiSelect) {
            if (!$(this).hasClass("active")) {
                that.selectItemAll.removeClass("active");
                $(this).addClass("active");
                //$(this).addClass("active").siblings().removeClass("active");
                //$subPSelectItemParent.addClass("active").parents(".select-item").addClass("active").end().siblings().removeClass("active").end().siblings().find(".active").removeClass("active");
            }
        }
        else {
            $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active");
            if ($subPSelectItemParent.find(".select-item").length == $subPSelectItemParent.find(".select-item.active").length) {
                $subPSelectItemParent.addClass("active");
            }
            else {
                $subPSelectItemParent.removeClass("active");
            }
        }
        that.setValue();
    });
};
SelectTree.prototype.setValue = function () {
    var that = this;
    this.selectedValue.length = 0;
    this.selectedId.length = 0;
    if (!this.multiSelect) {
        var selected = $(this.element).find(".select-item.active");
        this.selectedValue.push($(selected).find(" > span").text());
        this.selectedId.push($(selected).data("select-id"));
    }
    else {
        $(this.selectItem).each(function (index, value) {
            if ($(value).hasClass("active")) {
                that.selectedValue.push($(value).find(">span").text());
                if ($(value).find(".dropdown-sub").length) {    //有二级选项的情况
                    $(value).find(".select-item.active").each(function (i, elem) {
                        if ($(elem).find(".dropdown-sub-p").length) {
                            $(elem).find(".select-item.active").each(function (k, item) {
                                that.selectedId.push($(item).data("select-id"));
                            });
                        } else {
                            that.selectedId.push($(elem).data("select-id"));
                        }
                    });
                } else {
                    that.selectedId.push($(value).data("select-id"));
                }
            }
            else {
                $(value).find(".select-item-sec").each(function (i, elem) { //  二级选项遍历
                    if ($(elem).hasClass("active")) {
                        that.selectedValue.push($(elem).find("> span").text());
                        if ($(elem).find(".dropdown-sub-p").length) {   //有三级选项
                            $(elem).find(".select-item-three.active").each(function (k, item) {
                                that.selectedId.push($(item).data("select-id"));
                            });
                        } else {
                            that.selectedId.push($(elem).data("select-id"));
                        }
                    }
                    else {  //二级选项没有选中
                        if ($(elem).find(".dropdown-sub-p").length) {   //有三级选项
                            $(elem).find(".select-item-three.active").each(function (k, item) {
                                that.selectedValue.push($(item).text());
                                that.selectedId.push($(item).data("select-id"));
                            });
                        } else {
                            that.selectedId.push($(elem).data("select-id"));
                        }
                    }
                });
            }
        });
    }
    //执行有的回调函数
    this.parentEle.val(this.selectedValue.join("，"));
    this.callback && this.callback(that.getValue());
    if (!this.multiSelect) {
        this.parentEle.removeClass("active");
    }
};


//主要用于选择对象，li 里面是<a/> 标签
var SelectPanel = function (id, parentEle, options) {
    SelectOp.call(this, id, parentEle, options);
};
extend(SelectPanel, SelectOp);
SelectPanel.prototype.init = function () {
    this.element.addClass("select-sendobj");
    //发送对象特有的，需要绑定到 input 元素上，以便提交数据时获取
    this.parentEle.data("isStudent", this.selectOptions.isStudent);
    var that = this;
    var optionItem = '';
    this.multiSelect ? null : this.element.addClass("single-select");
    this.multiSelect ? optionItem += '<li class="select-all" data-select-id="0"><span><label></label>全部</span></li>' : null;
    optionItem += '<li class="sub-level">';
    $(that.selectOptions.target).each(function (index, value) {
        optionItem += '<a class="select-item"  data-select-id="' + value.id + '">' + value.name + '</a>';
    });
    optionItem += '</li>';
    this.element.append(optionItem);
    this.parentEle.after(this.element);

    this.selectAll = this.element.find(".select-all");//全选按钮
    this.selectItem = this.element.find(".select-item");//每一个选项
    this.selectQuit();
    this.initActive();
}


/* 说明：编写一个可编写转化的类；默认输入元素为 input 
   实现：点击span时，切换到可输入编辑的状态，点击保存可改变原span内的初始内容
   参数：id, 初始span值， 该span的父级元素，目标元素
*/
var InputField = function (id, value, parentEle, pageElem) {
    this.element = $("<div>");
    this.id = id;
    this.parent = parentEle;
    this.pageElem = pageElem;
    this.value = value;
    this.originValue = value;

    this.init();
};
InputField.prototype = {
    init: function(){
        this.element.attr("id", this.id);
        this.initElement();
        this.initEvent();
        this.converToRead();
    },
    initElement: function () {
        this.inputEle = $("<input />");
        this.inputEle.css("display", "inline-block");
        this.inputEle.val(this.value);

        this.BtnWrap = $("<div>");
        this.BtnWrap.css("display", "inline-block");
        this.saveBtn = $("<a>");
        this.saveBtn.addClass("btn btn-default btn-sm").text("保存");
        this.cancelBtn = $("<a>");
        this.cancelBtn.addClass("btn btn-default btn-sm").text("取消");
        this.BtnWrap.append(this.saveBtn).append(this.cancelBtn);
        this.element.append(this.inputEle).append(this.BtnWrap);
        this.pageElem.append(this.element);
    },
    initEvent: function () {
        var that = this;
        this.pageElem.on("click", function () {
            that.converToWrite();
        });
        this.saveBtn.on("click", function () {
            that.save();
        });
        this.cancelBtn.on("click", function () {
            that.cancel();
        });
    },
    converToRead: function () {
        this.pageElem.show();
        this.element.hide();
    },
    converToWrite: function () {
        this.inputEle.val(this.getValue());
        this.pageElem.hide();
        this.element.show();
        this.inputEle.focus();
    },
    save: function () {
        this.setValue(this.inputEle.val());
        if (this.value == "") {
            this.setValue(this.originValue);
        }
        this.pageElem.text(this.getValue());
        this.converToRead();
    },
    cancel: function () {
        this.converToRead();
    },
    getValue: function () {
        return this.value;
    },
    setValue: function (value) {
        this.value = value;
    },
    getElement: function () {
        return this.element;
    }
};

/* 
说明：@override InputField 类
实现：这里的输入元素为 textarea 
*/
function TextAreaFeild(id, value, parentEle, pageEle) {
    InputField.apply(this, arguments);
}
extend(TextAreaFeild, InputField);
TextAreaFeild.prototype.initElement = function () {
    this.inputEle = $("<textarea />");
    this.inputEle.attr("row", "15");
    this.inputEle.val(this.value);

    this.BtnWrap = $("<div>");
    this.saveBtn = $("<a>");
    this.saveBtn.addClass("text-save").text("保存");
    this.cancelBtn = $("<a>");
    this.cancelBtn.addClass("text-cancel").text("取消");
    this.BtnWrap.append(this.saveBtn).append(this.cancelBtn);
    this.element.append(this.inputEle).append(this.BtnWrap);
    this.pageElem.after(this.element);
};


/*
*说明：拖动条插件
 参数：当前input的jquery对象
 模板：<div class="range-wrapper"><input id="xxx" type="range"></div>
*/
(function($) {
    var $window = $(window),
        NAMESPACE = 'rangeSlider',
        defaults = {
            toggleBtn: '.start-study'    // 关联的按钮
        };

    var RangeSlider = function($element, options) {
        this.element = $element;
        this.options = $.extend({}, defaults, $.isPlainObject(options) && options);
        this.ruler = $('<span class="range-ruler"></span>').insertAfter(this.element);
        this.init();
        this.bindEvent();
    };

    RangeSlider.prototype = {
        constructor: RangeSlider,

        init: function () {
            this.changeRuler();
        },

        bindEvent: function() {
            this.element.on('input', () => {
                this.changeRuler();
            });
        },

        changeRuler: function() {
            var width = this.element[0].offsetWidth - 7,
                min = this.element.attr('min'),
                max = this.element.attr('max');

            // var per = [width-width/(max-min+1)]/(max-min+1);
            var per = width/(max-min);
            var marginLeft = (this.element.val()-min) * per;

            this.ruler.text(this.element.val());

            this.ruler.css({
                marginLeft: marginLeft
            });
        },

        // 控制数量选择控件的最大值
        maxChange: function(url, fn) {
            var self = this;

            NSTS.NET.GET(url, null, function (res) {
                var $number = self.element;

                if (res.success) {
                    var num = res.data;

                    if (num) {
                        $(self.options.toggleBtn).removeClass('disabled');
                        $number.attr('disabled', false);

                        var pos = $number.val() / $number.attr('max');
                        $number.attr('max', num).val(num * pos);

                        self.changeRuler();
                        $('.range-ruler').show();
                        $.isFunction(fn) && fn();
                    } else {
                        $(self.options.toggleBtn).addClass('disabled');
                        $number.attr('disabled', true);
                        $number.attr('max', 0).val(0);
                        $('.range-ruler').hide();
                    }
                } else {
                    $(self.options.toggleBtn).addClass('disabled');
                    $number.attr('disabled', true);
                    $('.range-ruler').hide();
                }
            });
        }
    };

    $.fn.rangeSlider = function(option) {

        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data(NAMESPACE);
            var options = typeof option == 'object' && option;

            if (!data) $this.data(NAMESPACE, (data = new RangeSlider($this, options)));
            if (typeof option == 'string') data[option]();
        });

        $.fn.rangeSlider.constructor = RangeSlider;
    }

})(jQuery);

/*
 * 说明：附加导航插件Affix
 * 具体使用可以参考bootstrap的affix插件
 */
(function ($) {
    var Affix = function (element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options)

        this.$target = $(this.options.target)
            .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
            .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

        this.$element     = $(element)
        this.affixed      = null
        this.unpin        = null
        this.pinnedOffset = null

        this.checkPosition()
    };

    Affix.RESET    = 'affix affix-top affix-bottom'

    Affix.DEFAULTS = {
        offset: 0,
        target: window
    }

    Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
        var scrollTop    = this.$target.scrollTop()
        var position     = this.$element.offset()
        var targetHeight = this.$target.height()

        if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

        if (this.affixed == 'bottom') {
            if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
            return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
        }

        var initializing   = this.affixed == null
        var colliderTop    = initializing ? scrollTop : position.top
        var colliderHeight = initializing ? targetHeight : height

        if (offsetTop != null && scrollTop <= offsetTop) return 'top'
        if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

        return false
    }

    Affix.prototype.getPinnedOffset = function () {
        if (this.pinnedOffset) return this.pinnedOffset
        this.$element.removeClass(Affix.RESET).addClass('affix')
        var scrollTop = this.$target.scrollTop()
        var position  = this.$element.offset()
        return (this.pinnedOffset = position.top - scrollTop)
    }

    Affix.prototype.checkPositionWithEventLoop = function () {
        setTimeout($.proxy(this.checkPosition, this), 1)
    }

    Affix.prototype.checkPosition = function () {
        if (!this.$element.is(':visible')) return

        var height       = this.$element.height()
        var offset       = this.options.offset
        var offsetTop    = offset.top
        var offsetBottom = offset.bottom
        var scrollHeight = Math.max($(document).height(), $(document.body).height())

        if (typeof offset != 'object')         offsetBottom = offsetTop = offset
        if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
        if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

        var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

        if (this.affixed != affix) {
            if (this.unpin != null) this.$element.css('top', '')

            var affixType = 'affix' + (affix ? '-' + affix : '')
            var e         = $.Event(affixType + '.bs.affix')

            this.$element.trigger(e)

            if (e.isDefaultPrevented()) return

            this.affixed = affix
            this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

            this.$element
                .removeClass(Affix.RESET)
                .addClass(affixType)
                .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
        }

        if (affix == 'bottom') {
            this.$element.offset({
                top: scrollHeight - height - offsetBottom
            })
        }
    }

    // AFFIX PLUGIN DEFINITION
    function Plugin(option) {
        return this.each(function () {
            var $this   = $(this)
            var data    = $this.data('bs.affix')
            var options = typeof option == 'object' && option

            if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.affix             = Plugin
    $.fn.affix.Constructor = Affix

    // AFFIX DATA-API
    $(window).on('load', function () {
        $('[data-spy="affix"]').each(function () {
            var $spy = $(this)
            var data = $spy.data()

            data.offset = data.offset || {}

            if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
            if (data.offsetTop    != null) data.offset.top    = data.offsetTop

            Plugin.call($spy, data)
        })
    })

})(jQuery);


/* 说明：图像库查看 插件
   实现：区域分两部分实现图像查看，上面为大图，下面为缩略图；上下都可以上下查看
   参数：包裹元素，一些参数（默认参数放在静态属性里面）
*/
(function ($) {
    //获取当前浏览器支持的前缀
    var _prefix = (function (temp) {
        var aPrefix = ["Moz", "o", "ms", "webkit"],
			props = "";
        for (var i in aPrefix) {
            props = aPrefix[i] + "Transition";
            if (temp.style[props] !== undefined) {
                return "-" + aPrefix[i].toLowerCase() + "-";
            }
        }
        return false;
    })(document.createElement("div"));

    var ImagePreview = (function () {
        function ImagePreview(element, options) {
            this.element = element;
            this.settings = $.extend({}, $.fn.ImagePreview.defaults, options || {});
            this.init();
        }
        ImagePreview.prototype = {
            init: function () {
                var that = this;
                this.imgList = this.settings.imgInfo;
                this.prev = this.element.find(this.settings.pre);
                this.next = this.element.find(this.settings.next);
                this.bigPrev = this.element.find(this.settings.bigPre);
                this.bigNext = this.element.find(this.settings.bigNext);
                this.changeImgWrap = this.element.find(this.settings.changeImgContent);
                this.changeImg = this.changeImgWrap.find("img");
                this.changeImgTitle = this.element.find(".img-name");
                this.changeImgForlevel = this.element.find(".img-forlevel");
                this.changeImgDesc = this.element.find(".img-desc");
                this.content = this.element.find(this.settings.sections);
                this.itemWrap = this.content.find("ul");
                this.activeClass = this.settings.active.substring(1);
                
                
                //确保动画效果结束后点击有效
                this.moveflag = true;

                this.initelement();
                this.initEvent();
            },
            initelement: function () {
                var item = '';
                $(this.imgList).each(function (i, value) {
                    item += '<li class="thumbnail-item">'+
                                '<img src="' + value.src  + '" data-src="' + value.src + '" />' +
                            '</li>';
                });
                this.itemWrap.empty().append(item);

                //this.itemWrap.find("img").each(function (i, img) {
                //    loadPicSize( $(this).data("src"),$(this) );
                //    changePic()
                //});
                // 用了flex之后，这个图像的处理可以不用了。同时之前的缩放比逻辑判断也是错的。@已修改
                function loadPicSize(sourceSrc ,obj) {
                    var img = new Image();
                    img.onload = function () {
                        $(obj).css({ width: 'auto', height: 'auto' })
                        $(obj).attr("src", sourceSrc).hide();
                        var width = $(obj).width();
                        var height = $(obj).height();
                        changePic(width, height, obj);
                    };
                    img.src = sourceSrc;
                }
                function changePic(width, height, obj) {
                    var wScale = width / 106;
                    var hScale = height / 86;
                    if (wScale > hScale) {
                        scale = 106 / width;
                        width = 106;
                        height = height * scale;
                        $(obj).css({
                            width: width,
                            height: height,
                            "margin-top": Math.floor((86 - height) / 2)
                        }).show();
                    } else {
                        scale = 86 / height;
                        height = 86;
                        width = width * scale;
                        $(obj).css({
                            width: width,
                            height: height,
                            "margin-left": Math.floor((106 - width) / 2)
                        }).show();
                    }
                }

                this.item = this.content.find(this.settings.section);
                this.itemCount = this.getItemCount();
                this.index = (this.settings.index > 0 && this.settings.index < this.itemCount) ? this.settings.index : 0;
                this.pageCount = Math.ceil(this.itemCount / 6);
                this.pageIndex = 0;

                this.width = this.item[0].offsetWidth;
                var marginWidth = this.item.css("margin-right").split("px")[0] - 0;
                this.itemWidth = this.width + marginWidth;
                this.itemWrap.width(this.itemCount * (this.itemWidth) + "px");

                if (this.itemCount <= 6) {
                    this.prev.hide();
                    this.next.hide();
                }
            },
            getItemCount: function () {
                return this.item.length;
            },
            initCancleEvent:function(){
                this.prev.off("click");
                this.next.off("click");
                this.item.off("click");
                this.bigPrev.off("click");
                this.bigNext.off("click");
                this.itemWrap.off("transitionend webkitTransitionEnd oTransitionEnd otransitionend");
            },
            initEvent: function () {
                var that = this;
                
                this.initCancleEvent();
                this.item.removeClass(this.activeClass);
                if (this.settings.activeIndex && this.settings.activeIndex != this.index) {
                    this.index = this.settings.activeIndex;
                    this.checkPageMove();
                }
                this.changeImgSrc(this.imgList[this.index].src, this.index);
                this.item.eq(this.index).addClass(this.activeClass);
                this.checkBtnShow();
                this.pageMove();

                this.prev.on("click", function () {
                    if (that.moveflag) {
                        that.prePage();
                    }
                });
                this.next.on("click", function () {
                    console.log(that.moveflag);
                    if (that.moveflag) {
                        that.nextPage();
                    }
                });
                this.item.on("click", function () {
                    $(this).addClass(that.activeClass).siblings().removeClass(that.activeClass);
                    that.checkIndex();
                    that.checkBtnShow();
                    var src = $(this).find("img").attr("src");
                    that.changeImgSrc(src, that.index);
                    //if ((that.index + 1) % 6 == 0 || (that.index + 1) % 6 == 5 && that.index > 5) {
                    //    console.log(that.index);
                    //    that.pageMove(that.index);
                    //}
                });

                /*点击上方的上下页时*/
                this.bigPrev.on("click", function (e) {
                    e.stopPropagation();
                    that.preItem();
                    that.checkBtnShow();
                    that.item.removeClass(that.activeClass).eq(that.index).addClass(that.activeClass);
                    that.changeImgSrc(that.getImgSrc(that.index), that.index);
                });
                this.bigNext.on("click", function (e) {
                    e.stopPropagation();
                    that.nextItem();
                    that.checkBtnShow();
                    that.item.removeClass(that.activeClass).eq(that.index).addClass(that.activeClass);
                    that.changeImgSrc(that.getImgSrc(that.index), that.index);
                });

                /*支持CSS3动画的浏览器，绑定transitionend事件(即在动画结束后调用起回调函数)*/
                if (_prefix) {
                    that.itemWrap.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function () {
                        that.moveflag = true;
                        if (that.settings.callback && $.type(that.settings.callback) === "function") {
                            that.settings.callback();
                        }
                    })
                }
            },
            changeImgSrc: function (src, index) {
                this.changeImg.attr("src", src);
                this.changeImgTitle.text(this.imgList[index].name);
                this.changeImgForlevel.text(this.imgList[index].forlevel);
                this.changeImgDesc.text(this.imgList[index].desc);
            },
            checkIndex: function(){
                var that = this;
                this.item.each(function (i, val) {
                    if ($(this).hasClass(that.activeClass)) {
                        that.index = i;
                        return false;
                    }
                });
            },
            getImgSrc: function(index){
                return this.item.eq(index).find("img").attr("src");
            },
            checkPageMove:function(){
                if (this.pageIndex != Math.floor(this.index / 6)) {
                    this.pageIndex = Math.floor(this.index / 6);
                    this.pageMove();
                }
            },
            preItem: function () {
                if (this.index > 0) {
                    this.index--;
                } else if (this.settings.loop) {
                    this.index = this.itemCount - 1;
                }
                this.checkPageMove();
            },
            nextItem: function () {
                if (this.index < this.itemCount - 1) {
                    this.index++
                } else if (this.settings.loop) {
                    this.index = 0;
                }
                this.checkPageMove();
            },
            checkBtnShow: function () {
                if (this.itemCount == 1) {
                    this.bigPrev.hide();
                    this.bigNext.hide();
                    return;
                }
                if (this.index == 0) {
                    this.bigPrev.hide();
                    this.bigNext.show();
                } else if (this.index == this.itemCount - 1) {
                    this.bigPrev.show();
                    this.bigNext.hide();
                } else {
                    this.bigPrev.show();
                    this.bigNext.show();
                }
            },
            prePage: function(){
                if (this.pageIndex > 0) {
                    this.pageIndex--;
                } else if (this.settings.loop) {
                    this.pageIndex = this.pageCount - 1;
                }
                this.pageMove();
            },
            nextPage: function () {
                if (this.pageIndex < this.pageCount-1) {
                    this.pageIndex++
                } else if (this.settings.loop) {
                    this.pageIndex = 0;
                }
                this.pageMove();
            },
            pageMove: function (length) {
                var that = this;
                
                //if (_prefix) {
                //    var translate = "translateX(-" + this.itemWidth * length + "px)";
                //    this.itemWrap.css(_prefix + "transition", "all " + that.settings.duration + "ms " + that.settings.easing);
                //    this.itemWrap.css(_prefix + "transform", translate);
                //}
                if (_prefix) {
                    var translate = "translateX(-" + this.pageIndex * this.itemWidth * 6 + "px)";
                    this.itemWrap.css(_prefix + "transition", "all " + that.settings.duration + "ms " + that.settings.easing);
                    this.itemWrap.css(_prefix + "transform", translate);
                } else {
                    //var animateCss = me.direction ? { top: -dest.top } : { left: -dest.left };
                    this.itemWrap.animate(animateCss, me.settings.duration, function () {
                        that.moveflag = true;
                        //if (me.settings.callback) {
                        //    me.settings.callback();
                        //}
                    });
                }
            }
        };
        return ImagePreview;
    })();

    $.fn.ImagePreview = function (options) {
        return this.each(function () {
            var that = $(this),
                //instance = that.data("ImagePreview");
            instance = new ImagePreview(that, options);
            //if (!instance) {
            //    that.data("ImagePreview", (instance = new ImagePreview(that, options)));
            //} else {
            //    instance.init();
            //}
            if ($.type(options) == "string") {
                return instance[options]();
            }
        });
    };

    $.fn.ImagePreview.defaults = {
        index: 0,
        loop: true,
        duration: 500,
        easing: "linear",
        active: ".active",
        bigPre: ".img-pre",
        bigNext: ".img-next",
        changeImgContent: ".gallery-change",
        pre: ".thumb-pre",//下方显示条
        next: ".thumb-next",
        sections: ".thumbnail-content",
        section: ".thumbnail-item",
        callback: ""
    };
})(jQuery);

/*
    说明：图像库的类
    实现：根据后台接口数据,将图像涉及的相关知识点树状显示；点击某二级知识点显示该知识点下面的所有图像；点击图像节点，后台获取对应的图像缩略图并显示
    参数：默认两个获取知识点地址、最小化按钮不显示、没有回调；继承的时候主要覆盖 imageClick 事件
    返回：通过getvalue可以获取tree的结构，通过getparentValue可以获取包装后的结构
*/
var ImageLibrary = function (options) {
    this.element = $("<div>").attr("id", "tree-wrap").addClass("clearfix");
    this.options = $.extend({}, ImageLibrary.default, options || {});
    this.init();
};
ImageLibrary.prototype = {
    init: function () {
        this.initBody();
        this.initElement();
    },
    initBody: function () {
        this.treeTitle = $('<div class="tree-info">' +
                            '<h3 id="map-title">图像库</h3>' +
                            '<span class="tree-min-model"><i class="nucfont inuc-arrow-circle-right inuc-fw"></i></span>' +
                        '</div>');
        this.treeTrunk = $("<div>").attr("id", "tree");
        this.minModal = this.treeTitle.find(".tree-min-model");
        this.element.append(this.treeTitle, this.treeTrunk);
        if (this.options.minModal) { // 默认设置最小化按钮隐藏
            this.minModal.show();
        }
    },
    initElement: function () {
        var that = this;
        var treeTrunkSrc = APIURI + this.options.firstlevelSrc;	//树干初始化，获取数据地址
        var iconClass = {
            '枪支、军用或警用械具类(含主要零部件)物品':'gun',
            '爆炸物品类':'bomb',
            '管制刀具':'ctrlKnife',
            '易燃、易爆物品':'flammable',
            '剧毒物品':'heightToxic',
            '腐蚀性物品':'etch',
            '放射性物品':'radiate',
            '其他危害飞行安全的物品':'otherEndanger',
            '国家法律法规规定的其他禁止携带、运输的物品':'forbid',
            '利器':'coldSteel',
            '钝器':'blunt',

            '锐器':'coldSteel',
            '爆炸或者燃烧物质和装置':'bomb',
            '管制器具':'ctrlKnife',
            '其他物品':'otherEndanger',
            '其他':'otherEndanger',
            '空包':'otherEndanger',
            '枪支等武器（包括主要零部件）':'gun',
            '禁止作为行李托运且随身携带有限定条件的物品':'forbid',
            '随身携带有限定条件但可以作为托运行李的物品':'radiate',
            '禁止随身携带但可作为行李托运有限定条件的物品':'etch',
            '危险物品':'flammable',
            '国家法律、行政法规、规章规定的其他限制运输的物品':'heightToxic',

            '设备知识': 'bomb',
            '操作手册': 'gun',
            '法律法规': 'radiate',
            '基本知识': 'etch',
            '危险品类':'flammable',
            '服务礼仪类':'otherEndanger'
        };
        NSTS.NET.GET(treeTrunkSrc, null, function (data) {
            console.log(data)
            if (!data.success) {
                return
            }
            let dataLen= data.data.length;
            let treeHtml = '<ul class="tree-container tree-children">';
            data.data.forEach((item, index) => {
                let treeClass = '';
                let childrenLen = item.children.length;
                if (childrenLen !== 0) {
                    if (index == 0 && index !== dataLen - 1) {
                        treeClass = "tree-node tree-first tree-close";
                    }
                    else if (index == dataLen - 1) {
                        treeClass = "tree-node tree-last tree-close";
                    }
                    else {
                        treeClass = "tree-node tree-close";
                    }
                }
                else {
                    treeClass = "tree-node tree-leaf";
                }
                treeHtml += `<li class="${treeClass}">
                                    <i class="tree-icon tree-ocl"></i>
                                    <a href="#" class="tree-anchor ${childrenLen? 'firstnode': 'img'}" data-id="${item.id}" data-type="${item.type}" data-num="${item.size}">
                                        <i class="nucfont ${childrenLen? 'inuc-folder': iconClass[item.name]}"></i>${item.name}(${item.size})
                                    </a>
                                    ${branch(item.children)}
                            </li>`;
            });
            treeHtml += '</ul>';
            that.treeTrunk.append(treeHtml);
            //渲染到指定的容器中。不含外面的包裹层
            if (that.options.renderToPage) {
                that.element.appendTo($(that.options.treeWrapContainer));
            }
            that.initEvent();
            $.isFunction(that.options.loadedCallback) && that.options.loadedCallback();
        });
        function branch(data) {
            if(data.length === 0) {
                return '';
            }
            let html = '<ul class="subnode">';
            let len = data.length - 1;
            data.forEach((item, index) => {
                let icon = iconClass[item.name];
                let childrenLen = item.children.length;
                let treeClass = '';
                if (index == len) {
                    treeClass = "tree-last tree-leaf";
                }
                else {
                    treeClass = "tree-leaf";
                }
                html += `<li class="tree-node ${treeClass}">
                            <i class="tree-icon tree-ocl"></i>
                            <a class="tree-anchor ${childrenLen ? '': 'img'}" data-id="${item.id}" data-type="${item.type}" data-num="${item.size}">
                                <i class="nucfont ${childrenLen ? 'inuc-folder': icon }"></i>
                                ${item.name}(${item.size})
                            </a>
                            ${childrenLen? branch(item.children): ''}
                        </li>`
            });
            html += `</ul>`;
            return html;
        }
    },
    initEvent: function () {
        var that = this;
        this.treeTrunk.on('click','.tree-anchor:not(.img, .img-obj-host)',function(e) {
            e.stopPropagation();
            $(this).next('.subnode').slideToggle();
            if ($(this).find('> i').hasClass('inuc-folder-open')) {
                $(this).find('> i').removeClass('inuc-folder-open').addClass('inuc-folder');
            } else {
                $(this).find('> i').removeClass('inuc-folder').addClass('inuc-folder-open');
            }
        })
        this.treeTrunk.on('click','.tree-ocl',function(e){
            e.stopPropagation();
            $(this).next().click();
        });
        this.treeTrunk.on('click', '.tree-anchor.img', function(e) {
            e.stopPropagation();
            secondLevelOpen($(this),e);
        })
        this.treeTrunk.on('click', '.tree-anchor.firstnode', function(e) {
            e.stopPropagation();
            if ($(this).parent().hasClass('tree-open')) {
                $(this).parent().removeClass('tree-open').addClass('tree-close');
            } else {
                $(this).parent().removeClass('tree-close').addClass('tree-open');
            }
        })

        //二级树打开与否/加载数据与否
        function secondLevelOpen(obj, e) {
            var $tree_node = $(obj).parent();
            var searchId = $(obj).data("id");
            var searchType = $(obj).data("type");

            // 如果secondLevelSrc传值为空，不展开二级树
            if (!that.options.secondLevelSrc) {
                that.clickImage(e);
                return;
            }
            if ($(obj).hasClass("searched")) {
                if ($(obj).hasClass("disabled")) {
                    return false;
                }
                if ($tree_node.hasClass("tree-open")) {
                    $tree_node.removeClass("tree-open").addClass("tree-close");
                    $(obj).next("ul").slideUp();
                } else {
                    $tree_node.removeClass("tree-close").addClass("tree-open");
                    $(obj).next("ul").slideDown();
                }
            } else {
                console.log(`%c 图像库类型加载数据....`,'background:#000;color:#f90');
                getImageInfo(obj, searchId, searchType);
            }
        }
        //点击二级树节点，获取该节点知识点里面包含的图像
        function getImageInfo(obj, dataId, dataType) {
            var $tree_node = $(obj).parent();
            searchUrl = APIURI + that.options.secondLevelSrc;
            searchUrl = searchUrl + 'knowledge=' + dataId + '&type=' + dataType;
            NSTS.NET.GET(searchUrl, null, function (data) {
                console.log(data)
                var dataLen = data.data.length;
                if (!data.success) {
                    return false;
                }
                if (dataLen == 0) {
                    $(obj).addClass("searched disabled");
                }
                if (dataLen > 0) {
                    $tree_node.hasClass("tree-leaf") ? $tree_node.removeClass("tree-leaf").addClass("tree-open") : null;
                    $(obj).addClass("searched").find(".nucfont");

                    var item = '<ul class="tree-children" data-imglength="' + dataLen + '">';
                    $(data.data).each(function (i, value) {
                        var subTreeClass = 'tree-leaf';
                        if (i == dataLen - 1) {
                            subTreeClass = "tree-last tree-leaf";
                        }
                        item += '<li class="tree-node ' + subTreeClass + '">' +
                                    '<i class="tree-icon tree-ocl"></i>' +
                                    '<a href="#" class="tree-anchor img-obj-host" data-resid="' + value.id + '">' +
                                        '<i class="nucfont inuc-file-image-o"></i>' +
                                         value.name +
                                    '</a>' +
                                '</li>';
                    });
                    item += '</ul>';
                    $(obj).after(item);
                }
                that.imageHost = that.treeTrunk.find(".img-obj-host");
                //将点击图像icon的事件单独出来
                that.clickImage();
            });
        }
        //点击最小化按钮
        this.minModal.on("click", function (e) {
            e.stopPropagation();
            that.element.parents('.map-menu').css({
                transition: ".4s",
                transform:"translateX(100%)"
            });
        });
        //如果最大化存在，初始化事件
        if (this.maxModal) {
            this.maxModal.on("click", function () {
                that.maxModal.hide();
                that.element.parents('.map-menu').css("transform", "translateX(0)");
            });
        }
        //初始化事件后，再去处理需要展开的树节点
        if (this.options.needInitActive) {
            this.initActive();
        }
    },
    initActive: function () {
        throw new Error("需要子类去实现！");
    },
    clickImage: function () {
        console.log("提醒：点击图像icon这个事件应该在子类中单独实现！！！");
        //this.imageHost.on("click", function (e) {
        //    var imgObjId = $(this).data("resid");
        //    if (!$(this).hasClass("active")) {
        //        $("#tree").find(".img-obj-host").removeClass("active");
        //        $(this).addClass("active");
        //    } else {
        //        return false;
        //    }
        //    $(".img-view-btn").show(); //显示 “CT图像查看”按钮
        //    $(".img-view-wrap").show();
        //    $(".img-detail-wrap").hide();
        //    showObjImg(imgObjId);
        //});
    },
    getElement: function () {
        return this.element;
    },
    getElementParent: function () {
        this.elementWrap = $("<div>").addClass("map-section");
        //this.element.addClass("map-section");
        this.elementWrap.append(this.element, this.maxModal);
        return this.elementWrap;
    }
};
ImageLibrary.default = {
    firstlevelSrc: "api/DR/DirectoryTree",
    secondLevelSrc: "api/DR/TreeNodes?",
    imageClickSrc: "api/DR/DetailInfo?",
    minModal: false,
    treeWrapContainer: ".map-section",
    renderToPage: true, //是否实例化的时候渲染后页面指定的容器中
    needInitActive:false,
    callback: null,
    loadedCallback: null  //元素加载完毕的回调
};

//秒转换时分秒
function formatSeconds(value) {
    var theTime = parseInt(value); // 秒 
    var theTime1 = 0; // 分 
    var theTime2 = 0; // 小时  
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
        }
    }
    var result = "" + parseInt(theTime) + "秒";
    if (theTime1 > 0) {
        result = "" + parseInt(theTime1) + "分" + result;
    }
    if (theTime2 > 0) {
        result = "" + parseInt(theTime2) + "小时" + result;
    }
    return result;
}