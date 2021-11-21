const path = require("path"),
	ESLintPlugin = require("eslint-webpack-plugin"),
	{ CleanWebpackPlugin} = require("clean-webpack-plugin");


const vendor = [
	"react",
	"react-dom",
	"graphql",
	"@apollo/client"
]

module.exports = {
	entry: {
		app: ["./src/client/main.tsx"],
		vendor
	},
	output: {
		path: path.join(__dirname, "public", "build")
	},
	resolve: {
		extensions: ["", ".js", ".jsx", ".ts", ".tsx"]
	},
	module: {
		rules: [
			{test: /\.(j|t)sx?$/, use: "babel-loader", exclude: /node_modules/},
			{test: /\.json$/, use: "json-loader"},
			{test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/, use: [{
				loader: "url-loader",
				options: {
					"limit": 5000
				}
			}]}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new ESLintPlugin()
	]
}