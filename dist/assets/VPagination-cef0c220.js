import{m as E,p as K,a as W,b as j,B as q,C as G}from"./VCard-aef1371f.js";import{m as O,a as Q,u as U}from"./tag-044c96b1.js";import{r as X,ad as H,p as J,$ as x,m as Y,a as Z,j as aa,ae as ea,u as ta,b as ia,v as la,s as na,e as A,d as b,t as f,c as o,l as L,af as k,ag as R,Q as $}from"./index-65b57148.js";import{u as sa}from"./VProgressCircular-82f592c4.js";import{V as P}from"./VBtn-ef1515a2.js";function ra(){const a=X([]);H(()=>a.value=[]);function V(n,p){a.value[p]=n}return{refs:a,updateRef:V}}const ua=J({activeColor:String,start:{type:[Number,String],default:1},modelValue:{type:Number,default:a=>a.start},disabled:Boolean,length:{type:[Number,String],default:1,validator:a=>a%1===0},totalVisible:[Number,String],firstIcon:{type:x,default:"$first"},prevIcon:{type:x,default:"$prev"},nextIcon:{type:x,default:"$next"},lastIcon:{type:x,default:"$last"},ariaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.root"},pageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.page"},currentPageAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.currentPage"},firstAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.first"},previousAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.previous"},nextAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.next"},lastAriaLabel:{type:String,default:"$vuetify.pagination.ariaLabel.last"},ellipsis:{type:String,default:"..."},showFirstLastPage:Boolean,...E(),...O(),...K(),...W(),...j(),...q(),...Q({tag:"nav"}),...Y(),...G({variant:"text"})},"VPagination"),ga=Z()({name:"VPagination",props:ua(),emits:{"update:modelValue":a=>!0,first:a=>!0,prev:a=>!0,next:a=>!0,last:a=>!0},setup(a,V){let{slots:n,emit:p}=V;const l=aa(a,"modelValue"),{t:g,n:B}=ea(),{isRtl:h}=ta(),{themeClasses:C}=ia(a),{width:w}=la(),_=na(-1);A(void 0,{scoped:!0});const{resizeRef:F}=sa(e=>{if(!e.length)return;const{target:t,contentRect:i}=e[0],u=t.querySelector(".v-pagination__list > *");if(!u)return;const v=i.width,y=u.offsetWidth+parseFloat(getComputedStyle(u).marginRight)*2;_.value=I(v,y)}),s=b(()=>parseInt(a.length,10)),r=b(()=>parseInt(a.start,10)),c=b(()=>a.totalVisible?parseInt(a.totalVisible,10):_.value>=0?_.value:I(w.value,58));function I(e,t){const i=a.showFirstLastPage?5:3;return Math.max(0,Math.floor(+((e-t*i)/t).toFixed(2)))}const D=b(()=>{if(s.value<=0||isNaN(s.value)||s.value>Number.MAX_SAFE_INTEGER)return[];if(c.value<=1)return[l.value];if(s.value<=c.value)return k(s.value,r.value);const e=c.value%2===0,t=e?c.value/2:Math.floor(c.value/2),i=e?t:t+1,u=s.value-t;if(i-l.value>=0)return[...k(Math.max(1,c.value-1),r.value),a.ellipsis,s.value];if(l.value-u>=(e?1:0)){const v=c.value-1,y=s.value-v+r.value;return[r.value,a.ellipsis,...k(v,y)]}else{const v=Math.max(1,c.value-3),y=v===1?l.value:l.value-Math.ceil(v/2)+r.value;return[r.value,a.ellipsis,...k(v,y),a.ellipsis,s.value]}});function m(e,t,i){e.preventDefault(),l.value=t,i&&p(i,t)}const{refs:M,updateRef:N}=ra();A({VPaginationBtn:{color:f(a,"color"),border:f(a,"border"),density:f(a,"density"),size:f(a,"size"),variant:f(a,"variant"),rounded:f(a,"rounded"),elevation:f(a,"elevation")}});const z=b(()=>D.value.map((e,t)=>{const i=u=>N(u,t);if(typeof e=="string")return{isActive:!1,key:`ellipsis-${t}`,page:e,props:{ref:i,ellipsis:!0,icon:!0,disabled:!0}};{const u=e===l.value;return{isActive:u,key:e,page:B(e),props:{ref:i,ellipsis:!1,icon:!0,disabled:!!a.disabled||+a.length<2,color:u?a.activeColor:a.color,ariaCurrent:u,ariaLabel:g(u?a.currentPageAriaLabel:a.pageAriaLabel,e),onClick:v=>m(v,e)}}}})),d=b(()=>{const e=!!a.disabled||l.value<=r.value,t=!!a.disabled||l.value>=r.value+s.value-1;return{first:a.showFirstLastPage?{icon:h.value?a.lastIcon:a.firstIcon,onClick:i=>m(i,r.value,"first"),disabled:e,ariaLabel:g(a.firstAriaLabel),ariaDisabled:e}:void 0,prev:{icon:h.value?a.nextIcon:a.prevIcon,onClick:i=>m(i,l.value-1,"prev"),disabled:e,ariaLabel:g(a.previousAriaLabel),ariaDisabled:e},next:{icon:h.value?a.prevIcon:a.nextIcon,onClick:i=>m(i,l.value+1,"next"),disabled:t,ariaLabel:g(a.nextAriaLabel),ariaDisabled:t},last:a.showFirstLastPage?{icon:h.value?a.firstIcon:a.lastIcon,onClick:i=>m(i,r.value+s.value-1,"last"),disabled:t,ariaLabel:g(a.lastAriaLabel),ariaDisabled:t}:void 0}});function S(){var t;const e=l.value-r.value;(t=M.value[e])==null||t.$el.focus()}function T(e){e.key===R.left&&!a.disabled&&l.value>+a.start?(l.value=l.value-1,$(S)):e.key===R.right&&!a.disabled&&l.value<r.value+s.value-1&&(l.value=l.value+1,$(S))}return U(()=>o(a.tag,{ref:F,class:["v-pagination",C.value,a.class],style:a.style,role:"navigation","aria-label":g(a.ariaLabel),onKeydown:T,"data-test":"v-pagination-root"},{default:()=>[o("ul",{class:"v-pagination__list"},[a.showFirstLastPage&&o("li",{key:"first",class:"v-pagination__first","data-test":"v-pagination-first"},[n.first?n.first(d.value.first):o(P,L({_as:"VPaginationBtn"},d.value.first),null)]),o("li",{key:"prev",class:"v-pagination__prev","data-test":"v-pagination-prev"},[n.prev?n.prev(d.value.prev):o(P,L({_as:"VPaginationBtn"},d.value.prev),null)]),z.value.map((e,t)=>o("li",{key:e.key,class:["v-pagination__item",{"v-pagination__item--is-active":e.isActive}],"data-test":"v-pagination-item"},[n.item?n.item(e):o(P,L({_as:"VPaginationBtn"},e.props),{default:()=>[e.page]})])),o("li",{key:"next",class:"v-pagination__next","data-test":"v-pagination-next"},[n.next?n.next(d.value.next):o(P,L({_as:"VPaginationBtn"},d.value.next),null)]),a.showFirstLastPage&&o("li",{key:"last",class:"v-pagination__last","data-test":"v-pagination-last"},[n.last?n.last(d.value.last):o(P,L({_as:"VPaginationBtn"},d.value.last),null)])])]})),{}}});export{ga as V};