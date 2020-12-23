const testBatch = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`



const convertToPassportObject = (passport) => passport
    .replace(/\n/g, " ").split(' ')
    .reduce((acc, line) => {
        const [key, value] = line.split(':');
        // console.log(key, value)
        return acc = {
            ...acc,
            [key]: value
        };
    }, {})

const processBatch = (batch) => {
    return batch
        .replace(/\n\r/g, "\n")
        .replace(/\r/g, "\n")
        .split(/\n{2,}/g)
        .map(convertToPassportObject)
}

const isValidPassport = (passport) => {
    const requiredKeys = [
        'byr', //(Birth Year)
        'iyr', //(Issue Year)
        'eyr', //(Expiration Year)
        'hgt', //(Height)
        'hcl', //(Hair Color)
        'ecl', //(Eye Color)
        'pid', //(Passport ID)
        // 'cid', //(Country ID) Optional
    ]
    let result = requiredKeys.every(key => {
        return !!passport[key];
    })

    return result;
};

// testBatch
const passports = processBatch(testBatch).filter(isValidPassport);

console.log("=========RESULT=========");
console.log("Valid passports:", passports.length); // 2
