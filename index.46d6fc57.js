const t=["Task","Random Thought","Idea"],e=[{id:1,name:"Theory of evolution",createdAt:"2023-07-30",content:"This is a random thought",category:"Random Thought",dates:["2023-06-10"]},{id:2,name:"Shopping List",createdAt:"2023-07-31",content:"I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 5/5/2021",category:"Task",dates:["3/5/2021","5/5/2021"]},{id:3,name:"New Feature",createdAt:"2023-07-29",content:"I have an idea for a new project",category:"Idea",dates:["2023-08-01"]},{id:4,name:"Shopping List",createdAt:"2023-07-28",content:"Buy milk",category:"Task",dates:["2023-07-31"]},{id:5,name:"To-do List",createdAt:"2023-07-27",content:"Walk the dog",category:"Task",dates:["2023-07-30","2023-07-31"]},{id:6,name:"To-do List",createdAt:"2023-07-26",content:"Call my mom",category:"Task",dates:["2023-07-31"]},{id:7,name:"Shopping List",createdAt:"2023-07-25",content:"Pay the bills",category:"Task",dates:["2023-07-31"]}],n=document.getElementById("notes-table"),d=document.getElementById("archived-notes-table"),o=(document.querySelectorAll(".unarchive-btn"),document.getElementById("summary-table")),a=document.getElementById("add-note-btn"),c=document.getElementById("modal-overlay"),i=(document.getElementById("modal-save-btn"),document.getElementById("modal-cancel-btn"),document.getElementById("edit-modal-overlay")),r=document.getElementById("edit-modal-save-btn"),l=document.getElementById("edit-modal-cancel-btn");let s;function u(t){const e=t.dates.join(", ");return`\n        <tr>\n            <td>${t.createdAt}</td>\n            <td>${t.content}</td>\n            <td>${t.category}</td>\n            <td>${e}</td>\n            <td>\n                <button class="edit-btn" data-note-id="${t.id}">Edit</button>\n                <button class="archive-btn" data-note-id="${t.id}">Archive</button>\n                <button class="delete-btn" data-note-id="${t.id}">Delete</button>\n            </td>\n        </tr>\n    `}function m(t){const e=t.dates.join(", ");return`\n      <tr>\n          <td>${t.createdAt}</td>\n          <td>${t.content}</td>\n          <td>${t.category}</td>\n          <td>${e}</td>\n          <td>\n              <button class="unarchive-btn" data-note-id="${t.id}">Unarchive</button>\n          </td>\n      </tr>\n    `}function y(){!function(){const t=e.filter((t=>!t.archived)).map(u).join("");n.querySelector("tbody").innerHTML=t,n.querySelectorAll(".edit-btn").forEach((t=>{t.addEventListener("click",v)})),n.querySelectorAll(".archive-btn").forEach((t=>{t.addEventListener("click",E)})),n.querySelectorAll(".delete-btn").forEach((t=>{t.addEventListener("click",p)}))}(),function(){const n=[];t.forEach((t=>{const d=e.filter((e=>!e.archived&&e.category===t)).length,o=e.filter((e=>e.archived&&e.category===t)).length;n.push({category:t,activeCount:d,archivedCount:o})}));const d=n.map((t=>`\n        <tr>\n            <td>${t.category}</td>\n            <td>${t.activeCount}</td>\n            <td>${t.archivedCount}</td>\n        </tr>\n    `)).join("");o.querySelector("tbody").innerHTML=d}(),I()}function v(t){const n=t.target.dataset.noteId,d=e.find((t=>t.id===parseInt(n)));var o;d?(s=(o=d).id,document.getElementById("edit-note-content-input").value=o.content,document.getElementById("edit-note-category-input").value=o.category,document.getElementById("edit-note-dates-input").value=o.dates.join(", "),i.style.display="block",r.addEventListener("click",g),l.addEventListener("click",f)):alert("Note not found!")}function g(){const t=document.getElementById("edit-note-content-input").value.trim(),n=document.getElementById("edit-note-category-input").value,d=A(document.getElementById("edit-note-dates-input").value);if(!t)return void alert("Please enter note content.");const o=e.find((t=>t.id===s));o?(o.content=t,o.category=n,o.dates=d,y(),f()):alert("Note not found!")}function f(){i.style.display="none"}function E(t){const n=t.target.dataset.noteId;!function(t){const n=e.find((e=>e.id===t));if(!n)return void alert("Note not found!");n.archived=!0,y()}(parseInt(n))}function h(t){const n=e.find((e=>e.id===t));n?(n.archived=!1,I(),y()):alert("Note not found!")}function I(){const t=e.filter((t=>t.archived)).map(m).join("");d.querySelector("tbody").innerHTML=t;d.querySelectorAll(".unarchive-btn").forEach((t=>{const e=t.dataset.noteId;t.addEventListener("click",(()=>b(e)))}));d.querySelectorAll(".delete-btn").forEach((t=>{const e=t.dataset.noteId;t.addEventListener("click",(()=>function(t){k(parseInt(t))}(e)))}));d.querySelectorAll(".edit-btn").forEach((t=>{t.addEventListener("click",v)}))}function b(t){h(parseInt(t))}function p(t){const e=t.target.dataset.noteId;k(parseInt(e))}function k(t){const n=e.findIndex((e=>e.id===t));-1!==n?(e.splice(n,1),y()):alert("Note not found!")}function L(){c.style.display="block";const t=document.getElementById("modal-save-btn"),n=document.getElementById("modal-cancel-btn");function d(){const n=document.getElementById("note-content-input").value.trim(),o=document.getElementById("note-category-input").value,a=A(document.getElementById("note-dates-input").value);if(!n)return void alert("Please enter note content.");const c={id:e.length+1,createdAt:(new Date).toISOString().slice(0,10),content:n,category:o,dates:a,archived:!1};e.unshift(c),y(),B(),t.removeEventListener("click",d)}t.addEventListener("click",d),n.addEventListener("click",(function(){B(),t.removeEventListener("click",d)}))}function B(){c.style.display="none"}function A(t){return t.split(",").map((t=>t.trim())).filter((t=>""!==t))}document.addEventListener("DOMContentLoaded",(()=>{y(),I(),c.addEventListener("click",(t=>{t.target===c&&B()})),i.addEventListener("click",(t=>{t.target===i&&f()}));d.querySelectorAll(".delete-btn").forEach((t=>{const e=t.dataset.noteId;t.addEventListener("click",(()=>b(e)))})),a.addEventListener("click",L)}));
//# sourceMappingURL=index.46d6fc57.js.map