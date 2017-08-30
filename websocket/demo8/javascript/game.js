var game = function() {
	//dom元素
	var gameDiv;
	var nextDiv;

	//游戏矩阵
	var gameData = [
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,2,0,0],
		[0,0,0,0,0,0,0,2,0,0],
		[0,0,0,0,0,0,0,2,0,0],
		[0,0,0,0,0,0,0,2,0,0],
		[0,0,0,0,1,1,1,1,0,0]
	];

	//divs
	var nextDivs = [];
	var gameDivs = [];

	//初始化div
	var initDiv = function (container, data, divs) {
		for(var i=0;i<data.length;i++) {
			var div =[];
			for (var j=0;j<data[0].length;j++) {
				var newNode = document.createElement('div');
				newNode.className = 'none';
				newNode.style.top=(i*20)+'px';
				newNode.style.left=(j*20)+'px';
				container.appendChild(newNode);
				div.push(newNode);
			}
			divs.push(div);
		}
	}

	//刷新div
	var refreshDiv = function(data, divs){
		for(var i=0;i<data.length;i++) {
			for(var j=0;j<data[0].length;j++) {
				if(data[i][j] == 0) {
					divs[i][j].className = 'none';
				} else if(data[i][j] == 1) {
					divs[i][j].className = 'done';
				} else if(data[i][j] == 2) {
					divs[i][j].className = 'current';
				}
			}
		}
	}
}