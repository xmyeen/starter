const process = require("process")
const name = process.argv[process.argv.length - 1]
if(!name){
  console.log("The work project's name is null or empty")
  return;
}

//---------------------------------------------------------------
//开始

const cprocess = require('child_process')

//获得当前的活动配置
// let activeConfig = process.env.NODE_ENV == 'development'
//     ? config.dev
//     : config.build

//2. 设置启动命令
// let runCmdStr = `yarn run dev-server -- --env.name=${name}`
let runCmdStr = `yarn run dev-server`

//3. 子进程启动指定的工程
let p = cprocess.exec(
    runCmdStr,
    {
        detached: true,
        //将当前的项目名，以环境变量传过去。
        env: {
            "WP_NAME": name
        }
    },
    (error, stdout, stderr) => {
        if(error) console.log(error)
    }
)

//4 设置进程的管段连接主进程的管道
p.stdout.pipe(process.stdout)
p.stderr.pipe(process.stderr)