import{C as l,p as n,a as o,b as i,B as p,c,L as d,d as u}from"./index-100a9889.js";import{_ as f,W as m,o as _,p as h}from"./index-1b2f18c0.js";l.register(n,o,i,p,c,d);const b={name:"BarChart",components:{Bar:u},props:{chartData:{default:()=>({labels:["January","February","March","February","March"],datasets:[{data:[40,20,12,20,12],backgroundColor:["#2196F3","#2196F3","#2196F3"],borderRadius:5,barThickness:155}]})}},data(){return{chartOptions:{responsive:!0,plugins:{tooltip:{callbacks:{label:function(r){let a=r.dataset.label||"";return a&&(a+=": "),r.parsed.y!==null&&(a+=new Intl.NumberFormat("en-US").format(r.parsed.y),a+="/550h"),a}}},legend:{display:!1}},scales:{y:{display:!1,grid:{display:!1}},x:{grid:{display:!1}}}}}}};function y(r,a,e,g,s,B){const t=m("Bar");return _(),h(t,{id:"my-chart-id",options:s.chartOptions,data:e.chartData},null,8,["options","data"])}const k=f(b,[["render",y]]);export{k as C};
