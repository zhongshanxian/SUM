//var server=require('./server');
//var router=require('./router');
//server.start(router.route);
var server = require("./server");
var router = require("./router");

server.start(router.route);