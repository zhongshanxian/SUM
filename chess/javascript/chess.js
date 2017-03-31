var chessBox = [];//存储位置，防止重复
var me=true;//轮流下棋
var over=false;//判断棋局是否结束
//赢法数组，三位数组，保存所有赢法
var wins=[];

//赢法统计数组
var myWin=[];
var computerWin=[];

//创建15*15的数组存储棋子位置
for(var i=0; i<15; i++)
	{
		chessBox[i]=[];
		for(var j=0; j<15; j++)
			{
				chessBox[i][j]=0;//先是给每个位置都赋0，表示可以放置
			}
	}

//赢法数组 15*15棋盘
for(var i=0; i<15; i++)
	{
		wins[i]=[];
		for(var j=0; j<15; j++)
			{
				wins[i][j]=[];
			}
	}

//************************
var count=0;//赢法种类（横）
for(var i=0; i<15; i++)
	{
		for(var j=0; j<11; j++)
			{
				//wins[0][0][0] = true   第一种赢法
				//wins[0][1][0] = true
				//wins[0][2][0] = true
				//wins[0][3][0] = true
				//wins[0][4][0] = true
				for(var k=0; k<5; k++)
					{
						wins[i][j+k][count]=true;
					}
				count++;
			}
	}
for(var i=0; i<15; i++)//赢法种类（纵）
	{
		for(var j=0; j<11; j++)
			{
				for(var k=0; k<5; k++)
					{
						wins[j+k][i][count]=true;
					}
				count++;
			}
	}
for(var i=0; i<11; i++)//赢法种类（斜） 11表示还要预留四行
	{
		for(var j=0; j<11; j++)
			{
				for(var k=0; k<5; k++)
					{
						wins[i+k][j+k][count]=true;
					}
				count++;
			}
	}
for(var i=0; i<11; i++)//赢法种类（反斜） 11表示还要预留四行
	{
		for(var j=14; j>3; j--)
			{
				for(var k=0; k<5; k++)
					{
						wins[i+k][j-k][count]=true;
					}
				count++;
			}
	}
//************************
for(var i=0; i<count; i++)
	{
		myWin[i]=0;
		computerWin[i]=0;
	}

var chess = document.getElementById("chess");
var context = chess.getContext("2d");//创建对象

context.strokeStyle = "#bfbfbf";//设置线条颜色

//画水印
var logo = new Image();//定义一个img对象
logo.src= "img/panda.png";
logo.onload = function(){//若无此函数，则加载不出；加载完成后画制水印
	context.drawImage(logo, 0, 0, 450, 450);//起点，终点
	drawChessBox();//在此调用，是让水印居于棋盘下
}

//棋盘
var drawChessBox = function(){
	for(var i=0; i<15; i++)
		{
				context.moveTo(15 + i*30, 15);//横坐标每次加30，纵坐标不变
				context.lineTo(15 + i*30, 435);//终点坐标
				context.stroke();//调用划线
				context.moveTo(15, 15 + i*30);//纵坐标每次加30，横坐标不变
				context.lineTo(435, 15 + i*30);//终点坐标
				context.stroke();//调用划线
		}
}

var onestep= function (i,j,me){//me用来判断是哪方
	//画棋子
	context.beginPath();//起始
  context.arc(15 + i*30,15 + j*30,13,0,2*Math.PI);//中心，半径，起始弧度，终止弧度
	context.closePath();//结束
	var gradient = context.createRadialGradient(15 + i*30+2,15 + j*30-2,13,15 + i*30+2,15 + j*30-2,0);//中心，半径，中心，半径
	if(me)//黑棋
		{
			gradient.addColorStop(0,"#0a0a0a");//半径13的圆
		  gradient.addColorStop(1,"#636766");//半径0的圆
		}
	else//白棋
		{
			gradient.addColorStop(0,"#c1c1c1");//半径13的圆
		  gradient.addColorStop(1,"#f9f9f9");//半径0的圆
		}
	
	context.fillStyle= gradient;
	context.fill();//调用填充
}

chess.onclick= function(e)
{
	if(over)//若结束不再落子
		{
			return ;
		}
	if(!me)//计算机下棋，直接返回
		{
			return ;
		}
	var x=e.offsetX;
	var y=e.offsetY;
	var i=Math.floor(x/30);//坐标/30向下取整
	var j=Math.floor(y/30);
	if(chessBox[i][j]==0)//如果该点没有棋子，则可落棋
	{
		onestep(i,j,me);
		chessBox[i][j]=1;//黑棋先行，改变值，使其不等于0，白棋AI判断
		
		for(var k=0; k<count; k++)
			{
				if(wins[i][j][k])//此步对应黑子
					{
						myWin[k]++;
						computerWin[k] =6;//若黑子落下重要一步，白子无机会，故设置一个异常值
						if(myWin[k]==5)//满五步
							{
								window.alert("你赢了！你很棒棒哦！");
								over=true;//结束
							}
					}
			}
			if(!over)
				{
					me=!me;
					computerAI();
				}
  }
}


var computerAI = function()
{
	//初始化
	var myScore = [];
	var computerScore=[];
	var max=0;
	var u=0,v=0;
	for(var i=0; i<15; i++)
		{
			myScore[i]=[];
			computerScore[i]=[];
			for(var j=0; j<15; j++)
				{
					myScore[i][j]=0;
					computerScore[i][j]=0;
				}
		}
	for(var i=0; i<15; i++)
		{
			for(var j=0; j<15; j++)
				{
					if(chessBox[i][j]==0)
						{
							for(var k=0; k<count; k++)
								{
									if(wins[i][j][k])
										{
											if(myWin[k]==1)
												{
													myScore[i][j]+=200;
												}
											else if (myWin[k]==2) 
												{
													myScore[i][j]+=400;
												}
											else if (myWin[k]==3) 
												{
													myScore[i][j]+=2000;
												}
											else if (myWin[k]==4) 
												{
													myScore[i][j]+=10000;
												}
											//computer
											if(computerWin[k]==1)
												{
													computerScore[i][j]+=220;
												}
											else if (computerWin[k]==2) 
												{
													computerScore[i][j]+=420;
												}
											else if (computerWin[k]==3) 
												{
													computerScore[i][j]+=2100;
												}
											else if (computerWin[k]==4) 
												{
													computerScore[i][j]+=20000;
												}
										}
								}
							//my
							if(myScore[i][j]>max)
								{
									max=myScore[i][j];
									u=i;
									v=j;
								}
								else if(myScore[i][j]==max)
									{
										if(computerScore[i][j]>computerScore[u][v])
											{
												u=i;
												v=j;
											}
									}
								//computer
								if(computerScore[i][j]>max)
								{
									max=computerScore[i][j];
									u=i;
									v=j;
								}
								else if(computerScore[i][j]==max)
									{
										if(myScore[i][j]>myScore[u][v])
											{
												u=i;
												v=j;
											}
									}
						}
				}
		}
		onestep(u,v,false)//计算机下子
		chessBox[u][v]=2;//改变值
		for(var k=0; k<count; k++)
			{
				
				if(wins[u][v][k])//此步对应黑子
					{
						computerWin[k]++;
						myWin[k] =6;//若黑子落下重要一步，白子无机会，故设置一个异常值
						if(computerWin[k]==5)//满五步
							{
								window.alert("计算机赢了！其实我是一个真人。");
								over=true;//结束
						  }
				  }
			}
		if(!over)
			{
				me=!me;
			}
}
//再来一局
function reload()
{
	document.location.reload(true);
}