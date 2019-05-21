const fs = require('fs')
const d3 = require('d3')
global.fetch = require('node-fetch')

const process = (data) => {
  console.log(data)
  for(const k in data) {
    console.log(data[k].url)
  }
}

const error = (e) => {
  console.log(e)
}

const url = 'https://www.mocaspike150.org/donation/data/crowdrise.json'
d3.json(url)
  .then(process)
  .catch(error)

