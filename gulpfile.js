const { series } = require('gulp')
const util = require('util')
const exec = util.promisify(require('child_process').exec)

function unitTest() {
  return exec('yarn test --passWithNoTests --colors')
    .then(
      output => console.log(output.stdout),
      output => console.log(output.stdout, output.stderr)
    )
}

function integrationTest() {
  return exec('JEST_JUNIT_OUTPUT_NAME="integration.xml" yarn test --passWithNoTests --testRegex=".*\\.it\\.js" --colors')
    .then(
      output => console.log(output.stdout),
      output => console.log(output.stdout, output.stderr)
    )
}

exports['test'] = series(unitTest)
exports['test-integration'] = series(integrationTest)
exports['test-all'] = series(unitTest, integrationTest)
