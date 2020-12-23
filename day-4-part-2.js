const testBatch = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007

pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`

const convertToPassportObject = (passport) => passport
    .replace(/\n/g, " ").split(' ')
    .reduce((acc, line) => {
        const [key, value] = line.split(':');
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

const isNumberInRange = (minYear, maxYear, value) => {
    const year = Number(value);
    if (Number.isNaN(year)) return false;
    return minYear <= year && year <= maxYear;
}

const isValidPassport = (passport) => {
    const requiredKeys = [
        {
            key: 'byr',
            isValid: (value) => {
                // byr (Birth Year) - four digits; at least 1920 and at most 2002.
                return isNumberInRange(1920, 2002, value);
            }
        },
        {
            key: 'iyr',
            isValid: (value) => {
                // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
                return isNumberInRange(2010, 2020, value);
            }
        },
        {
            key: 'eyr',
            isValid: (value) => {
                // eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
                return isNumberInRange(2020, 2030, value);
            }
        },
        {
            key: 'hgt',
            isValid: (value) => {

                // hgt (Height) - a number followed by either cm or in:
                const item = value.split('');
                const unit = item.splice(-2, item.length).join('');
                const height = Number(item.join(''));

                if (Number.isNaN(height)) {
                    return false;
                }

                // If cm, the number must be at least 150 and at most 193.
                if (unit === 'cm') {
                    return isNumberInRange(150, 193, height);
                }

                // If in, the number must be at least 59 and at most 76.
                if (unit === 'in') {
                    return isNumberInRange(59, 76, height);
                }

                return false;

            }
        },
        {
            key: 'hcl',
            isValid: (value) => {
                // hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
                return !!value?.match(/^#[0-9,a-f]{6}$/gi) || false;
            }
        },
        {
            key: 'ecl',
            isValid: (value) => {
                // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
                return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
            }
        },
        {
            key: 'pid',
            isValid: (value) => {
                // pid (Passport ID) - a nine-digit number, including leading zeroes.
                return value?.match(/^\d{9}$/gi) || false;
            }
        },
    ]
    let result = requiredKeys.every(({ key, isValid }) => {
        return !!passport[key] && isValid(passport[key]);
    })

    return result;
};

// testBatch
const passports = processBatch(testBatch).filter(isValidPassport);

console.log("=========RESULT=========");
console.log("Valid passports:", passports.length); // 4
