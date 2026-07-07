const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HomePage-CNhYt0v8.js","assets/vendor-motion-BROBpTuG.js","assets/vendor-react-CGElwdIo.js","assets/HomeCardShimmer-EQVMSTL-.js","assets/star-D2e-UyAE.js","assets/map-pin-ZAYCksqW.js","assets/vendor-redux-BgK4jZwD.js","assets/search-B22bF9R6.js","assets/trending-up-jPYcCk0D.js","assets/vendor-three-BO7NUeth.js","assets/vendor-charts-BEqjL8w3.js","assets/vendor-mui-CCiaWUtO.js","assets/vendor-apollo-C_l52YC0.js","assets/HomePage-BpvcMwrr.css","assets/FlatDetailPage-p9leNOCc.js","assets/users-CucT4fDC.js","assets/message-square-BeepqBlN.js","assets/wind-F5KYpFSN.js","assets/LoginPage-DU48-gV7.js","assets/circle-alert-DKttqBY1.js","assets/mail-B0eDxdDe.js","assets/lock-5ZqpDrTx.js","assets/RegisterPage-CJ80wu-3.js","assets/building-rl6UsjkI.js","assets/LogoutPage-BfD0sUYx.js","assets/arrow-right-DNjwc88p.js","assets/AddFlatPage-d0yZp1Av.js","assets/Modal-BCdpXgoM.js","assets/constants-BizaRzGL.js","assets/dollar-sign-COqFwTjW.js","assets/file-text-DZ0HCkHe.js","assets/SearchResultsPage-BAGxwAVF.js","assets/sliders-horizontal-BR_I404f.js","assets/BookingPage-CcZ0o6oS.js","assets/trash-2-C7HVEGqy.js","assets/calendar-5eTXduMo.js","assets/credit-card-C6YasUmn.js","assets/MyListings-CswsimxI.js","assets/plus-DrDny465.js","assets/Checkout-BdQDgyz3.js","assets/arrow-left-BYvj5A-y.js","assets/UpdatePage-DyGYpwLn.js","assets/Category-BVgKi_6t.js","assets/Success-Bcy6yOl7.js","assets/SellerDashboard-CVqUoxz9.js","assets/SellerProfilePage-4ILcsY8b.js","assets/SellerAnalytics-WdhpsDaW.js","assets/SellerLayout-P3FlPGeG.js"])))=>i.map(i=>d[i]);
var e=Object.defineProperty,t=(t,a,i)=>((t,a,i)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[a]=i)(t,"symbol"!=typeof a?a+"":a,i);import{j as a,m as i,A as r}from"./vendor-motion-BROBpTuG.js";import{u as s,r as n,c as o,N as l,L as d,B as c,d as m,e as h,a as p}from"./vendor-react-CGElwdIo.js";import{_ as g,c as u}from"./vendor-three-BO7NUeth.js";import{A as y,_ as x,O as _,c as f,a as b,I as j,g as v,b as w}from"./vendor-apollo-C_l52YC0.js";import{j as k,a as $,h as I,P as N}from"./vendor-redux-BgK4jZwD.js";import"./vendor-charts-BEqjL8w3.js";import"./vendor-mui-CCiaWUtO.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)}).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const S=/^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;function P(e="",t=!0,a=!0){let i=e||"";return t&&(i=e.toString().trim().replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g,(e,t,a)=>t>0&&t+e.length!==a.length&&e.search(S)>-1&&":"!==a.charAt(t-2)&&("-"!==a.charAt(t+e.length)||"-"===a.charAt(t-1))&&a.charAt(t-1).search(/[^\s-]/)<0?e.toLowerCase():e.substr(1).search(/[A-Z]|\../)>-1?e:e.charAt(0).toUpperCase()+e.substr(1))),a&&(i=function(e){return"string"==typeof(t=e)&&-1!==t.indexOf("@")?"REDACTED (Potential Email Address)":e;var t}(i)),i}var C=new class{constructor(){t(this,"isInitialized"),t(this,"_testMode"),t(this,"_currentMeasurementId"),t(this,"_hasLoadedGA"),t(this,"_isQueuing"),t(this,"_queueGtag"),t(this,"reset",()=>{this.isInitialized=!1,this._testMode=!1,this._currentMeasurementId="",this._hasLoadedGA=!1,this._isQueuing=!1,this._queueGtag=[]}),t(this,"_gtag",(...e)=>{this._testMode||this._isQueuing?this._queueGtag.push(e):((...e)=>{"undefined"!=typeof window&&(void 0===window.gtag&&(window.dataLayer=window.dataLayer||[],window.gtag=function(){window.dataLayer.push(arguments)}),window.gtag(...e))})(...e)}),t(this,"_loadGA",(e,t,a="https://www.googletagmanager.com/gtag/js")=>{if("undefined"!=typeof window&&"undefined"!=typeof document&&!this._hasLoadedGA){const i=document.createElement("script");i.async=!0,i.src=`${a}?id=${e}`,t&&i.setAttribute("nonce",t),document.body.appendChild(i),window.dataLayer=window.dataLayer||[],window.gtag=function(){window.dataLayer.push(arguments)},this._hasLoadedGA=!0}}),t(this,"_toGtagOptions",e=>{if(!e)return;const t={cookieUpdate:"cookie_update",cookieExpires:"cookie_expires",cookieDomain:"cookie_domain",cookieFlags:"cookie_flags",userId:"user_id",clientId:"client_id",anonymizeIp:"anonymize_ip",contentGroup1:"content_group1",contentGroup2:"content_group2",contentGroup3:"content_group3",contentGroup4:"content_group4",contentGroup5:"content_group5",allowAdFeatures:"allow_google_signals",allowAdPersonalizationSignals:"allow_ad_personalization_signals",nonInteraction:"non_interaction",page:"page_path",hitCallback:"event_callback"};return Object.entries(e).reduce((e,[a,i])=>(t[a]?e[t[a]]=i:e[a]=i,e),{})}),t(this,"initialize",(e,t={})=>{if(!e)throw new Error("Require GA_MEASUREMENT_ID");const a="string"==typeof e?[{trackingId:e}]:e;this._currentMeasurementId=a[0].trackingId;const{gaOptions:i,gtagOptions:r,nonce:s,testMode:n=!1,gtagUrl:o}=t;if(this._testMode=n,n||this._loadGA(this._currentMeasurementId,s,o),this.isInitialized||(this._gtag("js",new Date),a.forEach(e=>{const t={...this._toGtagOptions({...i,...e.gaOptions}),...r,...e.gtagOptions};Object.keys(t).length?this._gtag("config",e.trackingId,t):this._gtag("config",e.trackingId)})),this.isInitialized=!0,!n){const e=[...this._queueGtag];for(this._queueGtag=[],this._isQueuing=!1;e.length;){const t=e.shift();this._gtag(...t),"get"===t[0]&&(this._isQueuing=!0)}}}),t(this,"set",e=>{e&&"object"==typeof e&&(Object.keys(e).length,this._gaCommand("set",e))}),t(this,"_gaCommandSendEvent",(e,t,a,i,r)=>{this._gtag("event",t,{event_category:e,event_label:a,value:i,...r&&{non_interaction:r.nonInteraction},...this._toGtagOptions(r)})}),t(this,"_gaCommandSendEventParameters",(...e)=>{if("string"==typeof e[0])this._gaCommandSendEvent(...e.slice(1));else{const{eventCategory:t,eventAction:a,eventLabel:i,eventValue:r,hitType:s,...n}=e[0];this._gaCommandSendEvent(t,a,i,r,n)}}),t(this,"_gaCommandSendTiming",(e,t,a,i)=>{this._gtag("event","timing_complete",{name:t,value:a,event_category:e,event_label:i})}),t(this,"_gaCommandSendPageview",(e,t)=>{if(t&&Object.keys(t).length){const{title:a,location:i,...r}=this._toGtagOptions(t)||{};this._gtag("event","page_view",{...e&&{page_path:e},...a&&{page_title:a},...i&&{page_location:i},...r})}else e?this._gtag("event","page_view",{page_path:e}):this._gtag("event","page_view")}),t(this,"_gaCommandSendPageviewParameters",(...e)=>{if("string"==typeof e[0])this._gaCommandSendPageview(...e.slice(1));else{const{page:t,hitType:a,...i}=e[0];this._gaCommandSendPageview(t,i)}}),t(this,"_gaCommandSend",(...e)=>{switch("string"==typeof e[0]?e[0]:e[0].hitType){case"event":this._gaCommandSendEventParameters(...e);break;case"pageview":this._gaCommandSendPageviewParameters(...e);break;case"timing":this._gaCommandSendTiming(...e.slice(1))}}),t(this,"_gaCommandSet",(...e)=>{"string"==typeof e[0]&&(e[0]={[e[0]]:e[1]}),this._gtag("set",this._toGtagOptions(e[0]))}),t(this,"_gaCommand",(e,...t)=>{switch(e){case"send":this._gaCommandSend(...t);break;case"set":this._gaCommandSet(...t)}}),t(this,"ga",(...e)=>{if("string"==typeof e[0])this._gaCommand(...e);else{const[t]=e;this._gtag("get",this._currentMeasurementId,"client_id",e=>{this._isQueuing=!1;const a=this._queueGtag;for(t({get:t=>"clientId"===t?e:"trackingId"===t?this._currentMeasurementId:"apiVersion"===t?"1":void 0});a.length;){const e=a.shift();this._gtag(...e)}}),this._isQueuing=!0}return this.ga}),t(this,"event",(e,t)=>{if("string"==typeof e)this._gtag("event",e,this._toGtagOptions(t));else{const{action:t,category:a,label:i,value:r,nonInteraction:s,transport:n}=e;if(!a||!t)return;const o={hitType:"event",eventCategory:P(a),eventAction:P(t)};i&&(o.eventLabel=P(i)),void 0!==r&&("number"!=typeof r||(o.eventValue=r)),void 0!==s&&("boolean"!=typeof s||(o.nonInteraction=s)),void 0!==n&&("string"!=typeof n||(["beacon","xhr","image"].indexOf(n),o.transport=n)),this._gaCommand("send",o)}}),t(this,"send",e=>{this._gaCommand("send",e)}),this.reset()}gtag(...e){this._gtag(...e)}};const A=({children:e})=>{const{pathname:t}=s();return n.useLayoutEffect(()=>{document.documentElement.scrollTo(0,0)},[t]),e},D=e=>{const t=(e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,a)=>a?a.toUpperCase():t.toLowerCase()))(e);return t.charAt(0).toUpperCase()+t.slice(1)},E=(...e)=>e.filter((e,t,a)=>Boolean(e)&&""!==e.trim()&&a.indexOf(e)===t).join(" ").trim(),z=e=>{for(const t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0};
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var L={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=n.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:a=2,absoluteStrokeWidth:i,className:r="",children:s,iconNode:o,...l},d)=>n.createElement("svg",{ref:d,...L,width:t,height:t,stroke:e,strokeWidth:i?24*Number(a)/Number(t):a,className:E("lucide",r),...!s&&!z(l)&&{"aria-hidden":"true"},...l},[...o.map(([e,t])=>n.createElement(e,t)),...Array.isArray(s)?s:[s]])),O=(e,t)=>{const a=n.forwardRef(({className:a,...i},r)=>{return n.createElement(q,{ref:r,iconNode:t,className:E(`lucide-${s=D(e),s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,a),...i});var s});return a.displayName=D(e),a},T=O("book-open",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]),F=O("compass",[["path",{d:"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",key:"9ktpf1"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]),R=O("house",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]),M=O("layout-dashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]),G=O("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]),V=O("log-out",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]),B=O("menu",[["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 18h16",key:"19g7jn"}],["path",{d:"M4 6h16",key:"1o0s65"}]]),U=O("triangle-alert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),H=O("user",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]),W=O("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),Q="token",Z="userId",Y="role";
/**
 * @license lucide-react v0.510.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function K({token:e,user:t}){localStorage.setItem(Q,e),localStorage.setItem(Z,t._id),localStorage.setItem(Y,t.role)}function X(){localStorage.removeItem(Q),localStorage.removeItem(Z),localStorage.removeItem(Y)}function J(){const e=o();return a.jsxs(i.button,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:()=>{X(),e("/logout")},className:"flex items-center text-on-surface-variant hover:text-error transition-colors duration-300 font-body text-xs font-bold uppercase tracking-wider gap-1.5",children:[a.jsx(V,{size:14,className:"text-glow-purple"}),a.jsx("span",{children:"Logout"})]})}const ee=n.memo(()=>{const[e,t]=n.useState(!1),[s,d]=n.useState(!1),c=localStorage.getItem("token"),m="seller"===localStorage.getItem("role"),h="customer"===localStorage.getItem("role"),p=o(),g=e=>a=>{("keydown"!==a.type||"Tab"!==a.key&&"Shift"!==a.key)&&t(e)};n.useEffect(()=>{const e=()=>{d(window.scrollY>20)};return window.addEventListener("scroll",e,{passive:!0}),()=>window.removeEventListener("scroll",e)},[]);const u=n.useMemo(()=>[{name:"Destinations",path:"/category",icon:a.jsx(F,{size:16}),show:!m},{name:"Register",path:"/register",icon:a.jsx(H,{size:16}),show:!c},{name:"Dashboard",path:"/seller/dashboard",icon:a.jsx(M,{size:16}),show:m},{name:"My Bookings",path:"/bookings",icon:a.jsx(T,{size:16}),show:h}],[c,m,h]);return a.jsxs(a.Fragment,{children:[a.jsx(i.nav,{initial:{y:-100,x:"-50%",opacity:0},animate:{y:0,x:"-50%",opacity:1},transition:{duration:.8,ease:[.16,1,.3,1]},className:"fixed top-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-300 border rounded-full "+(s?"py-3 bg-surface/90 backdrop-blur-[25px] border-white/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)]":"py-5 bg-glass-white backdrop-blur-[15px] border-glass-border shadow-sm"),children:a.jsxs("div",{className:"flex justify-between items-center w-full px-6 md:px-8 h-10",children:[a.jsx(i.div,{whileHover:{scale:1.02},whileTap:{scale:.98},className:"flex items-center cursor-pointer gap-2",onClick:()=>{p("/")},children:a.jsx("span",{className:"font-display text-xl font-bold tracking-widest text-on-background hover:text-primary transition-colors duration-300 text-glow",children:"FLATBASE"})}),a.jsx("div",{className:"hidden md:flex gap-8 items-center",children:u.filter(e=>e.show).map(e=>a.jsx(l,{to:e.path,className:({isActive:e})=>e?"text-primary font-bold border-b-2 border-primary pb-1 font-body text-xs tracking-wider uppercase transition-all":"text-on-surface-variant hover:text-on-background transition-colors duration-300 font-body text-xs tracking-wider uppercase",children:a.jsx("div",{className:"flex items-center gap-1.5",children:e.name})},e.path))}),a.jsxs("div",{className:"flex items-center gap-4",children:[c?a.jsx("div",{className:"hidden md:block",children:a.jsx(J,{})}):a.jsx("button",{onClick:()=>p("/login"),className:"hidden md:block bg-primary text-on-primary px-5 py-2 rounded-full font-body font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] hover:brightness-110 active:scale-95 transition-all duration-300",children:"Sign In"}),a.jsx("div",{className:"md:hidden",children:a.jsx(i.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:g(!0),className:"p-1.5 rounded-full text-primary hover:bg-glass-white border border-transparent hover:border-glass-border transition-all",children:a.jsx(B,{size:20})})})]})]})}),a.jsx("div",{className:"h-28"}),a.jsx(r,{children:e&&a.jsxs(i.div,{initial:{x:"100%"},animate:{x:0},exit:{x:"100%"},transition:{type:"tween",duration:.3},className:"fixed inset-y-0 right-0 z-50 w-64 bg-surface-container-low/95 backdrop-blur-[20px] border-l border-glass-border shadow-2xl flex flex-col",children:[a.jsxs("div",{className:"flex justify-between items-center p-6 border-b border-glass-border",children:[a.jsx("h2",{className:"text-lg font-bold font-display text-primary tracking-wider uppercase",children:"Menu"}),a.jsx(i.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:g(!1),className:"p-2 rounded-full text-primary hover:bg-glass-white border border-glass-border",children:a.jsx(W,{size:18})})]}),a.jsx("div",{className:"flex-1 overflow-y-auto py-6",children:a.jsxs("nav",{className:"flex flex-col space-y-2 px-6",children:[u.filter(e=>e.show).map(e=>a.jsxs(l,{to:e.path,onClick:g(!1),className:({isActive:e})=>(e?"bg-primary/10 text-primary font-bold border border-primary/20":"text-on-surface-variant hover:bg-glass-white hover:text-white border border-transparent")+" flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-body text-xs tracking-wider uppercase",children:[a.jsx("span",{className:"mr-3",children:e.icon}),e.name]},e.path)),c?a.jsx("div",{onClick:g(!1),className:"pt-4 border-t border-glass-border mt-4",children:a.jsx(J,{})}):a.jsx("button",{onClick:()=>{p("/login"),t(!1)},className:"w-full mt-4 bg-primary text-on-primary py-3 rounded-full font-body font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all duration-300",children:"Sign In"})]})})]})}),e&&a.jsx(i.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"fixed inset-0 bg-background/60 backdrop-blur-sm z-40",onClick:g(!1)})]})}),te=({children:e})=>a.jsx(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:e}),ae=({minimal:e=!1})=>e?a.jsx("div",{className:"flex justify-center items-center py-12",children:a.jsx(i.div,{animate:{rotate:360},transition:{duration:1,repeat:Number.POSITIVE_INFINITY,ease:"linear"},children:a.jsx(G,{size:32,className:"text-[#76ABAE]"})})}):a.jsxs("div",{className:"h-screen flex flex-col justify-center items-center",children:[a.jsx(i.div,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.5},className:"mb-6",children:a.jsx(i.div,{animate:{rotate:360},transition:{duration:1.5,repeat:Number.POSITIVE_INFINITY,ease:"linear"},children:a.jsx(G,{size:48,className:"text-[#76ABAE]"})})}),a.jsx(i.h1,{initial:{y:20,opacity:0},animate:{y:0,opacity:1},transition:{delay:.3,duration:.5},className:"text-3xl font-bold tracking-tight",children:"DISCOVER BOOK LIVE"})]});function ie({name:e,css:t="",variant:i="primary",fullWidth:r=!1,onClick:s,type:n="button"}){const o="primary"===i?"bg-primary text-on-primary hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]":"motionsite-card border-glass-border text-on-surface hover:text-on-primary hover:bg-primary hover:border-primary",l=r?"w-full":"";return a.jsx("button",{type:n,onClick:s,className:`px-6 py-2.5 rounded-full font-body font-bold text-xs tracking-wider uppercase transition-all duration-300 active:scale-[0.98] select-none ${o} ${l} ${t}`,children:e})}const re=()=>a.jsxs("div",{className:"flex flex-col items-center justify-center min-h-[70vh] px-4 text-center",children:[a.jsx(i.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"mb-8",children:a.jsx("div",{className:"bg-red-100 p-6 rounded-full inline-block",children:a.jsx(U,{size:60,className:"text-red-500"})})}),a.jsx(i.h1,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.2,duration:.5},className:"text-5xl md:text-7xl font-bold mb-4 text-gray-800",children:"404"}),a.jsx(i.h2,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.3,duration:.5},className:"text-2xl md:text-3xl font-semibold mb-4 text-gray-700",children:"Page Not Found"}),a.jsx(i.p,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.4,duration:.5},className:"text-gray-600 max-w-md mb-8",children:"The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."}),a.jsx(i.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.5,duration:.5},children:a.jsx(d,{to:"/",children:a.jsx(ie,{name:a.jsxs("div",{className:"flex items-center",children:[a.jsx(R,{size:18,className:"mr-2"}),a.jsx("span",{children:"Back to Home"})]})})})})]}),se=n.memo(function(){const e=n.useMemo(()=>(new Date).getFullYear(),[]);return a.jsxs("footer",{className:"site-footer mt-20",children:[a.jsx("div",{className:"footer-dots","aria-hidden":"true",children:a.jsx("div",{className:"footer-dots__line"})}),a.jsxs("div",{className:"site-footer__inner",children:[a.jsxs("div",{className:"site-footer__top",children:[a.jsx("h2",{className:"site-footer__heading",children:"Curated escapes for the modern collector."}),a.jsxs("nav",{className:"site-footer__nav","aria-label":"Footer navigation",children:[a.jsx("a",{href:"#company",className:"site-footer__link",children:"Company"}),a.jsx("a",{href:"#technology",className:"site-footer__link",children:"Technology"}),a.jsx("a",{href:"#solutions",className:"site-footer__link",children:"Solutions"}),a.jsx("a",{href:"#our-edge",className:"site-footer__link",children:"Our Edge"}),a.jsx("a",{href:"#investors",className:"site-footer__link",children:"Investors"})]}),a.jsxs("nav",{className:"site-footer__nav","aria-label":"Company links",children:[a.jsx("a",{href:"#our-team",className:"site-footer__link",children:"Our Team"}),a.jsx("a",{href:"#news",className:"site-footer__link",children:"News"}),a.jsx("a",{href:"#careers",className:"site-footer__link",children:"Careers"}),a.jsx("a",{href:"#contact",className:"site-footer__link",children:"Contact Us"})]}),a.jsxs("nav",{className:"site-footer__nav","aria-label":"Social links",children:[a.jsx("a",{href:"https://www.linkedin.com",target:"_blank",rel:"noreferrer",className:"site-footer__link",children:"LinkedIn"}),a.jsx("a",{href:"https://x.com",target:"_blank",rel:"noreferrer",className:"site-footer__link",children:"Follow Us on X"})]})]}),a.jsx("div",{className:"site-footer__brand-row",children:a.jsxs("a",{href:"/",className:"site-footer__brand","aria-label":"FlatBase home",children:[a.jsx("span",{className:"site-footer__mark","aria-hidden":"true"}),a.jsx("span",{className:"site-footer__wordmark",children:"FlatBase"})]})}),a.jsxs("div",{className:"site-footer__legal",children:[a.jsxs("span",{children:["© ",e," FlatBase. All rights reserved."]}),a.jsx("a",{href:"#privacy",children:"Privacy Policy"}),a.jsx("a",{href:"#terms",children:"Terms of Service"})]})]})]})}),ne=n.lazy(()=>g(()=>import("./HomePage-CNhYt0v8.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13]))),oe=n.lazy(()=>g(()=>import("./FlatDetailPage-p9leNOCc.js"),__vite__mapDeps([14,1,2,12,5,15,16,4,17,9,10,11,6]))),le=n.lazy(()=>g(()=>import("./LoginPage-DU48-gV7.js"),__vite__mapDeps([18,1,2,19,20,21,9,10,11,6,12]))),de=n.lazy(()=>g(()=>import("./RegisterPage-CJ80wu-3.js"),__vite__mapDeps([22,1,2,19,20,21,15,23,9,10,11,6,12]))),ce=n.lazy(()=>g(()=>import("./LogoutPage-BfD0sUYx.js"),__vite__mapDeps([24,1,2,25,9,10,11,6,12]))),me=n.lazy(()=>g(()=>import("./AddFlatPage-d0yZp1Av.js"),__vite__mapDeps([26,1,2,27,28,29,5,15,30,17,9,10,11,6,12]))),he=n.lazy(()=>g(()=>import("./SearchResultsPage-BAGxwAVF.js"),__vite__mapDeps([31,1,2,6,3,4,5,7,32,9,10,11,12]))),pe=n.lazy(()=>g(()=>import("./BookingPage-CcZ0o6oS.js"),__vite__mapDeps([33,1,2,27,34,7,19,5,35,16,36,4,9,10,11,6,12]))),ge=n.lazy(()=>g(()=>import("./MyListings-CswsimxI.js"),__vite__mapDeps([37,1,2,27,34,7,19,5,15,38,9,10,11,6,12]))),ue=n.lazy(()=>g(()=>import("./Checkout-BdQDgyz3.js"),__vite__mapDeps([39,1,2,40,5,36,12,9,10,11,6]))),ye=n.lazy(()=>g(()=>import("./UpdatePage-DyGYpwLn.js"),__vite__mapDeps([41,1,2,28,40,19,29,5,15,30,17,9,10,11,6,12]))),xe=n.lazy(()=>g(()=>import("./Category-BVgKi_6t.js"),__vite__mapDeps([42,1,2,3,4,5,28,12,7,32,15,9,10,11,6]))),_e=n.lazy(()=>g(()=>import("./Success-Bcy6yOl7.js"),__vite__mapDeps([43,1,2,25,9,10,11,6,12]))),fe=n.lazy(()=>g(()=>import("./SellerDashboard-CVqUoxz9.js"),__vite__mapDeps([44,1,2,23,35,4,9,10,11,6,12]))),be=n.lazy(()=>g(()=>import("./SellerProfilePage-4ILcsY8b.js"),__vite__mapDeps([45,1,2,20,30,9,10,11,6,12]))),je=n.lazy(()=>g(()=>import("./SellerAnalytics-WdhpsDaW.js"),__vite__mapDeps([46,9,2,10,11,1,6,19,8,35,12]))),ve=n.lazy(()=>g(()=>import("./SellerLayout-P3FlPGeG.js"),__vite__mapDeps([47,1,2,23,8,7,20,38,9,10,11,6,12]))),we=n.memo(function(){return a.jsxs("div",{className:"fixed top-0 -z-10 h-full w-full bg-background overflow-hidden","aria-hidden":"true",children:[a.jsx("div",{className:"glowing-blob w-[500px] h-[500px] bg-primary/10 top-[-10%] right-[5%]"}),a.jsx("div",{className:"glowing-blob w-[600px] h-[600px] bg-secondary/5 top-[30%] left-[-10%]",style:{animationDelay:"-5s"}}),a.jsx("div",{className:"glowing-blob w-[400px] h-[400px] bg-accent/10 bottom-[10%] right-[10%]",style:{animationDelay:"-10s"}}),a.jsx("div",{className:"absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px]"})]})}),ke=()=>{const e=s();return n.useEffect(()=>{C.send({hitType:"pageview",page:e.pathname+e.search})},[e]),null},$e=({children:e})=>{const t=s(),i=n.useMemo(()=>t.pathname.startsWith("/seller")||t.pathname.startsWith("/mylistings")||t.pathname.startsWith("/add-flat")||t.pathname.startsWith("/updatePage"),[t.pathname]);return a.jsxs(a.Fragment,{children:[!i&&a.jsx(ee,{}),e,!i&&a.jsx(se,{})]})},Ie=()=>(n.useEffect(()=>{const e=()=>C.initialize("G-34YS1ZRZTT");"function"==typeof window.requestIdleCallback?window.requestIdleCallback(e,{timeout:3e3}):setTimeout(e,1e3)},[]),a.jsxs(a.Fragment,{children:[a.jsx(we,{}),a.jsx("div",{className:"min-h-screen w-full flex flex-col font-body bg-background text-on-background",children:a.jsxs(c,{children:[a.jsx(ke,{}),a.jsx(A,{children:a.jsx(n.Suspense,{fallback:a.jsx(ae,{minimal:!0}),children:a.jsx($e,{children:a.jsx(r,{mode:"sync",children:a.jsxs(m,{children:[a.jsx(h,{path:"/",element:a.jsx(te,{children:a.jsx(ne,{})})}),a.jsx(h,{path:"/flat/:id",element:a.jsx(te,{children:a.jsx(oe,{})})}),a.jsx(h,{path:"/search",element:a.jsx(te,{children:a.jsx(he,{})})}),a.jsx(h,{path:"/category",element:a.jsx(te,{children:a.jsx(xe,{})})}),a.jsx(h,{path:"/success",element:a.jsx(te,{children:a.jsx(_e,{})})}),a.jsx(h,{path:"/logout",element:a.jsx(te,{children:a.jsx(ce,{})})}),a.jsx(h,{path:"/bookings",element:a.jsx(te,{children:a.jsx(pe,{})})}),a.jsx(h,{path:"/checkout/:id",element:a.jsx(te,{children:a.jsx(ue,{})})}),a.jsx(h,{path:"/login",element:a.jsx(te,{children:a.jsx(le,{})})}),a.jsx(h,{path:"/register",element:a.jsx(te,{children:a.jsx(de,{})})}),a.jsxs(h,{element:a.jsx(ve,{}),children:[a.jsx(h,{path:"/seller/dashboard",element:a.jsx(fe,{})}),a.jsx(h,{path:"/seller/profile",element:a.jsx(be,{})}),a.jsx(h,{path:"/seller/analytics",element:a.jsx(je,{})}),a.jsx(h,{path:"/mylistings",element:a.jsx(ge,{})}),a.jsx(h,{path:"/add-flat",element:a.jsx(me,{})}),a.jsx(h,{path:"/updatePage/:id",element:a.jsx(ye,{})})]}),a.jsx(h,{path:"/*",element:a.jsx(te,{children:a.jsx(re,{})})})]})})})})})]})})]})),Ne="rzp_test_POjN4Ulq8Q6my8",Se=f({uri:"http://localhost:5000/graphql"});var Pe;const Ce=new b({link:(Pe=(e,{headers:t})=>{const a=localStorage.getItem(Q);return{headers:{...t,authorization:a?`Bearer ${a}`:""}}},new y(function(e,t){var a=x(e,[]);return new _(function(i){var r,s=!1;return Promise.resolve(a).then(function(t){return Pe(0,e.getContext())}).then(e.setContext).then(function(){s||(r=t(e).subscribe({next:i.next.bind(i),error:i.error.bind(i),complete:i.complete.bind(i)}))}).catch(i.error.bind(i)),function(){s=!0,r&&r.unsubscribe()}})})).concat(Se),cache:new j}),Ae=v`
  query GetFlats {
    flats {
      _id name price description location capacity images amenities bookingCount
      seller { _id name email phone bio }
    }
  }
`,De=v`
  query GetFlat($id: ID!) {
    flat(id: $id) {
      _id name price description location capacity images amenities blockedMonths bookingCount
      seller { _id name email phone bio }
    }
  }
`,Ee=v`
  query SearchFlats($location: String!) {
    searchFlats(location: $location) {
      _id name price description location capacity images amenities bookingCount
      seller { _id name email }
    }
  }
`,ze=v`
  query MyBookings($userId: ID!) {
    myBookings(userId: $userId) {
      _id
      flat { _id name price location images }
      user { _id }
      timePeriod totalPrice paymentStatus startDate endDate createdAt
    }
  }
`,Le=v`
  query SellerBookings($sellerId: ID!) {
    sellerBookings(sellerId: $sellerId) {
      _id
      flat { _id name price location }
      user { _id name email }
      timePeriod totalPrice paymentStatus paymentId startDate endDate createdAt
    }
  }
`,qe=v`
  query SellerAnalytics($sellerId: ID!) {
    sellerAnalytics(sellerId: $sellerId) {
      totalRevenue activeListings monthlyBookings avgRating
      monthlyData { month revenue bookings }
    }
  }
`,Oe=v`
  query PopularFlats {
    popularFlats { _id name price location images bookingCount }
  }
`,Te=v`
  query GetPopularCities {
    popularCities {
      city
      count
      flatCount
      image
    }
  }
`,Fe=v`
  query FlatReviews($flatId: ID!) {
    flatReviews(flatId: $flatId) {
      _id rating text createdAt
      user { _id name }
    }
  }
`,Re=v`
  query GetUser($id: ID!) {
    user(id: $id) { _id name email phone bio role }
  }
`,Me=v`
  query GetBooking($id: ID!) {
    booking(id: $id) {
      _id
      flat { _id name price capacity location description images seller { name } }
      user { _id name email }
      timePeriod totalPrice paymentStatus
    }
  }
`,Ge=v`
  mutation Register($name: String!, $email: String!, $password: String!, $role: String) {
    register(name: $name, email: $email, password: $password, role: $role) {
      token
      user { _id name email role }
    }
  }
`,Ve=v`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user { _id name email role }
    }
  }
`,Be=v`
  mutation AddFlat(
    $name: String! $price: Float! $description: String
    $location: String! $capacity: Int $images: String $seller: ID! $amenities: [String]
  ) {
    addFlat(name: $name price: $price description: $description location: $location
            capacity: $capacity images: $images seller: $seller amenities: $amenities) {
      _id name price location amenities
    }
  }
`,Ue=v`
  mutation UpdateFlat(
    $id: ID! $name: String $price: Float $description: String
    $location: String $capacity: Int $amenities: [String]
  ) {
    updateFlat(id: $id name: $name price: $price description: $description
               location: $location capacity: $capacity amenities: $amenities) {
      _id name price location amenities
    }
  }
`,He=v`
  mutation DeleteFlat($id: ID!) { deleteFlat(id: $id) }
`,We=v`
  mutation CreateBooking(
    $flat: ID! $user: ID! $timePeriod: String! $totalPrice: Float!
    $startDate: String $endDate: String
  ) {
    createBooking(flat: $flat user: $user timePeriod: $timePeriod totalPrice: $totalPrice
                  startDate: $startDate endDate: $endDate) {
      _id
      flat { _id name price }
      user { _id name }
      timePeriod totalPrice paymentStatus startDate endDate
    }
  }
`,Qe=v`
  mutation DeleteBooking($id: ID!) { deleteBooking(id: $id) }
`,Ze=v`
  mutation UpdateSellerProfile($id: ID!, $name: String, $email: String, $phone: String, $bio: String) {
    updateSellerProfile(id: $id, name: $name, email: $email, phone: $phone, bio: $bio) {
      _id name email phone bio
    }
  }
`,Ye=v`
  mutation AddReview($flat: ID!, $user: ID!, $rating: Int!, $text: String) {
    addReview(flat: $flat, user: $user, rating: $rating, text: $text) {
      _id rating text createdAt
      user { _id name }
    }
  }
`,Ke=v`
  mutation CreateOrder($amount: Float!, $currency: String) {
    createOrder(amount: $amount, currency: $currency) {
      id amount currency receipt
    }
  }
`,Xe=v`
  mutation VerifyPayment(
    $razorpay_order_id: String!
    $razorpay_payment_id: String!
    $razorpay_signature: String!
    $bookingId: ID!
    $startDate: String
    $endDate: String
  ) {
    verifyPayment(
      razorpay_order_id: $razorpay_order_id
      razorpay_payment_id: $razorpay_payment_id
      razorpay_signature: $razorpay_signature
      bookingId: $bookingId
      startDate: $startDate
      endDate: $endDate
    )
  }
`,Je=e=>Ce.mutate({mutation:Ge,variables:e}),et=e=>Ce.mutate({mutation:Ve,variables:e}),tt=e=>Ce.mutate({mutation:Be,variables:e}),at=e=>Ce.query({query:De,variables:{id:e}}),it=e=>Ce.query({query:ze,variables:{userId:e}}),rt=e=>Ce.query({query:Ae,fetchPolicy:"network-only"}).then(t=>t.data.flats.filter(t=>t.seller._id===e)),st=(e,t)=>Ce.mutate({mutation:Ue,variables:{id:e,...t}}),nt=e=>Ce.mutate({mutation:He,variables:{id:e}}),ot=e=>Ce.mutate({mutation:Qe,variables:{id:e}}),lt=e=>Ce.query({query:Me,variables:{id:e}}),dt=e=>Ce.query({query:Le,variables:{sellerId:e},fetchPolicy:"network-only"}),ct=e=>Ce.query({query:qe,variables:{sellerId:e},fetchPolicy:"network-only"}),mt=()=>Ce.query({query:Oe,fetchPolicy:"network-only"}),ht=()=>Ce.query({query:Te,fetchPolicy:"network-only"}),pt=e=>Ce.query({query:Fe,variables:{flatId:e},fetchPolicy:"network-only"}),gt=e=>Ce.query({query:Re,variables:{id:e},fetchPolicy:"network-only"}),ut=e=>Ce.mutate({mutation:Ze,variables:e}),yt=e=>Ce.mutate({mutation:Ye,variables:e}),xt=k("flats/fetchFlats",async()=>(await Ce.query({query:Ae,fetchPolicy:"cache-first"})).data.flats),_t=k("flats/fetchFlatsByLocation",async e=>(await Ce.query({query:Ee,variables:{location:e},fetchPolicy:"network-only"})).data.searchFlats),ft=I({reducer:{flats:$({name:"flats",initialState:{flats:[],loading:!1,error:null},reducers:{},extraReducers:e=>{e.addCase(xt.pending,e=>{e.loading=!0}).addCase(xt.fulfilled,(e,t)=>{e.loading=!1,e.flats=t.payload}).addCase(xt.rejected,(e,t)=>{e.loading=!1,e.error=t.error.message}).addCase(_t.pending,e=>{e.loading=!0}).addCase(_t.fulfilled,(e,t)=>{e.loading=!1,e.flats=t.payload}).addCase(_t.rejected,(e,t)=>{e.loading=!1,e.error=t.error.message})}}).reducer}});u.createRoot(document.getElementById("root")).render(a.jsx(p.StrictMode,{children:a.jsx(N,{store:ft,children:a.jsx(w,{client:Ce,children:a.jsx(Ie,{})})})}));export{M as A,ie as B,We as C,X as D,De as G,R as H,G as L,Ne as R,Ee as S,H as U,Xe as V,W as X,xt as a,ht as b,O as c,pt as d,V as e,_t as f,mt as g,tt as h,it as i,ot as j,yt as k,et as l,rt as m,nt as n,Ke as o,lt as p,at as q,Je as r,K as s,Te as t,st as u,Ae as v,ct as w,dt as x,gt as y,ut as z};
