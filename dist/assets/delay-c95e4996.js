import{x as y,aa as D}from"./index-1b2f18c0.js";const i=y({closeDelay:[Number,String],openDelay:[Number,String]},"delay");function c(r,a){const e={},l=o=>()=>{if(!D)return Promise.resolve(!0);const n=o==="openDelay";return e.closeDelay&&window.clearTimeout(e.closeDelay),delete e.closeDelay,e.openDelay&&window.clearTimeout(e.openDelay),delete e.openDelay,new Promise(s=>{const t=parseInt(r[o]??0,10);e[o]=window.setTimeout(()=>{a==null||a(n),s(n)},t)})};return{runCloseDelay:l("closeDelay"),runOpenDelay:l("openDelay")}}export{i as m,c as u};
