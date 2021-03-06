global.fetch = require('node-fetch')
const fs = require('fs')
const d3 = require('d3')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const crowdrise = 'https://www.mocaspike150.org/donation/data/crowdrise.json'

const id = process.argv[2] ? process.argv[2] : '5161826'

let total = 0;
let count = 0;

const get = (data) => {
  const url = data[id].url
  const type = data[id].type
  const path = `_data/${type}`
  const fn = `${path}/${id}.json` 
  console.log(url)
  JSDOM.fromURL(url)
    .then( (dom) => {
      const html = dom.window.document.querySelector('h2.raised').innerHTML
      const amount = html.replace(/\$/, '').replace(/,/, '')
      const data = {amount: parseInt(amount)}
      fs.writeFile(fn, JSON.stringify(data), (err) => {
        if (err) throw err;
        console.log(fn);
      })
  })
  .catch(error)
}

const error = (err) => { }

d3.json(crowdrise)
  .then(get)
  .catch(error);

