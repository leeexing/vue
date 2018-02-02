// $(function(){
	console.log(222555)
	// DR识图学习
	// imgOpts = '{"knowledges":[],"forLevels":[],"count":"10"}';// 查询条件
	// var DrLearning = new ImgStudyDR()
	// DrLearning.init(imgOpts)
	// 固定一副图像显示，进行测试
	try {
		
		var DRPreview = new MapPreviewDR();
		DRPreview.init(12731)
	}
	catch(e) {
		
		alert(e)
	}
	
	$('.j-map').click(function(){
		//DRPreview.Viewer.setTip(29531)// 29532 视角二
		DRPreview.Viewer.loadDRTipImage()
	})
	$('.page-close').click(() => {
		var headers = {
			'Access-Control-Allow-Origin': ''
		}
		$.ajax({
			url: 'http://localhost:5000/blog/api/v1.0/jsonp',
			// 这是通过jsonp传递给后台的参数，后台通过这些参数先进行数据查询，然后再将前端所需要的数据返回回来
			// http://localhost:5000/blog/api/v1.0/tasks?my_callback=success_jsonpCallback&a=123&b=456&_=1510980701836
			data: {
				a:123,
				b:456
			},
			type: 'GET',
			// 方法一 -- 后台设置 CORS【跨域资源共享】.这个时候dataType类型就直接是 json就可以了啊！这不是jsonp啦
			dataType: 'JSON',
			crossDomain: true,
			
			// 方法二
			// dataType: 'JSONP',
			// jsonp: 'my_callback',
			
			// 方法三
			// dataType: 'JSONP',
			// jsonpCallback: "success_jsonpCallback",
			success: data => {
				console.log(data)
			}
		})
		
	})
	function my_callback(val){
		console.log(996633)
		console.log(val)
	}

// })