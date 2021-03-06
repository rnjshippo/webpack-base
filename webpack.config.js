const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	devtool: 'source-map',
	entry: {
		main: './src/index.js',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: {
					loader: 'file-loader',
					options: {
						outputPath: './public/imgs',
						name: '[name].[ext]?[hash]',
					},
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: 'head',
			scriptLoading: 'defer',
			hash: true,
			minify: {
				collapseWhitespace: true,
				keepClosingSlash: true,
				removeComments: true,
			},
		}),
		new CleanWebpackPlugin(),
	],
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		publicPath: '/',
		host: 'localhost',
		hot: true,
		overlay: true,
		compress: true,
		port: 8080,
		stats: 'errors-only',
		historyApiFallback: true,
		// writeToDisk: true,
		proxy: {
			'/api': 'http://localhost:3000', // 프록시
		},
	},
};
