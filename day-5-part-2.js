const testPasses = [
    'BFFFBBFRRR',
    'BFFFBBFRFR',
    'BFFFBBFRRF',
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

    return {
        pass: boardingPass,
        row,
        column,
        seatId,
    }
})

console.log("=========RESULT=========");
const sortedIds = allPasses
    .sort((a, b) => a.seatId - b.seatId)
    .map(x => x.seatId)

const minId = sortedIds[0];
const maxId = sortedIds[sortedIds.length - 1];

let missingIds = []
for (let index = minId; index < maxId; index++) {
    if (sortedIds.indexOf(index) < 0) {
        missingIds.push(index);
    }
}

console.log(missingIds); // [ 565 ]
