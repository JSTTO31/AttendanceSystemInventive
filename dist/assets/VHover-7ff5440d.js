import{m as u,u as t}from"./delay-c95e4996.js";import{x as d,y as m,L as i}from"./index-1b2f18c0.js";const p=d({disabled:Boolean,modelValue:{type:Boolean,default:void 0},...u()},"VHover"),y=m()({name:"VHover",props:p(),emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l;const r=i(e,"modelValue"),{runOpenDelay:s,runCloseDelay:n}=t(e,o=>!e.disabled&&(r.value=o));return()=>{var o;return(o=a.default)==null?void 0:o.call(a,{isHovering:r.value,props:{onMouseenter:s,onMouseleave:n}})}}});export{y as V};