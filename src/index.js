const gt = (a, b) => a > b;
const lt = (a, b) => a < b;
const gte = (a, b) => a >= b;
const lte = (a, b) => a <= b;

module.exports = {
  gt,
  lt,
  gte,
  lte,

  names: {
    gt: "great than",
    lt: "less than",
    gte: "great than or equal",
    lte: "less than or equal"
  }
};
