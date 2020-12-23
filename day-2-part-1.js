const test_database = [
    { policy: "1-3 a", password: "abcde" }, // valid has 1 a
    { policy: "1-3 b", password: "cdefg" }, // invalid no b's
    { policy: "2-9 c", password: "ccccccccc" }, // valid has 9 c's
]

const valid = test_database.filter(({ policy, password }) => {
    const [min, max] = policy.split(' ')[0].split('-');
    const letter = policy.split(' ')[1];
    const lettersLength = password.split('').filter(c => c === letter).length;
    const result = min <= lettersLength && lettersLength <= max;
    return result;
});

console.log(valid.length); // 2
