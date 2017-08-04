/*
参考的网站
http://www.16sucai.com/2011/03/5217.html
*/
var marqueeArr1=['<a href=#>平台版-多用户入住，支持自定义@域名@版权</a><br>',
                '<a herf=#>建立小商业生态-打造小京东平台</a><br>'],
    marqueeArr2=['<a href=#>专业版-全员分销营销推广高手强烈推荐</a><br>',
                '<a herf=#>零成本打造庞大的业务推广团队-迅速拓展销售网络</a><br>'],
    marqueeArr3=['<a href=#>基础版-五脏六腑俱全，满足大部分基础需求</a><br>',
                '<a herf=#>关注版本案例，可看完整效果</a><br>'];
var marqueeInterval1=[],marqueeInterval2=[],marqueeInterval3=[];
var marqueeNum1=0,marqueeNum2=0,marqueeNum3=0;

function initMarquee(arr,marqueeNum,marqueeBoxId,marqueeInterval){
    var str=arr[0];
    document.write("<div id="+marqueeBoxId+" class='marqueeBox'><div>"+str+"</div></div>");
    var marqueeBoxId=document.getElementById(marqueeBoxId);
    marqueeNum++;
    marqueeInterval[0]=setInterval(function(){
        var str=arr[marqueeNum];
        marqueeNum++;
        if(marqueeNum>=arr.length)
        {
            marqueeNum=0;
        }
        if(marqueeBoxId.childNodes.length==1)
        {
            var nextLine=document.createElement("div");
            nextLine.innerHTML=str;
            marqueeBoxId.appendChild(nextLine);
        }
        else
        {
            marqueeBoxId.childNodes[0].innerHTML=str;
            marqueeBoxId.appendChild(marqueeBoxId.childNodes[0]);
            marqueeBoxId.srcollTop=0;
        }
        clearInterval(marqueeInterval[1]);
        marqueeInterval[1]=setInterval(function(){
            marqueeBoxId.scrollTop++;
            if(marqueeBoxId.scrollTop==30){
                clearInterval(marqueeInterval[1]);
            }
        },25);
    },2000);
}

initMarquee(marqueeArr1,marqueeNum1,'marqueeBox1',marqueeInterval1);
initMarquee(marqueeArr2,marqueeNum2,'marqueeBox2',marqueeInterval2);
initMarquee(marqueeArr3,marqueeNum3,'marqueeBox3',marqueeInterval3);


/*
function initMarquee(){
    var str=marqueeArr1[0];
    document.write("<div id='marqueeBox'><div id='str'>"+str+"</div></div></div>");
    marqueeNum++;
    marqueeInterval[0]=setInterval("startMarquee()",2000);
}
function startMarquee(){
    var str=marqueeArr1[marqueeNum];
    marqueeNum++;
    if(marqueeNum>=marqueeArr1.length)
    {
        marqueeNum=0;
    }
    if(marqueeBox.childNodes.length==1)
    {
        var nextLine=document.createElement("div");
        nextLine.innerHTML=str;
        marqueeBox.appendChild(nextLine);
    }
    else
    {
        marqueeBox.childNodes[0].innerHTML=str;
        marqueeBox.appendChild(marqueeBox.childNodes[0]);
        marqueeBox.srcollTop=0;
    }
    clearInterval(marqueeInterval[1]);
    marqueeInterval[1]=setInterval("scrollMarquee()",25);
}

function scrollMarquee(){
    marqueeBox.scrollTop++;
    if(marqueeBox.scrollTop==30){
        clearInterval(marqueeInterval[1]);
    }
}
initMarquee();
*/