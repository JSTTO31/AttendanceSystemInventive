import{B as _,H as V,D as h,W as I}from"./VCard-76959000.js";import{m as T,a as E,u as M}from"./tag-f2175fc0.js";import{r as v,ao as O,i as B,w as U,aS as C,aw as $,p as A,m as D,a as F,b as W,t as y,d as o,ai as G,c as l,f as H}from"./index-646f7b1e.js";function j(e){const n=v(),t=v();if(O){const s=new ResizeObserver(r=>{e==null||e(r,s),r.length&&(t.value=r[0].contentRect)});B(()=>{s.disconnect()}),U(n,(r,a)=>{a&&(s.unobserve(C(a)),t.value=void 0),r&&s.observe(C(r))},{flush:"post"})}return{resizeRef:n,contentRect:$(t)}}const q=A({bgColor:String,color:String,indeterminate:[Boolean,String],modelValue:{type:[Number,String],default:0},rotate:{type:[Number,String],default:0},width:{type:[Number,String],default:4},...T(),..._(),...E({tag:"div"}),...D()},"VProgressCircular"),Q=F()({name:"VProgressCircular",props:q(),setup(e,n){let{slots:t}=n;const s=20,r=2*Math.PI*s,a=v(),{themeClasses:w}=W(e),{sizeClasses:R,sizeStyles:d}=V(e),{textColorClasses:S,textColorStyles:b}=h(y(e,"color")),{textColorClasses:x,textColorStyles:k}=h(y(e,"bgColor")),{intersectionRef:z,isIntersecting:N}=I(),{resizeRef:P,contentRect:m}=j(),i=o(()=>Math.max(0,Math.min(100,parseFloat(e.modelValue)))),u=o(()=>Number(e.width)),f=o(()=>d.value?Number(e.size):m.value?m.value.width:Math.max(u.value,32)),c=o(()=>s/(1-u.value/f.value)*2),g=o(()=>u.value/f.value*c.value),p=o(()=>H((100-i.value)/100*r));return G(()=>{z.value=a.value,P.value=a.value}),M(()=>l(e.tag,{ref:a,class:["v-progress-circular",{"v-progress-circular--indeterminate":!!e.indeterminate,"v-progress-circular--visible":N.value,"v-progress-circular--disable-shrink":e.indeterminate==="disable-shrink"},w.value,R.value,S.value,e.class],style:[d.value,b.value,e.style],role:"progressbar","aria-valuemin":"0","aria-valuemax":"100","aria-valuenow":e.indeterminate?void 0:i.value},{default:()=>[l("svg",{style:{transform:`rotate(calc(-90deg + ${Number(e.rotate)}deg))`},xmlns:"http://www.w3.org/2000/svg",viewBox:`0 0 ${c.value} ${c.value}`},[l("circle",{class:["v-progress-circular__underlay",x.value],style:k.value,fill:"transparent",cx:"50%",cy:"50%",r:s,"stroke-width":g.value,"stroke-dasharray":r,"stroke-dashoffset":0},null),l("circle",{class:"v-progress-circular__overlay",fill:"transparent",cx:"50%",cy:"50%",r:s,"stroke-width":g.value,"stroke-dasharray":r,"stroke-dashoffset":p.value},null)]),t.default&&l("div",{class:"v-progress-circular__content"},[t.default({value:i.value})])]})),{}}});export{Q as V,j as u};