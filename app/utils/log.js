const os = require('os');
const exec = require('child_process').exec;
const logFile = os.homedir() + '/hyper.log';

let buffer = [];
let buffeSize = 0;

module.exports = function log(chunk) {
  buffer.push(chunk);
  buffeSize += chunk.length;
  if (buffeSize > 1000 || (chunk.length > 1 && chunk[chunk.length - 1] == '\n' && chunk[chunk.length - 2] == '\r')) {
    exec(`echo "${buffer.join('')}" >> ${logFile}`);
    buffer = [];
    buffeSize = 0;
  }
};

process.on('exit', () => {
  exec(`echo "${buffer.join('')}" >> ${logFile}`);
});
