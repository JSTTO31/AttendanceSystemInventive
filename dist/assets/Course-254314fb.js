import{n as C,v as k,x as y,a2 as I,r as S,A as o,B as f,C as s,c as e,F as m,I as v,D as u,E as n,V as i,G as _,a4 as B,N,M as $,ah as x,a5 as w,a6 as D,_ as R}from"./index-646f7b1e.js";import{u as h}from"./course-6e8df1f3.js";import{V as A,a as b}from"./VRow-56c39ee8.js";import{V as L,g as T,n as E,i as F}from"./VCard-76959000.js";import{V as g}from"./VSpacer-4b47a3ac.js";import{V as G}from"./VBtn-4d62f1b6.js";/* empty css              */import"./tag-f2175fc0.js";import"./VProgressCircular-49014e0e.js";const j={class:"d-flex"},M={class:"text-md-subtitle-1 font-weight-medium"},q={key:0},z=C({__name:"CourseListItem",props:{course:{}},setup(t){const c=t,{mobile:l}=k(),{student:p}=y(I()),V=h(),r=S(!1),d=()=>{r.value=!0,V.remove_attendee(c.course.id,p.value.id).then(()=>{r.value=!1})};return(a,U)=>(o(),f(F,{class:"pa-5 rounded-0 mb-2",loading:r.value,disabled:r.value},{default:s(()=>[e(A,null,{default:s(()=>[m(l)?v("",!0):(o(),f(b,{key:0,cols:"2"},{default:s(()=>[e(L,{src:a.course.image},null,8,["src"])]),_:1})),e(b,{cols:m(l)?12:10},{default:s(()=>[u("h5",j,[n(i(a.course.sub_category.name)+" ",1),e(g),u("h5",M,[e(T,null,{default:s(()=>[n("mdi-calendar")]),_:1}),n(" Day "),a.course.number_of_session>1?(o(),_("span",q,"1 -")):v("",!0),n(" "+i(a.course.number_of_session),1)])]),u("h2",null,i(a.course.name),1),u("p",null,i(a.course.description),1)]),_:1},8,["cols"])]),_:1}),e(E,null,{default:s(()=>[e(g),e(G,{color:"error","prepend-icon":"mdi-trash-can",onClick:d},{default:s(()=>[n("Remove")]),_:1})]),_:1})]),_:1},8,["loading","disabled"]))}}),H=t=>(w("data-v-0ffb9a7f"),t=t(),D(),t),J={key:0},K={key:1,class:"pt-15 d-flex justify-center"},O=H(()=>u("h3",null,"No courses taken",-1)),P=[O],Q=C({__name:"Course",setup(t){const{courses:c}=y(h()),l=h(),p=B();return l.getAll(p.params.student_id),(V,r)=>m(c).length>0?(o(),_("div",J,[e(x,{name:"slide"},{default:s(()=>[(o(!0),_(N,null,$(m(c),d=>(o(),f(z,{class:"mb-5",key:d.id,course:d},null,8,["course"]))),128))]),_:1})])):(o(),_("div",K,P))}});const re=R(Q,[["__scopeId","data-v-0ffb9a7f"]]);export{re as default};
