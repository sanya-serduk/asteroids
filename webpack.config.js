const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = (env, argv) => {
	const isDev = argv.mode !== 'production';
	return {
		context: path.resolve(__dirname, 'src'),
		entry: './index.js',
		output: {
			filename: 'index.[contenthash].js',
			path: path.resolve(__dirname, 'dist'),
			clean: true,
			publicPath: isDev ? '/' : '/asteroids/',
		},

		devServer: {
			client: {
				logging: 'none'
			}
		},

		plugins: [
			new HTMLWebpackPlugin({
				template: "./index.html"
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve(__dirname, 'src/assets'),
						to: path.resolve(__dirname, 'dist/assets')
					}
				]
			})
		],
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader"]
				},
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}
			]
		}
	}
}