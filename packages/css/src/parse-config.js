const fs = require('fs-extra')
const YAML = require('yaml')

async function parse(input) {
  const file = await fs.readFile(input, 'utf8')
  return YAML.parse(file)
}

module.exports = { parse }
