import{r as d,aG as f}from"./index.74d7f585.js";const h=10;function P({url:c="",map:i=t=>({label:t.name,value:t.id}),filters:n=""}){const t=d([]),p={resolvedParams:r=>r};function l(r=""){const a={params:{search:r,per_page:h}};return n&&n.split("&").reduce((s,o)=>{const[e,u]=o.split("=");return s[e]=decodeURIComponent(u),a.params[e]=s[e],s},{}),a}function m(r="",a=()=>{},s=()=>{}){const o=p.resolvedParams(l(r));f.get(c,o).then(({data:e})=>{a(e)}).catch(e=>{e()})}return{hooks:p,options:t,filterFn(r,a,s){m(r,o=>{a(()=>{if(o.data){const e=o.data.map(i);t.value=e}})})},abortFilter(){}}}export{P as s};
