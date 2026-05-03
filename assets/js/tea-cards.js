document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('[data-cup-tab]');
  const panes = document.querySelectorAll('[data-cup-pane]');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    panes.forEach(p=>p.hidden=true); tabs.forEach(t=>t.setAttribute('aria-pressed','false'));
    const pane = document.querySelector(tab.dataset.cupTab); if (pane) pane.hidden = false;
    tab.setAttribute('aria-pressed','true');
  }));
});
