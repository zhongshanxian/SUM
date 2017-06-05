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

/*
//将 Buffer 转换为 JSON 对象
var buf=new Buffer('www.runoob.com');
var json=buf.toJSON(buf);
console.log(json);
*/

/*
//缓冲区合并
var buffer1=new Buffer('菜鸟教程 ');
var buffer2=new Buffer('www.runoob.com');
var buffer3=Buffer.concat([buffer1,buffer2]);
console.log('buffer3的内容：'+buffer3.toString());
*/

/*
//缓冲区比较
var buffer1=new Buffer('ABC');
var buffer2=new Buffer('ABCD');
var result=buffer1.compare(buffer2);
if(result<0)
{
	console.log(buffer1+"在"+buffer2+"之前");
}
else if(result==0)
{
	console.log(buffer1+"与"+buffer2+"相同");
}
else
{
	console.log(buffer1+"在"+buffer2+"之后");
}
*/

/*
//拷贝缓冲区
var buffer1=new Buffer('ABCD');
var buffer2=new Buffer(3);
buffer1.copy(buffer2);
console.log('buffer2 content:'+buffer2.toString());
*/

/*
//缓冲区剪裁
var buffer1=new Buffer('runoob');
var buffer2=buffer1.slice(0,2);
console.log('buffer2 content:'+buffer2.toString());
*/

/*
//缓冲区长度
var buffer=new Buffer('www.runoob.com');
console.log('buffer length:'+buffer.length);
//length 是 buffer 对象所分配的内存数，它不会随着这个 buffer 对象内容的改变而改变
*/

/*
序号	方法 & 描述
1	new Buffer(size) 
分配一个新的 size 大小单位为8位字节的 buffer。 注意, size 必须小于 kMaxLength，否则，将会抛出异常 RangeError。
2	new Buffer(buffer) 
拷贝参数 buffer 的数据到 Buffer 实例。
3	new Buffer(str[, encoding])
分配一个新的 buffer ，其中包含着传入的 str 字符串。 encoding 编码方式默认为 'utf8'。
4	buf.length
返回这个 buffer 的 bytes 数。注意这未必是 buffer 里面内容的大小。length 是 buffer 对象所分配的内存数，它不会随着这个 buffer 对象内容的改变而改变。
5	buf.write(string[, offset[, length]][, encoding])
根据参数 offset 偏移量和指定的 encoding 编码方式，将参数 string 数据写入buffer。 offset 偏移量默认值是 0, encoding 编码方式默认是 utf8。 length 长度是将要写入的字符串的 bytes 大小。 返回 number 类型，表示写入了多少 8 位字节流。如果 buffer 没有足够的空间来放整个 string，它将只会只写入部分字符串。 length 默认是 buffer.length - offset。 这个方法不会出现写入部分字符。
6	buf.writeUIntLE(value, offset, byteLength[, noAssert])
将 value 写入到 buffer 里， 它由 offset 和 byteLength 决定，最高支持 48 位无符号整数，小端对齐，例如：
var b = new Buffer(6);
b.writeUIntBE(0x1234567890ab, 0, 6);
// <Buffer 12 34 56 78 90 ab> noAssert 值为 true 时，不再验证 value 和 offset 的有效性。 默认是 false。
7	buf.writeUIntBE(value, offset, byteLength[, noAssert])
将 value 写入到 buffer 里， 它由 offset 和 byteLength 决定，最高支持 48 位无符号整数，大端对齐。noAssert 值为 true 时，不再验证 value 和 offset 的有效性。 默认是 false。
8	buf.writeIntLE(value, offset, byteLength[, noAssert])
将value 写入到 buffer 里， 它由offset 和 byteLength 决定，最高支持48位有符号整数，小端对齐。noAssert 值为 true 时，不再验证 value 和 offset 的有效性。 默认是 false。
9	buf.writeIntBE(value, offset, byteLength[, noAssert])
将value 写入到 buffer 里， 它由offset 和 byteLength 决定，最高支持48位有符号整数，大端对齐。noAssert 值为 true 时，不再验证 value 和 offset 的有效性。 默认是 false。
10	buf.readUIntLE(offset, byteLength[, noAssert])
支持读取 48 位以下的无符号数字，小端对齐。noAssert 值为 true 时， offset 不再验证是否超过 buffer 的长度，默认为 false。
11	buf.readUIntBE(offset, byteLength[, noAssert])
支持读取 48 位以下的无符号数字，大端对齐。noAssert 值为 true 时， offset 不再验证是否超过 buffer 的长度，默认为 false。
12	buf.readIntLE(offset, byteLength[, noAssert])
支持读取 48 位以下的有符号数字，小端对齐。noAssert 值为 true 时， offset 不再验证是否超过 buffer 的长度，默认为 false。
13	buf.readIntBE(offset, byteLength[, noAssert])
支持读取 48 位以下的有符号数字，大端对齐。noAssert 值为 true 时， offset 不再验证是否超过 buffer 的长度，默认为 false。
14	buf.toString([encoding[, start[, end]]])
根据 encoding 参数（默认是 'utf8'）返回一个解码过的 string 类型。还会根据传入的参数 start (默认是 0) 和 end (默认是 buffer.length)作为取值范围。
15	buf.toJSON()
将 Buffer 实例转换为 JSON 对象。
16	buf[index]
获取或设置指定的字节。返回值代表一个字节，所以返回值的合法范围是十六进制0x00到0xFF 或者十进制0至 255。
17	buf.equals(otherBuffer)
比较两个缓冲区是否相等，如果是返回 true，否则返回 false。
18	buf.compare(otherBuffer)
比较两个 Buffer 对象，返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同。
19	buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
buffer 拷贝，源和目标可以相同。 targetStart 目标开始偏移和 sourceStart 源开始偏移默认都是 0。 sourceEnd 源结束位置偏移默认是源的长度 buffer.length 。
20	buf.slice([start[, end]])
剪切 Buffer 对象，根据 start(默认是 0 ) 和 end (默认是 buffer.length ) 偏移和裁剪了索引。 负的索引是从 buffer 尾部开始计算的。
21	buf.readUInt8(offset[, noAssert])
根据指定的偏移量，读取一个无符号 8 位整数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 如果这样 offset 可能会超出buffer 的末尾。默认是 false。
22	buf.readUInt16LE(offset[, noAssert])
根据指定的偏移量，使用特殊的 endian 字节序格式读取一个无符号 16 位整数。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出 buffer 的末尾。默认是 false。
23	buf.readUInt16BE(offset[, noAssert])
根据指定的偏移量，使用特殊的 endian 字节序格式读取一个无符号 16 位整数，大端对齐。若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出 buffer 的末尾。默认是 false。
24	buf.readUInt32LE(offset[, noAssert])
根据指定的偏移量，使用指定的 endian 字节序格式读取一个无符号 32 位整数，小端对齐。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。
25	buf.readUInt32BE(offset[, noAssert])
根据指定的偏移量，使用指定的 endian 字节序格式读取一个无符号 32 位整数，大端对齐。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。
26	buf.readInt8(offset[, noAssert])
根据指定的偏移量，读取一个有符号 8 位整数。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出 buffer 的末尾。默认是 false。
27	buf.readInt16LE(offset[, noAssert])
根据指定的偏移量，使用特殊的 endian 格式读取一个 有符号 16 位整数，小端对齐。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出 buffer 的末尾。默认是 false。
28	buf.readInt16BE(offset[, noAssert])
根据指定的偏移量，使用特殊的 endian 格式读取一个 有符号 16 位整数，大端对齐。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出 buffer 的末尾。默认是 false。
29	buf.readInt32LE(offset[, noAssert])
根据指定的偏移量，使用指定的 endian 字节序格式读取一个有符号 32 位整数，小端对齐。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。
30	buf.readInt32BE(offset[, noAssert])
根据指定的偏移量，使用指定的 endian 字节序格式读取一个有符号 32 位整数，大端对齐。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。
31	buf.readFloatLE(offset[, noAssert])
根据指定的偏移量，使用指定的 endian 字节序格式读取一个 32 位双浮点数，小端对齐。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer的末尾。默认是 false。
32	buf.readFloatBE(offset[, noAssert])
根据指定的偏移量，使用指定的 endian 字节序格式读取一个 32 位双浮点数，大端对齐。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer的末尾。默认是 false。
33	buf.readDoubleLE(offset[, noAssert])
根据指定的偏移量，使用指定的 endian字节序格式读取一个 64 位双精度数，小端对齐。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。
34	buf.readDoubleBE(offset[, noAssert])
根据指定的偏移量，使用指定的 endian字节序格式读取一个 64 位双精度数，大端对齐。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 offset 可能会超出buffer 的末尾。默认是 false。
35	buf.writeUInt8(value, offset[, noAssert])
根据传入的 offset 偏移量将 value 写入 buffer。注意：value 必须是一个合法的无符号 8 位整数。 若参数 noAssert 为 true 将不会验证 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出 buffer 的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则不要使用。默认是 false。
36	buf.writeUInt16LE(value, offset[, noAssert])
根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个合法的无符号 16 位整数，小端对齐。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出buffer的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
37	buf.writeUInt16BE(value, offset[, noAssert])
根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个合法的无符号 16 位整数，大端对齐。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出buffer的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
38	buf.writeUInt32LE(value, offset[, noAssert])
根据传入的 offset 偏移量和指定的 endian 格式(LITTLE-ENDIAN:小字节序)将 value 写入buffer。注意：value 必须是一个合法的无符号 32 位整数，小端对齐。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着value 可能过大，或者offset可能会超出buffer的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
39	buf.writeUInt32BE(value, offset[, noAssert])
根据传入的 offset 偏移量和指定的 endian 格式(Big-Endian:大字节序)将 value 写入buffer。注意：value 必须是一个合法的有符号 32 位整数。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者offset可能会超出buffer的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
40	buf.writeInt8(value, offset[, noAssert])
41	buf.writeInt16LE(value, offset[, noAssert])
根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个合法的 signed 16 位整数。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出 buffer 的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false 。
42	buf.writeInt16BE(value, offset[, noAssert])
根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个合法的 signed 16 位整数。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出 buffer 的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false 。
43	buf.writeInt32LE(value, offset[, noAssert])
根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个合法的 signed 32 位整数。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出 buffer 的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
44	buf.writeInt32BE(value, offset[, noAssert])
根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个合法的 signed 32 位整数。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出 buffer 的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
45	buf.writeFloatLE(value, offset[, noAssert])
根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer 。注意：当 value 不是一个 32 位浮点数类型的值时，结果将是不确定的。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value可能过大，或者 offset 可能会超出 buffer 的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
46	buf.writeFloatBE(value, offset[, noAssert])
根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer 。注意：当 value 不是一个 32 位浮点数类型的值时，结果将是不确定的。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value可能过大，或者 offset 可能会超出 buffer 的末尾从而造成 value 被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
47	buf.writeDoubleLE(value, offset[, noAssert])
根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个有效的 64 位double 类型的值。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出 buffer 的末尾从而造成value被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
48	buf.writeDoubleBE(value, offset[, noAssert])
根据传入的 offset 偏移量和指定的 endian 格式将 value 写入 buffer。注意：value 必须是一个有效的 64 位double 类型的值。 若参数 noAssert 为 true 将不会验证 value 和 offset 偏移量参数。 这意味着 value 可能过大，或者 offset 可能会超出 buffer 的末尾从而造成value被丢弃。 除非你对这个参数非常有把握，否则尽量不要使用。默认是 false。
49	buf.fill(value[, offset][, end])
使用指定的 value 来填充这个 buffer。如果没有指定 offset (默认是 0) 并且 end (默认是 buffer.length) ，将会填充整个buffer。
*/

//Node.js，Stream 有四种流类型：
//Readable - 可读操作。
//Writable - 可写操作。
//Duplex - 可读可写操作.
//Transform - 操作被写入数据，然后读出结果。
//常用的事件有：
//data - 当有数据可读时触发。
//end - 没有更多的数据可读时触发。
//error - 在接收和写入过程中发生错误时触发。
//finish - 所有数据已被写入到底层系统时触发。

/*
//从流中读取数据
var fs=require('fs');
var data="";
//创建可读流
var readerStream=fs.createReadStream('input.txt');
//创建编码为utf8
readerStream.setEncoding('utf8');
//处理流事件-->data,end,and,error
readerStream.on('data',function(chunk){
	data+=chunk;
});
readerStream.on('end',function(){
	console.log(data);
});
readerStream.on('error',function(arr){
	console.log(err.stack);
});
console.log('程序执行完毕');
*/

/*
//写入流
var fs=require('fs');
var data='菜鸟教程官网地址：www.runoob.com';
//创建一个可以写入的流，写入到文件output.txt中
var writerStream=fs.createWriteStream('output.txt');
//使用utf8编码写入数据
writerStream.write(data,'UTF8');
//标记文件末尾
writerStream.end();
//处理流事件-->data,end,error
writerStream.on('finish',function(){
	console.log('写入完成。');
});
writerStream.on('error',function(err){
	console.log(err.stack);
});
console.log('程序执行完毕');
*/

/*
//管道流
var fs=require('fs');
//创建一个可读流
var readerStream=fs.createReadStream('input.txt');
//创建一个可写流
var writerStream=fs.createWriteStream('output.txt');
//管道读写操作
//读取input.txt文件内容，并将内容写入到output.txt文件中
readerStream.pipe(writerStream);
console.log('程序执行完毕');
*/

/*
//链式流
//compress.js
var fs=require('fs');
var zlib=require('zlib');
//压缩input.txt文件为input.txt.gz
fs.createReadStream('input.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('input.txt.gz'));
console.log('文件压缩完成。');


//decompress.js
var fs=require('fs');
var zlib=require('zlib');
//解压input.txt.gz文件为input.txt
fs.createReadStream('input.txt.gz').pipe(zlib.createGunzip()).pipe(fs.createWriteStream('input.txt'));
console.log('文件解压完毕');
*/

/*
//创建模块
var Hello=require('./hello');
hello=new Hello();
hello.setName("amy");
hello.sayHello();
*/

/*
//在路径 Y 下执行 require(X) 语句执行顺序：
1. 如果 X 是内置模块
   a. 返回内置模块
   b. 停止执行
2. 如果 X 以 '/' 开头
   a. 设置 Y 为文件根路径
3. 如果 X 以 './' 或 '/' or '../' 开头
   a. LOAD_AS_FILE(Y + X)
   b. LOAD_AS_DIRECTORY(Y + X)
4. LOAD_NODE_MODULES(X, dirname(Y))
5. 抛出异常 "not found"

LOAD_AS_FILE(X)
1. 如果 X 是一个文件, 将 X 作为 JavaScript 文本载入并停止执行。
2. 如果 X.js 是一个文件, 将 X.js 作为 JavaScript 文本载入并停止执行。
3. 如果 X.json 是一个文件, 解析 X.json 为 JavaScript 对象并停止执行。
4. 如果 X.node 是一个文件, 将 X.node 作为二进制插件载入并停止执行。

LOAD_INDEX(X)
1. 如果 X/index.js 是一个文件,  将 X/index.js 作为 JavaScript 文本载入并停止执行。
2. 如果 X/index.json 是一个文件, 解析 X/index.json 为 JavaScript 对象并停止执行。
3. 如果 X/index.node 是一个文件,  将 X/index.node 作为二进制插件载入并停止执行。

LOAD_AS_DIRECTORY(X)
1. 如果 X/package.json 是一个文件,
   a. 解析 X/package.json, 并查找 "main" 字段。
   b. let M = X + (json main 字段)
   c. LOAD_AS_FILE(M)
   d. LOAD_INDEX(M)
2. LOAD_INDEX(X)

LOAD_NODE_MODULES(X, START)
1. let DIRS=NODE_MODULES_PATHS(START)
2. for each DIR in DIRS:
   a. LOAD_AS_FILE(DIR/X)
   b. LOAD_AS_DIRECTORY(DIR/X)

NODE_MODULES_PATHS(START)
1. let PARTS = path split(START)
2. let I = count of PARTS - 1
3. let DIRS = []
4. while I >= 0,
   a. if PARTS[I] = "node_modules" CONTINUE
   b. DIR = path join(PARTS[0 .. I] + "node_modules")
   c. DIRS = DIRS + DIR
   d. let I = I - 1
5. return DIRS
*/

/*
//__filename输出文件所在位置的绝对路径
console.log(__filename);

//__dirname 表示当前执行脚本所在的目录
console.log(__dirname);
*/

/*
//setTimeout(cb, ms)
function printHello(){
   console.log( "Hello, World!");
}
// 两秒后执行以上函数
setTimeout(printHello, 2000);

//clearTimeout(t)
function printHello(){
   console.log( "Hello, World!");
}
// 两秒后执行以上函数
var t = setTimeout(printHello, 2000);

// 清除定时器
clearTimeout(t);

//setInterval(cb, ms)
function printHello(){
   console.log( "Hello, World!");
}
// 两秒后执行以上函数
setInterval(printHello, 2000);
*/

/*
//Process 提供了很多有用的属性，便于我们更好的控制系统的交互
process.stdout.write('Hello World!'+"\n");
//通过参数读取
process.argv.forEach(function(val,index,array){
	console.log(index+":  "+val);
});
//获取执行路径
console.log(process.execPath);
//平台信息
console.log(process.platfom);
*/

/*
// 输出当前目录
console.log('当前目录: ' + process.cwd());

// 输出当前版本
console.log('当前版本: ' + process.version);

// 输出内存使用情况
console.log(process.memoryUsage());
*/

/*
//Node.js 常用工具
//util.inherits  util.inherits(constructor, superConstructor)是一个实现对象间原型继承 的函数。
var util=require('util');
function Base(){
	this.name='base';
	this.base=1991;
	this.sayHello=function(){
		console.log('Hello '+this.name);
	};
}
Base.prototype.showName=function(){
	console.log(this.name);
};
function Sub(){
	this.name='sub';
}
util.inherits(Sub,Base);
var objBase=new Base();
objBase.showName();
objBase.sayHello();
console.log(objBase);
var objSub=new Sub();
objSub.showName();
//objSub.sayHello();没有该函数
console.log(objSub);
//Sub 仅仅继承了Base 在原型中定义的函数，
//而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承。
*/

/*
//util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换
//为字符串的方法，通常用于调试和错误输出。它至少接受一个参数 object，即要转换的对象。
var util=require('util');
function Person(){
	this.name='byvoid';
	this.toString=function(){
		return this.name;
	};
}
var obj=new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj,true,true));
*/

/*
//util.isArray(object)
var util=require('util');
console.log(util.isArray([]));
console.log(util.isArray(new Array));
console.log(util.isArray({}));
*/

/*
//util.isRegExp(object)
var util=require('util');
console.log(util.isRegExp(/some regexp/));
console.log(util.isRegExp(new RegExp('another regexp')));
console.log(util.isRegExp({}));
*/

/*
//util.isDate(object)
var util=require('util');
console.log(util.isDate(new Date()));
console.log(util.isDate(Date()));
//(without 'new' returns a String)
console.log(util.isDate({}));
*/

/*
//util.isError(object)
var util=require('util');
console.log(util.isError(new Error()));
console.log(util.isError(new TypeError()));
console.log(util.isError({}));
*/

/*
//Node.js 提供一组类似 UNIX（POSIX）标准的文件操作API。 
//Node 导入文件系统模块(fs)语法如下所示：
//Node.js 文件系统（fs 模块）模块中的方法均有异步和同步版本，例如读取文件内容的函数有异步的 fs.readFile() 
//和同步的 fs.readFileSync()
//异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)
var fs=require('fs');
//异步读取
fs.readFile('input.txt',function(err,data){
	if(err)
	{
		return console.error(err);
	}
	console.log("异步读取："+data.toString());
});
console.log("程序执行完毕。1");
//同步读取
var data=fs.readFileSync('input.txt');
console.log("同步读取："+data.toString());
console.log("程序执行完毕。2");
*/

/*
//打开文件fs.open(path, flags[, mode], callback)
//path - 文件的路径。
//flags - 文件打开的行为。具体值详见下文。
//mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
//callback - 回调函数，带有两个参数如：callback(err, fd)。
var fs=require('fs');
//异步打开文件
console.log("准备打开文件");
fs.open('input.txt','r+',function(err,fd){
	if(err)
	{
		return console.error(err);
	}
	console.log("文件打开成功");
});
*/

/*
//获取文件信息fs.stat(path,callback)
//path - 文件路径。
//callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。
//fs.stat(path)执行后，会将stats类的实例返回给其回调函数。
//可以通过stats类中的提供方法判断文件的相关属性。例如判断是否为文件：
var fs=require('fs');
fs.stat('E:/Git/files/SUM/node/main.js',function(err,stats){
	console.log(stats.isFile());
});
*/

/*
//创建 file.js 文件
var fs=require('fs');
console.log("准备打开文件");
fs.stat('input.txt',function(err,stats){
	if(err)
	{
		return console.error(err);
	}
	console.log(stats);
	console.log("读取文件信息成功");
	//检测文件类型
	console.log("是否为文件(isFile)?"+stats.isFile());
	console.log("是否为目录(isDirectory)?"+stats.isDirectory());
});
*/

/*
//写入文件fs.writeFile(file, data[, options], callback)
//file - 文件名或文件描述符。
//data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象。
//options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
//callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。
var fs=require('fs');
console.log("准备写入文件");
fs.writeFile('input.txt','我是通过写入的文件内容',function(err){
	if(err)
	{
		return console.error(err);
	}
	console.log("数据写入成功");
	console.log("------------分割线---------");
	console.log("读取写入数据");
	fs.readFile('input.txt',function(err,data){
		if(err)
		{
			return console.error(err);
		}
		console.log("异步读取文件数据："+data.toString());
	});
});
*/

/*
//读取文件fs.read(fd, buffer, offset, length, position, callback)
//fd - 通过 fs.open() 方法返回的文件描述符。
//buffer - 数据写入的缓冲区。
//offset - 缓冲区写入的写入偏移量。
//length - 要从文件中读取的字节数。
//position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
//callback - 回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。
var fs=require('fs');
var buf=new Buffer(1024);
console.log("准备打开已存在的文件");
fs.open('input.txt','r+',function(err,fd){
	if(err)
	{
		return console.error(err);
	}
	console.log("文件打开成功");
	console.log("准备读取文件");
	fs.read(fd,buf,0,buf.length,0,function(err,bytes){
		if(err)
		{
			console.log(err);
		}
		console.log(bytes+" 字节被读取");

		//仅输出读取的字节
		if(bytes>0){
			console.log(buf.slice(0,bytes).toString());
		}
	});
});
*/

/*
//关闭文件fs.close(fd, callback)
//fd - 通过 fs.open() 方法返回的文件描述符。
//callback - 回调函数，没有参数。
var fs=require('fs');
var buf=new Buffer(1024);
console.log("准备打开文件");
fs.open('input.txt','r+',function(err,fd){
	if(err)
	{
		return console.error(err);
	}
	console.log("文件打开成功");
	console.log("准备读取文件");
	fs.read(fd,buf,0,buf.length,0,function(err,bytes){
		if(err)
		{
			console.log(err);
		}
		console.log(bytes+" 字节被读取");

		//仅输出读取的字节
		if(bytes>0){
			console.log(buf.slice(0,bytes).toString());
		}

		//关闭文件
		fs.close(fd,function(err){
			if(err)
			{
				console.log(err);
			}
			console.log("文件关闭成功");
		});
	});
});
*/

/*
//截取文件fs.ftruncate(fd, len, callback)
//fd - 通过 fs.open() 方法返回的文件描述符。
//len - 文件内容截取的长度。
//callback - 回调函数，没有参数。
var fs=require('fs');
var buf=new Buffer(1024);
console.log("准备打开文件");
fs.open('input.txt','r+',function(err,fd){
	if(err)
	{
		return console.error(err);
	}
	console.log("文件打开成功");
	console.log("截取10字节后的文件内容");

	//截取文件
	fs.ftruncate(fd,10,function(err){
		if(err)
		{
			console.log(err);
		}
		console.log("文件截取成功");
		console.log("读取相同的文件");
		fs.read(fd,buf,0,buf.length,0,function(err,bytes){
			if(err)
			{
				console.log(err);
			}
			//仅输出读取字节
			if(bytes>0){
				console.log(buf.slice(0,bytes).toString());
			}
			//关闭文件
			fs.close(fd,function(err){
				if(err)
				{
					console.log(err);
				}
				console.log("关闭文件成功");
			});
		});
	});
});
*/

/*
//删除文件fs.unlink(path, callback)
//path - 文件路径。
//callback - 回调函数，没有参数。
var fs=require('fs');
console.log("准备删除文件");
fs.unlink('input.txt',function(err){
	if(err)
	{
		return console.error(err);
	}
	console.log("文件删除成功");
});
*/

/*
//创建目录fs.mkdir(path[, mode], callback)
//path - 文件路径。
//mode - 设置目录权限，默认为 0777。
//callback - 回调函数，没有参数。
var fs=require('fs');
console.log("创建目录 E:/Git/files/SUM/test/");
fs.mkdir("/test/",function(err){
	if(err){
		return console.error(err);
	}
	console.log("目录创建成功");
});
*/

/*
//读取目录fs.readdir(path, callback)
//path - 文件路径。
//callback - 回调函数，回调函数带有两个参数err, 
//files，err 为错误信息，files 为 目录下的文件数组列表。
var fs=require('fs');
console.log("查看E:/Git/files/SUM/test目录");
fs.readdir("E:/Git/files/SUM/test/",function(err,files){
	if(err)
	{
		return console.error(err);
	}
	 files.forEach( function (file){
		console.log(file);
	});
});
*/

/*
//删除目录fs.rmdir(path, callback)
//path - 文件路径。
//callback - 回调函数，没有参数。
var fs=require('fs');
console.log("准本删除目录E:/Git/files/SUM/test");
//文件夹为空才能删除
fs.rmdir("E:/Git/files/SUM/test",function(err){
	if(err)
	{
		return console.error(err);
	}
	console.log("成功删除目录");
	fs.readdir("E:/Git/files/SUM/",function(err,files){
		if(err)
		{
			return console.error(err);
		}
		files.forEach( function (file){
			console.log(file);
		});
	});
});
*/

/*
//Node.js GET/POST请求
//获取GET请求内容
//由于GET请求直接被嵌入在路径中，URL是完整的请求路径，
//包括了?后面的部分，因此你可以手动解析后面的内容作为GET请求的参数
var http=require('http');
var url=require('url');
var util=require('util');
http.createServer(function(req,res){
	res.writeHead(200,{'Content-Type':'text/plain;charset=utf-8'});
	//解析url参数
	var params=url.parse(req.url,true).query;
	res.write("网站名 ："+params.name);
	res.write("\n");
	res.write("网站URL："+params.url);
	res.end();
}).listen(3000);
*/

/*
//获取 POST 请求内容
//POST 请求的内容全部的都在请求体中，http.ServerRequest 
//并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。
var http=require('http');
//var util=require('util');
var querystring=require('querystring');
var postHTML=
	'<html><head><meta charset="utf-8"><title>菜鸟教程Node.js</title></head>'+
	'<body>'+
	'<form method="post">'+
	'网站名：<input name="name"><br>'+
	'网站URL：<input name="url"><br>'+
	'<input type="submit">'+
	'</form>'+
	'</body></html>';
http.createServer(function(req,res){
	var body="";
	req.on('data',function(chunk){
		body+=chunk;
	});
	req.on('end',function(){
		//解析参数
		body=querystring.parse(body);
		//设置响应头部信息及编码
		res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
		if(body.name && body.url){
			res.write("网站名："+body.name);
			res.write("<br>");
			res.write("网站URL："+body.url);
		}
		else
		{
			res.write(postHTML);
		}
		res.end();
	});
}).listen(3000);
*/

/*
//Node.js OS 模块
var os=require('os');
//CPU的字节序
console.log('endianness:'+os.endianness());
//操作系统名
console.log('type:'+os.type());
//操作系统名
console.log('platform:'+os.platform());
//系统内存总量
console.log('total memory:'+os.totalmem()+' bytes.');
//操作系统空闲内存量
console.log('free memory:'+os.freemem()+' bytes.');
*/

/*
//Node.js Path 模块
var path=require('path');
//格式化路径
console.log('normalization:'+path,normalize('/test/test1//2slashes/1slash/tab/..'));
//链接路径
console.log('joint path:'+path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));
//转换为绝对路径
console.log('resolve:'+path.resolve('main.js'));
//路径中文件的后缀名
console.log('ext name:'+path.extname('main.js'));
*/

/*
//Node.js Net 模块
var net=require('net');
var server=net.createServer(function(connection){
	console.log('client connected');
	connection.on('end',function(){
		console.log('客户端关闭连接');
	});
	connection.write('Hello World!\r\n');
	connection.pipe(connection);
});
server.listen(8080,function(){
	console.log('server is listening');
});

var net=require('net');
var client=net.connect({port:8080},function(){
	console.log('连接到服务器');
});
client.on('data',function(data){
	console.log(data.toString());
	client.end();
});
client.on('end',function(){
	console.log('断开服务器');
});
*/

/*
//Node.js DNS 模块
var dns=require('dns');
dns.lookup('www.github.com',function onLookup(err,address,family){
	console.log('ip 地址：',address);
	dns.reverse(address,function(err,hostnames){
		if(err)
		{
			console.log(err.stack);
		}
		console.log('反向解析 '+address+':'+JSON.stringify(hostnames));
	});
});
*/

/*
//Node.js Domain 模块
//隐式绑定: 把在domain上下文中定义的变量，自动绑定到domain对象
//显式绑定: 把不是在domain上下文中定义的变量，以代码的方式绑定到domain对象
var EventEmitter=require("events").EventEmitter;
var domain=require("domain");
var emitter1=new EventEmitter();
//创建域
var domain1=domain.create();
domain1.on('error',function(err){
	console.log('domain1 处理这个错误 ('+err.message+')');
});
//显示绑定
domain1.add(emitter1);
emitter1.on('error',function(err){
	console.log('监听器处理此错误 ('+err.message+')');
});
emitter1.emit('error',new Error('通过监听器来处理'));
emitter1.removeAllListeners('error');
emitter1.emit('error',new Error('通过domain1处理'));
var domain2=domain.create();
domain2.on('error',function(err){
	console.log('domain2处理这个错误('+err.message+')');
});
//隐式绑定 
domain2.run(function(){
	var emitter2=new EventEmitter();
	emitter2.emit('error',new Error('通过domain2处理'));
});
domain1.remove(emitter1);
emitter1.emit('error',new Error('转换为异常，系统将崩溃'));
*/

//Web应用架构
//Client - 客户端，一般指浏览器，浏览器可以通过 HTTP 协议向服务器请求数据。
//Server - 服务端，一般指 Web 服务器，可以接收客户端请求，并向客户端发送响应数据。
//Business - 业务层， 通过 Web 服务器处理应用程序，如与数据库交互，逻辑运算，调用外部程序等。
//Data - 数据层，一般由数据库组成。
//Node.js 提供了 http 模块，http 模块主要用于搭建 HTTP 服务端和客户端，使用 HTTP 服务器或客户端功能必须调用 http 模块
//在server.js和client.js中

//Node.js Express 框架
//使用 Express 可以快速地搭建一个完整功能的网站。
//可以设置中间件来响应 HTTP 请求。
//定义了路由表用于执行不同的 HTTP 请求动作。
//可以通过向模板传递参数来动态渲染 HTML 页面。

/*
//Node.js RESTful API
//EST即表述性状态传递（英文：Representational State Transfer，
//简称REST）是Roy Fielding博士在2000年他的博士论文中提出来的
//一种软件架构风格。
//以下为 REST 基本架构的四个方法：
//GET - 用于获取数据。
//PUT - 用于更新或添加数据。
//DELETE - 用于删除数据。
//POST - 用于添加数据。
//获取用户列表
var express=require('express');
var app=express();
var fs=require('fs');
app.get('/listUsers',function(req,res){
	fs.readFile(__dirname+'/'+'users.json','utf8',function(err,data){
		console.log(data);
		res.end(data);
	});
});
var server=app.listen(8081,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
*/

/*
//添加用户
var express=require('express');
var app=express();
var fs=require('fs');
//添加的新用户信息
var user={
	"user4":{
		"name":"mohit",
		"password":"password4",
		"profession":"teacher",
		"id":4
	}
};

app.get('/addUser',function(req,res){
	//读取已存在的数据
	fs.readFile(__dirname+'/'+'users.json','utf8',function(err,data){
		data=JSON.parse(data);
		data["user4"]=user['user4'];
		console.log(data);
		res.end(JSON.stringify(data));
	});
});
var server=app.listen(8081,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
*/

/*
//显示用户详情
var express=require('express');
var app=express();
var fs=require('fs');
app.get('/:id',function(req,res){
	//首先我们读取已存在的用户
	fs.readFile(__dirname+'/'+'users.json','utf8',function(err,data){
		data=JSON.parse(data);
		var user=data['user'+req.params.id];
		console.log(user);
		res.end(JSON.stringify(user));
	});
});
var server=app.listen(8081,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
*/

/*
//删除用户
var express=require('express');
var app=express();
var fs=require('fs');
var id=2;
app.get('/deleteUser',function(req,res){
	//first read existing users
	fs.readFile(__dirname+'/'+'users.json','utf8',function(err,data){
		data=JSON.parse(data);
		delete data["user"+2];
		console.log(data);
		res.end(JSON.stringify(data));
	});
});
var server=app.listen(8081,function(){
	var host=server.address().address;
	var port=server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
*/

//Node.js 多进程
//每个子进程总是带有三个流对象：child.stdin, child.stdout 和child.stderr。
//他们可能会共享父进程的 stdio 流，或者也可以是独立的被导流的流对象。
//Node 提供了 child_process 模块来创建子进程，方法有：
//exec - child_process.exec 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回。
//child_process.exec(command[, options], callback)
//spawn - child_process.spawn 使用指定的命令行参数创建新进程。
//fork - child_process.fork 是 spawn()的特殊形式，用于在子进程中运行的模块，如 fork('./son.js') 相当于
// spawn('node', ['./son.js']) 。与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信
//在support和master文件中 

//Node.js JXcore 打包
//Node.js 是一个开放源代码、跨平台的、用于服务器端和网络应用的运行环境。
//JXcore 是一个支持多线程的 Node.js 发行版本，基本不需要对你现有的代码做任
//何改动就可以直接线程安全地以多线程运行。
//$ jx package index.js index
//以上命令执行成功，会生成以下两个文件：
//index.jxp 这是一个中间件文件，包含了需要编译的完整项目信息。
//index.jx 这是一个完整包信息的二进制文件，可运行在客户端上。


//Node.js 连接 MySQL
//Node.js 连接 MongoDB








