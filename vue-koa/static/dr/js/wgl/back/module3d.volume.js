var module3d = {name:"module3d"};

module3d.volume = function(filename){
	this.filename = filename || "";
	this.data = "";
};
module3d.volume.prototype = {
	
	constructor : module3d.volume,
	
	get getVolumeFilename(){
		return this.filename;
	},
	
	loadAsData: function(){
		var dataImage=  new Image();
		dataImage.onload = function(){
			
			var width = dataImage.width;
			var height = dataImage.height;
			//get image data
			console.log("volume table Width: "+width+" Height: "+height);
			var canvas = document.createElement('canvas');
			var context = canvas.getContext('2d');
			context.width = width;
			context.height = height;
			context.drawImage(dataImage,0,0);
			var imgData = new Uint8Array(context.getImageData(0,0,width,height).data);
			canvasData = null;
			
			for(var i=0;i<256;i++)
			{
				for(var j=0;j<256;j++)
				{
					var index =4*( j*width + i);
					//console.log(imgData[index]+"#"+imgData[index+1]+"#"+imgData[index+2]+"@");
				}
			}
		};
		dataImage.src = this.filename;
	},
	
};