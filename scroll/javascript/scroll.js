//自调用
(function(win,doc,$){
	function CusScrollBar(options){
		this._init(options);//this指向实例
	}
	$.extend(CusScrollBar.prototype,{//在CusScrollBar.prototype里面添加一个_init的方法
		//第一个方法
		_init:function(options){
			var self = this;
			self.options = {
				scrollDir     :"y",//滚动的方向
				contSelector  :"",//滚动内容区选择器
				barSelector   :"",//滚动条选择器
				sliderSelector:"",//滚动滑块选择器
				tabItemSelector:".tab-item",//标签选择器
				tabActiveClass:"tab-active",//选中标签类名
				anchorSelector:".anchor",//锚点选择器
				correctSelector:".correct-bot",//校正元素
				articleSelector:".scroll-ol",//文章 选择器
				wheelStep     :10//滚轮步长
			};
			$.extend(true,self.options,options||{});
			self._initDomEvent();//调用函数

			return self;
		},//第一个方法结束
		//第二个方法
		_initDomEvent:function(){
			var opts=this.options;
			//滚动内容区对象，必填
			this.$cont=$(opts.contSelector);
			//滚动条滑块对象
			this.$slider=$(opts.sliderSelector);
			//滚动条对象
			this.$bar=opts.barSelector? $(opts.barSelector) : self.$slider.parent();
			//获取文档对象
			this.$doc=$(doc);
			//标签项
			this.$tabItem=$(opts.tabItemSelector);
			//锚点项
			this.$anchor=$(opts.anchorSelector);
			//校正
			this.$correct=$(opts.correctSelector);
			//正文
			this.$article=$(opts.articleSelector);
			//调用拖拽事件
			this._initSliderDragEvent();
			this._bindContScroll();
			this._bindMousewheel();
			this._initTabEvent();
			this._initArticleHeight();

		},//第二个方法结束
		//第三个方法
		_initSliderDragEvent:function(){
			var self=this;
			var slider=this.$slider;
			var sliderEl=slider[0];//获取第一个slider元素
			
			if(sliderEl)//div.scroll-slider
			{
				var doc=this.$doc,
				dragStartPagePosition,
				dragStartScrollPosition,
				dragContBarRate;

				function mousemoveHandler(e){
					//var self=this;
					e.preventDefault();
					console.log("mousemove");
					if(dragStartPagePosition==null)//没有按下鼠标
					{
						return ;
					}
					self.scrollTo(dragStartScrollPosition+(e.pageY-dragStartPagePosition)*dragContBarRate);
					
				}
				slider.on("mousedown",function(e){

					e.preventDefault();//阻止默认事件
					console.log("mousedown");
					dragStartPagePosition=e.pageY;//鼠标相对于文档顶部的距离
					//dragStartScrollPosition=self.$cont[0].scrollTop;//“元素中的内容”超出“元素上边界”的那部分高度
					dragStartScrollPosition=self.$cont[0].scrollTop;

					dragContBarRate=self.
					  getMaxScrollPosition()/self.
					  getMaxSliderPosition();
					  
					doc.on("mousemove.scroll",mousemoveHandler).on("mouseup.scroll",function(e){//执行完mousemove之后，doc接着执行mouseup
						console.log("mouseup");
						doc.off(".scroll");//接触绑定
					});
				});
			}
			return self;
		},//第三个方法结束
		//初始化文档高度
		_initArticleHeight:function(){
			var self=this,
			lastArticle=self.$article.last();
			var lastArticleHeight=lastArticle.height(),
			contHeight=self.$cont.height();

			if(lastArticleHeight<contHeight)
			{
				self.$correct[0].style.height=contHeight-lastArticleHeight-self.$anchor.outerHeight()+"px";
			}
			return self;
		},
		//初始化标签
		_initTabEvent:function(){
			var self=this;
			self.$tabItem.on("click",function(e){
				e.preventDefault();
				var index=$(this).index();
				self.changeTabSelector(index);
				//已经滚出可视区内容高度
				//+指定锚点与内容容器的距离
				self.scrollTo(self.$cont[0].scrollTop+self.getAnchorPosition(index));
			});
			return self;
		},
		//切换标签的选中
		changeTabSelector:function(index){
			var self=this,
			active=self.options.tabActiveClass;
			return self.$tabItem.eq(index).addClass(active).siblings().removeClass(active);
		},
		//获取指定 锚点到上边界的像素数
		getAnchorPosition:function(index){
			return this.$anchor.eq(index).position().top;
		},
		//获取每个锚点位置信息的数组
		getAllAnchorPosition:function(){
			var self=this,
			allPositionArr=[];
			for(var i=0;i<self.$anchor.length;i++)
			{
				allPositionArr.push(self.$cont[0].scrollTop+
					self.getAnchorPosition(i));
			}
			return allPositionArr;
		},
		//第七个方法：监听内容的滚动，同步滑块的滚动
		_bindContScroll:function(){
			var self=this;
			self.$cont.on("scroll",function(){
				var sliderEl=self.$slider&&self.$slider[0];
				if(sliderEl)
				{
					//console.log("000");
					var i=0;
					sliderEl.style.top=self.getSliderPosition()+"px";
					
					//console.log(sliderEl.style.top);
					//console.log(sliderEl);
					//sliderEl.style.top="110px";
				}
			});
			return self;
		},//第七个方法结束
		//滚轮事件
		_bindMousewheel:function(){
			var self=this;

			self.$cont.on("mousewheel DOMMouseScroll",function(e){
				e.preventDefault();
				var oEv=e.originalEvent,
				wheelRange=oEv.wheelDelta ? -oEv.wheelDelta/120:(oEv.detail||0)/3;
				self.scrollTo(self.$cont[0].scrollTop+wheelRange*self.options.wheelStep);
			});
			return self;
		},
		//第八个方法：计算滑块位置
		getSliderPosition:function(){
			var self=this,
			maxSliderPosition=self.getMaxSliderPosition();
			console.log(self.$cont.scrollTop());
			//限制不能触发高于bar长度的地方
			return Math.min(maxSliderPosition,maxSliderPosition*self.$cont.scrollTop()/self.getMaxScrollPosition());//内容可滚动的高度
			//console.log("getSliderPosition");//滑块可移动距离//当前内容已经滚动的高度
		},
		//第四个方法：内容可滚动高度
		getMaxScrollPosition:function(){
			var self=this;
			//console.log(self.$cont.height());
			return Math.max(self.$cont.height(),self.$cont[0].scrollHeight)-self.$cont.height();//选出可视区高度与内容高度中的最大值，减去可视区的高度
		 
		},//第四个方法结束
		//第五个方法：滑块可移动的距离
		getMaxSliderPosition:function(){
			var self=this;
			return self.$bar.height()-self.$slider.height();
		},//第五个方法结束
		//第六个方法
		scrollTo:function(positionVal){
			var self=this;
			var posArr=self.getAllAnchorPosition();
			//滚动条的位置与tab标签对应
			function getIndex(positionVal){
				for(var i=posArr.length-1;i>=0;i--)
				{
					if(positionVal>=posArr[i])
					{
						return i;
					}
					else
					{
						continue;
					}
				};
			}
			//锚点数与标签数相同
			if(posArr.length==self.$tabItem.length)
			{
				self.changeTabSelector(getIndex(positionVal));
			}
			self.$cont.scrollTop(positionVal);//可视区的 上边沿离内容上边沿的高度
			
		}//第六个方法结束
		
	});	
	//CusScrollBar.prototype._init=function(){
	//	console.log("test");
	//}
	win.CusScrollBar = 	CusScrollBar;//win形参对应window实参
})(window,document,jQuery);//传入三个实参

var scroll=new CusScrollBar({
	contSelector   :".scroll-cont",
	barSelector    :".scroll-bar",
	sliderSelector :".scroll-slider"
});

