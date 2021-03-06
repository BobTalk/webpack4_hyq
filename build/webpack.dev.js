const merge = require('webpack-merge')
const base = require('./webpack.base.js')
const webpack = require('webpack')
const path =  require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 打包前删除dist目录
const HTMLWebpackPlugin = require('html-webpack-plugin')
const devEnv = require(path.resolve(__dirname, '../.env.development'))
const env = require(path.resolve(__dirname, '../.env'))
module.exports = ((env1)=>{
    console.log(env1, 'dev')
    return merge(base, {
        mode: 'development',
        // devtool: 'inline-source-map',
        devServer: {
            historyApiFallback: true,
            publicPath:'/',
            hot: true,
            contentBase: path.resolve(__dirname,'../dist'),
            compress: false, // 是否开启服务器gzip压缩
            port: 9090,
            open: true,
            overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
            inline: true // 设置为 true，当源文件改变时会自动刷新页面.
            // host: 'localhost'
            // proxy: {
            //     "/api": {
            //       target: "http://localhost:3000",
            //       pathRewrite: {"^/api": ""} // 将/api重写为""空字符串
            //     } 
            // }
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HTMLWebpackPlugin({
                title:'development',
                filename: 'index.html',
                template: 'public/index.html',
                favicon: path.resolve(__dirname, '../public/favicon.ico'),
                hash: true,
                inject: true,//将js文件注入到body底部
                minify: false
            }),
            new webpack.NamedChunksPlugin(), // 查看更改的文件
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({  // 定义环境变量   可以写成  ENV:"'dev'" dev得是一个字符串形式
                'process.env': {...devEnv,...env},
                'HTMLWebpackPlugin.options': {title:'"development"'}
            })
        ]
    })
})()