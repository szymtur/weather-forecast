var path = require("path");
 
module.exports = {
  entry:"./js/app.jsx",
  output: { filename: "out.js", path: path.resolve(__dirname, "js") },
  mode: "development", watch: true,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]', 
            publicPath: 'fonts',
            outputPath: '../fonts'
          }
        }
      },
      {
      test: /\.jsx$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["es2015","stage-2", "react"]
        }
      }
    }]
  }
}