import{V as i,Y as u,$ as n,X as p,aT as t,a7 as e}from"./index.d510ed45.js";import{Q as f}from"./QForm.75657b46.js";const g={__name:"PipelineFormTemplate",props:{formHooks:Object},setup(d){const{formHooks:m}=d,{formData:o,formReadonly:s,formError:r,hooksCycle:c}=m;return(V,a)=>(i(),u("div",null,[n(f,{class:"q-gutter-md q-mt-xs"},{default:p(()=>[n(t,{modelValue:e(o).name,"onUpdate:modelValue":a[0]||(a[0]=l=>e(o).name=l),filled:"",label:"Name *",outlined:"","hide-bottom-space":"",dense:"",readonly:e(s),"error-message":e(r).name,error:e(r).name!==void 0},null,8,["modelValue","readonly","error-message","error"]),n(t,{modelValue:e(o).description,"onUpdate:modelValue":a[1]||(a[1]=l=>e(o).description=l),filled:"",label:"description",outlined:"","hide-bottom-space":"",dense:"",readonly:e(s),"error-message":e(r).description,error:e(r).description!==void 0},null,8,["modelValue","readonly","error-message","error"])]),_:1})]))}};export{g as default};
