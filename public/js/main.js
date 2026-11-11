/* ===== KCAU SDA Church - public site script ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const text = (key, fallback) => typeof window.kcauText === 'function' ? window.kcauText(key, fallback) : fallback;
const pageLocale = () => document.documentElement.lang === 'sw' ? 'sw-KE' : 'en-GB';
const localized = (item, englishKey, swahiliKey) => {
  const isSwahili = document.documentElement.lang === 'sw';
  return {
    value: isSwahili ? item[swahiliKey] || item[englishKey] : item[englishKey],
    fallback: isSwahili && !item[swahiliKey],
  };
};
const API_BASE = document.documentElement.dataset.apiBase || '';
const renderImage = (image, alt) => /^\/uploads\/[\da-f]{32}\.(?:jpg|png|webp)$/.test(image || '')
  ? `<img class="content-image" src="${esc(API_BASE ? `${API_BASE}${image}` : location.hostname.endsWith('github.io') ? `/KCAUSDA${image}` : image)}" alt="${esc(alt)}" loading="lazy" />` : '';
if (!API_BASE && location.hostname.endsWith('github.io')) {
  const notice = document.querySelector('#backendNotice');
  if (notice) notice.hidden = false;
}
const api = async (url, opts) => {
  const res = await fetch(`${API_BASE}${url}`, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(data.error || 'Something went wrong');
    error.code = data.code;
    throw error;
  }
  return data;
};

/* ---------- date helpers ---------- */
const eventDate = (e) => new Date(`${e.date}T${e.time || '00:00'}:00`);
const isPast = (e) => eventDate(e) < new Date();
const nice12h = (t) => {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};
const longDate = (iso) => new Date(`${iso}T00:00:00`).toLocaleDateString(pageLocale(), { day: 'numeric', month: 'long', year: 'numeric' });

/* ---------- navbar, menu, scroll ---------- */
const nav = $('#nav'), burger = $('#burger'), menu = $('#menu'), toTop = $('#toTop');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 30);
  toTop.classList.toggle('show', scrollY > 600);
}, { passive: true });
burger.addEventListener('click', () => {
  setMenuOpen(!menu.classList.contains('open'));
});
function setMenuOpen(open) {
  const isMobileMenu = window.matchMedia('(max-width: 1100px)').matches;
  menu.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open && isMobileMenu);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? text('menuClose', 'Close menu') : text('menuOpen', 'Open menu'));
}
$$('#menu a').forEach((a) => a.addEventListener('click', () => setMenuOpen(false)));
document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !burger.contains(event.target)) setMenuOpen(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('open')) {
    setMenuOpen(false);
    burger.focus();
  }
});
toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
$('#year').textContent = new Date().getFullYear();

/* highlight active menu link */
const sections = $$('section[id]');
const linkObs = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) $$('#menu a').forEach((a) => a.classList.toggle('active', a.getAttribute('href') === `#${en.target.id}`));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach((s) => linkObs.observe(s));

/* scroll-reveal (works for items added later too) */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); revealObs.unobserve(en.target); } });
}, { threshold: 0.12 });
const watchReveal = () => $$('.reveal:not(.in)').forEach((el) => revealObs.observe(el));
watchReveal();

/* ---------- events ---------- */
let allEvents = [];
let eventFilter = 'upcoming';

function renderEvents() {
  const grid = $('#eventsGrid');
  let list = allEvents;
  if (eventFilter === 'upcoming') list = allEvents.filter((e) => !isPast(e));
  if (eventFilter === 'past') list = allEvents.filter(isPast).reverse();
  if (!list.length) {
    const emptyKey = eventFilter === 'upcoming' ? 'eventEmptyUpcoming' : eventFilter === 'past' ? 'eventEmptyPast' : 'eventEmptyAll';
    const fallback = eventFilter === 'upcoming' ? 'There are no upcoming events right now. Please check back soon!'
      : eventFilter === 'past' ? 'There are no past events to show.' : 'There are no events to show right now.';
    grid.innerHTML = `<div class="empty">${esc(text(emptyKey, fallback))}</div>`;
    return;
  }
  grid.innerHTML = list.map((e) => {
    const d = eventDate(e);
    const month = d.toLocaleDateString(pageLocale(), { month: 'short' });
    const title = localized(e, 'title', 'swTitle');
    const description = localized(e, 'description', 'swDescription');
    return `<article class="event reveal ${isPast(e) ? 'past' : ''}">
      <div class="date-badge"><b>${d.getDate()}</b><span>${esc(month)}</span></div>
      <div>
        ${renderImage(e.image, title.value)}
        <h4>${esc(title.value)}</h4>
        <p class="meta">${[nice12h(e.time), esc(e.location)].filter(Boolean).join(' · ')}</p>
        <p>${esc(description.value || '')}</p>
        ${title.fallback || description.fallback ? `<small class="language-note">${esc(text('englishFallbackNote', 'Kiswahili translation not provided; showing English.'))}</small>` : ''}
      </div>
    </article>`;
  }).join('');
  watchReveal();
}

$('#eventFilters').addEventListener('click', (ev) => {
  const b = ev.target.closest('.pill');
  if (!b) return;
  $$('#eventFilters .pill').forEach((p) => p.classList.toggle('active', p === b));
  eventFilter = b.dataset.f;
  renderEvents();
});

/* countdown to next upcoming event */
let countdownTimer;
function startCountdown() {
  clearInterval(countdownTimer);
  const next = allEvents.filter((e) => eventDate(e) > new Date())[0];
  const card = $('#nextCard');
  if (!next) { card.hidden = true; return; }
  card.hidden = false;
  $('#nextTitle').textContent = localized(next, 'title', 'swTitle').value;
  $('#nextMeta').textContent = [longDate(next.date), nice12h(next.time), next.location].filter(Boolean).join(' · ');
  const tick = () => {
    let diff = Math.max(0, eventDate(next) - new Date());
    const d = Math.floor(diff / 864e5); diff %= 864e5;
    const h = Math.floor(diff / 36e5); diff %= 36e5;
    const m = Math.floor(diff / 6e4); const s = Math.floor((diff % 6e4) / 1000);
    $('#countdown').innerHTML = [
      [d, text('countdownDays', 'days')],
      [h, text('countdownHours', 'hrs')],
      [m, text('countdownMinutes', 'min')],
      [s, text('countdownSeconds', 'sec')],
    ]
      .map(([v, l]) => `<div><b>${String(v).padStart(2, '0')}</b><span>${l}</span></div>`).join('');
  };
  tick();
  countdownTimer = setInterval(tick, 1000);
}

async function loadEvents() {
  try {
    allEvents = await api('/api/events');
    renderEvents();
    startCountdown();
  } catch {
    $('#eventsGrid').innerHTML = `<div class="empty">${esc(text('eventLoadError', 'Could not load events. Please refresh the page.'))}</div>`;
  }
}

/* ---------- news ---------- */
async function loadNews() {
  const grid = $('#newsGrid');
  try {
    const list = await api('/api/news');
    if (!list.length) { grid.innerHTML = `<div class="empty">${esc(text('newsEmpty', 'No news yet. Check back soon!'))}</div>`; return; }
    grid.innerHTML = list.map((n) => {
      const title = localized(n, 'title', 'swTitle');
      const body = localized(n, 'body', 'swBody');
      const content = body.value || '';
      return `<article class="news-card reveal">
        ${renderImage(n.image, title.value)}
        <time>${longDate(n.date)}</time>
        <h4>${esc(title.value)}</h4>
        <p class="clamp">${esc(content)}</p>
        ${title.fallback || body.fallback ? `<small class="language-note">${esc(text('englishFallbackNote', 'Kiswahili translation not provided; showing English.'))}</small>` : ''}
        ${content.length > 150 ? `<button class="more">${esc(text('readMore', 'Read more'))}</button>` : ''}
      </article>`;
    }).join('');
    $$('.news-card .more', grid).forEach((btn) => btn.addEventListener('click', () => {
      const p = btn.previousElementSibling;
      const open = p.classList.toggle('clamp');
      btn.textContent = open ? text('readMore', 'Read more') : text('showLess', 'Show less');
    }));
    watchReveal();
  } catch {
    grid.innerHTML = `<div class="empty">${esc(text('newsLoadError', 'Could not load news. Please refresh the page.'))}</div>`;
  }
}

/* ---------- family groups ---------- */
let groups = [];
async function loadGroups() {
  const grid = $('#groupsGrid');
  try {
    groups = await api('/api/groups');
    if (!groups.length) { grid.innerHTML = `<div class="empty">${esc(text('groupsEmpty', 'Family groups will be announced soon.'))}</div>`; return; }
    grid.innerHTML = groups.map((g, i) => {
      const name = localized(g, 'name', 'swName');
      const motto = localized(g, 'motto', 'swMotto');
      const meeting = localized(g, 'meeting', 'swMeeting');
      const description = localized(g, 'description', 'swDescription');
      const hasFallback = name.fallback || motto.fallback || meeting.fallback || description.fallback;
      return `<article class="group reveal">
        ${renderImage(g.image, name.value)}
        <div class="group-top">
          <div class="group-num">${i + 1}</div>
          <div><h4>${esc(name.value)}</h4>${motto.value ? `<span class="motto">“${esc(motto.value)}”</span>` : ''}</div>
        </div>
        <p>${esc(description.value || '')}</p>
        ${hasFallback ? `<small class="language-note">${esc(text('englishFallbackNote', 'Kiswahili translation not provided; showing English.'))}</small>` : ''}
        <ul>
          ${meeting.value ? `<li>🗓️ ${esc(meeting.value)}</li>` : ''}
          ${g.leader ? `<li>👤 ${esc(text('leaderPrefix', 'Leader:'))} ${esc(g.leader)}</li>` : ''}
          <li>👥 ${g.memberCount} ${esc(g.memberCount === 1 ? text('member', 'member') : text('members', 'members'))}</li>
        </ul>
        <button class="btn btn-gold" data-join="${esc(g.id)}">${esc(text('joinGroupPrefix', 'Join'))} ${esc(name.value)}</button>
      </article>`;
    }).join('');
    $$('[data-join]', grid).forEach((b) => b.addEventListener('click', () => openJoin(b.dataset.join)));
    watchReveal();
  } catch {
    grid.innerHTML = `<div class="empty">${esc(text('groupsLoadError', 'Could not load family groups. Please refresh.'))}</div>`;
  }
}

/* ---------- join modal ---------- */
const modal = $('#joinModal');
const joinForm = $('#joinForm');
const joinMsg = $('#joinMsg');

function openJoin(id) {
  const g = groups.find((x) => x.id === id);
  if (!g) return;
  joinForm.reset();
  joinMsg.textContent = ''; joinMsg.className = 'form-msg';
  $('#joinFormWrap').hidden = false;
  $('#joinSuccess').hidden = true;
  $('#joinWhatsAppLink').hidden = true;
  $('#joinWhatsAppLink').removeAttribute('href');
  $('#whatsAppInviteNote').hidden = true;
  $('#joinGroupId').value = g.id;
  $('#joinGroupName').textContent = localized(g, 'name', 'swName').value;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  setTimeout(() => joinForm.elements.name.focus(), 250);
}
function closeJoin() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
$('#joinClose').addEventListener('click', closeJoin);
$('#joinDone').addEventListener('click', closeJoin);
modal.addEventListener('click', (e) => { if (e.target === modal) closeJoin(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape') closeJoin(); });

joinForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = joinForm.querySelector('button[type=submit]');
  btn.disabled = true; btn.textContent = text('joining', 'Joining...');
  joinMsg.textContent = ''; joinMsg.className = 'form-msg';
  try {
    const body = Object.fromEntries(new FormData(joinForm));
    const res = await api('/api/join', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    $('#joinFormWrap').hidden = true;
    $('#joinSuccess').hidden = false;
    const group = groups.find((item) => item.id === body.groupId);
    $('#joinSuccessText').textContent = text('joinRequestSuccess', 'You have joined {group}. A group leader will contact you soon. God bless you!')
      .replace('{group}', group ? localized(group, 'name', 'swName').value : res.group);
    if (res.whatsappLink) {
      const inviteLink = $('#joinWhatsAppLink');
      inviteLink.href = res.whatsappLink;
      inviteLink.textContent = text('joinWhatsAppGroup', 'Join the WhatsApp group');
      inviteLink.hidden = false;
      $('#whatsAppInviteNote').hidden = false;
    }
    loadGroups();
  } catch (err) {
    joinMsg.textContent = err.message; joinMsg.className = 'form-msg err';
  } finally {
    btn.disabled = false; btn.textContent = text('joinButton', 'Join this group');
  }
});

/* ---------- contact form ---------- */
$('#contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const f = e.target, msg = $('#contactMsg'), btn = f.querySelector('button');
  msg.textContent = ''; msg.className = 'form-msg';
  if (f.elements.name.value.trim().length < 2) {
    msg.textContent = text('contactNameRequired', 'Please enter your name (at least 2 characters).');
    msg.classList.add('err');
    f.elements.name.focus();
    return;
  }
  if (f.elements.message.value.trim().length < 5) {
    msg.textContent = text('contactMessageRequired', 'Please enter a message (at least 5 characters).');
    msg.classList.add('err');
    f.elements.message.focus();
    return;
  }
  if (f.elements.email.value && !/^\S+@\S+\.\S+$/.test(f.elements.email.value.trim())) {
    msg.textContent = text('contactInvalid', 'Please enter a valid email address.');
    msg.classList.add('err');
    f.elements.email.focus();
    return;
  }
  btn.disabled = true;
  try {
    await api('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(f))) });
    msg.textContent = text('contactSuccess', 'Thank you! Your message has been sent.');
    msg.className = 'form-msg ok';
    f.reset();
  } catch (err) {
    msg.textContent = err.code === 'EMAIL_DELIVERY_FAILED'
      ? text('contactEmailFailed', 'Your message was saved, but email delivery failed. Please email kcausdasupport@gmail.com directly.')
      : err.message === 'That email does not look right.'
      ? text('contactInvalid', 'Please enter a valid email address.')
      : err instanceof TypeError
        ? text('contactUnavailable', 'The message could not be sent right now. Please try again later.')
        : err.message || text('contactGenericError', 'We could not send your message. Please try again.');
    msg.className = 'form-msg err';
  } finally { btn.disabled = false; }
});

window.addEventListener('kcau-language-change', () => {
  renderEvents();
  loadNews();
  loadGroups();
  setMenuOpen(false);
});

loadEvents();
loadNews();
loadGroups();
