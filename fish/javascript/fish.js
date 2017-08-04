var canvas1,canvas2,context1,context2;
var bgPic=new Image();
var canWidth,canHeight;
var ane;

window.onload=game;

function game(){
	//先进行初始化
	init();
	gameloop();
}

function init(){
	//获得canvas context
	canvas1=document.getElementById("canvas1");//画布，鱼，浮游，UI，圆圈
	context1=canvas1.getContext("2d");//内容
	canvas2=document.getElementById("canvas2");//背景，海葵，果实
	context2=canvas2.getContext("2d");

	canWidth=canvas1.width;
	canHeight=canvas1.height;

	bgPic.src="style/img/background.jpg";
}

function gameloop(){
	window.requestAnimFrame(gameloop);//setInterval,setTimeout,frame per second
	
	drawBackground();//调用显示背景函数
}