//生成九宫格

const Toolkit =require("../core/toolkit.js");
const Generator = require("../core/generator.js");
const Sudoku = require("../core/sudoku.js");
const Checker = require("../core/checker.js");

class Grid {
	constructor(container) {
		this._$container = container;
	}

	build(level) {
		//const generator = new Generator();
		//generator.generate();
		//matrix = generator.matrix;

		const sudoku = new Sudoku();
		sudoku.make(level);
		const matrix = sudoku.puzzleMatrix;

		const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
		const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

		const $cells = matrix.map(rowValues => rowValues.map((cellVlaue, colIndex) => {
			return $("<span>")
				.addClass(colGroupClasses[colIndex%3])
				.addClass(cellVlaue?"fixed":"empty")
				.text(cellVlaue);
		}));

		const $divArray = $cells.map(($spanArray, rowIndex) => {
			return $("<div>")
				.addClass('row')
				.addClass(rowGroupClasses[rowIndex%3])
				.append($spanArray);
		});

		this._$container.append($divArray);
	}

	layout() {
		const width = $("span:first", this._$container).width();
		$("span", this._$container)
			.height(width)
			.css({
				"line-height": `${width}px`,
				"font-size": width < 32? `${width/2}px`:""
			});
	}

	bindPopup(popupNumbers) {
		//使用事件代理，应为span是动态生成没有可能被撤销，但是container一直存在
		this._$container.on("click", "span", e=>{
			const $cell = $(e.target);
			if($cell.is(".fixed")) {
				return;
			}
			popupNumbers.popup($cell);
		})
	}

	/*
	*检查，正确显示成功，错误则标记出错误地方
	*/
	check() {
		const $rows = this._$container.children();
		const data = $rows.map((rowIndex, div) => {
			return $(div).children()
						 .map((colIndex, span) => parseInt($(span).text()) || 0);
		})
		.toArray()
		.map($data => $data.toArray());

		const checker = new Checker(data);

		if(checker.check()) {
			return true;
		}

		//检查不成功，将错误地方标记出来
		const marks = checker.matrixMarks;
		console.log(this._$container);
		this._$container.children()
			.each((rowIndex, div) => {
				$(div).children().each((colIndex, span) => {
					const $span = $(span);
					if($span.is(".fixed") || marks[rowIndex][colIndex]) {
						$span.removeClass("error");
					} else {
						$span.addClass("error");
					}
				});
			});

	}

	/*
	*重置一开始的状态
	*/
	reset() {
		this._$container.find("span:not(.fixed)")
			.removeClass("error mark1 mark2")
			.text(0)
			.addClass("empty");
	}

	/*
	*清楚过程中的标记
	*/
	clear() {
		this._$container.find("span.error")
			.removeClass("error");
	}

	/*
	*重新开局
	*/
	rebuild(level) {
		this._$container.empty();
		this.build(level);
		this.layout();
	}

}

module.exports = Grid;