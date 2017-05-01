//左边栏长，右边栏短
//当滚动到右边栏结束时，右边栏停止滚动，定在最后的页面，左边栏继续滚动
//jQuery写法
var jWin=$(window);
jWin.scroll(function(){//给window绑定一个scroll事件
	var scrollheight=jWin.scrollTop();//获取滚动了多少
	var screenheight=jWin.height();//获取显示的高度
	var sideheight=$('#rightslider').height();//获取右边栏的高度
	if(sideheight<scrollheight+screenheight)//如果已滚动高度+屏幕显示高度》右边栏总高度
	{
		$('#rightslider').css({
			'position':'fixed',
			'top':-(sideheight-screenheight),//若直接设置为0，显示的是右边栏之后的空白，这里是留一个显示屏的高度
			'right':0
		});
	}
	else
	{
		$('#rightslider').css({
			'position':'static'//默认设置
		});
  }
  window.onload=function(){
  	jWin.trigger('scroll');//当加载王超出发scroll
  };
  window.resize(function(){//当显示屏大小改变后出发scroll
  	jWin.trigger('scroll');
  });