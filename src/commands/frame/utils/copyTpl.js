const path = require('path');
const fs = require('fs');
const chalk = require('chalk')

class _copyTpl {
  // 数据初始化
  constructor(options = {type: 'vue'}){
    this.options = options;
    this.tplPath = path.resolve(__dirname, `../template/${options.type}`);
    this.targetPath = process.cwd();
    this.filesList = [];
  }
  // 初始化
  init(){
    return new Promise((resolve, reject) => {
      try {
        this.copyFiles(this.tplPath, this.targetPath);
        global.edjcho.log(chalk.bold(chalk.green(`\n恭喜您，导入${this.options.type}模板成功!!!`)));
        resolve('\nDone, without errors.');
      } catch (error) {
        global.edjcho.log(chalk.bold(chalk.red(`\nWarning: ${error}`)));
        reject('\nAborted due to warnings.')
      }
      
    })
  }
  // 复制模板文件到工作目录
  copyFiles(tplPath, targetPath){

    if (!this.options.force && fs.readdirSync(targetPath).length) {
      global.edjcho.log(chalk.yellow('\nWarning: 此命令将会覆盖某些文件！，请使用 --force(-f) 继续。'));
      global.edjcho.log(chalk.red('\n存在警告，放弃操作。'));
      return;
    }

    const files = fs.readdirSync(tplPath);
    files.forEach(file => {
      const _tplPath = `${tplPath}/${file}`,
        _targetPath = `${targetPath}/${file}`,
        stat = fs.statSync(_tplPath);
        
      if(stat.isDirectory()){
        const status = fs.existsSync(_targetPath);
        if(!status){
          fs.mkdirSync(_targetPath);
        }
        this.copyFiles(_tplPath, _targetPath);
      } else {
        // 创建读取流
        const readable = fs.createReadStream(_tplPath);
        // 创建写入流
        const writable = fs.createWriteStream(_targetPath); 
        // 通过管道来传输流
        readable.pipe(writable);
      }
    });
  }

}

module.exports = _copyTpl;