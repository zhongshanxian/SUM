var htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		path:path.resolve(__dirname, 'dist'),
		filename: 'js/[name].bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				options: {
					'presets': ['env']
				},
				/*exclude: path.resolve(__dirname , 'node_modules'),
				include: path.resolve(__dirname , 'src')*/
				exclude: __dirname + './node_modules/',
				include: __dirname + './src/'
			},
			{
				test:/\.(css|less|scss)$/,
				use:['style-loader','css-loader',{
					loader:'postcss-loader',
					options:{
						plugins:[require('postcss-import'),require('autoprefixer')],
						browser:['last 5 versions']
					}
				},'less-loader','sass-loader']
			},
			{
				test: /\.html$/,
				use: ['html-loader']
			},
			{
				test: /\.tpl$/,
				use: ['ejs-loader']
			},
			{
				test: /\.(png|jpg|gif|svg)$/i,
				use: [{
					loader:'url-loader',
					options: {
						limit: 5000,
						name: 'assets/[name]-[hash:5].[ext]'
					}
				},'image-webpack-loader']
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: 'body'
		})
	]
}