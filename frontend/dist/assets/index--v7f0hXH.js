const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HomePage-CdBewYXJ.js","assets/vendor-motion-B_MdyDUp.js","assets/vendor-react-CKki7pKv.js","assets/FlatCard-ng6i3_EI.js","assets/star-B1eP8oyp.js","assets/map-pin-pboqPo2r.js","assets/HomeCardShimmer-Cvn2EsJF.js","assets/vendor-redux-CAW_zdke.js","assets/search-Dw7fM6zm.js","assets/trending-up-E8MeZK7G.js","assets/vendor-three-Cxv87Sxl.js","assets/vendor-charts-CWKdcGtu.js","assets/vendor-mui-Ca8RGJKa.js","assets/vendor-apollo-M6ySC5xf.js","assets/FlatDetailPage-Dh1xYdxS.js","assets/users-MKIfIEoa.js","assets/message-square-Ci-benO8.js","assets/wind-CJZejdFb.js","assets/LoginPage-i8Arj4eD.js","assets/circle-alert-CPyxL5d_.js","assets/mail-h1O11U11.js","assets/lock-BYBLc-0X.js","assets/RegisterPage-CETq61yw.js","assets/building-Bi_9PsKk.js","assets/LogoutPage-BAReDr7J.js","assets/arrow-right-rKLMTcNG.js","assets/AddFlatPage-Dm1Wv5Cd.js","assets/square-check-big-C2N_OesG.js","assets/file-text-DNjmQcHO.js","assets/SearchResultsPage-BrRnETdj.js","assets/sliders-horizontal-DbQKK0Ye.js","assets/BookingPage-BKbxuzE8.js","assets/trash-2-BFTUGgh_.js","assets/calendar-KeRIdtyz.js","assets/credit-card-3HpARdKD.js","assets/MyListings-Bcly19FF.js","assets/plus-nU5buUyH.js","assets/Checkout-DNCaeYZ7.js","assets/arrow-left-B4FbIeX5.js","assets/UpdatePage-K_kZ5ugb.js","assets/Category-CryXSI9Y.js","assets/Success-Xb-rAgZ0.js","assets/SellerDashboard-CnCN2rkt.js","assets/SellerProfilePage-D7QS7Fti.js","assets/SellerAnalytics-CgSKpgYh.js","assets/SellerLayout-CaFbp9FK.js"])))=>i.map(i=>d[i]);
var U=Object.defineProperty,H=Object.defineProperties;var W=Object.getOwnPropertyDescriptors;var $=Object.getOwnPropertySymbols;var A=Object.prototype.hasOwnProperty,T=Object.prototype.propertyIsEnumerable;var I=(e,a,s)=>a in e?U(e,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[a]=s,p=(e,a)=>{for(var s in a||(a={}))A.call(a,s)&&I(e,s,a[s]);if($)for(var s of $(a))T.call(a,s)&&I(e,s,a[s]);return e},S=(e,a)=>H(e,W(a));var j=(e,a)=>{var s={};for(var i in e)A.call(e,i)&&a.indexOf(i)<0&&(s[i]=e[i]);if(e!=null&&$)for(var i of $(e))a.indexOf(i)<0&&T.call(e,i)&&(s[i]=e[i]);return s};var u=(e,a,s)=>I(e,typeof a!="symbol"?a+"":a,s);var N=(e,a,s)=>new Promise((i,n)=>{var o=l=>{try{c(s.next(l))}catch(x){n(x)}},d=l=>{try{c(s.throw(l))}catch(x){n(x)}},c=l=>l.done?i(l.value):Promise.resolve(l.value).then(o,d);c((s=s.apply(e,a)).next())});import{j as t,m as _,A as R}from"./vendor-motion-B_MdyDUp.js";import{u as C,r,c as z,N as D,L as K,B as Q,d as Y,e as f,a as Z}from"./vendor-react-CKki7pKv.js";import{_ as y,c as X}from"./vendor-three-Cxv87Sxl.js";import{A as J,_ as ee,O as te,c as ae,a as se,I as ie,g as h,b as ne}from"./vendor-apollo-M6ySC5xf.js";import{j as G,a as oe,h as re,P as le}from"./vendor-redux-CAW_zdke.js";import"./vendor-charts-CWKdcGtu.js";import"./vendor-mui-Ca8RGJKa.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function s(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(n){if(n.ep)return;n.ep=!0;const o=s(n);fetch(n.href,o)}})();const ce=(...e)=>{typeof window!="undefined"&&(typeof window.gtag=="undefined"&&(window.dataLayer=window.dataLayer||[],window.gtag=function(){window.dataLayer.push(arguments)}),window.gtag(...e))},de=/^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;function ue(e){return e.toString().trim().replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g,(a,s,i)=>s>0&&s+a.length!==i.length&&a.search(de)>-1&&i.charAt(s-2)!==":"&&(i.charAt(s+a.length)!=="-"||i.charAt(s-1)==="-")&&i.charAt(s-1).search(/[^\s-]/)<0?a.toLowerCase():a.substr(1).search(/[A-Z]|\../)>-1?a:a.charAt(0).toUpperCase()+a.substr(1))}function me(e){return typeof e=="string"&&e.indexOf("@")!==-1}const he="REDACTED (Potential Email Address)";function ge(e){return me(e)?(console.warn("This arg looks like an email address, redacting."),he):e}function E(e="",a=!0,s=!0){let i=e||"";return a&&(i=ue(e)),s&&(i=ge(i)),i}var pe=class{constructor(){u(this,"isInitialized");u(this,"_testMode");u(this,"_currentMeasurementId");u(this,"_hasLoadedGA");u(this,"_isQueuing");u(this,"_queueGtag");u(this,"reset",()=>{this.isInitialized=!1,this._testMode=!1,this._currentMeasurementId="",this._hasLoadedGA=!1,this._isQueuing=!1,this._queueGtag=[]});u(this,"_gtag",(...e)=>{this._testMode?this._queueGtag.push(e):this._isQueuing?this._queueGtag.push(e):ce(...e)});u(this,"_loadGA",(e,a,s="https://www.googletagmanager.com/gtag/js")=>{if(!(typeof window=="undefined"||typeof document=="undefined")&&!this._hasLoadedGA){const i=document.createElement("script");i.async=!0,i.src=`${s}?id=${e}`,a&&i.setAttribute("nonce",a),document.body.appendChild(i),window.dataLayer=window.dataLayer||[],window.gtag=function(){window.dataLayer.push(arguments)},this._hasLoadedGA=!0}});u(this,"_toGtagOptions",e=>{if(!e)return;const a={cookieUpdate:"cookie_update",cookieExpires:"cookie_expires",cookieDomain:"cookie_domain",cookieFlags:"cookie_flags",userId:"user_id",clientId:"client_id",anonymizeIp:"anonymize_ip",contentGroup1:"content_group1",contentGroup2:"content_group2",contentGroup3:"content_group3",contentGroup4:"content_group4",contentGroup5:"content_group5",allowAdFeatures:"allow_google_signals",allowAdPersonalizationSignals:"allow_ad_personalization_signals",nonInteraction:"non_interaction",page:"page_path",hitCallback:"event_callback"};return Object.entries(e).reduce((s,[i,n])=>(a[i]?s[a[i]]=n:s[i]=n,s),{})});u(this,"initialize",(e,a={})=>{if(!e)throw new Error("Require GA_MEASUREMENT_ID");const s=typeof e=="string"?[{trackingId:e}]:e;this._currentMeasurementId=s[0].trackingId;const{gaOptions:i,gtagOptions:n,nonce:o,testMode:d=!1,gtagUrl:c}=a;if(this._testMode=d,d||this._loadGA(this._currentMeasurementId,o,c),this.isInitialized||(this._gtag("js",new Date),s.forEach(l=>{const x=p(p(p({},this._toGtagOptions(p(p({},i),l.gaOptions))),n),l.gtagOptions);Object.keys(x).length?this._gtag("config",l.trackingId,x):this._gtag("config",l.trackingId)})),this.isInitialized=!0,!d){const l=[...this._queueGtag];for(this._queueGtag=[],this._isQueuing=!1;l.length;){const x=l.shift();this._gtag(...x),x[0]==="get"&&(this._isQueuing=!0)}}});u(this,"set",e=>{if(!e){console.warn("`fieldsObject` is required in .set()");return}if(typeof e!="object"){console.warn("Expected `fieldsObject` arg to be an Object");return}Object.keys(e).length===0&&console.warn("empty `fieldsObject` given to .set()"),this._gaCommand("set",e)});u(this,"_gaCommandSendEvent",(e,a,s,i,n)=>{this._gtag("event",a,p(p({event_category:e,event_label:s,value:i},n&&{non_interaction:n.nonInteraction}),this._toGtagOptions(n)))});u(this,"_gaCommandSendEventParameters",(...e)=>{if(typeof e[0]=="string")this._gaCommandSendEvent(...e.slice(1));else{const a=e[0],{eventCategory:s,eventAction:i,eventLabel:n,eventValue:o,hitType:d}=a,c=j(a,["eventCategory","eventAction","eventLabel","eventValue","hitType"]);this._gaCommandSendEvent(s,i,n,o,c)}});u(this,"_gaCommandSendTiming",(e,a,s,i)=>{this._gtag("event","timing_complete",{name:a,value:s,event_category:e,event_label:i})});u(this,"_gaCommandSendPageview",(e,a)=>{if(a&&Object.keys(a).length){const s=this._toGtagOptions(a)||{},{title:i,location:n}=s,o=j(s,["title","location"]);this._gtag("event","page_view",p(p(p(p({},e&&{page_path:e}),i&&{page_title:i}),n&&{page_location:n}),o))}else e?this._gtag("event","page_view",{page_path:e}):this._gtag("event","page_view")});u(this,"_gaCommandSendPageviewParameters",(...e)=>{if(typeof e[0]=="string")this._gaCommandSendPageview(...e.slice(1));else{const a=e[0],{page:s,hitType:i}=a,n=j(a,["page","hitType"]);this._gaCommandSendPageview(s,n)}});u(this,"_gaCommandSend",(...e)=>{const a=typeof e[0]=="string"?e[0]:e[0].hitType;switch(a){case"event":this._gaCommandSendEventParameters(...e);break;case"pageview":this._gaCommandSendPageviewParameters(...e);break;case"timing":this._gaCommandSendTiming(...e.slice(1));break;case"screenview":case"transaction":case"item":case"social":case"exception":console.warn(`Unsupported send command: ${a}`);break;default:console.warn(`Send command doesn't exist: ${a}`)}});u(this,"_gaCommandSet",(...e)=>{typeof e[0]=="string"&&(e[0]={[e[0]]:e[1]}),this._gtag("set",this._toGtagOptions(e[0]))});u(this,"_gaCommand",(e,...a)=>{switch(e){case"send":this._gaCommandSend(...a);break;case"set":this._gaCommandSet(...a);break;default:console.warn(`Command doesn't exist: ${e}`)}});u(this,"ga",(...e)=>{if(typeof e[0]=="string")this._gaCommand(...e);else{const[a]=e;this._gtag("get",this._currentMeasurementId,"client_id",s=>{this._isQueuing=!1;const i=this._queueGtag;for(a({get:n=>n==="clientId"?s:n==="trackingId"?this._currentMeasurementId:n==="apiVersion"?"1":void 0});i.length;){const n=i.shift();this._gtag(...n)}}),this._isQueuing=!0}return this.ga});u(this,"event",(e,a)=>{if(typeof e=="string")this._gtag("event",e,this._toGtagOptions(a));else{const{action:s,category:i,label:n,value:o,nonInteraction:d,transport:c}=e;if(!i||!s){console.warn("args.category AND args.action are required in event()");return}const l={hitType:"event",eventCategory:E(i),eventAction:E(s)};n&&(l.eventLabel=E(n)),typeof o!="undefined"&&(typeof o!="number"?console.warn("Expected `args.value` arg to be a Number."):l.eventValue=o),typeof d!="undefined"&&(typeof d!="boolean"?console.warn("`args.nonInteraction` must be a boolean."):l.nonInteraction=d),typeof c!="undefined"&&(typeof c!="string"?console.warn("`args.transport` must be a string."):(["beacon","xhr","image"].indexOf(c)===-1&&console.warn("`args.transport` must be either one of these values: `beacon`, `xhr` or `image`"),l.transport=c)),this._gaCommand("send",l)}});u(this,"send",e=>{this._gaCommand("send",e)});this.reset()}gtag(...e){this._gtag(...e)}},fe=new pe,B=fe;const _e=({children:e})=>{const{pathname:a}=C();return r.useLayoutEffect(()=>{document.documentElement.scrollTo(0,0)},[a]),e};/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),xe=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,s,i)=>i?i.toUpperCase():s.toLowerCase()),O=e=>{const a=xe(e);return a.charAt(0).toUpperCase()+a.slice(1)},M=(...e)=>e.filter((a,s,i)=>!!a&&a.trim()!==""&&i.indexOf(a)===s).join(" ").trim(),be=e=>{for(const a in e)if(a.startsWith("aria-")||a==="role"||a==="title")return!0};/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ve={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=r.forwardRef((x,l)=>{var k=x,{color:e="currentColor",size:a=24,strokeWidth:s=2,absoluteStrokeWidth:i,className:n="",children:o,iconNode:d}=k,c=j(k,["color","size","strokeWidth","absoluteStrokeWidth","className","children","iconNode"]);return r.createElement("svg",p(p(S(p({ref:l},ve),{width:a,height:a,stroke:e,strokeWidth:i?Number(s)*24/Number(a):s,className:M("lucide",n)}),!o&&!be(c)&&{"aria-hidden":"true"}),c),[...d.map(([g,w])=>r.createElement(g,w)),...Array.isArray(o)?o:[o]])});/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(e,a)=>{const s=r.forwardRef((d,o)=>{var c=d,{className:i}=c,n=j(c,["className"]);return r.createElement(we,p({ref:o,iconNode:a,className:M(`lucide-${ye(O(e))}`,`lucide-${e}`,i)},n))});return s.displayName=O(e),s};/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],ke=v("book-open",je);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $e=[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Ie=v("compass",$e);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],Ne=v("house",Se);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],Le=v("layout-dashboard",Ee);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pe=[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]],F=v("loader-circle",Pe);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]],Ae=v("log-out",Ce);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Te=[["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 18h16",key:"19g7jn"}],["path",{d:"M4 6h16",key:"1o0s65"}]],De=v("menu",Te);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Fe=v("triangle-alert",Oe);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qe=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],Re=v("user",qe);/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ze=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Ge=v("x",ze);function q(){const e=z(),a=()=>{localStorage.removeItem("token"),localStorage.removeItem("role"),localStorage.removeItem("userId"),e("/logout")};return t.jsxs(_.button,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:a,className:"flex items-center text-on-surface-variant hover:text-error transition-colors duration-300 font-body text-xs font-bold uppercase tracking-wider gap-1.5",children:[t.jsx(Ae,{size:14,className:"text-glow-purple"}),t.jsx("span",{children:"Logout"})]})}const Be=()=>{const[e,a]=r.useState(!1),[s,i]=r.useState(!1),n=localStorage.getItem("token"),o=localStorage.getItem("role")==="seller",d=localStorage.getItem("role")==="customer",c=z(),l=()=>{c("/")},x=g=>w=>{w.type==="keydown"&&(w.key==="Tab"||w.key==="Shift")||a(g)};r.useEffect(()=>{const g=()=>{i(window.scrollY>20)};return window.addEventListener("scroll",g,{passive:!0}),()=>window.removeEventListener("scroll",g)},[]);const k=r.useMemo(()=>[{name:"Destinations",path:"/category",icon:t.jsx(Ie,{size:16}),show:!o},{name:"Register",path:"/register",icon:t.jsx(Re,{size:16}),show:!n},{name:"Dashboard",path:"/seller/dashboard",icon:t.jsx(Le,{size:16}),show:o},{name:"My Bookings",path:"/bookings",icon:t.jsx(ke,{size:16}),show:d}],[n,o,d]);return t.jsxs(t.Fragment,{children:[t.jsx(_.nav,{initial:{y:-100,x:"-50%",opacity:0},animate:{y:0,x:"-50%",opacity:1},transition:{duration:.8,ease:[.16,1,.3,1]},className:`fixed top-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-300 border rounded-full ${s?"py-3 bg-surface/90 backdrop-blur-[25px] border-white/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)]":"py-5 bg-glass-white backdrop-blur-[15px] border-glass-border shadow-sm"}`,children:t.jsxs("div",{className:"flex justify-between items-center w-full px-6 md:px-8 h-10",children:[t.jsx(_.div,{whileHover:{scale:1.02},whileTap:{scale:.98},className:"flex items-center cursor-pointer gap-2",onClick:l,children:t.jsx("span",{className:"font-display text-xl font-bold tracking-widest text-on-background hover:text-primary transition-colors duration-300 text-glow",children:"FLATBASE"})}),t.jsx("div",{className:"hidden md:flex gap-8 items-center",children:k.filter(g=>g.show).map(g=>t.jsx(D,{to:g.path,className:({isActive:w})=>w?"text-primary font-bold border-b-2 border-primary pb-1 font-body text-xs tracking-wider uppercase transition-all":"text-on-surface-variant hover:text-on-background transition-colors duration-300 font-body text-xs tracking-wider uppercase",children:t.jsx("div",{className:"flex items-center gap-1.5",children:g.name})},g.path))}),t.jsxs("div",{className:"flex items-center gap-4",children:[n?t.jsx("div",{className:"hidden md:block",children:t.jsx(q,{})}):t.jsx("button",{onClick:()=>c("/login"),className:"hidden md:block bg-primary text-on-primary px-5 py-2 rounded-full font-body font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] hover:brightness-110 active:scale-95 transition-all duration-300",children:"Sign In"}),t.jsx("div",{className:"md:hidden",children:t.jsx(_.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:x(!0),className:"p-1.5 rounded-full text-primary hover:bg-glass-white border border-transparent hover:border-glass-border transition-all",children:t.jsx(De,{size:20})})})]})]})}),t.jsx("div",{className:"h-28"}),t.jsx(R,{children:e&&t.jsxs(_.div,{initial:{x:"100%"},animate:{x:0},exit:{x:"100%"},transition:{type:"tween",duration:.3},className:"fixed inset-y-0 right-0 z-50 w-64 bg-surface-container-low/95 backdrop-blur-[20px] border-l border-glass-border shadow-2xl flex flex-col",children:[t.jsxs("div",{className:"flex justify-between items-center p-6 border-b border-glass-border",children:[t.jsx("h2",{className:"text-lg font-bold font-display text-primary tracking-wider uppercase",children:"Menu"}),t.jsx(_.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:x(!1),className:"p-2 rounded-full text-primary hover:bg-glass-white border border-glass-border",children:t.jsx(Ge,{size:18})})]}),t.jsx("div",{className:"flex-1 overflow-y-auto py-6",children:t.jsxs("nav",{className:"flex flex-col space-y-2 px-6",children:[k.filter(g=>g.show).map(g=>t.jsxs(D,{to:g.path,onClick:x(!1),className:({isActive:w})=>`${w?"bg-primary/10 text-primary font-bold border border-primary/20":"text-on-surface-variant hover:bg-glass-white hover:text-white border border-transparent"} flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-body text-xs tracking-wider uppercase`,children:[t.jsx("span",{className:"mr-3",children:g.icon}),g.name]},g.path)),n?t.jsx("div",{onClick:x(!1),className:"pt-4 border-t border-glass-border mt-4",children:t.jsx(q,{})}):t.jsx("button",{onClick:()=>{c("/login"),a(!1)},className:"w-full mt-4 bg-primary text-on-primary py-3 rounded-full font-body font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all duration-300",children:"Sign In"})]})})]})}),e&&t.jsx(_.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"fixed inset-0 bg-background/60 backdrop-blur-sm z-40",onClick:x(!1)})]})},Me=r.memo(Be),b=({children:e})=>t.jsx(_.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:e}),Ve=({minimal:e=!1})=>e?t.jsx("div",{className:"flex justify-center items-center py-12",children:t.jsx(_.div,{animate:{rotate:360},transition:{duration:1,repeat:Number.POSITIVE_INFINITY,ease:"linear"},children:t.jsx(F,{size:32,className:"text-[#76ABAE]"})})}):t.jsxs("div",{className:"h-screen flex flex-col justify-center items-center",children:[t.jsx(_.div,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.5},className:"mb-6",children:t.jsx(_.div,{animate:{rotate:360},transition:{duration:1.5,repeat:Number.POSITIVE_INFINITY,ease:"linear"},children:t.jsx(F,{size:48,className:"text-[#76ABAE]"})})}),t.jsx(_.h1,{initial:{y:20,opacity:0},animate:{y:0,opacity:1},transition:{delay:.3,duration:.5},className:"text-3xl font-bold tracking-tight",children:"DISCOVER BOOK LIVE"})]});function Ue({name:e,css:a="",variant:s="primary",fullWidth:i=!1,onClick:n,type:o="button"}){const d="px-6 py-2.5 rounded-full font-body font-bold text-xs tracking-wider uppercase transition-all duration-300 active:scale-[0.98] select-none",c=s==="primary"?"bg-primary text-on-primary hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]":"motionsite-card border-glass-border text-on-surface hover:text-on-primary hover:bg-primary hover:border-primary",l=i?"w-full":"";return t.jsx("button",{type:o,onClick:n,className:`${d} ${c} ${l} ${a}`,children:e})}const He=()=>t.jsxs("div",{className:"flex flex-col items-center justify-center min-h-[70vh] px-4 text-center",children:[t.jsx(_.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"mb-8",children:t.jsx("div",{className:"bg-red-100 p-6 rounded-full inline-block",children:t.jsx(Fe,{size:60,className:"text-red-500"})})}),t.jsx(_.h1,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.2,duration:.5},className:"text-5xl md:text-7xl font-bold mb-4 text-gray-800",children:"404"}),t.jsx(_.h2,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.3,duration:.5},className:"text-2xl md:text-3xl font-semibold mb-4 text-gray-700",children:"Page Not Found"}),t.jsx(_.p,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.4,duration:.5},className:"text-gray-600 max-w-md mb-8",children:"The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."}),t.jsx(_.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.5,duration:.5},children:t.jsx(K,{to:"/",children:t.jsx(Ue,{name:t.jsxs("div",{className:"flex items-center",children:[t.jsx(Ne,{size:18,className:"mr-2"}),t.jsx("span",{children:"Back to Home"})]})})})})]}),We=r.memo(function(){const a=r.useMemo(()=>new Date().getFullYear(),[]);return t.jsxs("footer",{className:"site-footer mt-20",children:[t.jsx("div",{className:"footer-dots","aria-hidden":"true",children:t.jsx("div",{className:"footer-dots__line"})}),t.jsxs("div",{className:"site-footer__inner",children:[t.jsxs("div",{className:"site-footer__top",children:[t.jsx("h2",{className:"site-footer__heading",children:"Curated escapes for the modern collector."}),t.jsxs("nav",{className:"site-footer__nav","aria-label":"Footer navigation",children:[t.jsx("a",{href:"#company",className:"site-footer__link",children:"Company"}),t.jsx("a",{href:"#technology",className:"site-footer__link",children:"Technology"}),t.jsx("a",{href:"#solutions",className:"site-footer__link",children:"Solutions"}),t.jsx("a",{href:"#our-edge",className:"site-footer__link",children:"Our Edge"}),t.jsx("a",{href:"#investors",className:"site-footer__link",children:"Investors"})]}),t.jsxs("nav",{className:"site-footer__nav","aria-label":"Company links",children:[t.jsx("a",{href:"#our-team",className:"site-footer__link",children:"Our Team"}),t.jsx("a",{href:"#news",className:"site-footer__link",children:"News"}),t.jsx("a",{href:"#careers",className:"site-footer__link",children:"Careers"}),t.jsx("a",{href:"#contact",className:"site-footer__link",children:"Contact Us"})]}),t.jsxs("nav",{className:"site-footer__nav","aria-label":"Social links",children:[t.jsx("a",{href:"https://www.linkedin.com",target:"_blank",rel:"noreferrer",className:"site-footer__link",children:"LinkedIn"}),t.jsx("a",{href:"https://x.com",target:"_blank",rel:"noreferrer",className:"site-footer__link",children:"Follow Us on X"})]})]}),t.jsx("div",{className:"site-footer__brand-row",children:t.jsxs("a",{href:"/",className:"site-footer__brand","aria-label":"FlatBase home",children:[t.jsx("span",{className:"site-footer__mark","aria-hidden":"true"}),t.jsx("span",{className:"site-footer__wordmark",children:"FlatBase"})]})}),t.jsxs("div",{className:"site-footer__legal",children:[t.jsxs("span",{children:["© ",a," FlatBase. All rights reserved."]}),t.jsx("a",{href:"#privacy",children:"Privacy Policy"}),t.jsx("a",{href:"#terms",children:"Terms of Service"})]})]})]})}),Ke=r.lazy(()=>y(()=>import("./HomePage-CdBewYXJ.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13]))),Qe=r.lazy(()=>y(()=>import("./FlatDetailPage-Dh1xYdxS.js"),__vite__mapDeps([14,1,2,13,5,15,16,4,17,10,11,12,7]))),Ye=r.lazy(()=>y(()=>import("./LoginPage-i8Arj4eD.js"),__vite__mapDeps([18,1,2,19,20,21,10,11,12,7,13]))),Ze=r.lazy(()=>y(()=>import("./RegisterPage-CETq61yw.js"),__vite__mapDeps([22,1,2,19,20,21,15,23,10,11,12,7,13]))),Xe=r.lazy(()=>y(()=>import("./LogoutPage-BAReDr7J.js"),__vite__mapDeps([24,1,2,25,10,11,12,7,13]))),Je=r.lazy(()=>y(()=>import("./AddFlatPage-Dm1Wv5Cd.js"),__vite__mapDeps([26,1,2,27,5,15,28,17,10,11,12,7,13]))),et=r.lazy(()=>y(()=>import("./SearchResultsPage-BrRnETdj.js"),__vite__mapDeps([29,1,2,7,3,4,5,6,8,30,10,11,12,13]))),tt=r.lazy(()=>y(()=>import("./BookingPage-BKbxuzE8.js"),__vite__mapDeps([31,1,2,32,8,19,5,33,16,34,4,10,11,12,7,13]))),at=r.lazy(()=>y(()=>import("./MyListings-Bcly19FF.js"),__vite__mapDeps([35,1,2,32,8,19,5,15,36,10,11,12,7,13]))),st=r.lazy(()=>y(()=>import("./Checkout-DNCaeYZ7.js"),__vite__mapDeps([37,1,2,38,5,34,13,10,11,12,7]))),it=r.lazy(()=>y(()=>import("./UpdatePage-K_kZ5ugb.js"),__vite__mapDeps([39,1,2,38,19,27,5,15,28,17,10,11,12,7,13]))),nt=r.lazy(()=>y(()=>import("./Category-CryXSI9Y.js"),__vite__mapDeps([40,1,2,4,5,6,8,30,13,10,11,12,7]))),ot=r.lazy(()=>y(()=>import("./Success-Xb-rAgZ0.js"),__vite__mapDeps([41,1,2,25,10,11,12,7,13]))),rt=r.lazy(()=>y(()=>import("./SellerDashboard-CnCN2rkt.js"),__vite__mapDeps([42,1,2,23,33,4,10,11,12,7,13]))),lt=r.lazy(()=>y(()=>import("./SellerProfilePage-D7QS7Fti.js"),__vite__mapDeps([43,1,2,20,28,10,11,12,7,13]))),ct=r.lazy(()=>y(()=>import("./SellerAnalytics-CgSKpgYh.js"),__vite__mapDeps([44,1,2,19,9,33,11,12,7,10,13]))),dt=r.lazy(()=>y(()=>import("./SellerLayout-CaFbp9FK.js"),__vite__mapDeps([45,1,2,23,9,8,20,36,10,11,12,7,13]))),ut=()=>{const e=C();return r.useEffect(()=>{B.send({hitType:"pageview",page:e.pathname+e.search})},[e]),null},mt=({children:e})=>{const a=C(),s=r.useMemo(()=>a.pathname.startsWith("/seller")||a.pathname.startsWith("/mylistings")||a.pathname.startsWith("/add-flat")||a.pathname.startsWith("/updatePage"),[a.pathname]);return t.jsxs(t.Fragment,{children:[!s&&t.jsx(Me,{}),e,!s&&t.jsx(We,{})]})},ht=()=>(r.useEffect(()=>{B.initialize("G-34YS1ZRZTT")},[]),t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"fixed top-0 -z-10 h-full w-full bg-background overflow-hidden",children:[t.jsx("div",{className:"glowing-blob w-[500px] h-[500px] bg-primary/10 top-[-10%] right-[5%]"}),t.jsx("div",{className:"glowing-blob w-[600px] h-[600px] bg-secondary/5 top-[30%] left-[-10%]",style:{animationDelay:"-5s"}}),t.jsx("div",{className:"glowing-blob w-[400px] h-[400px] bg-accent/10 bottom-[10%] right-[10%]",style:{animationDelay:"-10s"}}),t.jsx("div",{className:"absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px]"})]}),t.jsx("div",{className:"min-h-screen w-full flex flex-col font-body bg-background text-on-background",children:t.jsxs(Q,{children:[t.jsx(ut,{}),t.jsx(_e,{children:t.jsx(r.Suspense,{fallback:t.jsx(Ve,{minimal:!0}),children:t.jsx(mt,{children:t.jsx(R,{mode:"wait",children:t.jsxs(Y,{children:[t.jsx(f,{path:"/",element:t.jsx(b,{children:t.jsx(Ke,{})})}),t.jsx(f,{path:"/flat/:id",element:t.jsx(b,{children:t.jsx(Qe,{})})}),t.jsx(f,{path:"/search",element:t.jsx(b,{children:t.jsx(et,{})})}),t.jsx(f,{path:"/category",element:t.jsx(b,{children:t.jsx(nt,{})})}),t.jsx(f,{path:"/success",element:t.jsx(b,{children:t.jsx(ot,{})})}),t.jsx(f,{path:"/logout",element:t.jsx(b,{children:t.jsx(Xe,{})})}),t.jsx(f,{path:"/bookings",element:t.jsx(b,{children:t.jsx(tt,{})})}),t.jsx(f,{path:"/checkout/:id",element:t.jsx(b,{children:t.jsx(st,{})})}),t.jsx(f,{path:"/login",element:t.jsx(b,{children:t.jsx(Ye,{})})}),t.jsx(f,{path:"/register",element:t.jsx(b,{children:t.jsx(Ze,{})})}),t.jsxs(f,{element:t.jsx(dt,{}),children:[t.jsx(f,{path:"/seller/dashboard",element:t.jsx(rt,{})}),t.jsx(f,{path:"/seller/profile",element:t.jsx(lt,{})}),t.jsx(f,{path:"/seller/analytics",element:t.jsx(ct,{})}),t.jsx(f,{path:"/mylistings",element:t.jsx(at,{})}),t.jsx(f,{path:"/add-flat",element:t.jsx(Je,{})}),t.jsx(f,{path:"/updatePage/:id",element:t.jsx(it,{})})]}),t.jsx(f,{path:"/*",element:t.jsx(b,{children:t.jsx(He,{})})})]})})})})})]})})]}));function gt(e){return new J(function(a,s){var i=ee(a,[]);return new te(function(n){var o,d=!1;return Promise.resolve(i).then(function(c){return e(c,a.getContext())}).then(a.setContext).then(function(){d||(o=s(a).subscribe({next:n.next.bind(n),error:n.error.bind(n),complete:n.complete.bind(n)}))}).catch(n.error.bind(n)),function(){d=!0,o&&o.unsubscribe()}})})}const pt=ae({uri:"https://flatbase.onrender.com/graphql"}),ft=gt((e,{headers:a})=>{const s=localStorage.getItem("token");return{headers:S(p({},a),{authorization:s?`Bearer ${s}`:""})}}),m=new se({link:ft.concat(pt),cache:new ie}),V=h`
  query GetFlats {
    flats {
      _id
      name
      price
      description
      location
      capacity
      images
      amenities
      bookingCount
      seller {
        _id
        name
        email
        phone
        bio
      }
    }
  }
`,_t=h`
  query GetFlat($id: ID!) {
    flat(id: $id) {
      _id
      name
      price
      description
      location
      capacity
      images
      amenities
      blockedMonths
      bookingCount
      seller {
        _id
        name
        email
        phone
        bio
      }
    }
  }
`,yt=h`
  query SearchFlats($location: String!) {
    searchFlats(location: $location) {
      _id
      name
      price
      description
      location
      capacity
      images
      amenities
      bookingCount
      seller {
        _id
        name
        email
      }
    }
  }
`,xt=h`
  query MyBookings($userId: ID!) {
    myBookings(userId: $userId) {
      _id
      flat {
        _id
        name
        price
        location
        images
      }
      user {
        _id
      }
      timePeriod
      totalPrice
      paymentStatus
      startDate
      endDate
      createdAt
    }
  }
`,bt=h`
  query SellerBookings($sellerId: ID!) {
    sellerBookings(sellerId: $sellerId) {
      _id
      flat {
        _id
        name
        price
        location
      }
      user {
        _id
        name
        email
      }
      timePeriod
      totalPrice
      paymentStatus
      paymentId
      startDate
      endDate
      createdAt
    }
  }
`,vt=h`
  query SellerAnalytics($sellerId: ID!) {
    sellerAnalytics(sellerId: $sellerId) {
      totalRevenue
      activeListings
      monthlyBookings
      avgRating
      monthlyData {
        month
        revenue
        bookings
      }
    }
  }
`,wt=h`
  query PopularFlats {
    popularFlats {
      _id
      name
      price
      location
      images
      bookingCount
    }
  }
`,jt=h`
  query PopularCities {
    popularCities {
      city
      count
      image
    }
  }
`,kt=h`
  query FlatReviews($flatId: ID!) {
    flatReviews(flatId: $flatId) {
      _id
      rating
      text
      createdAt
      user {
        _id
        name
      }
    }
  }
`,$t=h`
  query GetUser($id: ID!) {
    user(id: $id) {
      _id
      name
      email
      phone
      bio
      role
    }
  }
`,It=h`
  mutation Register($name: String!, $email: String!, $password: String!, $role: String) {
    register(name: $name, email: $email, password: $password, role: $role) {
      token
      user {
        _id
        name
        email
        role
      }
    }
  }
`,St=h`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
        role
      }
    }
  }
`,Nt=h`
  mutation AddFlat(
    $name: String!
    $price: Float!
    $description: String
    $location: String!
    $capacity: Int
    $images: String
    $seller: ID!
    $amenities: [String]
  ) {
    addFlat(
      name: $name
      price: $price
      description: $description
      location: $location
      capacity: $capacity
      images: $images
      seller: $seller
      amenities: $amenities
    ) {
      _id
      name
      price
      location
      amenities
    }
  }
`,Et=h`
  mutation UpdateFlat(
    $id: ID!
    $name: String
    $price: Float
    $description: String
    $location: String
    $capacity: Int
    $amenities: [String]
  ) {
    updateFlat(
      id: $id
      name: $name
      price: $price
      description: $description
      location: $location
      capacity: $capacity
      amenities: $amenities
    ) {
      _id
      name
      price
      location
      amenities
    }
  }
`,Lt=h`
  mutation DeleteFlat($id: ID!) {
    deleteFlat(id: $id)
  }
`,Ht=h`
  mutation CreateBooking($flat: ID!, $user: ID!, $timePeriod: String!, $totalPrice: Float!, $startDate: String, $endDate: String) {
    createBooking(flat: $flat, user: $user, timePeriod: $timePeriod, totalPrice: $totalPrice, startDate: $startDate, endDate: $endDate) {
      _id
      flat {
        _id
        name
        price
      }
      user {
        _id
        name
      }
      timePeriod
      totalPrice
      paymentStatus
      startDate
      endDate
    }
  }
`,Pt=h`
  mutation DeleteBooking($id: ID!) {
    deleteBooking(id: $id)
  }
`,Ct=h`
  query GetBooking($id: ID!) {
    booking(id: $id) {
      _id
      flat {
        _id
        name
        price
        capacity
        location
        description
        images
        seller {
          name
        }
      }
      user {
        _id
        name
        email
      }
      timePeriod
      totalPrice
      paymentStatus
    }
  }
`,At=h`
  mutation UpdateSellerProfile($id: ID!, $name: String, $email: String, $phone: String, $bio: String) {
    updateSellerProfile(id: $id, name: $name, email: $email, phone: $phone, bio: $bio) {
      _id
      name
      email
      phone
      bio
    }
  }
`,Tt=h`
  mutation AddReview($flat: ID!, $user: ID!, $rating: Int!, $text: String) {
    addReview(flat: $flat, user: $user, rating: $rating, text: $text) {
      _id
      rating
      text
      createdAt
      user {
        _id
        name
      }
    }
  }
`,Wt=e=>m.mutate({mutation:It,variables:e}),Kt=e=>m.mutate({mutation:St,variables:e}),Qt=e=>m.mutate({mutation:Nt,variables:e}),Yt=e=>m.query({query:_t,variables:{id:e}}),Zt=e=>m.query({query:xt,variables:{userId:e}}),Xt=e=>m.query({query:V,fetchPolicy:"network-only"}).then(a=>a.data.flats.filter(s=>s.seller._id===e)),Jt=(e,a)=>m.mutate({mutation:Et,variables:p({id:e},a)}),ea=e=>m.mutate({mutation:Lt,variables:{id:e}}),ta=e=>m.mutate({mutation:Pt,variables:{id:e}}),aa=e=>m.query({query:Ct,variables:{id:e}}),sa=e=>m.query({query:bt,variables:{sellerId:e},fetchPolicy:"network-only"}),ia=e=>m.query({query:vt,variables:{sellerId:e},fetchPolicy:"network-only"}),na=()=>m.query({query:wt,fetchPolicy:"network-only"}),oa=()=>m.query({query:jt,fetchPolicy:"network-only"}),ra=e=>m.query({query:kt,variables:{flatId:e},fetchPolicy:"network-only"}),la=e=>m.query({query:$t,variables:{id:e},fetchPolicy:"network-only"}),ca=e=>m.mutate({mutation:At,variables:e}),da=e=>m.mutate({mutation:Tt,variables:e}),L=G("flats/fetchFlats",()=>N(void 0,null,function*(){return(yield m.query({query:V,fetchPolicy:"cache-first"})).data.flats})),P=G("flats/fetchFlatsByLocation",e=>N(void 0,null,function*(){return(yield m.query({query:yt,variables:{location:e},fetchPolicy:"network-only"})).data.searchFlats})),Dt=oe({name:"flats",initialState:{flats:[],loading:!1,error:null},reducers:{},extraReducers:e=>{e.addCase(L.pending,a=>{a.loading=!0}).addCase(L.fulfilled,(a,s)=>{a.loading=!1,a.flats=s.payload}).addCase(L.rejected,(a,s)=>{a.loading=!1,a.error=s.error.message}).addCase(P.pending,a=>{a.loading=!0}).addCase(P.fulfilled,(a,s)=>{a.loading=!1,a.flats=s.payload}).addCase(P.rejected,(a,s)=>{a.loading=!1,a.error=s.error.message})}}),Ot=Dt.reducer,Ft=re({reducer:{flats:Ot}});X.createRoot(document.getElementById("root")).render(t.jsx(Z.StrictMode,{children:t.jsx(le,{store:Ft,children:t.jsx(ne,{client:m,children:t.jsx(ht,{})})})}));export{Ht as C,_t as G,Ne as H,F as L,Re as U,Ge as X,L as a,oa as b,v as c,ra as d,Ae as e,P as f,na as g,Qt as h,Zt as i,ta as j,da as k,Kt as l,Xt as m,ea as n,aa as o,Yt as p,V as q,Wt as r,ia as s,sa as t,Jt as u,la as v,ca as w,Le as x};
