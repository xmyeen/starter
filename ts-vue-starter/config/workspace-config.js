const process = require("process");
const path = require("path");

// const projectName = process.argv[process.argv.length - 1].replace(/^(\S)*=/, '')
const name = process.env.WP_NAME;

const CONTENT_ROOT_PATH = path.resolve(
  path.join(__dirname, "..", name)
);

module.exports = {
  //项目的名字
  name: name,

  //项目的目录
  contentPath: CONTENT_ROOT_PATH,

  //源码路径
  sourcePath: path.resolve(
    path.join(CONTENT_ROOT_PATH, "src")
  ),

  // 返回当前项目index.html的子路径
  indexPath: path.resolve(
    path.join(CONTENT_ROOT_PATH, "public", "index.html")
  ),

  //工作项目的主入口信息
  mainEntryPath: path.resolve(
    path.join(CONTENT_ROOT_PATH, "src", "main.ts")
  )
} 