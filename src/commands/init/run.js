'use strict';
(function() {

  const chalk = require('chalk');
  const inquirer = require("inquirer");
  const childProcess = require('child_process');

  module.exports = function(options) {
    let _cmd = '';

    if (!options.type) {
      global.efesecho.log(chalk.red(chalk.bold('请选择前端开发架构：')));
      global.efesecho.log(chalk.green(chalk.bold('前端开发架构')) + ': 目前支持normal(原efes默认jquery)、vue、webpack');

      inquirer.prompt([ { 
        type: 'list', 
        name: 'type', 
        message: '请选择要使用的前端框架', 
        'choices': [{
          'name': 'efes',
          checked: true
        }, {
          'name': 'vue',
          checked: false
        }, {
          'name': 'react',
          checked: false
        }],
        'default': true,
        'required': true
      }], res => {
        options.type = res.type;
        const _cmd = getCmd(options);
        childProcess.execSync(_cmd, { stdio: 'inherit' });
      })
    } else {
      global.efesecho.log(chalk.green(chalk.bold(`准备安装${options.type}框架`)));
      const _cmd = getCmd(options);
      childProcess.execSync(_cmd, { stdio: 'inherit' });
    }

  };

})();

const getCmd = (options = {type: 'efes'}) => {
  let _cmd = 'edj-cli sc -t default --color';
  switch(options.type){
    case 'efes':
      _cmd = !options.force ? _cmd : `${_cmd} -f`;
      break;
    default:
      _cmd = `edj-cli fw -t ${options.type}`;
      break;
  }
  return _cmd;
}