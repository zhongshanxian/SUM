var lis=$("#list li");
var size=128;

var box=$("#box")[0];
var height,width;
var canvas=document.createElement("canvas");
var ctx=canvas.getContext("2d");
box.appendChild(canvas);
var Dots=[];
var line;

var mv=new MusicVisualizer({
	size: size,
	visualizer: draw
});
function $(s){
	return document.querySelectorAll(s);
}

for(var i=0;i<lis.length;i++)
{
	lis[i].onclick = function(){
		for(var j=0;j<lis.length;j++)
		{
			lis[j].className = "";
		}
		this.className = "selected";
		//load("/media/"+this.title);
		mv.play("/media/"+this.title);
	}
}

function random(m,n){
	return Math.round(Math.random()*(n-m)+m);
}

function getDots(){
	Dots=[];
	for(var i=0;i<size;i++)
	{
		var x=random(0,width);
		var y=random(0,height);
		var color="rgb("+random(0,255)+","+random(0,255)+","+random(0,255)+")";
		Dots.push({
			x:x,
			y:y,
			color:color
		});
	}
}

function resize(){
	height = box.clientHeight;
	width	= box.clientWidth;
	canvas.height=height;
	canvas.width=width;
	line= ctx.createLinearGradient(0,0,0,height);
	line.addColorStop(0,"#ee4b1f");
	line.addColorStop(0.5,"#f7bc1c");
	line.addColorStop(1,"#10ae62");
	
	getDots();
}

resize();
window.onresize=resize;

function draw(arr){
	ctx.clearRect(0,0,width,height);
	var w=width/size;
	ctx.fillStyle=line;
	for(var i=0;i<size;i++)
	{
		if(draw.type=="column")
		{
			var h=arr[i] / 256;
			h=h * height;
			ctx.fillRect(w*i,height-h,w*0.6,h);
		}
		else {
			ctx.beginPath();
			var o=Dots[i];
			var r=arr[i]/256*50;
			ctx.arc(o.x,o.y,r,0,Math.PI*2,true);
			var g=ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,r);
			g.addColorStop(0,"white");
			g.addColorStop(1,o.color);
			ctx.fillStyle=g;
			ctx.fill();
		}
	}
}

draw.type="column";

var types=$("#type li");
for(var i=0;i<types.length;i++)
{
	types[i].onclick=function(){
		for(var j=0;j<types.length;j++)
		{
			types[j].className="";
		}
		this.className="selected";
		draw.type=this.getAttribute("date-type");
	}
}

$("#volume")[0].onchange = function(){
	mv.changeVolume(this.value/this.max);
}
$("#volume")[0].onchange();

