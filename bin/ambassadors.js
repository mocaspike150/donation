const fs = require('fs')
const d3 = require('d3')
const yaml = require('js-yaml')
global.fetch = require('node-fetch')

const save = (data) => {
  const fn = `_data/crowdrise/${data.id}.yml`
  console.log('save to file', fn)
  console.log(yaml.safeDump(data))
  fs.writeFile(fn, yaml.safeDump(data), (err) => {
     if (err) throw err
     console.log(fn)
  })
}

const process = (data) => {
  for( const d of data) {
    const url = `https://www.crowdrise.com/o/en/campaign/${d.team}/${d.crowdrise_page}`
    const output = {
      id: d.crowdrise_id,
      url: url
    }
    save(output)
  }
}

const error = (e) => {
  console.log(e)
}

const url = 'https://www.mocaspike150.org/data/ambassadors.json'
d3.json(url)
  .then(process)
  .catch(error)

