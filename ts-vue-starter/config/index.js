'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
// const cmdopt = require('commander')
const wsc = require('./workspace-config')

module.exports = {
    // dev: {
    //     //存放编译出来的资源文件的输出目录
    //     assetsSubDirectory: 'static',

    //     assetsPublicPath: '/',
    //     https: true,
    //     host: '0.0.0.0',
    //     // Various Dev Server settings
    //     port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    //     autoOpenBrowser: false,
    //     errorOverlay: true,
    //     notifyOnErrors: true,
    //     poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    //     proxyTable: {
    //         '/v1/api': {
    //             target: 'https://127.0.0.1:44433', // 接口的域名
    //             // target: 'https://10.19.156.30:44433', // 接口的域名
    //             // target: 'http://10.19.132.38:4433', // 接口的域名
    //             secure: false, // 如果是https接口，需要配置这个参数
    //             changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
    //             pathRewrite: {
    //                 '^/v1/api': '/v1/api'
    //             }
    //         },
    //         '/headwork/socket': {
    //             target: 'wss://127.0.0.1:44433', // 接口的域名
    //             ws: true,
    //             secure: false, // 如果是https接口，需要配置这个参数
    //             changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
    //         }
    //     },

    //     /**
    //      * Source Maps
    //      */

    //     // https://webpack.js.org/configuration/devtool/#development
    //     devtool: 'cheap-module-eval-source-map',

    //     // If you have problems debugging vue-files in devtools,
    //     // set this to false - it *may* help
    //     // https://vue-loader.vuejs.org/en/options.html#cachebusting
    //     cacheBusting: true,
    //     cssSourceMap: true
    // },
    dev: {
        wp: wsc,

        assetsRoot: path.resolve(
            path.join(__dirname, "..", "dist")
        ),
        // 除index.html外静态资源的存放路径（相对于assertsRoot)
        assetsSubDirectory: 'static',
        // index.html引用资源的相对路径
        assetsPublicPath: '/',
        // publicPath: "/view/",

        // 成果物输出的index.html的相对路径
        index: "index.html",

        //自动浏览器打开
        autoOpenBrowser: true,

        proxy: {
            "/v1/api": {
                target: "http://127.0.0.1:27788"
            }
        }

        //vue的代理规则
        // proxyTable: {
        //     "/v1/api" : {
        //         target: "http://127.0.0.1:8080",
        //         ws: true,
        //         secure: false,
        //         changeOrigin: true // 如果接口跨域，需要进行这个参数配置
        //     }
        // }
    },

    build: {
        wp: wsc,

        // 成果物输出的根目录
        assetsRoot: path.resolve(
            // path.join(__dirname, "..", "..", "..", "website")
            path.join(__dirname, "..", "target")
        ),
        // 除index.html外静态资源的存放路径（相对于assertsRoot)
        assetsSubDirectory: '/static/',
        // index.html引用资源的相对路径
        assetsPublicPath: '/view/',
        // 成果物输出的index.html的相对路径
        index: "index.html",

        //生产环境是否开启sourceMap
        productionSourceMap: true,
        //生产环境是否开启gzip
        productionGzip: false,
        //生产环境GZIP处理的对象
        productionGzipExtensions: ['js', 'css'],
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',
        
        //检测包的情况，可以使用`rpm run build --report`查看每个包js生产的情况
        bundleAnalyzerReport: process.env.npm_config_report
    }
}

// function getDistDir() {
//     if (!process.platform === 'win32') {
//         cmdopt
//             .version('1.0.0')
//             .option('-d, --dist-dir [path]', 'Specify dist output directory', path.resolve(__dirname, '../dist'))
//             .parse(process.argv)
//         return cmdopt.distDir
//     }
//     return distDir
// }
