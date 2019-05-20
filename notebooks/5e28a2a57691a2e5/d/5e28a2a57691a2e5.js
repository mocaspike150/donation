// https://observablehq.com/d/5e28a2a57691a2e5@124
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["data","html"], function(data,html)
{
  let output = `<h1>MOCA Spike 150 Ambassadors</h1>`
  for (const id in data) {
    output += `
<h2>
${data[id].firstname}
${data[id].lastname}
</h2>
<a href="https://www.mocaspike150.org/donation/notebooks/fcafbf967e586a8a/#${id}">
<img src="${data[id]['card-image']}" style="width:128px;"/>
</a>
`
  }
  return html`${output}`
}
);
  main.variable(observer("base")).define("base", function(){return(
`https://www.crowdrise.com/o/en/campaign/moca-spike-150`
)});
  main.variable(observer("name_list")).define("name_list", ["data","cr_name"], function(data,cr_name){return(
data.map(cr_name)
)});
  main.variable(observer("cr_url")).define("cr_url", function(){return(
(d) => {
  const base = 'https://www.crowdrise.com/o/en/campaign'
  return `${base}/${d.team}/${d.crowdrise_page}`
}
)});
  main.variable(observer("cr_name")).define("cr_name", function(){return(
(d) => {
  return `${d.firstname} ${d.lastname}`
}
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
  main.variable(observer()).define(["md"], function(md){return(
md`notebook: https://observablehq.com/d/5e28a2a57691a2e5`
)});
  return main;
}
