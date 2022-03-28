// const VueLoaderPlugin = require('vue-loader-plugin');
//const process = require("process")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// const webpackNodeExternals = require('webpack-node-externals');
// const path = require("path");
const config = require("../config")

// console.log(process.cwd())

// const process = require("process")
// const { getAliasForProject } = require("@microsoft/webpack-project-references-alias");
// console.log(getAliasForProject(ws.getProjectDirectory()));
// process.exit(0);


//获得当前的活动配置
const isDev = process.env.NODE_ENV == 'development';
const activeConfig = isDev ? config.dev : config.build;

module.exports = {
    context: activeConfig.wp.contentPath,
    //入口配置
    entry: {
        app: activeConfig.wp.mainEntryPath,
    },
    //出口配置
    output: {
        //输出目录绝对路径
        path: activeConfig.assetsRoot,
        //输出文件名
        filename: '[name].js',
        //页面访问的url前缀，可以用http开头的的全路径。
        publicPath: activeConfig.assetsPublicPath
    },
    // externals: [webpackNodeExternals()],
    resolve: {
        //模块倒入的扩展名的处理
        // root: path.resolve(__dirname),
        // roots: [
        //     ws.getProjectDirectory()
        // ],
        // alias: getAliasForProject(ws.getProjectDirectory()),
        alias: {
            "vue$": 'vue/dist/vue.esm.js',
            "@": `${activeConfig.wp.contentPath}/src`,
            "@assets": `${activeConfig.wp.contentPath}/src/assets`,
        },
        extensions: ['.js', '.ts', '.tsx', ".vue"]
        
    },
    //仅限行的原始源代码，便于定位问题
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [
            //先编译vue
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                },
                include: [
                    activeConfig.wp.sourcePath
                ]
            },
            //编译ts
            {
                // test: /\.tsx?$/,
                test: /(?<!\.d)\.tsx?$/,
                use: [
                     {
                         loader: "babel-loader",
                         options: {
                             presets: [
                                 "@babel/preset-env", 
                                 "@babel/preset-typescript"
                             ],
                             plugins: [
                                 "@babel/plugin-proposal-object-rest-spread",
                                 "@babel/plugin-proposal-class-properties",
                                 "@babel/plugin-syntax-dynamic-import",
                                 "@babel/plugin-transform-runtime"
                                //  "@babel/plugin-transform-async-to-generator"
                             ]
                         }
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsxSuffixTo: [
                                /\.vue$/
                            ],
                            // transpileOnly: true,
                            // logLevel: 'INFO',
                            // logInfoToStdOut: true,
                            // context: ws.getProjectDirectory(),
                            // allowTsInNodeModules: true,
                            // projectReferences: true,
                            // resolveModuleName: (moduleName, containingFile, compilerOptions, compilerHost, parentResolver) => {
                            //     //自对应模块解析，可以定制自己特殊的模块加载方式
                            //     switch (moduleName) {
                            //         //case 'ncform': return parentResolver(modulePath, containingFile, compilerOptions, compilerHost);
                            //         //case 'ncform-theme-elementui': return parentResolver(modulePath, containingFile, compilerOptions, compilerHost);
                            //         default: return parentResolver(moduleName, containingFile, compilerOptions, compilerHost);
                            //     }
                            // }
                        }
                    }
                ]
            },
            //编译js
            {
                // test: /\.tsx?$/,
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            //编译css
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            //编译sass
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
              test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 100000,
                name: 'image/[name].[hash:7].[ext]'
              }
            },
            {
              test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 100000,
                name: 'media/[name].[hash:7].[ext]'
              }
            },
            {
              test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
              loader: 'url-loader',
              options: {
                limit: 100000,
                name:'font/[name].[hash:7].[ext]'
              }
            }
        ]
    },
    plugins: [
        //默认删除output.path指定的目录
        // new CleanWebpackPlugin(),
        // new CleanWebpackPlugin(path.resolve(__dirname, '../dist'), {
        //     root: path.resolve(__dirname, '../'), // 设置root
        //     verbose: true
        // }),

        //配置的全局变量
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         //配置各种环境，这样服务启动时，就可以引用。
        //     }
        // }),

        new VueLoaderPlugin(),

        new MiniCssExtractPlugin({
            filename: isDev ? '[name].css' : '[name].[hash].css',
            chunkFilename: isDev ? '[name].chunk.css' : '[name].[hash].chunk.css'
        }),

        new HtmlWebpackPlugin({
            template: activeConfig.wp.indexPath
        }),

        isDev ? new webpack.HotModuleReplacementPlugin() : null
    ].filter(i => i)
}
