const KEY="studyvault-state-v2";
const today=()=>new Date().toISOString().slice(0,10);
let state=JSON.parse(localStorage.getItem(KEY)||"null")||{
 tasks:[
  {id:crypto.randomUUID(),name:"Review one chapter",subject:"Computer Science",priority:"High",done:false,date:today()},
  {id:crypto.randomUUID(),name:"Practice 10 questions",subject:"Physics",priority:"Medium",done:false,date:today()}
 ],
 subjects:[
  {id:crypto.randomUUID(),name:"Computer Science",hours:5,progress:42},
  {id:crypto.randomUUID(),name:"Physics",hours:4,progress:28},
  {id:crypto.randomUUID(),name:"Mathematics",hours:6,progress:65}
 ],
 focusSeconds:0,streak:1,dark:false
};
const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
const $=id=>document.getElementById(id);
function render(){
 const tasks=state.tasks.filter(t=>t.date===today());
 const done=tasks.filter(t=>t.done).length,pending=tasks.length-done,pct=tasks.length?Math.round(done/tasks.length*100):0;
 $("done-count").textContent=done;$("pending-count").textContent=pending;$("streak-count").textContent=state.streak;
 $("focus-count").textContent=Math.floor(state.focusSeconds/60)+"m";$("progress-value").textContent=pct+"%";
 $("progress-ring").style.background=`conic-gradient(#334155 ${pct*3.6}deg,#d9e1ed 0deg)`;
 $("progress-title").textContent=pct===100&&tasks.length?"All done — excellent work!":pct>0?"You're building momentum.":"Ready when you are.";
 renderTasks("task-list-dashboard",tasks);renderTasks("task-list",state.tasks);renderSubjects();
 document.body.classList.toggle("dark",state.dark);$("theme-toggle").textContent=state.dark?"☀":"☾";
}
function renderTasks(id,tasks){
 const el=$(id);
 el.innerHTML=tasks.length?tasks.map(t=>`<article class="task ${t.done?"done":""}">
 <input class="task-check" type="checkbox" data-action="toggle" data-id="${t.id}" ${t.done?"checked":""} aria-label="Complete task">
 <div class="task-info"><div class="task-title">${escapeHtml(t.name)}</div><div class="task-meta">${escapeHtml(t.subject||"General")} · ${t.priority} · ${t.date}</div></div>
 <span class="priority">${t.priority}</span><button class="danger" data-action="delete" data-id="${t.id}">Delete</button></article>`).join(""):"<div class='task'><div class='task-info'><div class='task-title'>No tasks yet</div><div class='task-meta'>Add a task to start your study plan.</div></div></div>";
}
function renderSubjects(){
 $("subject-grid").innerHTML=state.subjects.map(s=>`<article class="subject-card"><div class="section-heading"><strong>${escapeHtml(s.name)}</strong><button class="danger" data-subject-delete="${s.id}">Delete</button></div><div>${s.progress}% progress · ${s.hours}h/week target</div><div class="bar"><span style="width:${Math.min(100,s.progress)}%"></span></div><small>Progress is based on your study plan.</small></article>`).join("")||"<div class='task'>No subjects yet.</div>";
}
function escapeHtml(x){return String(x).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function openDialog(d){$(d).showModal()}
function closeDialog(d){$(d).close()}
document.querySelectorAll(".nav-item").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".nav-item").forEach(x=>x.classList.remove("active"));b.classList.add("active");document.querySelectorAll(".view").forEach(v=>v.classList.add("hidden"));$(`${b.dataset.view}-view`).classList.remove("hidden");$("page-title").textContent=b.dataset.view==="dashboard"?"Good evening 👋":b.textContent.trim()}));
$("add-task").onclick=$("add-task-dashboard").onclick=()=>{ $("task-form").reset();openDialog("task-dialog");$("task-name").focus()};
$("cancel-task").onclick=$("close-task").onclick=()=>closeDialog("task-dialog");
$("task-form").addEventListener("submit",e=>{e.preventDefault();state.tasks.push({id:crypto.randomUUID(),name:$("task-name").value.trim(),subject:$("task-subject").value.trim(),priority:$("task-priority").value,done:false,date:today()});save();render();closeDialog("task-dialog")});
$("add-subject").onclick=()=>{ $("subject-form").reset();openDialog("subject-dialog");$("subject-name").focus()};
$("cancel-subject").onclick=$("close-subject").onclick=()=>closeDialog("subject-dialog");
$("subject-form").addEventListener("submit",e=>{e.preventDefault();state.subjects.push({id:crypto.randomUUID(),name:$("subject-name").value.trim(),hours:Number($("subject-hours").value)||1,progress:0});save();render();closeDialog("subject-dialog")});
document.addEventListener("click",e=>{
 const action=e.target.dataset.action,id=e.target.dataset.id;
 if(action==="toggle"){const t=state.tasks.find(x=>x.id===id);if(t){t.done=e.target.checked;if(t.done)state.streak=Math.max(1,state.streak);save();render()}}
 if(action==="delete"&&confirm("Delete this task?")){state.tasks=state.tasks.filter(x=>x.id!==id);save();render()}
 const sid=e.target.dataset.subjectDelete;if(sid&&confirm("Delete this subject?")){state.subjects=state.subjects.filter(x=>x.id!==sid);save();render()}
});
$("theme-toggle").onclick=()=>{state.dark=!state.dark;save();render()};
let timer=25*60,running=false,interval=null;
function updateTimer(){const m=Math.floor(timer/60),s=timer%60;$("timer-display").textContent=`${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`}
$("timer-start").onclick=()=>{running=!running;$("timer-start").textContent=running?"Pause":"Start";if(running){interval=setInterval(()=>{if(timer>0){timer--;state.focusSeconds++;updateTimer();if(timer%60===0)save();render()}else{clearInterval(interval);running=false;$("timer-start").textContent="Start";$("timer-mode").textContent="Session complete 🎉";save();render()}},1000)}else clearInterval(interval)};
$("timer-reset").onclick=()=>{clearInterval(interval);running=false;timer=25*60;$("timer-start").textContent="Start";$("timer-mode").textContent="Focus session · 25 minutes";updateTimer();save()};
function init(){render();updateTimer()}
init();