import{m as b,a as y,u as D,V as d}from"./VOverlay-4618fd3d.js";import{f as h}from"./forwardRefs-3d48cfa0.js";import{p as S,a as w,j as x,r as B,ao as F,w as m,d as I,c as v,l as g,Q as R,ap as T}from"./index-df5c3e00.js";import{f as O}from"./VCard-5d4c2059.js";import{u as A}from"./tag-c06c36d9.js";const C=S({fullscreen:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,...b({origin:"center center",scrollStrategy:"block",transition:{component:y},zIndex:2400})},"VDialog"),M=w()({name:"VDialog",props:C(),emits:{"update:modelValue":a=>!0},setup(a,p){let{slots:c}=p;const n=x(a,"modelValue"),{scopeId:V}=D(),o=B();function i(l){var r,s;const e=l.relatedTarget,t=l.target;if(e!==t&&((r=o.value)!=null&&r.contentEl)&&((s=o.value)!=null&&s.globalTop)&&![document,o.value.contentEl].includes(t)&&!o.value.contentEl.contains(t)){const u=T(o.value.contentEl);if(!u.length)return;const f=u[0],P=u[u.length-1];e===f?P.focus():f.focus()}}F&&m(()=>n.value&&a.retainFocus,l=>{l?document.addEventListener("focusin",i):document.removeEventListener("focusin",i)},{immediate:!0}),m(n,async l=>{var e,t;await R(),l?(e=o.value.contentEl)==null||e.focus({preventScroll:!0}):(t=o.value.activatorEl)==null||t.focus({preventScroll:!0})});const E=I(()=>g({"aria-haspopup":"dialog","aria-expanded":String(n.value)},a.activatorProps));return A(()=>{const[l]=d.filterProps(a);return v(d,g({ref:o,class:["v-dialog",{"v-dialog--fullscreen":a.fullscreen,"v-dialog--scrollable":a.scrollable},a.class],style:a.style},l,{modelValue:n.value,"onUpdate:modelValue":e=>n.value=e,"aria-modal":"true",activatorProps:E.value,role:"dialog"},V),{activator:c.activator,default:function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return v(O,{root:"VDialog"},{default:()=>{var s;return[(s=c.default)==null?void 0:s.call(c,...t)]}})}})}),h({},o)}});export{M as V};
