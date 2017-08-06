var momObj=function(){
	this.x;
	this.y;
	this.angle;
	this.bigEye=new Image();
	this.bigBody=new Image();
	this.bigTail=new Image();

	this.momTailTimer=0;
	this.momTailCount=0;

	this.momEyeTimer=0;
	this.momEyeCount=0;
	this.momEyeInterval=1200;

	this.momBodyCount=0;
}
momObj.prototype.init=function(){
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0;
	this.bigEye.src="style/img/bigEye0.png";
	this.bigBody.src="style/img/bigSwim0.png";
	this.bigTail.src="style/img/bigTail0.png";
}
momObj.prototype.draw=function(){
	//lerp x,y
	this.x=lerpDistance(mx,this.x,0.9);
	this.y=lerpDistance(my,this.y,0.9);

	//delta angle
	var deltaY=my-this.y;
	var deltaX=mx-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;

	this.angle=lerpAngle(beta,this.angle,0.8);

	this.momTailTimer+=deltaTime;
	if(this.momTailTimer>40)
	{
		this.momTailCount=(this.momTailCount+1)%8;
		this.momTailTimer%=40;
	}

	this.momEyeTimer+=deltaTime;
	if(this.momEyeTimer>this.momEyeInterval)
	{
		this.momEyeCount=(this.momEyeCount+1)%2;
		this.momEyeTimer%=this.momEyeInterval;
		if(this.momEyeCount==1)
		{
			this.momEyeInterval=200;
		}
		else
		{
			this.momEyeInterval=Math.random()*1500+2000;
		}
	}

	context1.save();
	context1.translate(this.x,this.y);//定义原点
	context1.rotate(this.angle);
	var momTailCount=this.momTailCount;
	context1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);
	
	var momBodyCount=this.momBodyCount;
	if(data.double==1)
	{
		context1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width*0.5,-momBodyOra[momBodyCount].height*0.5);
	}
	else
	{
		context1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
	}
	
	var momEyeCount=this.momEyeCount;
	context1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
	context1.restore();
}
/*
function lerpDistance(aim,cur,ratio){
	var delta=cur-aim;
	return aim+delta*ratio;
}
*/