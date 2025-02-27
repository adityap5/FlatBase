import{r as o,a as m,j as e,L as d,v as c}from"./main-JNmrs9IS.js";import"./axios-B4uVmeYG.js";const g=()=>{const[s,l]=o.useState({name:"",email:"",password:"",role:"customer"}),i=m(),t=a=>{l({...s,[a.target.name]:a.target.value})},n=async a=>{a.preventDefault();const{data:r}=await c(s);localStorage.setItem("token",r.token),i("/")};return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8",children:[e.jsx("div",{className:"sm:mx-auto sm:w-full sm:max-w-sm",children:e.jsx("h2",{className:"mt-10 text-center text-2xl font-bold leading-9 tracking-tight ",children:"Register"})}),e.jsxs("div",{className:"mt-10 sm:mx-auto sm:w-full sm:max-w-sm",children:[e.jsxs("form",{onSubmit:n,className:"space-y-6",action:"#",method:"POST",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"name",className:"block text-sm font-medium leading-6 ",children:"Name"}),e.jsx("div",{className:"mt-2",children:e.jsx("input",{value:s.name,onChange:t,id:"name",name:"name",type:"text",autoComplete:"name",required:!0,className:"block w-full font-semibold rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"})})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block text-sm font-medium leading-6",children:"Email address"}),e.jsx("div",{className:"mt-2",children:e.jsx("input",{value:s.email,onChange:t,id:"email",name:"email",type:"email",autoComplete:"email",required:!0,className:"block w-full font-semibold rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"})})]}),e.jsxs("div",{children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsx("label",{htmlFor:"password",className:"block text-sm font-medium leading-6",children:"Password"})}),e.jsx("div",{className:"mt-2",children:e.jsx("input",{value:s.password,onChange:t,id:"password",name:"password",type:"password",autoComplete:"current-password",required:!0,className:"block w-full font-bold rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"})}),e.jsxs("div",{className:"mt-2",children:[e.jsx("label",{htmlFor:"password",className:"block text-sm font-medium leading-6 ",children:"Role"}),e.jsxs("select",{name:"role",value:s.role,onChange:t,className:"shadow  font-bold border rounded w-full p-2 text-gray-800",children:[e.jsx("option",{value:"customer",children:"Customer"}),e.jsx("option",{value:"seller",children:"Seller"})]})]})]}),e.jsx("div",{children:e.jsx("button",{type:"submit",className:"flex w-full justify-center rounded-md bg-[#76ABAE] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-zinc-400 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",children:"Sign up"})})]}),e.jsxs("p",{className:"mt-10 text-center text-sm text-gray-500",children:["Already a member?"," ",e.jsx(d,{to:"/login",className:"font-semibold leading-6 text-[#76ABAE] hover:text-[#85c1c4]",children:"Login"})]})]})]})})};export{g as default};
