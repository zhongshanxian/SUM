/*
//阻塞代码示例，联系input.txt
//阻塞是按顺序执行
var fs=require('fs');//建立一个fs变量
var data=fs.readFileSync('input.txt');//fs的读文件方法，读出内容传给data
console.log(data.toString());//打印出来
console.log("程序执行结束！");
*/

/*
//非阻塞代码示例，联系input.txt
//非阻塞不需要按顺序，在读文件的同时执行下面的代码
var fs=require('fs');
fs.readFile('input.txt',function(err,data){
	if (err) 
	{
		return console.log(err);
	}
	console.log(data.toString());
});
console.log("程序执行结束！");
*/

/*
//事件循环示例
var events=require('events');//引入events模块
var eventEmitter= new events.EventEmitter();//创建eventEmitter对象
//创建事件处理程序
var connectHandler=function connected(){
	console.log('链接成功');
	//触发data_received事件
	eventEmitter.emit('data_received');
};
eventEmitter.on('connection',connectHandler);//绑定 connection 事件处理程序
eventEmitter.on('data_received',function(){//使用匿名函数绑定 data_received 事件
	console.log('数据链接成功');
});
//前面做准备，整理好 函数
//首先触发connection，执行connectHandler（），打印链接成功，
//接着触发data_received，显示数据链接成功
//最后显示程序执行完毕
eventEmitter.emit('connection');//触发 connection 事件 
console.log('程序执行完毕');
*/

/*
//EventEmitter 支持 若干个事件监听器
var events=require('events');
var emitter=new events.EventEmitter();
emitter.on('someEvent',function(arg1,arg2){//用于绑定事件函数
	console.log('listener1',arg1,arg2);
});
emitter.on('someEvent',function(arg1,arg2){
	console.log('listener2',arg1,arg2);
});
emitter.emit('someEvent','arg11','arg22');//用于触发一个事件，触发时要把参数写上、
*/

/*
//实例通过 connection（连接）事件演示了 EventEmitter 类的应用
var events=require('events');
var eventEmitter=new events.EventEmitter();
//监听器1
var listener1=function listener1(){
	console.log('监听器1执行');
};
//监听器2
var listener2=function listener2(){
	console.log('监听器2执行');
};
//绑定connection事件，处理函数为listener1
eventEmitter.addListener('connection',listener1);
//绑定connection事件，处理函数为listener2
eventEmitter.addListener('connection',listener2);
var eventListeners=require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners+' 个监听器监听链接事件。');
//处理connection时间
eventEmitter.emit('connection');
//移除绑定的listener1函数
eventEmitter.removeListener('connection',listener1);
console.log('listener1不再受监听。');
//再次触发链接事件
eventEmitter.emit('connection');
eventListeners=require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners+' 个监听器监听链接事件。');
console.log('程序执行完毕！');
*/
/*
//buffer缓冲区
buf=new Buffer(256);
len=buf.write("www.baidu.com");
console.log("写入字节数 ："+len);//不要len.length
*/

/*
//从缓冲区读取数据
buf=new Buffer(26);
for(var i=0;i<26;i++)
{
	buf[i]=i+97;//ascii的a
}
console.log(buf.toString('ascii'));// 输出: abcdefghijklmnopqrstuvwxyz
console.log(buf.toString('ascii',0,5));// 输出: abcde
console.log(buf.toString('utf8',0,6));// 输出: abcdef
console.log(buf.toString(undefined,0,5));// 使用 'utf8' 编码, 并输出: abcde
*/