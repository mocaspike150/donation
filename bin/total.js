const fs = require('fs')
const type = process.argv[2]
const src = `_data/${type}`
const files = fs.readdirSync(src).filter(fn => fn.endsWith('.json'))

let output = {}

for (const file of files) {
  const fn = `${src}/${file}`
  const id = file.replace(/\.json/, '')
  const data = JSON.parse(fs.readFileSync(fn))
  output[id] = data
}
console.log(JSON.stringify(output))
