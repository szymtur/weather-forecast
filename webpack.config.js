const path = require("path");
const autoprefixer = require("autoprefixer");

module.exports = {
    entry:"./jsx/app.jsx",
    output: { filename: "out.js", path: path.resolve(__dirname, "js") },
    mode: "development", watch: true,
    devtool: "source-map",
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
                        postcssOptions: {
                            plugins: [
                                "postcss-preset-env",
                                autoprefixer({
                                    overrideBrowserslist: ["> 3%", "last 2 versions"]
                                })
                            ]
                        }
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
                    presets: ["@babel/react" , "@babel/env"],
                    plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-transform-runtime"]
                }
            }
        }]
    }
};