import{m as h,a as S,b as d,V as v}from"./VOverlay-ab69c83c.js";import{f as w}from"./forwardRefs-9d31fcaa.js";import{x as D,a9 as b,y as x,L as O,ap as I,j as f,r as R,at as j,D as k,a2 as A,I as N,N as p,a as V}from"./index-1b2f18c0.js";import{u as T}from"./scopeId-5749c772.js";import{u as U,o as $}from"./VCard-81742aa1.js";const F=D({id:String,...b(h({closeDelay:250,closeOnContentClick:!0,locationStrategy:"connected",openDelay:300,scrim:!1,scrollStrategy:"reposition",transition:{component:S}}),["absolute"])},"VMenu"),G=x()({name:"VMenu",props:F(),emits:{"update:modelValue":a=>!0},setup(a,g){let{slots:t}=g;const o=O(a,"modelValue"),{scopeId:P}=T(),y=I(),u=f(()=>a.id||`v-menu-${y}`),i=R(),e=j(d,null),s=k(0);A(d,{register(){++s.value},unregister(){--s.value},closeParents(){setTimeout(()=>{s.value||(o.value=!1,e==null||e.closeParents())},40)}}),N(o,l=>{l?e==null||e.register():e==null||e.unregister()});function M(){e==null||e.closeParents()}const C=f(()=>p({"aria-haspopup":"menu","aria-expanded":String(o.value),"aria-owns":u.value},a.activatorProps));return U(()=>{const[l]=v.filterProps(a);return V(v,p({ref:i,class:["v-menu",a.class],style:a.style},l,{modelValue:o.value,"onUpdate:modelValue":r=>o.value=r,absolute:!0,activatorProps:C.value,"onClick:outside":M},P),{activator:t.activator,default:function(){for(var r=arguments.length,c=new Array(r),n=0;n<r;n++)c[n]=arguments[n];return V($,{root:"VMenu"},{default:()=>{var m;return[(m=t.default)==null?void 0:m.call(t,...c)]}})}})}),w({id:u,ΨopenChildren:s},i)}});export{G as V};