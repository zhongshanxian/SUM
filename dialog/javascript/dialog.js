//自调用 函数
(function($){
	var Dialog=function(config){
		var _this_=this;
		//默认参数配置
		this.config={
									//对话框的宽高
									width:"auto",
									height:"auto",
									//对话框的提示内容
									message:null,
									//对话框类型
									type:"waiting",
									//按钮配置
									buttons:null,
									//弹出框延时多久关闭
									delay:null,
									//对话框遮罩层透明度
									maskOpacity:null,
									//是否启动动画
									effect:null,
									//延时+回调
									delayCallback:null,
									//点击遮罩层关闭
									maskClose:null
								};
					//默认参数扩展
					if(config&&$.isPlainObject(config)){
							$.extend(this.config,config);//扩展参数
					}
					else
					{
						this.isConfig=true;//若没有传进参数，则让其为true
					}

				//创建基本的DOM
				this.body=$('body');
				//创建遮罩层
				this.mask=$('<div class="dialog-container">');
				//创建弹出框
				this.win=$('<div class="dialog-window">');
				//创建弹出框头部
				this.winHeader=$('<div class="dialog-header">');
				//创建弹出框内容
				this.winContent=$('<div class="dialog-content">');
				//创建弹出框脚部
				this.winFooter=$('<div class="dialog-footer">');

				//渲染DOM
				this.creat();
	};
	//记录弹框层级
	Dialog.zIndex=1000;

	Dialog.prototype={
		//动画效果
		animate:function(){
			var _this_=this;
			this.win.css("-webkit-transform","scale(0,0)");
      window.setTimeout(function(){
      	_this_.win.css("-webkit-transform","scale(1,1)");
      },100);
			
		},
		//创建弹出框
		creat:function(){
			var _this_=this,
			config=this.config,
			mask=this.mask,
			win=this.win,
			header=this.winHeader,
			content=this.winContent;
			footer=this.winFooter,
			body=this.body;



			//增加弹框层级
			Dialog.zIndex++;
			this.mask.css("zIndex","Dialog.zIndex");

			//如果没有传递配置参数，弹出一个等待图表
			if(this.isConfig)//判断
			{
				win.append(header.addClass("waiting"));//win后面插入header
				if(config.effect)
				{
					this.animate();
				}
				//插入到页面
				mask.append(win);
				body.append(mask);
			}
			else
			{
				//根据配置参数，弹出
				header.addClass(config.type);//icon
				win.append(header);
				//如果有信息文本
				if(config.message)
				{
					win.append(content.html(config.message));
				}

				//插入到页面
				mask.append(win);
				body.append(mask);

				//按钮组
				if(config.buttons)
				{
					this.creatButtons(footer,config.buttons);
					win.append(footer);
				}
				//设置宽高
				if (config.width!="auto"){
					win.width(config.width);
				}
				//设置高度
				if (config.height!="auto"){
					win.height(config.height);
				}
				//设置透明度
				if (config.maskOpacity){
					mask.css("backgroundColor","rgba(0,0,0,"+config.maskOpacity+")");
				}
				//设置延时
				if(config.delay&&config.delay!=0)
				{
					window.setTimeout(function(){
						_this_.close();
						//执行延时回调
						config.delayCallback();
					},config.delay);
				}
				if(config.effect)
				{
					this.animate();
				}
				//制定遮罩层关闭
				if(config.maskClose)
				{
					/*mask.tap(function(){
						_this_.close();
					});*/

					mask.click(function(){
						_this_.close();
					});
				}
			}
		},
		close:function(){//关闭属性
			this.mask.remove();
		},
		creatButtons:function(footer,buttons){
			var _this_=this;

			$(buttons).each(function(){
				//获取按钮样式
				var type=this.type?" class='"+this.type+"'":"";
				var btnText=this.text?this.text:"按钮";
				var callback=this.callback?this.callback:null;
				//var callback=this.callback;
				var button=$('<button'+type+'>'+btnText+'</button>');
				if(callback)
				{
					/*button.tap(function(e){
						var isClose=callback();
						//阻止事件冒泡，针对点击遮罩层可以关闭
						e.stopPropagation();
						if(isClose!=false)
						{
							_this_.close();
						}
						//callback=false;//若设置这个有回调函数的只能执行一次
					});*/

					//在移动端可能出现点击关闭弹出后，继续触发下面的链接，改成click
					button.click(function(e){
						var isClose=callback();
						//阻止事件冒泡，针对点击遮罩层可以关闭
						e.stopPropagation();
						if(isClose!=false)
						{
							_this_.close();
						}
						//callback=false;//若设置这个有回调函数的只能执行一次
					});
				}
				else
				{
					/*button.tap(function(e){
						//阻止事件冒泡，针对点击遮罩层可以关闭
						e.stopPropagation();
						_this_.close();
					});*/

					button.click(function(e){
						//阻止事件冒泡，针对点击遮罩层可以关闭
						e.stopPropagation();
						_this_.close();
					});
				}

				footer.append(button);
			});
		}
	};

	window.Dialog=Dialog;//通过window使外围可以访问Dialog
	$.dialog=function(config){
		return new Dialog(config);
	};
})(Zepto);