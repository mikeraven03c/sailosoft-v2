import{a1 as M,a2 as O,a3 as p,a7 as r,aB as c,af as e,aC as S}from"./index.74d7f585.js";import{Q as E}from"./QForm.b6b25a10.js";import{f as Q,a as R,_ as w}from"./FormModal.78f5b439.js";const A={__name:"ResourceTestModal",props:{isLoading:Boolean,isDarkMode:Boolean,title:{type:String,default:""},url:{type:String,default:""},initialValues:{type:String,default:""}},emits:Q,setup(V,{expose:g,emit:b}){var d,i,u;const t=V,y=R({title:(d=t.title)!=null?d:"Contact",url:(i=t.url)!=null?i:"Contact",initialValues:(u=t.initialValues)!=null?u:{name:"",label:""}}),{formShow:n,formMode:C,formProcessing:F,formData:l,formError:m,formReadonly:s,exposedFormFunction:k,handleFormEmit:U,getActions:D}=y,_=b,{onFormCreate:x,onFormUpdate:B}=U(_);return g({...k}),(L,o)=>{var f;return M(),O(w,{modelValue:e(n),"onUpdate:modelValue":o[2]||(o[2]=a=>S(n)?n.value=a:null),mode:e(C),title:(f=t.title)!=null?f:"Contact",loading:e(F),onOnCreate:e(x),onOnUpdate:e(B)},{form:p(()=>[r(E,{class:"q-gutter-md"},{default:p(()=>[r(c,{modelValue:e(l).name,"onUpdate:modelValue":o[0]||(o[0]=a=>e(l).name=a),filled:"",label:"Name",outlined:"","hide-bottom-space":"",dense:"","stack-label":"",readonly:e(s),"error-message":e(m).name,error:e(m).name!==void 0},null,8,["modelValue","readonly","error-message","error"]),r(c,{modelValue:e(l).label,"onUpdate:modelValue":o[1]||(o[1]=a=>e(l).label=a),filled:"",label:"Label",outlined:"","hide-bottom-space":"",dense:"","stack-label":"",readonly:e(s)},null,8,["modelValue","readonly"])]),_:1})]),_:1},8,["modelValue","mode","title","loading","onOnCreate","onOnUpdate"])}}};export{A as _};
