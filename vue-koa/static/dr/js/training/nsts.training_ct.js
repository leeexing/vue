/**
*   CT 图像显示 业务类
*/

"use strict"
class TrainingBase {
    constructor(options={}) {
        this.options = {
          showTool: true, //是否需要显示工具条
          callback: ''
        }
        Object.assign(this.options, options)
        this.initStart();
    }
    initStart() {
        // this.bindEventBTClose(); // 全屏关闭按钮初始化
        this.btPrev = $('.btn-prev'); //上一页
        this.btNext = $('.btn-next'); //下一页
        this.btPrevWrap = $('.j-prevbtn');
        this.btNextWrap = $('.j-nextbtn');
        this.index = 0; // 当前图像索引
        this.pageEventBind(); // 翻页事件

        this.options.SliceHeight = Math.floor($('.j-slice-container').height() * 0.9);
        this.options.SliceWidth = Math.floor($('.j-slice-container').width() * 0.9);
        this.options.DrWidth = Math.floor($('.j-dr-container1').width() * 0.9);
        this.options.DrHeight = Math.floor($('.j-dr-container1').height() * 0.9);
        this.options.CtWidth = Math.floor($('.j-ct-container').width() * 0.9);
        this.options.CtHeight = Math.floor($('.j-ct-container').height() * 0.8);

        this.Viewer = new CtViewer(this.options);
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
            this.show();
        }
    }
    nextImg() {
        if (this.Viewer.hasLoaded) {
            this.index++;
            this.show();
        }
    }
    // 关闭事件
    bindEventBTClose() {
        let that = this
        this.btclose = $("#btclose");
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
            if (event.keyCode === 27 || event.keyCode === 96) {
                that.btclose.click();
            }
        });
    }
    // 设置判图资源数
    setResList(reslist) {
        if (reslist === null || reslist.length === 0) {
            return false;
        }
        this.AllCount = reslist.length;
        return true;
    }
    // 显示图像
    _show() {
        let resInfo = this.renderInfo;
        this.Viewer.isDanger = resInfo.isDanger;
        let ctid = resInfo.fileID;
        let tipid = 0;
        let drids = resInfo.drFile ? resInfo.drFile.angles : [];    //防止drfile 为 null
        let resName = resInfo.typeName;
        let tipX = resInfo.x;
        let tipY = resInfo.y;
        let tipZ = resInfo.z;

        console.log('OK Let Show Res index = ' + this.index);

        let obj = { 'CTID': ctid, 'TIPID': tipid, 'DRIDS': drids };
        this.Viewer.initShow(obj);
        if (tipid > 0) {
            console.log('%c 这里代表要显示 Tip','background:yellow;color:#f00');
            this.Viewer.setTip(tipid);
            this.Viewer.setTipPosition(tipX, tipY, tipZ);
        }
        this.doSubclassThing();
    }
    show() {
        throw new Error("抽象方法，必须由子类实现！");
    }
    // 内容为空，具体执行什么，在子类里面重载执行
    doSubclassThing() {
        throw new Error("抽象方法，必须由子类实现！");
    }
    // 显示图像相关信息，业务不同这个不一定需要显示（考试不需要）
    showImgInfo(imgInfo) {
        $('.img-name').text(imgInfo.name);// 图像名称
        $('.img-kpoint').text(imgInfo.knowledgeName || '暂无');// 知识点
        $('.goods-name').text(imgInfo.typeName);// 物品名称
        $('.feature-desc').text(imgInfo.description !== '' ? imgInfo.description : '暂无');// 特征描述
    }
    // 用于练习时的答题倒计时
    countDown(time) {
        let that = this;
        this.$countElem = $('.j-time-wrap');
        this.$timeRemainElem = $(".j-time");
        this.time = time;
        this.CountDownId = null;
    }
    // 抽离单独一个方法出来
    timerStart() {
        let that = this;
        let timeRemain = this.time;
        this.timeUsed = 0; // 用时
        this.overTime = false; // 是否超时
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
    // 计时结束。子类可以覆盖，以便执行不同的业务功能
    timerEnd() {
        throw new Error("抽象方法，必须由子类实现！");
    }
    cancelCountDown() {
        clearInterval(this.CountDownId);
        this.$countElem.hide();
        this.$timeRemainElem.empty();
        this.CountDownId = null;
    }
    // 显示提示信息
    alertInfo(msg) {
        let that = this;
        let alertLayer = (function () {
            let alert = null;
            return function () {
                if (!alert) {
                    alert = $('<div class="m-alert">');
                    alert.append(`<div class="alert-wrap">
                                    <header>
                                        <h4 class ="title">提示</h4>
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
                                        <a class ="u-btn alert-sure">确定</a>
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
            that.alertCB && that.alertCB();
        });
        this.alert = alertLayer();
        this.$alertContent = this.alert.find('.j-alert-html');
        this.alertsure = $('.alert-sure');
        this.alertsure.click(function () {
            that.closeFullScreenCb && that.closeFullScreenCb();//点击确定后全屏关闭，然后执行存在的回调函数
        });
    }
    // 说明：检测上下幅是否需要设置为“hide”
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

                          //////////////////////////////////////
                          /////       下面为子类       /////////
                          //////////////////////////////////////

/* 1
    说明：CT 图像库全屏查看
*/
"use strict"
class MapPreviewCT extends TrainingBase {
    constructor(options) {
        super(options); //super()在这里相当于。A.prototype.constructor.call(this)。因此，上面的this.init(),已经执行了一次
        this.initElement(); //子类业务不同，初始化的元素以及事件都是不一样的
    }
    initElement() {
        $('#lessontitle').text('CT 图像查看');
        $('.j-header-info').css('display', 'flex');
        // $('.map-menu').show();
        // $('.j-map').click(function () {
        //     $('.map-menu').css('transform', 'translateX(0)');
        // });
    }
    init(executeSql, initShowId=null) {
      this.mapMenu = new MapMenu({imgInstance: this, executeSql, initShowId})

        // this.LessonID = id;
        // let that = this;
        // NSTS.NET.GET(APIURI + 'api/CT/DetailInfo?id=' + this.LessonID, null, function (data) {
        //     console.info(data);
        //     if (!data.success) {
        //         NSTS.Plugin.Alert.Error(data.error, function () {
        //             that.btclose.click();
        //         });
        //         return;
        //     }
        //     that.intoResShow([data.data]);
        // });
    }
    initShow(imgInfo) {
      this.Viewer.initShow(imgInfo)
      this.doSubClassThing(imgInfo)
    }
    doSubClassThing(imgInfo) {
      this.showImgInfo(imgInfo)
      this.checkPreNext()
    }
    prevImg() {
        if (this.Viewer.hasLoaded) {
          this.mapMenu.prevImgShow()
        }
    }
    nextImg() {
        if (this.Viewer.hasLoaded) {
          this.mapMenu.nextImgShow()
        }
    }
    //说明：检测上下幅是否需要设置为“disabled”
    checkPreNext() {
      if (this.mapMenu.imgCount == 1) {
          this.btPrevWrap.hide()
          this.btNextWrap.hide()
      } else {
        if (this.mapMenu.activeIndex === 0) {
            this.btPrevWrap.hide()
        } else if (this.mapMenu.activeIndex == this.mapMenu.imgCOunt) {
            this.btNextWrap.hide()
        } else {
            this.btPrevWrap.show()
            this.btNextWrap.show()
        }
      }
    }
}

/* 2
    说明：CT 课件查看
*/
"use strict"
class CourseWareCT extends TrainingBase {
    constructor() {
        super();
    }
    init(id) {
        this.LessonID = id;
        let that = this;
        NSTS.NET.GET(APIURI + 'api/CTCourseware/DetailInfo?id=' + this.LessonID, null, function (data) {
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
    intoResShow(data) {
        if (this.setResList(data.resources)) {
            this.courseInfo = data;         //交换一下信息的命名、主要是数据格式发生变化
            this.ResInfo = this.courseInfo.resources;   //课件信息，包含dr，ct，实物图像等完整信息
            this.initElement();
            this.show();
        }
    }
    initElement() {
        $('#lessontitle').text(this.courseInfo.name);
        $('.j-header-info').html('<a class="img-index j-cur-index"></a>/<a class="j-total-index"></a>').css('display', 'flex');
        $('.j-total-index').text(this.AllCount);
        this.$curIndex = $('.j-cur-index');
    }
    show() {
        this.renderInfo = this.ResInfo[this.index].image;
        this._show();
    }
    doSubclassThing() {
        this.$curIndex.text(this.index + 1);
        this.showImgInfo(this.ResInfo[this.index].image);
        this.checkPreNext();
    }
}

/* 3
    说明：CT 考卷查看
*/
"use strict"
class PaperDetailCT extends TrainingBase {
    constructor() {
        super();
    }
    init(id) {
        this.LessonID = id;
        let that = this;
        NSTS.NET.GET(APIURI + 'api/CTPaper/GetDetailInfo?id=' + this.LessonID, null, function (data) {
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
    intoResShow(data) {
        if (this.setResList(data.topics)) {
            this.testPaperInfo = data;
            this.ResInfo = this.testPaperInfo.topics;
            this.initElement();
            this.show();
        }
    }
    initElement() {
        $('#lessontitle').text(this.testPaperInfo.title + '--考卷查看');
        $('.j-header-info').html('<a class="img-index j-cur-index"></a>/<a class="j-total-index"></a>').css('display', 'flex');
        $('.j-total-index').text(this.AllCount);
        this.$curIndex = $('.j-cur-index');
    }
    show() {
        this.renderInfo = this.ResInfo[this.index].resource;
        this._show();
    }
    doSubclassThing() {
        this.$curIndex.text(this.index + 1);
        this.showImgInfo(this.ResInfo[this.index].resource);
        this.checkPreNext();
    }
}

/* 4
    说明：CT识图学习
*/
class ImgStudyCT extends TrainingBase {
    constructor() {
        super();
    }
    init(options) {
        this.queryOpts = options; // 其实是一些选择参数；{jsonPara}
        let that = this;
        NSTS.NET.GET(APIURI + 'api/CTIStudy/Study/' + this.queryOpts, null, function (data) {
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
    intoResShow(data) {
        if (this.setResList(data.resources)) {
            this.courseInfo = data;
            this.initElement();
            this.ResInfo = this.courseInfo.resources;
            this.show();
        }
    }
    show() {
        this.renderInfo = this.ResInfo[this.index];
        this._show();
    }
    initElement() {
        $('#lessontitle').text('CT识图学习');
        $('.j-header-info').html('<a class="img-index j-cur-index"></a>/<a class="j-total-index"></a>').css('display', 'flex');
        $('.j-total-index').text(this.AllCount);
        this.$curIndex = $('.j-cur-index');
    }
    doSubclassThing() {
        this.$curIndex.text(this.index + 1);
        this.showImgInfo(this.ResInfo[this.index]);
        this.checkPreNext();
    }
}

/* 5
    说明：CT识图练习（三种模式）
*/
class ImgPractiseCT extends TrainingBase {
    constructor() {
        super({ showSusobj: false });
    }
    initElement() {
        let that = this;
        $('#lessontitle').text('CT识图练习');
        $('.j-judge-btns').css('display', 'flex');
        $('.m-title, .j-prevbtn').hide();
        $('.mark').remove();
        $('.j-cur-operate').html(`<span>真彩色</span>+<span>表面增强</span>`);
        this.answerBtn = $('.j-judge-btns > .btn-1');
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
            this.$kpWrap = $('.j-kp-select');
            this.$kpBtn = this.$kpWrap.find('.j-kp');
            this.$kpBtn.click(function () {
                $(this).toggleClass('active');
            });
            this.$kpWrap.find('.j-kp-close').click(function () {
                that.$kpBtn.removeClass('active');
            });
            // 下载危险品知识点
            NSTS.NET.GET(APIURI + 'api/Dictionary/KnowledgePanel', null, (data) => {
                if (!data.success) {
                    console.log('哎呦，知识点获取接口报错了')
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
        let that = this;
        this.exerciseInfo = info.imgOpts; // 包含练习的知识点，适用级别，题量
        this.exerciseSet = JSON.parse(info.imgSettings); // 包含练习的模式--答题时间、是否答完显示答案、是否复杂模式
        this.isCountTime = this.exerciseSet.setTopicTime > 0; // 是否设置了答题时间
        this.timeSetType = this.exerciseSet.timeSetType; // single: 单题时间；full：整卷时间
        this.form = +this.exerciseSet.topicMode; // 1：简单；2：复杂；3：新模式，不用选择知识点
        this.initElement();
        NSTS.NET.GET(APIURI + 'api/CTIStudy/Practise/' + this.exerciseInfo, null, function (data) {
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
            this.show();
        }
    }
    show() {
        this.renderInfo = this.ResInfo[this.index];
        this._show();
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
            this.overTime = true;// 答题超时标识
            this.isAnswer = true;// 已做答标识
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
                let topicAnswer = {}; // 当前题目的作答情况
                topicAnswer.resID = this.ResInfo[i].ctID; // 试题的id
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
    doSubclassThing() {
        this.$curIndex.text(this.index + 1);
        this.answerBtn.removeClass('active disabled');
        this.isAnswer = false;
        if (this.form === 2) {
            this.$kpWrap.hide();
            this.$kpBtn.addClass('active');
            this.$kpa && this.$kpa.removeClass('z-select');
        }
    }
    // 给 “通过”和“不通过”绑定事件.练习不同考试，只能答一次
    initJudgeEvent() {
        let that = this;
        this.answerBtn.click(function (e) {
            if (!$(this).hasClass('active')) {
                that.answerBtn.removeClass('active disabled');
                $(this).removeClass('disabled').addClass('active').siblings('.btn-1').addClass('disabled');
                if (that.form === 2) {
                    if ($(this).hasClass('j-nopass')) {
                        that.$kpWrap.show();
                    }
                    else {
                        that.$kpWrap.hide();
                    }
                }
            }
            that.isAnswer = true; // 已做答标识
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
        // 点击判断按钮，如果有有计时，立即停止计时
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
        let topicAnswer = {};
        topicAnswer.resID = this.ResInfo[this.index].ctID; // 试题的id
        let $userSelected = this.answerBtn.filter('.active');
        topicAnswer.isPass = $userSelected.length === 0 ? null : $userSelected.data('ispass'); // 是否通过
        if (this.form === 2) {
            topicAnswer.signRight = this.Viewer.selectTipResult; // 标记嫌疑物
            if (!!topicAnswer.isPass) { // 如果没有选择，危险品默认为0
                topicAnswer.dangerID = 0;
            }
            else {
                if (this.$kpWrap.find('.z-select').length == 0) {
                    topicAnswer.dangerID = 0;
                }
                else {
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
        let submitUrl = APIURI + `api/CTIStudy/Submit/${this.form}`; // 2 代表复杂模式提交；3：新模式
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
            that.$alertContent.html(`<div class="text-center"> ' +
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
    // 单线程作答
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
        this.show();
    }
}

/* 6
    说明：CT 练习记录
*/
"use strict"
class ImgPractiseCT_History extends TrainingBase {
    constructor() {
        super();
    }
    initElement() {
        $('#lessontitle').text('CT练习记录');
        $('.j-header-info').html('<a class="img-index j-cur-index"></a>/<a class="j-total-index"></a>').css('display', 'flex');
        let testHtml = `<div class="test-info">
                                <div class="test-answer">
                                    <div class="std">
                                        <p>标准答案：<span class ="j-std-asw">通过</span></p>
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

        $('.j-total-index').text(this.AllCount);
        this.$curIndex = $('.j-cur-index');
        if (this.form !== 1) {
            $('.test-answer p').css('display', 'inline-block');
        }
    }
    init(info) {
        this.resID = info.resid;
        this.form = +info.form;  // 是否为复杂模式； 1：简单；2：复杂
        let that = this;
        NSTS.NET.GET(APIURI + 'api/CTIStudy/PractiseDetail?id=' + this.resID, null, function (data) {
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
    intoResShow(data) {
        if (this.setResList(data.resources)) {
            this.ResInfo = data.resources;
            this.userRecords = data.records;
            this.initElement();
            this.show();
        }
    }
    show() {
        this.renderInfo = this.ResInfo[this.index];
        this._show();
    }
    doSubclassThing() {
        this.$curIndex.text(this.index + 1);
        this.showImgInfo();
        this.checkPreNext();
    }
    showImgInfo() {
        let userRecordsInfo = this.userRecords[this.index];
        let stdAswInfo = this.ResInfo[this.index];
        // 标准答案
        this.$stdAsw.text(stdAswInfo.isSafe ? '安全' : '危险');
        // 学员答案
        this.$userAsw.text(userRecordsInfo.result === 2 ? '超时' : userRecordsInfo.isPass ? '安全' : '危险');
        this.$wrongWrap.removeClass('markwrong');
        if (userRecordsInfo.isPass !== stdAswInfo.isSafe || userRecordsInfo.result == 2) {
            this.$userAswWrap.addClass('markwrong');
        }
        if (this.form === 1) {
            this.$userDgNameWrap.hide();
            this.$userDgMarkWrap.hide();
        }
        else {
            if (this.form === 2) {
                this.$stdDgNameWrap.css('display', 'inline-block');
                this.$userDgNameWrap.css('display', 'inline-block');
            }
            else {
                this.$stdDgNameWrap.css('display', 'none');
                this.$userDgNameWrap.css('display', 'none');
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
        userRecordsInfo.result === 2 ? this.result.addClass('timeout') :
                        userRecordsInfo.result !== 0 ? this.result.addClass('pass') : this.result.addClass('nopass');
        this.result.text(userRecordsInfo.resultName);
    }
}

/* 7
    说明：CT 在线考试
    类型：简单模式和复杂模式
*/
"use strict"
class ExamineCT extends TrainingBase {
    constructor() {
        super({ showSusobj: false });
    }
    init(id) {
        let that = this;
        this.planID = id;
        NSTS.NET.GET(APIURI + 'api/CTExam/DetailInfo?id=' + this.planID, null, function (data) {
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
        if (this.setResList(resinfo.paper.topics)) {
            this.ResInfo = resinfo.paper.topics;   //课件信息，包含dr，ct，实物图像等完整信息
            this.title = resinfo.paper.title;
            this.form = resinfo.paper.form;
            this.duration = resinfo.duration;
            this.initElement();
            this.show();
        }
    }
    show() {
        this.renderInfo = this.ResInfo[this.index].resource;
        this._show();
    }
    initElement() {
        let that = this;
        let testInfoHtml = `<div class="test-header-info">
                                <p class ="time-count j-time-wrap">用时: <span class ="j-time">0s</span></p>
                                <p class="test-index-info"><span class="j-cur-index">1</span>/<span class="j-total-index">4</span></p>
                            </div>`;
        $('.m-header').append(testInfoHtml);
        this.$curIndex = $('.j-cur-index');
        $('.j-total-index').text(this.AllCount);
        $('#lessontitle').text(this.title);
        $('.j-cur-operate').html(`<span>真彩色</span>+<span>表面增强</span>`);
        $('.m-title, .j-prevbtn, .mark').hide();
        $('.j-judge-btns').css('display', 'flex');
        this.answerBtn = $('.j-judge-btns > .btn-1');
        this.passBtn = $('.j-pass');
        this.noPassBtn = $('.j-nopas');

        this.isAnswer = false;  //这道题是否作答
        this.answerRecord = []; //答题记录，记录每道题的作答情况

        if (this.form === 2) {
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
        this.alertInfo();
        this.initJudgeEvent();  //绑定判断“通过”和“不过”的事件
        this.countDown(this.duration);
        this.timerStart();
    }
    doSubclassThing() {
        this.$curIndex.text(this.index + 1);
        this.isAnswer = false;
        this.answerBtn.removeClass('active disabled'); // 重置判断按钮
        if (this.form === 2) {
            this.$kpWrap.hide();
            this.$kpBtn.addClass('active');
            this.$kpa && this.$kpa.removeClass('z-select');
        }
    }
    timerEnd() {
        let that = this;
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
    //给 “通过”和“不通过”绑定事件.练习不同考试，只能答一次
    initJudgeEvent() {
        let that = this;
        this.answerBtn.click(function (e) {
            if (!$(this).hasClass('active')) {
                that.answerBtn.removeClass('active disabled');
                $(this).removeClass('disabled').addClass("active").siblings('.btn-1').addClass('disabled');
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
        if (!this.isAnswer) {
            that.alert.show();
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
                if (this.$kpa.filter('.z-select').length === 0) {
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
        that.recordAnswer();
        return true;
    }
    isShowSubmit() {
        let that = this;
        if (this.form === 2) {
            this.$kpWrap.hide();
        }
        this.answerBtn.hide();
        this.btNext.hide();
        this.cancelCountDown();
        $('.j-submit').show().click(function () {
            that.submit();
        });
    }
    // 具体的判断逻辑，记录答题情况
    recordAnswer() {
        let topicAnswer = {};                                   //当前题目的作答情况
        topicAnswer.topicID = this.ResInfo[this.index].id;      //试题的id
        let $userSelected = this.answerBtn.filter('.active');
        topicAnswer.isPass = $userSelected.length === 0 ? null : $userSelected.data('ispass');  //是否通过
        if (this.form === 1) {
            topicAnswer.signRight = null;
        }
        if (this.form === 2) {
            topicAnswer.signRight = this.Viewer.selectTipResult; //标记嫌疑物
            if (!!topicAnswer.isPass) {
                topicAnswer.dangerID = 0;
            }
            else {
                if (this.$kpWrap.find('.z-select').length == 0) {
                    topicAnswer.dangerID = 0;
                }
                else {
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
        let submitUrl = APIURI + 'api/CTExam/Submit/' + this.planID; // 复杂模式，提交接口不一样
        NSTS.NET.POST(submitUrl, that.answerRecord, function (data) {
            if (!data.success) {
                NSTS.Plugin.Alert.Error(data.error);
                return;
            }
            let examineResult = data.data;
            that.$alertContent.html(`<div class="text-center">
                                        <p><i class ="nucfont inuc-check"></i>答对题数：${examineResult.rightCount}</p>
                                        <p><i class ="nucfont inuc-close"></i>答错题数：${examineResult.errorCount}</p>
                                        <p><i class ="nucfont inuc-clock-o"></i>分数：${examineResult.userScore}</p>
                                        ${(examineResult.keyAccuracy >= 0) ? `<p><i class ="nucfont inuc-keytopic"></i>关键题正确率：${examineResult.keyAccuracy * 100}%</p>`: ''}
                                    </div>`);
            $('.f-fixr').hide();
            that.alert.show();
            that.closeFullScreenCb = function () {
                window.parent.document.querySelector('a[href="/Home/MyExamine"]').click();
                that.btclose.click();
            }
        });
    }
    //单线程作答
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
        this.show();
    }
}

/* 8
   说明：CT 考试记录
*/
class ExamineHistoryCT extends TrainingBase {
    constructor() {
        super();
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
                                        <p>标准答案：<span class ="j-std-asw">通过</span></p>
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
        this.$timeWrap = $('.j-time-wrap'); // 用时包裹层
        if (this.form === 2) {
            $('.test-answer p').css('display', 'inline-block');
        }
    }
    init(info) {
        let that = this;
        this.LessonID = info;
        let url = APIURI + 'api/CTExam/DetailInfo?id=' + this.LessonID;
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
            that.intoResShow(data.data);
        });
    }
    intoResShow(resinfo) {
        if (this.setResList(resinfo.paper.topics)) {
            this.userRecords = resinfo.userRecords; // 练习记录信息
            this.ResInfo = resinfo.paper.topics; // 练习中DR的具体信息
            this.form = resinfo.paper.form;
            this.title = resinfo.paper.title;
            this.initElement();
            this.show();
        }
    }
    show() {
        this.renderInfo = this.ResInfo[this.index].resource;
        this._show();
    }
    doSubclassThing() {
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
        this.$userAsw.text(userRecordsInfo.result === 2 ? '超时' : userRecordsInfo.isPass ? '安全' : '危险');
        this.$wrongWrap.removeClass('markwrong');
        if (userRecordsInfo.isPass !== topicIsSafe) {
            this.$userAswWrap.addClass('markwrong');
        }
        if (this.form === 1 || userRecordsInfo.result === 2) {
            this.$userDgNameWrap.hide();
            this.$userDgMarkWrap.hide();
        }
        else {
            if (this.form === 2) {
                this.$stdDgNameWrap.css('display', 'inline-block');
                this.$userDgNameWrap.css('display', 'inline-block');
            }
            else {
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
        }
        else {
            this.$timeWrap.show();
            this.$timeConsuming.text(userRecordsInfo.duration + 's');
        }
        //显示作答正确与否
        this.result.removeClass('pass nopass timeout');
        userRecordsInfo.result === 2 ? this.result.addClass('timeout') :
                        userRecordsInfo.result !== 0 ? this.result.addClass('pass') : this.result.addClass('nopass');
        this.result.text(userRecordsInfo.resultName);
    }
}

/* 9
    说明：CT 进入学习。会记录学习进度
*/
"use strict"
class TrainPlanStudyCT extends TrainingBase {
    constructor() {
        super();
    }
    init(planid) {
        this.LessonID = planid;
        let that = this;
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
    intoResShow(data) {
        if (this.setResList(data.resources)) {
            this.courseInfo = data;
            this.initElement();
            this.ResInfo = this.courseInfo.resources;
            this.show();
        }
    }
    show() {
        this.renderInfo = this.ResInfo[this.index].image;
        this._show();
    }
    initElement() {
        $('#lessontitle').text(this.courseInfo.name);
        $('.j-header-info').html('<a class="img-index j-cur-index"></a>/<a class="j-total-index"></a>').css('display', 'flex');
        $('.j-total-index').text(this.AllCount);
        this.$curIndex = $('.j-cur-index');
    }
    doSubclassThing() {
        this.$curIndex.text(this.index + 1);
        let curDrInfo = this.ResInfo[this.index];
        this.showImgInfo(curDrInfo);
        this.checkPreNext();
        if (!curDrInfo.finished) {
            this.recordLearningProcess(curDrInfo.imageID);
        }
    }
    recordLearningProcess(resID) {
        let that = this;
        NSTS.NET.POST(APIURI + 'api/TrainPlan/StudyRecord/' + this.LessonID + '/' + resID, null, function (data) {
            console.info(data);
            if (data.sucess) {
                that.ResInfo[that.index].finished = true;
            }
        });
    }
}

/* 10
    说明：考卷制作 预览
    参数：包含图像id的数组
*/
class testPaperMakerPreview extends TrainingBase {
    constructor() {
        super();
    }
    init(resInfo) {
        let that = this;
        NSTS.NET.POST(APIURI + 'api/CTPaper/TempPaper', resInfo, function (data) {
            that.intoResShow(data.data);
        });
    }
    intoResShow(data) {
        if (this.setResList(data.topics)) {
            this.courseInfo = data;
            this.ResInfo = this.courseInfo.topics;
            this.initElement();
            this.show();
        }
    }
    initElement() {
        $('#lessontitle').text(this.courseInfo.title);
        $('.j-header-info').html('<a class="img-index j-cur-index"></a>/<a class="j-total-index"></a>').css('display', 'flex');
        $('.j-total-index').text(this.AllCount);
        this.$curIndex = $('.j-cur-index');
    }
    show() {
        this.renderInfo = this.ResInfo[this.index].resource;
        this._show();
    }
    doSubclassThing() {
        this.$curIndex.text(this.index + 1);
        this.showImgInfo(this.ResInfo[this.index].resource);
        this.checkPreNext();
    }
}

/*  11
    说明：CT我的错题查看
*/
"use strict"
class MyMistake_CT extends TrainingBase {
    constructor() {
        super();
    }
    init(myMistakeOpts) {
        let that = this;
        this.query = {};
        this.query = myMistakeOpts;
        this.show();
    }
    show(options) {
        let that = this;
        this.query.pageNo = this.index;
        console.log(this.query)
        $.NstsGET(APIURI + 'api/CTIStudy/WrongTopics', this.query, function (data) {
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
            that.intoResShow(data.data);
        });
    }
    intoResShow(data) {
        this.renderInfo = data;
        this.initElement();
        this._show();
    }
    initElement() {
        $('#lessontitle').text(`CT错题查看 -- ` + this.renderInfo.knowledgeName);
        $('.j-header-info').html('<a class="img-index j-cur-index"></a>/<a class="j-total-index"></a>').css('display', 'flex');
        $('.j-total-index').text(this.AllCount);
        this.$curIndex = $('.j-cur-index');
    }
    doSubclassThing() {
        this.$curIndex.text(this.index + 1);
        this.showImgInfo(this.renderInfo);
        this.checkPreNext();
    }
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



/*
    说明：全屏不用初始化
    修改：不用初始绑定，可做判断在进入全屏
    版本：@2017/6.13
*/
class FullScreen {
    constructor(options) {
        this.options = options || {};
        this.init();
    }
    init() {
        if ($('#fulldiv').length === 0) {
            $(document.body).append('<style> #fulldiv {display: none;position: fixed;top: 0;left: 0;right: 0;bottom: 0;width: 100%;height: 100%;z-index: 9999;background-color:#aaa;}<style>');
            $(document.body).append('<div id="fulldiv"><iframe id="iframepage" src="" style="width:100%;height:100%;border:0"  frameborder="no"  marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe></div>');
        }
        this.initEvent();
    }
    initEvent() {
        let that = this;
        this.fullWrap = $('#fulldiv');
        this.closeBtn = this.fullWrap.find('.close');
        this.closeBtn.click(function () {
            that.close();
        });
        $(document).on('keyup', function (e) {
            var event = e || window.event;
            if (event.keyCode === 27 || event.keyCode === 96) {
                that.close();
            }
        });
        this.fullWrap.on('click.exit', function () {
            that.options.callback && that.options.callback();
            //console.log(`%c 哈哈，奏是怎么厉害 `,'background:#f90;color:#fff')
        })
    }
    close() {
        this.fullWrap.hide();
        this.exitFullScreen();
    }
    showFullScreen(src) {
        let docElm = document.getElementById("fulldiv");
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
        //$('#iframepage').attr(src,src)
        document.getElementById("iframepage").src = src;
        $('#fulldiv').css('display', 'block');
        document.getElementById("iframepage").onload = function () {
            this.focus();
        }
    }
    exitFullScreen() {
        document.getElementById("iframepage").src = '';
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

/*
*   全屏控制,暂时不要修改了--老版本
*/
"use strict"
class InitTraining {

    /*
    bttofull:点击后全屏的对象
    fulldiv:要全屏的div
    */
    constructor() {
        if ($("#fulldiv").length === 0) {
            $(document.body).append('<style> #fulldiv {display: none;position: fixed;top: 0;left: 0;right: 0;bottom: 0;width: 100%;height: 100%;z-index: 9999;background-color:#aaa;}#fulldiv .close {position: absolute;top: 0;right: 0;font-size:20px;color:#ff0000;opacity: 1;#fulldiv .close:hover {opacity: .9;}<style>');
            $(document.body).append('<div id="fulldiv"><iframe id="iframepage" src="" style="width:100%;height:100%;border:0"  frameborder="no"  marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe></div>');
        }
    }

    Run(bttofull, showurl, options) {
        this.btToFull = bttofull;
        this.openUrl = showurl;
        this._EventBindFull(this.openUrl);
        this._EventBintEsc();
    }
    UnRun(bttofull) {
        console.log("移除事件");
        this.btToFull = bttofull;
        bttofull.unbind();

    }

    /*点击对象后全屏显示页面*/
    _EventBindFull(url) {
        let that = this;
        this.btToFull.click(function () {
            if (that.btToFull.hasClass('disabled')) return;

            let docElm = document.getElementById("fulldiv");

            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
            $("#fulldiv").css("display", "block");
            document.getElementById("iframepage").src = url;
            document.getElementById("iframepage").onload = function () {
                this.focus();
            }
        })

    }

    /*键盘退出键*/
    _EventBintEsc() {
        $(document).keyup(function (event) {
            if (event.keyCode === 27 || event.keyCode === 96) {
                document.getElementById("iframepage").src = "";
                document.getElementById("fulldiv").style.display = "none";
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                }
                else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                }
                else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        });
    }
}
/*关闭全屏 用于其他未适用类的页面*/
function CloseFullDiv() {

    window.parent.document.getElementById("iframepage").src = "";
    window.parent.document.getElementById("fulldiv").style.display = "none";
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
}



/*
*   实现返回功能而做的当前页面全屏
*/
"use strict"
class pageFullScreen {

    /*
    bttofull:点击后全屏的对象
    fulldiv:要全屏的div
    */
    constructor(options) {
        this.options = Object.assign({}, pageFullScreen, options || {})
        this.Init()
    }
    Init() {
        if ($("#fullpage").length === 0) {
            //   $(document.body).append('<style> #fullpage {display: none;position: fixed;top: 72px;left: 280px;right: 0;bottom: 0;width: calc(100%-72px);height: calc(100%-280px);z-index: 9999;background-color:#fff;}#menu-mask{position:absolute;top:64px;left:0;bottom:0;width:240px;z-index:1000;}#fullpage .go-back {position: absolute;top: 85px;right: 60px;font-size:20px;color:#fff;padding: 5px 10px;border-radius:5px;background:#f40;cursor:pointer;transition:all 1s}#fullpage .go-back:hover {background:#f00}#fullpage .close:hover {opacity: .9;color:#fff}<style>');
            //   $(document.body).append('<div id="fullpage"><div id="menu-mask"></div><span class="go-back close">返回</span><iframe id="iframePageFull" src="" style="width:100%;height:100%;border:0"  frameborder="no"  marginwidth="0" marginheight="0" scrolling="yes" allowtransparency="yes"></iframe></div>');
            //   $("#content").append('<style> #fullpage {display: none;position: fixed;top: 72px;left: 280px;right: 0;bottom: 0;width: calc(100%-72px);height: calc(100%-280px);z-index: 2014;background-color:#fff;}.left-side-collapsed #fullpage{left:64px} #menu-mask1{position:absolute;top:64px;left:0;bottom:0;width:240px;z-index:1000;}#fullpage .go-back {position: absolute;top: 15px;right: 60px;font-size:20px;color:#fff;padding: 5px 10px;border-radius:5px;background:#f40;cursor:pointer;transition:all 1s}#fullpage .go-back:hover {background:#f00}#fullpage .close:hover {opacity: .9;color:#fff}<style>');
            //   $("#content").append('<div id="fullpage"><div id="menu-mask"></div><span class="go-back close">返回</span><iframe id="iframePageFull" src="" style="width:100%;height:100%;border:0"  frameborder="no"  marginwidth="0" marginheight="0" scrolling="yes" allowtransparency="yes"></iframe></div>');
            // $("#content").load(url)
            $(document.body).append('<style> #fullpage {display: none;position: fixed;top: 72px;left: 280px;right: 0;bottom: 0;width: calc(100vw - 280px);height: calc(100vh - 72px);z-index: 200;background-color:#efefef;}.left-side-collapsed #fullpage{left:64px;width: calc(100vw - 64px)} #fullpage .go-back {position: absolute;top: 15px;right: 60px;font-size:16px;color:#fff;padding: 5px 10px;border-radius:5px;background:#ff4081;cursor:pointer;transition:all 1s;z-index:1000}#fullpage .go-back:hover {box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);}#fullpage .close:hover {opacity: .9;color:#fff}<style>');
            $(document.body).append('<div id="fullpage" ><span class="go-back close">返回</span><div class="fullpage-wrapper" style="height: calc(100vh - 72px);overflow:auto"><section id="fullpage-content" ></section></div>');
            //  $(document.body).load(url)
        }
    }
    Run(bttofull, showurl) {
        this.btToFull = bttofull;
        this.openUrl = showurl;
        this._EventBindFull(this.openUrl);
    }
    UnRun(bttofull) {
        this.btToFull = bttofull;
        bttofull.unbind();
    }

    /*点击对象后全屏显示页面*/
    _EventBindFull(url) {
        this.btToFull
            .unbind("click")
            .click(function () {
                let pageOrigin = document.getElementsByClassName("section")[0];
                //保存之前页面的滚动条高度
                let originScrollTop = document.body.scrollTop;
                pageOrigin.style.display = 'none';
                let docElm = document.getElementById("fullpage");
                docElm.style.display = "block";
                $("#fullpage-content").load(url)
                let closeBtn = document.getElementsByClassName("close")[0];
                closeBtn.onclick = function () {
                    $("#fullpage-content").empty();
                    pageOrigin.style.display = 'block';
                    docElm.style.display = "none";
                    document.body.scrollTop = originScrollTop;
                }
            });
    }
}

/*
*   跳转到新的页面，并实现返回
*/
class SkipToPage {
    constructor(options) {
        this.default = {
            onBack: $.noop(),  //返回事件
        };
        this.options = $.extend({}, this.default, options);
        this.init();
        this.freePage();
    }
    init() {
        if ($("#fullpage").length === 0) {
            $(document.body).append('<style> #fullpage {display: none;position: fixed;top: 72px;left: 280px;right: 0;bottom: 0;width: calc(100vw - 280px);height: calc(100vh - 72px);z-index: 200;background-color:#efefef;}.left-side-collapsed #fullpage{left:64px;width: calc(100vw - 64px)} #fullpage .go-back {position: absolute;top: 15px;right: 60px;font-size:16px;color:#fff;padding: 5px 10px;border-radius:5px;background:#ff4081;cursor:pointer;z-index:1000}#fullpage .go-back:hover {box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);}#fullpage .close:hover {opacity: .9;color:#fff}<style>');
            $(document.body).append('<div id="fullpage" ><span class="go-back close">返回</span><div class="fullpage-wrapper" style="height: calc(100vh - 72px);overflow:auto"><section id="fullpage-content" ></section></div></div>');
        }
        this.newPageWrap = $("#fullpage");
        this.backBtn = $('.go-back');//返回按钮
        //this.originPage = $('.section');
        this.originPage = $('#main');
        this.newPageContent = $('#fullpage-content');

        this.backBtn.off().on('click', $.proxy(this.backEvent,this));
    }
    //跳转到新页面
    skip(url) {
        this.originScrollTop = this.originPage.scrollTop(); //保存之前页面的滚动条高度
        this.originPage.hide();
        this.newPageWrap.show();
        this.newPageContent.load(url);
    }
    backEvent() {
        this.newPageContent.empty();
        this.originPage.show();
        this.newPageWrap.hide();
        $('body').scrollTop(this.originScrollTop);
        $.isFunction(this.options.onBack) && this.options.onBack();
    }
    //跳到其他页面时，销毁
    freePage() {
        $('.left-side').on('click', '.menu-list a', () => {
            this.newPageContent.empty();
            this.originPage.show();
            this.newPageWrap.hide();
        })
    }
}

