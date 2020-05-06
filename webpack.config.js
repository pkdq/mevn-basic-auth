require('dotenv').config()

const path = require('path')
const webpack = require('webpack')

const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        './client/index.js'
    ],
    output: {
        filename: 'app.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'server/public')
    },
    resolve: {
        alias: {
            "@views": path.resolve(__dirname, "./client/views"),
            "@store": path.resolve(__dirname, "./client/store"),
            "@utils": path.resolve(__dirname, "./client/utils"),
            "@components": path.resolve(__dirname, "./client/components"),
            "@routes": path.resolve(__dirname, "./server/routes"),
            "@config": path.resolve(__dirname, "./server/config"),
            "@models": path.resolve(__dirname, "./server/models"),
            "@validators": path.resolve(__dirname, "./server/validators"),
            "@middlewares": path.resolve(__dirname, "./server/middlewares"),
            "@controllers": path.resolve(__dirname, "./server/controllers")
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'app.css'
        }),
        new webpack.HotModuleReplacementPlugin,
    ]
}