const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const config = require("../config")

const activeConfig = config.dev;

const devConfig = merge(baseWebpackConfig, {
    mode: "development",

    //原始源代码，便于调试
    devtool: 'source-map',

    //伺服配置
    devServer: {
        host: "0.0.0.0",
        port: 8000,

        historyApiFallback: true,
        inline: true,
        hot: true,
        stats: 'minimal',
        contentBase: activeConfig.assetsRoot,

        //所有出错都显示在网页上
        overlay: true,

        proxy: activeConfig.proxy
    }
})

module.exports = devConfig;