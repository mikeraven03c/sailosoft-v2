import{a as p,E as u,a1 as n,a4 as d,a7 as s,av as _,aw as k,a3 as H,ax as g,af as m,ay as v,a2 as x,az as O,aA as h}from"./index.74d7f585.js";import{_ as I,a as P}from"./ResourceForm.a3f7e177.js";import{F as b,a as w}from"./FormModal.78f5b439.js";import{I as y}from"./IndexManagement.70bc027e.js";import"./ContextMenu.5e794d2d.js";import"./format.08b9b864.js";import"./QList.850a9c5c.js";import"./ClosePopup.f0cb9b11.js";import"./QSpace.19d9814e.js";import"./QSelect.6e6a07ef.js";const $={__name:"OrganizationPage",setup(z){const e={title:"Organization",url:"custom-apps/organizations",columns:[{name:"id",align:"left",label:"Id",field:"id",sortable:!0},{name:"name",align:"left",label:"Name",field:"name",sortable:!0}],formInitialValues:{name:"",label:""},template:()=>v(()=>h(()=>import("./OrganizationFormTemplate.cb4f8620.js").then(function(r){return r.O}),["assets/OrganizationFormTemplate.cb4f8620.js","assets/index.74d7f585.js","assets/index.9534a8ef.css","assets/QForm.b6b25a10.js"]))},a=b(),o=y({title:e.title,url:e.url}),l=w({title:e.title,url:e.url,initialValues:e.formInitialValues});e.formHandleHooks=a,e.formHooks=l,e.indexHooks=o;const{form:i}=a,f=p(()=>e.template()),{resetFetch:c,refresh:t}=o;return u(()=>{t()}),(r,C)=>(n(),d("div",null,[s(I,_(k(e)),null,16),s(P,g({formStyle:"width: 600px; max-width:90vw;",ref_key:"form",ref:i},e,{onOnCreate:m(c),onOnUpdate:m(t)}),{default:H(()=>[(n(),x(O(f.value),{formHooks:e.formHooks},null,8,["formHooks"]))]),_:1},16,["onOnCreate","onOnUpdate"])]))}};export{$ as default};
