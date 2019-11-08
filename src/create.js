const inquirer = require("inquirer");
const download = require("download-git-repo");
const ora = require("ora");

const questions = [
  {
    type: "list",
    name: "projectType",
    message: "你想创建什么类型的项目",
    choices: [{ name: "react" }, { name: "vue" }],
    default: function() {
      return "react";
    }
  }
];
module.exports = async projectName => {
  inquirer.prompt(questions).then(function(answers) {
    if (answers.projectType === "react") {
      const spinner = ora().start();
      spinner.color = "yellow";
      spinner.text = "正在加载项目";
      download(
        "github:kinsliy/reactDev",
        `${projectName}`,
        { clone: true },
        function(err) {
            spinner.stop()
          console.log(err ? "Error" : "Success");
          process.exit(1);
        }
      );
    }
    console.log(answers);
  });
};
