var arr = [42,32,12,50,20,45,89,1,45];

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
	method5(arr,start,i-1);
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
*/
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