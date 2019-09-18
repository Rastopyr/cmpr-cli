#!/usr/bin/env node

const chalk = require("chalk");
const operators = require('../src');

const errorMessage = (messageText) => `${chalk.bgRed.white("Error:")} ${messageText}`;

const exitWithError = (error, code = 1) => {
  process.stderr.write(error);
  process.exit(code);
};

require('yargs')
  .usage(
    '$0 <comparator> <value> <comparable>',
    'compare <value> and <comparable>. exit with code 1 if <comaprator> is false',
    (yargs) => {
      yargs.positional('comparator', {
        describe: 'comparator name',
        type: 'string',
        choices: [
          'gt',
          'lt',
          'lte',
          'gte'
        ]
      });

      yargs.positional('value', {
        describe: 'number, what need to compare',
        type: 'number'
      });

      yargs.positional('comparable', {
        describe: 'number to be compared',
        type: 'number'
      });
    }, (argv) => {
      const operatorName = argv.comparator;
      const value = Number(argv.value);
      const comparable = Number(argv.comparable);

      if (isNaN(value) || isNaN(comparable)) {
        exitWithError(
          errorMessage("Both values should be a number")
        );
      }

      if (!operators[operatorName]) {
        exitWithError(
          errorMessage("Allowed only next comparators: gt, gte, lt, lte")
        );
      }

      if (!operators[operatorName](value, comparable)) {
        exitWithError(
          errorMessage(
            `${value} is not ${operators.names[operatorName]} ${comparable}`
          )
        );
        process.exit(1);
      }
    }).help().argv

