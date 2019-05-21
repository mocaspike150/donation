const jsdom = require('jsdom')
const { JSDOM } = jsdom


const amount = (url, callback) => {
  JSDOM.fromURL(url, {}).then(dom => {
    const html = dom.window.document.querySelector('h2.raised').innerHTML
    const data = html.replace(/\$/, '').replace(/,/, '')
    callback({ url: url, amount: parseInt(data)})
  });
}

module.exports = amount
