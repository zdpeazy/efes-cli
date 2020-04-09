'use strict';

(function() {

  const ora = require('ora');
  const chalk = require('chalk');
  const _copyTpl = require('./utils/copyTpl.js');

  async function run(options){
    const spinner = ora('导入中...').start();
    const copyTpl = new _copyTpl(options);
    const result = await copyTpl.init()
      .catch(error => {
        global.edjcho.log(chalk.red(error));
      });
    spinner.stop();
    global.edjcho.log(result);
  }
  
  module.exports = run;
})();
