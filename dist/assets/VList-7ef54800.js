import{at as G,D as M,a2 as R,au as O,r as A,x as L,L as te,j as f,K as ue,av as Ke,ap as He,aw as Ue,O as x,y as F,A as C,a as v,S as ce,T as ze,ax as ne,z as de,I as qe,B as ve,ay as Je,az as We,F as ae,N as le,ar as Qe,aA as V,R as fe,E as Xe,aB as Ye}from"./index-1b2f18c0.js";import{V as Ze}from"./index-45aa9782.js";import{m as N,f as $,u as j,o as J,M as et,v as me,g as ye,w as ge,x as pe,h as he,i as Se,H as tt,F as be,R as nt,I as at,k as Ce,J as lt,z as ke,A as Ie,l as Ve,n as we,K as st,a as se,t as ie,r as it,j as rt}from"./VCard-81742aa1.js";import{u as ot}from"./ssrBoot-a37f06b1.js";import{V as ut}from"./VDivider-04be6cf6.js";const W=Symbol.for("vuetify:list");function Ae(){const e=G(W,{hasPrepend:M(!1),updateHasPrepend:()=>null}),l={hasPrepend:M(!1),updateHasPrepend:t=>{t&&(l.hasPrepend.value=t)}};return R(W,l),e}function Pe(){return G(W,null)}const ct={open:e=>{let{id:l,value:t,opened:n,parents:s}=e;if(t){const a=new Set;a.add(l);let i=s.get(l);for(;i!=null;)a.add(i),i=s.get(i);return a}else return n.delete(l),n},select:()=>null},Le={open:e=>{let{id:l,value:t,opened:n,parents:s}=e;if(t){let a=s.get(l);for(n.add(l);a!=null&&a!==l;)n.add(a),a=s.get(a);return n}else n.delete(l);return n},select:()=>null},dt={open:Le.open,select:e=>{let{id:l,value:t,opened:n,parents:s}=e;if(!t)return n;const a=[];let i=s.get(l);for(;i!=null;)a.push(i),i=s.get(i);return new Set(a)}},Q=e=>{const l={select:t=>{let{id:n,value:s,selected:a}=t;if(n=O(n),e&&!s){const i=Array.from(a.entries()).reduce((r,S)=>{let[h,m]=S;return m==="on"?[...r,h]:r},[]);if(i.length===1&&i[0]===n)return a}return a.set(n,s?"on":"off"),a},in:(t,n,s)=>{let a=new Map;for(const i of t||[])a=l.select({id:i,value:!0,selected:new Map(a),children:n,parents:s});return a},out:t=>{const n=[];for(const[s,a]of t.entries())a==="on"&&n.push(s);return n}};return l},Be=e=>{const l=Q(e);return{select:n=>{let{selected:s,id:a,...i}=n;a=O(a);const r=s.has(a)?new Map([[a,s.get(a)]]):new Map;return l.select({...i,id:a,selected:r})},in:(n,s,a)=>{let i=new Map;return n!=null&&n.length&&(i=l.in(n.slice(0,1),s,a)),i},out:(n,s,a)=>l.out(n,s,a)}},vt=e=>{const l=Q(e);return{select:n=>{let{id:s,selected:a,children:i,...r}=n;return s=O(s),i.has(s)?a:l.select({id:s,selected:a,children:i,...r})},in:l.in,out:l.out}},ft=e=>{const l=Be(e);return{select:n=>{let{id:s,selected:a,children:i,...r}=n;return s=O(s),i.has(s)?a:l.select({id:s,selected:a,children:i,...r})},in:l.in,out:l.out}},mt=e=>{const l={select:t=>{let{id:n,value:s,selected:a,children:i,parents:r}=t;n=O(n);const S=new Map(a),h=[n];for(;h.length;){const o=h.shift();a.set(o,s?"on":"off"),i.has(o)&&h.push(...i.get(o))}let m=r.get(n);for(;m;){const o=i.get(m),u=o.every(d=>a.get(d)==="on"),c=o.every(d=>!a.has(d)||a.get(d)==="off");a.set(m,u?"on":c?"off":"indeterminate"),m=r.get(m)}return e&&!s&&Array.from(a.entries()).reduce((u,c)=>{let[d,y]=c;return y==="on"?[...u,d]:u},[]).length===0?S:a},in:(t,n,s)=>{let a=new Map;for(const i of t||[])a=l.select({id:i,value:!0,selected:new Map(a),children:n,parents:s});return a},out:(t,n)=>{const s=[];for(const[a,i]of t.entries())i==="on"&&!n.has(a)&&s.push(a);return s}};return l},T=Symbol.for("vuetify:nested"),xe={id:M(),root:{register:()=>null,unregister:()=>null,parents:A(new Map),children:A(new Map),open:()=>null,openOnSelect:()=>null,select:()=>null,opened:A(new Set),selected:A(new Map),selectedValues:A([])}},yt=L({selectStrategy:[String,Function],openStrategy:[String,Object],opened:Array,selected:Array,mandatory:Boolean},"nested"),gt=e=>{let l=!1;const t=A(new Map),n=A(new Map),s=te(e,"opened",e.opened,o=>new Set(o),o=>[...o.values()]),a=f(()=>{if(typeof e.selectStrategy=="object")return e.selectStrategy;switch(e.selectStrategy){case"single-leaf":return ft(e.mandatory);case"leaf":return vt(e.mandatory);case"independent":return Q(e.mandatory);case"single-independent":return Be(e.mandatory);case"classic":default:return mt(e.mandatory)}}),i=f(()=>{if(typeof e.openStrategy=="object")return e.openStrategy;switch(e.openStrategy){case"list":return dt;case"single":return ct;case"multiple":default:return Le}}),r=te(e,"selected",e.selected,o=>a.value.in(o,t.value,n.value),o=>a.value.out(o,t.value,n.value));ue(()=>{l=!0});function S(o){const u=[];let c=o;for(;c!=null;)u.unshift(c),c=n.value.get(c);return u}const h=Ke("nested"),m={id:M(),root:{opened:s,selected:r,selectedValues:f(()=>{const o=[];for(const[u,c]of r.value.entries())c==="on"&&o.push(u);return o}),register:(o,u,c)=>{u&&o!==u&&n.value.set(o,u),c&&t.value.set(o,[]),u!=null&&t.value.set(u,[...t.value.get(u)||[],o])},unregister:o=>{if(l)return;t.value.delete(o);const u=n.value.get(o);if(u){const c=t.value.get(u)??[];t.value.set(u,c.filter(d=>d!==o))}n.value.delete(o),s.value.delete(o)},open:(o,u,c)=>{h.emit("click:open",{id:o,value:u,path:S(o),event:c});const d=i.value.open({id:o,value:u,opened:new Set(s.value),children:t.value,parents:n.value,event:c});d&&(s.value=d)},openOnSelect:(o,u,c)=>{const d=i.value.select({id:o,value:u,selected:new Map(r.value),opened:new Set(s.value),children:t.value,parents:n.value,event:c});d&&(s.value=d)},select:(o,u,c)=>{h.emit("click:select",{id:o,value:u,path:S(o),event:c});const d=a.value.select({id:o,value:u,selected:new Map(r.value),children:t.value,parents:n.value,event:c});d&&(r.value=d),m.root.openOnSelect(o,u,c)},children:t,parents:n}};return R(T,m),m.root},Oe=(e,l)=>{const t=G(T,xe),n=Symbol(He()),s=f(()=>e.value??n),a={...t,id:s,open:(i,r)=>t.root.open(s.value,i,r),openOnSelect:(i,r)=>t.root.openOnSelect(s.value,i,r),isOpen:f(()=>t.root.opened.value.has(s.value)),parent:f(()=>t.root.parents.value.get(s.value)),select:(i,r)=>t.root.select(s.value,i,r),isSelected:f(()=>t.root.selected.value.get(O(s.value))==="on"),isIndeterminate:f(()=>t.root.selected.value.get(s.value)==="indeterminate"),isLeaf:f(()=>!t.root.children.value.get(s.value)),isGroupActivator:t.isGroupActivator};return!t.isGroupActivator&&t.root.register(s.value,t.id.value,l),ue(()=>{!t.isGroupActivator&&t.root.unregister(s.value)}),l&&R(T,a),a},pt=()=>{const e=G(T,xe);R(T,{...e,isGroupActivator:!0})},ht=Ue({name:"VListGroupActivator",setup(e,l){let{slots:t}=l;return pt(),()=>{var n;return(n=t.default)==null?void 0:n.call(t)}}}),St=L({activeColor:String,baseColor:String,color:String,collapseIcon:{type:x,default:"$collapse"},expandIcon:{type:x,default:"$expand"},prependIcon:x,appendIcon:x,fluid:Boolean,subgroup:Boolean,title:String,value:null,...N(),...$()},"VListGroup"),re=F()({name:"VListGroup",props:St(),setup(e,l){let{slots:t}=l;const{isOpen:n,open:s,id:a}=Oe(C(e,"value"),!0),i=f(()=>`v-list-group--id-${String(a.value)}`),r=Pe(),{isBooted:S}=ot();function h(c){s(!n.value,c)}const m=f(()=>({onClick:h,class:"v-list-group__header",id:i.value})),o=f(()=>n.value?e.collapseIcon:e.expandIcon),u=f(()=>({VListItem:{active:n.value,activeColor:e.activeColor,baseColor:e.baseColor,color:e.color,prependIcon:e.prependIcon||e.subgroup&&o.value,appendIcon:e.appendIcon||!e.subgroup&&o.value,title:e.title,value:e.value}}));return j(()=>v(e.tag,{class:["v-list-group",{"v-list-group--prepend":r==null?void 0:r.hasPrepend.value,"v-list-group--fluid":e.fluid,"v-list-group--subgroup":e.subgroup,"v-list-group--open":n.value},e.class],style:e.style},{default:()=>[t.activator&&v(J,{defaults:u.value},{default:()=>[v(ht,null,{default:()=>[t.activator({props:m.value,isOpen:n.value})]})]}),v(et,{transition:{component:Ze},disabled:!S.value},{default:()=>{var c;return[ce(v("div",{class:"v-list-group__items",role:"group","aria-labelledby":i.value},[(c=t.default)==null?void 0:c.call(t)]),[[ze,n.value]])]}})]})),{}}});const bt=me("v-list-item-subtitle"),Ct=me("v-list-item-title"),kt=L({active:{type:Boolean,default:void 0},activeClass:String,activeColor:String,appendAvatar:String,appendIcon:x,baseColor:String,disabled:Boolean,lines:String,link:{type:Boolean,default:void 0},nav:Boolean,prependAvatar:String,prependIcon:x,ripple:{type:Boolean,default:!0},subtitle:[String,Number,Boolean],title:[String,Number,Boolean],value:null,onClick:ne(),onClickOnce:ne(),...ye(),...N(),...ge(),...pe(),...he(),...Se(),...tt(),...$(),...de(),...be({variant:"text"})},"VListItem"),oe=F()({name:"VListItem",directives:{Ripple:nt},props:kt(),emits:{click:e=>!0},setup(e,l){let{attrs:t,slots:n,emit:s}=l;const a=at(e,t),i=f(()=>e.value??a.href.value),{select:r,isSelected:S,isIndeterminate:h,isGroupActivator:m,root:o,parent:u,openOnSelect:c}=Oe(i,!1),d=Pe(),y=f(()=>{var p;return e.active!==!1&&(e.active||((p=a.isActive)==null?void 0:p.value)||S.value)}),g=f(()=>e.link!==!1&&a.isLink.value),I=f(()=>!e.disabled&&e.link!==!1&&(e.link||a.isClickable.value||e.value!=null&&!!d)),B=f(()=>e.rounded||e.nav),P=f(()=>e.color??e.activeColor),E=f(()=>({color:y.value?P.value??e.baseColor:e.baseColor,variant:e.variant}));qe(()=>{var p;return(p=a.isActive)==null?void 0:p.value},p=>{p&&u.value!=null&&o.open(u.value,!0),p&&c(p)},{immediate:!0});const{themeClasses:K}=ve(e),{borderClasses:H}=Ce(e),{colorClasses:U,colorStyles:w,variantClasses:b}=lt(E),{densityClasses:_}=ke(e),{dimensionStyles:De}=Ie(e),{elevationClasses:Ge}=Ve(e),{roundedClasses:Re}=we(B),Ne=f(()=>e.lines?`v-list-item--${e.lines}-line`:void 0),z=f(()=>({isActive:y.value,select:r,isSelected:S.value,isIndeterminate:h.value}));function X(p){var D;s("click",p),!(m||!I.value)&&((D=a.navigate)==null||D.call(a,p),e.value!=null&&r(!S.value,p))}function $e(p){(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),X(p))}return j(()=>{const p=g.value?"a":e.tag,D=n.title||e.title,je=n.subtitle||e.subtitle,Y=!!(e.appendAvatar||e.appendIcon),Ee=!!(Y||n.append),Z=!!(e.prependAvatar||e.prependIcon),q=!!(Z||n.prepend);return d==null||d.updateHasPrepend(q),e.activeColor&&Je("active-color",["color","base-color"]),ce(v(p,{class:["v-list-item",{"v-list-item--active":y.value,"v-list-item--disabled":e.disabled,"v-list-item--link":I.value,"v-list-item--nav":e.nav,"v-list-item--prepend":!q&&(d==null?void 0:d.hasPrepend.value),[`${e.activeClass}`]:e.activeClass&&y.value},K.value,H.value,U.value,_.value,Ge.value,Ne.value,Re.value,b.value,e.class],style:[w.value,De.value,e.style],href:a.href.value,tabindex:I.value?d?-2:0:void 0,onClick:X,onKeydown:I.value&&!g.value&&$e},{default:()=>{var ee;return[st(I.value||y.value,"v-list-item"),q&&v("div",{key:"prepend",class:"v-list-item__prepend"},[n.prepend?v(J,{key:"prepend-defaults",disabled:!Z,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon},VListItemAction:{start:!0}}},{default:()=>{var k;return[(k=n.prepend)==null?void 0:k.call(n,z.value)]}}):v(ae,null,[e.prependAvatar&&v(se,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&v(ie,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)])]),v("div",{class:"v-list-item__content","data-no-activator":""},[D&&v(Ct,{key:"title"},{default:()=>{var k;return[((k=n.title)==null?void 0:k.call(n,{title:e.title}))??e.title]}}),je&&v(bt,{key:"subtitle"},{default:()=>{var k;return[((k=n.subtitle)==null?void 0:k.call(n,{subtitle:e.subtitle}))??e.subtitle]}}),(ee=n.default)==null?void 0:ee.call(n,z.value)]),Ee&&v("div",{key:"append",class:"v-list-item__append"},[n.append?v(J,{key:"append-defaults",disabled:!Y,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon},VListItemAction:{end:!0}}},{default:()=>{var k;return[(k=n.append)==null?void 0:k.call(n,z.value)]}}):v(ae,null,[e.appendIcon&&v(ie,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&v(se,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)])])]}}),[[We("ripple"),I.value&&e.ripple]])}),{}}}),It=L({color:String,inset:Boolean,sticky:Boolean,title:String,...N(),...$()},"VListSubheader"),Vt=F()({name:"VListSubheader",props:It(),setup(e,l){let{slots:t}=l;const{textColorClasses:n,textColorStyles:s}=it(C(e,"color"));return j(()=>{const a=!!(t.default||e.title);return v(e.tag,{class:["v-list-subheader",{"v-list-subheader--inset":e.inset,"v-list-subheader--sticky":e.sticky},n.value,e.class],style:[{textColorStyles:s},e.style]},{default:()=>{var i;return[a&&v("div",{class:"v-list-subheader__text"},[((i=t.default)==null?void 0:i.call(t))??e.title])]}})}),{}}}),wt=L({items:Array},"VListChildren"),Me=F()({name:"VListChildren",props:wt(),setup(e,l){let{slots:t}=l;return Ae(),()=>{var n,s;return((n=t.default)==null?void 0:n.call(t))??((s=e.items)==null?void 0:s.map(a=>{var c,d;let{children:i,props:r,type:S,raw:h}=a;if(S==="divider")return((c=t.divider)==null?void 0:c.call(t,{props:r}))??v(ut,r,null);if(S==="subheader")return((d=t.subheader)==null?void 0:d.call(t,{props:r}))??v(Vt,r,null);const m={subtitle:t.subtitle?y=>{var g;return(g=t.subtitle)==null?void 0:g.call(t,{...y,item:h})}:void 0,prepend:t.prepend?y=>{var g;return(g=t.prepend)==null?void 0:g.call(t,{...y,item:h})}:void 0,append:t.append?y=>{var g;return(g=t.append)==null?void 0:g.call(t,{...y,item:h})}:void 0,title:t.title?y=>{var g;return(g=t.title)==null?void 0:g.call(t,{...y,item:h})}:void 0},[o,u]=re.filterProps(r);return i?v(re,le({value:r==null?void 0:r.value},o),{activator:y=>{let{props:g}=y;return t.header?t.header({props:{...r,...g}}):v(oe,le(r,g),m)},default:()=>v(Me,{items:i},t)}):t.item?t.item({props:r}):v(oe,r,m)}))}}}),At=L({items:{type:Array,default:()=>[]},itemTitle:{type:[String,Array,Function],default:"title"},itemValue:{type:[String,Array,Function],default:"value"},itemChildren:{type:[Boolean,String,Array,Function],default:"children"},itemProps:{type:[Boolean,String,Array,Function],default:"props"},returnObject:Boolean},"list-items");function Te(e,l){const t=V(l,e.itemTitle,l),n=e.returnObject?l:V(l,e.itemValue,t),s=V(l,e.itemChildren),a=e.itemProps===!0?typeof l=="object"&&l!=null&&!Array.isArray(l)?"children"in l?fe(l,["children"])[1]:l:void 0:V(l,e.itemProps),i={title:t,value:n,...a};return{title:String(i.title??""),value:i.value,props:i,children:Array.isArray(s)?Fe(e,s):void 0,raw:l}}function Fe(e,l){const t=[];for(const n of l)t.push(Te(e,n));return t}function Gt(e){const l=f(()=>Fe(e,e.items));return Pt(l,t=>Te(e,t))}function Pt(e,l){function t(s){return s.map(a=>e.value.find(r=>Qe(a,r.value))??l(a))}function n(s){return s.map(a=>{let{value:i}=a;return i})}return{items:e,transformIn:t,transformOut:n}}function Lt(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"}function Bt(e,l){const t=V(l,e.itemType,"item"),n=Lt(l)?l:V(l,e.itemTitle),s=V(l,e.itemValue,void 0),a=V(l,e.itemChildren),i=e.itemProps===!0?fe(l,["children"])[1]:V(l,e.itemProps),r={title:n,value:s,...i};return{type:t,title:r.title,value:r.value,props:r,children:t==="item"&&a?_e(e,a):void 0,raw:l}}function _e(e,l){const t=[];for(const n of l)t.push(Bt(e,n));return t}function xt(e){return{items:f(()=>_e(e,e.items))}}const Ot=L({baseColor:String,activeColor:String,activeClass:String,bgColor:String,disabled:Boolean,lines:{type:[Boolean,String],default:"one"},nav:Boolean,...yt({selectStrategy:"single-leaf",openStrategy:"list"}),...ye(),...N(),...ge(),...pe(),...he(),itemType:{type:String,default:"type"},...At(),...Se(),...$(),...de(),...be({variant:"text"})},"VList"),Rt=F()({name:"VList",props:Ot(),emits:{"update:selected":e=>!0,"update:opened":e=>!0,"click:open":e=>!0,"click:select":e=>!0},setup(e,l){let{slots:t}=l;const{items:n}=xt(e),{themeClasses:s}=ve(e),{backgroundColorClasses:a,backgroundColorStyles:i}=rt(C(e,"bgColor")),{borderClasses:r}=Ce(e),{densityClasses:S}=ke(e),{dimensionStyles:h}=Ie(e),{elevationClasses:m}=Ve(e),{roundedClasses:o}=we(e),{open:u,select:c}=gt(e),d=f(()=>e.lines?`v-list--${e.lines}-line`:void 0),y=C(e,"activeColor"),g=C(e,"baseColor"),I=C(e,"color");Ae(),Xe({VListGroup:{activeColor:y,baseColor:g,color:I},VListItem:{activeClass:C(e,"activeClass"),activeColor:y,baseColor:g,color:I,density:C(e,"density"),disabled:C(e,"disabled"),lines:C(e,"lines"),nav:C(e,"nav"),variant:C(e,"variant")}});const B=M(!1),P=A();function E(b){B.value=!0}function K(b){B.value=!1}function H(b){var _;!B.value&&!(b.relatedTarget&&((_=P.value)!=null&&_.contains(b.relatedTarget)))&&w()}function U(b){if(P.value){if(b.key==="ArrowDown")w("next");else if(b.key==="ArrowUp")w("prev");else if(b.key==="Home")w("first");else if(b.key==="End")w("last");else return;b.preventDefault()}}function w(b){if(P.value)return Ye(P.value,b)}return j(()=>v(e.tag,{ref:P,class:["v-list",{"v-list--disabled":e.disabled,"v-list--nav":e.nav},s.value,a.value,r.value,S.value,m.value,d.value,o.value,e.class],style:[i.value,h.value,e.style],tabindex:e.disabled||B.value?-1:0,role:"listbox","aria-activedescendant":void 0,onFocusin:E,onFocusout:K,onFocus:H,onKeydown:U},{default:()=>[v(Me,{items:n.value},t)]})),{open:u,select:c,focus:w}}});export{Rt as V,oe as a,At as m,Gt as u};