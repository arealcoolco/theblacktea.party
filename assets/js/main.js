document.addEventListener('DOMContentLoaded', () => {
  const navBtn = document.querySelector('[data-menu-btn]');
  const nav = document.querySelector('[data-site-nav]');
  if (navBtn && nav) navBtn.addEventListener('click', () => nav.classList.toggle('open'));

  const overlay = document.querySelector('[data-overlay]');
  const enterBtn = document.querySelector('[data-enter]');
  if (overlay && enterBtn) {
    enterBtn.addEventListener('click', () => {
      overlay.hidden = true;
      localStorage.setItem('teaRoomEntered', '1');
    });
    if (localStorage.getItem('teaRoomEntered') === '1') overlay.hidden = true;
  }

  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const txt = btn.getAttribute('data-copy') || '';
      try { await navigator.clipboard.writeText(txt); btn.textContent = 'Copied'; setTimeout(()=>btn.textContent='Copy',1200);} catch {}
    });
  });

  const meter = document.querySelector('[data-funding-meter]');
  if (meter) {
    const out = document.querySelector('[data-funding-output]');
    const render = () => out && (out.textContent = `${meter.value}% of monthly goal funded`);
    meter.addEventListener('input', render); render();
  }
});

async function loadCards(sel, url, mapper){
 const el=document.querySelector(sel); if(!el) return;
 const data=await fetch(url).then(r=>r.json()).catch(()=>[]);
 el.innerHTML=data.map(mapper).join('');
}
document.addEventListener('DOMContentLoaded',()=>{
 loadCards('#library','/assets/data/library.json',d=>`<article class='card'><span class='tag'>${d.level}</span><h3>${d.title}</h3><p>${d.category}</p></article>`);
 loadCards('#articles','/assets/data/articles.json',d=>`<article class='card'><span class='tag'>${d.category}</span><h3>${d.title}</h3><button class='btn secondary' data-copy='${d.title}'>Copy</button></article>`);
 loadCards('#resources-list','/assets/data/resources.json',d=>`<article class='card'><span class='tag'>${d.category}</span><h3>${d.title}</h3><button class='btn secondary' data-copy='${d.title}'>Copy</button></article>`);
 document.querySelectorAll('form .btn[type="button"]').forEach(btn=>btn.addEventListener('click',()=>{const f=btn.closest('form'); if(!f)return; localStorage.setItem(f.closest('main')?.id||'form', new FormData(f).toString()); alert('Saved locally (prototype).');}));
});
