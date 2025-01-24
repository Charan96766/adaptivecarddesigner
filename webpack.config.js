const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
console.log("webpack running");
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: "node_modules/adaptivecards-designer/dist/containers/*",
        to: "containers/",
        flatten: true
      }
    ]),
    new MonacoWebpackPlugin({
      languages: ["json"]
    })
  ]
};
