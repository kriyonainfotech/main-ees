import{r as n,U as l,j as e,L as o}from"./index-g8GziE3t.js";import{d as c,e as r,f as d}from"./index-DmNBRChd.js";import{G as x,L as m}from"./UserSideBar-DC-s98j9.js";const j=()=>{const{user:s}=n.useContext(l),t=[{title:"Profile",icon:e.jsx(c,{}),path:"/profile"},{title:"Team",icon:e.jsx(r,{}),path:"/"},{title:"Customer Care",icon:e.jsx(d,{}),path:"/"}];return e.jsx(e.Fragment,{children:e.jsx("div",{children:e.jsxs("div",{className:"offcanvas bg-white offcanvas-start",tabIndex:"-1",id:"offcanvasExample","aria-labelledby":"offcanvasExampleLabel",children:[e.jsxs("div",{className:"d-flex w-100 justify-content-center pt-4",children:[e.jsxs("div",{className:"  ",children:[e.jsx("div",{className:"d-flex w-100 justify-content-center",children:e.jsx("div",{className:"img w-[80px] h-[80px] rounded-full border overflow-hidden d-flex ",children:e.jsx("img",{src:(s==null?void 0:s.profilePic)||"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png",className:"w-full h-full"})})}),e.jsxs("div",{className:"text-center",children:[e.jsx("h3",{children:s==null?void 0:s.name}),e.jsx("p",{children:s==null?void 0:s.email})]})]}),e.jsx("div",{className:"p-3 d-flex justify-content-end position-absolute top-0 end-0",children:e.jsx("button",{type:"button",className:"btn-close ","data-bs-dismiss":"offcanvas","aria-label":"Close"})})]}),e.jsx("hr",{}),e.jsx("div",{className:"offcanvas-body p-2",children:e.jsxs("ul",{children:[t.map((a,i)=>e.jsx("li",{className:"w-100 p-2 rounded hover:bg-orange hover:text-white focus:text-white",children:e.jsxs(o,{to:a.path,className:"w-100 text-md d-flex justify-content-start align-items-center",children:[e.jsx("span",{className:"inline-block mr-3 text-lg",children:a.icon}),a.title]})},i)),(s==null?void 0:s.role)==="Admin"&&e.jsx(x,{}),e.jsx(m,{})]})})]})})})};export{j as P};