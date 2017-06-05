/*
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
*/


//路由
var http=require('http');
var url=require('url');
function start(route){
	function onRequest(request,response){
		var pathname=url.parse(request.url).pathname;
		console.log('Request for'+pathname+'received.');

		route(pathname);

		response.writeHead(200,{'Content-Type':'text/plain'});
		response.write('Hello World');
		response.end();
	}
	http.createServer(onRequest).listen(8888);
	console.log('Server has started.');
}
exports.start=start;


/*
//使用 Node 创建 Web 服务器
//演示一个最基本的 HTTP 服务器架构(使用8081端口)
var http=require('http');//http 模块主要用于搭建 HTTP 服务端和客户端
var fs=require('fs');
var url=require('url');
//创建服务器
http.createServer(function(request,response){
	//解析请求，包括文件名
	var pathname=url.parse(request.url).pathname;
	//输出请求的文件名
	console.log('Request for '+pathname+' received.');
	//从文件系统中读取请求的文件内容
	fs.readFile(pathname.substr(1),function(err,data){
		if(err)
		{
			console.log(err);
			//HTTP状态码：404：NOT FOUND
			//Conent Type:text/plain
			response.writeHead(404,{'Content-Type':'text/html'});
		}
		else
		{
			//HTTP状态码：200：OK
			//Content Type:text/plain
			response.writeHead(200,{'Content-Type':'text/html'});
		  //响应文件内容
		  response.write(data.toString());
		}
		//发送响应数据
		response.end();
	});
}).listen(8081);

//控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8081/')
*/

/*
var http = require('http');
var fs = require('fs');
var url = require('url');


// 创建服务器
http.createServer( function (request, response) {  
   // 解析请求，包括文件名
   var pathname = url.parse(request.url).pathname;
   
   // 输出请求的文件名
   console.log("Request for " + pathname + " received.");
   
   // 从文件系统中读取请求的文件内容
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP 状态码: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{	         
         // HTTP 状态码: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});	
         
         // 响应文件内容
         response.write(data.toString());		
      }
      //  发送响应数据
      response.end();
   });   
}).listen(8081);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8081/');
*/












