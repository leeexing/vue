$(function(){
	// CT 识图学习。里面存在某些图像不能正常显示的问题
    // imgOpts = '{"knowledges":[],"forLevels":[],"count":"10"}';// 查询条件
    // var CtLearning = new ImgStudyCT();
    // CtLearning.init(imgOpts)
    

    // 单幅CT图像显示。资源固定，便与测试
    var CtLearning = new MapPreviewCT();
    CtLearning.init(12382)
	
	$('.page-close').click(function(){
		CtLearning.Viewer.setTip(29535)
	})
})