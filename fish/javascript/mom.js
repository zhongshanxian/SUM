var momObj=function(){
	this.x;
	this.y;
	this.angle;
	this.bigEye=new Image();
	this.bigBody=new Image();
	this.bigTail=new Image();
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

	context1.save();
	context1.translate(this.x,this.y);//定义原点
	context1.rotate(this.angle);
	context1.drawImage(this.bigTail,-this.bigTail.width*0.5+30,-this.bigTail.height*0.5);
	context1.drawImage(this.bigBody,-this.bigBody.width*0.5,-this.bigBody.height*0.5);
	context1.drawImage(this.bigEye,-this.bigEye.width*0.5,-this.bigEye.height*0.5);
	context1.restore();
}
/*
function lerpDistance(aim,cur,ratio){
	var delta=cur-aim;
	return aim+delta*ratio;
}
*/