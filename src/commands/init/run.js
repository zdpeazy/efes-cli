'use strict';
(function() {

  const chalk = require('chalk');
  const inquirer = require("inquirer");
  const childProcess = require('child_process');

  module.exports = function(options) {
    console.log(options)
    if (!options.type) {
      global.edjcho.log(chalk.red(chalk.bold('请选择前端开发架构：')));
      global.edjcho.log(chalk.green(chalk.bold('前端开发架构')) + ': 目前支持normal(原efes默认jquery)、vue、react');

      inquirer.prompt([ { 
        type: 'list', 
        name: 'type', 
        message: '请选择要使用的前端框架', 
        'choices': [{
          'name': 'normal',
          checked: false
        }, {
          'name': 'vue',
          checked: true
        }, {
          'name': 'react',
          checked: false
        }],
        'default': true,
        'required': true
      }]).then(res => {
        options.type = res.type;
        const _cmd = getCmd(options);
        childProcess.execSync(_cmd, { stdio: 'inherit' });
      })
    } else {
      global.edjcho.log(chalk.green(chalk.bold(`准备安装${options.type}框架`)));
      const _cmd = getCmd(options);
      childProcess.execSync(_cmd, { stdio: 'inherit' });
    }

  };

})();

const getCmd = (options = {type: 'normal'}) => {
  let _cmd = 'edj-cli sc -t default --color';
  switch(options.type){
    case 'normal':
      _cmd = !options.force ? _cmd : `${_cmd} -f`;
      break;
    default:
      _cmd = !options.force ? `edj-cli fw -t ${options.type}` : `edj-cli fw -t ${options.type} -f`;
      break;
  }
  return _cmd;
}