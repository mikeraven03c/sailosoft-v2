import{I as k,_,a as C}from"./ResourceForm.7fec25d5.js";import{F as H,a as g}from"./FormModal.7bac0fbd.js";import{aA as h,a as x,E as y,G as v,a2 as n,a5 as w,a8 as m,aw as F,ax as O,a4 as A,a3 as B,ay as M,az as P,ag as f}from"./index.62a56d21.js";import"./QResizeObserver.ca43569d.js";import"./QSelect.56e8e954.js";import"./QMenu.1879ff20.js";import"./QSpace.c6f2a2c6.js";const $={__name:"BaseResourcePage",props:{template:{type:Object,default:()=>{}}},setup(i){const{template:l}=i,o={...l},t=H(),r=k({title:o.title,url:o.url,conditions:o.filters?o.filters:""}),e=g({title:o.title,url:o.url,initialValues:o.formInitialValues});o.formHandleHooks=t,o.formHooks=e,o.indexHooks=r;const{form:c}=t,p=h(o.formTemplate),d=x(()=>p),{resetFetch:u,refresh:s}=r;return o.formConfig&&(o.formConfig.formShowAfterCreate&&(e.hooksCycle.resolveCreate=a=>{y(()=>{e.actions.form.show(a)})}),o.formConfig.formShowAfterUpdate&&(e.hooksCycle.resolveUpdate=a=>{e.actions.form.show(a)})),v(()=>{s()}),(a,U)=>(n(),w("div",null,[m(_,F(O(o)),null,16),m(C,P({ref_key:"form",ref:c},o,{onOnCreate:f(u),onOnUpdate:f(s)}),{default:A(()=>[(n(),B(M(d.value),{formHooks:o.formHooks},null,8,["formHooks"]))]),_:1},16,["onOnCreate","onOnUpdate"])]))}};export{$ as default};
