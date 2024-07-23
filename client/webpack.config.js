const env = process.env;
const isEnvProduction = env.NODE_ENV === 'production';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: `./src/index.js`,
	mode: 'development',
	devServer: {
		static: './dist',
		open: true,
		proxy: {
			'/api': 'http://localhost:9010',
		},
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve('dist'),
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		// Generates an `index.html` file with the <script> injected.
		new HtmlWebpackPlugin(
			Object.assign(
				{},
				{
					inject: true,
					template: './public/index.html',
				},
				isEnvProduction
					? {
							minify: {
								removeComments: true,
								collapseWhitespace: true,
								removeRedundantAttributes: true,
								useShortDoctype: true,
								removeEmptyAttributes: true,
								removeStyleLinkTypeAttributes: true,
								keepClosingSlash: true,
								minifyJS: true,
								minifyCSS: true,
								minifyURLs: true,
							},
					  }
					: undefined
			)
		),
	],
};
