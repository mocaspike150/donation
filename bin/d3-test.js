const fs = require('fs')
const d3 = require('d3')
const amount = require('../lib/amount')
const yaml = require('js-yaml')
global.fetch = require('node-fetch')

const save = (data) => {
  console.log(yaml.safeDump(data))
}

const process = (data) => {
  for(const id in data) {
    amount(data, id, save)
  }
}

const error = (e) => {
  console.log(e)
}

const url = 'https://www.mocaspike150.org/donation/data/crowdrise.json'
d3.json(url)
  .then(process)
  .catch(error)

