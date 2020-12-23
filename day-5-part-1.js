const testPasses = [
    'BFFFBBFRRR',
    'FFFBBBFRRR',
    'BBFFBBFRLL',
];

const getBinary = (current, lowerItem, upperItem, min, max) => {
    let newMax = max;
    let newMin = min;

    if (current === lowerItem) {
        newMax = Math.floor((min + max) / 2);
    }

    if (current === upperItem) {
        newMin = Math.floor((min + max) / 2) + 1;
    }

    return {
        newMin,
        newMax,
    }
}

const getRow = (input, min, max) => {
    let rest = [...input];
    let current = rest.shift();
    if (current !== 'F' && current !== 'B') {
        return {
            input: input,
            row: min
        };
    }

    const { newMin, newMax } = getBinary(current, 'F', 'B', min, max);

    return getRow(rest, newMin, newMax);
}

const getSeat = (input, min, max) => {
    let rest = [...input];
    let current = rest.shift();
    if (current !== 'L' && current !== 'R') {
        return min;
    }

    const { newMin, newMax } = getBinary(current, 'L', 'R', min, max);

    return getSeat(rest, newMin, newMax);
}

const allPasses = testPasses.map(boardingPass => {
    const maxRow = 127;
    const minRow = 0;

    const maxSeat = 7;
    const minSeat = 0;

    const { input, row } = getRow(boardingPass.split(''), minRow, maxRow);

    const column = getSeat(input, minSeat, maxSeat);

    const seatId = (row * 8) + column;

    // console.log(`${boardingPass}: row ${row}, column: ${column}, seat ID ${seatId}`);
    return {
        pass: boardingPass,
        row,
        column,
        seatId,
    }
})

// testResults
// BFFFBBFRRR: row 70, column 7, seat ID 567.
// FFFBBBFRRR: row 14, column 7, seat ID 119.
// BBFFBBFRLL: row 102, column 4, seat ID 820.

console.log("=========RESULT=========");
const result = allPasses.reduce((acc, x) => acc < x.seatId ? x.seatId : acc, 0)
console.log(result); // 820
