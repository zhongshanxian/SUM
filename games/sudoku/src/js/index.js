const Grid = require("./ui/grid.js");
const PopupNumbers = require("./ui/popupNumbers.js");
const grid = new Grid($("#container"));

$("#submit").click(function() {
	$("#container").empty();
	level = $("#level").val();
	console.log(level);
	grid.build(level);
	grid.layout();
});


const popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);

$("#check").on("click", e => {
	if(grid.check()) {
		alert("挑战成功！");
	}
});

$("#reset").on("click", e => {
	grid.reset();
});

$("#clear").on("click", e => {
	grid.clear();
});

$("#rebuild").on("click", e => {
	grid.rebuild(level);
});


console.log("gulp watch ...");

//const arr = Array.from({length:9}, (v, index)=>index+1);
//console.log(toolkit.shuffle(arr));