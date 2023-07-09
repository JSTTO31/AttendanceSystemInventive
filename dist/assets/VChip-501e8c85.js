import{p as L,aq as W,m as R,a as E,b as z,e as Y,t as r,c as l,$ as C,as as G,ae as Z,j as ee,d as b,aj as V,ak as _,at as ae,N as x,l as le}from"./index-df5c3e00.js";import{b as te}from"./index-3b25c727.js";import{m as F,a as T,u as ne}from"./tag-c06c36d9.js";import{a as se,u as ie,b as ce,c as de}from"./VBtn-041272dd.js";import{C as $,m as oe,p as ue,a as re,b as ve,F as fe,B as me,R as pe,c as ke,G as he,v as ye,d as Ce,e as be,H as Ve,J as Ie,K as ge,g as v,f,l as D}from"./VCard-5d4c2059.js";const w=Symbol.for("vuetify:v-chip-group"),Pe=L({column:Boolean,filter:Boolean,valueComparator:{type:Function,default:W},...F(),...se({selectedClass:"v-chip--selected"}),...T(),...R(),...$({variant:"tonal"})},"VChipGroup");E()({name:"VChipGroup",props:Pe(),emits:{"update:modelValue":e=>!0},setup(e,m){let{slots:c}=m;const{themeClasses:o}=z(e),{isSelected:t,select:p,next:k,prev:h,selected:y}=ie(e,w);return Y({VChip:{color:r(e,"color"),disabled:r(e,"disabled"),filter:r(e,"filter"),variant:r(e,"variant")}}),ne(()=>l(e.tag,{class:["v-chip-group",{"v-chip-group--column":e.column},o.value,e.class],style:e.style},{default:()=>{var u;return[(u=c.default)==null?void 0:u.call(c,{isSelected:t,select:p,next:k,prev:h,selected:y.value})]}})),{}}});const Se=L({activeClass:String,appendAvatar:String,appendIcon:C,closable:Boolean,closeIcon:{type:C,default:"$delete"},closeLabel:{type:String,default:"$vuetify.close"},draggable:Boolean,filter:Boolean,filterIcon:{type:String,default:"$complete"},label:Boolean,link:{type:Boolean,default:void 0},pill:Boolean,prependAvatar:String,prependIcon:C,ripple:{type:Boolean,default:!0},text:String,modelValue:{type:Boolean,default:!0},onClick:G(),onClickOnce:G(),...oe(),...F(),...ue(),...re(),...ce(),...ve(),...fe(),...me(),...T({tag:"span"}),...R(),...$({variant:"tonal"})},"VChip"),De=E()({name:"VChip",directives:{Ripple:pe},props:Se(),emits:{"click:close":e=>!0,"update:modelValue":e=>!0,"group:selected":e=>!0,click:e=>!0},setup(e,m){let{attrs:c,emit:o,slots:t}=m;const{t:p}=Z(),{borderClasses:k}=ke(e),{colorClasses:h,colorStyles:y,variantClasses:u}=he(e),{densityClasses:K}=ye(e),{elevationClasses:M}=Ce(e),{roundedClasses:j}=be(e),{sizeClasses:q}=Ve(e),{themeClasses:N}=z(e),I=ee(e,"modelValue"),a=de(e,w,!1),s=Ie(e,c),O=b(()=>e.link!==!1&&s.isLink.value),i=b(()=>!e.disabled&&e.link!==!1&&(!!a||e.link||s.isClickable.value)),H=b(()=>({"aria-label":p(e.closeLabel),onClick(n){I.value=!1,o("click:close",n)}}));function g(n){var d;o("click",n),i.value&&((d=s.navigate)==null||d.call(s,n),a==null||a.toggle())}function J(n){(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),g(n))}return()=>{const n=s.isLink.value?"a":e.tag,d=!!(e.appendIcon||e.appendAvatar),X=!!(d||t.append),Q=!!(t.close||e.closable),P=!!(t.filter||e.filter)&&a,S=!!(e.prependIcon||e.prependAvatar),U=!!(S||t.prepend),A=!a||a.isSelected.value;return I.value&&V(l(n,{class:["v-chip",{"v-chip--disabled":e.disabled,"v-chip--label":e.label,"v-chip--link":i.value,"v-chip--filter":P,"v-chip--pill":e.pill},N.value,k.value,A?h.value:void 0,K.value,M.value,j.value,q.value,u.value,a==null?void 0:a.selectedClass.value,e.class],style:[A?y.value:void 0,e.style],disabled:e.disabled||void 0,draggable:e.draggable,href:s.href.value,tabindex:i.value?0:void 0,onClick:g,onKeydown:i.value&&!O.value&&J},{default:()=>{var B;return[ge(i.value,"v-chip"),P&&l(te,{key:"filter"},{default:()=>[V(l("div",{class:"v-chip__filter"},[t.filter?V(l(f,{key:"filter-defaults",disabled:!e.filterIcon,defaults:{VIcon:{icon:e.filterIcon}}},null),[[_("slot"),t.filter,"default"]]):l(v,{key:"filter-icon",icon:e.filterIcon},null)]),[[ae,a.isSelected.value]])]}),U&&l("div",{key:"prepend",class:"v-chip__prepend"},[t.prepend?l(f,{key:"prepend-defaults",disabled:!S,defaults:{VAvatar:{image:e.prependAvatar,start:!0},VIcon:{icon:e.prependIcon,start:!0}}},t.prepend):l(x,null,[e.prependIcon&&l(v,{key:"prepend-icon",icon:e.prependIcon,start:!0},null),e.prependAvatar&&l(D,{key:"prepend-avatar",image:e.prependAvatar,start:!0},null)])]),l("div",{class:"v-chip__content"},[((B=t.default)==null?void 0:B.call(t,{isSelected:a==null?void 0:a.isSelected.value,selectedClass:a==null?void 0:a.selectedClass.value,select:a==null?void 0:a.select,toggle:a==null?void 0:a.toggle,value:a==null?void 0:a.value.value,disabled:e.disabled}))??e.text]),X&&l("div",{key:"append",class:"v-chip__append"},[t.append?l(f,{key:"append-defaults",disabled:!d,defaults:{VAvatar:{end:!0,image:e.appendAvatar},VIcon:{end:!0,icon:e.appendIcon}}},t.append):l(x,null,[e.appendIcon&&l(v,{key:"append-icon",end:!0,icon:e.appendIcon},null),e.appendAvatar&&l(D,{key:"append-avatar",end:!0,image:e.appendAvatar},null)])]),Q&&l("div",le({key:"close",class:"v-chip__close"},H.value),[t.close?l(f,{key:"close-defaults",defaults:{VIcon:{icon:e.closeIcon,size:"x-small"}}},t.close):l(v,{key:"close-icon",icon:e.closeIcon,size:"x-small"},null)])]}}),[[_("ripple"),i.value&&e.ripple,null]])}}});export{De as V};
