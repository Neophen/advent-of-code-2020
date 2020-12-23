const expenses = [1547, 473, 100, 2000];

const result = expenses.filter(x => expenses.some(y => y + x === 2020)).reduce((acc, x) => acc * x);

console.log(result);
