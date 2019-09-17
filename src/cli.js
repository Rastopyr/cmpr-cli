const chalk = require("chalk");

const errorMessage = message =>
  `${chalk.black.bgRed("Error:")} ${chalk.red(message)}`;

module.exports = {
  errorMessage
};
