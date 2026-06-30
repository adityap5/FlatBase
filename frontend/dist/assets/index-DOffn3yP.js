const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/HomePage-CE76g1l0.js","assets/vendor-react-BfIcaa-z.js","assets/vendor-apollo-CFokNTHK.js","assets/FlatCard-DBte_Dja.js","assets/vendor-motion-s60h-f02.js","assets/vendor-utils-BfZlBlAz.js","assets/HomeCardShimmer-WiNyk8me.js","assets/vendor-redux-BWtZZYe-.js","assets/HomePage-BpvcMwrr.css","assets/FlatDetailPage-BlrXflNK.js","assets/LoginPage-91vvDJp2.js","assets/RegisterPage-D_OO1GuE.js","assets/LogoutPage-B-P2SnwB.js","assets/AddFlatPage-Dfm3nTGf.js","assets/SearchResultsPage-DrQUI7lR.js","assets/BookingPage-DwQx4JOY.js","assets/MyListings-BXSxoI4q.js","assets/Checkout-CXsuxBxe.js","assets/UpdatePage-CMRWl2EY.js","assets/Category-BPwdV2kf.js","assets/Success-D4kNmS2J.js","assets/SellerDashboard-KnqYE8Zf.js","assets/SellerProfilePage-DGxFdlte.js","assets/SellerAnalytics-BdnnHIo8.js","assets/vendor-charts-IEpLyvyt.js","assets/SellerLayout-DAN-ouME.js"])))=>i.map(i=>d[i]);
var e=Object.defineProperty,t=(t,a,i)=>((t,a,i)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[a]=i)(t,"symbol"!=typeof a?a+"":a,i);import{u as a,r as i,c as s,j as n,N as r,L as o,B as l,d,e as c,f as m,b as h}from"./vendor-react-BfIcaa-z.js";import{m as g,A as p}from"./vendor-motion-s60h-f02.js";import{L as u,C as x,U as _,a as y,B as f,M as b,X as j,b as v,T as w,H as k}from"./vendor-utils-BfZlBlAz.js";import{c as I,A as $,I as N,s as S,a as P,b as E}from"./vendor-apollo-CFokNTHK.js";import{i as C,c as A,g as D,P as L}from"./vendor-redux-BWtZZYe-.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)}).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const q={},T=function(e,t,a){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),a=(null==e?void 0:e.nonce)||(null==e?void 0:e.getAttribute("nonce"));i=Promise.all(t.map(e=>{if((e=function(e){return"/"+e}(e))in q)return;q[e]=!0;const t=e.endsWith(".css"),i=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${i}`))return;const s=document.createElement("link");return s.rel=t?"stylesheet":"modulepreload",t||(s.as="script",s.crossOrigin=""),s.href=e,a&&s.setAttribute("nonce",a),document.head.appendChild(s),t?new Promise((t,a)=>{s.addEventListener("load",t),s.addEventListener("error",()=>a(new Error(`Unable to preload CSS for ${e}`)))}):void 0}))}return i.then(()=>e()).catch(e=>{const t=new Event("vite:preloadError",{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e})},z=/^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;function O(e="",t=!0,a=!0){let i=e||"";return t&&(i=e.toString().trim().replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g,(e,t,a)=>t>0&&t+e.length!==a.length&&e.search(z)>-1&&":"!==a.charAt(t-2)&&("-"!==a.charAt(t+e.length)||"-"===a.charAt(t-1))&&a.charAt(t-1).search(/[^\s-]/)<0?e.toLowerCase():e.substr(1).search(/[A-Z]|\../)>-1?e:e.charAt(0).toUpperCase()+e.substr(1))),a&&(i=function(e){return"string"==typeof(t=e)&&-1!==t.indexOf("@")?"REDACTED (Potential Email Address)":e;var t}(i)),i}var F=new class{constructor(){t(this,"isInitialized"),t(this,"_testMode"),t(this,"_currentMeasurementId"),t(this,"_hasLoadedGA"),t(this,"_isQueuing"),t(this,"_queueGtag"),t(this,"reset",()=>{this.isInitialized=!1,this._testMode=!1,this._currentMeasurementId="",this._hasLoadedGA=!1,this._isQueuing=!1,this._queueGtag=[]}),t(this,"_gtag",(...e)=>{this._testMode||this._isQueuing?this._queueGtag.push(e):((...e)=>{"undefined"!=typeof window&&(void 0===window.gtag&&(window.dataLayer=window.dataLayer||[],window.gtag=function(){window.dataLayer.push(arguments)}),window.gtag(...e))})(...e)}),t(this,"_loadGA",(e,t,a="https://www.googletagmanager.com/gtag/js")=>{if("undefined"!=typeof window&&"undefined"!=typeof document&&!this._hasLoadedGA){const i=document.createElement("script");i.async=!0,i.src=`${a}?id=${e}`,t&&i.setAttribute("nonce",t),document.body.appendChild(i),window.dataLayer=window.dataLayer||[],window.gtag=function(){window.dataLayer.push(arguments)},this._hasLoadedGA=!0}}),t(this,"_toGtagOptions",e=>{if(!e)return;const t={cookieUpdate:"cookie_update",cookieExpires:"cookie_expires",cookieDomain:"cookie_domain",cookieFlags:"cookie_flags",userId:"user_id",clientId:"client_id",anonymizeIp:"anonymize_ip",contentGroup1:"content_group1",contentGroup2:"content_group2",contentGroup3:"content_group3",contentGroup4:"content_group4",contentGroup5:"content_group5",allowAdFeatures:"allow_google_signals",allowAdPersonalizationSignals:"allow_ad_personalization_signals",nonInteraction:"non_interaction",page:"page_path",hitCallback:"event_callback"};return Object.entries(e).reduce((e,[a,i])=>(t[a]?e[t[a]]=i:e[a]=i,e),{})}),t(this,"initialize",(e,t={})=>{if(!e)throw new Error("Require GA_MEASUREMENT_ID");const a="string"==typeof e?[{trackingId:e}]:e;this._currentMeasurementId=a[0].trackingId;const{gaOptions:i,gtagOptions:s,nonce:n,testMode:r=!1,gtagUrl:o}=t;if(this._testMode=r,r||this._loadGA(this._currentMeasurementId,n,o),this.isInitialized||(this._gtag("js",new Date),a.forEach(e=>{const t={...this._toGtagOptions({...i,...e.gaOptions}),...s,...e.gtagOptions};Object.keys(t).length?this._gtag("config",e.trackingId,t):this._gtag("config",e.trackingId)})),this.isInitialized=!0,!r){const e=[...this._queueGtag];for(this._queueGtag=[],this._isQueuing=!1;e.length;){const t=e.shift();this._gtag(...t),"get"===t[0]&&(this._isQueuing=!0)}}}),t(this,"set",e=>{e&&"object"==typeof e&&(Object.keys(e).length,this._gaCommand("set",e))}),t(this,"_gaCommandSendEvent",(e,t,a,i,s)=>{this._gtag("event",t,{event_category:e,event_label:a,value:i,...s&&{non_interaction:s.nonInteraction},...this._toGtagOptions(s)})}),t(this,"_gaCommandSendEventParameters",(...e)=>{if("string"==typeof e[0])this._gaCommandSendEvent(...e.slice(1));else{const{eventCategory:t,eventAction:a,eventLabel:i,eventValue:s,hitType:n,...r}=e[0];this._gaCommandSendEvent(t,a,i,s,r)}}),t(this,"_gaCommandSendTiming",(e,t,a,i)=>{this._gtag("event","timing_complete",{name:t,value:a,event_category:e,event_label:i})}),t(this,"_gaCommandSendPageview",(e,t)=>{if(t&&Object.keys(t).length){const{title:a,location:i,...s}=this._toGtagOptions(t)||{};this._gtag("event","page_view",{...e&&{page_path:e},...a&&{page_title:a},...i&&{page_location:i},...s})}else e?this._gtag("event","page_view",{page_path:e}):this._gtag("event","page_view")}),t(this,"_gaCommandSendPageviewParameters",(...e)=>{if("string"==typeof e[0])this._gaCommandSendPageview(...e.slice(1));else{const{page:t,hitType:a,...i}=e[0];this._gaCommandSendPageview(t,i)}}),t(this,"_gaCommandSend",(...e)=>{switch("string"==typeof e[0]?e[0]:e[0].hitType){case"event":this._gaCommandSendEventParameters(...e);break;case"pageview":this._gaCommandSendPageviewParameters(...e);break;case"timing":this._gaCommandSendTiming(...e.slice(1))}}),t(this,"_gaCommandSet",(...e)=>{"string"==typeof e[0]&&(e[0]={[e[0]]:e[1]}),this._gtag("set",this._toGtagOptions(e[0]))}),t(this,"_gaCommand",(e,...t)=>{switch(e){case"send":this._gaCommandSend(...t);break;case"set":this._gaCommandSet(...t)}}),t(this,"ga",(...e)=>{if("string"==typeof e[0])this._gaCommand(...e);else{const[t]=e;this._gtag("get",this._currentMeasurementId,"client_id",e=>{this._isQueuing=!1;const a=this._queueGtag;for(t({get:t=>"clientId"===t?e:"trackingId"===t?this._currentMeasurementId:"apiVersion"===t?"1":void 0});a.length;){const e=a.shift();this._gtag(...e)}}),this._isQueuing=!0}return this.ga}),t(this,"event",(e,t)=>{if("string"==typeof e)this._gtag("event",e,this._toGtagOptions(t));else{const{action:t,category:a,label:i,value:s,nonInteraction:n,transport:r}=e;if(!a||!t)return;const o={hitType:"event",eventCategory:O(a),eventAction:O(t)};i&&(o.eventLabel=O(i)),void 0!==s&&("number"!=typeof s||(o.eventValue=s)),void 0!==n&&("boolean"!=typeof n||(o.nonInteraction=n)),void 0!==r&&("string"!=typeof r||(["beacon","xhr","image"].indexOf(r),o.transport=r)),this._gaCommand("send",o)}}),t(this,"send",e=>{this._gaCommand("send",e)}),this.reset()}gtag(...e){this._gtag(...e)}};const R=({children:e})=>{const{pathname:t}=a();return i.useLayoutEffect(()=>{document.documentElement.scrollTo(0,0)},[t]),e};function G(){const e=s();return n.jsxs(g.button,{whileHover:{scale:1.02},whileTap:{scale:.98},onClick:()=>{localStorage.removeItem("token"),localStorage.removeItem("role"),localStorage.removeItem("userId"),e("/logout")},className:"flex items-center text-on-surface-variant hover:text-error transition-colors duration-300 font-body text-xs font-bold uppercase tracking-wider gap-1.5",children:[n.jsx(u,{size:14,className:"text-glow-purple"}),n.jsx("span",{children:"Logout"})]})}const B=i.memo(()=>{const[e,t]=i.useState(!1),[a,o]=i.useState(!1),l=localStorage.getItem("token"),d="seller"===localStorage.getItem("role"),c="customer"===localStorage.getItem("role"),m=s(),h=e=>a=>{("keydown"!==a.type||"Tab"!==a.key&&"Shift"!==a.key)&&t(e)};i.useEffect(()=>{const e=()=>{o(window.scrollY>20)};return window.addEventListener("scroll",e,{passive:!0}),()=>window.removeEventListener("scroll",e)},[]);const u=i.useMemo(()=>[{name:"Destinations",path:"/category",icon:n.jsx(x,{size:16}),show:!d},{name:"Register",path:"/register",icon:n.jsx(_,{size:16}),show:!l},{name:"Dashboard",path:"/seller/dashboard",icon:n.jsx(y,{size:16}),show:d},{name:"My Bookings",path:"/bookings",icon:n.jsx(f,{size:16}),show:c}],[l,d,c]);return n.jsxs(n.Fragment,{children:[n.jsx(g.nav,{initial:{y:-100,x:"-50%",opacity:0},animate:{y:0,x:"-50%",opacity:1},transition:{duration:.8,ease:[.16,1,.3,1]},className:"fixed top-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-300 border rounded-full "+(a?"py-3 bg-surface/90 backdrop-blur-[25px] border-white/10 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.8)]":"py-5 bg-glass-white backdrop-blur-[15px] border-glass-border shadow-sm"),children:n.jsxs("div",{className:"flex justify-between items-center w-full px-6 md:px-8 h-10",children:[n.jsx(g.div,{whileHover:{scale:1.02},whileTap:{scale:.98},className:"flex items-center cursor-pointer gap-2",onClick:()=>{m("/")},children:n.jsx("span",{className:"font-display text-xl font-bold tracking-widest text-on-background hover:text-primary transition-colors duration-300 text-glow",children:"FLATBASE"})}),n.jsx("div",{className:"hidden md:flex gap-8 items-center",children:u.filter(e=>e.show).map(e=>n.jsx(r,{to:e.path,className:({isActive:e})=>e?"text-primary font-bold border-b-2 border-primary pb-1 font-body text-xs tracking-wider uppercase transition-all":"text-on-surface-variant hover:text-on-background transition-colors duration-300 font-body text-xs tracking-wider uppercase",children:n.jsx("div",{className:"flex items-center gap-1.5",children:e.name})},e.path))}),n.jsxs("div",{className:"flex items-center gap-4",children:[l?n.jsx("div",{className:"hidden md:block",children:n.jsx(G,{})}):n.jsx("button",{onClick:()=>m("/login"),className:"hidden md:block bg-primary text-on-primary px-5 py-2 rounded-full font-body font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] hover:brightness-110 active:scale-95 transition-all duration-300",children:"Sign In"}),n.jsx("div",{className:"md:hidden",children:n.jsx(g.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:h(!0),className:"p-1.5 rounded-full text-primary hover:bg-glass-white border border-transparent hover:border-glass-border transition-all",children:n.jsx(b,{size:20})})})]})]})}),n.jsx("div",{className:"h-28"}),n.jsx(p,{children:e&&n.jsxs(g.div,{initial:{x:"100%"},animate:{x:0},exit:{x:"100%"},transition:{type:"tween",duration:.3},className:"fixed inset-y-0 right-0 z-50 w-64 bg-surface-container-low/95 backdrop-blur-[20px] border-l border-glass-border shadow-2xl flex flex-col",children:[n.jsxs("div",{className:"flex justify-between items-center p-6 border-b border-glass-border",children:[n.jsx("h2",{className:"text-lg font-bold font-display text-primary tracking-wider uppercase",children:"Menu"}),n.jsx(g.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:h(!1),className:"p-2 rounded-full text-primary hover:bg-glass-white border border-glass-border",children:n.jsx(j,{size:18})})]}),n.jsx("div",{className:"flex-1 overflow-y-auto py-6",children:n.jsxs("nav",{className:"flex flex-col space-y-2 px-6",children:[u.filter(e=>e.show).map(e=>n.jsxs(r,{to:e.path,onClick:h(!1),className:({isActive:e})=>(e?"bg-primary/10 text-primary font-bold border border-primary/20":"text-on-surface-variant hover:bg-glass-white hover:text-white border border-transparent")+" flex items-center px-4 py-3 rounded-xl transition-all duration-200 font-body text-xs tracking-wider uppercase",children:[n.jsx("span",{className:"mr-3",children:e.icon}),e.name]},e.path)),l?n.jsx("div",{onClick:h(!1),className:"pt-4 border-t border-glass-border mt-4",children:n.jsx(G,{})}):n.jsx("button",{onClick:()=>{m("/login"),t(!1)},className:"w-full mt-4 bg-primary text-on-primary py-3 rounded-full font-body font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all duration-300",children:"Sign In"})]})})]})}),e&&n.jsx(g.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.2},className:"fixed inset-0 bg-background/60 backdrop-blur-sm z-40",onClick:h(!1)})]})}),M=({children:e})=>n.jsx(g.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.3},children:e}),V=({minimal:e=!1})=>e?n.jsx("div",{className:"flex justify-center items-center py-12",children:n.jsx(g.div,{animate:{rotate:360},transition:{duration:1,repeat:Number.POSITIVE_INFINITY,ease:"linear"},children:n.jsx(v,{size:32,className:"text-[#76ABAE]"})})}):n.jsxs("div",{className:"h-screen flex flex-col justify-center items-center",children:[n.jsx(g.div,{initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.5},className:"mb-6",children:n.jsx(g.div,{animate:{rotate:360},transition:{duration:1.5,repeat:Number.POSITIVE_INFINITY,ease:"linear"},children:n.jsx(v,{size:48,className:"text-[#76ABAE]"})})}),n.jsx(g.h1,{initial:{y:20,opacity:0},animate:{y:0,opacity:1},transition:{delay:.3,duration:.5},className:"text-3xl font-bold tracking-tight",children:"DISCOVER BOOK LIVE"})]});function U({name:e,css:t="",variant:a="primary",fullWidth:i=!1,onClick:s,type:r="button"}){const o="primary"===a?"bg-primary text-on-primary hover:brightness-110 hover:shadow-[0_0_20px_rgba(0,245,255,0.4)]":"motionsite-card border-glass-border text-on-surface hover:text-on-primary hover:bg-primary hover:border-primary",l=i?"w-full":"";return n.jsx("button",{type:r,onClick:s,className:`px-6 py-2.5 rounded-full font-body font-bold text-xs tracking-wider uppercase transition-all duration-300 active:scale-[0.98] select-none ${o} ${l} ${t}`,children:e})}const H=()=>n.jsxs("div",{className:"flex flex-col items-center justify-center min-h-[70vh] px-4 text-center",children:[n.jsx(g.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.5},className:"mb-8",children:n.jsx("div",{className:"bg-red-100 p-6 rounded-full inline-block",children:n.jsx(w,{size:60,className:"text-red-500"})})}),n.jsx(g.h1,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.2,duration:.5},className:"text-5xl md:text-7xl font-bold mb-4 text-gray-800",children:"404"}),n.jsx(g.h2,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.3,duration:.5},className:"text-2xl md:text-3xl font-semibold mb-4 text-gray-700",children:"Page Not Found"}),n.jsx(g.p,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.4,duration:.5},className:"text-gray-600 max-w-md mb-8",children:"The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."}),n.jsx(g.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.5,duration:.5},children:n.jsx(o,{to:"/",children:n.jsx(U,{name:n.jsxs("div",{className:"flex items-center",children:[n.jsx(k,{size:18,className:"mr-2"}),n.jsx("span",{children:"Back to Home"})]})})})})]}),Q=i.memo(function(){const e=i.useMemo(()=>(new Date).getFullYear(),[]);return n.jsxs("footer",{className:"site-footer mt-20",children:[n.jsx("div",{className:"footer-dots","aria-hidden":"true",children:n.jsx("div",{className:"footer-dots__line"})}),n.jsxs("div",{className:"site-footer__inner",children:[n.jsxs("div",{className:"site-footer__top",children:[n.jsx("h2",{className:"site-footer__heading",children:"Curated escapes for the modern collector."}),n.jsxs("nav",{className:"site-footer__nav","aria-label":"Footer navigation",children:[n.jsx("a",{href:"#company",className:"site-footer__link",children:"Company"}),n.jsx("a",{href:"#technology",className:"site-footer__link",children:"Technology"}),n.jsx("a",{href:"#solutions",className:"site-footer__link",children:"Solutions"}),n.jsx("a",{href:"#our-edge",className:"site-footer__link",children:"Our Edge"}),n.jsx("a",{href:"#investors",className:"site-footer__link",children:"Investors"})]}),n.jsxs("nav",{className:"site-footer__nav","aria-label":"Company links",children:[n.jsx("a",{href:"#our-team",className:"site-footer__link",children:"Our Team"}),n.jsx("a",{href:"#news",className:"site-footer__link",children:"News"}),n.jsx("a",{href:"#careers",className:"site-footer__link",children:"Careers"}),n.jsx("a",{href:"#contact",className:"site-footer__link",children:"Contact Us"})]}),n.jsxs("nav",{className:"site-footer__nav","aria-label":"Social links",children:[n.jsx("a",{href:"https://www.linkedin.com",target:"_blank",rel:"noreferrer",className:"site-footer__link",children:"LinkedIn"}),n.jsx("a",{href:"https://x.com",target:"_blank",rel:"noreferrer",className:"site-footer__link",children:"Follow Us on X"})]})]}),n.jsx("div",{className:"site-footer__brand-row",children:n.jsxs("a",{href:"/",className:"site-footer__brand","aria-label":"FlatBase home",children:[n.jsx("span",{className:"site-footer__mark","aria-hidden":"true"}),n.jsx("span",{className:"site-footer__wordmark",children:"FlatBase"})]})}),n.jsxs("div",{className:"site-footer__legal",children:[n.jsxs("span",{children:["© ",e," FlatBase. All rights reserved."]}),n.jsx("a",{href:"#privacy",children:"Privacy Policy"}),n.jsx("a",{href:"#terms",children:"Terms of Service"})]})]})]})}),W=i.lazy(()=>T(()=>import("./HomePage-CE76g1l0.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8]))),Y=i.lazy(()=>T(()=>import("./FlatDetailPage-BlrXflNK.js"),__vite__mapDeps([9,1,2,5,4,7]))),Z=i.lazy(()=>T(()=>import("./LoginPage-91vvDJp2.js"),__vite__mapDeps([10,1,2,4,5,7]))),K=i.lazy(()=>T(()=>import("./RegisterPage-D_OO1GuE.js"),__vite__mapDeps([11,1,2,4,5,7]))),X=i.lazy(()=>T(()=>import("./LogoutPage-B-P2SnwB.js"),__vite__mapDeps([12,1,2,4,5]))),J=i.lazy(()=>T(()=>import("./AddFlatPage-Dfm3nTGf.js"),__vite__mapDeps([13,1,2,5,4,7]))),ee=i.lazy(()=>T(()=>import("./SearchResultsPage-DrQUI7lR.js"),__vite__mapDeps([14,1,2,7,3,4,5,6]))),te=i.lazy(()=>T(()=>import("./BookingPage-DwQx4JOY.js"),__vite__mapDeps([15,1,2,5,4,7]))),ae=i.lazy(()=>T(()=>import("./MyListings-BXSxoI4q.js"),__vite__mapDeps([16,1,2,4,5,7]))),ie=i.lazy(()=>T(()=>import("./Checkout-CXsuxBxe.js"),__vite__mapDeps([17,1,2,4,5,7]))),se=i.lazy(()=>T(()=>import("./UpdatePage-CMRWl2EY.js"),__vite__mapDeps([18,1,2,4,5,7]))),ne=i.lazy(()=>T(()=>import("./Category-BPwdV2kf.js"),__vite__mapDeps([19,1,2,4,5,6,7]))),re=i.lazy(()=>T(()=>import("./Success-D4kNmS2J.js"),__vite__mapDeps([20,1,2,5]))),oe=i.lazy(()=>T(()=>import("./SellerDashboard-KnqYE8Zf.js"),__vite__mapDeps([21,1,2,5,4,7]))),le=i.lazy(()=>T(()=>import("./SellerProfilePage-DGxFdlte.js"),__vite__mapDeps([22,1,2,5,4,7]))),de=i.lazy(()=>T(()=>import("./SellerAnalytics-BdnnHIo8.js"),__vite__mapDeps([23,1,2,5,24,7,4]))),ce=i.lazy(()=>T(()=>import("./SellerLayout-DAN-ouME.js"),__vite__mapDeps([25,1,2,5]))),me=i.memo(function(){return n.jsxs("div",{className:"fixed top-0 -z-10 h-full w-full bg-background overflow-hidden","aria-hidden":"true",children:[n.jsx("div",{className:"glowing-blob w-[500px] h-[500px] bg-primary/10 top-[-10%] right-[5%]"}),n.jsx("div",{className:"glowing-blob w-[600px] h-[600px] bg-secondary/5 top-[30%] left-[-10%]",style:{animationDelay:"-5s"}}),n.jsx("div",{className:"glowing-blob w-[400px] h-[400px] bg-accent/10 bottom-[10%] right-[10%]",style:{animationDelay:"-10s"}}),n.jsx("div",{className:"absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px]"})]})}),he=()=>{const e=a();return i.useEffect(()=>{F.send({hitType:"pageview",page:e.pathname+e.search})},[e]),null},ge=({children:e})=>{const t=a(),s=i.useMemo(()=>t.pathname.startsWith("/seller")||t.pathname.startsWith("/mylistings")||t.pathname.startsWith("/add-flat")||t.pathname.startsWith("/updatePage"),[t.pathname]);return n.jsxs(n.Fragment,{children:[!s&&n.jsx(B,{}),e,!s&&n.jsx(Q,{})]})},pe=()=>(i.useEffect(()=>{const e=()=>F.initialize("G-34YS1ZRZTT");"function"==typeof window.requestIdleCallback?window.requestIdleCallback(e,{timeout:3e3}):setTimeout(e,1e3)},[]),n.jsxs(n.Fragment,{children:[n.jsx(me,{}),n.jsx("div",{className:"min-h-screen w-full flex flex-col font-body bg-background text-on-background",children:n.jsxs(l,{children:[n.jsx(he,{}),n.jsx(R,{children:n.jsx(i.Suspense,{fallback:n.jsx(V,{minimal:!0}),children:n.jsx(ge,{children:n.jsx(p,{mode:"sync",children:n.jsxs(d,{children:[n.jsx(c,{path:"/",element:n.jsx(M,{children:n.jsx(W,{})})}),n.jsx(c,{path:"/flat/:id",element:n.jsx(M,{children:n.jsx(Y,{})})}),n.jsx(c,{path:"/search",element:n.jsx(M,{children:n.jsx(ee,{})})}),n.jsx(c,{path:"/category",element:n.jsx(M,{children:n.jsx(ne,{})})}),n.jsx(c,{path:"/success",element:n.jsx(M,{children:n.jsx(re,{})})}),n.jsx(c,{path:"/logout",element:n.jsx(M,{children:n.jsx(X,{})})}),n.jsx(c,{path:"/bookings",element:n.jsx(M,{children:n.jsx(te,{})})}),n.jsx(c,{path:"/checkout/:id",element:n.jsx(M,{children:n.jsx(ie,{})})}),n.jsx(c,{path:"/login",element:n.jsx(M,{children:n.jsx(Z,{})})}),n.jsx(c,{path:"/register",element:n.jsx(M,{children:n.jsx(K,{})})}),n.jsxs(c,{element:n.jsx(ce,{}),children:[n.jsx(c,{path:"/seller/dashboard",element:n.jsx(oe,{})}),n.jsx(c,{path:"/seller/profile",element:n.jsx(le,{})}),n.jsx(c,{path:"/seller/analytics",element:n.jsx(de,{})}),n.jsx(c,{path:"/mylistings",element:n.jsx(ae,{})}),n.jsx(c,{path:"/add-flat",element:n.jsx(J,{})}),n.jsx(c,{path:"/updatePage/:id",element:n.jsx(se,{})})]}),n.jsx(c,{path:"/*",element:n.jsx(M,{children:n.jsx(H,{})})})]})})})})})]})})]})),ue=I({uri:"https://flatbase.onrender.com/graphql"}),xe=new $({link:S((e,{headers:t})=>{const a=localStorage.getItem("token");return{headers:{...t,authorization:a?`Bearer ${a}`:""}}}).concat(ue),cache:new N}),_e=P`
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
`,ye=P`
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
`,fe=P`
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
`,be=P`
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
`,je=P`
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
`,ve=P`
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
`,we=P`
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
`,ke=P`
  query PopularCities {
    popularCities {
      city
      count
      image
    }
  }
`,Ie=P`
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
`,$e=P`
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
`,Ne=P`
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
`,Se=P`
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
`,Pe=P`
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
`,Ee=P`
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
`,Ce=P`
  mutation DeleteFlat($id: ID!) {
    deleteFlat(id: $id)
  }
`,Ae=P`
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
`,De=P`
  mutation DeleteBooking($id: ID!) {
    deleteBooking(id: $id)
  }
`,Le=P`
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
`,qe=P`
  mutation UpdateSellerProfile($id: ID!, $name: String, $email: String, $phone: String, $bio: String) {
    updateSellerProfile(id: $id, name: $name, email: $email, phone: $phone, bio: $bio) {
      _id
      name
      email
      phone
      bio
    }
  }
`,Te=P`
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
`,ze=e=>xe.mutate({mutation:Ne,variables:e}),Oe=e=>xe.mutate({mutation:Se,variables:e}),Fe=e=>xe.mutate({mutation:Pe,variables:e}),Re=e=>xe.query({query:ye,variables:{id:e}}),Ge=e=>xe.query({query:be,variables:{userId:e}}),Be=e=>xe.query({query:_e,fetchPolicy:"network-only"}).then(t=>t.data.flats.filter(t=>t.seller._id===e)),Me=(e,t)=>xe.mutate({mutation:Ee,variables:{id:e,...t}}),Ve=e=>xe.mutate({mutation:Ce,variables:{id:e}}),Ue=e=>xe.mutate({mutation:De,variables:{id:e}}),He=e=>xe.query({query:Le,variables:{id:e}}),Qe=e=>xe.query({query:je,variables:{sellerId:e},fetchPolicy:"network-only"}),We=e=>xe.query({query:ve,variables:{sellerId:e},fetchPolicy:"network-only"}),Ye=()=>xe.query({query:we,fetchPolicy:"network-only"}),Ze=()=>xe.query({query:ke,fetchPolicy:"network-only"}),Ke=e=>xe.query({query:Ie,variables:{flatId:e},fetchPolicy:"network-only"}),Xe=e=>xe.query({query:$e,variables:{id:e},fetchPolicy:"network-only"}),Je=e=>xe.mutate({mutation:qe,variables:e}),et=e=>xe.mutate({mutation:Te,variables:e}),tt=C("flats/fetchFlats",async()=>(await xe.query({query:_e,fetchPolicy:"cache-first"})).data.flats),at=C("flats/fetchFlatsByLocation",async e=>(await xe.query({query:fe,variables:{location:e},fetchPolicy:"network-only"})).data.searchFlats),it=D({reducer:{flats:A({name:"flats",initialState:{flats:[],loading:!1,error:null},reducers:{},extraReducers:e=>{e.addCase(tt.pending,e=>{e.loading=!0}).addCase(tt.fulfilled,(e,t)=>{e.loading=!1,e.flats=t.payload}).addCase(tt.rejected,(e,t)=>{e.loading=!1,e.error=t.error.message}).addCase(at.pending,e=>{e.loading=!0}).addCase(at.fulfilled,(e,t)=>{e.loading=!1,e.flats=t.payload}).addCase(at.rejected,(e,t)=>{e.loading=!1,e.error=t.error.message})}}).reducer}});m.createRoot(document.getElementById("root")).render(n.jsx(h.StrictMode,{children:n.jsx(L,{store:it,children:n.jsx(E,{client:xe,children:n.jsx(pe,{})})})}));export{Ae as C,ye as G,tt as a,Ze as b,Ke as c,Fe as d,Ge as e,at as f,Ye as g,Ue as h,et as i,Be as j,Ve as k,Oe as l,He as m,Re as n,_e as o,We as p,Qe as q,ze as r,Xe as s,Je as t,Me as u};
