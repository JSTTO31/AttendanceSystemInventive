import{r as S,d as U,n as R,v as H,U as O,x as A,a2 as z,Z as G,a7 as W,A as D,B as k,C as a,c as t,E as d,D as v,F as o,G as Z,M as j,N as q,W as J,V as K}from"./index-646f7b1e.js";import{u as Q}from"./course-6e8df1f3.js";import{l as F}from"./main-f0239ceb.js";import{i as h,g as $,A as Y,h as T,n as B}from"./VCard-76959000.js";import{V as E,a as w}from"./VRow-56c39ee8.js";import{V as I}from"./VSpacer-4b47a3ac.js";import{V as p}from"./VBtn-4d62f1b6.js";import{V as X}from"./VDialog-1ef9c1a0.js";import{V as ee}from"./VRadio-2072cfd3.js";const te=_=>{const s=new Date;s.setHours(9),s.setMinutes(16);const c=new Date;if(c.setHours(18),_){const u=new Date(_);s.setFullYear(u.getFullYear()),s.setMonth(u.getMonth()),s.setDate(u.getDate()),c.setFullYear(u.getFullYear()),c.setMonth(u.getMonth()),c.setDate(u.getDate())}const i=S({time_in:s,time_out:c,option:"present"}),y=S(!1),V=U(()=>{const u=new Date(i.value.time_in);return u.setHours(9),u.setMinutes(15),u<i.value.time_in});return{attendance:i,isLoading:y,enablePolicy:V,options:[{value:"present",label:"Present",color:"primary"},{value:"absent",label:"Absent",color:"error"},{value:"policy",label:"Present with policy",color:"warning"}],followDate:u=>{if(u=="time_in"){const n=new Date(i.value.time_in),r=new Date(i.value.time_out);r.setFullYear(n.getFullYear()),r.setMonth(n.getMonth()),r.setDate(n.getDate()),i.value.time_out=r}else{const n=new Date(i.value.time_in),r=new Date(i.value.time_out);r.setFullYear(n.getFullYear()),r.setMonth(n.getMonth()),r.setDate(n.getDate()),i.value.time_out=r}}}},ae=v("label",{for:"from"},"Time in:",-1),le=v("label",{for:"to"},"Time out:",-1),oe=v("h4",{class:"mb-1"},"Attendance Options",-1),ne=v("p",null," It's seems the selected date has event, you can't modify this attendance unless you remove it. Do you want to remove it? ",-1),ve=R({__name:"ManualAttendanceDialog",props:["showDialog","start_at"],emits:["update:showDialog"],setup(_,{emit:s}){const c=_,{mobile:i}=H(),y=Q(),{current:V}=O(),{student:m}=A(z()),{students:C}=A(G()),u=W(),{attendance:n,enablePolicy:r,isLoading:f,options:L,followDate:x}=te(c.start_at),g=U(()=>m.value.attendances.length<1?!1:m.value.attendances.find(b=>{const e=new Date(b.created_at),l=new Date(c.start_at);return e.toDateString()==l.toDateString()&&b.is_event})),N=()=>{f.value=!0,u.manual(m.value.id,n.value).then(()=>{f.value=!1,s("update:showDialog",!1)})},P=()=>{g.value&&(f.value=!0,y.remove_attendee(g.value.course_id,m.value.id).then(b=>{C.value=C.value.map(e=>e.id==m.value.id?{...e,attendances:e.attendances.filter(l=>l.course_id!=g.value.course_id||!l.course_id)}:e),m.value.attendances=m.value.attendances.filter(e=>e.course_id!=g.value.course_id||!e.course_id),s("update:showDialog",!1)}))};return(b,e)=>(D(),k(X,{"model-value":_.showDialog,width:"500",fullscreen:o(i),"onClick:outside":e[8]||(e[8]=l=>s("update:showDialog",!1))},{default:a(()=>[g.value?(D(),k(h,{key:1,disabled:o(f)},{default:a(()=>[t(T,null,{default:a(()=>[t(Y,{class:"d-flex px-0 align-center"},{default:a(()=>[t($,{class:"mr-2"},{default:a(()=>[d("mdi-calendar-alert")]),_:1}),d(" Event Intercept")]),_:1}),ne,t(B,null,{default:a(()=>[t(I),t(p,{color:"primary",onClick:P,loading:o(f)},{default:a(()=>[d("Remove")]),_:1},8,["loading"]),t(p,{onClick:e[6]||(e[6]=l=>s("update:showDialog",!1))},{default:a(()=>[d("no")]),_:1})]),_:1})]),_:1}),t(p,{icon:"mdi-close",variant:"text",class:"ma-1",size:"small",onClick:e[7]||(e[7]=l=>s("update:showDialog",!1)),v:"",style:{position:"absolute",top:"15px",right:"15px"}})]),_:1},8,["disabled"])):(D(),k(h,{key:0,style:{overflow:"visible !important"},class:"rounded-md-lg rounded-0 pa-5"},{default:a(()=>[t(Y,{class:"d-flex align-center"},{default:a(()=>[t($,{class:"mr-2"},{default:a(()=>[d("mdi-book-open-outline")]),_:1}),d(" Manual Attendance")]),_:1}),t(T,{class:"mt-3"},{default:a(()=>[t(E,null,{default:a(()=>[t(w,null,{default:a(()=>[v("div",null,[ae,t(o(F),{dark:o(V).dark,onClosed:e[0]||(e[0]=l=>o(x)("time_in")),clearable:!1,modelValue:o(n).time_in,"onUpdate:modelValue":e[1]||(e[1]=l=>o(n).time_in=l),id:"from","auto-apply":""},null,8,["dark","modelValue"])])]),_:1}),t(w,null,{default:a(()=>[v("div",null,[le,t(o(F),{dark:o(V).dark,onClosed:e[2]||(e[2]=l=>o(x)("time_out")),clearable:!1,modelValue:o(n).time_out,"onUpdate:modelValue":e[3]||(e[3]=l=>o(n).time_out=l),id:"to","auto-apply":""},null,8,["dark","modelValue"])])]),_:1})]),_:1}),t(E,null,{default:a(()=>[t(w,{class:"py-0"},{default:a(()=>[oe,(D(!0),Z(q,null,j(o(L),l=>(D(),k(h,{key:l.value,disabled:l.value=="policy"&&!o(r),onClick:M=>o(n).option=l.value,variant:"outlined",class:"mb-2 d-flex align-center rounded-lg border text-black",color:l.color,flat:""},{default:a(()=>[t(w,{cols:"1"},{default:a(()=>[t(ee,{modelValue:o(n).option,"onUpdate:modelValue":M=>o(n).option=M,"hide-details":"",value:l.value,density:"compact"},null,8,["modelValue","onUpdate:modelValue","value"])]),_:2},1024),t(w,{class:"px-5"},{default:a(()=>[d(K(l.label),1)]),_:2},1024)]),_:2},1032,["disabled","onClick","color"]))),128))]),_:1})]),_:1})]),_:1}),t(B,{class:"px-4"},{default:a(()=>[t(I),t(p,{color:"primary",variant:"elevated",onClick:J(N,["stop"]),loading:o(f)},{default:a(()=>[d("Save")]),_:1},8,["onClick","loading"]),t(p,{onClick:e[4]||(e[4]=l=>s("update:showDialog",!1))},{default:a(()=>[d("Cancel")]),_:1})]),_:1}),t(p,{icon:"mdi-close",variant:"text",class:"ma-1",size:"small",onClick:e[5]||(e[5]=l=>s("update:showDialog",!1)),style:{position:"absolute",top:"15px",right:"15px"}})]),_:1}))]),_:1},8,["model-value","fullscreen"]))}});export{ve as _};