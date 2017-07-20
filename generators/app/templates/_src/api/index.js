var parsing = require('body-parser');
var cmdline = require('minimist');
var express = require('express');
var filesys = require('fs');

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

app.use(parsing.urlencoded({ extended: true }));
app.use(parsing.json());

require('./controllers').forEach(function (controller) {
  controller(app);
});

const configs = require('./configs');

if (arg.env === 'production' || arg.env === 'prod') {
  arg.env = 'production';
}
else {
  arg.env = 'development';
}

if (!configs.api[arg.env]) {
  process.exit();
}

console.log('. running as ' + configs.api[arg.env].label);
console.log('. listens on ' + configs.api[arg.env].port);

console.log('. starting...');

app.listen(configs.api[arg.env].port);

console.log('. started');