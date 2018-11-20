const chalk = require('chalk');
const config = require('./config');
const colors = {log: 'blue', success: 'green', error: 'red', warn: 'yellow'};

// rewrite to use Object.keys()
for (let property in colors) {
  if (colors.hasOwnProperty(property)) {
  	module.exports[property] = (type, msg) => {
      console.log(chalk.keyword(colors[property])(`[ ${type.toUpperCase()} ] ${msg}`));
  	};
  }
}
