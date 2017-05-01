//制作可以工作的服务器
var http=require('http');//使用 require 指令来载入 http 模块，并将实例化的 HTTP 赋值给变量 http
http.createServer(function (request,response){//使用 http.createServer() 方法创建服务器
	//传入两个参数request，response
	//发送HTTP头部
	//HTTP状态值：200：ok
	//内容类型：text/plain
	response.writeHead(200,{'Content-Type':'text/plain'});

	//发送响应数据“Hello World”
	response.end('Hello World\n');
}).listen(8888);//用listen方法绑定8888端口

//终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');