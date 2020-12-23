const testSlopes = [
    "..##.......",
    "#...#...#..",
    ".#....#..#.",
    "..#.#...#.#",
    ".#...##..#.",
    "..#.##.....",
    ".#.#.#....#",
    ".#........#",
    "#.##...#...",
    "#...##....#",
    ".#..#...#.#",
]


const makeTreeCounter = (right, down, rows) => {

    let rightIndex = 0;
    let treeCount = 0;

    for (let slopeIndex = 0; slopeIndex < rows.length; slopeIndex += down) {
        const slope = rows[slopeIndex + down];
        if (!slope) {
            // we're on the last slope
            return treeCount;
        }
        const currentRight = right * (rightIndex + 1);
        const offset = currentRight < slope.length ? currentRight : currentRight % slope.length;
        const isTree = slope[offset] === '#';
        if (isTree) {
            treeCount += 1;
        }
        rightIndex += 1;
    }
    return treeCount;
}

const slopes = [
    { right: 1, down: 1 }, // 2
    { right: 3, down: 1 }, // 7
    { right: 5, down: 1 }, // 3
    { right: 7, down: 1 }, // 4
    { right: 1, down: 2 }, // 2
]

const trees = slopes.map(({ right, down }) => makeTreeCounter(right, down, testSlopes));

console.log("Tree encounters:", trees.reduce((acc, x) => acc * x)); // 336
