var canvas,context;
var canWidth,canHeight;
var pic=new Image();
var starPic=new Image();
var starNum=60;
var stars=[];
var deltaTime=0,lastTime;
var mouseswitch=false;
var life=0;

function init(){
	canvas=document.getElementById("canvas");
	context=canvas.getContext("2d");
	canWidth=canvas.width;
	canHeight=canvas.height;

	document.addEventListener("mousemove",mouseMove,false);

	pic.src="style/img/pic.jpg";
	starPic.src="style/img/star.png";

	for(var i=0;i<starNum;i++)
	{
		var obj=new starObj();
		obj.init();
		stars.push(obj);
	}
	lastTime=Date.now();
	gameloop();


}

document.body.onload=init();

function gameloop(){
	window.requestAnimFrame(gameloop);
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	drawBackground();
	drawPic();
	drawStars();
}

function drawBackground(){
	context.fillStyle="#393550";
	context.fillRect(0,0,canWidth,canHeight);
}
function drawPic(){
	context.drawImage(pic,0,0,canWidth,canHeight);
}

function mouseMove(e){
	if(e.offSetX||e.layerX)
	{
		var mx=e.offSetX==undefined?e.layerX:e.offSetX;
		var my=e.offSetY==undefined?e.layerY:e.offSetY;
		if(mx>0&&mx<800&&my>0&&my<550)
		{
			mouseswitch=true;
		}
		else
		{
			mouseswitch=false;
		}
		aliveUpdate();
	}
}