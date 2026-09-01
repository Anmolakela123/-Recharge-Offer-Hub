const plans = [
  {amount:499, old:3999, validity:"365 Days", data:"3GB/day", voice:"Unlimited", sms:"100/day", qr:"assets/qr/qr_499.png"},
  {amount:449, old:2495, validity:"365 Days", data:"2.5GB/day", voice:"Unlimited", sms:"100/day", qr:"assets/qr/qr_449.png"},
  {amount:399, old:2599, validity:"200 Days", data:"2.5GB/day", voice:"Unlimited", sms:"100/day", qr:"assets/qr/qr_399.png"},
  {amount:349, old:1745, validity:"90 Days", data:"2GB/day", voice:"Unlimited", sms:"100/day", qr:"assets/qr/qr_349.png"},
  {amount:299, old:1245, validity:"84 Days", data:"2GB/day", voice:"Unlimited", sms:"100/day", qr:"assets/qr/qr_299.png"},
  {amount:199, old:995, validity:"56 Days", data:"1.5GB/day", voice:"Unlimited", sms:"100/day", qr:"assets/qr/qr_199.png"},
  {amount:999, old:9999, validity:"2.5 Years", data:"3GB/day", voice:"Unlimited", sms:"150/day", qr:"assets/qr/qr_999.png"}
];

let mobile = localStorage.getItem("demoMobile") || "";
let operator = localStorage.getItem("demoOperator") || "Jio";
let selectedPlan = null;

const $ = id => document.getElementById(id);
const plansEl = $("plans");

function renderPlans(){
  plansEl.innerHTML = plans.map((p,i)=>`
    <article class="plan">
      <div class="plan-top">
        <span class="badge-new">✦ NEW</span>
        <span class="operator-pill">${operator} PLAN</span>
      </div>
      <div class="price-row">
        <span class="price">₹${p.amount}</span>
        <span class="old-price">₹${p.old}</span>
        <span class="data-badge"><b>UNLIMITED</b><b>TRUE 5G DATA</b></span>
      </div>
      <div class="stats">
        <div class="stat"><div class="stat-icon">▣</div><label>VALIDITY</label><strong>${p.validity}</strong></div>
        <div class="stat"><div class="stat-icon">⌁</div><label>DATA</label><strong>${p.data}</strong></div>
        <div class="stat"><div class="stat-icon">☎</div><label>VOICE</label><strong>${p.voice}</strong></div>
        <div class="stat"><div class="stat-icon">▤</div><label>SMS</label><strong>${p.sms}</strong></div>
      </div>
      <button class="recharge-btn" data-index="${i}">Recharge for ₹${p.amount} &nbsp;→</button>
    </article>
  `).join("");
  document.querySelectorAll(".recharge-btn").forEach(b=>b.addEventListener("click",()=>startPayment(+b.dataset.index)));
}

function openModal(id){ $(id).classList.add("open"); $(id).setAttribute("aria-hidden","false"); }
function closeModal(id){ $(id).classList.remove("open"); $(id).setAttribute("aria-hidden","true"); }

function updateNumberText(){
  $("selectedNumberText").textContent = mobile ? `+91 ${mobile}` : "+91 • Enter mobile number";
}

function startPayment(index){
  selectedPlan = {...plans[index], operator};
  if(!/^\d{10}$/.test(mobile)){
    $("mobileNumber").value = mobile;
    document.querySelectorAll(".operator").forEach(x=>x.classList.toggle("active",x.dataset.operator===operator));
    openModal("numberModal");
    return;
  }
  showPayment();
}

function showPayment(){
  if(!selectedPlan) return;
  $("paymentTitle").textContent = `Recharge ₹${selectedPlan.amount}`;
  $("paymentOperator").textContent = `${selectedPlan.operator} PLAN`;
  $("paymentNumber").textContent = `+91 ${mobile}`;
  $("paymentAmount").textContent = `₹${selectedPlan.amount}`;
  $("paymentQR").src = selectedPlan.qr;
  $("screenshotInput").value = "";
  $("preview").classList.remove("show");
  $("uploadBtn").disabled = true;
  $("uploadBtn").classList.add("disabled");
  closeModal("numberModal");
  openModal("paymentModal");
}

document.querySelectorAll("[data-main-operator]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    operator=btn.dataset.mainOperator;
    localStorage.setItem("demoOperator",operator);
    document.querySelectorAll("[data-main-operator]").forEach(x=>x.classList.toggle("active",x.dataset.mainOperator===operator));
    document.querySelectorAll(".operator").forEach(x=>x.classList.toggle("active",x.dataset.operator===operator));
    renderPlans();
  });
});

$("changeNumberBtn").addEventListener("click",()=>{
  $("mobileNumber").value=mobile;
  document.querySelectorAll(".operator").forEach(x=>x.classList.toggle("active",x.dataset.operator===operator));
  openModal("numberModal");
});

document.querySelectorAll(".operator").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".operator").forEach(x=>x.classList.remove("active"));
    btn.classList.add("active"); operator=btn.dataset.operator;
  });
});

$("saveNumberBtn").addEventListener("click",()=>{
  const value=$("mobileNumber").value.replace(/\D/g,"");
  if(!/^\d{10}$/.test(value)){
    showToast("Please enter a valid 10-digit mobile number.");
    return;
  }
  mobile=value;
  localStorage.setItem("demoMobile",mobile);
  localStorage.setItem("demoOperator",operator);
  updateNumberText();
  if(selectedPlan) showPayment(); else closeModal("numberModal");
});

$("screenshotInput").addEventListener("change",()=>{
  const file=$("screenshotInput").files[0];
  if(!file) return;
  if(file.size>5*1024*1024){
    showToast("Screenshot must be 5 MB or smaller.");
    $("screenshotInput").value="";
    return;
  }
  const allowed=["image/png","image/jpeg","image/webp"];
  if(!allowed.includes(file.type)){
    showToast("Please upload PNG, JPG or WEBP.");
    $("screenshotInput").value="";
    return;
  }
  $("fileName").textContent=file.name;
  const reader=new FileReader();
  reader.onload=e=>{$("previewImg").src=e.target.result;$("preview").classList.add("show")};
  reader.readAsDataURL(file);
  $("uploadBtn").disabled=false;
  $("uploadBtn").classList.remove("disabled");
});

$("uploadBtn").addEventListener("click",()=>{
  const file=$("screenshotInput").files[0];
  if(!file || !selectedPlan) return;
  // Demo-only behavior: no server/API payment verification is performed.
  $("successAmount").textContent=`₹${selectedPlan.amount}`;
  $("successNumber").textContent=`+91 ${mobile}`;
  $("successPlan").textContent=`${selectedPlan.operator} • ₹${selectedPlan.amount} • ${selectedPlan.validity}`;
  closeModal("paymentModal");
  openModal("successModal");
});

$("doneBtn").addEventListener("click",()=>{
  closeModal("successModal");
  selectedPlan=null;
});

document.querySelectorAll("[data-close]").forEach(btn=>btn.addEventListener("click",()=>closeModal(btn.dataset.close)));
document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m) closeModal(m.id)}));

$("helpBtn").addEventListener("click",()=>showToast("Select a plan, pay the exact amount, then upload your payment screenshot."));
$("noticeBtn").addEventListener("click",()=>showToast("Demo recharge flow is active."));
function showToast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2600)}

let seconds=14*60+27;
setInterval(()=>{seconds=(seconds-1+86400)%86400;const m=String(Math.floor(seconds/60)%60).padStart(2,"0"),s=String(seconds%60).padStart(2,"0");$("countdown").textContent=`${m}:${s}`},1000);

updateNumberText();
document.querySelectorAll("[data-main-operator]").forEach(x=>x.classList.toggle("active",x.dataset.mainOperator===operator));
document.querySelectorAll(".operator").forEach(x=>x.classList.toggle("active",x.dataset.operator===operator));
renderPlans();
