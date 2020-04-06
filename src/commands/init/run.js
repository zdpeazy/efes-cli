'use strict';
(function() {

  const childProcess = require('child_process');

  module.exports = function(options) {
    console.log('efesinit')

    let _cmd = 'edj-cli sc -t default --color';

    if (options.force) {
      _cmd += ' -f';
    }

    let stdout = childProcess.execSync(_cmd, { stdio: 'inherit' });

  };

})();
