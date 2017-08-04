var aneObj=function(){
	this.x=[];
	this.len=[];
}
aneObj.prototype.num=53;
aneObj.prototype.init=function(){
	for(var i=0;i<this.num;i++)//50条
	{
		this.x[i]=i*15+Math.random()*30;//[0,1)
		this.len[i]=200+Math.random()*50;
	}
}
aneObj.prototype.draw=function(){
	context2=canvas2.getContext("2d");
	context2.save();
	context2.lineWidth=17;
	context2.lineCap="round";//圆顶
	context2.strokeStyle="#3b154e";//颜色先写
	context2.globalAlpha=0.7;
	for(var i=0;i<this.num;i++)
	{
		//beginPath,moveTo,lineTo,stroke,strokeStyle,lineWidth,lineCap,globalAlpha
		
		context2.beginPath();
		context2.moveTo(this.x[i], canHeight);
		context2.lineTo(this.x[i], canHeight-this.len[i]);
		context2.stroke();
	}
	context2.restore();
}