const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { EnvironmentPlugin } = require("webpack");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "svg-url-loader",
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html",
        }),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
        new EnvironmentPlugin({
            REACT_APP_BACKEND_URL: "http://localhost:8080",
            REACT_APP_FRONTEND_URL: "http://localhost:3000",
        }),
    ],
};
