import{r as S,j as t,L as _,a as A,B as d}from"./index-DoGYxv9T.js";import{U as $,b as E,a as R}from"./UserSideBar-CjrVd-Lf.js";import{A as C}from"./AdminNavbar-BPVSybcJ.js";const P="/assets/ac%20service-D5wvirsw.png",U="http://13.234.46.69:3000",B=({sendedRequest:e,isReceiverAvailable:L})=>{const[O,o]=S.useState(""),k=JSON.parse(localStorage.getItem("token")),q=(s,a=10)=>{const l=[];for(let n=1;n<=a;n++)l.push(t.jsx(R,{className:` ${n<=s?"text-warning":""}`,style:{cursor:"pointer"}},n));return l};console.log(e,"sended status"),S.useEffect(()=>{[...e].forEach(a=>{a.status==="received"?o("received"):a.status==="canceled"?o("canceled"):a.status==="pending"&&o("pending")})},[e]);const F=async s=>{alert(s);try{const a=await A.post(`${U}/request/cancelRequest`,{senderId:s},{headers:{"Content-Type":"application/json",Authorization:`Bearer ${k}`}});a.status===200?(o("canceled"),d.success("Request canceled successfully.")):(console.error("Failed to cancel request:",a.data.message),d.error("Failed to cancel request."))}catch(a){console.error("Error canceling user request:",a),d.error("An error occurred while canceling the request.")}};return t.jsxs(t.Fragment,{children:[t.jsx(C,{}),t.jsx($,{}),t.jsx("div",{className:"mt-2",children:t.jsx("section",{children:t.jsx("div",{className:"container",children:t.jsxs("div",{className:"row",children:[t.jsx("div",{className:"col-12 pt-3",children:t.jsx("h4",{children:"Sended Request"})}),t.jsx("div",{className:"col-12 flex flex-wrap py-2",children:e.map((s,a)=>{var l,n,c,i,u,m,x,p,g,h,j,f,b,N,w,y;return t.jsx("div",{className:"col-12 col-md-6 w-full col-lg-4 p-1",children:t.jsxs("div",{className:"bg-white border-black rounded-md overflow-hidden d-flex shadow flex-md-column ",style:{position:"relative"},children:[t.jsxs("div",{className:"col-5 col-md-12 d-flex",children:[t.jsx("div",{className:"img p-2 ",style:{height:"300px",width:"100%"},children:t.jsx("img",{className:"img-fluid rounded",src:((l=s==null?void 0:s.user)==null?void 0:l.profilePic)||"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png",alt:"Movie",style:{width:"100%",height:"100%",objectFit:"cover",objectPosition:"top"}})}),t.jsx("span",{className:`position-absolute rounded-full top-5 end-5 p-1 text-sm text-white px-2 ${((n=s==null?void 0:s.user)==null?void 0:n.userstatus)==="available"?"bg-green":"bg-orange"}`,children:(c=s==null?void 0:s.user)==null?void 0:c.userstatus})]}),t.jsx("div",{className:"p-3 pt-0 col-7 col-md-12 d-flex align-items-center",children:t.jsxs("div",{className:"w-full pt-2",children:[t.jsxs("div",{className:"d-flex flex-column flex-md-row  justify-content-start justify-content-md-between",children:[t.jsx("div",{className:"rating rating-sm py-4 d-flex align-items-center",children:(i=s==null?void 0:s.user)!=null&&i.ratings?t.jsxs("div",{className:" d-flex align-items-center",children:[q((u=s==null?void 0:s.user)==null?void 0:u.ratings.map(r=>r.rating),10),t.jsx("span",{className:"ps-2 ",children:(m=s==null?void 0:s.user)==null?void 0:m.ratings.map(r=>r.rating)})]}):t.jsx(t.Fragment,{})}),t.jsxs("h6",{className:"d-flex align-items-center text-orange m-0 text-sm w-100 justify-content-start justify-content-md-end",children:[t.jsx("img",{src:P,width:40,alt:""})," ",s.user.businessCategory]})]}),t.jsx("h4",{className:"",children:s.user.name}),t.jsx("h6",{className:"pt-2"}),t.jsxs("p",{className:"d-flex align-items-center gap-2 text",children:[t.jsx(E,{})," ",(p=(x=s==null?void 0:s.user)==null?void 0:x.address)==null?void 0:p.area," ",(h=(g=s==null?void 0:s.user)==null?void 0:g.address)==null?void 0:h.city," ",(f=(j=s==null?void 0:s.user)==null?void 0:j.address)==null?void 0:f.state," ",(N=(b=s==null?void 0:s.user)==null?void 0:b.address)==null?void 0:N.country," ",(y=(w=s==null?void 0:s.user)==null?void 0:w.address)==null?void 0:y.pincode]}),t.jsx("div",{className:"pt-2 d-flex   gap-2  justify-content-between align-items-start w-100 flex-md-row",children:s.status==="received"?t.jsx(_,{to:`tel:${s.user.phone}`,className:"btn pt-2  w-50  border-green rounded-1 text-semibold text-green btn-outline-orange",children:"Contect Now"}):t.jsx(_,{onClick:()=>F(s.user._id),className:"btn pt-2  w-50  border-orange rounded-1 text-semibold text-orange btn-outline-orange",children:"cancle"})})]})})]})},a)})})]})})})})]})},T=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"}));export{B as S,P as a,T as b};