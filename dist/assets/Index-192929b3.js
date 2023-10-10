import{d as x,s as f,a8 as g,j as k,o as l,p as o,w as t,e as c,a1 as A,a as s,c as b,f as v,F as V,u as p,t as d,aC as B,b as C}from"./index-1b2f18c0.js";import{t as D,V as h}from"./VCard-81742aa1.js";import{V as u,a as w}from"./VRow-bf742394.js";import{_ as $}from"./LineChart.vue_vue_type_script_setup_true_lang-31c950ee.js";import{V as N}from"./VContainer-45cc6a4e.js";import{V as j}from"./VProgressCircular-a7f3ca87.js";import"./index-100a9889.js";const z=x({__name:"AttendanceCalendarWeeklyStatusBar",props:["student","date"],setup(y){const r=y,{weekly_attendances:i}=f(g()),e=k(()=>i.value.find(n=>n.student_id==r.student.id&&new Date(r.date).toDateString()==new Date(n.created_at).toDateString()));return(n,a)=>(l(),o(u,{class:"text-center pa-5",style:{width:"1.714286%"}},{default:t(()=>[e.value?e.value.is_absent?(l(),o(D,{key:1,color:"error"},{default:t(()=>[c("mdi-close-circle")]),_:1})):e.value.policy?(l(),o(D,{key:2,color:"warning"},{default:t(()=>[c("mdi-alert-circle")]),_:1})):(l(),o(D,{key:3,color:"success"},{default:t(()=>[c("mdi-check-circle")]),_:1})):(l(),o(D,{key:0,color:"grey"},{default:t(()=>[c("mdi-reload")]),_:1}))]),_:1}))}}),F=x({__name:"AttendanceCalendarWeekly",setup(y){f(g());const{students:r}=f(A()),i=k(()=>{const e=new Date;e.setDate(e.getDate()-e.getDay());const n=new Date(e);n.setDate(n.getDate()+6);const a=[];for(;e<=n;)a.push(new Date(e)),e.setDate(e.getDate()+1);return a});return(e,n)=>(l(),o(h,{flat:"",class:"rounded-lg border h-100"},{default:t(()=>[s(h,{color:"primary",class:"text-subtitle-1 font-weight-bold rounded-0 d-none d-md-block"},{default:t(()=>[s(w,null,{default:t(()=>[s(u,{class:"text-center bg-black pa-5",style:{width:"2.714286%"}},{default:t(()=>[c("Name")]),_:1}),(l(),b(V,null,v(7,a=>s(u,{class:"text-center pa-5",style:{width:"1.714286%"},key:a},{default:t(()=>[c(d(p(B)(a-1)),1)]),_:2},1024)),64))]),_:1})]),_:1}),s(h,{class:"pa-2 rounded-0",flat:""},{default:t(()=>[(l(!0),b(V,null,v(p(r),a=>(l(),o(w,{key:a.id},{default:t(()=>[s(u,{class:"font-weight-medium text-capitalize pa-5 d-none d-md-block",style:{width:"1.714286%"}},{default:t(()=>[c(d(a.first_name[0])+". "+d(a.last_name),1)]),_:2},1024),s(u,{class:"font-weight-medium text-capitalize pa-5 d-block d-md-none",cols:"12"},{default:t(()=>[c(d(a.first_name)+" "+d(a.last_name),1)]),_:2},1024),(l(!0),b(V,null,v(i.value,(_,m)=>(l(),o(z,{key:m,date:_,student:a},null,8,["date","student"]))),128))]),_:2},1024))),128))]),_:1})]),_:1}))}}),P=x({__name:"AttedanceLineChart",setup(y){const{weekly_attendances:r}=f(g()),i=k(()=>{const e=new Date;e.setDate(e.getDate()-e.getDay());const n=new Date,a=[];for(;e<=n;){const _=r.value.filter(m=>new Date(m.created_at).toDateString()==new Date(e).toDateString()&&m.work_time).length;a.push(_),e.setDate(e.getDate()+1)}return{labels:["Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7"],datasets:[{data:a,backgroundColor:"#615dec",borderColor:"#615dec",tension:.1,borderJoinStyle:"round"}]}});return(e,n)=>(l(),o(h,{flat:""},{default:t(()=>[s($,{style:{height:"200px"},data:i.value},null,8,["data"])]),_:1}))}}),E={class:"ml-5"},I=C("h1",{class:"font-weight-medium text-grey-darken-3"},"Attendances",-1),L={class:"font-weight-light text-grey-darken-1"},K=x({__name:"Index",setup(y){const{students:r}=f(A()),i=g(),{today_attendances:e}=f(g());i.getAll();const n=k(()=>{let a=0;return r.value.forEach(_=>{e.value.some(S=>S.student_id==_.id&&S.time_in)&&a++}),a});return(a,_)=>(l(),o(N,{class:"d-flex flex-column h-100 px-2 px-md-8 py-5"},{default:t(()=>[s(w,null,{default:t(()=>[s(u,{cols:"12",md:"5"},{default:t(()=>[s(h,{class:"h-100 d-flex justify-center align-center pa-5 pt-10 rounded-lg border",flat:""},{default:t(()=>[s(j,{"model-value":n.value/p(r).length*100,size:"120",width:"9",color:"primary",class:"text-h4 font-weight-regular mb-5"},{default:t(()=>[c(d((n.value/p(r).length*100).toFixed(0))+"%",1)]),_:1},8,["model-value"]),C("div",E,[I,C("h4",L,d(n.value)+" students out of "+d(p(r).length),1)])]),_:1})]),_:1}),s(u,{cols:"12",md:"7"},{default:t(()=>[s(P,{class:"h-100 pa-5 d-flex justify-center flex-column align-center rounded-lg border"})]),_:1})]),_:1}),s(w,{class:"h-100"},{default:t(()=>[s(u,{cols:"12"},{default:t(()=>[s(F)]),_:1})]),_:1})]),_:1}))}});export{K as default};