import{c as U,a as r,h as g,b as ce,i as ke,e as D,l as de,r as $,w as x,o as ae,d as nt,g as ee,u as Pe,f as He,j as Me,k as Ae,m as lt,n as Ve,p as it,q as Le,s as oe,t as Re,v as De,x as Ce,y as ot,z as Ee,A as rt,B as ut,C as st,D as ct,E as dt,F as ft,G as vt,H as ht,I as be,J as re,K as gt,L as mt,T as bt,M as yt,N as We,O as wt,P as pt,Q as $e,R as xt,S as se,U as St,V as H,W as j,X as q,Y as ye,Z as Be,_ as ze,$ as L,a0 as Qe,a1 as J,a2 as ue,a3 as _t,a4 as we,a5 as pe,a6 as Z,a7 as kt}from"./index.d510ed45.js";import{Q as Tt}from"./QSpace.6f68aa3e.js";import{Q as qt}from"./QTooltip.c04ed348.js";import{Q as Se,a as X,b as G,c as Lt}from"./QMenu.e66367a1.js";import{Q as Ct}from"./QToolbar.dc0fe3a3.js";import{Q as _e}from"./QResizeObserver.076847df.js";import{T as xe}from"./TouchPan.116bf740.js";import{Q as $t}from"./QList.74fe262e.js";var Bt=U({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:S}){const u=r(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>g("div",{class:u.value},ce(S.default))}}),zt=U({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:S,emit:u}){const{proxy:{$q:n}}=ee(),l=ke(de,D);if(l===D)return console.error("QHeader needs to be child of QLayout"),D;const i=$(parseInt(e.heightHint,10)),f=$(!0),_=r(()=>e.reveal===!0||l.view.value.indexOf("H")!==-1||n.platform.is.ios&&l.isContainer.value===!0),k=r(()=>{if(e.modelValue!==!0)return 0;if(_.value===!0)return f.value===!0?i.value:0;const o=i.value-l.scroll.value.position;return o>0?o:0}),w=r(()=>e.modelValue!==!0||_.value===!0&&f.value!==!0),a=r(()=>e.modelValue===!0&&w.value===!0&&e.reveal===!0),T=r(()=>"q-header q-layout__section--marginal "+(_.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(w.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),p=r(()=>{const o=l.rows.value.top,B={};return o[0]==="l"&&l.left.space===!0&&(B[n.lang.rtl===!0?"right":"left"]=`${l.left.size}px`),o[2]==="r"&&l.right.space===!0&&(B[n.lang.rtl===!0?"left":"right"]=`${l.right.size}px`),B});function m(o,B){l.update("header",o,B)}function b(o,B){o.value!==B&&(o.value=B)}function s({height:o}){b(i,o),m("size",o)}function y(o){a.value===!0&&b(f,!0),u("focusin",o)}x(()=>e.modelValue,o=>{m("space",o),b(f,!0),l.animate()}),x(k,o=>{m("offset",o)}),x(()=>e.reveal,o=>{o===!1&&b(f,e.modelValue)}),x(f,o=>{l.animate(),u("reveal",o)}),x(l.scroll,o=>{e.reveal===!0&&b(f,o.direction==="up"||o.position<=e.revealOffset||o.position-o.inflectionPoint<100)});const d={};return l.instances.header=d,e.modelValue===!0&&m("size",i.value),m("space",e.modelValue),m("offset",k.value),ae(()=>{l.instances.header===d&&(l.instances.header=void 0,m("size",0),m("offset",0),m("space",!1))}),()=>{const o=nt(S.default,[]);return e.elevated===!0&&o.push(g("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),o.push(g(_e,{debounce:0,onResize:s})),g("header",{class:T.value,style:p.value,onFocusin:y},o)}}});const Ie=150;var Qt=U({name:"QDrawer",inheritAttrs:!1,props:{...Pe,...He,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...Me,"onLayout","miniState"],setup(e,{slots:S,emit:u,attrs:n}){const l=ee(),{proxy:{$q:i}}=l,f=Ae(e,i),{preventBodyScroll:_}=ot(),{registerTimeout:k,removeTimeout:w}=lt(),a=ke(de,D);if(a===D)return console.error("QDrawer needs to be child of QLayout"),D;let T,p=null,m;const b=$(e.behavior==="mobile"||e.behavior!=="desktop"&&a.totalWidth.value<=e.breakpoint),s=r(()=>e.mini===!0&&b.value!==!0),y=r(()=>s.value===!0?e.miniWidth:e.width),d=$(e.showIfAbove===!0&&b.value===!1?!0:e.modelValue===!0),o=r(()=>e.persistent!==!0&&(b.value===!0||fe.value===!0));function B(t,h){if(A(),t!==!1&&a.animate(),O(0),b.value===!0){const Q=a.instances[Y.value];Q!==void 0&&Q.belowBreakpoint===!0&&Q.hide(!1),F(1),a.isContainer.value!==!0&&_(!0)}else F(0),t!==!1&&he(!1);k(()=>{t!==!1&&he(!0),h!==!0&&u("show",t)},Ie)}function v(t,h){E(),t!==!1&&a.animate(),F(0),O(R.value*y.value),ge(),h!==!0?k(()=>{u("hide",t)},Ie):w()}const{show:C,hide:z}=Ve({showing:d,hideOnRouteChange:o,handleShow:B,handleHide:v}),{addToHistory:A,removeFromHistory:E}=it(d,z,o),V={belowBreakpoint:b,hide:z},P=r(()=>e.side==="right"),R=r(()=>(i.lang.rtl===!0?-1:1)*(P.value===!0?1:-1)),ne=$(0),W=$(!1),te=$(!1),le=$(y.value*R.value),Y=r(()=>P.value===!0?"left":"right"),c=r(()=>d.value===!0&&b.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:y.value:0),I=r(()=>e.overlay===!0||e.miniToOverlay===!0||a.view.value.indexOf(P.value?"R":"L")!==-1||i.platform.is.ios===!0&&a.isContainer.value===!0),M=r(()=>e.overlay===!1&&d.value===!0&&b.value===!1),fe=r(()=>e.overlay===!0&&d.value===!0&&b.value===!1),Fe=r(()=>"fullscreen q-drawer__backdrop"+(d.value===!1&&W.value===!1?" hidden":"")),Ne=r(()=>({backgroundColor:`rgba(0,0,0,${ne.value*.4})`})),Te=r(()=>P.value===!0?a.rows.value.top[2]==="r":a.rows.value.top[0]==="l"),je=r(()=>P.value===!0?a.rows.value.bottom[2]==="r":a.rows.value.bottom[0]==="l"),Ue=r(()=>{const t={};return a.header.space===!0&&Te.value===!1&&(I.value===!0?t.top=`${a.header.offset}px`:a.header.space===!0&&(t.top=`${a.header.size}px`)),a.footer.space===!0&&je.value===!1&&(I.value===!0?t.bottom=`${a.footer.offset}px`:a.footer.space===!0&&(t.bottom=`${a.footer.size}px`)),t}),Ke=r(()=>{const t={width:`${y.value}px`,transform:`translateX(${le.value}px)`};return b.value===!0?t:Object.assign(t,Ue.value)}),Ge=r(()=>"q-drawer__content fit "+(a.isContainer.value!==!0?"scroll":"overflow-auto")),Ye=r(()=>`q-drawer q-drawer--${e.side}`+(te.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(f.value===!0?" q-drawer--dark q-dark":"")+(W.value===!0?" no-transition":d.value===!0?"":" q-layout--prevent-focus")+(b.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${s.value===!0?"mini":"standard"}`+(I.value===!0||M.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+(Te.value===!0?" q-drawer--top-padding":""))),Je=r(()=>{const t=i.lang.rtl===!0?e.side:Y.value;return[[xe,tt,void 0,{[t]:!0,mouse:!0}]]}),Xe=r(()=>{const t=i.lang.rtl===!0?Y.value:e.side;return[[xe,qe,void 0,{[t]:!0,mouse:!0}]]}),Ze=r(()=>{const t=i.lang.rtl===!0?Y.value:e.side;return[[xe,qe,void 0,{[t]:!0,mouse:!0,mouseAllDir:!0}]]});function ve(){at(b,e.behavior==="mobile"||e.behavior!=="desktop"&&a.totalWidth.value<=e.breakpoint)}x(b,t=>{t===!0?(T=d.value,d.value===!0&&z(!1)):e.overlay===!1&&e.behavior!=="mobile"&&T!==!1&&(d.value===!0?(O(0),F(0),ge()):C(!1))}),x(()=>e.side,(t,h)=>{a.instances[h]===V&&(a.instances[h]=void 0,a[h].space=!1,a[h].offset=0),a.instances[t]=V,a[t].size=y.value,a[t].space=M.value,a[t].offset=c.value}),x(a.totalWidth,()=>{(a.isContainer.value===!0||document.qScrollPrevented!==!0)&&ve()}),x(()=>e.behavior+e.breakpoint,ve),x(a.isContainer,t=>{d.value===!0&&_(t!==!0),t===!0&&ve()}),x(a.scrollbarWidth,()=>{O(d.value===!0?0:void 0)}),x(c,t=>{N("offset",t)}),x(M,t=>{u("onLayout",t),N("space",t)}),x(P,()=>{O()}),x(y,t=>{O(),me(e.miniToOverlay,t)}),x(()=>e.miniToOverlay,t=>{me(t,y.value)}),x(()=>i.lang.rtl,()=>{O()}),x(()=>e.mini,()=>{e.noMiniAnimation||e.modelValue===!0&&(et(),a.animate())}),x(s,t=>{u("miniState",t)});function O(t){t===void 0?Le(()=>{t=d.value===!0?0:y.value,O(R.value*t)}):(a.isContainer.value===!0&&P.value===!0&&(b.value===!0||Math.abs(t)===y.value)&&(t+=R.value*a.scrollbarWidth.value),le.value=t)}function F(t){ne.value=t}function he(t){const h=t===!0?"remove":a.isContainer.value!==!0?"add":"";h!==""&&document.body.classList[h]("q-body--drawer-toggle")}function et(){p!==null&&clearTimeout(p),l.proxy&&l.proxy.$el&&l.proxy.$el.classList.add("q-drawer--mini-animate"),te.value=!0,p=setTimeout(()=>{p=null,te.value=!1,l&&l.proxy&&l.proxy.$el&&l.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function tt(t){if(d.value!==!1)return;const h=y.value,Q=oe(t.distance.x,0,h);if(t.isFinal===!0){Q>=Math.min(75,h)===!0?C():(a.animate(),F(0),O(R.value*h)),W.value=!1;return}O((i.lang.rtl===!0?P.value!==!0:P.value)?Math.max(h-Q,0):Math.min(0,Q-h)),F(oe(Q/h,0,1)),t.isFirst===!0&&(W.value=!0)}function qe(t){if(d.value!==!0)return;const h=y.value,Q=t.direction===e.side,ie=(i.lang.rtl===!0?Q!==!0:Q)?oe(t.distance.x,0,h):0;if(t.isFinal===!0){Math.abs(ie)<Math.min(75,h)===!0?(a.animate(),F(1),O(0)):z(),W.value=!1;return}O(R.value*ie),F(oe(1-ie/h,0,1)),t.isFirst===!0&&(W.value=!0)}function ge(){_(!1),he(!0)}function N(t,h){a.update(e.side,t,h)}function at(t,h){t.value!==h&&(t.value=h)}function me(t,h){N("size",t===!0?e.miniWidth:h)}return a.instances[e.side]=V,me(e.miniToOverlay,y.value),N("space",M.value),N("offset",c.value),e.showIfAbove===!0&&e.modelValue!==!0&&d.value===!0&&e["onUpdate:modelValue"]!==void 0&&u("update:modelValue",!0),Re(()=>{u("onLayout",M.value),u("miniState",s.value),T=e.showIfAbove===!0;const t=()=>{(d.value===!0?B:v)(!1,!0)};if(a.totalWidth.value!==0){Le(t);return}m=x(a.totalWidth,()=>{m(),m=void 0,d.value===!1&&e.showIfAbove===!0&&b.value===!1?C(!1):t()})}),ae(()=>{m!==void 0&&m(),p!==null&&(clearTimeout(p),p=null),d.value===!0&&ge(),a.instances[e.side]===V&&(a.instances[e.side]=void 0,N("size",0),N("offset",0),N("space",!1))}),()=>{const t=[];b.value===!0&&(e.noSwipeOpen===!1&&t.push(De(g("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),Je.value)),t.push(Ce("div",{ref:"backdrop",class:Fe.value,style:Ne.value,"aria-hidden":"true",onClick:z},void 0,"backdrop",e.noSwipeBackdrop!==!0&&d.value===!0,()=>Ze.value)));const h=s.value===!0&&S.mini!==void 0,Q=[g("div",{...n,key:""+h,class:[Ge.value,n.class]},h===!0?S.mini():ce(S.default))];return e.elevated===!0&&d.value===!0&&Q.push(g("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),t.push(Ce("aside",{ref:"content",class:Ye.value,style:Ke.value},Q,"contentclose",e.noSwipeClose!==!0&&b.value===!0,()=>Xe.value)),g("div",{class:"q-drawer-container"},t)}}}),It=U({name:"QPageContainer",setup(e,{slots:S}){const{proxy:{$q:u}}=ee(),n=ke(de,D);if(n===D)return console.error("QPageContainer needs to be child of QLayout"),D;Ee(rt,!0);const l=r(()=>{const i={};return n.header.space===!0&&(i.paddingTop=`${n.header.size}px`),n.right.space===!0&&(i[`padding${u.lang.rtl===!0?"Left":"Right"}`]=`${n.right.size}px`),n.footer.space===!0&&(i.paddingBottom=`${n.footer.size}px`),n.left.space===!0&&(i[`padding${u.lang.rtl===!0?"Right":"Left"}`]=`${n.left.size}px`),i});return()=>g("div",{class:"q-page-container",style:l.value},ce(S.default))}});const{passive:Oe}=dt,Ot=["both","horizontal","vertical"];var Pt=U({name:"QScrollObserver",props:{axis:{type:String,validator:e=>Ot.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:ut},emits:["scroll"],setup(e,{emit:S}){const u={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let n=null,l,i;x(()=>e.scrollTarget,()=>{k(),_()});function f(){n!==null&&n();const T=Math.max(0,ft(l)),p=vt(l),m={top:T-u.position.top,left:p-u.position.left};if(e.axis==="vertical"&&m.top===0||e.axis==="horizontal"&&m.left===0)return;const b=Math.abs(m.top)>=Math.abs(m.left)?m.top<0?"up":"down":m.left<0?"left":"right";u.position={top:T,left:p},u.directionChanged=u.direction!==b,u.delta=m,u.directionChanged===!0&&(u.direction=b,u.inflectionPoint=u.position),S("scroll",{...u})}function _(){l=st(i,e.scrollTarget),l.addEventListener("scroll",w,Oe),w(!0)}function k(){l!==void 0&&(l.removeEventListener("scroll",w,Oe),l=void 0)}function w(T){if(T===!0||e.debounce===0||e.debounce==="0")f();else if(n===null){const[p,m]=e.debounce?[setTimeout(f,e.debounce),clearTimeout]:[requestAnimationFrame(f),cancelAnimationFrame];n=()=>{m(p),n=null}}}const{proxy:a}=ee();return x(()=>a.$q.lang.rtl,f),Re(()=>{i=a.$el.parentNode,_()}),ae(()=>{n!==null&&n(),k()}),Object.assign(a,{trigger:w,getPosition:()=>u}),ct}}),Ht=U({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:S,emit:u}){const{proxy:{$q:n}}=ee(),l=$(null),i=$(n.screen.height),f=$(e.container===!0?0:n.screen.width),_=$({position:0,direction:"down",inflectionPoint:0}),k=$(0),w=$(ht.value===!0?0:be()),a=r(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),T=r(()=>e.container===!1?{minHeight:n.screen.height+"px"}:null),p=r(()=>w.value!==0?{[n.lang.rtl===!0?"left":"right"]:`${w.value}px`}:null),m=r(()=>w.value!==0?{[n.lang.rtl===!0?"right":"left"]:0,[n.lang.rtl===!0?"left":"right"]:`-${w.value}px`,width:`calc(100% + ${w.value}px)`}:null);function b(v){if(e.container===!0||document.qScrollPrevented!==!0){const C={position:v.position.top,direction:v.direction,directionChanged:v.directionChanged,inflectionPoint:v.inflectionPoint.top,delta:v.delta.top};_.value=C,e.onScroll!==void 0&&u("scroll",C)}}function s(v){const{height:C,width:z}=v;let A=!1;i.value!==C&&(A=!0,i.value=C,e.onScrollHeight!==void 0&&u("scrollHeight",C),d()),f.value!==z&&(A=!0,f.value=z),A===!0&&e.onResize!==void 0&&u("resize",v)}function y({height:v}){k.value!==v&&(k.value=v,d())}function d(){if(e.container===!0){const v=i.value>k.value?be():0;w.value!==v&&(w.value=v)}}let o=null;const B={instances:{},view:r(()=>e.view),isContainer:r(()=>e.container),rootRef:l,height:i,containerHeight:k,scrollbarWidth:w,totalWidth:r(()=>f.value+w.value),rows:r(()=>{const v=e.view.toLowerCase().split(" ");return{top:v[0].split(""),middle:v[1].split(""),bottom:v[2].split("")}}),header:re({size:0,offset:0,space:!1}),right:re({size:300,offset:0,space:!1}),footer:re({size:0,offset:0,space:!1}),left:re({size:300,offset:0,space:!1}),scroll:_,animate(){o!==null?clearTimeout(o):document.body.classList.add("q-body--layout-animate"),o=setTimeout(()=>{o=null,document.body.classList.remove("q-body--layout-animate")},155)},update(v,C,z){B[v][C]=z}};if(Ee(de,B),be()>0){let z=function(){v=null,C.classList.remove("hide-scrollbar")},A=function(){if(v===null){if(C.scrollHeight>n.screen.height)return;C.classList.add("hide-scrollbar")}else clearTimeout(v);v=setTimeout(z,300)},E=function(V){v!==null&&V==="remove"&&(clearTimeout(v),z()),window[`${V}EventListener`]("resize",A)},v=null;const C=document.body;x(()=>e.container!==!0?"add":"remove",E),e.container!==!0&&E("add"),gt(()=>{E("remove")})}return()=>{const v=mt(S.default,[g(Pt,{onScroll:b}),g(_e,{onResize:s})]),C=g("div",{class:a.value,style:T.value,ref:e.container===!0?void 0:l,tabindex:-1},v);return e.container===!0?g("div",{class:"q-layout-container overflow-hidden",ref:l},[g(_e,{onResize:y}),g("div",{class:"absolute-full",style:p.value},[g("div",{class:"scroll",style:m.value},[C])])]):C}}}),Mt=U({name:"QSlideTransition",props:{appear:Boolean,duration:{type:Number,default:300}},emits:["show","hide"],setup(e,{slots:S,emit:u}){let n=!1,l,i,f=null,_=null,k,w;function a(){l&&l(),l=null,n=!1,f!==null&&(clearTimeout(f),f=null),_!==null&&(clearTimeout(_),_=null),i!==void 0&&i.removeEventListener("transitionend",k),k=null}function T(s,y,d){y!==void 0&&(s.style.height=`${y}px`),s.style.transition=`height ${e.duration}ms cubic-bezier(.25, .8, .50, 1)`,n=!0,l=d}function p(s,y){s.style.overflowY=null,s.style.height=null,s.style.transition=null,a(),y!==w&&u(y)}function m(s,y){let d=0;i=s,n===!0?(a(),d=s.offsetHeight===s.scrollHeight?0:void 0):(w="hide",s.style.overflowY="hidden"),T(s,d,y),f=setTimeout(()=>{f=null,s.style.height=`${s.scrollHeight}px`,k=o=>{_=null,(Object(o)!==o||o.target===s)&&p(s,"show")},s.addEventListener("transitionend",k),_=setTimeout(k,e.duration*1.1)},100)}function b(s,y){let d;i=s,n===!0?a():(w="show",s.style.overflowY="hidden",d=s.scrollHeight),T(s,d,y),f=setTimeout(()=>{f=null,s.style.height=0,k=o=>{_=null,(Object(o)!==o||o.target===s)&&p(s,"hide")},s.addEventListener("transitionend",k),_=setTimeout(k,e.duration*1.1)},100)}return ae(()=>{n===!0&&a()}),()=>g(bt,{css:!1,appear:e.appear,onEnter:m,onLeave:b},S.default)}});const K=yt({}),At=Object.keys(We);var Vt=U({name:"QExpansionItem",props:{...We,...Pe,...He,icon:String,label:String,labelLines:[Number,String],caption:String,captionLines:[Number,String],dense:Boolean,toggleAriaLabel:String,expandIcon:String,expandedIcon:String,expandIconClass:[Array,String,Object],duration:{},headerInsetLevel:Number,contentInsetLevel:Number,expandSeparator:Boolean,defaultOpened:Boolean,hideExpandIcon:Boolean,expandIconToggle:Boolean,switchToggleSide:Boolean,denseToggle:Boolean,group:String,popup:Boolean,headerStyle:[Array,String,Object],headerClass:[Array,String,Object]},emits:[...Me,"click","afterShow","afterHide"],setup(e,{slots:S,emit:u}){const{proxy:{$q:n}}=ee(),l=Ae(e,n),i=$(e.modelValue!==null?e.modelValue:e.defaultOpened),f=$(null),_=wt(),{show:k,hide:w,toggle:a}=Ve({showing:i});let T,p;const m=r(()=>`q-expansion-item q-item-type q-expansion-item--${i.value===!0?"expanded":"collapsed"} q-expansion-item--${e.popup===!0?"popup":"standard"}`),b=r(()=>{if(e.contentInsetLevel===void 0)return null;const c=n.lang.rtl===!0?"Right":"Left";return{["padding"+c]:e.contentInsetLevel*56+"px"}}),s=r(()=>e.disable!==!0&&(e.href!==void 0||e.to!==void 0&&e.to!==null&&e.to!=="")),y=r(()=>{const c={};return At.forEach(I=>{c[I]=e[I]}),c}),d=r(()=>s.value===!0||e.expandIconToggle!==!0),o=r(()=>e.expandedIcon!==void 0&&i.value===!0?e.expandedIcon:e.expandIcon||n.iconSet.expansionItem[e.denseToggle===!0?"denseIcon":"icon"]),B=r(()=>e.disable!==!0&&(s.value===!0||e.expandIconToggle===!0)),v=r(()=>({expanded:i.value===!0,detailsId:_.value,toggle:a,show:k,hide:w})),C=r(()=>{const c=e.toggleAriaLabel!==void 0?e.toggleAriaLabel:n.lang.label[i.value===!0?"collapse":"expand"](e.label);return{role:"button","aria-expanded":i.value===!0?"true":"false","aria-controls":_.value,"aria-label":c}});x(()=>e.group,c=>{p!==void 0&&p(),c!==void 0&&R()});function z(c){s.value!==!0&&a(c),u("click",c)}function A(c){c.keyCode===13&&E(c,!0)}function E(c,I){I!==!0&&f.value!==null&&f.value.focus(),a(c),St(c)}function V(){u("afterShow")}function P(){u("afterHide")}function R(){T===void 0&&(T=pt()),i.value===!0&&(K[e.group]=T);const c=x(i,M=>{M===!0?K[e.group]=T:K[e.group]===T&&delete K[e.group]}),I=x(()=>K[e.group],(M,fe)=>{fe===T&&M!==void 0&&M!==T&&w()});p=()=>{c(),I(),K[e.group]===T&&delete K[e.group],p=void 0}}function ne(){const c={class:[`q-focusable relative-position cursor-pointer${e.denseToggle===!0&&e.switchToggleSide===!0?" items-end":""}`,e.expandIconClass],side:e.switchToggleSide!==!0,avatar:e.switchToggleSide},I=[g(se,{class:"q-expansion-item__toggle-icon"+(e.expandedIcon===void 0&&i.value===!0?" q-expansion-item__toggle-icon--rotated":""),name:o.value})];return B.value===!0&&(Object.assign(c,{tabindex:0,...C.value,onClick:E,onKeyup:A}),I.unshift(g("div",{ref:f,class:"q-expansion-item__toggle-focus q-icon q-focus-helper q-focus-helper--rounded",tabindex:-1}))),g(G,c,()=>I)}function W(){let c;return S.header!==void 0?c=[].concat(S.header(v.value)):(c=[g(G,()=>[g(X,{lines:e.labelLines},()=>e.label||""),e.caption?g(X,{lines:e.captionLines,caption:!0},()=>e.caption):null])],e.icon&&c[e.switchToggleSide===!0?"push":"unshift"](g(G,{side:e.switchToggleSide===!0,avatar:e.switchToggleSide!==!0},()=>g(se,{name:e.icon})))),e.disable!==!0&&e.hideExpandIcon!==!0&&c[e.switchToggleSide===!0?"unshift":"push"](ne()),c}function te(){const c={ref:"item",style:e.headerStyle,class:e.headerClass,dark:l.value,disable:e.disable,dense:e.dense,insetLevel:e.headerInsetLevel};return d.value===!0&&(c.clickable=!0,c.onClick=z,Object.assign(c,s.value===!0?y.value:C.value)),g(Se,c,W)}function le(){return De(g("div",{key:"e-content",class:"q-expansion-item__content relative-position",style:b.value,id:_.value},ce(S.default)),[[xt,i.value]])}function Y(){const c=[te(),g(Mt,{duration:e.duration,onShow:V,onHide:P},le)];return e.expandSeparator===!0&&c.push(g($e,{class:"q-expansion-item__border q-expansion-item__border--top absolute-top",dark:l.value}),g($e,{class:"q-expansion-item__border q-expansion-item__border--bottom absolute-bottom",dark:l.value})),c}return e.group!==void 0&&R(),ae(()=>{p!==void 0&&p()}),()=>g("div",{class:m.value},[g("div",{class:"q-expansion-item__container relative-position"},Y())])}});const Rt={__name:"SidebarComponent",props:{items:Array},setup(e){return(S,u)=>(H(),j($t,null,{default:q(()=>[(H(!0),ye(Be,null,ze(e.items,(n,l)=>(H(),ye("div",{key:l},[n.expansion?(H(),j(Vt,{key:0,"expand-separator":"",icon:n.icon,label:n.title},{default:q(()=>[(H(!0),ye(Be,null,ze(n.children,(i,f)=>(H(),j(Se,{key:f,clickable:"",class:"q-mx-md",to:i.link},{default:q(()=>[i.icon?(H(),j(G,{key:0,avatar:""},{default:q(()=>[L(se,{name:i.icon},null,8,["name"])]),_:2},1024)):Qe("",!0),L(G,null,{default:q(()=>[L(X,null,{default:q(()=>[J(ue(i.title),1)]),_:2},1024),L(X,{caption:""},{default:q(()=>[J(ue(i.caption),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["to"]))),128))]),_:2},1032,["icon","label"])):(H(),j(Se,{key:l,clickable:"",to:n.link},{default:q(()=>[n.icon?(H(),j(G,{key:0,avatar:""},{default:q(()=>[L(se,{name:n.icon},null,8,["name"])]),_:2},1024)):Qe("",!0),L(G,null,{default:q(()=>[L(X,null,{default:q(()=>[J(ue(n.title),1)]),_:2},1024),L(X,{caption:""},{default:q(()=>[J(ue(n.caption),1)]),_:2},1024)]),_:2},1024)]),_:2},1032,["to"]))]))),128))]),_:1}))}},Dt=[{title:"Leads",caption:"",icon:"adjust",link:"/app/leads"},{title:"Deals",caption:"",icon:"paid",link:"/app/deals"},{title:"Contacts",caption:"",expansion:!0,icon:"contacts",children:[{title:"Contacts",caption:"",icon:"person",link:"/app/contacts"},{title:"Organizations",caption:"",icon:"corporate_fare",link:"/app/organizations"}]},{title:"Sales Pipeline",caption:"",expansion:!0,icon:"filter_alt",children:[{title:"Pipeline",caption:"",icon:"filter_alt",link:"/app/pipelines"},{title:"Pipeline Stages",caption:"",icon:"arrow_circle_right",link:"/app/pipeline-stages"}]},{title:"Project",caption:"",expansion:!0,icon:"apartment",children:[{title:"Milestone",caption:"",icon:"flag",link:"/app/milestones"}]},{title:"Product Management",caption:"",expansion:!0,icon:"category",children:[{title:"Product",caption:"",icon:"category",link:"/app/products"}]},{title:"Setting",expansion:!0,icon:"settings",children:[{icon:"label",title:"Tags",link:"/app/tags"}]}],Et=Z("img",{src:"https://www.svgrepo.com/show/227265/lemon.svg"},null,-1),Wt=Z("img",{src:"https://cdn.quasar.dev/img/boy-avatar.png"},null,-1),Ft={class:"row no-wrap q-pa-md"},Nt={class:"column items-center"},jt=Z("img",{src:"https://cdn.quasar.dev/img/avatar4.jpg"},null,-1),Ut=Z("div",{class:"text-subtitle1 q-mt-md q-mb-xs"},"John Doe",-1),na=Object.assign({name:"MainLayout"},{__name:"MainLayout",setup(e){const S=$(!1);function u(){S.value=!S.value}return(n,l)=>{const i=_t("router-view");return H(),j(Ht,{view:"lHh lpR fFf"},{default:q(()=>[L(zt,{bordered:"",class:"bg-orange-9 text-white"},{default:q(()=>[L(Ct,null,{default:q(()=>[L(we,{dense:"",flat:"",round:"",icon:"menu",onClick:u}),L(Bt,null,{default:q(()=>[L(pe,null,{default:q(()=>[Et]),_:1}),J(" Lemonshop CRM ")]),_:1}),L(Tt),L(we,{round:"",flat:""},{default:q(()=>[L(pe,{size:"26px"},{default:q(()=>[Wt]),_:1}),L(qt,null,{default:q(()=>[J("Account")]),_:1}),L(Lt,null,{default:q(()=>[Z("div",Ft,[Z("div",Nt,[L(pe,{size:"72px"},{default:q(()=>[jt]),_:1}),Ut,L(we,{color:"primary",label:"Logout",push:"",size:"sm",href:"/v2/logout"})])])]),_:1})]),_:1})]),_:1})]),_:1}),L(Qt,{"show-if-above":"",modelValue:S.value,"onUpdate:modelValue":l[0]||(l[0]=f=>S.value=f),side:"left",bordered:"",overlay:!1},{default:q(()=>[L(Rt,{items:kt(Dt)},null,8,["items"])]),_:1},8,["modelValue"]),L(It,null,{default:q(()=>[(H(),j(i,{key:n.$route.path}))]),_:1})]),_:1})}}});export{na as default};
