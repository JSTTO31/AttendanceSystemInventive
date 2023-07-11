import{l as j}from"./main-ecf281c3.js";import{V as T,a as V}from"./VRow-5241ced9.js";import{m as z,V as F}from"./VCheckboxBtn-d4886256.js";import{m as q,u as G,a as I,V as M}from"./VTextField-34a01f54.js";import{p as H,an as J,a as K,R as O,d as P,S as Q,c as e,l as R,n as U,A as f,B as k,C as s,D as c,V as L,v as W,a2 as N,x as X,r as _,U as Y,y as Z,a4 as ee,F as w,G as D,M as te,N as se,E as g,I as ae}from"./index-65b57148.js";import{u as le}from"./tag-044c96b1.js";import{l as oe,V as ne,i as v,g as re,h as de,z as ue}from"./VCard-aef1371f.js";import{u as ce}from"./course-3125e89d.js";import{V as $}from"./VBtn-ef1515a2.js";import{V as ie}from"./VSpacer-cc7db9a3.js";import{V as me}from"./VContainer-cb822ac1.js";/* empty css              */import"./VSelectionControl-259d7468.js";import"./forwardRefs-7fe67622.js";import"./index-521c1f5e.js";import"./VProgressCircular-82f592c4.js";const pe=H({...q(),...J(z(),["inline"])},"VCheckbox"),fe=K()({name:"VCheckbox",inheritAttrs:!1,props:pe(),emits:{"update:focused":o=>!0},setup(o,i){let{attrs:n,slots:m}=i;const{isFocused:p,focus:t,blur:d}=G(o),b=O(),h=P(()=>o.id||`checkbox-${b}`);return le(()=>{const[u,y]=Q(n),[S,x]=I.filterProps(o),[C,B]=F.filterProps(o);return e(I,R({class:["v-checkbox",o.class]},u,S,{id:h.value,focused:p.value,style:o.style}),{...m,default:l=>{let{id:a,messagesId:r,isDisabled:A,isReadonly:E}=l;return e(F,R(C,{id:a.value,"aria-describedby":r.value,disabled:A.value,readonly:E.value},y,{onFocus:t,onBlur:d}),m)}})}),{}}}),he=U({__name:"AddAttendeeStudentList",props:{student:{},selectedStudents:{}},emits:["update:selectedStudents"],setup(o,{emit:i}){const n=o,m=P(()=>n.selectedStudents.some(t=>t.id==n.student.id)),p=()=>{if(m.value){let t=n.selectedStudents.slice();t=t.filter(d=>d.id!=n.student.id),i("update:selectedStudents",t)}else{let t=n.selectedStudents.slice();t.push(n.student),i("update:selectedStudents",t)}};return(t,d)=>(f(),k(v,{class:"pa-2 mb-1",flat:"",onClick:p},{default:s(()=>[e(T,null,{default:s(()=>[e(V,{md:"1",cols:"2"},{default:s(()=>[e(fe,{color:"primary","model-value":t.selectedStudents,onChange:p,value:t.student,"hide-details":""},null,8,["model-value","value"])]),_:1}),e(V,{md:"1",cols:"2",class:"d-flex align-center"},{default:s(()=>[e(oe,{class:"bg-grey-lighten-2",size:"45"},{default:s(()=>[e(ne,{src:t.student.image},null,8,["src"])]),_:1})]),_:1}),e(V,{class:"d-flex align-center pl-5"},{default:s(()=>[c("div",null,[c("h5",null,L(t.student.first_name)+" "+L(t.student.last_name),1),c("h6",null,L(t.student.email),1)])]),_:1})]),_:1})]),_:1}))}}),ge=c("h3",null,"Add Attendees",-1),ve={key:0,class:"h-100 d-flex align-center justify-center"},Ve={class:"d-flex align-center"},ye={class:"d-flex mt-5"},Ce={style:{position:"absolute",top:"5px",right:"5px"}},Te=U({__name:"AddAttendees",props:["course"],setup(o){const i=o,{mobile:n}=W(),m=N(),p=ce(),{students:t}=X(N()),d=_([]),{current:b}=Y(),h=_(new Date),u=_(""),y=_(!1),S=Z(),x=ee(),C=P(()=>t.value.filter(l=>l.first_name.toLocaleLowerCase().includes(u.value.toLocaleLowerCase())||l.last_name.toLocaleLowerCase().includes(u.value.toLocaleLowerCase())||!u.value)),B=()=>{y.value=!0;const l=[];return d.value.forEach(a=>{l.push(p.add_attendee(i.course.id,a.id,h.value))}),Promise.all(l).then(()=>{S.push({name:"CategoryCourse",params:{category_id:x.params.category_id},query:{success:"true",message:"Successfully Added!"}})})};return m.getAll("?course_id="+x.params.course_id),(l,a)=>y.value?(f(),k(v,{key:1,height:"500",onClickCapture:a[5]||(a[5]=()=>{}),elevation:"0"},{default:s(()=>[e(v,{height:"150",width:"450",flat:"",class:"my-auto mx-auto d-flex align-center"},{default:s(()=>[e(me,null,{default:s(()=>[e(T,{class:"fill-height","align-content":"center",justify:"center"},{default:s(()=>[e(V,{class:"text-subtitle-1 text-center",cols:"12"},{default:s(()=>[g(" Loading ")]),_:1}),e(V,{cols:"6"},{default:s(()=>[e(ue,{color:"deep-purple-accent-4",indeterminate:"",rounded:"",height:"6"})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})):(f(),k(v,{key:0,class:"pa-2 rounded-md-lg rounded-0"},{default:s(()=>[e(de,null,{default:s(()=>[ge,e(M,{class:"my-2","single-line":"","hide-details":"",variant:"outlined",density:"compact",label:"Search students...",modelValue:u.value,"onUpdate:modelValue":a[0]||(a[0]=r=>u.value=r)},null,8,["modelValue"]),e(v,{color:"transparent",flat:"",height:w(n)?365:400,style:{"overflow-y":"scroll"}},{default:s(()=>[(f(!0),D(se,null,te(C.value,r=>(f(),k(he,{"selected-students":d.value,"onUpdate:selectedStudents":a[1]||(a[1]=A=>d.value=A),key:r.id,student:r},null,8,["selected-students","student"]))),128)),C.value.length<1?(f(),D("div",ve,[c("span",Ve,[e(re,{class:"mr-2"},{default:s(()=>[g("mdi-school")]),_:1}),g(" No students")])])):ae("",!0)]),_:1},8,["height"]),c("div",ye,[e($,{color:"primary",onClick:B,disabled:d.value.length<1},{default:s(()=>[g("Add")]),_:1},8,["disabled"]),e($,{flat:"",class:"mx-2",onClick:a[2]||(a[2]=r=>l.$router.push({name:"CategoryCourse",params:{category_id:l.$route.params.category_id}}))},{default:s(()=>[g("Cancel")]),_:1}),e(ie),e(w(j),{modelValue:h.value,"onUpdate:modelValue":a[3]||(a[3]=r=>h.value=r),class:"w-50",clearable:!1,id:"start","auto-apply":"",placeholder:"Start date",dark:w(b).dark},null,8,["modelValue","dark"])])]),_:1}),c("span",Ce,[e($,{icon:"mdi-close",flat:"",onClick:a[4]||(a[4]=r=>l.$router.push({name:"CategoryCourse",params:{category_id:l.$route.params.category_id}}))})])]),_:1}))}});export{Te as default};