document.addEventListener('DOMContentLoaded', async () => {
  const root = document.querySelector('[data-receipts-app]');
  if (!root) return;
  const q = document.querySelector('#q'), topic = document.querySelector('#topic'), region = document.querySelector('#region'), type = document.querySelector('#type');
  const list = document.querySelector('#receipts-list'), count = document.querySelector('#receipts-count');
  const data = await fetch('/assets/data/receipts.json').then(r=>r.json()).catch(()=>[]);
  const fill = (el, key) => { if(!el) return; [...new Set(data.map(d=>d[key]))].forEach(v=> el.insertAdjacentHTML('beforeend', `<option>${v}</option>`)); };
  fill(topic,'topic'); fill(region,'region'); fill(type,'type');
  const render = () => {
    const f = data.filter(d => (!q.value || JSON.stringify(d).toLowerCase().includes(q.value.toLowerCase())) && (!topic.value || d.topic===topic.value) && (!region.value || d.region===region.value) && (!type.value || d.type===type.value));
    if (count) count.textContent = `${f.length} receipt(s)`;
    if (!list) return;
    list.innerHTML = f.length ? f.map(d=>`<article class='card'><span class='tag'>${d.topic}</span><h3>${d.title}</h3><p>${d.summary}</p><p><strong>Impact:</strong> ${d.impact}</p><p><a href='${d.sourceUrl}'>${d.sourceTitle}</a> (${d.date})</p><button class='btn secondary' data-copy="${d.shareText.replace(/"/g,'&quot;')}">Copy</button></article>`).join('') : `<div class='card'><p>No receipts found. Try broadening filters.</p></div>`;
    document.querySelectorAll('[data-copy]').forEach(b=>b.onclick=()=>navigator.clipboard.writeText(b.dataset.copy||''));
  };
  [q,topic,region,type].forEach(i=> i && i.addEventListener('input', render)); render();
});
