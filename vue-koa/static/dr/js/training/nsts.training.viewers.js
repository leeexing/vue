/**
 *
 * 作者：lixing
 * 时间：07/26
 *
 * @class CtViewer
 *
 *
 */
class CtViewer {
    constructor(options={}) {
        this.options = {
          DrWidth: 400,
          DrHeight: 400,
          DrContainerID: 'canvasdr',// DR图像容器ID
          CtWidth: 600,
          CtHeight: 600,
          CtContainerID: 'container',
          SliceWidth: 400,
          SliceHeight: 400,
          SliceContainerID: 'canvasslice',
          showDR: true, // 是否显示DR图像
          showSlice: true, // 是否显示切片图像
          showSusobj: true, // 是否"突出显示危险品"
          slicePlaneVisible: true, // 是否显示切线平面
          sizeIndexDefault: 6, //摄像头初始化时的放大比例
          defaultTransparency: 0.33, //默认CT透明度值
          callback: null
        }
        Object.assign(this.options, options)
        this.init()
    }
    init() {
        this.initSqlLite()
        this.initElement()
        this.initToolsBtnEvent()
    }
    initElement() {
        /*
        drinstance、slice 渲染变量
        */
        this.shaderA = 'raw' //第一个参数。默认就是表面增强
        this.shaderB = 'standard' // 第二个参数。默认是标准
        this.shaderC = 'default' // 第三个参数。默认就是真彩色
        this.isDanger = false  // 危险品和包裹显示 处理不同
        this.hasLoaded = false  // 判断图像是否加载完成的字段
        this.firstRender = true // 第一次渲染
        this.selectTipResult = null
        this.isTipSelected = false
        this.showSusobj_byUser = true // 用户选择是否显示，markBtn控制；统一视角一二的切换
        /*
        页面元素
        */
        this.body = $('body')
        this.loadingLayer = $('#loading')
        this.curOperateName = $('.j-cur-operate')
        this.zoomIndex = $('.j-zoom')
        this.btns = $('.j-tools a')
        this.coloursBtn = $('.colours')
        this.markBtn = $('.mark')
        this.$module3DContainer = $('#container')
        /*
        3D图像初始化
        */
        Module3D.Rendering.ShaderPath = './js/wgl/data/'
        Module3D.Rendering.ColorTablePath = './js/wgl/data/color_table_coded.png'
        Module3D.Rendering.NoiseTexturePath = './js/wgl/data/random_noise.png'
        Module3D.DRColorTableRootDir = './js/wgl/data/'

        Module3D.Initialize(this.options.CtContainerID, this.options.CtWidth, this.options.CtHeight)
        Module3D.Rendering.RenderingMode = true //一直刷新状态/拖拽时刷新
        Module3D.Rendering.UseCameraSlerp = true // 转向平滑过度
        Module3D.Rendering.DisableSHShade(false) // 初始化 表面增强
        // Module3D.Rendering.ToAbove() // 上视角
        Module3D.Rendering.Draw()
        Module3D.Rendering.SetBackgroundColor(255, 255, 255)
        Module3D.Rendering.CurCamera.position.set(0, 0, 1.1) // 设置摄像机的空间位置
        //Module3D.Rendering.SetCameraZoom(this.options.sizeIndexDefault) //摄像机初始放大比
        Module3D.Rendering.SetSlicePlaneVisible(this.options.slicePlaneVisible) // 3D平板切片显示.默认显示

        Module3D.Rendering.SetVolumeLoadedCallback(this.loadingEnd.bind(this)) // 图像加载完成后执行
        Module3D.Rendering.SetMouseWheelCallback(() => { // 监听"3D图像"鼠标滚轮
            let zoomValue = 16 - Module3D.Rendering.GetCameraZoomIndex()
            this.zoomIndex.text(zoomValue.toFixed(1))
        })
        Module3D.Rendering.SetManualPickingCheckingFunction(() => { // 3D 手动选择嫌疑物后的回调
            let isSelectedBox = Module3D.Rendering.IsSelectedBoxContainTipPart()
            this.setSelectTipResult(isSelectedBox[0])
        })
        if (this.options.showDR) {
            this.initDrElement()
        }
    }
    initDrElement() {
        /*
        DR 初始化
        */
        this.$anglesWrap = $('.dr-angles')
        this.$drContainer = $(`#${this.options.DrContainerID}`)
        this.$sliceContainer = $(`#${this.options.SliceContainerID}`)

        this.drinstance = new Module3D.DRImageInstance()
        this.drinstance.setScaleMinAndMax(0.1, 4) // 缩放比例最大最小值
        this.drinstance.setCallbackWhenLoaded(() => { // DR图像加载完成后
            this.drLoadEnding()
            this.zoomIndex.text(this.drinstance.getZoomIndex().toFixed(1))
        })
        this.drinstance.setMouseWheelCallback(() => { // DR缩放系数
            this.zoomIndex.text(this.drinstance.getZoomIndex().toFixed(1))
        })
        this.drinstance.showSusobj(this.options.showSusobj) //练习时不让危险品突出显示

        this.drinstance.setMMSelectCallback((data) => {
            this.setSelectTipResult(data)
        })

        /*
        Slice 初始化
        */
        this.slinstance = new Module3D.DRImageInstance(true)
        this.slinstance.setScaleMinAndMax(0.1, 4)
        this.slinstance.showSusobj(this.options.showSusobj)//练习时不让危险品突出显示
        this.slinstance.setCallbackWhenLoaded(() => { // 加载完成的回调；切片默认为“125”
            this.slinstance.setSliceIndex(125)
            this.slinstance.switchToTipImage(false)
            this.slinstance.showSusobj(this.options.showSusobj)
            this.SliceZeffRenderCB && this.SliceZeffRenderCB()
        })

        this.$sliceInputBar = $('#sliceinput')
        this.initDrEvent()
        this.initSliceEvent()
    }
    initDrEvent() {
        let that = this
        this.drinstance.setDbClickCallback(function drDoubleClick(data) { // 双击DR
            let x = parseInt(data[0] * 255)
            that.$sliceInputBar.val(x)
            that.setSlicePiece(x)
        })
    }
    initSliceEvent() {
        let that = this
        // slice 密度与原子序数
        this.$densityAve = $('.j-density-ave') // 平均密度原子序数
        this.$atomAve = $('.j-atom-ave')
        this.$density = $('.j-density') // 密度与原子系数
        this.$atom = $('.j-atom')
        this.slinstance.setMMSelectCallback((data) => {
            console.log(`%c 平均密度和原子序数：${data} `, 'background:#000color:#fff')
            this.$densityAve.text(data[0][0].toFixed(2))
            this.$atomAve.text(data[0][1].toFixed(2))
            this.setSelectTipResult(data[1])  // 用于判断选择嫌疑物
        })
        this.slinstance.setMouseMoveCallback((data) => {
            this.$density.text(data[0].toFixed(2))
            this.$atom.text(data[1].toFixed(2))
        })
        // slice 切片位置
        if (this.$sliceInputBar.length != 0) {
            this.$sliceInputBar.on('input', function () {
                let x = parseInt($(this).val())
                that.setSlicePiece(x)
            })
        }
    }
    setSelectTipResult(data) {
        console.log(`%c 标记嫌疑物： ${data} `, 'background:#f90;color:#fff')
        this.selectTipResult = data
        this.isTipSelected = true
    }
    setSlicePiece(piecePos) {
        let pieceValue = (piecePos / 255).toFixed(3)
        this.slinstance.setSliceIndex(piecePos)
        this.drinstance.setSliceIndex(piecePos)
        this.$sliceInputBar.css('background-size', pieceValue * 100 + '% 100%')
        Module3D.Rendering.SetSlicePosZ(pieceValue) // 3d切平面的函数
        this.redraw3D()
    }
    redraw3D() {
        Module3D.Rendering.ReDraw()
        window.setTimeout('Module3D.Rendering.StopRendering', 100)
    }
    drLoadEnding() {
        this.hasLoaded = true
        this.loadingLayer.hide()
        this.$drContainer.show()
        this.drinstance.switchToTipImage(this.isDanger)
        this.drinstance.setSliceLineVisible(true) // 切换线的显示状态
        let index = +this.$sliceInputBar.val()
        this.drinstance.setSliceIndex(index.toFixed(2)) // 默认值和"切片"的相同:125
        this.drinstance.restoreOrigialPos()
        this.drinstance.showSusobj(this.options.showSusobj && this.showSusobj_byUser)
        this.loadEndCallback && this.loadEndCallback()
    }
    loadingStart() {
        this.loadingLayer.show()
        this.hasLoaded = false
        this.$module3DContainer.hide() // 先隐藏canvas的包裹层,加载完成后再显示
        if (this.options.showDR) {
            this.$sliceContainer.hide()
            this.$drContainer.hide() // DR容器也隐藏
        }
    }
    loadingEnd() {
        if (!this.hasDrImage) {
            this.loadingLayer.hide()
        }
        this.$module3DContainer.show()
        this.$sliceContainer && this.$sliceContainer.show()
        this.options.callback && this.options.callback()
    }
    initShow(imgInfo) {
        // this.loadingStart()
        let that = this
        this.activeImgInfo = imgInfo

        this.sql.getData_CT(imgInfo, this.showModule3D.bind(this)) //显示 CT & slice
        // if (pinfo.TIPID != undefined && pinfo.TIPID > 0) { // 显示 TIP
        //     this.sql.getData(pinfo.TIPID, this.showTip.bind(this))
        // }
        /*
        dr 初始化
        */
        if (this.options.showDR) {
          let anglesHTML = ''
          imgInfo.dr.forEach((angle, index) => {
            let isActive = index == 0 ? 'active' : ''
            let indexName = index == 0 ? '视角一' : '视角二'
            anglesHTML += `<a class="${isActive}">${indexName}</a>`
          })
          this.$anglesWrap.html(anglesHTML)
        }
    }
    showModule3D(ctRenderData) {
        let that = this
        console.log('%c Show 3D ... ', 'background:#f90;color:#fff')
        console.log(ctRenderData)
        if (ctRenderData[2] !== null) {
            // Module3D.Rendering.SetVolumeDataBase64Content(pobj.ID + '.png', pobj.B64, pobj.TXT, pobj.Suspects)
            Module3D.Rendering.SetVolumeDataBase64Content('ct.png', ctRenderData[0], ctRenderData[1], ctRenderData[2])
          } else {
            // Module3D.Rendering.SetVolumeDataBase64Content(pobj.ID + '.png', pobj.B64, pobj.TXT)
            Module3D.Rendering.SetVolumeDataBase64Content('ct.png', ctRenderData[0], ctRenderData[1])
        }
        if (!this.firstRender) {
            this.reset3D() // 重置之前的图像操作
        } else {
            Module3D.Rendering.DisplaySuspectObject(this.options.showSusobj) // 突出显示嫌疑物
            Module3D.Rendering.SetCameraZoom(this.options.sizeIndexDefault) // 摄像机初始放大比
            Module3D.Rendering.ToAbove() // 上视角
            this.firstRender = false
        }

        // dr、slice 显示
        if (this.options.showDR) {
            this.slinstance.loadTexture('canvasslice', ctRenderData[0], this.options.SliceWidth, this.options.SliceHeight)
            if (ctRenderData[3] !== null) {
                this.SliceZeffRenderCB = function sliceDensity() {
                    that.slinstance.loadZeff(ctRenderData[3])
                }
            } else {
                this.SliceZeffRenderCB = null
            }
            this.initShowDR() //DR显示。放在3d开始渲染后再显示，避免两个同时请求数据显示，DR总是快一点
        }
    }
    initShowDR() {
        // if (this.hasDrImage) {
        //     this.showDR(this.FirstDrId)
        // }
        this.activeAngleIndex = 0
        this.sql.getData_DR(this.activeImgInfo, this.showDR.bind(this))
    }
    showDR(data) {
      this.drRenderingData = data
      this.renderDR()
    }
    renderDR(renderObj) {
        console.log('%c Show DR ... ', 'background:#00bcd4;color:#fff')
        this.drinstance.loadTexture(this.options.DrContainerID, this.drRenderingData[this.activeAngleIndex], this.options.DrWidth, this.options.DrHeight)
        if (this.drRenderingData[this.activeAngleIndex + 1] !== null) {
          this.drinstance.loadTextureApp(this.drRenderingData[this.activeAngleIndex + 1])
        }
    }
    reset3D() {
        Module3D.Rendering.SetBackgroundColor(255, 255, 255)
        Module3D.Rendering.CameraControls.enabled = true //启用右键
        Module3D.Rendering.SetVolumeTransferTable(Module3D.Rendering.IMG_PROC_PARA.APIP_IC_COLORIZE) //默认真彩色
        Module3D.Rendering.ToAbove() //上视角
        Module3D.Rendering.DisableSHShade(false) // 表面增强
        Module3D.Rendering.EnableEdge(false) // 边缘增强
        Module3D.Rendering.SetAlpha(this.options.defaultTransparency) // 透明度
        Module3D.Rendering.SetClipPlaneZ(0, false) // 剪裁
        Module3D.Rendering.SetCameraZoom(this.options.sizeIndexDefault) // 摄像机缩放系数
        Module3D.Rendering.ClearAllBoxButRiskyObject() // 清除除了确定包围线框的所有线框
        Module3D.Rendering.SetSlicePosZ(0.488) // 3d切平面的函数
        Module3D.Rendering.DisplaySuspectObject(this.options.showSusobj) // 突出显示嫌疑物

        this.redraw3D()

        this.zoomIndex.text((16 - this.options.sizeIndexDefault).toFixed(1))
        this.body.removeClass('inverse')
        this.btns.removeClass('active')
        this.$opacityInputWrap.hide()
        this.$clipInputWrap.hide()
        this.alphaValue = 0.33 //键盘监听的透明度值
        this.clipPlaneValue = 0
        this.isAlphaOpen = false
        this.selectTipResult = null
        this.isTipSelected = false
        this.showSusobj_byUser = true

        if (!this.options.showSusobj) {
            this.coloursBtn.addClass('active')
            this.surfaceBtn.addClass('active')
            this.curOperateName.html(`<span>真彩色</span>+<span>表面增强</span>`)
        } else {
            this.coloursBtn.addClass('active')
            this.surfaceBtn.addClass('active')
            this.markBtn.addClass('active')
            this.curOperateName.html(`<span>真彩色</span>+<span>表面增强</span>+<span>突出显示嫌疑物</span>`)
        }
        /*
        dr、slice
        */
        if (this.options.showDR) {
            this.drinstance.restoreOrigialPos()
            this.drinstance.setInverse(false)
            this.drinstance.setSlicePosX(0.488)
            this.drinstance.showSusobj(this.options.showSusobj)

            this.slinstance.setSliceIndex(125)
            this.$sliceInputBar.val(125).css('background-size', '50% 100%')
            this.slinstance.restoreOrigialPos()
            this.slinstance.setInverse(false)
            this.slinstance.showSusobj(this.options.showSusobj)

            this.shaderA = 'raw'
            this.shaderB = 'standard'
            this.shaderC = 'default'

            this.setShader()
        }
    }
    setShader() {
        console.log(`%c DR 渲染模式： ${this.shaderA} ${this.shaderB} ${this.shaderC} `, 'background:#00bcd4;color:#eee;padding: 2px;border-radius: 2px')
        this.drinstance.setShader(this.shaderA, this.shaderB, this.shaderC)
        this.drinstance.refreshDisplay()
        this.slinstance.setShader(this.shaderA, this.shaderB, this.shaderC)
    }
    stopRender() {
        Module3D.Rendering.StopRendering()
        Module3D.Rendering.CurRenderer.forceContextLoss()
        Module3D.Rendering.CurRenderer.context = null
        Module3D.Rendering.CurRenderer.domElement = null
        Module3D.Rendering.CurRenderer = null
    }
    setTip(tipid) {
        if (tipid === null || tipid === undefined) {
            NSTS.Plugin.Alert.Error('参数非法')//参数非法
            return
        }
        if (parseInt(tipid, 10) > 0) {
            this.sql.getData(tipid, this.showTip.bind(this))
        } else {
            Module3D.Rendering.RestoreVolume()
            Module3D.Rendering.DrawJustOnce()
        }
    }
    showTip(obj) {
        console.log('%c tip 正在进行装载 ...','background: #5b0;color:#fff')
        Module3D.Rendering.SetTipDataBase64Content(obj.ID + '.png', obj.B64, obj.TXT)
        if (obj && obj.TipX) {
            Module3D.Rendering.SetTipOffset(obj.TipX, obj.TipY, obj.TipZ)
        } else {
            // Module3D.Rendering.SetTipOffset(0.0, 0.3, 0.0)
            this.setTipPosition(0.0, 0.3, 0.0)
        }
    }
    setTipPosition(x, y, z) {
        setTimeout(function(){
            Module3D.Rendering.SetTipOffset(x, y, z)
        },500)
    }
    initToolsBtnEvent() {
        let that = this
        // 控制按钮操作栏 收缩/展开
        this.$unfoldBtn = $('.j-unfold')
        this.$toolsWrap = $('.ct-tools')
        this.$unfoldBtn.click(function () {
            if (!$(this).hasClass('z-select')) {
                let width = that.$toolsWrap.width()
                that.$toolsWrap.data('originwidth', width).animate({ width: '46px' }, 500, function () {
                    $(this).find('.ct-btn').hide()
                })
                $(this).addClass('z-select')
            }
            else {
                $(this).removeClass('z-select')
                let oldwidth = that.$toolsWrap.data('originwidth') + 48
                that.$toolsWrap.find('.ct-btn').show()
                that.$toolsWrap.animate({ width: oldwidth + 'px' }, 400)
            }
        })

        this.$anglesWrap.on('click', 'a', function () {
          if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings().removeClass('active')
            if($(this).index() === 1) {
              that.activeAngleIndex = 2
            } else {
              that.activeAngleIndex = 0
            }
            that.renderDR()
          }
        })
        // 按钮组 A => 表面增强、边缘增强   @ CT 唯一
        this.groupA = $('.j-tools .ct-btn[data-group="a"]')
        this.groupA.click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            }
            else {
                that.groupA.removeClass('active');
                $(this).addClass('active');
            }
            groupA();
        });
        function groupA() {
            var $activeBtn = that.groupA.filter('.active');
            var renderType = that.shaderA = $activeBtn.data('tag') || 'raw';
            switch (renderType) {
                case 'surface':
                    Module3D.Rendering.DisableSHShade(false);
                    Module3D.Rendering.EnableEdge(false);
                    break;
                case 'edge':
                    Module3D.Rendering.EnableEdge(true);
                    Module3D.Rendering.DisableSHShade(true);
                    break;
                default:
                    Module3D.Rendering.DisableSHShade(true);
                    Module3D.Rendering.EnableEdge(false);
            }
            // 考虑到 DR Slice 没有表面增强。如果选择，默认设置为 原始值;
            if (renderType === 'surface') {
                that.shaderA = 'raw';
            }
            that.redraw3D();
            that.setShader();
        }
        // 渲染参数B => 超级穿透
        this.$hiBtn = $('.j-tools .hi');
        this.$hiBtn.click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                Module3D.Rendering.EnablePenetrate(false);
            }
            else {
                $(this).addClass('active');
                Module3D.Rendering.EnablePenetrate(true);
            }
            if (thiss.options.showDR) {
                that.shaderB = $(this).hasClass('active') ? 'superpenetrate' : 'standard';
                that.setShader();
            }
        });

        // 按钮组 C  => 灰色、彩色、ms、os
        this.$groupC = $('.j-tools a[data-group="c"]');
        this.$groupC.click(function () {
            if (!$(this).hasClass('active')) {
                that.$groupC.removeClass('active');
                $(this).addClass('active');
            } else {
                if ($(this).hasClass('colours')) {
                    return false
                } else {
                    $(this).removeClass('active');
                    that.$groupC.filter('.colours').addClass('active');
                }
            }
            groupC();
        });
        function groupC() {
            var $activeBtn = that.$groupC.filter('.active');
            var renderType = that.shaderC = $activeBtn.data('tag');
            switch (renderType) {
                case 'blackwhite':
                    Module3D.Rendering.SetVolumeTransferTable(Module3D.Rendering.IMG_PROC_PARA.APIP_IC_BLACK_AND_WHITE);
                    break;
                case 'ms':
                    Module3D.Rendering.SetVolumeTransferTable(Module3D.Rendering.IMG_PROC_PARA.APIP_IC_ORGANIC_STRIPPING);
                    break;
                case 'os':
                    Module3D.Rendering.SetVolumeTransferTable(Module3D.Rendering.IMG_PROC_PARA.APIP_IC_MINERAL_STRIPPING);
                    break;
                default:
                    Module3D.Rendering.SetVolumeTransferTable(Module3D.Rendering.IMG_PROC_PARA.APIP_IC_COLORIZE);
            }
            that.redraw3D();
            if (that.options.showDR) {
                that.setShader();
            }
        }
        // 反色显示  @ CT DR shared
        this.$inverseBtn = $('.j-tools .inverse');
        this.$inverseBtn.click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('body').removeClass('inverse');
            }
            else {
                $(this).addClass('active');
                $('body').addClass('inverse');
            }

            let showType = $(this).hasClass('active');
            inverse(showType);
        });
        function inverse(showType) {
            Module3D.Rendering.SetInverseDisplay(showType);
            that.redraw3D();
            if (that.options.showDR) {
                that.slinstance.setInverse(showType);
                that.slinstance.composer.render(0.1);
                that.drinstance.setInverse(showType);
                that.drinstance.composer.render(0.1);
            }
        }
        // 视角 => 上视角、左视角、右视角。默认前视角
        this.$groupF = $('.j-tools .ct-btn[data-group="f"]');
        this.$groupF.click(function () {
            if (!$(this).hasClass('active')) {
                that.$groupF.removeClass('active');
                $(this).addClass('active');
            }
            else {
                $(this).removeClass('active');
            }
            let showType = that.$groupF.filter('.active').data('tag');
            switch (showType) {
                case 'top':
                    Module3D.Rendering.ToAbove();
                    break;
                case 'left':
                    Module3D.Rendering.ToLeft();
                    break;
                case 'right':
                    Module3D.Rendering.ToFront();
                    break;
                default:
                    Module3D.Rendering.ToAbove();
            }
            that.redraw3D();
            //@FIXME 切换视角会将之前缩放的比例重置为初始值
            let newZoomVal = Module3D.Rendering.GetCameraZoomIndex();
            console.info(newZoomVal)
            that.zoomIndex.text((16 - newZoomVal).toFixed(1));
        });

        // 透明度
        this.$opacityInputWrap = $('.ct-opacity');
        this.$clipInputWrap = $('.ct-clipping');
        this.$transparentBtn = $('.j-tools .transparency');
        this.$clipBtn = $('.j-tools .clipping');
        this.$opacityInput = $('.j-opacity');
        this.$clipInput = $('.j-clipping');
        this.$transparentBtn.click(function () {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                that.$clipBtn.hasClass('active') ? that.$clipBtn.removeClass('active') : null;
                that.$opacityInputWrap.css('display', 'flex');
                that.$clipInputWrap.hide();
                that.isAlphaOpen = true;
            } else {
                $(this).removeClass('active');
                that.$opacityInputWrap.hide();
                that.isAlphaOpen = false;
            }
            that.$opacityInput.val(that.alphaValue).css('background-size', `${that.alphaValue * 100}% 100%`);
        });
        this.$opacityInput.on('input', function () {
            that.alphaValue = $(this).val();
            console.log(`%c 剪裁值：${that.alphaValue} `, 'background:#0f88eb;color:#fff');
            $(this).css('background-size', `${that.alphaValue * 100}% 100%`);
            Module3D.Rendering.SetAlpha(that.alphaValue);
            Module3D.Rendering.DrawJustOnce();
        });
        //剪裁
        this.$clipBtn.click(function () {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');
                that.$transparentBtn.hasClass('active') ? that.$transparentBtn.removeClass('active') : null;
                that.$clipInputWrap.css('display', 'flex');
                that.$opacityInputWrap.hide();
            } else {
                $(this).removeClass('active');
                that.$clipInputWrap.hide();
            }
            that.$clipInput.val(that.clipPlaneValue).css('background-size', `${that.clipPlaneValue * 100}% 100%`);
        });
        this.$clipInput.on('input', function () {
            that.clipPlaneValue = $(this).val();
            console.log(`%c 剪裁值：${that.clipPlaneValue} `, 'background:#0f88eb;color:#fff');
            let cssPercent = (+clipValue) * 100;
            $(this).css('background-size', `${that.clipPlaneValue * 100}% 100%`);
            Module3D.Rendering.SetClipPlaneZ(that.clipPlaneValue, false);
            Module3D.Rendering.DrawJustOnce();
        });
        // 重置
        this.$resetBtn = $('.ct-btn.reset');
        this.$resetBtn.click(function () {
            that.reset3D(); // 重置之前的图像操作();
        });

        //突出显示嫌疑物CT
        $('.mark').click(function () {
            let type = $(this).hasClass('active');
            type ? $(this).removeClass('active') && (that.showSusobj_byUser = false) : $(this).addClass('active') && (that.showSusobj_byUser = true);
            Module3D.Rendering.DisplaySuspectObject(!type);
            that.drinstance.showSusobj(!type);
            that.slinstance.showSusobj(!type);
            that.redraw3D();
        });
        /*
        显示操作按钮
        */
        this.btns.click(function () {
            showOperateName();
        });
        function showOperateName() {
            var nameText = [];
            that.btns.filter('.active').each(function (index, elem) {
                let operateName = $(elem).attr('title');
                nameText.push(`<span>${operateName}</span>`);
            });
            that.curOperateName.html(nameText.join('+'));
        }

        /*
        键盘监听事件
        */
        this.surfaceBtn = $('.j-tools .surface');
        this.isAlphaOpen = false;
        this.alphaValue = 0.33;
        this.clipPlaneValue = 0;
        this.prevBtn = $('.j-prevbtn .btn-prev');
        this.nextBtn = $('.j-nextbtn .btn-next');
        $(window).keydown(function (event) {
            let keyType = event.which;
            //CT && DR 反色 key:W
            if (keyType == 87 && event.shiftKey) {
                if (that.$inverseBtn.hasClass('active')) {
                    that.$inverseBtn.click();
                }
                return;
            }
            if (keyType == 87) {
                if (!that.$inverseBtn.hasClass('active')) {
                    that.$inverseBtn.click();
                }
                return
            }
            if (keyType == 37) {
                if (that.prevBtn.is(':visible')) {
                    that.prevBtn.click();
                }
                return;
            }
            if (keyType == 39) {
                if (that.nextBtn.is(':visible')) {
                    that.nextBtn.click();
                }
                return;
            }
            if (keyType == 38) {
                if (that.isAlphaOpen) {//确保点开了透明度控制按钮
                    that.alphaValue = Math.min(that.alphaValue + 0.05, 1);
                    that.$opacityInput.val(that.alphaValue).css('background-size', that.alphaValue * 100 + '% 100%');
                    Module3D.Rendering.SetAlpha(that.alphaValue);
                    Module3D.Rendering.DrawJustOnce();
                }
                return;
            }
            if (keyType == 40) {
                if (that.isAlphaOpen) {//确保点开了透明度控制按钮
                    that.alphaValue = Math.max(that.alphaValue - 0.05, 0);
                    that.$opacityInput.val(that.alphaValue).css('background-size', that.alphaValue * 100 + '% 100%');
                    Module3D.Rendering.SetAlpha(that.alphaValue);
                    Module3D.Rendering.DrawJustOnce();
                }
                return;
            }
            //CT 表面增强
            if (keyType == 83 && event.shiftKey) {
                if (that.surfaceBtn.hasClass('active')) {
                    that.surfaceBtn.click();
                }
                return;
            }
            if (keyType == 83) {
                if (!that.surfaceBtn.hasClass('active')) {
                    that.surfaceBtn.click();
                }
                return;
            }
            // CT 透明度 key:A
            if (keyType == 65 && event.shiftKey) {
                if (that.$transparentBtn.hasClass('active')) {
                    that.$transparentBtn.click();
                }
                return;
            }
            if (keyType == 65) {
                if (!that.$transparentBtn.hasClass('active')) {
                    that.$transparentBtn.click();
                }
                return;
            }
        });
    }
    initSqlLite() {
        this.sql = new SqlLite();
    }
}

/**
 *
 * 作者：lixing
 * 时间：07/24
 *
 * @class DrViewer
 *
 *
 */
class DrViewer {
    constructor(options={}) {
        this.options = {
          DrWidth: 400, // 默认宽
          DrHeight: 400, // 默认高
          DrContainerID: 'canvasdr',// DR图像容器ID
          showSusobj: true // 是否"突出显示危险品"
        }
        Object.assign(this.options, options)
        this.init()
    }
    init() {
        this.initSqlLite()
        this.initDrElement()
        this.initToolsBtnEvent()
    }
    initDrElement() {
        // drinstance 渲染变量
        this.shaderA = 'raw' //第一个参数。默认就是表面增强
        this.shaderB = 'standard' //第二个参数。默认是标准
        this.shaderC = 'default' //第三个参数。默认就是真彩色
        this.hasLoaded = false  // 判断图像是否加载完成的字段
        this.selectTipResult = null
        this.isTipSelected = false
        this.tipPos = [100,100]
        this.hasInsertTip = false

        // 页面元素
        this.body = $('body')
        this.loadingLayer = $('#loading')
        this.$drinstanceWrap = $(`#${this.options.DrContainerID}`)
        this.curOperateName = $('.j-cur-operate')
        this.zoomIndex = $('.j-dr-zoomindex')
        this.btns = $('.j-tools a')
        this.coloursBtn = $('.colours')
        this.marktipBtn = $('.marktip')
        this.$anglesWrap = $('.j-angles')
        this.drContainer = $('.j-dr-container')
        this.entityContainer = $('.j-entity-container')
        this.entityImg = this.entityContainer.find('img')
        this.entityBtnWrap = $('.j-entity-wrap')
        this.entityBtn = this.entityBtnWrap.find('a')
        this.angleIndex = 0

        this.drinstance = new Module3D.DRImageInstance()

        this.drinstance.setScaleMinAndMax(0.1, 4) //缩放比例最大最小值
        this.drinstance.setCallbackWhenLoaded(() => { //DR图像加载完成后
            this.loadEnding()
            this.zoomIndex.text(this.drinstance.getZoomIndex().toFixed(1))
        })
        this.drinstance.setMouseWheelCallback(() => { //dr 缩放系数
            this.zoomIndex.text(this.drinstance.getZoomIndex().toFixed(1))
        })
        this.drinstance.showSusobj(this.options.showSusobj)//dr练习时不让危险品突出显示
        this.drinstance.setMMSelectCallback((data) => {
            this.setSelectTipResult(data)
        })
        // tip 插入管理实例化
        this.tipManager = new Module3D.DRTipManager()
        this.tipManager.setDr(this.drinstance)
        // this.tipManager.bindTipToDr(0,[['js/wgl/0303s.png',100,200], ['js/wgl/0303r.png',100,100]])
        // this.tipManager.bindTipToDr(1,[['drtip.png',100,200], ['drtip2.png',100,100]])

    }
    loadStart() {
        // this.loadingLayer.show()
        this.hasLoaded = false
    }
    loadEnding() {
        let that = this
        // this.resetDR()
        // this.loadingLayer.hide()
        this.hasLoaded = true
        if (this.activeImgInfo.isTip) {
            this.drinstance.switchToTipImage(true)
        } else {
            this.drinstance.switchToTipImage(false)
        }
        this.drinstance.showSusobj(this.options.showSusobj)
        this.loadEndCallback && this.loadEndCallback()
    }
    showDR(imgInfo) {
      this.activeAngleIndex = 0
      this.activeImgInfo = imgInfo
      this.sql.getData_DR(imgInfo, this.initShowDR.bind(this))
        // this.sql.dropTable()
    }
    initShowDR(data) {
      this.loadStart()
      // console.log('DR图像渲染的原始数据！')
      // console.log(data)
      let that = this
      this.renderingData = data
      this.entityContainer.hide()
      this.drContainer.css('display', 'flex')
      let anglesHTML = ''
      data.forEach((angle, index) => {
        let isActive = index === 0 ? 'active' : ''
        let indexName = index === 0 ? '视角一' : '视角二'
        if (angle !== null && (index === 0 || index === 2)) {
          anglesHTML += `<a class="${isActive}">${indexName}</a>`
        }
      })
      if (this.activeImgInfo.thumbnails.length !== 0) {
        this.entityImg.attr('src', this.activeImgInfo.thumbnails[0].url)
        this.entityBtn.removeClass('active')
        this.entityBtnWrap.show()
      } else {
        this.entityBtnWrap.hide()
      }
      this.$anglesWrap.html(anglesHTML)
      this.renderDR()
    }
    renderDR() {
        console.log('%c Show DR ... ', 'background:#f90;color:#fff')
        this.drinstance.loadTexture(this.options.DrContainerID, this.renderingData[this.activeAngleIndex], this.options.DrWidth, this.options.DrHeight)
        if (this.renderingData[this.activeAngleIndex + 1] !== null) {
          this.drinstance.loadTextureApp(this.renderingData[this.activeAngleIndex + 1])
        }
        // this.drinstance.loadTexture(this.options.DrContainerID, renderObj.B64, this.options.DrWidth, this.options.DrHeight);
        // this.drinstance.loadTextureApp('js/wgl/testDr_app.png')
    }
    resetDR() {
        this.drinstance.setShader('raw', 'standard', 'default');
        this.shaderA = 'raw';
        this.shaderB = 'standard';
        this.shaderC = 'default';
        this.absorbValue = 0;
        this.selectTipResult = null;
        this.isTipSelected = false;
        this.btns.removeClass('active');
        this.body.removeClass('inverse');
        this.drinstance.setInverse(false);
        if (!this.options.showSusobj) {
            this.coloursBtn.addClass('active');
            this.curOperateName.html(`<span>真彩色</span>`);
        }
        else {
            this.coloursBtn.addClass('active');
            this.marktipBtn.addClass('active');
            this.curOperateName.html(`<span>真彩色</span>+<span>表面增强</span>`);
        }
        this.drinstance.restoreOrigialPos();
        this.drinstance.setAbsorbLUT(65000, 0);
        this.drinstance.showSusobj(this.options.showSusobj);
        this.drinstance.setZoomIndex(6)
        this.zoomIndex.text(this.drinstance.getZoomIndex().toFixed(1))
    }
    setShader() {
        console.log(`%c DR渲染参数： ${this.shaderA} ${this.shaderB} ${this.shaderC} `, 'background:#00bcd4;color:#fff')
        this.drinstance.setShader(this.shaderA, this.shaderB, this.shaderC)
        this.drinstance.refreshDisplay()
    }
    // 标记 tip 后的设置的回调函数
    setSelectTipResult(data) {
        console.log(`%c DR 标记嫌疑物 ${data} `, 'background:#f90;color:#fff')
        this.selectTipResult = data
        this.isTipSelected = true
    }
    stopRender() {
        this.drinstance.renderer.forceContextLoss()
        this.drinstance.renderer.context = null
        this.drinstance.renderer.domElement = null
        this.drinstance.renderer = null
    }
    /**
     * 测试 DR 插入 tip
     */
    testAngleOpr() {
      // 插入tip
      let that = this
      this.$anglesWrap.on('click', 'a', function(){
        if(!$(this).hasClass('active')){
                  let index = $(this).index()
          $(this).addClass('active').siblings().removeClass('active')
          if(index === 0) {
                      that.renderDR()
                  } else {
                      that.drinstance.loadTexture(that.options.DrContainerID, 'js/wgl/testDs.png', 600, 600)
                      that.drinstance.loadTextureApp('js/wgl/testDs_app.png')
          }
          if (that.hasInsertTip){
                      // setTimeout(() => {
                          that.loadDRTipImage(index)
                      // }, 1000)
          }
        }
      })
      // 禁止默认鼠标右键
      $('.j-dr-container').on('contextmenu', function(e){
        return false
      })
    }
    loadDRTipImage(index) {
      let tipType = this.$anglesWrap.find('.active').index() == 0 ? '0303s.png': '0303r.png'
      if (!this.hasInsertTip){
              this.hasInsertTip = true
              this.tipManager.bindTipToDr(0,[['js/wgl/0303s.png',100,200]])
      } else {
              if (index === 0) {
                  this.tipPos = this.tipManager.original_pos_1
              } else {
                  this.tipPos = this.tipManager.original_pos_2
              }
              console.warn(this.tipPos[0])
              this.tipManager.bindTipToDr(index, [[`js/wgl/${tipType}`, this.tipPos[0][0], this.tipPos[0][1]]])
      }

    }
    loadDRTipImageRandom() {
      this.drinstance.loadDRTipImage('js/wgl/0303s.png','', () => {
        setTimeout(() => {
          this.drinstance.setTipPositionRandom(this.tipPos.x + 100)
        }, 100)
      })
    }
    setTip(tipid) {
        if (tipid === null || tipid === undefined) {
            NSTS.Plugin.Alert.Error('参数非法')//参数非法
            return
        }
        if (parseInt(tipid, 10) > 0) {
            this.sql.getData(tipid, this.showTip.bind(this))
        }
    }
    showTip(obj) {
        console.log('%c tip 正在上膛 ...','background: #5b0;color:#fff')
        this.drinstance.loadDRImage(obj.B64, obj.TXT, this.setTipPosition(obj))
    }
    setTipPosition(obj) {
		this.drinstance.setTipPosition(100, 100)
    }
    // 事件绑定
    initToolsBtnEvent() {
        let that = this
        // 实物图显示
        this.entityBtn.on('click', function() {
          $(this).addClass('active')
          that.$anglesWrap.find('a').addClass('noactive')
          that.drContainer.hide()
          that.entityContainer.css('display', 'flex')
        })
        // 视角切换
        this.$anglesWrap.on('click', 'a', function() {
          if (!that.drContainer.is(':visible')) {
            that.drContainer.css('display', 'flex')
            that.entityContainer.hide()
            that.entityBtn.removeClass('active')
            that.$anglesWrap.find('a').removeClass('noactive')
          }
          if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings().removeClass('active')
            if($(this).index() === 1) {
              that.activeAngleIndex = 2
            } else {
              that.activeAngleIndex = 0
            }
            that.renderDR()
          }
        })

        // 渲染参数B => 超级穿透
        this.hiBtn = $('.j-tools .hi')
        this.hiBtn.click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active')
            }
            else {
                $(this).addClass('active')
            }
            that.shaderB = $(this).hasClass('active') ? 'superpenetrate' : 'standard'
            that.setShader()
        })

        // 按钮组 C  => 灰色、彩色、ms、os    @ CT DR 通用
        this.groupC = $('.j-tools a[data-group="c"]')
        this.groupC.click(function () {
            if (!$(this).hasClass('active')) {
                that.groupC.removeClass('active')
                $(this).addClass('active')
            }
            else {
                if ($(this).hasClass('colours')) {
                    return false
                }
                else {
                    $(this).removeClass('active')
                    that.groupC.filter('.colours').addClass('active')
                }
            }
            groupC()
        })
        function groupC() {
            var $activeBtn = that.groupC.filter('.active')
            that.shaderC = $activeBtn.data('tag')
            that.setShader()
        }

        // 反色显示  @ CT DR shared
        this.inverseBtn = $('.j-tools .inverse')
        this.inverseBtn.click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active')
                $('body').removeClass('inverse')
            }
            else {
                $(this).addClass('active')
                $('body').addClass('inverse')
            }

            let showType = $(this).hasClass('active')
            inverse(showType)
        })
        function inverse(showType) {
            that.drinstance.setInverse(showType)
            that.drinstance.composer.render(0.1)
        }

        // 重置
        $('.dr-btn.reset').click(function () {
            that.resetDR()
        })

        //突出显示嫌疑物 DR
        $('.marktip').click(function () {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active')
                that.drinstance.showSusobj(true)
            }
            else {
                $(this).removeClass('active')
                that.drinstance.showSusobj(false)
            }
        });

        // 可变吸收率
        this.absorbValue = 0
        this.groupAbsorb = $('.j-tools .dr-btn[data-group="absor"]')
        this.groupAbsorb.click(function () {
            that.absorbValue += parseInt($(this).data('absor'))
            console.log(that.absorbValue)
            if (that.absorbValue > 0) {
                that.groupAbsorb.removeClass('active').filter('.absor-plus').addClass('active')
            }
            else if (that.absorbValue < 0) {
                that.groupAbsorb.removeClass('active').filter('.absor-minus').addClass('active')
            }
            else {
                that.groupAbsorb.removeClass('active')
            }
            groupAbsorb()
        })
        function groupAbsorb() {
            if (that.absorbValue > 25) {
                that.absorbValue = 25
                return false
            }
            if (that.absorbValue < -25) {
                that.absorbValue = -25
                return false
            }
            that.drinstance.setAbsorbLUT(65000, that.absorbValue)
            showOperateName()
        }

        // 超级增强     @ DR 独有
        this.groupADr = $('.j-tools .dr-btn[data-group="a"]')
        this.groupADr.click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active')
            }
            else {
                $(this).addClass('active')
            }
            that.shaderA = $(this).hasClass('active') ? 'super' : 'raw'
            that.drinstance.updateShader(that.shaderA, that.shaderB, that.shaderC)
            that.drinstance.refreshDisplay()
        })

        /*
         显示操作按钮
        */
        $('.j-tools a').click(function () {
            showOperateName()
        })
        function showOperateName() {
            var nameText = []
            $('.j-tools a').filter('.active').each(function (index, elem) {
                let operateName = $(elem).attr('title')
                nameText.push(`<span>${operateName}</span>`)
            })
            that.curOperateName.html(nameText.join('+'))
        }

        /*
            键盘监听事件
        */
        this.surfaceBtn = $('.j-tools .surface')
        this.bwBtn = $('.j-tools .bw')
        this.absorbPlusBtn = this.groupAbsorb.filter('.absor-plus')
        this.absorbMinusBtn = this.groupAbsorb.filter('.absor-minus')
        this.isAlphaOpen = false
        this.alphaValue = 0.33
        this.prevBtn = $('.j-prevbtn .btn-prev')
        this.nextBtn = $('.j-nextbtn .btn-next')
        $(window).keydown(function (event) {
            let keyType = event.which
            //CT && DR 反色 key:W
            if (keyType == 87 && event.shiftKey) {
                if (that.inverseBtn.hasClass('active')) {
                    that.inverseBtn.click()
                }
                return
            }
            if (keyType == 87) {
                if (!that.inverseBtn.hasClass('active')) {
                    that.inverseBtn.click()
                }
                return
            }
            //DR 灰色显示 key:G
            if (keyType == 71 && event.shiftKey) {
                if (that.bwBtn.hasClass('active')) {
                    that.bwBtn.click()
                }
                return
            }
            if (keyType == 71) {
                if (!that.bwBtn.hasClass('active')) {
                    that.bwBtn.click()
                }
                return
            }
            // DR 高能穿透 key:H
            if (keyType == 72 && event.shiftKey) {
                if (that.hiBtn.hasClass('active')) {
                    that.hiBtn.click()
                }
                return
            }
            if (keyType == 72) {
                if (!that.hiBtn.hasClass('active')) {
                    that.hiBtn.click()
                }
                return
            }
            if (keyType == 37) {
                if (that.prevBtn.is(':visible')) {
                    that.prevBtn.click()
                }
                return
            }
            // 下一副
            if (keyType == 39) {
                if (that.nextBtn.is(':visible')) {
                    that.nextBtn.click()
                }
                return
            }
            // 可变吸收率 增加
            if (keyType == 38) {
                that.absorbPlusBtn.click()
                return
            }
            if (keyType == 40) {
                that.absorbMinusBtn.click()
                return
            }
        })
    }
    initSqlLite() {
        this.sql = new SqlLite()
    }
}

/**
 *
 * 本地查询数据库
 *
 * @class SqLite
 *
 * 图像本地存储
 * 图像包含 id 和 fileID
 * CT 图像和 DR 图像包含共同的 fileID
 * id用来查询资源，fileID用来映射相应的存储数据
 */
class SqlLite {
    constructor(mode) {
        this.mode = 'load'
        this.version = '3'
        this.init()
    }
    init() {
      let _dbName = 'NstsFiles'
      let _fileTable = this.tableName = 'File_MainStore'
      this.dbHelper = new SqLiteHelper({ _db: window.openDatabase(_dbName, this.version, 'website DB for Image', 2000 * 1024 * 1024)})
      let tb = [{
        table: _fileTable,
        properties: [
          { name: 'FileID', type: 'INTEGEER PRIMARY KEY' },
          { name: 'ImgData', type: 'TEXT' },
          { name: 'ImgDesData', type: 'TEXT' },
          { name: 'SuspectCubeData', type: 'TEXT' },
          { name: 'Density', type: 'TEXT' },
          { name: 'Angle1', type: 'TEXT' },
          { name: 'Suspect1', type: 'TEXT' },
          { name: 'Angle2', type: 'TEXT' },
          { name: 'Suspect2', type: 'TEXT' },
        ]
      }]
      this.dbHelper.check(tb)
    }
    dropTable() {
      this.dbHelper.dropTable(this.tableName)
      console.log(`%c ${this.tableName}数据表 删除成功！！！`, 'background:#f00')
    }
    getData_CT(imgInfo, callback) {
      let that = this
      this.dbHelper.query(`select ImgData, ImgDesData, SuspectCubeData, Density FROM File_MainStore WHERE FileID =${imgInfo.fileID}`, function (e, reader) {
        // 本地还没有保存过这条 fileID 的数据
        if (reader !== null && reader.rows.length === 0) {
          console.log(`%c 数据远程下载 ... `, 'background:#c41d7f;color:#fff')
          that.fetchData_CT(imgInfo.ct).then(data => {
            console.log(data)
            let pushdata = []
            pushdata.push([
              {'name': 'FileID', 'value': imgInfo.fileID},
              {'name': 'ImgData', 'value': data[0]},
              {'name': 'ImgDesData', 'value': data[1]},
              {'name': 'SuspectCubeData', 'value': data[2]},
              {'name': 'Density', 'value': data[3]}
            ])
            that.dbHelper.insert(that.tableName, pushdata)
            callback(data)
          })
        }
        // 本地存储了这个 fileID 数据
        if (reader != null && reader.rows !== null && reader.rows.length == 1) {
          let dbobj = reader.rows[0]
          // 没有 CT 相关的数据。之存储了DR的数据，需要update这条 fileID 的数据
          if (dbobj.ImgData === null) {
            console.log(`%c CT数据本地更新 ... `, 'background:#eb2f96;color:#fff')
            that.fetchData_CT(imgInfo.ct).then(data => {
              console.log(data)
              let updateData = []
              updateData.push([
                {'name': 'ImgData', 'value': data[0]},
                {'name': 'ImgDesData', 'value': data[1]},
                {'name': 'SuspectCubeData', 'value': data[2]},
                {'name': 'Density', 'value': data[3]}
              ])
              let whereData = []
              whereData.push(
                {'name': 'FileID', 'value': imgInfo.fileID}
              )
              that.dbHelper.update(that.tableName, updateData, whereData)
              callback(data)
            })
          // 本地保存了需要查询的数据
          } else {
            console.log(`%c 数据本地读取 ... `, 'background:#f759ab;color:#fff')
            console.log(dbobj)
            callback(Object.values(dbobj))
          }
        }
      })
    }
    // 视角主体数据
    fetchData_CT(ctObj) {
      let fetchDataFns = []
      // Object.entries(ctObj).forEach(item => {
      //   console.log(item)
      // })
      Object.values(ctObj).forEach(item => {
        if (item.suspect !== '') {
          if (item.endsWith('.txt')) {
            fetchDataFns.push(this.loadDataByFileReaderTxt(item))
          } else {
            fetchDataFns.push(this.loadDataByFileReader(item))
          }
        } else {
          fetchDataFns.push(this.loadEmptyData())
        }
      })
      return new Promise((resolve, reject) => {
        Promise.all(fetchDataFns)
          .then(data => {
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
    getData_DR(imgInfo, callback) {
      let that = this
      this.dbHelper.query(`select Angle1, Suspect1, Angle2, Suspect2 FROM File_MainStore WHERE FileID =${imgInfo.fileID}`, function (e, reader) {
        // 本地还没有保存过这条 fileID 的数据
        if (reader !== null && reader.rows.length === 0) {
          console.log(`%c 数据远程下载 ... `, 'background:#c41d7f;color:#fff')
          that.fetchData_DR(imgInfo.dr).then(data => {
            console.log(data)
            let pushdata = []
            pushdata.push([
              {'name': 'FileID', 'value': imgInfo.fileID},
              {'name': 'Angle1', 'value': data[0]},
              {'name': 'Suspect1', 'value': data[1]},
              {'name': 'Angle2', 'value': data[2] || null},
              {'name': 'Suspect2', 'value': data[3] || null}
            ])
            that.dbHelper.insert(that.tableName, pushdata)
            callback(data)
          })
        } else {
          // 本地存储了这个 fileID 数据
          if (reader != null && reader.rows !== null && reader.rows.length == 1) {
            let dbobj = reader.rows[0]
            console.log(reader)
            // 没有 DR 相关的数据存储，需要 update 这条 fileID 的数据
            if (dbobj.Angle1 === null) {
              console.log(`%c DR数据本地更新 ... `, 'background:#eb2f96;color:#fff')
              that.fetchData_DR(imgInfo.dr).then(data => {
                console.log(data)
                let updateData = []
                updateData.push([
                  {'name': 'Angle1', 'value': data[0]},
                  {'name': 'Suspect1', 'value': data[1]},
                  {'name': 'Angle2', 'value': data[2]},
                  {'name': 'Suspect2', 'value': data[3]}
                ])
                let whereData = []
                whereData.push(
                  {'name': 'FileID', 'value': imgInfo.fileID}
                )
                that.dbHelper.update(that.tableName, updateData, whereData)
                callback(data)
              })
            // 本地保存了需要查询的数据
            } else {
              console.log(`%c 数据本地读取 ... `, 'background:#f759ab;color:#fff')
              console.log(dbobj)
              callback(Object.values(dbobj))
            }
          }
        }
      })
    }
    fetchData_DR(drArr) {
      let fetchDataFns = []
      // 视角主体数据
      drArr.forEach(item => {
        fetchDataFns.push(this.loadDataByFileReader(item.url))
        if (item.suspect !== '') {
          fetchDataFns.push(this.loadDataByFileReader(item.suspect))
        } else {
          fetchDataFns.push(this.loadEmptyData())
        }
      })
      return new Promise((resolve, reject) => {
        Promise.all(fetchDataFns)
          .then(data => {
            resolve(data)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
    // 下载 png 图像信息
    loadDataByFileReader(url) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        let xhr = new XMLHttpRequest()
        xhr.open('get', url, true)
        xhr.responseType = 'blob'
        xhr.onload = function () {
          if (this.status === 200) {
            reader.readAsDataURL(this.response)
          } else {
            console.log(this.statusText)
          }
        }
        xhr.send()
        reader.onerror = error => {
          reject(error)
        }
        reader.onload = data => {
          resolve(data.target.result)
        }
      })
    }
    // 下载 txt 文件信息
    loadDataByFileReaderTxt(url) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        let xhr = new XMLHttpRequest()
        xhr.open('get', url, true)
        xhr.responseType = 'blob'
        xhr.onload = function () {
          if (this.status === 200) {
            reader.readAsText(this.response)
          } else {
            console.log(this.statusText)
          }
        }
        xhr.send()
        reader.onerror = error => {
          reject(error)
        }
        reader.onload = data => {
          resolve(data.target.result)
        }
      })
    }
    // 当 suspect='' 时，直接返回 null 数据
    loadEmptyData() {
      return new Promise(resolve => {
        resolve(null)
      })
    }
}

/**
 * DR 图像本地存储
 */
class SqlLiteDr {
  constructor(mode) {
      this.mode = 'load'
      this.version = '3'
      this.init()
  }
  init() {
    let _dbName = 'NstsFiles'
    let _fileTable = this.tableName = 'File_MainStore_DR'
    this.dbHelper = new SqLiteHelper({ _db: window.openDatabase(_dbName, this.version, 'website DB for DR', 1000 * 1024 * 1024)})
    let tb = [{
      table: _fileTable,
      properties: [
        { name: 'FileID', type: 'INTEGEER PRIMARY KEY' },
        { name: 'Angle1', type: 'TEXT' },
        { name: 'Suspect1', type: 'TEXT' },
        { name: 'Angle2', type: 'TEXT' },
        { name: 'Suspect2', type: 'TEXT' }
      ]
    }]
    this.dbHelper.check(tb)
  }
  dropTable() {
    this.dbHelper.dropTable(this.tableName)
    console.log(`%c ${this.tableName}数据表 删除成功！！！`, 'background:#f00')
  }
  getData(fileid, callback) {
    console.warn(fileid)
    let that = this
    this.dbHelper.query(`select Angle1, Suspect1, Angle2, Suspect2 FROM File_MainStore_DR WHERE FileID =${fileid}`, function (e, reader) {
      console.log(reader)
      if (reader != null && reader.rows != null && reader.rows.length == 1) {
        console.log(`%c 数据本地读取 ... `, 'background:#eb2f96;color:#fff')
        let dbobj = reader.rows[0]
        console.log(dbobj)
        callback(Object.values(dbobj))
      }
      else {
        console.log(`%c 数据远程下载 ... `, 'background:#000;color:#fff')

        $.ajax({
          url: `http://10.13.62.25:8070/api/DR/${fileid}`,
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3NUVEMjkyQTkwQUNFQkNGNUZCNTYxOTNBMzMxQ0NDMiIsImlhdCI6MTUxNjg0NjI0MCwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjYwMDY0MDAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjM2MDgwNzkyMzkzMzA1MzMzMDAiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoi6LaF57qn566h55CG5ZGYIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU3VwZXJBZG1pbiIsIk9yZ0lEIjoiMzYwODA3OTIzOTMzMDUzMzM3NiIsIkVudGVycHJpc2VDb2RlIjoiIiwibmJmIjoxNTE2ODQ2MjM5LCJleHAiOjE1NDI4NTI2MzksImlzcyI6Ik5TVFMuTlVDVEVDSC5DT00iLCJhdWQiOiJOU1RTX1VTRVIifQ.3_aYso892uDawzGIh46EKx8t2cYuk6i01t9EZmUD2uw'
          },
          success (rawData) {
            console.log(rawData)
            that.fetchData(rawData.package.dr).then(data => {
              console.log(data)
              let pushdata = []
              pushdata.push([
                {'name': 'FileID', 'value': fileid},
                {'name': 'Angle1', 'value': data[0]},
                {'name': 'Suspect1', 'value': data[1] || null},
                {'name': 'Angle2', 'value': data[2] || null},
                {'name': 'Suspect2', 'value': data[3] || null}
              ])
              that.dbHelper.insert(that.tableName, pushdata)
              callback(data)
            })
          }
        })
      }
    })
  }
  fetchData(data) {
    let fetchDataFns = []
    // 视角主体数据
    data.forEach(item => {
      fetchDataFns.push(this.loadDataByFileReader(item.url))
      if (item.suspect === '') {
        fetchDataFns.push(this.loadEmptyData())
      } else {
        fetchDataFns.push(this.loadDataByFileReader(item.suspect))
      }
    })
    return new Promise((resolve, reject) => {
      Promise.all(fetchDataFns)
        .then(data => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  loadDataByFileReader(url) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
      let xhr = new XMLHttpRequest()
      xhr.open('get', url, true)
      xhr.responseType = 'blob'
      xhr.onload = function () {
        if (this.status === 200) {
          reader.readAsDataURL(this.response)
        } else {
          console.log(this.statusText)
        }
      }
      xhr.send()
      reader.onerror = error => {
        reject(error)
      }
      reader.onload = data => {
        resolve(data.target.result)
      }
    })
  }
  // 当 suspect='' 时，直接返回空数据
  loadEmptyData() {
    return new Promise((resolve, reject) => {
      resolve(null)
    })
  }
}
