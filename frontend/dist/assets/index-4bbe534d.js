import{y as h,d as f,a as g,b as r,R as c,aA as j,j as s,F as d,N as b,a7 as y,C as N}from"./index-e2e70fbc.js";function M(){const n=h(),i=f(),o=g(),{user:l}=r(e=>e.auth),{conferences:m}=r(e=>e.conference);c.useEffect(()=>{o(j({}))},[o]);const u=e=>{i(`/conference/${e.id}/`)},x=async e=>{try{await N.fetchUpdateConference(e.id,{status:"planned"}),i(`/conference/${e.id}/`)}catch(a){console.error(a)}},p=c.useMemo(()=>[{key:"id",title:"ID",render:(e,a)=>s.jsx("th",{scope:"row",className:"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white",children:e.id},a)},{key:"admin",title:n.formatMessage({id:"admin",defaultMessage:"Admin"}),render:(e,a)=>{var t;return s.jsx("td",{className:"px-6 py-4 text-right",children:(t=e.admin)==null?void 0:t.username},a)}},{key:"planned_time",title:n.formatMessage({id:"dashboard.conference_planned_time",defaultMessage:"Planned time"})},{key:"actions",title:n.formatMessage({id:"actions",defaultMessage:"Actions"}),render:(e,a)=>{var t;return s.jsxs("td",{className:"px-6 py-4 text-right",children:[e.status!=="completed"?s.jsx("button",{type:"button",onClick:()=>u(e),className:"btn btn-dark",children:e.status==="ongoing"?s.jsx(d,{id:"ongoing",defaultMessage:"Ongoing"}):s.jsx(d,{id:"join",defaultMessage:"Join"})}):s.jsx("p",{children:e.status}),e.status==="completed"&&((t=e.admin)==null?void 0:t.id)===l.id&&s.jsx("button",{type:"button",onClick:()=>x(e),className:"btn btn-dark",children:s.jsx(d,{id:"restart",defaultMessage:"Restart"})})]},a)}}],[]);return s.jsxs("div",{className:"row",children:[s.jsx(b,{}),s.jsx("div",{className:"col-lg-8",children:s.jsx("div",{className:"card mb-4",children:s.jsx("div",{className:"card-body",children:s.jsx("div",{className:"overflow-x-auto",children:s.jsx(y,{data:m,columns:p})})})})})]})}export{M as default};