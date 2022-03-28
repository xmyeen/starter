const process = require("process")
const name = process.argv[process.argv.length - 1]
if(!name){
  console.log("The work project's name is null or empty")
  return;
}
process.env.WP_NAME = name

//---------------------------------------------------------------
//开始

// npm和node版本检查，此处省略
// require('./check-version')

// 设置环境变量为production
// process.env.NODE_ENV = 'production'

// ora是一个命令行转圈圈动画插件，好看用的
const ora = require('ora')
// rimraf插件是用来执行UNIX命令rm和-rf的用来删除文件夹和文件，清空旧的文件
const rm = require('rimraf')
// node.js路径模块
const path = require('path')
// chalk插件，用来在命令行中输入不同颜色的文字
const chalk = require('chalk')
// 引入webpack模块使用内置插件和webpack方法
const webpack = require('webpack')
// 引入config下的index.js配置文件
const config = require('../config')
// 下面是生产模式的webpack配置文件，请看我的webpack.prod.conf解释文章
const webpackConfig = require(
  process.env.NODE_ENV == 'development'
  ? './webpack.dev.conf'
  : './webpack.prod.conf'
)

// 开启转圈圈动画
const spinner = ora('building...')
spinner.start()

// 调用rm方法
rm(config.build.assetsRoot, err => {
  // 如果删除的过程中出现错误，就抛出这个错误，同时程序终止
  if (err) throw err

  // 没执行webpack编译
  webpack(webpackConfig, function (err, stats) {
    // 这个回调函数是webpack编译过程中执行
    spinner.stop() // 停止转圈圈动画

    if (err) throw err // 如果有错误就抛出错误

    // 没有错误就执行下面的代码，输出信息
    process.stdout.write(stats.toString({
      // stats对象中保存着编译过程中的各种消息
      colors: true, // 增加控制台颜色开关
      modules: true, // 不增加内置模块信息
      children: true, // 不增加子级信息
      chunks: false, // 允许较少的输出
      chunkModules: true // 不将内置模块的信息加到包信息
    }) + '\n\n');

    if ( stats.hasErrors() ) {
        console.log(chalk.red("Build failed with errors.\n"));
        process.exit(1);
    }
    // 以上就是在编译过程中，持续打印消息
    // 下面是编译成功的消息
    console.log(chalk.cyan('Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
