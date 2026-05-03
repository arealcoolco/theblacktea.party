document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-agenda-form]'); if (!form) return;
  const out = document.querySelector('#agenda-output');
  const checks = [...document.querySelectorAll('[name="issues"]')];
  const name = document.querySelector('#personName'), city = document.querySelector('#cityState');
  const sync = () => {
    const selected = checks.filter(c=>c.checked).map(c=>c.value);
    localStorage.setItem('agendaIssues', JSON.stringify(selected));
    localStorage.setItem('agendaName', name?.value||''); localStorage.setItem('agendaCity', city?.value||'');
    if (out) out.textContent = `My Black Agenda\n${name?.value||'Community Member'} — ${city?.value||'Local Chapter'}\n` + selected.map(s=>`• ${s}`).join('\n');
  };
  try { const saved = JSON.parse(localStorage.getItem('agendaIssues')||'[]'); checks.forEach(c=>c.checked=saved.includes(c.value)); if(name)name.value=localStorage.getItem('agendaName')||''; if(city)city.value=localStorage.getItem('agendaCity')||'';} catch {}
  form.addEventListener('input', sync); sync();
  document.querySelector('[data-copy-agenda]')?.addEventListener('click', ()=>navigator.clipboard.writeText(out?.textContent||''));
  document.querySelector('[data-print-agenda]')?.addEventListener('click', ()=>window.print());
});
