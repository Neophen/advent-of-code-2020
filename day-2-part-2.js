const test_database = [
    { policy: "1-3 a", password: "abcde" }, // valid one match
    { policy: "1-3 b", password: "cdefg" }, // invalid none match
    { policy: "2-9 c", password: "ccccccccc" }, // invalid both match
    { policy: "6-7 v", password: "ckvbtcv" }, // valid one match
]
// 1-3 a: abcde is valid: position 1 contains a and position 3 does not.
// 1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
// 2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.
// 6-7 v: ckvbtcv is valid: position 7 contains v and position 6 does not.


const valid = test_database.filter(({ policy, password }) => {
    const [pos1, pos2] = policy.split(' ')[0].split('-');
    const letter = policy.split(' ')[1];

    const hasPos1 = password.charAt(pos1 - 1) === letter;
    const hasPos2 = password.charAt(pos2 - 1) === letter;

    const hasOneMatch = hasPos1 || hasPos2;
    const bothMatch = hasPos1 && hasPos2;

    return hasOneMatch && !bothMatch;
});

console.log("Valid passwords:", valid.length); // 2
