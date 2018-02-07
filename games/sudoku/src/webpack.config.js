module.exports = {
	entry: {
		index: "./js/index.js"
	},
	output: {
		filename: "[name].js"
	},
	devtool: "source-map",//跟踪源文件哪个地方出错
	resolve: {
		extensions: [".js"] //自动解析某些扩展,这是用户在导入时可以忽略扩展名的原因(当用户import一个文件夹，如果有这个语句，这回自动解析js文件)
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [{
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"]
					}
				}]
			}
		]
	}
}