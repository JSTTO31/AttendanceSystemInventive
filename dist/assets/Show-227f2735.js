import{x as te,a9 as ae,y as le,ap as se,j as A,aq as ne,a as e,N,d as P,a5 as $,s as D,r as S,o as b,p as k,w as t,b as a,e as s,t as p,m as B,a1 as O,c as F,f as q,F as G,V as H,u as v,U as de,aG as U}from"./index-1b2f18c0.js";import{u as oe,d as W,e as ie,V as i,a as Z,b as J,t as g}from"./VCard-81742aa1.js";import{V as L}from"./VSpacer-58a18ea2.js";import{V as w}from"./VBtn-5eaa95be.js";import{V as K}from"./VDialog-d2e18591.js";import{a as R,V as x}from"./VRow-bf742394.js";import{m as re,V as E}from"./VCheckboxBtn-a9bfe170.js";import{m as ue,u as ce,V as j}from"./VInput-c0b26070.js";import{V as me}from"./VTextField-8abd2aa7.js";import{V as M}from"./VContainer-45cc6a4e.js";import{V as fe}from"./VChip-df0715a8.js";import{V as pe}from"./VFooter-9176dff8.js";import"./VProgressCircular-a7f3ca87.js";import"./VOverlay-ab69c83c.js";import"./forwardRefs-9d31fcaa.js";import"./delay-c95e4996.js";import"./scopeId-5749c772.js";import"./VSelectionControl-f61f6b98.js";import"./index-45aa9782.js";import"./layout-717a0719.js";const he=te({...ue(),...ae(re(),["inline"])},"VCheckbox"),Q=le()({name:"VCheckbox",inheritAttrs:!1,props:he(),emits:{"update:focused":m=>!0},setup(m,r){let{attrs:u,slots:h}=r;const{isFocused:l,focus:n,blur:c}=ce(m),f=se(),o=A(()=>m.id||`checkbox-${f}`);return oe(()=>{const[d,C]=ne(u),[V,T]=j.filterProps(m),[z,_]=E.filterProps(m);return e(j,N({class:["v-checkbox",m.class]},d,V,{id:o.value,focused:l.value,style:m.style}),{...h,default:y=>{let{id:I,messagesId:X,isDisabled:Y,isReadonly:ee}=y;return e(E,N(z,{id:I.value,"aria-describedby":X.value,disabled:Y.value,readonly:ee.value},C,{onFocus:n,onBlur:c}),h)}})}),{}}}),_e=a("h3",{class:"mb-2"},"Do you want to remove it?",-1),ge={class:"text-grey-darken-3"},ve=P({__name:"RemoveAttendee",props:{attendee:{}},emits:["update:attendee"],setup(m,{emit:r}){const u=m,h=$(),{event:l}=D($()),n=S(!1),c=()=>{n.value=!0,h.removeAttendee(l.value.id,u.attendee.id).then(()=>{n.value=!1,r("update:attendee",{})})};return(f,o)=>(b(),k(K,{width:"450","model-value":Object.keys(f.attendee).length>0,"onClick:outside":o[1]||(o[1]=d=>r("update:attendee",{})),disabled:n.value},{default:t(()=>[e(i,{class:"rounded-lg"},{default:t(()=>[e(W,{class:"pa-5"},{default:t(()=>[_e,a("p",ge,[s(" To remove "),a("b",null,p(f.attendee.first_name),1),s(" as an attendee from the event, please click on the 'Remove Attendee' button ")])]),_:1}),e(ie,{class:"mt-5 bg-grey-lighten-4"},{default:t(()=>[e(L),e(w,{variant:"elevated",color:"error",size:"small",onClick:c,loading:n.value},{default:t(()=>[s("Remove Attendee")]),_:1},8,["loading"]),e(w,{variant:"elevated",color:"white",size:"small",onClick:o[0]||(o[0]=d=>r("update:attendee",{}))},{default:t(()=>[s("Cancel")]),_:1})]),_:1})]),_:1})]),_:1},8,["model-value","disabled"]))}}),xe={class:"font-weight-regular"},be=P({__name:"AddAttendeeStudentList",props:{student:{},selectedStudents:{}},emits:["update:selectedStudents"],setup(m,{emit:r}){const u=m,h=A(()=>u.selectedStudents.some(n=>n.id==u.student.id)),l=()=>{if(h.value){let n=u.selectedStudents.slice();n=n.filter(c=>c.id!=u.student.id),r("update:selectedStudents",n)}else{let n=u.selectedStudents.slice();n.push(u.student),r("update:selectedStudents",n)}};return(n,c)=>(b(),k(i,{class:"pa-2 mb-1",flat:"",onClick:l},{default:t(()=>[e(R,null,{default:t(()=>[e(x,{md:"1",cols:"2"},{default:t(()=>[e(Q,{color:"primary",onClick:l,"model-value":n.selectedStudents,onChange:l,value:n.student,"hide-details":""},null,8,["model-value","value"])]),_:1}),e(x,{md:"1",cols:"2",class:"d-flex align-center"},{default:t(()=>[e(Z,{class:"bg-grey-lighten-2",size:"45"},{default:t(()=>[e(J,{src:n.student.image},null,8,["src"])]),_:1})]),_:1}),e(x,{class:"d-flex align-center pl-5"},{default:t(()=>[a("div",null,[a("h5",null,p(n.student.first_name)+" "+p(n.student.last_name),1),a("h6",xe,p(n.student.position),1)])]),_:1})]),_:1})]),_:1}))}}),ye={class:"mb-5 font-weight-medium d-flex align-center"},ke={key:0,class:"h-100 d-flex align-center justify-center"},we={class:"d-flex align-center"},Ce={class:"d-flex mt-5"},Ve={style:{position:"absolute",top:"15px",right:"15px"}},Ae=P({__name:"AddAttendees",props:["showDialog","event"],emits:["update:showDialog"],setup(m,{emit:r}){const u=m,{name:h}=B(),l=$(),{students:n}=D(O()),c=S([]),f=A(()=>c.value==n.value),o=()=>{if(f.value){c.value=[];return}c.value=n.value},d=S(""),C=A(()=>n.value.filter(z=>!u.event.attendees.some(_=>_.id==z.id)).filter(z=>z.first_name.toLocaleLowerCase().includes(d.value.toLocaleLowerCase())||z.last_name.toLocaleLowerCase().includes(d.value.toLocaleLowerCase())||!d.value)),V=S(!1),T=()=>{V.value=!0,l.addAttendees(c.value).then(()=>{V.value=!1,r("update:showDialog",!1)})};return(z,_)=>(b(),k(K,{"model-value":m.showDialog,"onClick:outside":_[4]||(_[4]=y=>r("update:showDialog",!1)),width:"600",fullscreen:v(h)=="sm"||v(h)=="xs"},{default:t(()=>[e(i,{class:"pa-0 pa-md-2 rounded-lg d-flex flex-column",disabled:V.value},{default:t(()=>[e(W,{class:"h-100 d-flex flex-column"},{default:t(()=>[a("h2",ye,[e(g,{class:"mr-2"},{default:t(()=>[s("mdi-account-plus")]),_:1}),s("Add Attendees ")]),e(i,{color:"transparent",flat:"",height:"350",style:{"overflow-y":"auto"}},{default:t(()=>[e(i,{class:"px-2 mb-1",flat:""},{default:t(()=>[e(R,null,{default:t(()=>[e(x,{md:"1",cols:"2"},{default:t(()=>[e(Q,{onClick:o,color:"primary","hide-details":""})]),_:1}),e(x,null,{default:t(()=>[e(me,{class:"my-2","single-line":"","hide-details":"",variant:"outlined",density:"compact",label:"Search students...",modelValue:d.value,"onUpdate:modelValue":_[0]||(_[0]=y=>d.value=y)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),(b(!0),F(G,null,q(C.value,y=>(b(),k(be,{"selected-students":c.value,"onUpdate:selectedStudents":_[1]||(_[1]=I=>c.value=I),key:y.id,student:y},null,8,["selected-students","student"]))),128)),C.value.length<1?(b(),F("div",ke,[a("span",we,[e(g,{class:"mr-2"},{default:t(()=>[s("mdi-school")]),_:1}),s(" No students")])])):H("",!0)]),_:1}),e(L),a("div",Ce,[e(L,{class:"d-block d-md-none"}),e(w,{color:"primary",onClick:T,class:"text-capitalize",disabled:c.value.length<1,loading:V.value},{default:t(()=>[s("Add Attendee")]),_:1},8,["disabled","loading"]),e(w,{flat:"",class:"mx-2 text-capitalize",onClick:_[2]||(_[2]=y=>r("update:showDialog",!1))},{default:t(()=>[s("Cancel")]),_:1})])]),_:1}),a("span",Ve,[e(w,{icon:"mdi-close",onClick:_[3]||(_[3]=y=>r("update:showDialog",!1))})])]),_:1},8,["disabled"])]),_:1},8,["model-value","fullscreen"]))}}),ze=a("img",{src:"https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?cs=srgb&dl=pexels-karolina-grabowska-4498362.jpg&fm=jpg",class:"w-100"},null,-1),Se={style:{"line-height":"1.2","font-family":"serif !important"},class:"font-weight-medium text-blue-grey-darken-3 text-h5"},$e={class:"text-capitalize text-subtitle-2 font-weight-regular text-grey-darken-1 mt-3"},De={class:"w-20 px-2"},Le=a("div",null,[a("h5",{class:"font-weight-black text-hoverable mr-2"}," DATE "),a("p",{class:"text-caption"},[s(" September, 2023 "),a("br"),s(" 5 (Wednesday) to 6 (thursday) ")])],-1),Pe={class:"w-20 px-2"},Ie=a("div",null,[a("h5",{class:"text-uppercase"}," Time "),a("h4",{class:"font-weight-regular text-caption mt-2"}," 4 (Friday) 9:00 am - 6 (Sunday) 7:00 pm ")],-1),Be={class:"w-20 px-2"},Fe=a("h5",{class:"text-uppercase"}," Location ",-1),Re={class:"font-weight-regular mt-2"},Te={class:"font-weight-regular"},Ne={class:"text-caption"},Ue={class:"w-20 px-2"},Ee=a("h5",{class:"text-uppercase"}," ORGANIZER ",-1),je={class:"font-weight-regular mt-2"},Me={class:"font-weight-regular"},Oe={class:"text-caption"},qe={class:"text-caption"},Ge={class:"w-20 px-2"},He=a("h5",{class:"text-uppercase"}," HEALTH GUIDLINES ",-1),We={class:"d-flex flex-wrap mt-3"},Ze=a("h5",{class:"font-weight-regular ml-5"},"Face mask is required",-1),Je=a("h5",{class:"font-weight-regular ml-5"},"Temperature checked at entrance ",-1),Ke=a("h5",{class:"font-weight-regular ml-5"},"Physical Distance Maintained",-1),Qe=a("h5",{class:"font-weight-regular ml-5"},"Event area santized",-1),Xe=a("h5",{class:"font-weight-regular ml-5"},"Vaccination required",-1),Ye={class:"mb-2"},et={class:"text-capitalize"},tt={class:"text-capitalize font-weight-regular"},at={class:"w-100 d-flex"},wt=P({__name:"Show",setup(m){B(),B();const r=S({}),u=S(!1),h=S(!1),{event:l,events:n}=D($());D(O());const c=A(()=>({label:l.value.mode=="physical"?"Physical Class":l.value.mode=="online"?"Online Class":"Physical and Online Class",color:l.value.mode=="physical"?"red":l.value.mode=="online"?"green":"blue"}));return A(()=>{const f=new Date(l.value.date_time.event_date_start);return new Date(l.value.date_time.event_date_end),console.log(l.value.date_time.event_date_start),U(f.getMonth())+" "+f.getDate()+", 2023 | 4 Days"}),A(()=>{const f=new Date(l.value.date_time.event_date_start);return new Date(l.value.date_time.event_date_end),U(f.getMonth()),"7 AM to 9 PM"}),A(()=>l.value.subtitle.length>200?l.value.subtitle.substring(0,200)+"...":l.value.subtitle),de((f,o,d)=>{const C=n.value.find(V=>V.id==f.params.event_id);return C?(l.value=C,d()):d({name:"ScheduleIndex"})}),(f,o)=>(b(),k(M,{class:"px-2 px-md-5"},{default:t(()=>[e(w,{"prepend-icon":"mdi-arrow-left",variant:"text",class:"mb-2 text-capitalize",onClick:o[0]||(o[0]=d=>f.$router.push({name:"ScheduleIndex"}))},{default:t(()=>[s("Back to calendar")]),_:1}),v(l)?(b(),k(i,{key:0,class:"pa-md-5 border rounded-lg",flat:""},{default:t(()=>[e(i,{flat:"",class:"d-flex flex-column flex-md-row"},{default:t(()=>[e(x,{cols:"12",md:"4"},{default:t(()=>[ze]),_:1}),e(x,{cols:"12",md:"8",class:"px-5"},{default:t(()=>[e(fe,{color:c.value.color,variant:"elevated",flat:"",class:"mb-2 rounded-lg"},{default:t(()=>[s(p(c.value.label),1)]),_:1},8,["color"]),a("h4",Se,p(v(l).title),1),a("p",$e,p(v(l).subtitle),1)]),_:1})]),_:1}),e(M,{fluid:"",class:"px-5 px-md-0"},{default:t(()=>[e(R,{class:"py-5"},{default:t(()=>[e(x,{cols:"12",md:"6"},{default:t(()=>[e(i,{class:"h-100 text-grey-darken-1 d-flex bg-grey-lighten-4 rounded-xl pa-5",flat:""},{default:t(()=>[a("div",De,[e(g,{size:"25"},{default:t(()=>[s("mdi-calendar")]),_:1})]),Le]),_:1})]),_:1}),e(x,{cols:"12",md:"6"},{default:t(()=>[e(i,{class:"h-100 text-grey-darken-1 d-flex bg-grey-lighten-4 rounded-xl pa-5",flat:""},{default:t(()=>[a("div",Pe,[e(g,{size:"25"},{default:t(()=>[s("mdi-clock")]),_:1})]),Ie]),_:1})]),_:1}),e(x,{cols:"12",md:"6"},{default:t(()=>[e(i,{class:"h-100 text-grey-darken-1 d-flex bg-grey-lighten-4 rounded-xl pa-5",flat:""},{default:t(()=>[a("div",Be,[e(g,{size:"25"},{default:t(()=>[s("mdi-map-marker")]),_:1})]),a("div",null,[Fe,a("h4",Re,[a("h4",Te,p(v(l).location.name),1),a("p",Ne,p(v(l).location.address),1)])])]),_:1})]),_:1}),e(x,{cols:"12",md:"6"},{default:t(()=>[e(i,{class:"h-100 text-grey-darken-1 d-flex bg-grey-lighten-4 rounded-xl pa-5",flat:""},{default:t(()=>[a("div",Ue,[e(g,{size:"25"},{default:t(()=>[s("mdi-headphones")]),_:1})]),a("div",null,[Ee,a("h4",je,[a("h4",Me,p(v(l).organizer.name),1),a("p",Oe,p(v(l).organizer.general_contact_details),1),a("p",qe,p(v(l).organizer.physical_address),1)])])]),_:1})]),_:1}),e(x,null,{default:t(()=>[e(i,{class:"h-100 text-grey-darken-1 d-flex bg-grey-lighten-4 rounded-xl pa-5",flat:""},{default:t(()=>[a("div",Ge,[e(g,{size:"25"},{default:t(()=>[s("mdi-heart-pulse")]),_:1})]),a("div",null,[He,a("div",We,[e(i,{flat:"",class:"d-flex rounded-xl text-capitalize mr-2 mb-2 pa-5 bg-grey-lighten-3 text-grey-darken-1 align-center"},{default:t(()=>[e(g,{size:"20"},{default:t(()=>[s("mdi-face-mask")]),_:1}),Ze]),_:1}),e(i,{flat:"",class:"d-flex rounded-xl text-capitalize mr-2 mb-2 pa-5 bg-grey-lighten-3 text-grey-darken-1 align-center"},{default:t(()=>[e(g,{size:"20"},{default:t(()=>[s("mdi-thermometer")]),_:1}),Je]),_:1}),e(i,{flat:"",class:"d-flex rounded-xl text-capitalize mr-2 mb-2 pa-5 bg-grey-lighten-3 text-grey-darken-1 align-center"},{default:t(()=>[e(g,{size:"20"},{default:t(()=>[s("mdi-account-multiple-check")]),_:1}),Ke]),_:1}),e(i,{flat:"",class:"d-flex rounded-xl text-capitalize mr-2 mb-2 pa-5 bg-grey-lighten-3 text-grey-darken-1 align-center"},{default:t(()=>[e(g,{size:"20"},{default:t(()=>[s("mdi-home-plus")]),_:1}),Qe]),_:1}),e(i,{flat:"",class:"d-flex rounded-xl text-capitalize mr-2 mb-2 pa-5 bg-grey-lighten-3 text-grey-darken-1 align-center"},{default:t(()=>[e(g,{size:"20"},{default:t(()=>[s("mdi-needle")]),_:1}),Xe]),_:1})])])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})):H("",!0),e(Ae,{"show-dialog":h.value,"onUpdate:showDialog":o[1]||(o[1]=d=>h.value=d),event:v(l)},null,8,["show-dialog","event"]),e(ve,{attendee:r.value,"onUpdate:attendee":o[2]||(o[2]=d=>r.value=d)},null,8,["attendee"]),e(pe,{app:"",class:"py-5 d-flex flex-column",style:{"z-index":"100"},elevation:"5"},{default:t(()=>[e(i,{flat:"",height:u.value?500:0,style:{transition:".1575s ease-in"},class:"mb-2 w-100"},{default:t(()=>[a("h3",Ye,[e(g,null,{default:t(()=>[s("mdi-account")]),_:1}),s(" Attendee List ")]),(b(!0),F(G,null,q(v(l).attendees,d=>(b(),k(i,{class:"pa-2 mb-2 rounded-lg bg-grey-lighten-3",flat:"",onClick:C=>r.value=d,key:d.id},{prepend:t(()=>[e(Z,{size:"50"},{default:t(()=>[e(J,{src:d.image},null,8,["src"])]),_:2},1024)]),title:t(()=>[a("h6",et,p(d.first_name)+" "+p(d.last_name),1)]),subtitle:t(()=>[a("h5",tt,p(d.position),1)]),_:2},1032,["onClick"]))),128))]),_:1},8,["height"]),a("div",at,[e(L),e(w,{flat:"",class:"ml-2",color:"primary",onClick:o[3]||(o[3]=d=>h.value=!0)},{default:t(()=>[s("Add attendees")]),_:1}),u.value?(b(),k(w,{key:1,flat:"",class:"ml-2",width:"200","prepend-icon":"mdi-chevron-up",color:"grey-lighten-5",onClick:o[5]||(o[5]=d=>u.value=!1)},{default:t(()=>[s("Hide Attendees")]),_:1})):(b(),k(w,{key:0,flat:"",class:"ml-2",width:"200","prepend-icon":"mdi-chevron-down",color:"grey-lighten-5",onClick:o[4]||(o[4]=d=>u.value=!0)},{default:t(()=>[s("Show Attendees")]),_:1}))])]),_:1})]),_:1}))}});export{wt as default};
