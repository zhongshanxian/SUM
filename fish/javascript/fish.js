var canvas1,canvas2,context1,context2;
var bgPic=new Image();
var canWidth,canHeight;
var ane;
var fruit;
var deltaTime=0,lastTime;

var mom;
var momTail=[],momEye=[],momBodyOra=[],momBodyBlue=[];

var mx,my;

var baby;
var babyTail=[],babyEye=[],babyBody=[];

var data;
var wave;

var dust;
var dustPic=[];
window.onload=game;

function game(){
	//先进行初始化
	lastTime=Date.now();
	init();
	gameloop();
}

function init(){
	//获得canvas context
	canvas1=document.getElementById("canvas1");//画布，鱼，浮游，UI，圆圈
	context1=canvas1.getContext("2d");//内容
	canvas2=document.getElementById("canvas2");//背景，海葵，果实
	context2=canvas2.getContext("2d");

	canvas1.addEventListener('mousemove',onMouseMove,false);

	canWidth=canvas1.width;
	canHeight=canvas1.height;

	bgPic.src="style/img/background.jpg";

	ane=new aneObj();
	ane.init();

	fruit= new fruitObj();
	fruit.init();

	mom=new momObj();
	mom.init();

	mx=canWidth*0.5;
	my=canHeight*0.5;

	baby=new babyObj();
	baby.init();

	for(var i=0;i<8;i++)
	{
		babyTail[i]=new Image();
		babyTail[i].src="style/img/babyTail"+i+".png";
		momTail[i]=new Image();
		momTail[i].src="style/img/bigTail"+i+".png";
		momBodyOra[i]=new Image();
		momBodyOra[i].src="style/img/bigSwim"+i+".png";
		momBodyBlue[i]=new Image();
		momBodyBlue[i].src="style/img/bigSwimBlue"+i+".png";
	}
	for(var i=0;i<2;i++)
	{
		babyEye[i]=new Image();
		babyEye[i].src="style/img/bigEye"+i+".png";
		momEye[i]=new Image();
		momEye[i].src="style/img/bigEye"+i+".png";
	}
	for(var i=0;i<20;i++)
	{
		babyBody[i]=new Image();
		babyBody[i].src="style/img/babyFade"+i+".png";
	}
	for(var i=0;i<7;i++)
	{
		dustPic[i]=new Image();
		dustPic[i].src="style/img/dust"+i+".png";
	}
	data=new dataObj();
	data.init();

	wave=new waveObj();
	wave.init();

	dust=new dustObj();
	dust.init();
}

function gameloop(){
	window.requestAnimFrame(gameloop);//setInterval,setTimeout,frame per second
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	if(deltaTime>30)
	{
		deltaTime=30;
	}

	drawBackground();//调用显示背景函数
	//海葵和背景一起绘制
	ane.draw();

	fruitMonitor();
	fruit.draw();

	context1.clearRect(0,0,canWidth,canHeight);//清除前一帧的东西
	mom.draw();
	baby.draw();

	momFruitCollision();
	momBabyCollision();

	data.draw();

	wave.draw();

	dust.draw();

}
function onMouseMove(e){
	if(!data.gameOver)
	{
		if(e.offSetX||e.layerX)
		{
			mx=e.offSetX==undefined?e.layerX:e.offSetX;
			my=e.offSetY==undefined?e.layerY:e.offSetY;
		}
	}
}