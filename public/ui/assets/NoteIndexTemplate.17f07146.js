import{i as je,e as se,bl as Re,r as x,a as g,o as Ie,E as Le,G as We,b5 as Ke,h as w,v as U,al as ze,be as Ue,a0 as J,U as Xe,g as Z,ba as Ge,Z as Ye,c as ee,ah as ue,B as Te,w as z,J as Je,aQ as Ze,aP as et,b as te,f as tt,j as K,n as nt,k as at,m as Y,p as ce,t as we,u as de,F as ot,V as rt,bm as lt,bn as it,y as st,A as ut,H as ct,aG as dt,aF as vt,a1 as _e,a4 as ft,a7 as Pe,ax as ke,a3 as mt,a2 as ht,az as bt,af as qe,ay as gt,aA as pt}from"./index.74d7f585.js";import{Q as yt,g as xe,s as Se}from"./touch.654b88c8.js";import{r as Ct}from"./QSelect.6e6a07ef.js";import{c as Tt}from"./format.08b9b864.js";import{_ as wt,a as _t}from"./ResourceForm.a3f7e177.js";import{F as Pt,a as kt}from"./FormModal.78f5b439.js";import{I as qt}from"./IndexManagement.70bc027e.js";let xt=0;const St=["click","keydown"],At={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${xt++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function Rt(e,o,l,s){const a=je(Re,se);if(a===se)return console.error("QTab/QRouteTab component needs to be child of QTabs"),se;const{proxy:t}=Z(),i=x(null),p=x(null),A=x(null),L=g(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),d=g(()=>a.currentModel.value===e.name),M=g(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(d.value===!0?" q-tab--active"+(a.tabProps.value.activeClass?" "+a.tabProps.value.activeClass:"")+(a.tabProps.value.activeColor?` text-${a.tabProps.value.activeColor}`:"")+(a.tabProps.value.activeBgColor?` bg-${a.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&a.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||a.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(s!==void 0?s.linkClass.value:"")),b=g(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(a.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),y=g(()=>e.disable===!0||a.hasFocus.value===!0||d.value===!1&&a.hasActiveTab.value===!0?-1:e.tabindex||0);function P(u,k){if(k!==!0&&i.value!==null&&i.value.focus(),e.disable===!0){s!==void 0&&s.hasRouterLink.value===!0&&U(u);return}if(s===void 0){a.updateModel({name:e.name}),l("click",u);return}if(s.hasRouterLink.value===!0){const R=(_={})=>{let q;const $=_.to===void 0||Ge(_.to,e.to)===!0?a.avoidRouteWatcher=Ye():null;return s.navigateToRouterLink(u,{..._,returnRouterError:!0}).catch(E=>{q=E}).then(E=>{if($===a.avoidRouteWatcher&&(a.avoidRouteWatcher=!1,q===void 0&&(E===void 0||E.message!==void 0&&E.message.startsWith("Avoided redundant navigation")===!0)&&a.updateModel({name:e.name})),_.returnRouterError===!0)return q!==void 0?Promise.reject(q):E})};l("click",u,R),u.defaultPrevented!==!0&&R();return}l("click",u)}function B(u){ze(u,[13,32])?P(u,!0):Ue(u)!==!0&&u.keyCode>=35&&u.keyCode<=40&&u.altKey!==!0&&u.metaKey!==!0&&a.onKbdNavigate(u.keyCode,t.$el)===!0&&U(u),l("keydown",u)}function D(){const u=a.tabProps.value.narrowIndicator,k=[],R=w("div",{ref:A,class:["q-tab__indicator",a.tabProps.value.indicatorClass]});e.icon!==void 0&&k.push(w(J,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&k.push(w("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&k.push(e.alertIcon!==void 0?w(J,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):w("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),u===!0&&k.push(R);const _=[w("div",{class:"q-focus-helper",tabindex:-1,ref:i}),w("div",{class:b.value},Xe(o.default,k))];return u===!1&&_.push(R),_}const H={name:g(()=>e.name),rootRef:p,tabIndicatorRef:A,routeData:s};Ie(()=>{a.unregisterTab(H)}),Le(()=>{a.registerTab(H)});function Q(u,k){const R={ref:p,class:M.value,tabindex:y.value,role:"tab","aria-selected":d.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:P,onKeydown:B,...k};return We(w(u,R,D()),[[Ke,L.value]])}return{renderTab:Q,$tabs:a}}var zt=ee({name:"QTab",props:At,emits:St,setup(e,{slots:o,emit:l}){const{renderTab:s}=Rt(e,o,l);return()=>s("div")}});function It(e,o,l){const s=l===!0?["left","right"]:["top","bottom"];return`absolute-${o===!0?s[0]:s[1]}${e?` text-${e}`:""}`}const Lt=["left","center","right","justify"];var Ut=ee({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>Lt.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:o,emit:l}){const{proxy:s}=Z(),{$q:a}=s,{registerTick:t}=ue(),{registerTick:i}=ue(),{registerTick:p}=ue(),{registerTimeout:A,removeTimeout:L}=Te(),{registerTimeout:d,removeTimeout:M}=Te(),b=x(null),y=x(null),P=x(e.modelValue),B=x(!1),D=x(!0),H=x(!1),Q=x(!1),u=[],k=x(0),R=x(!1);let _=null,q=null,$;const E=g(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:It(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),ne=g(()=>{const n=k.value,r=P.value;for(let c=0;c<n;c++)if(u[c].name.value===r)return!0;return!1}),ae=g(()=>`q-tabs__content--align-${B.value===!0?"left":Q.value===!0?"justify":e.align}`),oe=g(()=>`q-tabs row no-wrap items-center q-tabs--${B.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${e.outsideArrows===!0?"outside":"inside"} q-tabs--mobile-with${e.mobileArrows===!0?"":"out"}-arrows`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),v=g(()=>"q-tabs__content scroll--mobile row no-wrap items-center self-stretch hide-scrollbar relative-position "+ae.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")),h=g(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),I=g(()=>e.vertical!==!0&&a.lang.rtl===!0),V=g(()=>Ct===!1&&I.value===!0);z(I,W),z(()=>e.modelValue,n=>{re({name:n,setCurrent:!0,skipEmit:!0})}),z(()=>e.outsideArrows,X);function re({name:n,setCurrent:r,skipEmit:c}){P.value!==n&&(c!==!0&&e["onUpdate:modelValue"]!==void 0&&l("update:modelValue",n),(r===!0||e["onUpdate:modelValue"]===void 0)&&(Be(P.value,n),P.value=n))}function X(){t(()=>{ve({width:b.value.offsetWidth,height:b.value.offsetHeight})})}function ve(n){if(h.value===void 0||y.value===null)return;const r=n[h.value.container],c=Math.min(y.value[h.value.scroll],Array.prototype.reduce.call(y.value.children,(T,m)=>T+(m[h.value.content]||0),0)),C=r>0&&c>r;B.value=C,C===!0&&i(W),Q.value=r<parseInt(e.breakpoint,10)}function Be(n,r){const c=n!=null&&n!==""?u.find(T=>T.name.value===n):null,C=r!=null&&r!==""?u.find(T=>T.name.value===r):null;if(c&&C){const T=c.tabIndicatorRef.value,m=C.tabIndicatorRef.value;_!==null&&(clearTimeout(_),_=null),T.style.transition="none",T.style.transform="none",m.style.transition="none",m.style.transform="none";const f=T.getBoundingClientRect(),S=m.getBoundingClientRect();m.style.transform=e.vertical===!0?`translate3d(0,${f.top-S.top}px,0) scale3d(1,${S.height?f.height/S.height:1},1)`:`translate3d(${f.left-S.left}px,0,0) scale3d(${S.width?f.width/S.width:1},1,1)`,p(()=>{_=setTimeout(()=>{_=null,m.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",m.style.transform="none"},70)})}C&&B.value===!0&&j(C.rootRef.value)}function j(n){const{left:r,width:c,top:C,height:T}=y.value.getBoundingClientRect(),m=n.getBoundingClientRect();let f=e.vertical===!0?m.top-C:m.left-r;if(f<0){y.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(f),W();return}f+=e.vertical===!0?m.height-T:m.width-c,f>0&&(y.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(f),W())}function W(){const n=y.value;if(n===null)return;const r=n.getBoundingClientRect(),c=e.vertical===!0?n.scrollTop:Math.abs(n.scrollLeft);I.value===!0?(D.value=Math.ceil(c+r.width)<n.scrollWidth-1,H.value=c>0):(D.value=c>0,H.value=e.vertical===!0?Math.ceil(c+r.height)<n.scrollHeight:Math.ceil(c+r.width)<n.scrollWidth)}function fe(n){q!==null&&clearInterval(q),q=setInterval(()=>{De(n)===!0&&F()},5)}function me(){fe(V.value===!0?Number.MAX_SAFE_INTEGER:0)}function he(){fe(V.value===!0?0:Number.MAX_SAFE_INTEGER)}function F(){q!==null&&(clearInterval(q),q=null)}function $e(n,r){const c=Array.prototype.filter.call(y.value.children,S=>S===r||S.matches&&S.matches(".q-tab.q-focusable")===!0),C=c.length;if(C===0)return;if(n===36)return j(c[0]),c[0].focus(),!0;if(n===35)return j(c[C-1]),c[C-1].focus(),!0;const T=n===(e.vertical===!0?38:37),m=n===(e.vertical===!0?40:39),f=T===!0?-1:m===!0?1:void 0;if(f!==void 0){const S=I.value===!0?-1:1,N=c.indexOf(r)+f*S;return N>=0&&N<C&&(j(c[N]),c[N].focus({preventScroll:!0})),!0}}const Me=g(()=>V.value===!0?{get:n=>Math.abs(n.scrollLeft),set:(n,r)=>{n.scrollLeft=-r}}:e.vertical===!0?{get:n=>n.scrollTop,set:(n,r)=>{n.scrollTop=r}}:{get:n=>n.scrollLeft,set:(n,r)=>{n.scrollLeft=r}});function De(n){const r=y.value,{get:c,set:C}=Me.value;let T=!1,m=c(r);const f=n<m?-1:1;return m+=f*5,m<0?(T=!0,m=0):(f===-1&&m<=n||f===1&&m>=n)&&(T=!0,m=n),C(r,m),W(),T}function be(n,r){for(const c in n)if(n[c]!==r[c])return!1;return!0}function Ee(){let n=null,r={matchedLen:0,queryDiff:9999,hrefLen:0};const c=u.filter(f=>f.routeData!==void 0&&f.routeData.hasRouterLink.value===!0),{hash:C,query:T}=s.$route,m=Object.keys(T).length;for(const f of c){const S=f.routeData.exact.value===!0;if(f.routeData[S===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:N,query:le,matched:Oe,href:Qe}=f.routeData.resolvedLink.value,ie=Object.keys(le).length;if(S===!0){if(N!==C||ie!==m||be(T,le)===!1)continue;n=f.name.value;break}if(N!==""&&N!==C||ie!==0&&be(le,T)===!1)continue;const O={matchedLen:Oe.length,queryDiff:m-ie,hrefLen:Qe.length-N.length};if(O.matchedLen>r.matchedLen){n=f.name.value,r=O;continue}else if(O.matchedLen!==r.matchedLen)continue;if(O.queryDiff<r.queryDiff)n=f.name.value,r=O;else if(O.queryDiff!==r.queryDiff)continue;O.hrefLen>r.hrefLen&&(n=f.name.value,r=O)}n===null&&u.some(f=>f.routeData===void 0&&f.name.value===P.value)===!0||re({name:n,setCurrent:!0})}function He(n){if(L(),R.value!==!0&&b.value!==null&&n.target&&typeof n.target.closest=="function"){const r=n.target.closest(".q-tab");r&&b.value.contains(r)===!0&&(R.value=!0,B.value===!0&&j(r))}}function Ne(){A(()=>{R.value=!1},30)}function G(){pe.avoidRouteWatcher===!1?d(Ee):M()}function ge(){if($===void 0){const n=z(()=>s.$route.fullPath,G);$=()=>{n(),$=void 0}}}function Ve(n){u.push(n),k.value++,X(),n.routeData===void 0||s.$route===void 0?d(()=>{if(B.value===!0){const r=P.value,c=r!=null&&r!==""?u.find(C=>C.name.value===r):null;c&&j(c.rootRef.value)}}):(ge(),n.routeData.hasRouterLink.value===!0&&G())}function Fe(n){u.splice(u.indexOf(n),1),k.value--,X(),$!==void 0&&n.routeData!==void 0&&(u.every(r=>r.routeData===void 0)===!0&&$(),G())}const pe={currentModel:P,tabProps:E,hasFocus:R,hasActiveTab:ne,registerTab:Ve,unregisterTab:Fe,verifyRouteModel:G,updateModel:re,onKbdNavigate:$e,avoidRouteWatcher:!1};Je(Re,pe);function ye(){_!==null&&clearTimeout(_),F(),$!==void 0&&$()}let Ce;return Ie(ye),Ze(()=>{Ce=$!==void 0,ye()}),et(()=>{Ce===!0&&ge(),X()}),()=>w("div",{ref:b,class:oe.value,role:"tablist",onFocusin:He,onFocusout:Ne},[w(yt,{onResize:ve}),w("div",{ref:y,class:v.value,onScroll:W},te(o.default)),w(J,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+(D.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||a.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:me,onTouchstartPassive:me,onMouseupPassive:F,onMouseleavePassive:F,onTouchendPassive:F}),w(J,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(H.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||a.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:he,onTouchstartPassive:he,onMouseupPassive:F,onMouseleavePassive:F,onTouchendPassive:F})])}});function Bt(e){const o=[.06,6,50];return typeof e=="string"&&e.length&&e.split(":").forEach((l,s)=>{const a=parseFloat(l);a&&(o[s]=a)}),o}var $t=tt({name:"touch-swipe",beforeMount(e,{value:o,arg:l,modifiers:s}){if(s.mouse!==!0&&K.has.touch!==!0)return;const a=s.mouseCapture===!0?"Capture":"",t={handler:o,sensitivity:Bt(l),direction:xe(s),noop:nt,mouseStart(i){Se(i,t)&&at(i)&&(Y(t,"temp",[[document,"mousemove","move",`notPassive${a}`],[document,"mouseup","end","notPassiveCapture"]]),t.start(i,!0))},touchStart(i){if(Se(i,t)){const p=i.target;Y(t,"temp",[[p,"touchmove","move","notPassiveCapture"],[p,"touchcancel","end","notPassiveCapture"],[p,"touchend","end","notPassiveCapture"]]),t.start(i)}},start(i,p){K.is.firefox===!0&&ce(e,!0);const A=we(i);t.event={x:A.left,y:A.top,time:Date.now(),mouse:p===!0,dir:!1}},move(i){if(t.event===void 0)return;if(t.event.dir!==!1){U(i);return}const p=Date.now()-t.event.time;if(p===0)return;const A=we(i),L=A.left-t.event.x,d=Math.abs(L),M=A.top-t.event.y,b=Math.abs(M);if(t.event.mouse!==!0){if(d<t.sensitivity[1]&&b<t.sensitivity[1]){t.end(i);return}}else if(window.getSelection().toString()!==""){t.end(i);return}else if(d<t.sensitivity[2]&&b<t.sensitivity[2])return;const y=d/p,P=b/p;t.direction.vertical===!0&&d<b&&d<100&&P>t.sensitivity[0]&&(t.event.dir=M<0?"up":"down"),t.direction.horizontal===!0&&d>b&&b<100&&y>t.sensitivity[0]&&(t.event.dir=L<0?"left":"right"),t.direction.up===!0&&d<b&&M<0&&d<100&&P>t.sensitivity[0]&&(t.event.dir="up"),t.direction.down===!0&&d<b&&M>0&&d<100&&P>t.sensitivity[0]&&(t.event.dir="down"),t.direction.left===!0&&d>b&&L<0&&b<100&&y>t.sensitivity[0]&&(t.event.dir="left"),t.direction.right===!0&&d>b&&L>0&&b<100&&y>t.sensitivity[0]&&(t.event.dir="right"),t.event.dir!==!1?(U(i),t.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Tt(),t.styleCleanup=B=>{t.styleCleanup=void 0,document.body.classList.remove("non-selectable");const D=()=>{document.body.classList.remove("no-pointer-events--children")};B===!0?setTimeout(D,50):D()}),t.handler({evt:i,touch:t.event.mouse!==!0,mouse:t.event.mouse,direction:t.event.dir,duration:p,distance:{x:d,y:b}})):t.end(i)},end(i){t.event!==void 0&&(de(t,"temp"),K.is.firefox===!0&&ce(e,!1),t.styleCleanup!==void 0&&t.styleCleanup(!0),i!==void 0&&t.event.dir!==!1&&U(i),t.event=void 0)}};if(e.__qtouchswipe=t,s.mouse===!0){const i=s.mouseCapture===!0||s.mousecapture===!0?"Capture":"";Y(t,"main",[[e,"mousedown","mouseStart",`passive${i}`]])}K.has.touch===!0&&Y(t,"main",[[e,"touchstart","touchStart",`passive${s.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,o){const l=e.__qtouchswipe;l!==void 0&&(o.oldValue!==o.value&&(typeof o.value!="function"&&l.end(),l.handler=o.value),l.direction=xe(o.modifiers))},beforeUnmount(e){const o=e.__qtouchswipe;o!==void 0&&(de(o,"main"),de(o,"temp"),K.is.firefox===!0&&ce(e,!1),o.styleCleanup!==void 0&&o.styleCleanup(),delete e.__qtouchswipe)}});function Mt(){let e=Object.create(null);return{getCache:(o,l)=>e[o]===void 0?e[o]=typeof l=="function"?l():l:e[o],setCache(o,l){e[o]=l},hasCache(o){return Object.hasOwnProperty.call(e,o)},clearCache(o){o!==void 0?delete e[o]:e=Object.create(null)}}}const Dt={name:{required:!0},disable:Boolean},Ae={setup(e,{slots:o}){return()=>w("div",{class:"q-panel scroll",role:"tabpanel"},te(o.default))}},Et={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},Ht=["update:modelValue","beforeTransition","transition"];function Nt(){const{props:e,emit:o,proxy:l}=Z(),{getCache:s}=Mt();let a,t;const i=x(null),p=x(null);function A(v){const h=e.vertical===!0?"up":"left";q((l.$q.lang.rtl===!0?-1:1)*(v.direction===h?1:-1))}const L=g(()=>[[$t,A,void 0,{horizontal:e.vertical!==!0,vertical:e.vertical,mouse:!0}]]),d=g(()=>e.transitionPrev||`slide-${e.vertical===!0?"down":"right"}`),M=g(()=>e.transitionNext||`slide-${e.vertical===!0?"up":"left"}`),b=g(()=>`--q-transition-duration: ${e.transitionDuration}ms`),y=g(()=>typeof e.modelValue=="string"||typeof e.modelValue=="number"?e.modelValue:String(e.modelValue)),P=g(()=>({include:e.keepAliveInclude,exclude:e.keepAliveExclude,max:e.keepAliveMax})),B=g(()=>e.keepAliveInclude!==void 0||e.keepAliveExclude!==void 0);z(()=>e.modelValue,(v,h)=>{const I=u(v)===!0?k(v):-1;t!==!0&&_(I===-1?0:I<k(h)?-1:1),i.value!==I&&(i.value=I,o("beforeTransition",v,h),ot(()=>{o("transition",v,h)}))});function D(){q(1)}function H(){q(-1)}function Q(v){o("update:modelValue",v)}function u(v){return v!=null&&v!==""}function k(v){return a.findIndex(h=>h.props.name===v&&h.props.disable!==""&&h.props.disable!==!0)}function R(){return a.filter(v=>v.props.disable!==""&&v.props.disable!==!0)}function _(v){const h=v!==0&&e.animated===!0&&i.value!==-1?"q-transition--"+(v===-1?d.value:M.value):null;p.value!==h&&(p.value=h)}function q(v,h=i.value){let I=h+v;for(;I!==-1&&I<a.length;){const V=a[I];if(V!==void 0&&V.props.disable!==""&&V.props.disable!==!0){_(v),t=!0,o("update:modelValue",V.props.name),setTimeout(()=>{t=!1});return}I+=v}e.infinite===!0&&a.length!==0&&h!==-1&&h!==a.length&&q(v,v===-1?a.length:-1)}function $(){const v=k(e.modelValue);return i.value!==v&&(i.value=v),!0}function E(){const v=u(e.modelValue)===!0&&$()&&a[i.value];return e.keepAlive===!0?[w(it,P.value,[w(B.value===!0?s(y.value,()=>({...Ae,name:y.value})):Ae,{key:y.value,style:b.value},()=>v)])]:[w("div",{class:"q-panel scroll",style:b.value,key:y.value,role:"tabpanel"},[v])]}function ne(){if(a.length!==0)return e.animated===!0?[w(rt,{name:p.value},E)]:E()}function ae(v){return a=lt(te(v.default,[])).filter(h=>h.props!==null&&h.props.slot===void 0&&u(h.props.name)===!0),a.length}function oe(){return a}return Object.assign(l,{next:D,previous:H,goTo:Q}),{panelIndex:i,panelDirectives:L,updatePanelsList:ae,updatePanelIndex:$,getPanelContent:ne,getEnabledPanels:R,getPanels:oe,isValidPanelName:u,keepAliveProps:P,needsUniqueKeepAliveWrapper:B,goToPanelByOffset:q,goToPanel:Q,nextPanel:D,previousPanel:H}}var Xt=ee({name:"QTabPanel",props:Dt,setup(e,{slots:o}){return()=>w("div",{class:"q-tab-panel",role:"tabpanel"},te(o.default))}}),Gt=ee({name:"QTabPanels",props:{...Et,...st},emits:Ht,setup(e,{slots:o}){const l=Z(),s=ut(e,l.proxy.$q),{updatePanelsList:a,getPanelContent:t,panelDirectives:i}=Nt(),p=g(()=>"q-tab-panels q-panel-parent"+(s.value===!0?" q-tab-panels--dark q-dark":""));return()=>(a(o),ct("div",{class:p.value},t(),"pan",e.swipeable,()=>i.value))}});function Yt({url:e="",resolved:o=l=>{}}){const l=x(!1),s=x({});return{loading:l,record:s,fetch(a){l.value=!0,dt.get(`${e}/${a}`).then(({data:t})=>{s.value=t,o(t)}).catch(t=>{vt().errorNotify("There is error fetching record."),console.error(t)}).finally(()=>{l.value=!1})}}}const Jt={__name:"NoteIndexTemplate",props:{id:Number,type:String},setup(e){const o=e,l={title:"Note",url:"custom-apps/notes",columns:[{name:"id",align:"left",label:"Id",field:"id",sortable:!0},{name:"name",align:"left",label:"Name",field:"name",sortable:!0},{name:"note",align:"left",label:"Note",field:"note",sortable:!1,format:d=>d&&d.length>10?d.substring(0,10)+"...":d},{name:"created_at",align:"left",label:"Created at",field:"created_at",sortable:!1}],formInitialValues:{name:"",label:"",note:""},template:()=>gt(()=>pt(()=>import("./NoteFormTemplate.5345c17c.js"),["assets/NoteFormTemplate.5345c17c.js","assets/index.74d7f585.js","assets/index.9534a8ef.css","assets/format.08b9b864.js","assets/QTooltip.fe0c0bf3.js","assets/IndexManagement.70bc027e.js","assets/QList.850a9c5c.js","assets/QSelect.6e6a07ef.js","assets/QForm.b6b25a10.js"]))},s=Pt(),a=qt({title:l.title,url:l.url});a.hooksCycle.params.resolvedParams=d=>(d.params["filter[resource_id]"]=o.id,d.params["filter[resource_type]"]=o.type,d);const t=kt({title:l.title,url:l.url,initialValues:l.formInitialValues});t.hooksCycle.afterResolve=d=>(d.resource_id=o.id,d.resource_type=o.type,d),l.formHandleHooks=s,l.formHooks=t,l.indexHooks=a;const{form:i}=s,p=g(()=>l.template()),{resetFetch:A,refresh:L}=a;return Le(()=>{L()}),(d,M)=>(_e(),ft("div",null,[Pe(wt,ke(l,{bodyClass:"q-pa-sm"}),null,16),Pe(_t,ke({formStyle:"width: 600px; max-width:90vw;",ref_key:"form",ref:i},l,{onOnCreate:qe(A),onOnUpdate:qe(L)}),{default:mt(()=>[(_e(),ht(bt(p.value),{formHooks:l.formHooks},null,8,["formHooks"]))]),_:1},16,["onOnCreate","onOnUpdate"])]))}};export{Yt as H,Ut as Q,Jt as _,zt as a,Gt as b,Xt as c};
