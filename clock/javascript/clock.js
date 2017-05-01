var tan=document.getElementById("tan"),
    clockText=document.getElementById("clockText"),
		lastTime=document.getElementById("lastTime"),
    sub1=document.getElementById("sub1"),
    add1=document.getElementById("add1"),
    sub2=document.getElementById("sub2"),
    add2=document.getElementById("add2"),
    breakTime=document.getElementById("breakTime"),
    sessionTime=document.getElementById("sessionTime"),
    test=document.getElementById("test"),
    delay1,
    flag=true;


//添加1
add1.onclick=function(){
  var breakTime1=parseInt(breakTime.innerHTML);
     breakTime.innerHTML=breakTime1+1;
     lastTime.innerHTML=breakTime.innerHTML+":00";
}
//减1
sub1.onclick=function(){
  var breakTime1=parseInt(breakTime.innerHTML);
  if(breakTime1>1)
    {
      breakTime.innerHTML=breakTime1-1;
      lastTime.innerHTML=breakTime.innerHTML+":00";
    }
}

//添加2
add2.onclick=function(){
  var sessionTime1=parseInt(sessionTime.innerHTML);
  sessionTime.innerHTML=sessionTime1+1;
  lastTime.innerHTML=sessionTime.innerHTML+":00";
}
//减2
sub2.onclick=function(){
  var sessionTime1=parseInt(sessionTime.innerHTML);
  if(sessionTime1>1)
    {
      sessionTime.innerHTML=sessionTime1-1;
      lastTime.innerHTML=sessionTime.innerHTML+":00";
    }
}

//计时session
clockText.onclick=function(){
  display();
}
function display(){
  if(flag==true)
  {
    var lastTime1=parseInt(lastTime.innerHTML);//获取分钟数
    var lastTime2=lastTime.innerHTML,//获取字符串
        lastTime3=parseInt(lastTime2.substring(lastTime2.length-2,lastTime2.length));//取字符串最后两位 ，秒数
    var sum1=lastTime1*60+lastTime3;//计算每次点击后剩余秒数
    if(tan.style.height=="")
    {
      tan.style.height="0px";
    }
    else
    {
      tan.style.height=parseInt(tan.style.height)+"px";
    }
    var ave=(300-parseInt(tan.style.height))/sum1;//1s多少像素
    delay1=setInterval(function(){
        if(sum1>0)
          {
            sum1=sum1-1;
            var minutes1=parseInt(sum1/60),seconds1=parseInt(sum1%60); 
            if(seconds1<10)
              {
                lastTime.innerHTML=minutes1+":"+"0"+seconds1;
                if(minutes1==0&&seconds1==0)
                {
                  tan.style.backgroundColor="#446678";
                  var delay2=setTimeout(function(){
                    tan.style.backgroundColor="#666";
                    lastTime.innerHTML=breakTime.innerHTML;
                    display();
                  },1000);
                  
                  console.log(tan.style.backgroundColor);
                }
              }
            else
             {
                lastTime.innerHTML=minutes1+":"+seconds1;
             }
            tan.style.height=(parseInt(tan.style.height)+ave)+"px";
          }
       },1000);
    flag=false;
  }
  else
  {
    clearInterval(delay1);
    flag=true;
  }
}

//break部分
/*if(tan.style.backgroundColor=="#446678")
{
  alert("hehe");
  tan.style.backgroundColor="#666";
  lastTime.innerHTML=breakTime.innerHTML;
}*/

/*test.onclick=function(){
  clearInterval(delay1);
}*/
