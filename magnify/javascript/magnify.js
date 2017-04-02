window.onload = function(){
	var magnify = document.getElementById('magnify');
	var smallBox = document.getElementById('smallBox');
	var floatBox = document.getElementById('floatBox');
	var bigBox = document.getElementById('bigBox');
	var bigImg = bigBox.getElementsByTagName('img')[0];
	var mark = document.getElementById('mark');
	
	mark.onmouseover = function(){//鼠标放上去，显示floatbox和右边图片

		

		floatBox.style.display = "block";
		bigBox.style.display = "block";
	};

	mark.onmouseout = function(){//鼠标移开则隐藏



		floatBox.style.display = "none";
		bigBox.style.display = "none";
	};

	mark.onmousemove = function(e){
		//var event1 = e;//获取当前位置

		//调试兼容问题
		//大部分用户使用ie浏览器
		//上面获取e的方法不适用于ie
		var event1 = e||window.event;
		var left = event1.clientX - magnify.offsetLeft - mark.offsetLeft - floatBox.offsetWidth/2;//获取floatbox左边到小图片左边的距离
		var top = event1.clientY - magnify.offsetTop - mark.offsetTop - floatBox.offsetHeight/2;//获取floatbox上边到小图片上边的距离

		if (left<0) {//如果距离小于0，赋值为0
			left=0;
		}
		else if (left>mark.offsetWidth - floatBox.offsetWidth) {//如果floatbox右边到小图片右边的距离小于0，赋值为最大距离
			left=mark.offsetWidth - floatBox.offsetWidth;
		}

		if (top<0) {
			top=0;
		}
		else if (top>mark.offsetHeight - floatBox.offsetHeight) {
			top=mark.offsetHeight - floatBox.offsetHeight;
		}

		floatBox.style.left = left+"px";//设置floatbox的左边距离就是left
		floatBox.style.top = top+"px";//上边距离就是top

		var percentx = left/(mark.offsetWidth - floatBox.offsetWidth);//获取百分比，左边的距离/（左右两边剩余的空白距离）
		var percenty = top/(mark.offsetHeight - floatBox.offsetHeight);

		bigImg.style.left = -percentx*(bigImg.offsetWidth-bigBox.offsetWidth)+"px";//负号表示反方向移动，移动距离=百分比*（大图片与显示框的空白差）
		bigImg.style.top = -percenty*(bigImg.offsetHeight-bigBox.offsetHeight)+"px";
	};
};