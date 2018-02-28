//var arr = [42,32,12,50,20,45,89,1,45];

/*
*冒泡排序

function method1(arr) {
	//设定一个标志值，当排序完成后马上退出
	var flag = 0;
	for(var j=0; j<arr.length;j++) {
		for(var i=arr.length-1;i>j;i--) {//注意，这里的最小值要i>j，防止多余的操作
			if(arr[i]<arr[i-1]) {
				var temp = arr[i];
				arr[i] = arr[i-1];
				arr[i-1] = temp;
				flag = 1;
			} else {
				flag = 0;
			}
		}
		if(flag==0) {
			return arr;
		}
	}
	return arr;
}

var method1Arr = method1(arr);
var method1Node = document.getElementById("method1");
method1Node.innerHTML = "["+method1Arr+"]";
*/



/*
*选择排序

function method2(arr) {
	var minNum;
	var num = 0;
	var flag = 0;
	for(var i=0;i<arr.length-1;i++) {
		minNum = arr[i];
		for(var j=i+1;j<arr.length;j++) {
			if(minNum>arr[j]){
				var temp = minNum;
				minNum = arr[j];
				arr[j] = temp;
			}
		}
		arr[i] = minNum;
	}
	return arr;
}

var method2Arr = method2(arr);
var method2Node = document.getElementById("method2");
method2Node.innerHTML = "["+method2Arr+"]";
*/


/*
*插入排序

function method3(arr) {
	for(var i=0;i<arr.length-1;i++) {
		for(var j=i+1;j>0;j--) {
			if(arr[j]<arr[j-1]) {
				var temp = arr[j-1];
				arr[j-1] = arr[j];
				arr[j] = temp;
			}
		}
	}
	return arr;
}

var method3Arr = method3(arr);
var method3Node = document.getElementById("method3");
method3Node.innerHTML = "["+method3Arr+"]";
*/

/*
*希尔排序略
*/

/*
*快速排序

var result = [];
function method5(arr,start,end) {
	if(start>=end) {
		return;
	}
	var i=start, j=end;
	var flag = arr[i];
	while(i<j) {
		while(i<j && arr[j]>=flag) {
			j--;
		}
		if(i<j) {
			arr[i] = arr[j];
			i++;
		}

		while(i<j && arr[i]<=flag) {
			i++;
		}
		if(i<j) {
			arr[j] = arr[i];
			j--;
		}
	}
	arr[i] = flag;
	method5(arr,start,i-1);//递归，调用自身
	method5(arr,i+1,end);
	result.push(arr);
}

method5(arr,0,arr.length-1);
var method5Node = document.getElementById("method5");
method5Node.innerHTML = "["+result[result.length-1]+"]";
*/

/*
*归并排序

function mergeArr(arr, first, middle, last) {
	var temp = [];
	var i, m, j, n, k=0;
	i=first;
	m=middle;
	j=middle+1;
	n=last;

	while(i<=m && j<=n) {
		if(arr[i]<=arr[j]) {
			temp[k] = arr[i];
			k++;
			i++;
		} else {
			temp[k] = arr[j];
			k++;
			j++;
		}
	}
	//j到n的序列排完了，只用排i到m的
	while(i<=m) {
		temp[k] = arr[i];
		k++;
		i++;
	}

	while(j<=n) {
		temp[k] = arr[j];
		k++;
		j++;
	}
	for(var z=0;z<k;z++) {
		arr[first+z] = temp[z];//整理好每个部分
	}
	if(k==arr.length) {
		return arr;
	}
}

function method6(arr, first, last) {
	var temp=[],result;
	if(first<last) {
		var middle = Math.floor((first+last)/2);
		if(middle>=0) {
			console.log(middle);
			method6(arr, first, middle);
			method6(arr, middle+1, last);
			result=mergeArr(arr, first, middle, last);
		}
	}
	return result;
}

var method6Arr = method6(arr, 0, arr.length-1);
var method6Node = document.getElementById("method6");
method6Node.innerHTML = "["+method6Arr+"]";
*/

/*
*堆排序略
*/

/*
*基数排序

var result=[];
function method8(arr) {
	var temp=[], n, k, r, cnt=[];
	n = arr.length;
	k = 2;//数组中的最大位
	r = 10;//以10为基数

	for(var i=0, rtok=1; i<k; i++, rtok=rtok*r) {
		for(var j=0; j<r; j++) {
			cnt[j]=0;
		}

		for(var j=0; j<n; j++) {
			cnt[(Math.floor(arr[j]/rtok))%r]++;
		}

		//cnt[j]的个数修改为前j个箱子一共有几个数字
		for(var j=1; j<r; j++) {
			cnt[j] = cnt[j] + cnt[j-1];
		}

		for(var j=n-1; j>=0; j--) {
			cnt[(Math.floor(arr[j]/rtok))%r]--;
			temp[cnt[(Math.floor(arr[j]/rtok))%r]]=arr[j];
		}

		for(var j=0;j<n;j++) {
			arr[j] = temp[j];
		}
		result.push(arr);
	}
}

method8(arr);
var method8Node = document.getElementById("method8");
method8Node.innerHTML = "["+result[result.length-1]+"]";
*/

/*
*队列格式实现

function Queue() {
	var arr = [];
	this.enqueue = function(element) {
		return arr.push(element);
	}
	this.dequeue = function(element) {
		return arr.shift(element);
	}
	this.isEmpty = function() {
		return arr.length == 0;
	}
	this.clear = function() {
		arr = [];
	}
	this.size = function() {
		return arr.length;
	}
	this.print = function() {
		console.log(arr.toString());
	}
}
*/

/*
*栈格式实现

function Stack() {
	var arr = [];
	this.pop = function() {
		return arr.pop();
	}
	this.push = function(element) {
		return arr.push(element);
	}
}
*/

/*
*链表格式实现

var Node = function(newData) {
	this.next = null;
	this.data = null;
	this.init= function(newData) {
		this.data = newData;
	}
	this.init(newData);
}
 
var List = function() {
	this.head = null;
	this.size = 0;
	this.init = function() {
		this.head = null;
		this.size = 0;
	};
	this.init();

	this.insert = function(newData) {
		this.size += 1;
		var newNode = new Node(newData);
		if(this.head == null) {
			this.head = newNode;
			return;
		}
		//如果this.head!==null
		var tempNode = this.head;
		while(tempNode.next!==null) {
			tempNode = tempNode.next;
		}
		tempNode.next = newNode;
	};
	this.getDate = function(pos) {
		if(pos>=this.size || pos<0) {
			return null;
		} else {
			var tempNode = this.head;
			for(var i=0; i<pos; i++) {
				tempNode = tempNode.next;
			}	
			return tempNode.data;
		}
	};
	this.remove = function(pos) {
		if(pos>=this.size || pos<0) {
			return null;
		}
		this.size -= 1;
		var tempNode = this.head;
		if(pos == 0) {
			this.head = tempNode.next;
			return this.head;
		}
		for(var i=0; i<pos-1; i++) {
			tempNode = tempNode.next;
		}
		tempNode.next = tempNode.next.next;
		return tempNode.next;
	};
	this.print = function() {
		var listTable = document.getElementById("node");
		var  tempNode = this.head;
		var str = "链表内容如下<br>";
		while(tempNode != null) {
			str += tempNode.data;
			tempNode = tempNode.next;
		}
		str += "<br>";
		listTable.innerHTML=str;
	}
}

var list = new List();
var arr = [4,5,2,7,1];
for(var i=0; i<arr.length; i++) {
	list.insert(arr[i]);
}
list.remove(1);
list.print();
console.log(list.size);
*/

/*
*阶乘算法

function factorialize(num) {
	var result = num;
	if(num<0) {
		return;
	}
	if(num === 0 || num === 1) {
		return 1;
	}
	while(num>1) {
		num--;
		result = result*num;
	}
	return result;
}

var factorializeRes = factorialize(5);
var factorializeResBox = document.getElementById("factorialize");
factorializeResBox.innerHTML=factorializeRes;
*/

/*
*回文字符串判断
方法一
function palindrome(str) {
	//去除标点，下划线等
	var reg  = /[\W_]/g;
	var resultStr = str.toLowerCase().replace(reg, "");
	console.log(resultStr);
	if(resultStr.length == 0) {
		return true;
	}
	if(resultStr[0] != resultStr[resultStr.length-1]) {
		return false;
	} else {
		return palindrome(resultStr.slice(1,resultStr.length-1));
	}
}

//方法二，利用数组中的reverse()方法
function palindrome(str) {
	//去除标点，下划线等
	var reg  = /[\W_]/g;
	var resultStr = str.toLowerCase().replace(reg, "");
	var resultArr = resultStr.split("");
	if(resultArr.reverse().join("") == resultStr)	{
		return true;
	} else {
		return false;
	}
}

console.log(palindrome(",.iop]\po_i"));
*/

/*
*翻转字符串算法

function reverseString(str) {
	var temp="";
	for(var i=str.length-1; i>=0; i--) {
		temp += str[i];
	}
	return temp;
}
document.getElementById("reverseString").innerHtml = reverseString("hello");
*/

/*
*整形数组去重计算，主要考察利用object的键值唯一来解决

function unique(arr) {
	var resultObj = {};
	var resultArr =[];
	for(var i=0; i<arr.length; i++) {
		if(!resultObj[arr[i]]) {
			resultObj[arr[i]] = true;
			resultArr.push(arr[i]);
		}
	}
	return resultArr;
}
console.log(unique([1,2,3,2,3,5,6]));
*/

/*
*数组中的最大差值 

function getMaxProfit(arr) {
	var minPrice = arr[0];
	var maxProfit = 0;
	for(var i=1; i<arr.length; i++) {
		var currentPrice = arr[i];
		minPrice = Math.min(minPrice,currentPrice);
		var currentProfit = currentPrice - minPrice;
		maxProfit = Math.max(currentProfit, maxProfit);
	}
	return maxProfit;
}
document.getElementById("getMaxProfit").innerHTML =  getMaxProfit([1,5,1,9,6]);
*/

/*
*指定长度的随机数

function randomString(n) {
	var str = "abcdefghijklmnopqrstuvwxyz0123456789";
	var l = str.length;
	var result="";
	for(var i=0; i<n; i++) {
		result += str[Math.floor(Math.random()*l)];
	}
	return result;
}
console.log(randomString(4));
*/

/*
*统计重复的元素个数

function findDuplicateNum(arr) {
	var resultObj = {};
	for(var i=0; i<arr.length; i++) {
		if(!resultObj[arr[i]]) {
			resultObj[arr[i]] = 1;
		} else {
			resultObj[arr[i]] += 1;
		}
	}
	console.log(resultObj);
	//找出重复次数最多的
	var maxDupTimes = 1;
	var maxDupChar ="";
	var maxDupCharArr = [];
	for(var key in resultObj) {
		if(resultObj[key]>=maxDupTimes) {
			maxDupTimes	= resultObj[key];
			maxDupChar = key;
			maxDupCharArr.push(key);
		}
	}
	if(maxDupCharArr.length>1){
		return maxDupCharArr;
	} else {
		return maxDupChar;
	}
}
console.log(findDuplicateNum([1,5,1,7]));
*/

/*
*黄金分割数列,生成菲波那切数列数组

var canvas = document.getElementById("getFibonacci");
var ctx = canvas.getContext('2d');//指定了二维绘图
//定义中心坐标
var coor = {
  x: 300,
  y: 240,
};

function draw(r, n ,prevR) {
   if(n>2) {
     switch(n%4) {
      case 0 :
        coor.y = coor.y - 5 * prevR;
        coor.y = coor.y + 5 * r;

        break;
      case 1 :
        coor.x = coor.x + 5 * prevR;
        coor.x = coor.x - 5 * r;
        break;
      case 2 :
        coor.y = coor.y + 5 * prevR;
        coor.y = coor.y - 5 * r;
        break;
      case 3 :
        coor.x = coor.x - 5 * prevR;
        coor.x = coor.x + 5 * r;
        break;
    }
  }
  ctx.beginPath();
  ctx.arc(coor.x,coor.y,5*r,Math.PI*0.5*(n),Math.PI*0.5*(n-1),true);
  if(n>1) {
     switch(n%4) {
      case 0 :
        ctx.moveTo(coor.x - 5*r,coor.y);

        break;
      case 1 :
        ctx.moveTo(coor.x,coor.y + 5*r);
        break;
      case 2 :
       ctx.moveTo(coor.x + 5*r,coor.y);
        break;
      case 3 :
        ctx.moveTo(coor.x,coor.y-5*r);
        break;
    }
  }
  
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#000';
  ctx.stroke();
}

function getFibonacci(n){
	var result = [];
	var i=0; 
	while(i<n) {
		if(i<=1) {
			result.push(i);
		} else {
			result.push(result[i-1]+result[i-2]);
		}
		i++;
	}
	return result;
}

var data = getFibonacci(10);

for(var i=0; i<data.length; i++) {
  if(data[i]!=0) {
    draw(data[i],i,data[i-1]);
  }
}
*/

/*
*不借助中间 变量，调换两位数

function swap(a,b) {
	b=b-a;
	a=b+a;
	b=a-b;
	return [a,b];
}
console.log(swap(1,2));
*/

/*
*实现类似getElementsByClassName 的功能

function queryClassName(node, name) {
	var starts = '(^|[ \n\r\t\f])',
	ends = '([ \n\r\t\f]|$)';
	var array = [],
		regex = new RegExp(starts+name+ends),
		elements = node.getElementsByTagName("*")
		length = elements.length,
		i=0,
		element;
	while(i<length) {
		element = elements[i];
		if(regex.test(element.className)) {
			array.push(element);
		}
		i+=1;
	}
	return array;
}
*/

/*
*二叉树节点

var root = {
	this.left =left;
	this.right = right;
	this.value = value;
}

function print(root) {
	console.log(root.value);
	if(root.left) {
		print(root.left);
	}
	if(root.right) {
		print(root.right);
	}
}
*/

/*
*获取指定范围的随机数

function getRandomNum(min,max) {
	return Math.floor(Math.random()*(max-min+1))+min;
}
console.log(getRandomNum(2,4));
*/

/*
*随机获取数组中的元素

function getRandomEle(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}
console.log(getRandomEle([2,4]));
*/

/*
*生成从0到某个数的数组

function generateArr(num) {
	var arr=[];
	for(var i=0; i<=num; i++) {
		arr.push(i);
	}
	return arr;
}
console.log(generateArr(10));
*/

/*
*对象转化为数组

var obj = {
	0:"top",
	1:"bottom",
	2:"left",
	3:"right",
	length:4
}
var arr = [].slice;
var objArr = arr.call(obj);
console.log(objArr);
*/

/*
*区分数组和对象

function isArray(obj) {
	return Object.prototype.toString.call(obj) === "[object Array]";
}
console.log(isArray([1,2,3]));
console.log(isArray({}));
*/

/*
*获取数组中的最大和最小值

function maxAndMin(arr) {
	return {
		max:Math.max.apply(null, arr.join(',').split(',')),
		min:Math.min.apply(null, arr.join(',').split(','))
	}
}
console.log(maxAndMin([1,5,[5,8,9],2]));

var arr = new Array(6)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"
arr[3] = "James"
arr[4] = "Adrew"
arr[5] = "Martin"

document.write(arr + "<br />")
arr.splice(0,arr.length);//从index0开始删除arr.length元素
//如果是三个参数arr.splice(2,0,"mike");
document.write(arr + "<br />")
*/

/*
*清空 数组

arr.length =0;
arr.splice(0,arr.length);//从index0开始删除arr.length元素
arr=[];
*/

/*
*指定小数位

var num = 3.141212;
console.log(num.toFixed(2));
*/

/*
*null和undefined

function test(obj) {
	//null == undefined, null == null
	if(obj!=null) {
		// obj除了undefined 和 null 之外都会走这里
	}
}
*/

