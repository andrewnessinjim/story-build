const path = require("path"),
	ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
	entry: {
		app: {
			import: "./src/client/main.tsx",
			dependOn: "vendor"
		},
		vendor: ["react", "react-dom", "graphql", "@apollo/client"]
	},
	output: {
		path: path.join(__dirname, "public", "build"),
		clean: true
	},
	resolve: {
		extensions: ["", ".js", ".jsx", ".ts", ".tsx"]
	},
	module: {
		rules: [
			{test: /\.(j|t)sx?$/, use: "babel-loader", exclude: /node_modules/},
			{test: /\.json$/, use: "json-loader"},
			{test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/, type: 'asset/resource'}
		]
	},
	plugins: [
		new ESLintPlugin()
	],
	optimization: {
		runtimeChunk: 'single'
	}
}