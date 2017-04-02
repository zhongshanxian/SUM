window.onload=function(){//有些节点需要当页面完全加载好之后才出现，所以为了调用节点，最好设置onload
	var btn=document.getElementById('btn');//获取登录按钮

	btn.onclick=function(){
			var sheight=document.documentElement.scrollHeight;//获取页面的宽高
			var swidth=document.documentElement.scrollWidth;

			var cheight=document.documentElement.clientHeight;//获取可视高度，可是宽度与swidth一样

			var omask=document.createElement('div');//创建div
			omask.id="mask";
			omask.style.height=sheight+"px";
			omask.style.width=swidth+"px";
			document.body.appendChild(omask);

			var ologin=document.createElement('div');
			ologin.id="login";
			ologin.innerHTML="<div class='loginCon'><div id='close'>X</div>账号：<input type='text' name='zhanghao' placeholder='请输入您的账号'><br /><br />密码：<input type='text' name='mima' placeholder='请输入您的密码'><br /><br /><button>登录</button></div>";
			document.body.appendChild(ologin);

			var lheight=ologin.offsetHeight;//获取login的宽高
			var lwidth=ologin.offsetWidth;

			ologin.style.left=(swidth-lwidth)/2+"px";//放在中间
			ologin.style.top=(cheight-lheight)/2+"px";

			var oclose=document.getElementById('close');
			omask.onclick=oclose.onclick=function(){//可以使用连等
				document.body.removeChild(omask);
				document.body.removeChild(ologin);
			};
	};
};