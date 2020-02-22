/**
 * Executes shell command as it would happen in BASH script
 * @param {string} command
 * @param {Object} [options] Object with options. Set `capture` to TRUE, to capture and return stdout. 
 *                           Set `echo` to TRUE, to echo command passed.
 * @returns {Promise<{code: number, data: string | undefined, error: Object}>}
 */
module.exports.exec = function (command: String, { capture = false, echo = false } = {}) {
  //The child_process.spawn() method spawns the child process asynchronously, without blocking the Node.js event loop
  const spawn = require('child_process').spawn; 
  //stdio refers to Child's stdio configuration. Capture refers to capturing command output when set to true
  const childProcess = spawn('bash', ['-c', command], { stdio: capture ? 'pipe' : 'inherit' }); 

  return new Promise((resolve, reject) => {
    let stdout = '';
    if (capture) {
      childProcess.stdout.on('data', (data: any) => {
        //output 
        stdout += data;
      });
    }

    childProcess.on('error', (error: string) => {
      reject({code: 1, error: error});
    });

    childProcess.on('close', (code: any) => {
      if (code > 0) {
        reject({code: code, error: 'Command failed with code ' + code});
      } else {
        resolve({code: code, data: stdout});
      }
    });

  });
}