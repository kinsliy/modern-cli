const inquirer = require('inquirer');  
const questions =[
    {
        type: 'list',
        name: 'projectName',
        message: "你想创建什么类型的项目",
        choices:[
            {name:'react'},
            {name:'vue'},
        ],
        default: function() {
            return 'react';
        }
    },


]
module.exports = async (projectName) => {

inquirer.prompt(questions).then(function (answers) {  
    console.log(answers)
});
};
  