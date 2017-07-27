<meta charset="utf-8">
<?php
//连接MySQL

/*
//mysql-面向对象
$servername="localhost";//服务器名
$username="root";//填写自己数据库的用户名
$password="x1282940";//填写数据库的密码
//创建连接
$conn=new mysqli($servername,$username,$password);
//检测连接
if($conn->connect_error){//如果有错误，则连接不成功
	die("连接失败：".$conn->connect_error);
}
echo "连接成功mysql-面向对象";


//mysql-面向过程
$servername="localhost";
$username="root";
$password="x1282940";
//创建连接
$conn=mysqli_connect($servername,$username,$password);
//检测连接
if(!$conn){
	//die("Connection failed:".mysqli_connect_error());
	die("连接错误：".mysql_error($conn));
}
echo "连接成功mysql-面向过程";
//关闭数据库
mysqli_close($conn);


//MySQL 创建数据库

//mysql-面向对象
$servername="localhost";
$username="root";
$password="x1282940";
//创建连接
$conn=new mysqli($servername,$username,$password);
//检测连接
if($conn->connect_error){
	die("连接失败：".$conn->connect_error);
}
//连接成功，创建数据库
$sql="CREATE DATABASE myDB";
if($conn->query($sql)===TRUE){
	echo "数据库创建成功";
}else{
	echo "error creating database:".$conn->error;
}
$conn->close();//关闭数据库


//mysql-面向过程
$servername="localhost";
$username="root";
$password="x1282940";
//创建连接
$conn=mysqli_connect($servername,$username,$password);
//检测连接
if(!$conn){
	die("Connection failed:".mysqli_connect_error());
}
//创建数据库
$sql="CREATE DATABASE RUNOOB";
if(mysqli_query($conn,$sql)){
	echo "数据库创建成功";
}else{
	echo "error creating database:".mysqli_error($conn);
}
mysqli_close($conn);



//创建MySQL表

//MySQLi-面向对象
$servername="localhost";
$username="root";
$password="x1282940";
$dbname="myDB";
//创建连接
$conn=new mysqli($servername,$username,$password,$dbname);
//检测连接
if($conn->connect_error){
	die("连接失败：".$conn->connect_error);
}
//使用sql创建数据表
$sql="CREATE TABLE MyGuests(
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	firstname VARCHAR(30) NOT NULL,
	lastname VARCHAR(30) NOT NULL,
	age VARCHAR(30) NOT NULL,
	email VARCHAR(50),
	reg_date TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8;";
if($conn->query($sql)===TRUE){
	echo "数据表创建成功";
}else{
	echo "error creating table:".$conn->error;
}
$conn->close();

//MySQLi-面向过程 
$servername="localhost";
$username="root";
$password="x1282940";
$dbname="myDB";
//创建连接
$conn=mysqli_connect($servername,$username,$password,$dbname);
//检测连接
if(!$conn){
	die("Connection failed:".mysqli_connect_error());
}
//使用sql创建数据表
//AUTO_INCREMENT设置 MySQL 字段的值在新增记录时每次自动增长 1
//PRIMARY KEY设置数据表中每条记录的唯一标识
//$sql="CREATE TABLE MyGuests(
//	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
//	firstname VARCHAR(30) NOT NULL,
//	lastname VARCHAR(30) NOT NULL,
//	email VARCHAR(50),
//	reg_date TIMESTAMP
//)";
$sql="CREATE TABLE runoob_tbl (".
"runoob_id int NOT NULL AUTO_INCREMENT,".
"runoob_title varchar(100) NOT NULL,".
  "runoob_author varchar(40) NOT NULL,".
  "submission_date DATE,".
  "PRIMARY KEY(runoob_id))ENGINE=InnoDB DEFAULT CHARSET=utf8;";
if(mysqli_query($conn,$sql)){ 
	echo "数据表创建成功";
}else{
	echo "error creating table:".mysqli_error($conn);
}
mysqli_close($conn);

//MySQL 插入数据

//MySQLi-面向对象
$servername="localhost";
$username="root";
$password="x1282940";
$dbname="myDB";//第一步就创建好的数据库
//创建连接
$conn=new mysqli($servername,$username,$password,$dbname);//将这四个对象进行连接
//检测连接
if($conn->connect_error){
	die("连接失败：".$conn->connect_error);
}
//往里面的对应列输入数据
$sql="INSERT INTO tcount_tbl VALUES ('菜鸟教程', '10'), ('RUNOOB.COM ', '20'), ('Google', '22');";
if($conn->query($sql)===TRUE){
	echo "新数据插入成功";
}else{
	echo "error:".$sql."<br>".$conn->error;
}
$conn->close();


//MySQLi-面向过程 
$servername="localhost";
$username="root";
$password="x1282940";
$dbname="myDB";
//创建连接
$conn=mysqli_connect($servername,$username,$password,$dbname);
//检测连接
if(!$conn){
	die("Connection failed:".mysqli_connect_error());
}
mysqli_query($conn,"set names utf8");
$sql="INSERT INTO tcount_tbl".
"(runoob_author,runoob_count)".
 "VALUES ".
 "('菜鸟教程', '10'), ('RUNOOB.COM ', '20'), ('Google', '22');";
if(mysqli_query($conn,$sql)){
	echo "新纪录插入成功";
}else{
	echo "error:".$sql."<br>".mysqli_error($conn);
}
mysqli_close($conn);



// MySQL 插入多条数据

//MySQLi-面向对象
$servername="localhost";
$username="root";
$password="x1282940";
$dbname="myDB";
//创建连接
$conn=new mysqli($servername,$username,$password,$dbname);
//检测连接
if($conn->connect_error){
	die("连接失败：".$conn->connect_error);
}
$sql="INSERT INTO MyGuests(firstname,lastname,email,age) VALUES('John','Doe','john@example.com','25');";//分号这里有2个
$sql .="INSERT INTO MyGuests(firstname,lastname,email,age) VALUES('Mary','Moe','mary@example.com','30');";
$sql .="INSERT INTO MyGuests(firstname,lastname,email,age) VALUES('Julie','Dooley','julie@example.com','35');";
if($conn->multi_query($sql)===TRUE){//这里多了multi,多行的意思
	echo "多条新数据插入成功";
}else{
	echo "error:".$sql."<br>".$conn->error;
}
$conn->close();

//MySQLi-面向过程 
$servername="localhost";
$username="root";
$password="x1282940";
$dbname="myDB";
//创建连接
$conn=mysqli_connect($servername,$username,$password,$dbname);
//检测连接
if(!$conn){
	die("Connection failed:".mysqli_connect_error());
}
$sql="INSERT INTO runoob_tbl(runoob_title,runoob_author,submission_date) VALUES('学习 PHP', '菜鸟教程', '2017-04-12');";
$sql .="INSERT INTO runoob_tbl(runoob_title,runoob_author,submission_date) VALUES('学习 MySQL', '菜鸟教程', '2017-04-12');";
$sql .="INSERT INTO runoob_tbl(runoob_title,runoob_author,submission_date) VALUES('学习 Java', 'RUNOOB.COM', '2015-05-01');";
$sql .="INSERT INTO runoob_tbl(runoob_title,runoob_author,submission_date) VALUES('学习 Python', 'RUNOOB.COM', '2016-03-06');";
$sql .="INSERT INTO runoob_tbl(runoob_title,runoob_author,submission_date) VALUES('学习 C', 'FK', '2017-04-05');";
if(mysqli_multi_query($conn,$sql)){
	echo "新纪录插入成功";
}else{
	echo "error:".$sql."<br>".mysqli_error($conn);
}
mysqli_close($conn);


//使用预处理语句
//mysqli 扩展提供了第二种方式用于插入语句。
$servername="localhost";
$username="root";
$password="x1282940";
$dbname="myDB";
//创建连接
$conn=new mysqli($servername,$username,$password,$dbname);
//检测连接
if($conn->connect_error){
	die("连接失败：".$conn->connect_error);
}else{//如果连接成功，那么进行预处理，留出位置
	$sql="INSERT INTO MyGuests(firstname,lastname,email)
	VALUES(?,?,?)";
	//为mysqli_stmt_prepare()初始化statement对象
	$stmt=mysqli_stmt_init($conn);
	//预处理语句
	if(mysqli_stmt_prepare($stmt,$sql)){
		//绑定参数，s 字符告诉 mysql 参数是字符串。
		mysqli_stmt_bind_param($stmt,'sss',$firstname,$lastname,$email);
		//设置参数并执行
		$firstname="John";
		$lastname="Doe";
		$email="john@example.com";
		mysqli_stmt_execute($stmt);//执行
		$firstname="Mary";
		$lastname="Moe";
		$email="mary@example.com";
		mysqli_stmt_execute($stmt);
		$firstname="Julie";
		$lastname="Dooley";
		$email="julie@example.com";
		mysqli_stmt_execute($stmt);
		echo "设置参数并执行完毕";
	}
}



// MySQL 预处理语句

//MySQLi 预处理语句
//预处理：创建 SQL 语句模板并发送到数据库。预留的值使用参数 "?" 标记
//数据库解析，编译，对SQL语句模板执行查询优化，并存储结果不输出
//执行：最后，将应用绑定的值传递给参数（"?" 标记），数据库执行语句。应用可以多次执行语句，如果参数的值不一样。
$servername="localhost";
$username="root";
$password="x1282940";
$dbname="myDB";
//创建连接
$conn=new mysqli($servername,$username,$password,$dbname);
//检测连接
if($conn->connect_error){
	die("连接失败：".$conn->connect_error);
}
//预处理及绑定
$stmt=$conn->prepare("INSERT INTO MyGuests(firstname,lastname,email)
	VALUES(?,?,?)");
$stmt->bind_param("sss",$firstname,$lastname,$email);
//设置参数并执行
$firstname="John";
$lastname="Doe";
$email="john@example.com";
$stmt->execute();
$firstname="Mary";
$lastname="Moe";
$email="mary@example.com";
$stmt->execute();
$firstname="Julie";
$lastname="Dooley";
$email="julie@example.com";
$stmt->execute();
echo "新纪录插入成功";
$stmt->close();
$conn->close();


//MySQL 读取数据

//MySQLi-面向对象
$servername="localhost";
$username="root";
$password="x1282940";
$dbname="myDB";
//创建连接
$conn=new mysqli($servername,$username,$password,$dbname);
//检测连接
if($conn->connect_error){
	die("连接失败：".$conn->connect_error);
}
//从MyGuests表中读取id,firstname,lastname
$sql="SELECT id,firstname,lastname,age FROM MyGuests";
$result=$conn->query($sql);
if($result->num_rows>0){
	//输出数据
	//函数 fetch_assoc() 将结合集放入到关联数组并循环输出
	while($row=$result->fetch_assoc()){
		echo "id: ".$row['id']." _Name: ".$row['firstname']." ".$row['lastname']." ".$row['age']."<br>";
	}
}else{
	echo "0 结果";
}
$conn->close();

//MySQLi-面向过程 
$servername="localhost";
$username="root";
$password="x1282940";
$dbname="myDB";
//创建连接
$conn=mysqli_connect($servername,$username,$password,$dbname);
//检测连接
if(!$conn){
	die("Connection failed:".mysqli_connect_error());
}
$sql="SELECT runoob_author,runoob_count FROM runoob_test where runoob_count IS NULL";
$result=mysqli_query($conn,$sql);
echo "<table border='1'>";
if($result){
	//输出数据
	//while ($row=mysqli_fetch_assoc($result)) {
	//	echo "id: ".$row['runoob_id']."-Name: ".$row['runoob_name']." //".$row['runoob_age']."<br>";
	//}
	//读取每行信息给ROW
	// MYSQL_ASSOC， 设置该参数查询结果返回关联数组，你可以使用字段名称来作为数组的索引
	//MYSQL_NUM若将MYSQL_ASSOC换成这个，则索引为数字
	while($row=mysqli_fetch_array($result,MYSQL_ASSOC))
	{
		//在字符串中使用变量，请将变量置于花括号
		echo "<tr><td>{$row['runoob_author']}</td>".
		"<td>{$row['runoob_count']}</td>".
		"</tr>";
	}
}else{
	echo "0 结果";
}
echo "</table>";
mysqli_close($conn);



//MySQL Where 子句，用于过滤记录。

//使用 mysqli_query() 函数。该函数用于向 MySQL 连接发送查询或命令
//实例将从 "Persons" 表中选取所有 FirstName='Peter' 的行
$servername="localhost";
$username="root";
$password="x1282940";
$dbname="myDB";
//创建连接
$conn=mysqli_connect($servername,$username,$password,$dbname);
//检测连接
if(!$conn){
	die("连接失败：".mysqli_error($conn));
}
$result=mysqli_query($conn,"SELECT * FROM runoobtab2
	WHERE runoob_age='50'");
echo "<table border='1'>";
if($result){
	while($row=mysqli_fetch_array($result,MYSQL_ASSOC))
	{
		echo "<tr><td>{$row['runoob_name']}</td>".
		"<td>{$row['runoob_age']}</td></tr>";
		echo "</table>";
	}
}else{
	echo "0 结果";
}
mysqli_free_result($result);
mysqli_close($conn);




//MySQL Order By 关键词

//实例选取 "Persons" 表中存储的所有数据，并根据 "Age" 列对结果进行排序：
$con=mysqli_connect("localhost","root","x1282940","myDB");
//检测连接
if(mysqli_connect_errno())
{
	echo "连接失败：".mysqli_connect_error();
}
$result=mysqli_query($con,"SELECT * FROM MyGuests
	ORDER BY age");
while($row=mysqli_fetch_array($result))
{
	echo $row['firstname'];
	echo " ".$row['lastname'];
	echo " ".$row['age'];
	echo "<br>";
}
mysqli_close($con);


//MySQL Update

//例子更新 "Persons" 表的一些数据
$conn=mysqli_connect("localhost","root","x1282940","myDB");
//检测连接
if(mysqli_connect_errno())
{
	echo "连接失败：".mysqli_connect_error();
}
//mysqli_query($conn,"UPDATE runoob_test SET runoob_author='菜鸟教程' WHERE runoob_count is null");
//echo "已更新";

$sql="SELECT runoob_author,runoob_count FROM runoob_test where runoob_count is not null";
$result=mysqli_query($conn,$sql);
echo "<table border='1'>";
if(mysqli_num_rows($result)>0){
	while($row=mysqli_fetch_array($result,MYSQL_ASSOC))
	{
		//在字符串中使用变量，请将变量置于花括号
		echo "<tr><td>{$row['runoob_author']}</td>".
		"<td>{$row['runoob_count']}</td>".
		"</tr>";
	}
}else{
	echo "0 结果";
}
echo "</table>";
mysqli_close($conn);



//MySQL Delete

//实例删除 "Persons" 表中所有 LastName='Griffin' 的记录
$con=mysqli_connect("localhost","root","x1282940","myDB");
//检测连接
if(mysqli_connect_errno())
{
	echo "连接失败：".mysqli_connect_error();
}
mysqli_query($con,"DROP TABLE runoobtab1;");
//mysqli_query($con,"DELETE FROM MyGuests WHERE age='10'");
//$sql="DELETE FROM runoobtab2 where runoob_id=5";
if(mysqli_query($con,$sql)){
	echo "已删除";
}else{
	echo "error creating database:".mysqli_error($con);
}

mysqli_close($con);



//数据库 ODBC

//ODBC 是一种应用程序编程接口（Application Programming Interface，API），使我们有能力连接到某个数据源（比如一个 MS Access 数据库）

//连接到 ODBC
$conn=odbc_connect('northwind','','');
$sql="SELECT * FROM customers";
$rs=odbc_exec($conn,$sql);

//取回记录
odbc_fetch_row($rs);

//从记录中取回字段
//下面的代码行从记录中返回第一个字段的值：
$compname=odbc_result($rs,1);
//下面的代码行返回名为 "CompanyName" 的字段的值：
$compname=odbc_result($rs,"CompanyName");

//关闭 ODBC 连接
odbc_close($conn);

//实例
//创建了到达名为 northwind 的 DSN 的连接，没有用户名和密码
$conn=odbc_connect("northwind",'','');
if(!$conn)
{
	exit("连接失败：".$conn);
}
//连接到 ODBC
$sql="SELECT * FROM customers";
$rs=odbc_exec($conn,$sql);
if(!$rs)
{
	exit("SQL语句错误");
}
echo "<table><tr>";
echo "<th>Companyname</th>";
echo "<th>Contactname</th></tr>";
while(odbc_fetch_row($rs))
{
	$compname=odbc_result($rs,"ContactName");
	$conname=odbc_result($rs,"ContactName");
	echo "<tr><td>$compname</td>";
	echo "<td>$conname</td></tr>";
}
echo_close($conn);
echo "</table>";





//MySQLi-面向过程 
$servername="localhost";
$username="root";
$password="x1282940";
$dbname="myDB";
//创建连接
$conn=mysqli_connect($servername,$username,$password,$dbname);
//检测连接
if(!$conn){
	die("Connection failed:".mysqli_connect_error());
}
mysqli_query($conn,"set names utf8");
mysqli_query($conn,"SET AUTOCOMMIT=0");//设置不自动提交 
mysqli_begin_transaction($conn);//开始事务定义

if(!mysqli_query($conn,"insert into runoob_tran(id) values(8)"))
{
	mysqli_query($conn,"ROLLBACK");
}
if(!mysqli_query($conn,"insert into runoob_tran(id) values(9)"))
{
	mysqli_query($conn,"ROLLBACK");
}

mysqli_commit($conn);//执行事务
mysqli_close($conn);
*/
$servername="localhost";
$username="root";
$password="x1282940";
$dbname="myDB";
//创建连接
$conn=mysqli_connect($servername,$username,$password,$dbname);
//检测连接
if(!$conn){
	die("Connection failed:".mysqli_connect_error());
}
mysqli_query($conn,"set names utf8");
$sql="insert into runoob_tbl(runoob_title)values(123);";
$sql_db="show tables;";
$result=mysqli_query($conn,$sql);
$result_db=mysqli_query($conn,$sql_db);
$count=($result?mysqli_affected_rows($conn):0);
echo $count."条数据被影响";
mysqli_close($conn);
?>