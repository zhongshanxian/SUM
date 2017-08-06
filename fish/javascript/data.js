var dataObj=function(){
	this.fruitNum=0;
	this.double=1;
	this.score=0;
	this.gameOver=false;
	this.alpha=0;
}
dataObj.prototype.init=function(){
	context1.fillStyle="white";
	context1.textAlign="center";
}
dataObj.prototype.draw=function(){//第一个画布 
	var w=canvas1.width;
	var h=canvas1.height;

	context1.font="15px Verdana";
	context1.fillText("fruitNum: "+this.fruitNum,w*0.5,h-70);
	context1.fillText("double: "+this.double,w*0.5,h-40);

	context1.font="22px Verdana";
	context1.fillText("Score: "+this.score,w*0.5,h-500);

	if(this.gameOver)
	{
		context1.save();
		context1.font="35px Verdana";
		context1.shadowBlur=5;
		context1.shadowColor="#ccc";
		this.alpha+=deltaTime*0.0005;
		if(this.alpha>1)
		{
			this.alpha=1;
		}
		context1.fillStyle="rgba(255,255,255,"+this.alpha+")";
		context1.fillText("Game Over ",w*0.5,h*0.5);
		context1.restore();
	}
	
}
dataObj.prototype.addScore=function(){
	this.score+=this.fruitNum*this.double;
	this.fruitNum=0;
	this.double=1;
}