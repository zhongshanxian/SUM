//生成数独游戏

const Generator = require("./generator.js");

class Sudoku {
	constructor() {
		//生成完成的解决方案
		const generator = new Generator();
		generator.generate();
		this.solutionMatrix = generator.matrix;
	}

	make(level = 5) {
		this.puzzleMatrix = this.solutionMatrix.map(row => {
			return row.map(cell => Math.random()*9<level?0:cell);
		});
	}
}

module.exports = Sudoku;


