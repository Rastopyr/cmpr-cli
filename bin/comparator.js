#!/usr/bin/env node

const chalk = require("chalk");
const operators = require("../src");
const { errorMessage } = require("../src/cli");

if (!process.argv[2]) {
  process.stderr.write(errorMessage("Operator name is required"));

  process.exit(1);
}

if (!process.argv[3] || !process.argv[4]) {
  process.stderr.write(
    errorMessage("Both values is required for compare operation")
  );

  process.exit(1);
}

const operatorName = process.argv[2];
const value = Number(process.argv[3]);
const comparable = Number(process.argv[4]);

if (isNaN(value) || isNaN(comparable)) {
  process.stderr.write(errorMessage("Both values should be a number"));

  process.exit(1);
}

const operator = operators[operatorName];

if (!operator) {
  process.stderr.write(
    errorMessage("Allowed only next comparators: gt, gte, lt, lte")
  );

  process.exit(1);
}

if (!operator(value, comparable)) {
  process.stderr.write(
    errorMessage(
      `${value} is not ${operators.names[operatorName]} ${comparable}`
    )
  );
  process.exit(1);
}
