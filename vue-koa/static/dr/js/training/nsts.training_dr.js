/*
 * 说明：DR图像显示
*/
"use strict"
class TrainingBaseDR  {
    constructor(options) {
        this.options = $.extend({}, TrainingBaseDR.defaults, options || {});
        this.initStart(); // 整体控制
    }
    initStart() {
        // this.bindEventBtnClose(); // 全屏关闭按钮初始化
        this.btPrev = $('.btn-prev'); //上一页
        this.btNext = $('.btn-next'); //下一页
        this.btPrevWrap = $('.j-prevbtn');
        this.btNextWrap = $('.j-nextbtn');
        this.index = 0; //当前图像索引
        this.pageEventBind(); // 翻页事件

        this.options.DrWidth = Math.floor($('.j-dr-container').width());
        this.options.DrHeight = Math.floor($('.j-dr-container').height());

        this.Viewer = new DrViewer(this.options);
    }
    pageEventBind() {
        let that = this;
        this.btPrev.click(function () {
            that.prevImg();
        });
        this.btNext.click(function () {
            that.nextImg();
        });
    }
    prevImg() {
        if (this.Viewer.hasLoaded) {
            this.index--;
            this._show();
        }
    }
    nextImg() {
        if (this.Viewer.hasLoaded) {
            this.index++;
            this._show();
        }
    }
    bindEventBtnClose() {
        let that = this;
        this.btclose = $('#btclose');
        this.btclose.click(function () {
            window.parent.document.getElementById('iframepage').src = '';
            let fulldiv = window.parent.document.getElementById('fulldiv');
            $(fulldiv).trigger('click.exit');
            window.parent.document.getElementById('fulldiv').style.display = 'none';

            if (window.parent.document.exitFullscreen) {
                window.parent.document.exitFullscreen();
            }
            else if (window.parent.document.msExitFullscreen) {
                window.parent.document.msExitFullscreen();
            }
            else if (window.parent.document.mozCancelFullScreen) {
                window.parent.document.mozCancelFullScreen();
            }
            else if (window.parent.document.webkitCancelFullScreen) {
                window.parent.document.webkitCancelFullScreen();
            }
        });
        //退出键关闭监控
        $(document).keyup(function (event) {
            if (event.keyCode == 27 || event.keyCode == 96) {
                that.btclose.click();
            }
        });
    }
    setResList(reslist) {
        // 设置判图资源数
        if (reslist == null || reslist.length == 0) {
            return false;
        }
        this.AllCount = reslist.length;
        return true;
    }
    _show() {
        let anglesInfo = this.angles;
        this.Viewer.initShowDR(anglesInfo);
        this.doSubClassThing();//再细化的操作，交给继承类(具体业务需求)决定；需要覆盖
    }
    doSubClassThing() {
        throw new Error('抽象方法，必须由子类实现！');
    }
    showImgInfo(data) {
        let imgInfo = data;
        $('.img-name').text(imgInfo.name);// 图像名称
        $('.img-kpoint').text(imgInfo.knowledgeName || '暂无'); // 知识点
        $('.goods-name').text(imgInfo.typeName); // 物品名称
        $('.feature-desc').text(imgInfo.description != '' ? imgInfo.description : '暂无'); // 特征描述
    }
    countDown(time) {
        let that = this;
        this.$countElem = $('.j-time-wrap');
        this.$timeRemainElem = $('.j-time');
        this.time = time;
        this.CountDownId = null;
    }
    timerStart() {
        let that = this;
        let timeRemain = this.time;
        this.timeUsed = 0; //用时
        this.overTime = false; //是否超时
        this.CountDownId = setInterval(countTime, 1000);
        this.$countElem.show();
        this.$timeRemainElem.html(converTime(this.time));
        function countTime() {
            if (that.CountDownId) {
                --timeRemain;
                that.$timeRemainElem.html(converTime(timeRemain));
                that.timeUsed = (that.time - timeRemain);
                if (timeRemain < 1) {
                    //时间结束，后续操作业务类在覆盖
                    clearInterval(that.CountDownId);
                    that.CountDownId = null;
                    that.timerEnd();
                }
            }
        }
        function converTime(time) {
            if (time > 60) {
                let h = Math.floor(time / 3600);
                let m = Math.floor((time - 3600 * h) / 60);
                m = m < 10 ? '0' + m : m;
                let s = (time - 3600 * h) % 60;
                s = s < 10 ? '0' + s : s;
                if (time < 3600) {
                    return m + '分 ' + s + '秒';
                }
                else {
                    return h + '时 ' + m + '分 ' + s + '秒';
                }
            }
            else {
                return (time < 10 ? '0' + time : time) + '秒';
            }
        }
    }
    timerEnd() {
        throw new Error('抽象方法，必须由子类实现！');
    }
    cancelCountDown() {
        clearInterval(this.CountDownId);
        this.$countElem.hide();
        this.$timeRemainElem.empty();
        this.CountDownId = null;
    }
    alertInfo(msg) {
        let that = this;
        let alertLayer = (function () {
            let alert = null;
            return function () {
                if (!alert) {
                    alert = $('<div class="m-alert">');
                    alert.append(`<div class="alert-wrap">
                                    <header>
                                        <h4 class="title">提示</h4>
                                        <a class="alert-close nucfont inuc-close"></a>
                                    </header>
                                    <section class="j-alert-html">
                                        <p>正确：12</p>
                                        <p>错误：2</p>
                                        <div class="text-center warning">
                                            <p><i class="nucfont inuc-info-circle"></i>该题只能作答一次</p>
                                            <p><i class="nucfont inuc-clock-o"></i>作答时间：27s</p>
                                        </div>
                                    </section>
                                    <footer>
                                        <a class="u-btn alert-sure">确定</a>
                                    </footer>
                                </div>`)
                    $('body').append(alert);
                    return alert;
                }
                return alert;
            }
        })();
        $('body').on('click', '.alert-close,.alert-sure', function (e) {
            e.stopPropagation();
            $('.m-alert').hide();
            that.alertCB && that.alertCB();//点击alert后的回调
        });
        this.alert = alertLayer();
        this.$alertContent = this.alert.find('.j-alert-html');
        this.alertsure = $('.alert-sure');
        this.alertsure.click(function () {
            that.closeFullScreenCb && that.closeFullScreenCb();
        })
    }
    checkPreNext() {
        if (this.AllCount === 1) {
            this.btPrevWrap.hide();
            this.btNextWrap.hide();
        } else {
            this.btPrevWrap.show();
            this.btNextWrap.show();
        }
        if (this.index === 0) {
            this.btPrevWrap.hide();
        } else if (this.index === this.AllCount - 1) {
            this.btNextWrap.hide();
        } else {
            this.btPrevWrap.show();
            this.btNextWrap.show();
        }
    }
}
//配置一些基本的DR类参数
TrainingBaseDR.defaults = {
    showTool : true, // 是否需要显示工具条；默认显示，考题添加出可能不需要
    callback: ''
};


/*
*   下面为子类
*/


/*  1
    说明：DR图像库全屏查看
*/
class MapPreviewDR extends TrainingBaseDR {
    constructor() {
        super();
        this.initElement();
    }
    initElement() {
        let that = this;
        $('#lessontitle').text('DR图像查看');
        $('.j-header-info').css('display', 'flex');
        // this.$mapMenu = $('.map-menu');
        // this.$mapMenu.show();
      }
      init(executeSql, initShowId=null) {
        let that = this;
        let mapMenu = new MapMenu({drinstance: this, executeSql, initShowId})
        // mapMenu.mapOuter.find('li').eq(0).click()
        // this.LessonID = id;
        // $.ajax({
        //   url: `http://10.13.62.25:8070/api/DR/Query?PageNO=1&Limit=0&Offset=0`,
        //   headers: {
        //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NUVEMjkyQTkwQUNFQkNGNUZCNTYxOTNBMzMxQ0NDMiIsImlhdCI6MTUxNjg0NjI0MCwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjYwMDY0MDAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjM2MDgwNzkyMzkzMzA1MzMzMDAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoi6LaF57qn566h55CG5ZGYIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsIk9yZ0lEIjoiMzYwODA3OTIzOTMzMDUzMzM3NiIsIkVudGVycHJpc2VDb2RlIjoiIiwibmJmIjoxNTE2ODQ2MjM5LCJleHAiOjE1NDI4NTI2MzksImlzcyI6Ik5TVFMuTlVDVEVDSC5DT00iLCJhdWQiOiJOU1RTX1VTRVIifQ.3_aYso892uDawzGIh46EKx8t2cYuk6i01t9EZmUD2uw'
        //   },
        //   success (data) {
        //     console.log(data)
        //     // that.initShow(data);

        //   }
        // })
    }
    initShow(id) {
      this.Viewer.showDR(id)
    }
    IntoResShow(resinfo) {
        if (this.setResList(resinfo)) {
            this.ResInfo = resinfo;
            this.Viewer.isDanger = resinfo.isDanger;
            this.angles = resinfo.angles;
            this._show();
        }
    }
    doSubClassThing() {
        this.showImgInfo(this.ResInfo);
        this.checkPreNext();
        this.preventDubHitFlag = true;
    }
    checkPreNext() {
        let imgCount = +$('#tree .tree-anchor.active').parent().parent().data('imglength');
        let $imgActiveIndex = $('#tree .tree-anchor.active').parent().index()+1;
        if (imgCount == 1) {
            this.btPrevWrap.hide();
            this.btNextWrap.hide();
        } else {
            this.btPrevWrap.show();
            this.btNextWrap.show();
        }
        if ($imgActiveIndex == 1) {
            this.btPrevWrap.hide()
        } else if ($imgActiveIndex == imgCount) {
            this.btNextWrap.hide();
        } else {
            this.btPrevWrap.show();
            this.btNextWrap.show();
        }
    }
    prevImg() {
        if (this.Viewer.hasLoaded) {
            var $imgActiveParent = $('#tree .tree-anchor.active').parent().parent();
            var imgCount = +$('#tree .tree-anchor.active').parent().parent().data('imglength');
            var $imgActive = $('#tree .tree-anchor.active').parent().index();
            if ($imgActive >= 1) {
                var nextIndex = $imgActive - 1;
                var $treeAnchor = $imgActiveParent.find('li').eq(nextIndex).find('.tree-anchor');
                $imgActiveParent.find('.tree-anchor').removeClass('active');
                var resId = $treeAnchor.addClass('active').data('resid');
                this.init(resId);
            }
        }
    }
    nextImg() {
        if (this.Viewer.hasLoaded) {
            var $imgActiveParent = $('#tree .tree-anchor.active').parent().parent();
            var imgCount = +$('#tree .tree-anchor.active').parent().parent().data('imglength');
            var $imgActive = $('#tree .tree-anchor.active').parent().index();
            if ($imgActive < imgCount - 1) {
                var nextIndex = $imgActive + 1;
                var $treeAnchor = $imgActiveParent.find('li').eq(nextIndex).find('.tree-anchor');
                $imgActiveParent.find('.tree-anchor').removeClass('active');
                var resId = $treeAnchor.addClass('active').data('resid');
                this.init(resId);
            }
        }
    }
}

/*  2
    说明：DR 课件查看
*/
class CourseWareDR extends TrainingBaseDR {
    constructor() {
        super();
    }
    init(id) {
        let that = this;
        this.LessonID = id;
        NSTS.NET.GET(APIURI + 'api/DRCourseware/DetailInfo?id=' + this.LessonID, null, function (data) {
            console.log(data);
            if (!data.success) {
                NSTS.Plugin.Alert.Error(data.error, function () {
                    that.btclose.click();
                });
                return;
            }
            that.IntoResShow(data.data);
        });
    }
    IntoResShow(resinfo) {
        if (this.setResList(resinfo.resources)) {
            this.ResInfo = resinfo;
            this.courseInfo = this.ResInfo.resources; //课件信息，包含dr，ct，实物图像等完整信息
            this.initElement();
            this.adapter_Show();
        }
    }
    initElement() {
        let courseWareInfo = this.courseInfo.name;
        $('#lessontitle').text(courseWareInfo);
        $('.j-header-info').html('<a class="img-index j-cur-index"></a>/<a class="j-total-index"></a>').css('display', 'flex');
        $('.j-total-index').text(this.AllCount);
        this.$curIndex = $('.j-cur-index');
    }
    extractCourseWareInfo(){
        this.courseWareName = this.ResInfo.name; //课件名称
        this.courseWareDesc = this.ResInfo.description; //课件描述
        this.courseWareHour = this.ResInfo.classHour;   //课件学时
        this.courseWareScore = this.ResInfo.classScore; //课件学分
        this.courseWareKnowledge = this.ResInfo.knowledgeName;  //课件知识点
        this.courseTopicCount = this.ResInfo.resources.length;  //课件题目量
    }
    adapter_Show() {
        this.angles = this.courseInfo[this.index].image.angles;   //提取出具体的DR图像相关信息
        this.Viewer.isDanger = this.courseInfo[this.index].image.isDanger;
        this._show();
    }
    doSubClassThing() {
        this.$curIndex.text(this.index + 1);
        this.showImgInfo(this.courseInfo[this.index].image);
        this.checkPreNext();
    }
    prevImg() {
        if (this.Viewer.hasLoaded) {
            this.index--;
            this.adapter_Show();
        }
    }
    nextImg() {
        if (this.Viewer.hasLoaded) {
            this.index++;
            this.adapter_Show();
        }
    }
}

/*  3
    说明：DR 考卷查看
*/
class PaperDetailDR extends TrainingBaseDR {
    constructor() {
        super();
    }
    init(id) {
        let that = this;
        this.LessonID = id;
        NSTS.NET.GET(APIURI + 'api/DRPaper/GetDetailInfo?id=' + this.LessonID, null, function (data) {
            console.log(data);
            if (!data.success) {
                NSTS.Plugin.Alert.Error(data.error, function () {
                    that.btclose.click();
                });
                return;
            }
            that.intoResShow(data.data);
        });
    }
    intoResShow(resinfo) {
        if (this.setResList(resinfo.topics)) {
            this.ResInfo = resinfo;
            this.topicInfo = this.ResInfo.topics;
            this.initElement();
            this.adapter_Show();
        }
    }
    initElement() {
        $('#lessontitle').text(this.ResInfo.title + '--考卷查看');
        $('.j-header-info').html('<a class="img-index j-cur-index"></a>/<a class="j-total-index"></a>').css('display', 'flex');
        $('.j-total-index').text(this.AllCount);
        this.$curIndex = $('.j-cur-index');
    }
    adapter_Show() {
        this.angles = this.topicInfo[this.index].resource.angles;
        this.Viewer.isDanger = this.topicInfo[this.index].resource.isDanger;
        this._show();
    }
    doSubClassThing() {
        this.$curIndex.text(this.index + 1);
        this.showImgInfo(this.topicInfo[this.index].resource);
        this.checkPreNext();
    }
    prevImg() {
        if (this.Viewer.hasLoaded) {
            this.index--;
            this.adapter_Show();
        }
    }
    nextImg() {
        if (this.Viewer.hasLoaded) {
            this.index++;
            this.adapter_Show();
        }
    }
}

/*  4
    说明：DR 识图学习
*/
class ImgStudyDR extends TrainingBaseDR {
    constructor() {
        super();
        this.initElement();
    }
    initElement() {
        $('#lessontitle').text('DR图像学习');
        this.$headerInfo = $('.j-header-info');
        this.$headerInfo.html('<a class="img-index j-cur-index"></a>/<a class="j-total-index"></a>');
        this.$headerInfo.css('display', 'flex');
        this.$curIndex = $('.j-cur-index');
    }
    init(options) {
        let that = this;
        this.LessonID = options;
        NSTS.NET.GET(APIURI + 'api/DRIStudy/Study/' + this.LessonID, null, function (data) {
            console.log(data);
            if (!data.success) {
                NSTS.Plugin.Alert.Error(data.error, function () {
                    that.btclose.click();
                });
                return;
            }
            that.intoResShow(data.data);
        });
    }
    intoResShow(resinfo) {
        if (this.setResList(resinfo.resources)) {
            this.ResInfo = resinfo.resources;
            $('.j-total-index').text(this.AllCount);
            this.adapter_Show();
        }
    }
    adapter_Show() {
        this.Viewer.isDanger = this.ResInfo[this.index].isDanger;
        this.angles = this.ResInfo[this.index].angles;
        this._show();
    }
    doSubClassThing() {
        this.$curIndex.text(this.index + 1);
        this.showImgInfo(this.ResInfo[this.index]);
        this.checkPreNext();
    }
    prevImg() {
        if (this.Viewer.hasLoaded) {
            this.index--;
            if (this.index < 0) {
                this.index = 0;
                return;
            }
            this.adapter_Show();
        }
    }
    nextImg() {
        if (this.Viewer.hasLoaded) {
            this.index++;
            if (this.index > this.AllCount - 1) {
                this.index = this.AllCount - 1;
                return;
            }
            this.adapter_Show();
        }
    }
}

/* 5
    说明：DR识图练习（三种模式）
*/
class ImgPractiseDR extends TrainingBaseDR {
    constructor() {
        super({ showSusobj: false });
    }
    initElement() {
        let that = this;
        $('#lessontitle').text('DR图像练习');
        $('.j-judge-btns').css('display', 'flex');
        $('.m-title, .j-prevbtn, .marktip').hide();
        $('.j-cur-operate').text('真彩色');
        this.answerBtn = $('.j-judge-btns > .btn-1');    //作答按钮；两个
        this.passBtn = $('.j-pass');
        this.noPassBtn = $('.j-nopas');

        this.isAnswer = false;  //这道题是否作答
        this.answerRecord = []; //答题记录，记录每道题的作答情况
        this.initJudgeEvent();  //绑定判断“通过”和“不过”的事件

        let testInfoHtml = `<div class="test-header-info">
                                <p class ="time-count j-time-wrap">用时: <span class ="j-time">0s</span></p>
                                <p class="test-index-info"><span class="j-cur-index">1</span>/<span class="j-total-index">4</span></p>
                            </div>`;
        $('.m-header').append(testInfoHtml);
        this.$curIndex = $('.j-cur-index');

        if (this.form === 2) {
            //给知识点选中绑定事件
            this.$kpWrap = $('.j-kp-select');
            this.$kpBtn = this.$kpWrap.find('.j-kp');
            this.$kpBtn.click(function () {
                $(this).toggleClass('active');
            });
            this.$kpWrap.find('.j-kp-close').click(function () {
                that.$kpBtn.removeClass('active');
            });
            NSTS.NET.GET(APIURI + 'api/Dictionary/KnowledgePanel', null, (data) => {
                if (!data.success) {
                    console.log('哎呦，报错了')
                }
                console.log(data)
                let kpArr = [];
                data.data.forEach((item) => {
                    kpArr.push(`<a data-id="${item.id}">${item.name}</a>`)
                });
                $('#kplist').html(kpArr.join(''));
                //给知识点选中绑定事件
                that.$kpa = $('#kplist a');
                that.$kpa.click(function () {
                    if (!$(this).hasClass('z-select')) {
                        that.$kpa.removeClass('z-select');
                        $(this).addClass('z-select');
                    }
                });
            })
        }
        if (this.isCountTime) {
            this.countDown(this.exerciseSet.setTopicTime);
            this.Viewer.loadEndCallback = function () {
                if (that.timeSetType === 'full' && !that.hasClocked) {
                    that.timerStart();
                    that.hasClocked = true;
                }
                if (that.timeSetType === 'single') {
                    that.timerStart();
                }
            }
        }
        this.alertInfo();
    }
    init(info) {
        console.log(`%c ${document.location.href} `, 'background:#f90;color:#fff')
        let that = this;
        this.exerciseInfo = info.imgOpts; // 包含练习的知识点，适用级别，题量
        this.exerciseSet = JSON.parse(info.imgSettings); // 包含练习的模式--答题时间、是否答完显示答案、是否复杂模式
        this.isCountTime = this.exerciseSet.setTopicTime > 0; // 是否设置了答题时间
        this.timeSetType = this.exerciseSet.timeSetType; // single: 单题时间；full：整卷时间
        this.form = +this.exerciseSet.topicMode;    //1：简单；2：复杂；3：新模式
        console.info(this.exerciseSet);
        this.initElement();
        NSTS.NET.GET(APIURI + 'api/DRIStudy/Practise/' + this.exerciseInfo, null, function (data) {
            console.log(data);
            if (!data.success) {
                NSTS.Plugin.Alert.Error(data.error, function () {
                    that.btclose.click();
                });
                return;
            }
            that.intoResShow(data.data);
        });
    }
    intoResShow(resinfo) {
        if (this.setResList(resinfo.resources)) {
            this.ResInfo = resinfo.resources;
            $('.j-total-index').text(this.AllCount);
            this.adapter_Show();
        }
    }
    timerEnd() {
        let that = this;
        if (this.timeSetType === 'single') {
            this.answerBtn.addClass('disabled');
            if (this.form === 2) {
                this.$kpWrap.hide();
            }
            this.alert.show();
            this.$alertContent.html(`<div class="text-center warning">
                                    <p><i class ="nucfont inuc-info-circle"></i>作答时间已到！</p>
                                    <p><i class ="nucfont inuc-clock-o"></i>用时：${this.timeUsed}s</p>
                                </div>`);
            this.$countElem.hide();
            this.$timeRemainElem.empty();
            //答题超时标识
            this.overTime = true;
            //已做答标识
            this.isAnswer = true;
            this.alertsure.one('click', function () {
                that.nextImg();
            });
        }
        else {
            this.recordAnswer();
            this.index++;
            this.answerBtn.removeClass('active').addClass('disabled');
            if (this.form === 2) {
                this.$kpWrap.hide();
            }
            this.alert.show();
            this.$alertContent.html(`<div class="text-center warning">
                                    <p><i class ="nucfont inuc-info-circle"></i>考试时间到，请点击提交按钮完成考试！</p>
                                    <p><i class ="nucfont inuc-clock-o"></i>用时：${this.time}s</p>
                                </div>`);
            this.$countElem.hide();
            this.$timeRemainElem.empty();
            for (let i = this.index; i <= this.AllCount - 1; i++) {
                let topicAnswer = {}; //当前题目的作答情况
                topicAnswer.resID = this.ResInfo[i].drID;      //试题的id
                topicAnswer.isPass = null;
                if (this.timeSetType === 'single') {
                    topicAnswer.duration = 0;
                }
                if (this.form !== 1) {
                    if (this.form === 2) {
                        topicAnswer.dangerID = 0;
                    }
                    topicAnswer.signRight = null;
                }
                this.answerRecord.push(topicAnswer);
            }
            this.alertCB = function () {
                that.submit();
            }
        }
    }
    adapter_Show() {
        this.Viewer.isDanger = this.ResInfo[this.index].isDanger;
        this.angles = this.ResInfo[this.index].angles;
        this._show();
    }
    doSubClassThing() {
        this.$curIndex.text(this.index + 1);
        this.answerBtn.removeClass('active disabled');
        this.isAnswer = false;
        if (this.form === 2) {
            this.$kpWrap.hide();
            this.$kpBtn.addClass('active');
            this.$kpa && this.$kpa.removeClass('z-select');
        }
    }
    initJudgeEvent() {
        let that = this;
        this.answerBtn.click(function () {
            if (!$(this).hasClass('active')) {
                that.answerBtn.removeClass('active disabled');
                $(this).removeClass('disabled').addClass('active').siblings('.btn-1').addClass('disabled');
                if (that.form === 2) {
                    if ($(this).hasClass('j-nopass')) {
                        that.$kpWrap.show();
                    } else {
                        that.$kpWrap.hide();
                    }
                }
            }
            that.isAnswer = true;   //已做答标识
        });
    }
    logicalJudgement() {
        let that = this;
        if (this.overTime) {
            this.recordAnswer();
            return true;
        }
        if (!this.isAnswer) {
            this.alert.show();
            this.$alertContent.html(`<div class="text-center warning"><p><i class ="nucfont inuc-info-circle"></i>该题还未作答！</p></div>`);
            return false;
        }
        if (this.form === 2) {
            if (this.answerBtn.filter('.active').hasClass('j-nopass')) {
                if (!this.Viewer.isTipSelected) {
                    this.alert.show();
                    this.$alertContent.html(`<div class="text-center warning"><p><i class ="nucfont inuc-info-circle"></i>你目前选择不通过，还未标记嫌疑物位置！</p></div>`);
                    return false;
                }
                if (this.$kpa.filter('.z-select').length == 0) {
                    this.alert.show();
                    this.$alertContent.html(`<div class="text-center warning"><p><i class ="nucfont inuc-info-circle"></i>你目前选择不通过，还未选择危险品知识点类型！</p></div>`);
                    return false;
                }
            }
        }
        if (this.form === 3) {
            if (this.answerBtn.filter('.active').hasClass('j-nopass')) {
                if (!this.Viewer.isTipSelected) {
                    this.alert.show();
                    this.$alertContent.html(`<div class="text-center warning"><p><i class ="nucfont inuc-info-circle"></i>你目前选择不通过，还未标记嫌疑物位置！</p></div>`);
                    return false;
                }
            }
        }
        //点击判断按钮，如果有有计时，立即停止计时
        if (this.isCountTime) {
            if (this.timeSetType === 'single') {
                this.cancelCountDown();
            }
        }
        this.recordAnswer();
        return true;
    }
    isShowSubmit() {
        let that = this;
        this.answerBtn.hide();
        this.btNext.hide();
        if (this.form === 2) {
            this.$kpWrap.hide();
        }
        $('.j-submit').show();
        $('.j-submit').click(function () {
            that.submit();
            return;
        });
    }
    // 具体的判断逻辑，记录答题情况
    recordAnswer() {
        let topicAnswer = {}; // 当前题目的作答情况
        topicAnswer.resID = this.ResInfo[this.index].drID; // 试题的id
        let $userSelected = this.answerBtn.filter('.active');
        topicAnswer.isPass = $userSelected.length === 0 ? null : $userSelected.data('ispass'); // 是否通过
        if (this.form === 2) {
            topicAnswer.signRight = this.Viewer.selectTipResult; // 标记嫌疑物
            if (!!topicAnswer.isPass) { // 如果没有选择，危险品默认为0
                topicAnswer.dangerID = 0;
            } else {
                if (this.$kpWrap.find('.z-select').length == 0) {
                    topicAnswer.dangerID = 0;
                } else {
                    topicAnswer.dangerID = +this.$kpWrap.find('.z-select').data('id'); // 危险品ID；转为数字
                }
            }
        }
        if (this.form === 3) {
            topicAnswer.signRight = this.Viewer.selectTipResult; // 标记嫌疑物
        }
        if (this.isCountTime) {
            if (this.timeSetType === 'single') {
                topicAnswer.duration = this.timeUsed;
            }
        }
        this.answerRecord.push(topicAnswer); // 加入到总的作答数组中
        console.log(this.answerRecord)
    }
    submit() {
        let that = this;
        let submitUrl = APIURI + `api/DRIStudy/Submit/${this.form}`;   // 2 带包复杂模式提交
        NSTS.NET.POST(submitUrl, that.answerRecord, function (data) {
            if (!data.success) {
                NSTS.Plugin.Alert.Error(data.error);
                return;
            }
            let examineResult = data.data;
            let overTimeHtml = '';
            if (examineResult.overTime > 0) {
                overTimeHtml = `<p><i class ="nucfont inuc-clock-o"></i>超时：${examineResult.overTime}</p>`;
            }
            that.alert.show();
            that.$alertContent.html(`<div class="text-center">
                                        <p><i class ="nucfont inuc-check"></i>正确题数：${examineResult.right}</p>
                                        <p><i class ="nucfont inuc-close"></i>错误题数：${examineResult.wrong}</p>
                                        ${overTimeHtml}
                                    </div>`);
            $('.f-fixr').hide();
            if (that.form === 2) {
                that.$kpWrap.hide();
            }
            that.closeFullScreenCb = function () {
                window.parent.document.querySelector('a[href="/Home/PracticeResult"]').click();
                that.btclose.click();
            }
        });
    }
    nextImg() {
        if (!this.logicalJudgement()) {
            return false
        }
        this.index++;
        if (this.index > this.AllCount - 1) {
            this.index = this.AllCount - 1;
            this.isShowSubmit();
            return false;
        }
        this.adapter_Show();
    }
}

/*  6
    说明：DR 练习记录
*/
class ImgPractiseDR_history extends TrainingBaseDR {
    constructor() {
        super();
        this.initElement();
    }
    initElement() {
        $('#lessontitle').text('DR练习记录');
        $('.j-header-info').html('<a class="img-index j-cur-index"></a>/<a class="j-total-index"></a>').css('display', 'flex');
        this.$curIndex = $('.j-cur-index');
        let testHtml = `<div class="test-info">
                                <div class="test-answer">
                                    <div class="std">
                                        <p>标准答案：<span class ="j-std-asw">通过</span></p>
                                        <p>危险品名称：<span class ="j-std-dangername"></span></p>
                                    </div>
                                    <div class="user">
                                        <p>学员答案：<span class ="j-user-asw">不过</span></p>
                                        <p>危险品名称：：<span class ="j-user-dangername"></span></p>
                                        <p>危险品位置标记：<span class ="j-user-dangermark"></span></p>
                                    </div>
                                </div>
                                <div class="test-result">
                                    <p class="pass j-result">通过</p>
                                    <p class ="j-time-wrap">用时：<span class ="level2 j-usetime">0s</span></p>
                                </div>
                        </div>`;
        $('.m-title .text-info').html(testHtml);

        this.$wrongWrap = $('.test-answer .user p');

        this.$stdAsw = $('.j-std-asw');
        this.$stdDgName = $('.j-std-dangername');
        this.$stdDgNameWrap = this.$stdDgName.parent();

        this.$userAsw = $('.j-user-asw');
        this.$userDgName = $('.j-user-dangername');
        this.$userDgMark = $('.j-user-dangermark');
        this.$userAswWrap = this.$userAsw.parent();
        this.$userDgNameWrap = this.$userDgName.parent();
        this.$userDgMarkWrap = this.$userDgMark.parent();

        this.result = $('.j-result');

        this.isTimeShow = $('.j-time-wrap');
        this.$timeConsuming = $('.j-usetime');
        this.$timeWrap = $('.j-time-wrap'); //用时包裹层
    }
    init(info) {
        let that = this;
        this.LessonID = info.resid;
        this.form = +info.form;  // 是否为复杂模式； 1：简单；2：复杂；3：新模式
        NSTS.NET.GET(APIURI + 'api/DRIStudy/PractiseDetail?id=' + this.LessonID, null, function (data) {
            console.log(data);
            if (!data.success) {
                NSTS.Plugin.Alert.Error(data.error, function () {
                    that.btclose.click();
                });
                return;
            }
            that.intoResShow(data.data);
        });
    }
    intoResShow(resinfo) {
        if (this.setResList(resinfo.resources)) {
            this.userRecords = resinfo.records; // 练习记录信息
            this.ResInfo = resinfo.resources; // 练习中DR的具体信息
            $('.j-total-index').text(this.AllCount);
            if (this.form !== 1) {
                $('.test-answer p').css('display', 'inline-block');
            }
            this.adapter_Show();
        }
    }
    adapter_Show() {
        this.Viewer.isDanger = this.ResInfo[this.index].isDanger;
        this.angles = this.ResInfo[this.index].angles;
        this._show();
    }
    doSubClassThing() {
        this.$curIndex.text(this.index + 1);
        this.checkPreNext();
        this.showImgInfo();
    }
    showImgInfo() {
        let userRecordsInfo = this.userRecords[this.index];
        let stdAswInfo = this.ResInfo[this.index];
        //标准答案
        this.$stdAsw.text(stdAswInfo.isSafe ? '安全' : '危险');
        //学员答案
        this.$userAsw.text(userRecordsInfo.result == 2 ? '超时' : userRecordsInfo.isPass ? '安全' : '危险');
        this.$wrongWrap.removeClass('markwrong');
        if (userRecordsInfo.isPass !== stdAswInfo.isSafe || userRecordsInfo.result == 2) {
            this.$userAswWrap.addClass('markwrong');
        }
        if (this.form == 1) {
            this.$userDgNameWrap.hide();
            this.$userDgMarkWrap.hide();
        }
        else {
            if (this.form === 2) {
                this.$userDgNameWrap.css('display', 'inline-block');
                this.$stdDgNameWrap.css('display', 'inline-block');
            }
            else {
                this.$userDgNameWrap.css('display', 'none');
                this.$stdDgNameWrap.css('display', 'none');
            }
            this.$userDgMarkWrap.css('display', 'inline-block');
            if (userRecordsInfo.isPass || userRecordsInfo.result === 2) {
                this.$userDgNameWrap.hide();
                this.$userDgMarkWrap.hide();
            }
            if (stdAswInfo.isSafe) {
                this.$stdDgNameWrap.hide();
            }
            //如果错误，复杂模式下显示哪一步错了.包含简单复杂
            if (userRecordsInfo.result === 0) {
                if (stdAswInfo.knowledgeName != userRecordsInfo.dangerName) {
                    this.$userDgNameWrap.addClass('markwrong');
                }
                if (!userRecordsInfo.signRight) {
                    this.$userDgMarkWrap.addClass('markwrong');
                }
            }
        }
        //危险品名称
        this.$stdDgName.text(stdAswInfo.knowledgeName);
        this.$userDgName.text(userRecordsInfo.dangerName);
        this.$userDgMark.text(userRecordsInfo.signRight ? '正确' : '错误');
        //答题用时
        if (userRecordsInfo.duration === 0) {
            this.$timeWrap.hide();
        }
        else {
            this.$timeWrap.show();
            this.$timeConsuming.text(userRecordsInfo.duration + 's');
        }
        //显示作答正确与否
        this.result.removeClass('pass nopass timeout');
        userRecordsInfo.result == 2
                ? this.result.addClass('timeout') : userRecordsInfo.result !== 0
                ? this.result.addClass('pass') : this.result.addClass('nopass');
        this.result.text(userRecordsInfo.resultName);
    }
    prevImg() {
        if (this.Viewer.hasLoaded) {
            this.index--;
            this.adapter_Show();
        }
    }
    nextImg() {
        if (this.Viewer.hasLoaded) {
            this.index++;
            this.adapter_Show();
        }
    }
}

/*  7
    说明：DR 在线考试
*/
class ExamineDR extends TrainingBaseDR {
    constructor() {
        super({ showSusobj: false });
    }
    initElement() {
        let that = this;
        $('#lessontitle').text(this.title);
        let testInfoHtml = `<div class="test-header-info">
                                <p class ="time-count j-time-wrap">用时: <span class ="j-time">0s</span></p>
                                <p class="test-index-info"><span class="j-cur-index">1</span>/<span class="j-total-index">4</span></p>
                            </div>`;
        $('.m-header').append(testInfoHtml);
        $('.j-total-index').text(this.AllCount);
        this.$curIndex = $('.j-cur-index');

        $('.j-judge-btns').css('display', 'flex');
        $('.m-title, .j-prevbtn, .marktip').hide();
        $('.j-cur-operate').html(`<span>真彩色</span>`);
        this.answerBtn = $('.j-judge-btns > .btn-1'); // 作答按钮；两个
        this.passBtn = $('.j-pass'); // 通过按钮
        this.noPassBtn = $('.j-nopas'); // 不通过按钮

        this.isAnswer = false;  // 这道题是否作答
        this.answerRecord = []; // 答题记录，记录每道题的作答情况

        if (this.form == 2) {
            this.$kpWrap = $('.j-kp-select');
            this.$kpBtn = this.$kpWrap.find('.j-kp');
            this.$kpBtn.click(function () {
                $(this).toggleClass('active');
            });
            this.$kpWrap.find('.j-kp-close').click(function () {
                that.$kpBtn.removeClass('active');
            });
            NSTS.NET.GET(APIURI + 'api/Dictionary/KnowledgePanel',null, (data) => {
                if (!data.success) {
                    console.log('哎呦，报错了')
                }
                console.log(data)
                let kpArr = [];
                data.data.forEach((item) => {
                    kpArr.push(`<a data-id="${item.id}">${item.name}</a>`)
                });
                $('#kplist').html(kpArr.join(''));
                //给知识点选中绑定事件
                that.$kpa = $('#kplist a');
                that.$kpa.click(function () {
                    if (!$(this).hasClass('z-select')) {
                        that.$kpa.removeClass('z-select');
                        $(this).addClass('z-select');
                    }
                });
            })
        }
        this.alertInfo();
        this.initJudgeEvent();  //绑定判断“通过”和“不过”的事件
        this.countDown(this.duration);
        this.timerStart();
    }
    init(info) {
        let that = this;
        this.planID = info; // 包含练习的知识点，适用级别，题量
        NSTS.NET.GET(APIURI + 'api/DRExam/DetailInfo?id=' + this.planID, null, function (data) {
            console.log(data);
            if (!data.success) {
                NSTS.Plugin.Alert.Error(data.error, function () {
                    that.btclose.click();
                });
                return;
            }
            that.intoResShow(data.data);
        });
    }
    intoResShow(resinfo) {
        //判断是否有数据
        if (this.setResList(resinfo.paper.topics)) {
            this.ResInfo = resinfo.paper.topics;
            this.form = resinfo.paper.form;
            this.duration = resinfo.duration;
            this.title = resinfo.paper.title;
            this.initElement();
            this.adapter_Show();
        }
    }
    timerEnd() {
        let that = this;
        // 先将当前的题目作答情况记录下来
        this.recordAnswer();
        this.index++;
        this.answerBtn.removeClass('active').addClass('disabled');
        if (this.form === 2) {
            this.$kpWrap.hide();
        }
        this.alert.show();
        this.$alertContent.html(`<div class="text-center warning">
                                    <p><i class ="nucfont inuc-info-circle"></i>考试时间到，请点击确定按钮完成考试！</p>
                                    <p><i class ="nucfont inuc-clock-o"></i>用时：${this.duration}s</p>
                                </div>`);
        this.$countElem.hide();
        this.$timeRemainElem.empty();
        for (let i = this.index; i <= this.AllCount - 1; i++) {
            let topicAnswer = {}; //当前题目的作答情况
            topicAnswer.topicID = this.ResInfo[i].id; //试题的id
            topicAnswer.isPass = null;
            if (this.form !== 1) {
                if (this.form === 2) {
                    topicAnswer.dangerID = 0;
                }
                topicAnswer.signRight = null;
            }
            this.answerRecord.push(topicAnswer);
        }
        this.alertCB = function () {
            that.submit();
        }
    }
    adapter_Show() {
        this.Viewer.isDanger = this.ResInfo[this.index].resource.isDanger;
        this.angles = this.ResInfo[this.index].resource.angles; // 提取出具体的DR图像相关信息
        this._show();
    }
    doSubClassThing() {
        this.$curIndex.text(this.index + 1);
        this.isAnswer = false;
        this.answerBtn.removeClass('active disabled'); // 重置判断按钮
        if (this.form == 2) {
            this.$kpWrap.hide();
            this.$kpBtn.addClass('active');
            this.$kpa && this.$kpa.removeClass('z-select');
        }
    }
    //给 “通过”和“不通过”绑定事件.练习不同考试，只能答一次
    initJudgeEvent() {
        let that = this;
        this.answerBtn.click(function (e) {
            //if (that.overTime) {
            //    that.alert.show();
            //    that.$alertContent.html(`<div class="text-center warning"><p><i class ="nucfont inuc-info-circle"></i>该题答题已超时，请继续作答！</p></div>`);
            //    return false;
            //}
            if (!$(this).hasClass('active')) {
                that.answerBtn.removeClass('active disabled');
                $(this).removeClass('disabled').addClass('active').siblings('.btn-1').addClass('disabled');
                if (that.form == 2) {
                    if ($(this).hasClass('j-nopass')) {
                        that.$kpWrap.show();
                    } else {
                        that.$kpWrap.hide();
                    }
                }
            }
            that.isAnswer = true;   //已做答标识
        });
    }
    logicalJudgement() {
        let that = this;
        if (!this.isAnswer) {
            this.alert.show();
            this.$alertContent.html(`<div class="text-center warning"><p><i class ="nucfont inuc-info-circle"></i>该题还未作答！</p></div>`);
            return false;
        }
        if (this.form == 2) {
            if (this.answerBtn.filter('.active').hasClass('j-nopass')) {
                if (!this.Viewer.isTipSelected) {
                    this.alert.show();
                    this.$alertContent.html(`<div class="text-center warning"><p><i class ="nucfont inuc-info-circle"></i>你目前选择不通过，还未标记嫌疑物位置！</p></div>`);
                    return false;
                }
                if (this.$kpa.filter('.z-select').length == 0) {
                    this.alert.show();
                    this.$alertContent.html(`<div class="text-center warning"><p><i class ="nucfont inuc-info-circle"></i>你目前选择不通过，还未选择危险品知识点类型！</p></div>`);
                    return false;
                }
            }
        }
        if (this.form == 3) {
            if (this.answerBtn.filter('.active').hasClass('j-nopass')) {
                if (!this.Viewer.isTipSelected) {
                    this.alert.show();
                    this.$alertContent.html(`<div class="text-center warning"><p><i class ="nucfont inuc-info-circle"></i>你目前选择不通过，还未标记嫌疑物位置！</p></div>`);
                    return false;
                }
            }
        }
        this.recordAnswer();
        return true;
    }
    isShowSubmit() {
        let that = this;
        this.cancelCountDown();
        this.answerBtn.hide();
        this.btNext.hide();
        if (this.form === 2) {
            this.$kpWrap.hide();
        }
        $('.j-submit').show().click(function () {
            that.submit();
            return;
        });
    }
    recordAnswer() {
        let topicAnswer = {}; // 当前题目的作答情况
        topicAnswer.topicID = this.ResInfo[this.index].id; // 试题的id
        let $userSelected = this.answerBtn.filter('.active');
        topicAnswer.isPass = $userSelected.length === 0 ? null : $userSelected.data('ispass');  //是否通过
        if (this.form == 1) {
            topicAnswer.signRight = null;
        }
        if (this.form === 2) {
            topicAnswer.signRight = this.Viewer.selectTipResult; // 标记嫌疑物
            if (!!topicAnswer.isPass) {
                topicAnswer.dangerID = 0;
            }
            else {
                if (this.$kpWrap.find('.z-select').length == 0) {
                    topicAnswer.dangerID = 0;
                } else {
                    topicAnswer.dangerID = Number(this.$kpWrap.find('.z-select').data('id')); // 危险品ID；转为数字
                }
            }
        }
        if (this.form === 3) {
            topicAnswer.signRight = this.Viewer.selectTipResult; // 标记嫌疑物
        }
        this.answerRecord.push(topicAnswer); // 加入到总的作答数组中

        console.log(this.answerRecord)
    }
    submit() {
        let that = this;
        let submitUrl = APIURI + 'api/DRExam/Submit/' + this.planID; // 2 带包复杂模式提交
        NSTS.NET.POST(submitUrl, that.answerRecord, function (data) {
            if (!data.success) {
                NSTS.Plugin.Alert.Error(data.error);
                return;
            }
            let examineResult = data.data;
            that.alert.show();
            that.$alertContent.html(`<div class="text-center">
                                        <p><i class ="nucfont inuc-check"></i>答对题数：${examineResult.rightCount}</p>
                                        <p><i class ="nucfont inuc-close"></i>答错题数：${examineResult.errorCount}</p>
                                        <p><i class ="nucfont inuc-clock-o"></i>分数：${examineResult.userScore}</p>
                                        ${(examineResult.keyAccuracy >= 0) ? `<p><i class ="nucfont inuc-keytopic"></i>关键题正确率：${examineResult.keyAccuracy*100}%</p>`: ''}
                                    </div>`);
            $('.f-fixr').hide();
            that.closeFullScreenCb = function () {
                window.parent.document.querySelector('a[href="/Home/MyExamine"]').click();
                that.btclose.click();
            }
        });
    }
    nextImg() {
        if (!this.logicalJudgement()) {
            return false;
        }
        this.index++;
        if (this.index > this.AllCount - 1) {
            this.index = this.AllCount - 1;
            this.isShowSubmit();
            return false;
        }
        this.adapter_Show();
    }
}

/*  8
    说明：DR 考试记录
*/
class ExamineHistoryDR extends TrainingBaseDR {
    constructor() {
        super();
    }
    init(info) {
        let that = this;
        this.LessonID = info;
        let url = APIURI + 'api/DRExam/DetailInfo?id=' + this.LessonID;
        if (sessionStorage.getItem('userid_myExamine')) {
            url += '&userID=' + sessionStorage.getItem('userid_myExamine');
        }
        NSTS.NET.GET(url, null, function (data) {
            console.log(data);
            if (!data.success) {
                NSTS.Plugin.Alert.Error(data.error, function () {
                    that.btclose.click();
                });
                return;
            }
            that.IntoResShow(data.data);
        });
    }
    IntoResShow(resinfo) {
        if (this.setResList(resinfo.paper.topics)) {
            this.userRecords = resinfo.userRecords; // 练习记录信息
            this.ResInfo = resinfo.paper.topics; // 练习中DR的具体信息
            this.form = resinfo.paper.form;
            this.title = resinfo.paper.title;
            this.initElement();
            this.adapter_Show();
        }
    }
    initElement() {
        $('#lessontitle').text(this.title);
        $('.j-header-info').html(`<i class="nucfont inuc-star j-star" title="关键题"></i><a class="img-index j-cur-index"></a>/<a class="j-total-index"></a>`);
        $('.j-header-info').css('display', 'flex');
        $('.j-total-index').text(this.AllCount);
        this.$curIndex = $('.j-cur-index');
        this.$keyStar = $('.j-star');
        let testHtml = `<div class="test-info">
                                <div class="test-answer">
                                    <div class="std">
                                        <p>标准答案：<span class="j-std-asw">通过</span></p>
                                        <p>危险品名称：<span class ="j-std-dangername"></span></p>
                                    </div>
                                    <div class="user">
                                        <p>学员答案：<span class ="j-user-asw">不过</span></p>
                                        <p>危险品名称：<span class ="j-user-dangername"></span></p>
                                        <p>危险品位置标记：<span class ="j-user-dangermark"></span></p>
                                    </div>
                                </div>
                                <div class="test-result">
                                    <p class="pass j-result">通过</p>
                                    <p class ="j-time-wrap">用时：<span class ="level2 j-usetime">0s</span></p>
                                </div>
                        </div>`;
        $('.m-title .text-info').html(testHtml);

        this.$wrongWrap = $('.test-answer .user p');

        this.$stdAsw = $('.j-std-asw');
        this.$stdDgName = $('.j-std-dangername');
        this.$stdDgNameWrap = this.$stdDgName.parent();

        this.$userAsw = $('.j-user-asw');
        this.$userDgName = $('.j-user-dangername');
        this.$userDgMark = $('.j-user-dangermark');
        this.$userAswWrap = this.$userAsw.parent();
        this.$userDgNameWrap = this.$userDgName.parent();
        this.$userDgMarkWrap = this.$userDgMark.parent();

        this.result = $('.j-result');

        this.isTimeShow = $('.j-time-wrap');
        this.$timeConsuming = $('.j-usetime');
        this.$timeWrap = $('.j-time-wrap'); //用时包裹层

        if (this.form !== 1) {
            $('.test-answer p').css('display', 'inline-block');
        }
    }
    adapter_Show() {
        this.Viewer.isDanger = this.ResInfo[this.index].resource.isDanger;
        this.angles = this.ResInfo[this.index].resource.angles; // 提取出具体的DR图像相关信息
        this._show();
    }
    doSubClassThing() {
        this.$curIndex.text(this.index + 1);
        this.checkPreNext();
        this.showImgInfo();
    }
    showImgInfo() {
        let userRecordsInfo = this.userRecords[this.index];
        let stdAswInfo = this.ResInfo[this.index].resource;
        let topicIsSafe = this.ResInfo[this.index].isSafe; // 这道题是否是安全的。区别于资源是否安全（有插入tip变danger）
        this.ResInfo[this.index].isKey ? this.$keyStar.show() : this.$keyStar.hide(); // 是否是关键题
        //标准答案
        this.$stdAsw.text(topicIsSafe ? '安全' : '危险');
        //学员答案
        this.$userAsw.text(userRecordsInfo.result == 2 ? '超时' : userRecordsInfo.isPass ? '安全' : '危险');
        this.$wrongWrap.removeClass('markwrong');
        if (userRecordsInfo.isPass !== topicIsSafe) {
            this.$userAswWrap.addClass('markwrong');
        }
        if (this.form == 1 || userRecordsInfo.result == 2) {
            this.$userDgNameWrap.hide();
            this.$userDgMarkWrap.hide();
        }
        else {
            if (this.form === 2) {
                this.$stdDgNameWrap.css('display', 'inline-block');
                this.$userDgNameWrap.css('display', 'inline-block');
            } else {
                this.$stdDgNameWrap.css('display', 'none');
                this.$userDgNameWrap.css('display', 'none');
            }
            this.$userDgMarkWrap.css('display', 'inline-block');
            if (userRecordsInfo.isPass) {
                this.$userDgNameWrap.hide();
                this.$userDgMarkWrap.hide();
            }
            if (topicIsSafe) {
                this.$stdDgNameWrap.hide();
            }
            //如果错误，复杂模式下显示哪一步错了.包含简单复杂
            if (userRecordsInfo.result === 0) {
                if (stdAswInfo.knowledgeName != userRecordsInfo.dangerName) {
                    this.$userDgNameWrap.addClass('markwrong');
                }
                if (!userRecordsInfo.signRight) {
                    this.$userDgMarkWrap.addClass('markwrong');
                }
            }
        }
        //危险品名称
        this.$stdDgName.text(stdAswInfo.knowledgeName);
        this.$userDgName.text(userRecordsInfo.dangerName);
        this.$userDgMark.text(userRecordsInfo.signRight ? '正确' : '错误');
        //答题用时
        if (userRecordsInfo.duration === 0) {
            this.$timeWrap.hide();
        } else {
            this.$timeWrap.show();
            this.$timeConsuming.text(userRecordsInfo.duration + 's');
        }
        //显示作答正确与否
        this.result.removeClass('pass nopass timeout');
        userRecordsInfo.result == 2
                ? this.result.addClass('timeout') : userRecordsInfo.result !== 0
                ? this.result.addClass('pass') : this.result.addClass('nopass');
        this.result.text(userRecordsInfo.resultName);
    }
    prevImg() {
        if (this.Viewer.hasLoaded) {
            this.index--;
            this.adapter_Show();
        }
    }
    nextImg() {
        if (this.Viewer.hasLoaded) {
            this.index++;
            this.adapter_Show();
            this.Viewer.hasLoaded = false;
        }
    }
}

/* 9
    说明：DR 培训任务 -- 进入学习 && 查看课件
*/
class TrainPlanStudyDR extends TrainingBaseDR {
    constructor() {
        super();
    }
    init(id) {
        let that = this;
        this.LessonID = id;
        NSTS.NET.GET(APIURI + 'api/TrainPlan/Study/' + this.LessonID, null, function (data) {
            console.log(data);
            if (!data.success) {
                NSTS.Plugin.Alert.Error(data.error, function () {
                    that.btclose.click();
                });
                return;
            }
            that.intoResShow(data.data);
        });
    }
    intoResShow(resinfo) {
        if (this.setResList(resinfo.resources)) {
            this.ResInfo = resinfo;
            this.topicInfo = this.ResInfo.resources;
            this.initElement();
            this.adapter_Show();
        }
    }
    initElement() {
        $('#lessontitle').text(this.ResInfo.name);
        $('.j-header-info').html('<a class="img-index j-cur-index"></a>/<a class="j-total-index"></a>').css('display', 'flex');
        $('.j-total-index').text(this.AllCount);
        this.$curIndex = $('.j-cur-index');
    }
    adapter_Show() {
        this.Viewer.isDanger = this.topicInfo[this.index].image.isDanger;
        this.angles = this.topicInfo[this.index].image.angles;
        this._show();
    }
    doSubClassThing() {
        this.$curIndex.text(this.index + 1);
        let curDrInfo = this.topicInfo[this.index];
        this.showImgInfo(curDrInfo.image);
        this.checkPreNext();
        if (!curDrInfo.finished) {
            this.recordLearningProcess(curDrInfo.imageID);
        }
    }
    //记录学习进度
    recordLearningProcess(resID) {
        let that = this;
        NSTS.NET.POST(APIURI + 'api/TrainPlan/StudyRecord/' + this.LessonID + '/' + resID, null, function (data) {
            console.info(data);
            if (data.sucess) {
                that.topicInfo[that.index].finished = true;
            }
        });
    }
    prevImg() {
        if (this.Viewer.hasLoaded) {
            this.index--;
            this.adapter_Show();
        }
    }
    nextImg() {
        if (this.Viewer.hasLoaded) {
            this.index++;
            this.adapter_Show();
        }
    }
}

/*  10
    说明：DR 课件制作
*/
class SimpleCheckDR extends TrainingBaseDR {
    constructor() {
        super();
    }
    init(id) {
        let that = this;
        this.LessonID = id;
        NSTS.NET.GET(APIURI + 'api/DR/DetailInfo?id=' + this.LessonID, null, function (data) {
            console.log(data);
            if (!data.success) {
                NSTS.Plugin.Alert.Error(data.error, function () {
                    that.btclose.click();
                });
                return;
            }
            that.intoResShow(data.data);
        });
    }
    intoResShow(resinfo) {
        if (this.setResList(resinfo)) {
            this.ResInfo = resinfo;
            this.Viewer.isDanger = resinfo.isDanger;
            this.angles = resinfo.angles;
            this._show();
        }
    }
    doSubClassThing() {
        //DR课件制作业务自己定制
        //  console.info("DR课件制作！")
    }
}

/* 11
    说明：DR 考卷制作 预览
*/
class testPaperMakerPreview_DR extends TrainingBaseDR {
    constructor() {
        super()
    }
    init(resInfo) {
        let that = this;
        NSTS.NET.POST(APIURI + 'api/DRPaper/TempPaper', resInfo, function (data) {
            if (!data.success) {
                NSTS.Plugin.Alert.Error(data.error, function () {
                    that.btclose.click();
                });
                return;
            }
            that.intoResShow(data.data);
        });
    }
    intoResShow(resinfo) {
        if (this.setResList(resinfo.topics)) {
            this.ResInfo = resinfo;
            this.topicInfo = this.ResInfo.topics;
            this.initElement();
            this.adapter_Show();
        }
    }
    initElement() {
        $('#lessontitle').text(this.ResInfo.title);
        $('.j-header-info').html('<a class="img-index j-cur-index"></a>/<a class="j-total-index"></a>').css('display', 'flex');
        $('.j-total-index').text(this.AllCount);
        this.$curIndex = $('.j-cur-index');
    }
    adapter_Show() {
        this.Viewer.isDanger = this.topicInfo[this.index].resource.isDanger;
        this.angles = this.topicInfo[this.index].resource.angles;
        this._show();
    }
    doSubClassThing() {
        this.$curIndex.text(this.index + 1);
        let curDrInfo = this.topicInfo[this.index];
        this.showImgInfo(curDrInfo.resource);
        this.checkPreNext();
    }
    prevImg() {
        if (this.Viewer.hasLoaded) {
            this.index--;
            this.adapter_Show();
        }
    }
    nextImg() {
        if (this.Viewer.hasLoaded) {
            this.index++;
            this.adapter_Show();
        }
    }
}

/* 12
   说明：DR 错题练习
*/
class MyMistake_DR extends TrainingBaseDR {
    constructor() {
        super()
    }
    init(myMistakeOpts) {
        let that = this;
        this.query = {};
        this.query = myMistakeOpts;
        this.show();
    }
    show() {
        let that = this;
        this.query.pageNo = this.index;
        console.log(this.query)
        $.NstsGET(APIURI + 'api/DRIStudy/WrongTopics', this.query, function (data) {
            console.log(data);
            if (!data.success) {
                NSTS.Plugin.Alert.Error(data.error, function () {
                    that.btclose.click();
                });
                return;
            }
            if (data.total === 0) {
                NSTS.Plugin.Alert.Error(`bingo~~, 该时间段没有错题 ^_^`, function () {
                    that.btclose.click();
                });
                return;
            }
            that.AllCount = data.total;
            that.IntoResShow(data.data);
        });
    }
    /*课件资源显示入口*/
    IntoResShow(resinfo) {
        this.ResInfo = resinfo;
        this.initElement();
        this.adapter_Show();
    }
    initElement() {
        $('#lessontitle').text(`DR错题查看 -- ` + this.ResInfo.knowledgeName);
        $('.j-header-info').html('<a class="img-index j-cur-index"></a>/<a class="j-total-index"></a>').css('display', 'flex');
        $('.j-total-index').text(this.AllCount);
        this.$curIndex = $('.j-cur-index');
    }
    adapter_Show() {
        this.Viewer.isDanger = this.ResInfo.isDanger;
        this.angles = this.ResInfo.angles;
        this._show();
    }
    doSubClassThing() {
        this.$curIndex.text(this.index + 1);
        this.showImgInfo(this.ResInfo);
        this.checkPreNext();
    }
    // 上下幅都是通过一个新的id查询的
    prevImg() {
        if (this.Viewer.hasLoaded) {
            this.index--;
            this.show();
        }
    }
    nextImg() {
        if (this.Viewer.hasLoaded) {
            this.index++;
            this.show();
        }
    }
}
