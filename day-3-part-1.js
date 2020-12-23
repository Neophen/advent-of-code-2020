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


const makeTreeCounter = (slopeRight, slopeDown) => {
    return testSlopes.filter((_, i, rows) => {
        const slope = rows[i + slopeDown];
        if (!slope) {
            // we're on the last slope
            return false;
        }
        const currentSlopeRight = slopeRight * (i + 1);
        const offset = currentSlopeRight < slope.length ? currentSlopeRight : currentSlopeRight % slope.length;
        const isTree = slope[offset] === '#';
        return isTree;
    });
}

const testSlopeRight = 3;
const testSlopeDown = 1;

const trees = makeTreeCounter(testSlopeRight, testSlopeDown);

console.log("Tree encounters:", trees.length); // 7
