import{u as O}from"./useStudent-b532c908.js";import{d as z,s as T,a6 as S,o as p,p as v,w as n,a as t,u as e,c as P,t as b,e as l,b as i,r as C,a8 as de,h as Z,m as ee,I as Y,V as R,X as re,a3 as ue,a4 as ce,_ as te,Q as me,n as pe,N as ne,F as fe,U as _e,W as ge,$ as L,Y as ve}from"./index-1b2f18c0.js";import{t as x,C as he,V as w,d as W,e as G}from"./VCard-81742aa1.js";import{V as $}from"./VBtn-5eaa95be.js";import{V as U}from"./VSpacer-58a18ea2.js";import{V as q}from"./VDialog-d2e18591.js";import{V as ye}from"./VDivider-04be6cf6.js";import{V as ae,a as h}from"./VList-7ef54800.js";import{V as be}from"./VOverlay-ab69c83c.js";import{V as we}from"./VHover-7ff5440d.js";import{_ as xe}from"./ManualAttendanceDialog.vue_vue_type_script_setup_true_lang-f61a0a11.js";import{u as ke,_ as Ce}from"./useAttedanceStudent-d3e9e18c.js";import{V as $e}from"./VContainer-45cc6a4e.js";import{V as I,a as J}from"./VRow-bf742394.js";import{V as Ve}from"./VMenu-98fd1c6a.js";import{a as F,V as Re}from"./VTabs-96374787.js";import"./VProgressCircular-a7f3ca87.js";import"./forwardRefs-9d31fcaa.js";import"./scopeId-5749c772.js";import"./index-45aa9782.js";import"./ssrBoot-a37f06b1.js";import"./delay-c95e4996.js";import"./VInput-c0b26070.js";import"./VSelectionControl-f61f6b98.js";const Se={key:0},De={key:1},Ae={style:{position:"absolute",top:"0px",right:"-0"}},ze=z({__name:"StudentProgressLinear",setup(m){const{student:d}=T(S()),{remainingPercent:r,work_time_total:o,remainingMode:c}=O(d);return(y,_)=>(p(),v(w,{flat:"",class:"py-0",style:{overflow:"visible"}},{default:n(()=>[t(he,{height:"40",color:e(r)>=100?"secondary":"primary","model-value":e(r),class:"bg-blue-grey-lighten-1 text-subtitle-1 text-capitalize font-weight-medium"},{default:n(()=>[e(r)<100?(p(),P("span",Se,b(e(o).output)+"/"+b(e(d).remaining),1)):(p(),P("span",De,[t(x,null,{default:n(()=>[l("mdi-check")]),_:1}),l("Completed ")]))]),_:1},8,["color","model-value"]),i("span",Ae,[t($,{class:"rounded-0",flat:"",size:"small",icon:"mdi-swap-horizontal",onClick:_[0]||(_[0]=a=>c.value=!e(c))})])]),_:1}))}}),Ie={class:"mb-3 text-primary d-flex align-center"},Te=i("h4",{class:"font-weight-regular"}," This action will create another attendance in same day, do you still want to proceed? ",-1),Le=z({__name:"ReloginDialog",props:["showReloginDialog","attendance_id"],emits:["update:showReloginDialog"],setup(m,{emit:d}){const r=m,{student:o}=T(S()),c=C(!1),y=()=>{const _=de();c.value=!0,_.relogin(o.value.id,r.attendance_id).then(()=>{d("update:showReloginDialog",!1),c.value=!1})};return(_,a)=>(p(),v(q,{"model-value":m.showReloginDialog,width:"450",scrim:"transparent","onClick:outside":a[2]||(a[2]=f=>d("update:showReloginDialog",!1))},{default:n(()=>[t(w,{loading:c.value,disabled:c.value},{default:n(()=>[t(W,null,{default:n(()=>[i("h4",Ie,[t(x,{class:"mr-1"},{default:n(()=>[l("mdi-information-outline")]),_:1}),l("Relogin student "),t(U)]),Te]),_:1}),t(G,null,{default:n(()=>[t(U),t($,{variant:"elevated",class:"text-capitalize",flat:"",density:"compact",color:"primary",onClick:y},{default:n(()=>[l("Yes")]),_:1}),t($,{variant:"elevated",class:"text-capitalize",flat:"",density:"compact",onClick:a[0]||(a[0]=f=>d("update:showReloginDialog",!1))},{default:n(()=>[l("No")]),_:1})]),_:1}),t($,{onClick:a[1]||(a[1]=f=>d("update:showReloginDialog",!1)),icon:"mdi-close",variant:"text",class:"ma-1",size:"small",style:{position:"absolute",top:"0",right:"0"}})]),_:1},8,["loading","disabled"])]),_:1},8,["model-value"]))}}),Pe={class:"mb-3 text-error d-flex align-center"},Ue={class:"font-weight-regular"},Be=z({__name:"RemoveStudentDialog",props:["showRemoveStudent"],emits:["update:showRemoveStudent"],setup(m,{emit:d}){const r=Z(),{student:o}=T(S()),c=C(!1),y=()=>{const _=S();c.value=!0,_.remove(o.value.id).then(()=>{r.push({name:"IndexStudent"})})};return(_,a)=>(p(),v(q,{"model-value":m.showRemoveStudent,width:"450",scrim:"transparent","onClick:outside":a[2]||(a[2]=f=>d("update:showRemoveStudent",!1))},{default:n(()=>[t(w,{loading:c.value,disabled:c.value},{default:n(()=>[t(W,null,{default:n(()=>[i("h4",Pe,[t(x,{class:"mr-1"},{default:n(()=>[l("mdi-trash-can")]),_:1}),l("Remove Student "),t(U)]),i("h4",Ue,[l(" Are you sure you want to delete this student "),i("strong",null,b(e(o).first_name+" "+e(o).last_name),1)])]),_:1}),t(G,null,{default:n(()=>[t(U),t($,{variant:"elevated",class:"text-capitalize",flat:"",density:"compact",color:"primary",onClick:y},{default:n(()=>[l("Yes, Remove it")]),_:1}),t($,{variant:"elevated",class:"text-capitalize",flat:"",density:"compact",onClick:a[0]||(a[0]=f=>d("update:showRemoveStudent",!1))},{default:n(()=>[l("No, Don't remove it")]),_:1})]),_:1}),t($,{onClick:a[1]||(a[1]=f=>d("update:showRemoveStudent",!1)),icon:"mdi-close",variant:"text",class:"ma-1",size:"small",style:{position:"absolute",top:"0",right:"0"}})]),_:1},8,["loading","disabled"])]),_:1},8,["model-value"]))}}),le=m=>(ue("data-v-3fe693ce"),m=m(),ce(),m),Ee={class:"d-flex justify-space-around pt-8 align-center"},Me={id:"toggle-button"},je=le(()=>i("h4",null,"General options",-1)),Ne=le(()=>i("h4",null,"Other",-1)),Fe=z({__name:"MobileAttendanceActions",emits:["enter","absent","leave","manual","remove","re-enter"],setup(m,{emit:d}){const r=C(!1),{student:o}=T(S()),{timeIn:c,timeOut:y,workTime:_,status:a}=O(o),{mobile:f}=ee();return Y(()=>r.value,()=>{const V=document.getElementById("main");V&&(r.value?V.style.transform="translateY(0)":V.style.transform="translateY(85%)")}),(V,g)=>(p(),v(re,null,{default:n(()=>[e(f)&&e(o)?(p(),v(w,{key:0,class:"rounded-t-xl",height:"520",elevation:"5",id:"main"},{default:n(()=>[i("div",Ee,[i("h4",null,[t(x,null,{default:n(()=>[l("mdi-login")]),_:1}),l(" "+b(e(c)),1)]),i("h4",null,[t(x,null,{default:n(()=>[l("mdi-logout")]),_:1}),l(" "+b(e(y)),1)]),i("h4",null,[t(x,null,{default:n(()=>[l("mdi-update")]),_:1}),l(" "+b(e(_)),1)])]),i("span",Me,[t(x,{onClick:g[0]||(g[0]=k=>r.value=!r.value)},{default:n(()=>[l("mdi-drag-horizontal-variant")]),_:1})]),t(ye,{class:"mt-5"}),r.value?(p(),v(ae,{key:0,class:"pa-5"},{default:n(()=>[je,t(h,{onClick:g[1]||(g[1]=k=>d("enter")),"prepend-icon":"mdi-login",disabled:e(o).attendance&&!!e(o).attendance.time_in||e(o).attendance&&!!e(o).attendance.is_absent||e(o).attendance&&!!e(o).attendance.is_event},{default:n(()=>[l("Enter")]),_:1},8,["disabled"]),t(h,{onClick:g[2]||(g[2]=k=>d("absent")),"prepend-icon":"mdi-close",disabled:e(o).attendance&&!!e(o).attendance.time_in||e(o).attendance&&!!e(o).attendance.is_absent||e(o).attendance&&!!e(o).attendance.is_event},{default:n(()=>[l("Absent")]),_:1},8,["disabled"]),t(h,{onClick:g[3]||(g[3]=k=>d("leave")),"prepend-icon":"mdi-logout",disabled:!e(o).attendance||e(o).attendance&&!!e(o).attendance.time_in&&!!e(o).attendance.time_out||e(o).attendance&&!!e(o).attendance.is_absent||e(o).attendance&&!!e(o).attendance.is_event},{default:n(()=>[l("Leave")]),_:1},8,["disabled"]),t(h,{disabled:!e(o).attendance||e(o).attendance&&!e(o).attendance.time_in||!e(o).attendance.time_out,"prepend-icon":"mdi-repeat",onClick:g[4]||(g[4]=k=>d("re-enter"))},{default:n(()=>[l("Re-enter")]),_:1},8,["disabled"]),t(h,{onClick:g[5]||(g[5]=k=>d("remove")),"prepend-icon":"mdi-cancel",disabled:!e(o).attendance||e(o).attendance&&(!e(o).attendance.time_in||!e(o).attendance.time_out)},{default:n(()=>[l("Remove")]),_:1},8,["disabled"]),Ne,t(h,{onClick:g[6]||(g[6]=k=>d("manual")),"prepend-icon":"mdi-book-open-outline"},{default:n(()=>[l("Manual Attendance")]),_:1}),t(h,{disabled:e(f),"prepend-icon":"mdi-trash-can-outline"},{default:n(()=>[l("Permanent Delete")]),_:1},8,["disabled"])]),_:1})):R("",!0)]),_:1})):R("",!0)]),_:1}))}});const Oe=te(Fe,[["__scopeId","data-v-3fe693ce"]]),Ye=["src"],We={inheritAttrs:!1},Ge=z({...We,__name:"ImageCard",props:{image:{},url:{default:"",type:String},persistent:{default:!0},disabled:{default:!1}},emits:["update:image","update"],setup(m,{emit:d}){const r=m,{current:o}=me(),c=C(r.url),y=C(),_=()=>{r.disabled||y.value.click()},a=f=>{if(f.target.files.length>0){const V=f.target.files[0];d("update:image",V),document.getElementById("file").value="",d("update")}};return Y(()=>r.image,()=>{if(r.image){const f=new FileReader;f.onload=()=>{c.value=f.result},f.readAsDataURL(r.image)}else c.value=r.url}),(f,V)=>(p(),P(fe,null,[c.value.length?(p(),v(we,{key:1},{default:n(({props:g,isHovering:k})=>[t(w,ne({...g,...f.$attrs},{class:"bg-transparent d-flex align-center justify-center",flat:"",onClick:_}),{default:n(()=>[i("img",{src:c.value,style:{width:"100%"}},null,8,Ye),t(be,{"model-value":k,contained:"",class:"d-flex align-center justify-center"},{default:n(()=>[t(x,{color:"white",size:"60"},{default:n(()=>[l("mdi-image-edit")]),_:1})]),_:2},1032,["model-value"])]),_:2},1040)]),_:1})):(p(),v(w,{key:0,onClick:_,id:"image-container",height:"160",width:"100%",class:"d-flex align-center justify-center bg-transparent",flat:"",style:pe({borderColor:e(o).colors.primary})},{default:n(()=>[t(x,{color:"primary",size:"25",dense:""},{default:n(()=>[l("mdi-plus")]),_:1})]),_:1},8,["style"])),i("input",{id:"file",type:"file",onChange:a,hidden:"",ref_key:"file",ref:y,accept:"image/png, image/jpg, image/jpeg"},null,544)],64))}});const K=te(Ge,[["__scopeId","data-v-1bd9c962"]]),qe=()=>{const m=C(null),d=C(!1),r=Z(),o=()=>{if(!m.value)return;S().changeProfile(m.value).then(()=>{r.push({query:{success:"true",message:"Successfully change profile!"}})}),d.value=!1},c=()=>{d.value=!1,m.value=null};return Y(()=>m.value,()=>{m.value&&(d.value=!0)}),{image:m,applyImage:o,cancelImage:c,showApplyImageDialog:d}},He={class:"mt-3 px-5 px-md-0 align-end w-100 d-flex"},Qe={class:"w-100"},Xe={class:"text-center text-md-left text-md-h3 font-weight-medium",style:{"text-transform":"capitalize !important"}},Je={class:"text-center text-md-left font-weight-regular text-md-subtitle-1 text-capitalize"},Ke=i("h4",null,"General options",-1),Ze=i("h4",null,"Other",-1),et={class:"px-5"},tt=i("h4",null,"Time in",-1),nt={class:"px-5"},at=i("h4",null,"Time out",-1),lt={class:"px-5"},ot=i("h4",null,"Work time",-1),st={class:"d-flex"},it={key:0,class:"text-red text-subtitle-2 d-flex align-center pl-2"},dt={class:"d-flex"},rt={class:"py-5"},Lt=z({__name:"Show",setup(m){const d=C(!1),r=C(!1),o=new Date,{mobile:c}=ee(),y=S(),_=C(!1),{student:a}=T(S()),{timeIn:f,timeOut:V,workTime:g}=O(a),{applyImage:k,cancelImage:oe,image:D,showApplyImageDialog:B}=qe(),{enter:E,absent:H,leave:Q,enterWithPolicy:se,isLoading:M,showPolicyConfirmation:j,removeAttendance:X}=ke(a.value);_e((A,s,N)=>{A.params.student_id!=s.params.student_id&&y.get(A.params.student_id),N()});const ie=async()=>{document.getElementById("link")};return(A,s)=>{const N=ge("RouterView");return e(a)?(p(),v($e,{key:0,class:"h-100 pb-15 pb-md-5 bg-white px-md-8 px-2",style:{"overflow-x":"hidden"}},{default:n(()=>[t(J,null,{default:n(()=>[e(c)?R("",!0):(p(),v(I,{key:0,cols:"3",class:"d-flex align-end"},{default:n(()=>[(p(),v(K,{height:"100%",url:e(a).image,class:"rounded-xl bg-grey-lighten-5 w-100",image:e(D),"onUpdate:image":s[0]||(s[0]=u=>L(D)?D.value=u:null),key:e(a).id},null,8,["url","image"]))]),_:1})),t(I,{class:"px-5 pt-5"},{default:n(()=>[t(w,{class:"d-flex flex-column flex-lg-row stretch mb-4 bg-transparent",flat:""},{default:n(()=>[e(c)?(p(),v(K,{height:"225",url:e(a).image,class:"rounded-lg mx-auto bg-grey-lighten-5 w-75",image:e(D),"onUpdate:image":s[1]||(s[1]=u=>L(D)?D.value=u:null),key:e(a).id},null,8,["url","image"])):R("",!0),i("div",He,[i("div",Qe,[i("h1",Xe,b(e(a).first_name+" "+e(a).last_name),1),i("h5",Je,b(e(a).position),1)])]),t(Ve,{location:"bottom left"},{activator:n(({props:u})=>[e(c)?R("",!0):(p(),v($,ne({key:0,size:e(c)?"small":"default",class:"mx-2",icon:"mdi-dots-horizontal"},u),null,16,["size"]))]),default:n(()=>[t(w,{width:"325",class:"rounded-lg pa-2 px-5 mr-5",disabled:e(M),loading:e(M)},{default:n(()=>[t(ae,null,{default:n(()=>[Ke,t(h,{onClick:e(E),"prepend-icon":"mdi-login",disabled:e(a).attendance&&!!e(a).attendance.time_in||e(a).attendance&&!!e(a).attendance.is_absent||e(a).attendance&&!!e(a).attendance.is_event},{default:n(()=>[l("Enter")]),_:1},8,["onClick","disabled"]),t(h,{onClick:e(H),"prepend-icon":"mdi-close",disabled:e(a).attendance&&!!e(a).attendance.time_in||e(a).attendance&&!!e(a).attendance.is_absent||e(a).attendance&&!!e(a).attendance.is_event},{default:n(()=>[l("Absent")]),_:1},8,["onClick","disabled"]),t(h,{onClick:s[2]||(s[2]=u=>e(Q)(e(a).id,e(a).attendance.id)),"prepend-icon":"mdi-logout",disabled:!e(a).attendance||e(a).attendance&&!!e(a).attendance.time_in&&!!e(a).attendance.time_out||e(a).attendance&&!!e(a).attendance.is_absent||e(a).attendance&&!!e(a).attendance.is_event},{default:n(()=>[l("Leave")]),_:1},8,["disabled"]),t(h,{disabled:!e(a).attendance||e(a).attendance&&!e(a).attendance.time_in||!e(a).attendance.time_out,"prepend-icon":"mdi-repeat",onClick:s[3]||(s[3]=u=>r.value=!0)},{default:n(()=>[l("Re-enter")]),_:1},8,["disabled"]),t(h,{onClick:e(X),disabled:!e(a).attendance,"prepend-icon":"mdi-cancel"},{default:n(()=>[l("Remove")]),_:1},8,["onClick","disabled"]),Ze,t(h,{"prepend-icon":"mdi-printer",onClick:ie},{default:n(()=>[l("Download Attendance")]),_:1}),t(h,{"prepend-icon":"mdi-book-open-outline",onClick:s[4]||(s[4]=u=>_.value=!0)},{default:n(()=>[l("Manual Attendance")]),_:1}),t(h,{color:"error",onClick:s[5]||(s[5]=u=>d.value=!0),"prepend-icon":"mdi-trash-can-outline"},{default:n(()=>[l("Delete Student")]),_:1})]),_:1})]),_:1},8,["disabled","loading"])]),_:1})]),_:1}),t(ze),e(c)?R("",!0):(p(),v(J,{key:0},{default:n(()=>[t(I,null,{default:n(()=>[t(w,{flat:"",class:"pa-5 bg-transparent align-center d-flex rounded-lg"},{default:n(()=>[t(x,{size:"60"},{default:n(()=>[l("mdi-clock-in")]),_:1}),i("div",et,[tt,i("h3",null,b(e(f)),1)])]),_:1})]),_:1}),t(I,null,{default:n(()=>[t(w,{flat:"",class:"pa-5 bg-transparent align-center d-flex rounded-lg"},{default:n(()=>[t(x,{size:"60"},{default:n(()=>[l("mdi-clock-out")]),_:1}),i("div",nt,[at,i("h3",null,b(e(V)),1)])]),_:1})]),_:1}),t(I,null,{default:n(()=>[t(w,{flat:"",class:"pa-5 bg-transparent align-center d-flex rounded-lg"},{default:n(()=>[t(x,{size:"60"},{default:n(()=>[l("mdi-update")]),_:1}),i("div",lt,[ot,i("h3",st,[l(b(e(g))+" ",1),e(a).attendance&&e(a).attendance.policy&&e(a).attendance.time_out?(p(),P("span",it," -"+b(parseFloat(e(a).attendance.late_time).toFixed(2)||0)+"h ",1)):R("",!0)])])]),_:1})]),_:1})]),_:1}))]),_:1})]),_:1}),i("nav",dt,[t(Re,{class:"mt-1 mt-md-4"},{default:n(()=>[t(F,{color:"primary",value:"index",onClick:s[6]||(s[6]=u=>A.$router.push({name:"ShowStudent.index"})),class:"text-capitalize"},{default:n(()=>[l("Overview")]),_:1}),t(F,{color:"primary",value:"information",onClick:s[7]||(s[7]=u=>A.$router.push({name:"ShowStudent.information"})),class:"text-capitalize"},{default:n(()=>[l("Information")]),_:1}),t(F,{color:"primary",value:"Courses",onClick:s[8]||(s[8]=u=>A.$router.push({name:"ShowStudent.courses"})),class:"text-capitalize"},{default:n(()=>[l("Courses")]),_:1})]),_:1})]),i("div",rt,[e(a)?(p(),v(N,{key:0},{default:n(({Component:u})=>[(p(),v(ve(u)))]),_:1})):R("",!0)]),t(Ce,{onAllow:e(se),onDeny:e(E),"show-policy-confirmation":e(j),"onUpdate:showPolicyConfirmation":s[9]||(s[9]=u=>L(j)?j.value=u:null),"is-loading":e(M)},null,8,["onAllow","onDeny","show-policy-confirmation","is-loading"]),t(xe,{start_at:e(o),key:"now","show-dialog":_.value,"onUpdate:showDialog":s[10]||(s[10]=u=>_.value=u)},null,8,["start_at","show-dialog"]),t(Oe,{onManual:s[11]||(s[11]=u=>_.value=!0),onEnter:e(E),onAbsent:e(H),onLeave:s[12]||(s[12]=u=>e(Q)(e(a).id,e(a).attendance.id)),onRemove:e(X),onReEnter:s[13]||(s[13]=u=>r.value=!0)},null,8,["onEnter","onAbsent","onRemove"]),t(Be,{"show-remove-student":d.value,"onUpdate:showRemoveStudent":s[14]||(s[14]=u=>d.value=u)},null,8,["show-remove-student"]),t(Le,{"show-relogin-dialog":r.value,"onUpdate:showReloginDialog":s[15]||(s[15]=u=>r.value=u),attendance_id:e(a).attendance?e(a).attendance.id:-1},null,8,["show-relogin-dialog","attendance_id"]),t(q,{modelValue:e(B),"onUpdate:modelValue":s[16]||(s[16]=u=>L(B)?B.value=u:null),width:"300",persistent:"",scrim:"transparent"},{default:n(()=>[t(w,{class:"pa-5 rounded-lg"},{default:n(()=>[t(W,{class:"text-center"},{default:n(()=>[l(" Do you want to apply it? "),t(G,{class:"d-flex justify-center mt-1"},{default:n(()=>[t($,{size:"small",color:"primary",onClick:e(k)},{default:n(()=>[l("Apply")]),_:1},8,["onClick"]),t($,{size:"small",class:"",onClick:e(oe)},{default:n(()=>[l("Cancel")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])]),_:1})):R("",!0)}}});export{Lt as default};
