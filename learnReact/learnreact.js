function formatName(user) {
	return user.firstName + ' ' +user.lastName;
}

function getGreeting(user) {
	if(user) {
		return <h1>Hello, {formatName(user)}!</h1>;
	}
	return <h1>Hello, Strange.</h1>;
}

//函数式组件；组件名称总是以大写字母开始
function Welcome(props) {
	return <h1>zhong shan {props.name}!</h1>;
}

//函数式组件；
function App(){
	return (
		//组件必须返回一个单独的根元素,使用一个顶层div
		<div>
			<Welcome name="xian" />
			<Welcome name="xian" />
			<Welcome name="xian" />
		</div>
	);
}

//函数式组件；
function Avatar(props) {
	//props=>user={props.author}
	return (
		<img className="Avatar"
			src={props.user.avatarUrl}
			alt={props.user.name}
		/>
	)
}

//函数式组件；
function UserInfo(props) {
	return (
		<div className="UserInfo">
			<Avatar user={props.author} />
			<div className="UserInfo-name">
				{props.user.name}
			</div>
		</div>
	);
}

//函数式组件；
function Comment(props) {
	//props.author=>{avatarUrl,name}
	return (
		<div className="Comment">
			<UserInfo user={props.author} />
			<div className="Comment-text">
				{props.text}
			</div>
			<div className="Comment-date">
				{formatDate(props.date)}
			</div>
		</div>
	);
}

//函数式组件
/*
function Clock(props) {
	return (
		<div>
			<h1>It is {props.date.toLocaleTimeString()}!!</h1>
		</div>
	);
}
*/

//类组件;允许在其中添加本地状态和生命周期钩子
class Clock extends React.Component {
	// 添加一个 类构造函数(class constructor) 初始化 this.state
	constructor(props) {
		super(props);
		this.state={date:new Date()};//初始化
	}

	//componentDidMount() 钩子在组件输出被渲染到 DOM 之后运行
	componentDidMount(){
		this.timerID = setInterval(
			() => this.tick(),1000//每一秒执行一次tick方法
		);
	}

	/*
	componentDidMount() {
		fetchPosts().then(response => {
			this.setState({
				ports: response.posts
			});
		});

		fetchComments().then(response => {
			this.setState({
				comment: response.comments
			});
		});
	}
	*/

	//componentWillUnmount() 钩子在组件卸载后运行
	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		//不要直接修改 state(状态) 错误=>this.state.comment = 'Hello';
		//而要通过 setState() 方法并传递一个包含当前时间的对象来安排一个 UI 的更新
		this.setState({
			date:new Date(),
			comment: 'hello'
		});
	}
	//替换 render() 方法中的 this.props.date 为 this.state.date
	//state(状态)的变化, 随即再次调用 render() 方法
	render() {
		return (
			<div>
				<h1>It is {this.state.date.toLocaleTimeString()}!!</h1>
			</div>
		);
	}
}

class Toggle extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isToggleOn: true};

		//这个绑定是必要的，使`this`在回调中起作用
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(){
		this.setState(prevState => ({
			isToggleOn: !prevState.isToggleOn
		}));
	}
	render() {
		//引用一个后面没跟 () 的方法,就应该 绑定(bind) 该方法
		return (
			<button onClick={this.handleClick}>
				{this.state.isToggleOn?'ON':'OFF'}
			</button>
		);
	}
}

function UserGreeting(props) {
	return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
	return <h1>Please sign up.</h1>;
}

function Greeting(props) {
	const isLoggedIn = props.isLoggedIn;
	if(isLoggedIn) {
		return <UserGreeting />;
	}
	return <GuestGreeting />;
}

function LoginButton(props) {
	return (
		<button onClick={props.onClick}>
			login
		</button>
	);
}

function LogoutButton(props) {
	return (
		<button onClick={props.onClick}>
			Logout
		</button>
	);			
}

//类组件
class LoginControl extends React.Component {
	constructor(props) {
		super(props);
		this.handleLoginClick = this.handleLoginClick.bind(this);
		this.handleLogoutClick = this.handleLogoutClick.bind(this);
		this.state = {isLoggedIn:false};
	}

	handleLoginClick() {
		this.setState({isLoggedIn:true});
	}
	handleLogoutClick() {
		this.setState({isLoggedIn:false});
	}

	render(){
		const isLoggedIn= this.state.isLoggedIn;

		let button = null;
		if(isLoggedIn) {
			button = <LogoutButton onClick={this.handleLogoutClick} />;
		}else {
			button = <LoginButton onClick={this.handleLoginClick} />;
		}

		return (
			<div>
				<Greeting isLoggedIn={isLoggedIn} />
				{button}
			</div>

			/*
			<div>
				The user is <b>{isLoggedIn? 'currently':'not'}</b> logged in.
				{isLoggedIn ? (
					<LogoutButton onClick={this.handleLogoutClick} />
				):(
					<LoginButton onClick={this.handleLoginClick} />
				)}
			</div>
			*/
		);
	}
}
function Mailbox(props) {
	const unreadMessages = props.unreadMessages;
	return (
		<div>
			<h1>Hello!</h1>
			{
				//true && expression 总是会评估为 expression ，而 false && expression 总是执行为 false
				unreadMessages.length>0 && 
				<h2>
					You have {unreadMessages.length} unread messages.
				</h2>
			}
		</div>
	);
}

function WarningBanner(props) {
	if(!props.warn) {
		return null;
	}
	return (
		<div className='warning'>
			Warning!!!
		</div>
	);
}

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {showWarning:true}
		this.handleToggleClick = this.handleToggleClick.bind(this);
	}
	handleToggleClick() {
		this.setState(prevState => ({
			showWarning:!prevState.showWarning
		}));
	}
	render(){
		return (
			<div>
				<WarningBanner warn={this.state.showWarning} />
				<button onClick={this.handleToggleClick}>
					{this.state.showWarning ?'hide':'show'}
				</button>
			</div>
		);
	}
}

function NumberList(props) {
	const numbers = props.numbers;
	const listItems = numbers.map((number) =>
		//缺少key会报错；元素中调用 map() 需要 keys
		<li key={number.toString()}>{number}</li>
	);
	return (
		<ul>{listItems}</ul>
	);
}

function Blog(props) {
	const sidebar = (
		<ul>
			{props.posts.map((post) =>
				<li key={post.id}>
					{post.title}
				</li>
			)}
		</ul>
	);
	const content = props.posts.map((post) =>
		<div key={post.id}>
			<h3>{post.title}</h3>
			<p>{post.content}</p>
		</div>
	);
	return (
		<div>
			{sidebar}
			<hr />
			{content}
		</div>
	);
}

class ProductCategoryRow extends React.Component {
	render() {
		return (
			<tr>
				<th colSpan='2'>
					{this.props.category}
				</th>
			</tr>
		);
	}
}

class ProductRow extends React.Component {
	render () {
		var name = this.props.product.stocked ?
			this.props.product.name:
			<span style={{color:'red'}}>
				{this.props.product.name}
			</span>
		return (
			<tr>
				<td>{name}</td>
				<td>{this.props.product.price}</td>
			</tr>
		);
	}
}

class ProductTable extends React.Component {
	render() {
		var rows = [];
		var lastCategory = null;
		this.props.products.forEach((product)=> {
			if(product.name.indexOf(this.props.filterText) === -1||(!product.stocked &&
				this.props.inStockOnly)) {
				return ;
			}
			if(product.category !==lastCategory) {
				rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
			}
			rows.push(<ProductRow product={product} key={product.name} />);
			lastCategory = product.category;
		});
		return (
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		);
	}
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleFilterTextInputChange=  this.handleFilterTextInputChange.bind(this);
		this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
	}

	handleFilterTextInputChange(event) {
		this.props.onFilterTextInput(event.target.value);
	}
	handleInStockInputChange(event) {
		this.props.onInStockInput(event.target.checked);
	}

	render() {
		return (
			<form>
				<input 
					type='text'
					placeholder='Search...'
					value={this.props.filterText}
					onChange={this.handleFilterTextInputChange}
				/>
				<p>
					<input
						type='checkbox'
						checked={this.propsinStockOnly}
						onChange={this.handleInStockInputChange}
					/>
					{''}
					Only show products in stock
				</p>
			</form>
		);
	}
}

class FilterableProductTable extends React.Component {
	constructor(props) {
		super(props);
		this.state  = {filterText:'',inStockOnly:false};
		this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
		this.handleInStockInput = this.handleInStockInput.bind(this);
	}

	handleFilterTextInput(filterText) {
		this.setState({
			filterText: filterText
		});
	}
	handleInStockInput(inStockOnly) {
		this.setState({
			inStockOnly: inStockOnly
		});
	}
	render(){
		return (
			<div>
				<SearchBar
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly}
					onFilterTextInput={this.handleFilterTextInput}
					onInStockInput={this.handleInStockInput}
				/>
				<ProductTable
					products={this.props.products}
					filterText={this.state.filterText}
					inStockOnly={this.state.inStockOnly}
				/>
			</div>
		);
	}
}



const user = {
	firstName: 'Harper',
	lastName: 'Perez',
	url: 'http://imgcdn.tigerfishnet.com/skin/huyu/images/20170822/service_ds5.jpg'
};

const user1 = null;

const messages = ['React','Re:React','Re:Re:React'];

const numbers = [1,2,3,4,5];

const posts = [
	{id:1,title: 'Hello World', content: 'Welcome to learning React!'},
	{id:2,title: 'Installation', content: 'You can install React from npm!'}
];

const PRODUCTS = [
	{category:'Sporting Goods', price:'$49.99', stocked:true, name:'Football'},
	{category:'Sporting Goods', price:'$9.99', stocked:true, name:'Baseball'},
	{category:'Sporting Goods', price:'$29.99', stocked:false, name:'Basketball'},
	{category:'Electronics', price:'$99.99', stocked:true, name:'iPod Touch'},
	{category:'Electronics', price:'$399.99', stocked:false, name:'iPhone 5'},
	{category:'Electronics', price:'$199.99', stocked:true, name:'Nexus 7'}
];
/*
const element = (
	<div>
		<Clock />
		<Clock />
		<Clock />
	</div>
);

const element = (
	<div>
	    <div tabindex="0">
			{getGreeting(user)}
		</div>
		<img src={user.url}></img>
	</div>
);
*/

ReactDOM.render(
	<FilterableProductTable products={PRODUCTS} />,
	document.getElementById("root")
);