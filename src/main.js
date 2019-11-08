#! /usr/bin/env node

const program = require("commander");
const path = require('path');
const { version } = require("../utils/constants");

const actionsMap = {
  create: {
    // 创建模板
    description: "create project",
    alias: "cr",
    examples: ["modern-cli create <template-name>"]
  },
  config: {
    // 配置配置文件
    description: "config info",
    alias: "c",
    examples: ["modern-cli config get <k>", "modern-cli config set <k> <v>"]
  },
  "*": {
    description: "command not found"
  }
};
// 循环创建命令
Object.keys(actionsMap).forEach(action => {
  program
    .command(action) // 命令的名称
    .alias(actionsMap[action].alias) // 命令的别名
    .description(actionsMap[action].description) // 命令的描述
    .action(() => {
      // 动作
      if (action === '*') { // 如果动作没匹配到说明输入有误
        console.log(acitonMap[action].description);
      } else { // 引用对应的动作文件 将参数传入
        require(path.resolve(__dirname, action))(...process.argv.slice(3));
      }
    });
});

program.version(version).parse(process.argv);

program.on("--help", () => {
  console.log("Examples");
  Object.keys(actionsMap).forEach(action => {
    (actionsMap[action].examples || []).forEach(example => {
      console.log(`${example}`);
    });
  });
});

if(!program.args.length){
    program.help()
  }
