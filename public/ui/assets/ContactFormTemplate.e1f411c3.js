import{a1 as m,a4 as y,a7 as r,a3 as p,aB as i,af as e,a2 as V,bh as q,a0 as B,a8 as b,a9 as _,a5 as C,a6 as U,ae as $,ac as v}from"./index.74d7f585.js";import{Q as O,d as S}from"./format.08b9b864.js";import{Q as A}from"./QSelect.6e6a07ef.js";import{Q as D}from"./QForm.b6b25a10.js";import{s as z,_ as I}from"./OrganizationFormTemplate.cb4f8620.js";import{s as P}from"./selectRenderHooks.8e94ca0e.js";import{a as R,_ as w}from"./FormModal.78f5b439.js";import"./QSpace.19d9814e.js";import"./ClosePopup.f0cb9b11.js";const E=$("div",{class:"text-h6 q-my-md"},"Address",-1),X={__name:"ContactFormTemplate",props:{formHooks:Object},setup(F){const{formHooks:Q}=F,{formData:o,formReadonly:d,formError:n,hooksCycle:H}=Q,k=P({url:"custom-apps/organizations",map:s=>({label:s.name,value:s.id})}),{options:N}=k,g=z(o,"emails"),c=z(o,"phones"),u=R({title:"Organization",url:"custom-apps/organizations"});return u.hooksCycle.afterCreate=s=>{o.value.organization={label:s.name,value:s.id}},H.afterResolve=s=>(s.organization&&(s.organization_id=s.organization.value),s),(s,l)=>(m(),y("div",null,[r(D,{class:"q-gutter-md q-mt-xs"},{default:p(()=>[r(i,{modelValue:e(o).name,"onUpdate:modelValue":l[0]||(l[0]=a=>e(o).name=a),filled:"",label:"Contact Name *",outlined:"","hide-bottom-space":"",dense:"",hint:"required",readonly:e(d),"error-message":e(n).name,error:e(n).name!==void 0},null,8,["modelValue","readonly","error-message","error"]),r(i,{modelValue:e(o).label,"onUpdate:modelValue":l[1]||(l[1]=a=>e(o).label=a),filled:"",label:"Label",outlined:"","hide-bottom-space":"",dense:"",readonly:e(d)},null,8,["modelValue","readonly"]),r(A,{filled:"","use-input":"",modelValue:e(o).organization,"onUpdate:modelValue":l[3]||(l[3]=a=>e(o).organization=a),label:"Organization","input-debounce":"1000",options:e(N),dense:"",clearable:"",onFilter:e(k).filterFn,onFilterAbort:e(k).abortFilterFn,readonly:e(d)},{append:p(()=>[e(o).organization?b("",!0):(m(),V(B,{key:0,class:"cursor-pointer",name:"add_circle",onClick:l[2]||(l[2]=q(a=>e(u).actions.form.create(),["stop","prevent"]))}))]),"no-option":p(()=>[r(O,null,{default:p(()=>[r(S,{class:"text-grey"},{default:p(()=>[_(" No results ")]),_:1})]),_:1})]),_:1},8,["modelValue","options","onFilter","onFilterAbort","readonly"]),(m(!0),y(C,null,U(e(o).emails,(a,t)=>(m(),y("div",{key:t},[r(i,{readonly:e(d),type:"email",dense:"",filled:"",modelValue:e(o).emails[t],"onUpdate:modelValue":f=>e(o).emails[t]=f,label:"Email"},{append:p(()=>[e(g).isDisplayAdd(t)?(m(),V(v,{key:0,round:"",dense:"",flat:"",icon:"add",onClick:e(g).add},null,8,["onClick"])):b("",!0),e(g).isDisplayRemove(t)?(m(),V(v,{key:1,round:"",dense:"",flat:"",icon:"close",onClick:f=>e(g).remove(t)},null,8,["onClick"])):b("",!0)]),_:2},1032,["readonly","modelValue","onUpdate:modelValue"])]))),128)),(m(!0),y(C,null,U(e(o).phones,(a,t)=>(m(),y("div",{key:t},[r(i,{readonly:e(d),dense:"",filled:"",modelValue:e(o).phones[t],"onUpdate:modelValue":f=>e(o).phones[t]=f,label:"Phone"},{append:p(()=>[e(c).isDisplayAdd(t)?(m(),V(v,{key:0,round:"",dense:"",flat:"",icon:"add",onClick:e(c).add},null,8,["onClick"])):b("",!0),e(c).isDisplayRemove(t)?(m(),V(v,{key:1,round:"",dense:"",flat:"",icon:"close",onClick:f=>e(c).remove(t)},null,8,["onClick"])):b("",!0)]),_:2},1032,["readonly","modelValue","onUpdate:modelValue"])]))),128)),E,r(i,{modelValue:e(o).house_unit,"onUpdate:modelValue":l[4]||(l[4]=a=>e(o).house_unit=a),filled:"",label:"House/Unit Number",outlined:"","hide-bottom-space":"",dense:"",readonly:e(d),"error-message":e(n).house_unit,error:e(n).house_unit!==void 0},null,8,["modelValue","readonly","error-message","error"]),r(i,{modelValue:e(o).street_name,"onUpdate:modelValue":l[5]||(l[5]=a=>e(o).street_name=a),filled:"",label:"Street Name",outlined:"","hide-bottom-space":"",dense:"",readonly:e(d),"error-message":e(n).street_name,error:e(n).street_name!==void 0},null,8,["modelValue","readonly","error-message","error"]),r(i,{modelValue:e(o).subdivision,"onUpdate:modelValue":l[6]||(l[6]=a=>e(o).subdivision=a),filled:"",label:"Subdivision",outlined:"","hide-bottom-space":"",dense:"",readonly:e(d),"error-message":e(n).subdivision,error:e(n).subdivision!==void 0},null,8,["modelValue","readonly","error-message","error"]),r(i,{modelValue:e(o).barangay,"onUpdate:modelValue":l[7]||(l[7]=a=>e(o).barangay=a),filled:"",label:"Barangay",outlined:"","hide-bottom-space":"",dense:"",readonly:e(d),"error-message":e(n).barangay,error:e(n).barangay!==void 0},null,8,["modelValue","readonly","error-message","error"]),r(i,{modelValue:e(o).city,"onUpdate:modelValue":l[8]||(l[8]=a=>e(o).city=a),filled:"",label:"City/Municipality",outlined:"","hide-bottom-space":"",dense:"",readonly:e(d),"error-message":e(n).city,error:e(n).city!==void 0},null,8,["modelValue","readonly","error-message","error"]),r(i,{modelValue:e(o).province,"onUpdate:modelValue":l[9]||(l[9]=a=>e(o).province=a),filled:"",label:"Province",outlined:"","hide-bottom-space":"",dense:"",readonly:e(d),"error-message":e(n).province,error:e(n).province!==void 0},null,8,["modelValue","readonly","error-message","error"]),r(i,{modelValue:e(o).postal_code,"onUpdate:modelValue":l[10]||(l[10]=a=>e(o).postal_code=a),filled:"",label:"Postal Code ",outlined:"","hide-bottom-space":"",dense:"",readonly:e(d),"error-message":e(n).postal_code,error:e(n).postal_code!==void 0},null,8,["modelValue","readonly","error-message","error"])]),_:1}),r(w,{modelValue:e(u).formShow.value,"onUpdate:modelValue":l[11]||(l[11]=a=>e(u).formShow.value=a),mode:e(u).formMode.value,title:"Organization",loading:e(u).formProcessing.value,onOnCreate:l[12]||(l[12]=a=>e(u).onCreate({})),onOnUpdate:l[13]||(l[13]=a=>e(u).onUpdate({}))},{form:p(()=>[r(I,{formHooks:e(u)},null,8,["formHooks"])]),_:1},8,["modelValue","mode","loading"])]))}};export{X as default};
