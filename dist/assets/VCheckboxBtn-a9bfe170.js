import{m as i,V as d}from"./VSelectionControl-f61f6b98.js";import{x as f,O as V,y as v,L as o,j as c,a as x,N as I}from"./index-1b2f18c0.js";import{u as k}from"./VCard-81742aa1.js";const h=f({indeterminate:Boolean,indeterminateIcon:{type:V,default:"$checkboxIndeterminate"},...i({falseIcon:"$checkboxOff",trueIcon:"$checkboxOn"})},"VCheckboxBtn"),B=v()({name:"VCheckboxBtn",props:h(),emits:{"update:modelValue":e=>!0,"update:indeterminate":e=>!0},setup(e,l){let{slots:u}=l;const t=o(e,"indeterminate"),n=o(e,"modelValue");function r(a){t.value&&(t.value=!1)}const s=c(()=>t.value?e.indeterminateIcon:e.falseIcon),m=c(()=>t.value?e.indeterminateIcon:e.trueIcon);return k(()=>x(d,I(e,{modelValue:n.value,"onUpdate:modelValue":[a=>n.value=a,r],class:["v-checkbox-btn",e.class],style:e.style,type:"checkbox",falseIcon:s.value,trueIcon:m.value,"aria-checked":t.value?"mixed":void 0}),u)),{}}});export{B as V,h as m};
