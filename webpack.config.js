const path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/App.jsx',
	output: {
		filename: 'app.bundle.js',
		path: path.resolve(__dirname, 'public'),
	},
	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
   },
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
			},
		],
	},
};
