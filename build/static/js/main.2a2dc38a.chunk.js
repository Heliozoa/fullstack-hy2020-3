(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,t,n){e.exports=n(37)},37:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),u=n(13),l=n.n(u),o=n(14),c=n(2),i=function(e){var t=e.filter,n=e.updateFilter;return r.a.createElement("form",{value:t},r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{onChange:n})))},m=function(e){var t=e.newName,n=e.submitPerson,a=e.updateName,u=e.updateNumber;return r.a.createElement("form",{value:t,onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{onChange:u})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=function(e){var t=e.person,n=e.deleteHandler;return r.a.createElement("div",null,t.name," ",t.number," ",r.a.createElement("button",{onClick:function(){return n(t)}},"delete"))},f=function(e){var t=e.persons,n=e.filter,a=e.deleteHandler;return t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())})).map((function(e){return r.a.createElement(d,{key:e.name,person:e,deleteHandler:a})}))},s=function(e){var t=e.msg;return null===t?null:r.a.createElement("div",{style:{color:"green",background:"lightgreen",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"}},t)},p=function(e){var t=e.msg;return null===t?null:r.a.createElement("div",{style:{color:"red",background:"pink",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"}},t)},b=n(3),v=n.n(b),E=function(e){return"".concat("/api/persons","/").concat(e)},g=function(){return v.a.get("/api/persons").then((function(e){return e.data}))},h=function(e){return v.a.post("/api/persons",e).then((function(e){return e.data}))},j=function(e){return v.a.delete(E(e))},O=function(e){return console.log("updating",e),v.a.put(E(e.id),e)},S=function(){var e=Object(a.useState)([]),t=Object(c.a)(e,2),n=t[0],u=t[1],l=Object(a.useState)(""),d=Object(c.a)(l,2),b=d[0],v=d[1],E=Object(a.useState)(""),S=Object(c.a)(E,2),w=S[0],x=S[1],k=Object(a.useState)(""),y=Object(c.a)(k,2),N=y[0],C=y[1],H=Object(a.useState)(null),T=Object(c.a)(H,2),B=T[0],P=T[1],z=Object(a.useState)(null),F=Object(c.a)(z,2),I=F[0],J=F[1],L=Object(a.useState)(null),R=Object(c.a)(L,2),A=R[0],D=R[1],q=Object(a.useState)(null),G=Object(c.a)(q,2),K=G[0],M=G[1];Object(a.useEffect)((function(){g().then((function(e){return u(e)}))}),[]);var Q=function(e){P(e),clearTimeout(I);var t=setTimeout((function(){P(null)}),5e3);J(t)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(s,{msg:B}),r.a.createElement(p,{msg:A}),r.a.createElement(i,{filter:N,updateFilter:function(e){return C(e.target.value)}}),r.a.createElement("h3",null,"Add a new"),r.a.createElement(m,{newName:b,submitPerson:function(e){e.preventDefault();var t=n.filter((function(e){return e.name===b}));if(console.log(t),t.length>0){var a=Object(o.a)({},t[0],{number:w});O(a).then((function(e){var t=n.map((function(e){return e.id===a.id?a:e}));u(t),Q("updated ".concat(a.name))})).catch((function(e){var t=n.filter((function(e){return e.id!==a.id}));u(t),function(e){D(e),clearTimeout(K);var t=setTimeout((function(){D(null)}),5e3);M(t)}("Information of ".concat(a.name," has already been removed from server"))}))}else{var r={name:b,number:w};h(r).then((function(e){return u(n.concat(e))})),Q("added ".concat(r.name))}},updateName:function(e){return v(e.target.value)},updateNumber:function(e){return x(e.target.value)}}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(f,{persons:n,filter:N,deleteHandler:function(e){j(e.id).then((function(t){var a=n.filter((function(t){return t.id!==e.id}));u(a),Q("deleted ".concat(e.name))}))}}))};l.a.render(r.a.createElement(S,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.2a2dc38a.chunk.js.map