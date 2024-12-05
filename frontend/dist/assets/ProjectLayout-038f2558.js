import{j as e,a as k,b as f,d as w,h as F,K as P,F as r,as as S,at as $,ak as j,al as m,au as v,av as D,e as A,aw as _,R as N,o as M,I as C,ax as R,ay as z,az as y,aj as I}from"./index-e2e70fbc.js";function W(s){return e.jsx("button",{type:s.type?s.type:"button",className:`secondary-button text-color-white-normal font-noto font-weight-medium ${s.processing&&"opacity-25"} `+s.className,disabled:s.processing,onClick:s.onClick,children:s.children})}const B=`const int analogPin = A0; // Analog pin where your sensor is connected

void setup() {
  Serial.begin(9600); // Initialize serial communication
}

void loop() {
  int sensorValue = analogRead(analogPin); // Read analog data from the sensor
  float voltage = sensorValue * (5.0 / 1023.0); // Convert to voltage (assuming a 5V Arduino)

  // Create a dictionary with data
  Serial.print("{"sensorValue": ");
  Serial.print(sensorValue);
  Serial.print(", "voltage": ");
  Serial.print(voltage, 2); // Display voltage with 2 decimal places
  Serial.println("}");

  delay(1000); // Wait for a second (adjust as needed)
}`,E=s=>{const t=s.sensor_data_labels;return`
const int analogPin = A0; // Analog pin where your sensor is connected

void setup() {
  Serial.begin(9600); // Initialize serial communication
}

void loop() {
  ${t.map(n=>`int ${n.field} = analogRead(analogPin);
  `).join("")}

  // Create and send dictionary with data
  Serial.print("{");
  ${t.map((n,c)=>`
  Serial.print("\\"${n.field}\\": ");
  Serial.print(${n.field});
  ${c===t.length-1?"":'Serial.print(", ");'}
      `).join("")}
  Serial.println("}");

  delay(1000); // Wait for a second (adjust as needed)
}`},V=()=>{var p;const s=k(),{projectData:t}=f(i=>i.project),o=w(),{file_loading:n}=f(i=>i.project),c=F.useRef(null),d=()=>{c.current.click()},u=async i=>{const g=i.target.files[0],a=new FormData;a.append("file",g);const h=await s($({values:a,id:t.id}));s(j(h.payload)),await s(m(t.id))},l=async()=>{s(v(!0));try{const i=await D.fetchProjectWorkCodeCreate(t.id,{code:B});await s(m(t.id)),s(j(i.data)),s(v(!1))}catch{s(v(!1))}},x=()=>{var i;t.conference!==void 0&&o(`/conference/${(i=t.conference)==null?void 0:i.id}`)};return e.jsxs(e.Fragment,{children:[e.jsx("input",{type:"file",ref:c,style:{display:"none"},onChange:u}),e.jsxs("div",{className:"d-flex justify-content-around",children:[e.jsx(P,{className:"text-capitalize",disabled:n.post,onClick:d,children:e.jsx(r,{id:"upload",defaultMessage:"upload"})}),e.jsx(W,{onClick:l,disabled:n.post,className:"text-capitalize",children:e.jsx(r,{id:"dashboard.projects_createappfile",defaultMessage:"Create .cpp file"})}),((p=t==null?void 0:t.conference)==null?void 0:p.status)==="ongoing"&&e.jsx(S,{onClick:x,disabled:n.post,className:"text-capitalize",children:e.jsx(r,{id:"join",defaultMessage:"Join"})})]})]})};const U=({children:s})=>{const t=k(),{projectData:o,project_loading:n,success:c,errors:d}=f(a=>a.project),{current_file_payload:u}=f(a=>a.projectScript),{id:l}=A(),x=_(),p=w(),i=async a=>{await t(I({project_id:o.id,file_id:a.id})),a.id===(u==null?void 0:u.id)&&t(j(null)),await t(m(o.id))},g=(a,h)=>{a==null||a.preventDefault();const b=`/dashboard/projects/${o.id}/edit`;x.pathname.startsWith(b)||p(b),t(j(h))};return N.useEffect(()=>{l&&!o&&(async()=>{await t(m(Number(l)))})()},[l]),N.useEffect(()=>{!n.detail&&!c&&(d!=null&&d.detail)&&t(M({type:"error",data:{message:d.detail}}))},[c,d,n]),e.jsxs("div",{className:"row project-layout",children:[e.jsx("div",{className:"col-md-3",children:e.jsxs("div",{className:"file-manager",children:[e.jsx("a",{href:"#",className:"file-control",children:e.jsx(r,{id:"dashboard.projects_dkvlkejb",defaultMessage:"Documents (Pdf)"})}),e.jsx("a",{href:"#",className:"file-control",children:e.jsx(r,{id:"dashboard.projects_uudvdsvbb",defaultMessage:"Images"})}),e.jsx("a",{href:"#",className:"file-control",children:e.jsx(r,{id:"dashboard.projects_videooiwenv",defaultMessage:"Videoes"})}),e.jsx("div",{className:"hr-line-dashed my-2"}),e.jsx(V,{}),e.jsx("div",{className:"hr-line-dashed my-2"}),e.jsx("h5",{className:"my-2",children:e.jsx(r,{id:"files",defaultMessage:"Files"})}),e.jsx("ul",{className:"file-list p-0",children:o==null?void 0:o.files.map(a=>e.jsxs("li",{children:[e.jsxs("a",{href:"#",onClick:h=>g(h,a),children:[e.jsx(C,{path:R,size:1})," ",a.name]}),e.jsx("button",{className:"btn btn-sm btn-danger",onClick:()=>i(a),children:e.jsx(C,{path:z,size:1})})]},a.id))}),e.jsx("div",{className:"clearfix"})]})}),e.jsx("div",{className:"col-md-9 animated fadeInRight",children:e.jsxs("div",{className:"row mb-4",children:[e.jsxs("ul",{className:"nav nav-tabs",children:[e.jsx("li",{className:"nav-item",children:e.jsx(y,{to:`/dashboard/projects/${l}/edit`,className:({isActive:a})=>`nav-link ${a?"active":""}`,children:"File"})}),e.jsx("li",{className:"nav-item",children:e.jsx(y,{to:`/dashboard/projects/${l}/instructions`,className:({isActive:a})=>`nav-link ${a?"active":""}`,children:"Instructions"})}),e.jsx("li",{className:"nav-item",children:e.jsx(y,{to:`/dashboard/projects/${l}/broadcast`,className:({isActive:a})=>`nav-link ${a?"active":""}`,children:"Broadcast"})})]}),s]})})]})};export{B as D,E as G,U as P,W as S};
