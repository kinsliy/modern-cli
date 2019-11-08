#! /usr/bin/env node

const program = require("commander");

const { version } = require("../utils/constants");

const actionsMap = {
  create: {
    // 创建模板
    description: "create project",
    alias: "cr",
    examples: ["quick-cli create <template-name>"]
  },
  config: {
    // 配置配置文件
    description: "config info",
    alias: "c",
    examples: ["quick-cli config get <k>", "quick-cli config set <k> <v>"]
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
      console.log(action);
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
