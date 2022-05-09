console.log('test');

// index.js
const path = require('path')
const fs = require('fs')

const configFilePath = path.resolve(__dirname, './.github/workflows/pr-title-checker-config.json');
const testsFilePath = path.resolve(__dirname, './tests.json');

console.log(configFilePath);
console.log(testsFilePath);

let config = require(configFilePath);
let tests = require(testsFilePath);

console.log(config);
console.log(tests);

let { CHECKS, LABEL, MESSAGES } = config;

if (CHECKS.regexp) {
    let re = new RegExp(CHECKS.regexp, CHECKS.regexpFlags || "");
    tests.forEach(test => {
        let outCome = re.test(test.testCase);
        if (outCome) {
            console.log(test.testCase + ' ' + MESSAGES.success);
        } else {
            console.log(test.testCase + ' ' + MESSAGES.notice);
        }
    });
}