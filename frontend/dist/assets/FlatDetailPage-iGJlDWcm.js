import{s as A,d as E,r as p,e as D,g as F,_ as z,j as s,h as L,i as k,k as l,l as I,m as R,T,C as U,n as S,a as V,o as W,P as H,p as G,q as $}from"./index-CBM3D9GY.js";import{B as q}from"./Button-nHUDg026.js";const K=["className","component"];function J(e={}){const{themeId:t,defaultTheme:a,defaultClassName:n="MuiBox-root",generateClassName:r}=e,i=A("div",{shouldForwardProp:c=>c!=="theme"&&c!=="sx"&&c!=="as"})(E);return p.forwardRef(function(b,f){const u=D(a),x=F(b),{className:g,component:d="div"}=x,o=z(x,K);return s.jsx(i,L({as:d,ref:f,className:k(g,r?r(n):n),theme:t&&u[t]||u},o))})}var M={},v={};Object.defineProperty(v,"__esModule",{value:!0});v.cssValue=v.parseLengthAndUnit=void 0;var Q={cm:!0,mm:!0,in:!0,px:!0,pt:!0,pc:!0,em:!0,ex:!0,ch:!0,rem:!0,vw:!0,vh:!0,vmin:!0,vmax:!0,"%":!0};function B(e){if(typeof e=="number")return{value:e,unit:"px"};var t,a=(e.match(/^[0-9.]*/)||"").toString();a.includes(".")?t=parseFloat(a):t=parseInt(a,10);var n=(e.match(/[^0-9]*$/)||"").toString();return Q[n]?{value:t,unit:n}:(console.warn("React Spinners: ".concat(e," is not a valid css value. Defaulting to ").concat(t,"px.")),{value:t,unit:"px"})}v.parseLengthAndUnit=B;function X(e){var t=B(e);return"".concat(t.value).concat(t.unit)}v.cssValue=X;var _={};Object.defineProperty(_,"__esModule",{value:!0});_.createAnimation=void 0;var Y=function(e,t,a){var n="react-spinners-".concat(e,"-").concat(a);if(typeof window>"u"||!window.document)return n;var r=document.createElement("style");document.head.appendChild(r);var i=r.sheet,m=`
    @keyframes `.concat(n,` {
      `).concat(t,`
    }
  `);return i&&i.insertRule(m,0),n};_.createAnimation=Y;var y=l&&l.__assign||function(){return y=Object.assign||function(e){for(var t,a=1,n=arguments.length;a<n;a++){t=arguments[a];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},y.apply(this,arguments)},Z=l&&l.__createBinding||(Object.create?function(e,t,a,n){n===void 0&&(n=a);var r=Object.getOwnPropertyDescriptor(t,a);(!r||("get"in r?!t.__esModule:r.writable||r.configurable))&&(r={enumerable:!0,get:function(){return t[a]}}),Object.defineProperty(e,n,r)}:function(e,t,a,n){n===void 0&&(n=a),e[n]=t[a]}),ee=l&&l.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),te=l&&l.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var a in e)a!=="default"&&Object.prototype.hasOwnProperty.call(e,a)&&Z(t,e,a);return ee(t,e),t},ae=l&&l.__rest||function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]]);return a};Object.defineProperty(M,"__esModule",{value:!0});var w=te(p),N=v,C=_,ne=(0,C.createAnimation)("DotLoader","100% {transform: rotate(360deg)}","rotate"),re=(0,C.createAnimation)("DotLoader","0%, 100% {transform: scale(0)} 50% {transform: scale(1.0)}","bounce");function se(e){var t=e.loading,a=t===void 0?!0:t,n=e.color,r=n===void 0?"#000000":n,i=e.speedMultiplier,m=i===void 0?1:i,c=e.cssOverride,b=c===void 0?{}:c,f=e.size,u=f===void 0?60:f,x=ae(e,["loading","color","speedMultiplier","cssOverride","size"]),g=y({display:"inherit",position:"relative",width:(0,N.cssValue)(u),height:(0,N.cssValue)(u),animationFillMode:"forwards",animation:"".concat(ne," ").concat(2/m,"s 0s infinite linear")},b),d=function(o){var j=(0,N.parseLengthAndUnit)(u),O=j.value,P=j.unit;return{position:"absolute",top:o%2?"0":"auto",bottom:o%2?"auto":"0",height:"".concat(O/2).concat(P),width:"".concat(O/2).concat(P),backgroundColor:r,borderRadius:"100%",animationFillMode:"forwards",animation:"".concat(re," ").concat(2/m,"s ").concat(o===2?"1s":"0s"," infinite linear")}};return a?w.createElement("span",y({style:g},x),w.createElement("span",{style:d(1)}),w.createElement("span",{style:d(2)})):null}var oe=M.default=se;function ie({loading:e}){return s.jsx("div",{className:"flex justify-center items-center py-4",children:s.jsx(oe,{loading:e,color:"#76ABAE",size:60,speedMultiplier:3})})}const le=I("MuiBox",["root"]),ce=R(),h=J({themeId:T,defaultTheme:ce,defaultClassName:le.root,generateClassName:U.generate}),ue=S(s.jsx("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z"}),"Add"),de=S(s.jsx("path",{d:"M19 13H5v-2h14z"}),"Remove"),pe=()=>{const e=V(),{id:t}=W(),[a,n]=p.useState(null),[r,i]=p.useState(1),[m,c]=p.useState(!0),[b,f]=p.useState(null),u=async()=>{var d;if(localStorage.getItem("token"))if(localStorage.getItem("role")=="customer")try{const o={flat:t,timePeriod:r,totalPrice:a.price*r},j=await G(o);j.status===201||j.status===200?e("/bookings"):f("Failed to create booking. Please try again.")}catch(o){console.error("Error creating booking:",((d=o.response)==null?void 0:d.data)||o.message),f("An error occurred while creating the booking. Please try again.")}else e("/");else{e("/login");return}};p.useEffect(()=>{(async()=>{const{data:o}=await $(t);n(o),c(!1)})()},[t]);const x=()=>{i(r+1)},g=()=>{i(r>1?r-1:1)};return s.jsxs("div",{className:"w-full",children:[s.jsx(ie,{loading:m}),a&&s.jsx(H,{elevation:6,className:"p-6",children:s.jsxs(h,{className:"flex flex-col md:flex-row justify-between items-start md:gap-12",children:[s.jsx(h,{className:"w-full md:w-1/2",children:s.jsx("img",{className:"w-3/5 h-auto rounded-lg mx-auto",src:a.images,alt:a.name})}),s.jsxs(h,{className:"w-full md:w-1/2 mt-8 md:mt-0",children:[s.jsx("h1",{className:"font-bold text-6xl",children:a.name}),s.jsxs("p",{className:"text-2xl text-gray-600",children:[a.location,", India"]}),s.jsx("h4",{className:"text-zinc-500 mt-4 ",children:"Details"}),s.jsx("p",{className:"text-xl",children:a.description}),s.jsxs(h,{className:"font-semibold flex gap-8 mt-4",children:[s.jsxs("p",{className:"text-zinc-600 text-xl",children:["Capacity: ",a.capacity," guests"]}),s.jsxs("p",{className:"text-zinc-600 text-xl",children:["Price: ₹",a.price," / month"]})]}),s.jsxs("p",{className:"text-zinc-600 text-xl",children:["Owner's Name: ",a.seller]}),s.jsxs(h,{className:"mt-8 flex flex-col justify-center",children:[s.jsx("h2",{className:"text-3xl mb-4",children:"Book Flat for:"}),s.jsxs(h,{className:"flex items-center gap-6 mb-4",children:[s.jsx("button",{className:"rounded-full bg-zinc-400 text-white p-2",onClick:g,children:s.jsx(de,{fontSize:"small"})}),s.jsxs("span",{className:"text-2xl",children:[r," month",r>1&&"s"]}),s.jsx("button",{className:"rounded-full bg-zinc-400 text-white p-2",onClick:x,children:s.jsx(ue,{fontSize:"small"})})]})]}),s.jsx(q,{variant:"contained",className:"w-full mt-6",sx:{py:"0.75rem",backgroundColor:"#76ABAE",fontSize:"1.25rem",fontWeight:"bold","&:hover":{backgroundColor:"#5B8D91"}},onClick:u,children:"BOOK NOW"})]})]})})]})};export{pe as default};
