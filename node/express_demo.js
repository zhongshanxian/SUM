/*
//express_demo.js文件
var express=require('express');
var app=express();
app.get('/',function(req,res){
	res.send('Hello World');
})
var server=app.listen(8081,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log("应用实例，访问地址为http://%s:%s",host,port);
});
*/

/*
//Express 应用使用回调函数的参数： 
//request 和 response 对象来处理请求和响应的数据。
//路由决定了由谁(指定脚本)去响应客户端请求。
var express=require('express');
var app=express();
//主页输出hello world
app.get('/',function(req,res){
	console.log("主页GET请求");
	res.send('hello GET');
});
//post请求
app.post('/',function(req,res){
	console.log("主页POST请求");
	res.send('hello POST');
});
//  /del_user页面响应
app.get('/del_user',function(req,res){
	console.log('/del_user响应DELETE请求');
	res.send('删除页面');
});
//  /list_user页面GET请求
app.get('/list_user',function(req,res){
	console.log('/list_user GET请求');
	res.send('用户列表页面');
});
//对页面abcd，abxcd，ab123cd，等响应GET请求
app.get('/ab*cd',function(req,res){
	console.log('/ab*cd GET请求');
	res.send("正则匹配");
});
var server=app.listen(8081,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log("应用实例，访问地址为http://%s:%s", host, port);
});
*/

/*
//Express 提供了内置的中间件 express.static 
//来设置静态文件如：图片， CSS, JavaScript 等。
var express=require('express');
var app=express();
app.use(express.static('public'));
app.get('/',function(req,res){
	res.send('hello world');
});
var server=app.listen(8081,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log("应用实例，访问地址为http://%s:%s", host, port);
});
*/

/*
//实例演示了在表单中通过 GET 方法提交两个参数，
//我们可以使用 server.js 文件内的 process_get 路由器来处理输入
var express=require('express');
var app=express();
app.use(express.static('public'));
app.get('/index.html',function(req,res){
	res.sendFile(__dirname+"/"+"index.html");
});
app.get('/process_get',function(req,res){
	//输出JSON格式
	response={
		firstname:req.query.firstname,
		lastname:req.query.lastname
	};
	console.log(response);
	res.end(JSON.stringify(response));
});
var server=app.listen(8081,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log("应用实例，访问地址为http://%s:%s", host, port);
});
*/

/*
//实例演示了在表单中通过 POST 方法提交两个参数，
//我们可以使用 server.js 文件内的 process_post 路由器来处理输入
var express=require('express');
var app=express();
var bodyParser=require('body-parser');
//创建application/x-www-form-urlencoded编码解析
var urlencodedParser=bodyParser.urlencoded({extended:false});
app.use(express.static('public'));
app.get('/index.html',function(req,res){
	res.sendFile(__dirname+'/'+'index.html');
});
app.post('/process_post',urlencodedParser,function(req,res){
	//输出JSON格式
	response={
		firstname:req.body.firstname,
		lastname:req.body.lastname
	};
	console.log(response);
	res.end(JSON.stringify(response));
});
var server=app.listen(8081,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
*/

/*
//创建一个用于上传文件的表单，使用 POST 方法，表单 enctype 属性设置为 multipart/form-data
var express=require('express');
var  app=express();
var fs=require('fs');
var bodyParser=require('body-parser');
var multer=require('multer');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({dest:'/tmp/'}).array('image'));
app.get('/index.html',function(req,res){
	res.sendFile(__dirname+'/'+'index.html');
});
app.post('/file_upload',function(req,res){
	console.log(req.files[0]);//上传的文件信息
	var des_file=__dirname+'/'+req.files[0].originalname;
	fs.readFile(req.files[0].path,function(err,data){
		fs.writeFile(des_file,data,function(err){
			if(err)
			{
				console.log(err);
			}
			else
			{
				response={
					message:'File uploaded successfully',
					filename:req.files[0].originalname
				};
			}
			console.log(response);
			res.end(JSON.stringify(response));
		});
	});
});
var server=app.listen(8081,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log('应用实例，访问地址为http://%s:%s',host,port);
});
*/

//可以使用中间件向 Node.js 服务器发送 cookie 信息，
//以下代码输出了客户端发送的 cookie 信息
var express=require('express');
var  cookieParser=require('cookie-parser');
var app=express();
app.use(cookieParser());
app.get('/',function(req,res){
		console.log('Cookies: ',req.cookies);
});
app.listen(8081);























