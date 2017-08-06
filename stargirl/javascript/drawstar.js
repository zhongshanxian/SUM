var starObj=function(){
	this.x;
	this.y;
	this.starPicNum;
	this.timer;

	this.xspeed;
	this.yspeed;
}
starObj.prototype.init=function(){
	this.x=Math.random()*700;
	this.y=Math.random()*450;
	this.starPicNum=Math.floor(Math.random()*7);
	this.timer=0;
	this.xspeed=Math.random()*4-2;
	this.yspeed=Math.random()*4-2;
}
starObj.prototype.update=function(){
	this.x+=this.xspeed*deltaTime*0.002;
	this.y+=this.yspeed*deltaTime*0.002;

	//判断重生
	if(this.x<0||this.x>800)
	{
		this.init();
		return;
	}
	if(this.y<0||this.y>550)
	{
		this.init();
		return;
	}
	this.timer+=deltaTime;
	if(this.timer>60)
	{
		this.starPicNum+=1;
		this.starPicNum%=7;
		this.timer=0;
	}
}
starObj.prototype.draw=function(){
	context.save();
	context.globalAlpha=life;
	context.drawImage(starPic,7*this.starPicNum,0,7,7,this.x,this.y,7,7);
	context.restore();
}
function drawStars(){
	for(var i=0;i<starNum;i++)
	{
		stars[i].update();
		stars[i].draw();
	}
}
function aliveUpdate(){
	if(mouseswitch)
	{
		//show star
		life+=0.03*deltaTime*0.05;
		if(life>1)
		{
			life=1;
		}
	}
	else
	{
		//hide star
		life-=0.03*deltaTime*0.05;
		if(life<0)
		{
			life=0;
		}
	}
}