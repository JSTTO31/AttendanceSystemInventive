import{g as u,i as f}from"./VCard-5d4c2059.js";import{n as b,U as k,r as m,A as i,G as V,B as p,C as e,c as r,E as g,a8 as x,F as I,D as _,l as B,N as j,_ as w}from"./index-df5c3e00.js";import{V as N}from"./VOverlay-4618fd3d.js";import{V as z}from"./VHover-6f080d3e.js";const A=["src"],D={inheritAttrs:!1},E=b({...D,__name:"ImageCard",props:{image:{},url:{default:"",type:String},persistent:{default:!0},disabled:{default:!1}},emits:["update:image","remove","update"],setup(y,{emit:o}){const s=y,{current:h}=k();s.url;const l=m(s.url),c=m(),d=()=>{s.disabled||c.value.click()},v=t=>{if(t.target.files.length>0){const n=t.target.files[0],a=new FileReader;a.onload=()=>{l.value=a.result,o("update:image",n)},a.readAsDataURL(n),document.getElementById("file").value="",o("update")}};return(t,n)=>(i(),V(j,null,[l.value.length?(i(),p(z,{key:1},{default:e(({props:a,isHovering:C})=>[r(f,B({...a,...t.$attrs},{class:"bg-transparent d-flex align-center justify-center",flat:"",onClick:d}),{default:e(()=>[_("img",{src:l.value,style:{height:"100%"}},null,8,A),r(N,{"model-value":C,contained:"",class:"d-flex align-center justify-center"},{default:e(()=>[r(u,{color:"white",size:"60"},{default:e(()=>[g("mdi-image-edit")]),_:1})]),_:2},1032,["model-value"])]),_:2},1040)]),_:1})):(i(),p(f,{key:0,onClick:d,id:"image-container",height:"160",width:"100%",class:"d-flex align-center justify-center bg-transparent",flat:"",style:x({borderColor:I(h).colors.primary})},{default:e(()=>[r(u,{color:"primary",size:"25",dense:""},{default:e(()=>[g("mdi-plus")]),_:1})]),_:1},8,["style"])),_("input",{id:"file",type:"file",onChange:v,hidden:"",ref_key:"file",ref:c,accept:"image/png, image/jpg, image/jpeg"},null,544)],64))}});const U=w(E,[["__scopeId","data-v-56aebb7a"]]);export{U as I};
