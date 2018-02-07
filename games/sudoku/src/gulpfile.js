const gulp = require("gulp");


//利用webpack转译JavaScript
gulp.task("webpack", () => {
	const webpack = require("webpack-stream");
	const config = require("./webpack.config.js");
	gulp.src("./js/**/*.js")
		.pipe(webpack(config))
		.pipe(gulp.dest("../www/js"));
});

//利用gulp-less编译less->css
gulp.task("less", () => {
	const less = require("gulp-less");
	gulp.src("./less/*.less")
		.pipe(less())
		.pipe(gulp.dest("../www/css"));
});

//定义一个主任务，执行webpack和less任务
gulp.task("default", ["webpack", "less"]);

//热更新
gulp.task("watch", () => {
	gulp.watch("./less/**/*.less", ["less"]);
	gulp.watch("./js/**/*.js", ["webpack"]);
})