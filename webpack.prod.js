const HtmlWebpackLoader = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const BabelMinifyWebpackPlugin = require("babel-minify-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    optimization: {
        minimizer: [new OptimizeCssAssetsWebpackPlugin()]
    },
    output: {
        filename: "main.[contentHash].js"
    },
    module: {
        rules: [
            {
                // Configuración de babel
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /styles\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: false
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            esModule: false,
                            name: "assets/imgs/[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackLoader({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contentHash].css",
            ignoreOrder: false
        }),
        new BabelMinifyWebpackPlugin(),
        new CleanWebpackPlugin()
    ]
};
