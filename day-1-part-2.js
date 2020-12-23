const expenses = [1433, 365, 222, 5000];

const result = expenses.filter(x => expenses.some(y => expenses.some(z => x + y + z === 2020))).reduce((acc, x) => acc * x);

console.log(result);
