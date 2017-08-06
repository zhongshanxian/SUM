var waveObj=function(){
	this.x=[];
	this.y=[];
	this.alive=[];
	this.r=[];
	this.bornType="mom";
}
waveObj.prototype.num=10;
waveObj.prototype.init=function(){
	for(var i=0;i<this.num;i++)
	{
		this.alive[i]=false;
		this.r[i]=0;
	}
}
waveObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++)
	{
		if(this.alive[i])//物体空闲才利用
		{
			//draw
			this.r[i]+=deltaTime*0.05;
			if(this.bornType=="mom")
			{
				if(this.r[i]>50)
				{
					this.alive[i]=false;
				}
				var alpha=1-this.r[i]/50;
				var bornColor="255,255,255,";
				context1.lineWidth=1;
			}
			else
			{
				if(this.r[i]>80)
				{
					this.alive[i]=false;
				}
				var alpha=1-this.r[i]/80;
				var bornColor="255,100,100,";
				context1.lineWidth=2;
			}
			context1.save();
			context1.beginPath();
			context1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);
			context1.closePath();
			context1.strokeStyle="rgba("+bornColor+alpha+")";
			context1.stroke();
			context1.restore();
		}
	}
}
waveObj.prototype.born=function(x,y){
	for(var i=0;i<this.num;i++)
	{
		if(!this.alive[i])
		{
			//born
			this.alive[i]=true;
			this.r[i]=10;
			this.x[i]=x;
			this.y[i]=y;
			return;//找出一个即可 
		}
	}
}