const fs = require('fs')
const d3 = require('d3')
const yaml = require('js-yaml')
global.fetch = require('node-fetch')

const save = (data) => {
  const fn = `_data/crowdrise/${data.id}.yml`
  console.log('save to file', fn)
  console.log(data) 
  const yaml_data = `
id: ${data.id}
url: ${data.url}
`
  fs.writeFile(fn, yaml_data, (err) => {
     if (err) throw err
     console.log(yaml_data)
  })
}

const process = (data) => {
  for( const i in data) {
    const d = data[i]
    const url = `https://www.crowdrise.com/o/en/campaign/${d.team}/${d.crowdrise_page}`
    const fn = `_data/crowdrise/${d.crowdrise_id}.yml`
    const type = d.type ? d.type : 'runner'
    const yaml_data = `id : ${d.crowdrise_id}
url : '${url}'
type : '${type}'
`
    fs.writeFile(fn, yaml_data, (err) => {
     if (err) throw err
     console.log(yaml_data);
    })
  }
}

const error = (e) => {
  console.log(e)
}

const url = 'https://www.mocaspike150.org/data/ambassadors.json'
d3.json(url)
  .then(process)
  .catch(error)

