var arr1=[10,12,0,15,21,3,9,85,62,4,2];
var temp=0;

/*
//冒泡排序
for(var i=0;i<arr1.length-1;i++)
{
	for(var j=0;j<arr1.length;j++)
	{
		if(arr1[j]<arr1[j+1])
		{
			temp=arr1[j+1];
			arr1[j+1]=arr1[j];
			arr1[j]=temp;
		}
	}
}
part1.innerHTML=arr1;


//选择排序，不够稳定
var minindex;//先定义一个最小数对应的index
for(var i=0;i<arr1.length-1;i++)
{
	minindex=i;//一开始，先把第一个数的index取出来
	for(var j=i+1;j<arr1.length;j++)
	{
		if(arr1[j]<arr1[minindex])
		{
			minindex=j;
		}
		if(minindex!=i)
		{
			temp=arr1[i];
			arr1[i]=arr1[minindex];
			arr1[minindex]=temp;
		}
	}
}
part2.innerHTML=arr1;


//插入排序
for(var i=0;i<arr1.length-1;i++)
{
	for(var j=i+1;j>0;j--)//一次选择前面1+2个数进行一次小排序
	{
		if(arr1[j]<arr1[j-1])
		{
			temp=arr1[j];
			arr1[j]=arr1[j-1];
			arr1[j-1]=temp;
		}
	}
}
part3.innerHTML=arr1;
*/
