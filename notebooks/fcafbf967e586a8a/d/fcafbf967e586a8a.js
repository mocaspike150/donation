// https://observablehq.com/d/fcafbf967e586a8a@65
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md","data","id","amount"], function(md,data,id,amount){return(
md`# Ambassador Data Test Page 
##  ${data[id].firstname} ${data[id].lastname}
- id: ${id}
- Donation amount: $${amount}
- Crowdrise_page: ${data[id].crowdrise_page}
`
)});
  main.variable(observer("viewof id")).define("viewof id", ["html"], function(html){return(
html`<input type="number" value="1"/>`
)});
  main.variable(observer("id")).define("id", ["Generators", "viewof id"], (G, _) => G.input(_));
  main.variable(observer("amount")).define("amount", ["html_data"], function*(html_data)
{
  let output = 0
  const to_number = (html) => {
    let text = html.replace(/<h2 class="inline raised">\$/, '').replace(/<\/h2>/, '').replace(/,/, '')
    return parseFloat(text)
  }
  let data =  html_data.split('\n').filter((d) => (d.match(/inline raised/)))[0] 
  yield to_number(data)
}
);
  main.variable(observer()).define(["url_list","id"], function(url_list,id){return(
url_list[id]
)});
  main.variable(observer("html_data")).define("html_data", ["d3","gateway_url"], function(d3,gateway_url){return(
d3.text(gateway_url)
)});
  main.variable(observer("gateway_url")).define("gateway_url", ["url_list","id"], function(url_list,id){return(
`https://gateway.ontouchstart.now.sh/?src=${url_list[id]}`
)});
  main.variable(observer("url_list")).define("url_list", ["data","cr_url"], function(data,cr_url){return(
data.map(cr_url)
)});
  main.variable(observer("cr_url")).define("cr_url", function(){return(
(d) => {
  const base = 'https://www.crowdrise.com/o/en/campaign'
  return `${base}/${d.team}/${d.crowdrise_page}`
}
)});
  main.variable(observer()).define(["data"], function(data){return(
data[0].crowdrise_page
)});
  main.variable(observer()).define(["data"], function(data){return(
data[0].team
)});
  main.variable(observer("data")).define("data", ["d3","url"], function(d3,url){return(
d3.json(url)
)});
  main.variable(observer("url")).define("url", function(){return(
'https://www.mocaspike150.org/data/ambassadors.json'
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require('d3@5')
)});
  return main;
}
