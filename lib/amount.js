const jsdom = require('jsdom')
const { JSDOM } = jsdom


const amount = (data, id, callback) => {
  const url = data[id].url
  JSDOM.fromURL(url, {}).then(dom => {
    const html = dom.window.document.querySelector('h2.raised').innerHTML
    const data = html.replace(/\$/, '').replace(/,/, '')
    callback({ id: id, amount: parseInt(data), url: url })
  });
}

module.exports = amount
