var aneObj=function(){
	//起始点，控制点，结束点
	this.rootx=[];
	this.headx=[];
	this.heady=[];
	this.amp=[];
	this.angle=0;
}
aneObj.prototype.num=53;
aneObj.prototype.init=function(){
	for(var i=0;i<this.num;i++)//50条
	{
		this.rootx[i]=i*15+Math.random()*30;//[0,1)
		this.headx[i]=this.rootx[i];
		this.heady[i]=canHeight-220+Math.random()*50;
		this.amp[i]=Math.random()*10+50;
	}
}
aneObj.prototype.draw=function(){
	context2=canvas2.getContext("2d");
	this.angle+=deltaTime*0.0008;
	var l=Math.sin(this.angle);
	context2.save();
	context2.lineWidth=17;
	context2.lineCap="round";//圆顶
	context2.strokeStyle="#3b154e";//颜色先写
	context2.globalAlpha=0.7;
	for(var i=0;i<this.num;i++)
	{
		//beginPath,moveTo,lineTo,stroke,strokeStyle,lineWidth,lineCap,globalAlpha
		
		context2.beginPath();
		context2.moveTo(this.rootx[i], canHeight);
		this.headx[i]=this.rootx[i]+l*this.amp[i];
		context2.quadraticCurveTo(this.rootx[i], canHeight-120,this.headx[i],this.heady[i]);
		context2.stroke();
	}
	context2.restore();
}