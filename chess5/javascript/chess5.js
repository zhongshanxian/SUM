/*
参考慕课的AI五子棋
*/

var chessBoxarr=[];//设定棋盘上的格子是否可走
var me=true,over=false;//确定白棋还是黑棋，游戏是否结束
var winarr=[],blackwin=[],whitewin=[];//定义572中五子棋排列方法，并将方法放进去双方各自的赢法数组中
var count=0;//定义种类572

//准备好则 画棋盘+统计赢法数组
window.onload=function(){
	initChessBox();	
	winarrFn();
}

//将chessBox里面的点设为0，意为可下子，二维数组
for(var i=0;i<15;i++)
{
	chessBoxarr[i]=[];
	for(var j=0;j<15;j++)
	{
		chessBoxarr[i][j]=0;
	}
}

//赢法数组，共有多少种赢法，每种赢法对应的样式，三维，前面 两维是排序情况，后面是第几种
function winarrFn(){
	//先把数组写出来
	for(var i=0;i<15;i++)
	{
		winarr[i]=[];
		for(var j=0;j<15;j++)
		{
			winarr[i][j]=[];
		}
	}
	//纵向数目
	for(var i=0;i<15;i++)//横坐标
	{
		for(var j=0;j<11;j++)//纵坐标
		{
			for(var k=0;k<5;k++)
			{
				winarr[i][j+k][count]=true;//五个棋子才能成一组
			}
			count++;
		}
	}
	//横向数目
	for(var i=0;i<11;i++)//横坐标
	{
		for(var j=0;j<15;j++)//纵坐标
		{
			for(var k=0;k<5;k++)
			{
				winarr[i+k][j][count]=true;//五个棋子才能成一组
			}
			count++;
		}
	}
	//斜向数目
	for(var i=0;i<11;i++)//横坐标
	{
		for(var j=0;j<11;j++)//纵坐标
		{
			for(var k=0;k<5;k++)
			{
				winarr[i+k][j+k][count]=true;//五个棋子才能成一组
			}
			count++;
		}
	}
	//反横向数目
	for(var i=14;i>3;i--)//横坐标
	{
		for(var j=0;j<11;j++)//纵坐标
		{
			for(var k=0;k<5;k++)
			{
				winarr[i-k][j+k][count]=true;//五个棋子才能成一组
			}
			count++;
		}
	}
	for(var i=0;i<count;i++)
	{
		//把572种赢法放进去自己和你的赢数组里面
		blackwin[i]=0;
		whitewin[i]=0;
		//每种赢法需集齐五个棋子，每个棋子一分，所以当mywin[i]==5才赢
	}
}

//获取画布
var chess=document.getElementById("chessBox");
var context=chess.getContext("2d");

//初始化棋盘函数（背景加棋格）
function initChessBox(){
	var bgPic=new Image();
	bgPic.src="style/img/panda.png";
	bgPic.onload=function(){
		context.drawImage(bgPic,0,0,450,450);//先画背景，再画棋盘
		for(var i=0;i<15;i++)
		{
			//先画横线
			context.moveTo(15+i*30,15);
			context.lineTo(15+i*30,435);
			context.strokeStyle="#aaa";
			context.stroke();
			//后画竖线
			context.moveTo(15,15+i*30);
			context.lineTo(435,15+i*30);
			context.strokeStyle="#aaa";
			context.stroke();
		}
	}
}

//棋子样式
function chessman(i,j,person){
	//画出圆弧
	context.beginPath();
	context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
	context.closePath();
	context.strokeStyle="gray";
	context.stroke();
	//用渐变填充
	var gradient=context.createRadialGradient(15+i*30-2,15+j*30+2,13,15+i*30-2,15+j*30+2,0);
	if(me)
	{
		gradient.addColorStop(0,"black");
		gradient.addColorStop(1,"white");
	}
	else 
	{
		gradient.addColorStop(0,"#bbb");
		gradient.addColorStop(1,"white");
	}
	context.fillStyle=gradient;
	context.fill();
}

//点击落子函数
chess.onclick=function(e){
	if(over)
	{
		var again=confirm("游戏已结束！是否再来一局？");
		if(again)
		{
			document.location.reload(true);
		}
		else
		{
			return ;
		}
	}
	//获取点击的位置，确定放置棋子的位置
	var x=e.offsetX,y=e.offsetY;
	var i=Math.floor(x/30),j=Math.floor(y/30);//向下取整
	if(chessBoxarr[i][j]==0)//判断是否空的，若有棋子，则不可再落
	{
		chessman(i,j,me);
		chessBoxarr[i][j]=1;//不可再在此地方下
		for(var k=0;k<count;k++)
		{
			if(winarr[i][j][k])//如果这部 落在k算法，即赢了一步
			{
				if(me){//如果这步是黑棋的
					blackwin[k]++;//mywin中的k赢了一步
					whitewin[k]=6;//you在这种赢法上不可能赢
					if(blackwin[k]==5)
					{
						alert("黑棋持方赢了，恭喜！");
						over=true;
					}
				}
				else
				{
					whitewin[k]++;//mywin中的k赢了一步
					blackwin[k]=6;//you在这种赢法上不可能赢
					if(whitewin[k]==5)
					{
						alert("白棋持方赢了，恭喜！");
						over=true;
					}
				}
			}
		}
		if(!over)//前一步下完后没结束
		{
			me=!me;//换棋子颜色，持方
		}
	}
}
