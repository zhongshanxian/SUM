//自调用
(function(win,doc,$){
	function CusScrollBar(options){
		this._init(options);//this指向实例
	}
	$.extend(CusScrollBar.prototype,{
		_init:function(options){
			var self = this;
			self.options = {
				scrollDir     :"y",//滚动的方向
				contSelector  :"",//滚动内容区选择器
				barSelector   :"",//滚动条选择器
				sliderSelector:""//滚动滑块选择器
			}
			$.extend(true,self.options,options||{});
			console.log(self.options.contSelector);
		}
	});
	win.CusScrollBar = 	CusScrollBar;
})(window,document,a);

new CusScrollBar({
	contSelector:".scroll-wrap",
	barSelector:".scroll-bar",
	sliderSelector:".scroll-silder"
});