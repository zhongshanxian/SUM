var fruitObj=function(){
	this.alive=[];//bool
	this.x=[];//坐标
	this.y=[];
	this.l=[];//果实大小
	this.speed=[];//成长速度
	this.fruitType=[];//果实类型
	this.orange=new Image();//定义两种 颜色的果实
	this.blue=new Image();
}
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++)
	{
		this.alive[i]=false;//一开始设定休眠状态
		this.x[i]=0;
		this.y[i]=0;
		this.speed[i]=Math.random()*0.015+0.003;
		this.fruitType[i]="";
		//this.born(i);//让所有果实出生
	}
	this.orange.src="style/img/fruit.png";
	this.blue.src="style/img/blue.png";
}
fruitObj.prototype.draw=function(){
	for( var i=0;i<this.num;i++)
	{
		//draw
		//find an ane,grow,flp up
		if(this.alive[i])
		{
			if(this.fruitType[i]=="blue")
			{
				var pic=this.blue;
			}
			else
			{
				var pic=this.orange;
			}
			if(this.l[i]<=14)
			{
				this.l[i]+=this.speed[i]*deltaTime;
			}
			else
			{
				this.y[i]-=this.speed[i]*5*deltaTime;
			}
			context2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			if(this.y[i]<-10)
			{
				this.alive[i]=false;
			}
		}	
	}
}
fruitObj.prototype.born=function(i){
	var aneId=Math.floor(Math.random()*ane.num);//随机找一个海葵的id
	/*避免多个果实叠在一起
	for(var k=0;k<i;k++)
	{
		if(this.x[k]==ane.x[aneId]&&this.y[k]==(canHeight-ane.len[aneId]))
		{
			aneId+=1;
		}
		this.x[i]=ane.x[aneId];
		this.y[i]=canHeight-ane.len[aneId];

		this.l[i]=0;
	}
	*/
	this.x[i]=ane.x[aneId];
	this.y[i]=canHeight-ane.len[aneId];
	this.alive[i]=true;//出生后，alive为true
	this.l[i]=0;
	var ran=Math.random();
	if(ran<0.25)
	{
		this.fruitType[i]="blue";
	}
	else
	{
		this.fruitType[i]="orange";
	}
	
}
//检测已有的果实，不够则更新
function fruitMonitor(){
	var num=0;
	for(var i=0;i<fruit.num;i++)
	{
		if(fruit.alive[i])//检测是否存活
		{
			num++;
		}
	}
	if(num<15)
	{
		sendFruit()
		return ;
	}
}
function sendFruit(){
	for(var i=0;i<fruit.num;i++)
	{
		if(!fruit.alive[i])
		{
			fruit.born(i);
			return;
		}
	}
}