//工具集

/*
*矩阵方法
*/
const matrixToolkit = {
	//游戏算法：Fisher-yates洗牌算法
	//012345678
	//指向第0，从0-8随机选取一个5，则0和5交换，其他顺序不变
	//512340678
	//指向第1，如此递归直至指向第8
	/*
	* Fisher-Yates算法
	*/
	shuffle(array) {
		const endIndex = array.length - 2;//因为最后一个index已经必然确定，不需要在考虑
		for(var i=0; i<=endIndex; i++) {
			const j = i + Math.floor( Math.random() * (array.length - i) );
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	},

	makeRow(v=0) {
		const array = new Array(9);
		array.fill(v);
		return array;
		/*
		const array = Array.from({length:9}, (v, index)=>index+1);
		return this.shuffle(array);
		*/
	},
	makeMatrix(v=0) {
		return Array.from({length:9}).map(()=>this.makeRow(v));
		//Array.from([1, 2, 3], x => x + x); 
		//return Array.from({length:9}, ()=>makeRow(v));
	},

	/*
	*检查某个位置可以填n
	*/
	checkFillable(matrix, n, rowIndex, colIndex) {
		const row = matrix[rowIndex];
		const column = this.makeRow().map((v, index) => matrix[index][colIndex]);
		const { boxIndex } = boxToolkit.convertToBoxIndex(rowIndex, colIndex);
		const box = boxToolkit.getBoxCells(matrix, boxIndex);
		for(let i=0; i<9; i++) {
			if(row[i] === n || column[i] === n || box[i] === n) {
				return false;
			}
		}
		return true;
	}

};

/*
*宫坐标系工具
*/
const boxToolkit = {
	convertToBoxIndex(rowIndex, colIndex) {
		return {
			boxIndex: Math.floor(rowIndex/3) * 3 + Math.floor(colIndex/3),
			cellIndex: rowIndex % 3 * 3 + colIndex % 3
		};
	},

	convertFromBoxIndex(boxIndex, cellIndex) {
		return {
			rowIndex: Math.floor(boxIndex/3) * 3 + Math.floor(cellIndex/3),
			colIndex: boxIndex % 3 * 3 + cellIndex % 3
		};
	},

	getBoxCells(matrix, boxIndex) {
		const startRowIndex = Math.floor(boxIndex/3) * 3;
		const startColIndex = boxIndex % 3 * 3;
		const result = [];
		for(let cellIndex=0; cellIndex<9; cellIndex++) {
			const rowIndex = startRowIndex + Math.floor(cellIndex/3);
			const colIndex = startColIndex + cellIndex % 3;
			result.push(matrix[rowIndex][colIndex]);
		}

		return result;
	}
};

module.exports = class toolkit {
	//矩阵和数组相关的坐标系、
	static get matrix() {
		return matrixToolkit;
	}

	//宫坐标系相关的工具
	static get box() {
		return boxToolkit;
	}
};