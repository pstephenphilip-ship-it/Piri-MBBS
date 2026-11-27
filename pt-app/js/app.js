// PT Coach — app shell + hash router.
// Routes are "#/<tab>/<...params>". Each view module exports render(ctx).
import * as exercises from './views/exercises.js';
import * as knowledge from './views/knowledge.js';
import * as clients from './views/clients.js';

const routes = { exercises, knowledge, clients };

const viewEl = document.getElementById('view');
const titleEl = document.getElementById('page-title');
const backBtn = document.getElementById('back-btn');
const actionEl = document.getElementById('topbar-action');

backBtn.addEventListener('click', () => history.back());

function parse() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  const tab = routes[parts[0]] ? parts[0] : 'exercises';
  return { tab, params: routes[parts[0]] ? parts.slice(1) : [] };
}

function render() {
  const { tab, params } = parse();

  document.querySelectorAll('.tabbar a').forEach(a =>
    a.classList.toggle('active', a.dataset.tab === tab));

  actionEl.innerHTML = '';
  viewEl.innerHTML = '';

  const ctx = {
    params,
    el: viewEl,
    setTitle: t => { titleEl.textContent = t; document.title = `${t} · PT Coach`; },
    setBack: show => { backBtn.hidden = !show; },
    setAction: node => { actionEl.innerHTML = ''; if (node) actionEl.append(node); },
    rerender: render,
  };
  ctx.setBack(params.length > 0);
  routes[tab].render(ctx);
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
if (!location.hash) location.replace('#/exercises');
render();
