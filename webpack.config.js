const path = require("path");
const autoprefixer = require("autoprefixer");

module.exports = {
    entry:"./jsx/app.jsx",
    output: { filename: "out.js", path: path.resolve(__dirname, "js") },
    mode: "development", watch: true,
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [ 
                'style-loader', 
                'css-loader',
                {
                    loader: "postcss-loader",
                    options: {
                        plugins: () => [
                            autoprefixer({
                                browsers: ["> 3%", "last 2 versions"]
                            })
                        ]
                    }
                }
            ]
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
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["es2015", "stage-2", "react"]
                }
            }
        }]
    }
}