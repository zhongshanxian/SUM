/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//工具集

/*
*矩阵方法
*/
var matrixToolkit = {
  //游戏算法：Fisher-yates洗牌算法
  //012345678
  //指向第0，从0-8随机选取一个5，则0和5交换，其他顺序不变
  //512340678
  //指向第1，如此递归直至指向第8

  /*
  * Fisher-Yates算法
  */
  shuffle: function shuffle(array) {
    var endIndex = array.length - 2; //因为最后一个index已经必然确定，不需要在考虑

    for (var i = 0; i <= endIndex; i++) {
      var j = i + Math.floor(Math.random() * (array.length - i));
      var _ref = [array[j], array[i]];
      array[i] = _ref[0];
      array[j] = _ref[1];
    }

    return array;
  },
  makeRow: function makeRow() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var array = new Array(9);
    array.fill(v);
    return array;
    /*
    const array = Array.from({length:9}, (v, index)=>index+1);
    return this.shuffle(array);
    */
  },
  makeMatrix: function makeMatrix() {
    var _this = this;

    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return Array.from({
      length: 9
    }).map(function () {
      return _this.makeRow(v);
    }); //Array.from([1, 2, 3], x => x + x); 
    //return Array.from({length:9}, ()=>makeRow(v));
  },

  /*
  *检查某个位置可以填n
  */
  checkFillable: function checkFillable(matrix, n, rowIndex, colIndex) {
    var row = matrix[rowIndex];
    var column = this.makeRow().map(function (v, index) {
      return matrix[index][colIndex];
    });

    var _boxToolkit$convertTo = boxToolkit.convertToBoxIndex(rowIndex, colIndex),
        boxIndex = _boxToolkit$convertTo.boxIndex;

    var box = boxToolkit.getBoxCells(matrix, boxIndex);

    for (var i = 0; i < 9; i++) {
      if (row[i] === n || column[i] === n || box[i] === n) {
        return false;
      }
    }

    return true;
  }
};
/*
*宫坐标系工具
*/

var boxToolkit = {
  convertToBoxIndex: function convertToBoxIndex(rowIndex, colIndex) {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: rowIndex % 3 * 3 + colIndex % 3
    };
  },
  convertFromBoxIndex: function convertFromBoxIndex(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: boxIndex % 3 * 3 + cellIndex % 3
    };
  },
  getBoxCells: function getBoxCells(matrix, boxIndex) {
    var startRowIndex = Math.floor(boxIndex / 3) * 3;
    var startColIndex = boxIndex % 3 * 3;
    var result = [];

    for (var cellIndex = 0; cellIndex < 9; cellIndex++) {
      var rowIndex = startRowIndex + Math.floor(cellIndex / 3);
      var colIndex = startColIndex + cellIndex % 3;
      result.push(matrix[rowIndex][colIndex]);
    }

    return result;
  }
};

module.exports =
/*#__PURE__*/
function () {
  function toolkit() {
    _classCallCheck(this, toolkit);
  }

  _createClass(toolkit, null, [{
    key: "matrix",
    //矩阵和数组相关的坐标系、
    get: function get() {
      return matrixToolkit;
    } //宫坐标系相关的工具

  }, {
    key: "box",
    get: function get() {
      return boxToolkit;
    }
  }]);

  return toolkit;
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//生成数独解决方案
var Toolkit = __webpack_require__(0);

var Generator =
/*#__PURE__*/
function () {
  function Generator() {
    _classCallCheck(this, Generator);
  }

  _createClass(Generator, [{
    key: "generate",
    value: function generate() {
      while (!this.internalGenerate()) {}
    }
  }, {
    key: "internalGenerate",
    value: function internalGenerate() {
      this.matrix = Toolkit.matrix.makeMatrix();
      this.orders = Toolkit.matrix.makeMatrix().map(function (row) {
        return row.map(function (v, index) {
          return index;
        });
      }).map(function (row) {
        return Toolkit.matrix.shuffle(row);
      });

      for (var n = 1; n <= 9; n++) {
        if (!this.fillNumber(n)) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "fillNumber",
    value: function fillNumber(n) {
      return this.fillRow(n, 0);
    }
  }, {
    key: "fillRow",
    value: function fillRow(n, rowIndex) {
      if (rowIndex > 8) {
        return true; //成功结束
      }

      var row = this.matrix[rowIndex]; //取行数据
      //随机选择列

      var orders = this.orders[rowIndex]; //orders中每一行已经使用洗牌算法

      for (var i = 0; i < 9; i++) {
        var colIndex = orders[i]; //此时，orders中可能有多行，相同的列位置数字一样后面还要判断

        if (row[colIndex]) {
          continue; //如果这个位置有值，则跳过
        } //检查这个位置是否可以填n


        if (!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex)) {
          continue; //不能在此位置填写，则寻找下一个位置
        }

        row[colIndex] = n; //递归调用fillRow填写下一行

        if (!this.fillRow(n, rowIndex + 1)) {
          //如果填写出错，则需要恢复，且继续寻找下一个位置
          row[colIndex] = 0;
          continue;
        }

        return true;
      }

      return false;
    }
  }]);

  return Generator;
}();

module.exports = Generator;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var Grid = __webpack_require__(3);

var PopupNumbers = __webpack_require__(6);

var grid = new Grid($("#container"));
$("#submit").click(function () {
  $("#container").empty();
  level = $("#level").val();
  console.log(level);
  grid.build(level);
  grid.layout();
});
var popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);
$("#check").on("click", function (e) {
  if (grid.check()) {
    alert("挑战成功！");
  }
});
$("#reset").on("click", function (e) {
  grid.reset();
});
$("#clear").on("click", function (e) {
  grid.clear();
});
$("#rebuild").on("click", function (e) {
  grid.rebuild(level);
});
console.log("gulp watch ..."); //const arr = Array.from({length:9}, (v, index)=>index+1);
//console.log(toolkit.shuffle(arr));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//生成九宫格
var Toolkit = __webpack_require__(0);

var Generator = __webpack_require__(1);

var Sudoku = __webpack_require__(4);

var Checker = __webpack_require__(5);

var Grid =
/*#__PURE__*/
function () {
  function Grid(container) {
    _classCallCheck(this, Grid);

    this._$container = container;
  }

  _createClass(Grid, [{
    key: "build",
    value: function build(level) {
      //const generator = new Generator();
      //generator.generate();
      //matrix = generator.matrix;
      var sudoku = new Sudoku();
      sudoku.make(level);
      var matrix = sudoku.puzzleMatrix;
      var rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
      var colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];
      var $cells = matrix.map(function (rowValues) {
        return rowValues.map(function (cellVlaue, colIndex) {
          return $("<span>").addClass(colGroupClasses[colIndex % 3]).addClass(cellVlaue ? "fixed" : "empty").text(cellVlaue);
        });
      });
      var $divArray = $cells.map(function ($spanArray, rowIndex) {
        return $("<div>").addClass('row').addClass(rowGroupClasses[rowIndex % 3]).append($spanArray);
      });

      this._$container.append($divArray);
    }
  }, {
    key: "layout",
    value: function layout() {
      var width = $("span:first", this._$container).width();
      $("span", this._$container).height(width).css({
        "line-height": "".concat(width, "px"),
        "font-size": width < 32 ? "".concat(width / 2, "px") : ""
      });
    }
  }, {
    key: "bindPopup",
    value: function bindPopup(popupNumbers) {
      //使用事件代理，应为span是动态生成没有可能被撤销，但是container一直存在
      this._$container.on("click", "span", function (e) {
        var $cell = $(e.target);

        if ($cell.is(".fixed")) {
          return;
        }

        popupNumbers.popup($cell);
      });
    }
    /*
    *检查，正确显示成功，错误则标记出错误地方
    */

  }, {
    key: "check",
    value: function check() {
      var $rows = this._$container.children();

      var data = $rows.map(function (rowIndex, div) {
        return $(div).children().map(function (colIndex, span) {
          return parseInt($(span).text()) || 0;
        });
      }).toArray().map(function ($data) {
        return $data.toArray();
      });
      var checker = new Checker(data);

      if (checker.check()) {
        return true;
      } //检查不成功，将错误地方标记出来


      var marks = checker.matrixMarks;
      console.log(this._$container);

      this._$container.children().each(function (rowIndex, div) {
        $(div).children().each(function (colIndex, span) {
          var $span = $(span);

          if ($span.is(".fixed") || marks[rowIndex][colIndex]) {
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

  }, {
    key: "reset",
    value: function reset() {
      this._$container.find("span:not(.fixed)").removeClass("error mark1 mark2").text(0).addClass("empty");
    }
    /*
    *清楚过程中的标记
    */

  }, {
    key: "clear",
    value: function clear() {
      this._$container.find("span.error").removeClass("error");
    }
    /*
    *重新开局
    */

  }, {
    key: "rebuild",
    value: function rebuild(level) {
      this._$container.empty();

      this.build(level);
      this.layout();
    }
  }]);

  return Grid;
}();

module.exports = Grid;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//生成数独游戏
var Generator = __webpack_require__(1);

var Sudoku =
/*#__PURE__*/
function () {
  function Sudoku() {
    _classCallCheck(this, Sudoku);

    //生成完成的解决方案
    var generator = new Generator();
    generator.generate();
    this.solutionMatrix = generator.matrix;
  }

  _createClass(Sudoku, [{
    key: "make",
    value: function make() {
      var level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
      this.puzzleMatrix = this.solutionMatrix.map(function (row) {
        return row.map(function (cell) {
          return Math.random() * 9 < level ? 0 : cell;
        });
      });
    }
  }]);

  return Sudoku;
}();

module.exports = Sudoku;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//检查数独解决方案
var Toolkit = __webpack_require__(0);

var Generator = __webpack_require__(1);

function checkArray(array) {
  var length = array.length;
  var marks = new Array(length);
  marks.fill(true);

  for (var i = 0; i < length; i++) {
    if (!marks[i]) {
      continue;
    }

    var v = array[i]; //是否有效，把0标记成无效

    if (!v) {
      marks[i] = false;
      continue;
    } //是否有重复


    for (var j = i + 1; j < length - 1; j++) {
      if (v === array[j]) {
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


var Checker =
/*#__PURE__*/
function () {
  function Checker(matrix) {
    _classCallCheck(this, Checker);

    this._matrix = matrix;
    this._matrixMarks = Toolkit.matrix.makeMatrix(true);
  }

  _createClass(Checker, [{
    key: "check",
    value: function check() {
      this.checkRows();
      this.checkCols();
      this.checkBoxes(); //检查是否成功
      //every方法对 数组中的每个元素都执行一个操作，记录执行该操作的true or false，整体返回一个true or false

      this._success = this._matrixMarks.every(function (row) {
        return row.every(function (mark) {
          return mark;
        });
      });
      return this._success;
    }
  }, {
    key: "checkRows",
    value: function checkRows() {
      for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
        var row = this._matrix[rowIndex];
        var marks = checkArray(row);

        for (var colIndex = 0; colIndex < marks.length; colIndex++) {
          if (!marks[colIndex]) {
            this._matrixMarks[rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: "checkCols",
    value: function checkCols() {
      for (var colIndex = 0; colIndex < 9; colIndex++) {
        var col = [];

        for (var rowIndex = 0; rowIndex < 9; rowIndex++) {
          col[rowIndex] = this._matrix[rowIndex][colIndex];
        }

        var marks = checkArray(col);

        for (var _rowIndex = 0; _rowIndex < marks.length; _rowIndex++) {
          if (!marks[_rowIndex]) {
            this._matrixMarks[_rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: "checkBoxes",
    value: function checkBoxes() {
      for (var boxIndex = 0; boxIndex < 9; boxIndex++) {
        var boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex);
        var marks = checkArray(boxes);

        for (var cellIdenx = 0; cellIdenx < 9; cellIdenx++) {
          if (!marks[cellIdenx]) {
            var _Toolkit$box$convertF = Toolkit.box.convertFromBoxIndex(boxIndex, cellIdenx),
                rowIndex = _Toolkit$box$convertF.rowIndex,
                colIndex = _Toolkit$box$convertF.colIndex;

            this._matrixMarks[rowIndex][colIndex] = false;
          }
        }
      }
    }
  }, {
    key: "matrixMarks",
    get: function get() {
      return this._matrixMarks;
    }
  }, {
    key: "isSuccess",
    get: function get() {
      return this._success;
    }
  }]);

  return Checker;
}();

module.exports = Checker;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//处理弹出的操作面板
var PopupNumbers =
/*#__PURE__*/
function () {
  function PopupNumbers($panel) {
    var _this = this;

    _classCallCheck(this, PopupNumbers);

    this._$panel = $panel.hide().removeClass("hidden");

    this._$panel.on("click", "span", function (e) {
      var $cell = _this._$targetCell;
      var $span = $(e.target); //点击填充样式

      if ($span.hasClass("mark1")) {
        if ($cell.hasClass("mark1")) {
          $cell.removeClass("mark1");
        } else {
          $cell.removeClass("mark2");
          $cell.addClass("mark1");
        }

        _this._$panel.hide();

        return;
      }

      if ($span.hasClass("mark2")) {
        if ($cell.hasClass("mark2")) {
          $cell.removeClass("mark2");
        } else {
          $cell.removeClass("mark1");
          $cell.addClass("mark2");
        }

        _this._$panel.hide();

        return;
      } //点击取消填写


      if ($span.hasClass("empty")) {
        $cell.text(0).addClass("empty").removeClass("mark1").removeClass("mark2");

        _this._$panel.hide();

        return;
      } //点击填写1-9


      $cell.removeClass("empty").text($span.text());

      _this._$panel.hide();
    });
  }

  _createClass(PopupNumbers, [{
    key: "popup",
    value: function popup($cell) {
      this._$targetCell = $cell;

      var _$cell$position = $cell.position(),
          left = _$cell$position.left,
          top = _$cell$position.top;

      this._$panel.css({
        left: left > $(document.body).width() * 0.625 ? "".concat(left - 125, "px") : "".concat(left, "px"),
        top: "".concat(top, "px")
      }).show();
    }
  }]);

  return PopupNumbers;
}();

module.exports = PopupNumbers;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map