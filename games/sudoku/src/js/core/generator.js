//生成数独解决方案
const Toolkit = require("./toolkit.js");

class Generator {
	generate() {
		while(!this.internalGenerate()) {
			
		}
	}

	internalGenerate() {
		this.matrix = Toolkit.matrix.makeMatrix();
		this.orders = Toolkit.matrix.makeMatrix()
			.map(row => row.map((v, index) => index))
			.map(row => Toolkit.matrix.shuffle(row));

 		for(let n=1; n<=9; n++) {
			if(!this.fillNumber(n)) {
				return false;
			}
		}
		return true;
	}

	fillNumber(n) {
		return this.fillRow(n, 0);
	}

	fillRow(n, rowIndex) {
		if(rowIndex>8) {
			return true;//成功结束
		}

		const row = this.matrix[rowIndex];//取行数据

		//随机选择列
		const orders = this.orders[rowIndex];//orders中每一行已经使用洗牌算法

		for(let i=0; i<9; i++) {
			const colIndex = orders[i];//此时，orders中可能有多行，相同的列位置数字一样后面还要判断
			if(row[colIndex]) {
				continue;//如果这个位置有值，则跳过
			}

			//检查这个位置是否可以填n
			if(!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
				continue;//不能在此位置填写，则寻找下一个位置
			}

			row[colIndex] = n;

			//递归调用fillRow填写下一行
			if(!this.fillRow(n, rowIndex+1)) {//如果填写出错，则需要恢复，且继续寻找下一个位置
				row[colIndex] = 0;
				continue;
			}

			return true;
		}
		return false;
	}
}

module.exports = Generator;