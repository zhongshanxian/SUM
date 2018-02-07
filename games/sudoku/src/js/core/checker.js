//检查数独解决方案
const Toolkit = require("./toolkit.js");
const Generator = require("./generator.js");


function checkArray(array) {
	const length = array.length;
	const marks = new Array(length);
	marks.fill(true);

	for(let i=0; i<length; i++) {
		if(!marks[i]) {
			continue;
		}

		const v = array[i];

		//是否有效，把0标记成无效
		if(!v) {
			marks[i] = false;
			continue;
		}

		//是否有重复
		for(let j=i+1; j<length-1; j++) {
			if(v===array[j]) {
				marks[i] = array[j] = false;
			}
		}
	}

	return marks;
}

/*
*输入9*9二维数组
*对matrix进行检查
*检查是否成功以及marks
*/
class Checker {
	constructor(matrix) {
		this._matrix = matrix;
		this._matrixMarks = Toolkit.matrix.makeMatrix(true);
	}

	get matrixMarks() {
		return this._matrixMarks;
	}

	get isSuccess() {
		return this._success;
	}

	check() {
		this.checkRows();
		this.checkCols();
		this.checkBoxes();

		//检查是否成功
		//every方法对 数组中的每个元素都执行一个操作，记录执行该操作的true or false，整体返回一个true or false
		this._success = this._matrixMarks.every(row => row.every(mark => mark));

		return this._success;
	}

	checkRows() {
		for(let rowIndex=0; rowIndex<9; rowIndex++) {
			const row = this._matrix[rowIndex];
			const marks = checkArray(row);

			for(let colIndex=0; colIndex<marks.length; colIndex++) {
				if(!marks[colIndex]) {
					this._matrixMarks[rowIndex][colIndex] = false;
				}
			}
		}
	}

	checkCols() {
		for(let colIndex=0; colIndex<9; colIndex++) {
			const col =[];
			for(let rowIndex=0; rowIndex<9; rowIndex++) {
				col[rowIndex] = this._matrix[rowIndex][colIndex];
			}

			const marks = checkArray(col);
			for(let rowIndex=0; rowIndex<marks.length; rowIndex++) {
				if(!marks[rowIndex]) {
					this._matrixMarks[rowIndex][colIndex] = false;
				}
			}
		}
	}

	checkBoxes() {
		for(let boxIndex=0; boxIndex<9; boxIndex++) {
			const boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
			const marks = checkArray(boxes);
			for(let cellIdenx=0; cellIdenx<9; cellIdenx++) {
				if(!marks[cellIdenx]) {
					const {rowIndex, colIndex} = Toolkit.box.convertFromBoxIndex(boxIndex, cellIdenx);
					this._matrixMarks[rowIndex][colIndex] = false;
				}
			}
		}
	}
}


module.exports = Checker;