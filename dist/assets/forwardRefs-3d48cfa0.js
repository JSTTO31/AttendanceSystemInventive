import{m as b,u as v}from"./tag-c06c36d9.js";import{p as x,m as w,a as y,c as R}from"./index-df5c3e00.js";class m{constructor(s){let{x:n,y:e,width:i,height:t}=s;this.x=n,this.y=e,this.width=i,this.height=t}get top(){return this.y}get bottom(){return this.y+this.height}get left(){return this.x}get right(){return this.x+this.width}}function W(r,s){return{x:{before:Math.max(0,s.left-r.left),after:Math.max(0,r.right-s.right)},y:{before:Math.max(0,s.top-r.top),after:Math.max(0,r.bottom-s.bottom)}}}function L(r){const s=r.getBoundingClientRect(),n=getComputedStyle(r),e=n.transform;if(e){let i,t,o,f,a;if(e.startsWith("matrix3d("))i=e.slice(9,-1).split(/, /),t=+i[0],o=+i[5],f=+i[12],a=+i[13];else if(e.startsWith("matrix("))i=e.slice(7,-1).split(/, /),t=+i[0],o=+i[3],f=+i[4],a=+i[5];else return new m(s);const c=n.transformOrigin,l=s.x-f-(1-t)*parseFloat(c),u=s.y-a-(1-o)*parseFloat(c.slice(c.indexOf(" ")+1)),h=t?s.width/t:r.offsetWidth+1,d=o?s.height/o:r.offsetHeight+1;return new m({x:l,y:u,width:h,height:d})}else return new m(s)}function B(r,s,n){if(typeof r.animate>"u")return{finished:Promise.resolve()};let e;try{e=r.animate(s,n)}catch{return{finished:Promise.resolve()}}return typeof e.finished>"u"&&(e.finished=new Promise(i=>{e.onfinish=()=>{i(e)}})),e}const C="cubic-bezier(0.4, 0, 0.2, 1)",D="cubic-bezier(0.0, 0, 0.2, 1)",F="cubic-bezier(0.4, 0, 1, 1)";const P=x({text:String,clickable:Boolean,...b(),...w()},"VLabel"),M=y()({name:"VLabel",props:P(),setup(r,s){let{slots:n}=s;return v(()=>{var e;return R("label",{class:["v-label",{"v-label--clickable":r.clickable},r.class],style:r.style},[r.text,(e=n.default)==null?void 0:e.call(n)])}),{}}}),p=Symbol("Forwarded refs");function g(r,s){let n=r;for(;n;){const e=Reflect.getOwnPropertyDescriptor(n,s);if(e)return e;n=Object.getPrototypeOf(n)}}function S(r){for(var s=arguments.length,n=new Array(s>1?s-1:0),e=1;e<s;e++)n[e-1]=arguments[e];return r[p]=n,new Proxy(r,{get(i,t){if(Reflect.has(i,t))return Reflect.get(i,t);if(!(typeof t=="symbol"||t.startsWith("__"))){for(const o of n)if(o.value&&Reflect.has(o.value,t)){const f=Reflect.get(o.value,t);return typeof f=="function"?f.bind(o.value):f}}},has(i,t){if(Reflect.has(i,t))return!0;if(typeof t=="symbol"||t.startsWith("__"))return!1;for(const o of n)if(o.value&&Reflect.has(o.value,t))return!0;return!1},getOwnPropertyDescriptor(i,t){var f;const o=Reflect.getOwnPropertyDescriptor(i,t);if(o)return o;if(!(typeof t=="symbol"||t.startsWith("__"))){for(const a of n){if(!a.value)continue;const c=g(a.value,t)??("_"in a.value?g((f=a.value._)==null?void 0:f.setupState,t):void 0);if(c)return c}for(const a of n){const c=a.value&&a.value[p];if(!c)continue;const l=c.slice();for(;l.length;){const u=l.shift(),h=g(u.value,t);if(h)return h;const d=u.value&&u.value[p];d&&l.push(...d)}}}}})}export{m as B,M as V,B as a,F as b,D as d,S as f,W as g,L as n,C as s};
