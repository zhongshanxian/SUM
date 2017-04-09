var tan=document.getElementById("tan"),
    clockText=document.getElementById("clockText"),
		   lastTime=document.getElementById("lastTime"),
		   sub1=document.getElementById("sub1"),
		   add1=document.getElementById("add1"),
		   sub2=document.getElementById("sub2"),
		   add2=document.getElementById("add2"),
		   breakTime=document.getElementById("breakTime"),
		   sessionTime=document.getElementById("sessionTime"),
		   test=document.getElementById("test");

add1.onclick=function(){
  var breakTime1=parseInt(breakTime.innerHTML);
     breakTime.innerHTML=breakTime1+1;
     lastTime.innerHTML=breakTime.innerHTML+":00";
}
sub1.onclick=function(){
  var breakTime1=parseInt(breakTime.innerHTML);
  if(breakTime1>1)
    {
      breakTime.innerHTML=breakTime1-1;
      lastTime.innerHTML=breakTime.innerHTML+":00";
    }
}

add2.onclick=function(){
  var sessionTime1=parseInt(sessionTime.innerHTML);
  sessionTime.innerHTML=sessionTime1+1;
  lastTime.innerHTML=sessionTime.innerHTML+":00";
}
sub2.onclick=function(){
  var sessionTime1=parseInt(sessionTime.innerHTML);
  if(sessionTime1>1)
    {
      sessionTime.innerHTML=sessionTime1-1;
      lastTime.innerHTML=sessionTime.innerHTML+":00";
    }
}
// 显示球内部高度函数
/* test.onclick=function(){
   var sum=parseInt(sessionTime.innerHTML)*60,
       lastTime1=parseInt(lastTime.innerHTML),
      ave=300/sum;//一像素代表多少秒
      tan.style.height=lastTime1*60*ave+"px"; 
  alert(lastTime1);
} */
//计时
test.onclick=function(){
  var lastTime1=parseInt(lastTime.innerHTML);
  var sum1=lastTime1*60;
  var delay1=setInterval(function(){
    if(sum1>0)
      {
        sum1=sum1-1;
        lastTime.innerHTML=sum1;
      }
  },1000);
  
}