import{r as a,U as W,u as z,j as e,N as H,L as T}from"./index-g8GziE3t.js";import{l as B}from"./ees-logo-Bkb-RtId.js";function V(){const{user:S}=a.useContext(W),[p,P]=a.useState(""),[i,q]=a.useState(""),[o,E]=a.useState(""),[v,k]=a.useState(""),[n,A]=a.useState(""),[h,L]=a.useState(""),[f,d]=a.useState(""),[y,u]=a.useState(""),[b,m]=a.useState(""),[j,g]=a.useState(""),[G,x]=a.useState(""),[$,R]=a.useState([]);a.useState("");const[J,w]=a.useState(!1),[s,U]=a.useState({}),[N,C]=a.useState(null);localStorage.getItem("token");const D=z();if(S)return e.jsx(H,{to:"/"});a.useEffect(()=>{const r=new URLSearchParams(location.search).get("referralCode");r&&C(r)},[]);const F=t=>{const r=/^[a-zA-Z0-9]{6,}$/,l=/^(?=.*[A-Z])(?=.*[0-9]).{6,}$/;return/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=!]).{8,}$/.test(t)?"hard":l.test(t)?"medium":r.test(t)?"easy":null},I=()=>{const t={};return p||(t.name="Name is required."),i?i.endsWith("@gmail.com")||(t.email="Email must end with @gmail.com."):t.email="Email is required.",n?(n.length<10||isNaN(n))&&(t.phone="Phone number must be at least 10 digits."):t.phone="Phone number is required.",o?F(o)||(t.password="Password must be at least 6 characters, include an uppercase letter, a number, and a special character."):t.password="Password is required.",o!==v&&(t.confirmpassword="Passwords do not match."),f||(t.area="Area is required."),y||(t.city="City is required."),b||(t.state="State is required."),j||(t.country="Country is required."),h||(t.pincode="Pincode is required."),U(t),Object.keys(t).length===0},M=async t=>{try{const l=await(await fetch(`https://api.postalpincode.in/pincode/${t}`)).json();if(console.log(l),l[0].Status==="Success"){const c=l[0].PostOffice[0];d(c.Name||""),u(c.District||""),m(c.State||""),g(c.Country||""),x("")}else x("Invalid Pincode! Please enter a valid one."),d(""),u(""),m(""),g("")}catch{x("Failed to fetch location details. Try again later.")}},O=t=>{const r=t.target.value.trim();L(r),r.length===6?M(r):(d(""),u(""),m(""),g(""),x(""))},Z=async t=>{if(w(!0),t.preventDefault(),!I()){w(!1);return}let r={area:f,city:y,state:b,country:j,pincode:h};R(r),console.log($,"address"),D("/registernext",{state:{name:p,email:i,password:o,confirmpassword:o,phone:n,address:r,referralCode:N}})};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"container py-24",children:e.jsx("div",{className:"row mx-auto ",children:e.jsxs("div",{className:"registerpage shadow bg-white p-0",children:[e.jsxs("div",{className:"col-12 d-flex flex-wrap",children:[e.jsx("div",{className:"col-12 col-lg-6 p-2 d-flex justify-content-center align-items-center",children:e.jsx("div",{className:"d-flex justify-content-center align-items-center",children:e.jsx("div",{className:"",children:e.jsx("div",{className:"mb-12 d-flex justify-content-center align-items-center",children:e.jsx("img",{src:B,width:100})})})})}),e.jsx("div",{className:"col-12 col-lg-6 ",children:e.jsx("div",{className:" bg-green-100 text-center hidden lg:flex  flex justify-center align-center",children:e.jsx("div",{className:"m-16 bg-cover bg-center bg-no-repeat ",children:e.jsx("img",{src:"https://readymadeui.com/signin-image.webp",width:300,alt:""})})})})]}),e.jsxs("form",{action:"",onSubmit:Z,className:"py-5",children:[e.jsx("div",{className:"px-16",children:N?e.jsx("input",{type:"text",value:N,onChange:t=>C(t.target.value),className:"w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2",placeholder:"Name"}):e.jsx(e.Fragment,{})}),e.jsxs("div",{className:"col-12 d-flex flex-wrap justify-content-center p-5",children:[e.jsx("div",{className:"col-12 col-lg-6 p-1",children:e.jsxs("div",{className:"px-2",children:[e.jsx("input",{type:"text",value:p,onChange:t=>P(t.target.value),className:"w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2",placeholder:"Name"}),s.name&&e.jsx("span",{className:"error text-orange text-orange text-sm",children:s.name}),e.jsx("input",{type:"email",value:i,onChange:t=>q(t.target.value),className:"w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3",placeholder:"Email"}),s.email?e.jsx("span",{className:"error text-orange text-sm",children:s.email}):e.jsx("span",{className:"  text-gray text-sm",children:"Email must end with @gmail.com."}),e.jsx("input",{value:o,onChange:t=>E(t.target.value),className:"w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3",type:"password",placeholder:"Password"}),s.password?e.jsx("span",{className:"error text-orange text-orange text-sm",children:s.password}):e.jsx("span",{className:"  text-gray text-sm",children:"Password must be at least 6 characters, include an uppercase letter, a number, and a special character."}),e.jsx("input",{value:v,onChange:t=>k(t.target.value),className:"w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-3",type:"password",placeholder:"Confirm Password"}),s.confirmpassword&&e.jsx("span",{className:"error text-orange text-sm",children:s.confirmPassword})]})}),e.jsx("div",{className:"col-12 col-lg-6",children:e.jsxs("div",{className:"px-2 w-full",children:[e.jsxs("div",{className:"col-12 p-1",children:[e.jsx("input",{value:n,onChange:t=>A(t.target.value),className:"w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2 ",type:"text",placeholder:"Phone"}),s.phone?e.jsx("span",{className:"error text-orange text-sm",children:s.phone}):e.jsx("span",{className:" text-gray text-sm",children:"Phone number must be at least 10 digits."})]}),e.jsxs("div",{className:"col-12 d-flex flex-wrap justify-content-between",children:[e.jsxs("div",{className:"col-12 col-lg-6 p-1 ",children:[e.jsx("input",{value:f,onChange:t=>d(t.target.value),className:"w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2",type:"text",placeholder:"Area"}),s.area&&e.jsx("span",{className:"error text-orange text-orange text-sm",children:s.area})]}),e.jsxs("div",{className:"col-12 col-lg-6 p-1",children:[e.jsx("input",{value:h,onChange:O,maxLength:"6",className:"w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2",type:"text",placeholder:"Pincode"}),s.pincode&&e.jsx("span",{className:"error text-orange text-orange text-sm",children:s.pincode})]}),e.jsxs("div",{className:"col-12 col-lg-6 p-1 ",children:[e.jsx("input",{value:y,onChange:t=>u(t.target.value),className:"w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2",type:"text",placeholder:"City"}),s.city&&e.jsx("span",{className:"error text-orange text-orange text-sm",children:s.city})]}),e.jsxs("div",{className:"col-12 col-lg-6 p-1",children:[e.jsx("input",{value:b,onChange:t=>m(t.target.value),className:"w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2",type:"text",placeholder:"State"}),s.state&&e.jsx("span",{className:"error text-orange text-orange text-sm",children:s.state})]}),e.jsxs("div",{className:"col-12 col-lg-6 p-1 ",children:[e.jsx("input",{value:j,onChange:t=>g(t.target.value),className:"w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2",type:"text",placeholder:"Country"}),s.country&&e.jsx("span",{className:"error text-orange text-orange text-sm",children:s.country})]})]})]})})]}),e.jsx("div",{className:"d-flex justify-content-center",children:e.jsxs("button",{type:"submit",className:"mt-3 tracking-wide font-semibold bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none",children:[e.jsxs("svg",{className:"w-6 h-6 -ml-1",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("path",{d:"M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"}),e.jsx("circle",{cx:"8.5",cy:7,r:4}),e.jsx("path",{d:"M20 8v6M23 11h-6"})]}),e.jsx("span",{className:"ml-4",children:"Sign Up Next"})]})}),e.jsxs("p",{className:"mt-4 text-sm text-center text-gray-600",children:["Allready have an account? ",e.jsx(T,{to:"/login",className:"text-success text-bold hover:underline",children:"login "})]})]})]})})})})}export{V as default};