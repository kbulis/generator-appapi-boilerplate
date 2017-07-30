var cmdline = require('minimist');
var express = require('express');

const arg = cmdline(process.argv.slice(2));
const app = express();

console.log(". launching...");

try {
  console.log(require('./banner.txt'));
}
catch (eX) {
}

process.on("exit", function() {
  console.log(". exiting...");
});

app.use(express.static('bin/app/', {
  index: 'index.html',
  eTag: false
}));

const configs = require('./configs');

if (arg.env === 'development' || arg.env === 'dev') {
  arg.env = 'development';
}
else {
  arg.env = 'production';
}

if (!configs.srv[arg.env]) {
  process.exit();
}

console.log('. running as ' + configs.srv[arg.env].label);
console.log('. listens on ' + configs.srv[arg.env].port);

console.log('. starting...');

app.listen(configs.srv[arg.env].port);

console.log('. started');