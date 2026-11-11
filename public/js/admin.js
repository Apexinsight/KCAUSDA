/* ===== KCAU SDA Church - admin dashboard ===== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const adminImage = (image, alt) => /^\/uploads\/[\da-f]{32}\.(?:jpg|png|webp)$/.test(image || '')
  ? `<img src="${esc(image)}" alt="${esc(alt)}" loading="lazy" style="width:110px;height:76px;object-fit:cover;border-radius:8px;margin-bottom:8px" />` : '';

let token = sessionStorage.getItem('kcau_admin') || '';
let groups = [], members = [];

const toast = (msg) => {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
};

async function api(url, method = 'GET', body) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (res.status === 401 && token) { logout(); throw new Error('Session expired, please log in again'); }
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

async function formPayload(form) {
  const payload = Object.fromEntries(new FormData(form));
  const imageInput = form.querySelector('input[type="file"]');
  delete payload.imageFile;
  if (!imageInput?.files?.length) return payload;
  const file = imageInput.files[0];
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Choose a JPEG, PNG or WebP image.');
  if (file.size > 3 * 1024 * 1024) throw new Error('Images must be 3 MB or smaller.');
  payload.image = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error', () => reject(new Error('Could not read the selected image.')));
    reader.readAsDataURL(file);
  });
  return payload;
}

/* ---------- login ---------- */
function showDash() { $('#loginView').hidden = true; $('#dashView').hidden = false; loadAll(); }
function logout() {
  token = '';
  sessionStorage.removeItem('kcau_admin');
  $('#dashView').hidden = true;
  $('#loginForm').hidden = false;
  $('#loginView').hidden = false;
}
$('#logout').addEventListener('click', logout);

$('#loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  $('#loginMsg').textContent = '';
  try {
    const r = await api('/api/login', 'POST', { password: e.target.password.value });
    token = r.token;
    sessionStorage.setItem('kcau_admin', token);
    e.target.reset();
    showDash();
  } catch (err) {
    $('#loginMsg').textContent = err instanceof TypeError
      ? 'Cannot reach the church website server. Run npm.cmd start in the project folder, then open http://localhost:3000/admin.html.'
      : err.message;
  }
});

if (token) showDash();

/* ---------- tabs ---------- */
$('#tabs').addEventListener('click', (e) => {
  const b = e.target.closest('.pill'); if (!b) return;
  $$('#tabs .pill').forEach((p) => p.classList.toggle('active', p === b));
  $$('.panel').forEach((p) => p.classList.toggle('show', p.id === `p-${b.dataset.t}`));
});

const fmtDate = (iso) => iso ? new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

/* ---------- events ---------- */
async function loadEvents() {
  const list = await api('/api/events');
  const attendance = await api('/api/attendance');
  $('#eventList').innerHTML = list.length ? list.map((e) => `<div class="item"><div>
      ${adminImage(e.image, e.title)}
      <h4>${esc(e.title)}${e.swTitle ? ' · ' + esc(e.swTitle) : ''}</h4><p>${fmtDate(e.date)} ${esc(e.time)} · ${esc(e.location)}</p><p>${esc(e.description)}</p><p>${attendance[e.id] || 0} anonymous check-ins</p></div>
      <div class="actions"><button class="edit" data-qr="${esc(e.id)}">Check-in QR</button><button class="del" data-del="events/${esc(e.id)}">Delete</button></div></div>`).join('') : '<div class="empty">No events yet.</div>';
}
$('#refreshAttendance').addEventListener('click', () => loadEvents().then(() => toast('Attendance totals updated')).catch((err) => toast(err.message)));
$('#eventForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  try { await api('/api/events', 'POST', await formPayload(e.target)); e.target.reset(); toast('Event published'); loadEvents(); }
  catch (err) { toast(err.message); }
});

/* ---------- news ---------- */
async function loadNews() {
  const list = await api('/api/news');
  $('#newsList').innerHTML = list.length ? list.map((n) => `<div class="item"><div>
    ${adminImage(n.image, n.title)}
      <h4>${esc(n.title)}${n.swTitle ? ' · ' + esc(n.swTitle) : ''}</h4><p>${fmtDate(n.date)}</p><p>${esc(n.body.slice(0, 160))}${n.body.length > 160 ? '…' : ''}</p></div>
      <button class="del" data-del="news/${n.id}">Delete</button></div>`).join('') : '<div class="empty">No news yet.</div>';
}

/* ---------- digital gatherings and bulletins ---------- */
async function loadDigital() {
  const [sessions, bulletins] = await Promise.all([
    api('/api/digital/sessions'),
    api('/api/digital/bulletins'),
  ]);
  $('#sessionList').innerHTML = sessions.length ? sessions.map((item) => `<div class="item"><div>
      ${adminImage(item.image, item.title)}
      <h4>${esc(item.title)}</h4><p>${esc(item.type)} · ${fmtDate(item.date)} ${esc(item.time)}</p>
      <p>${esc(item.description)}</p><p>${item.url ? 'Meeting link is set' : 'No meeting link published yet'}</p></div>
      <button class="del" data-del="digital/sessions/${esc(item.id)}">Delete</button></div>`).join('')
    : '<div class="empty">No upcoming online gatherings.</div>';
  $('#bulletinList').innerHTML = bulletins.length ? bulletins.map((item) => `<div class="item"><div>
      ${adminImage(item.image, item.title)}
      <h4>${esc(item.title)}</h4><p>Week beginning ${fmtDate(item.weekOf)}</p>
      <p>${esc(item.body.slice(0, 180))}${item.body.length > 180 ? '…' : ''}</p>
      <p>${item.swBody ? 'Kiswahili version available' : 'English version only'}</p></div>
      <button class="del" data-del="digital/bulletins/${esc(item.id)}">Delete</button></div>`).join('')
    : '<div class="empty">No weekly bulletins have been published.</div>';
}

$('#sessionForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    await api('/api/digital/sessions', 'POST', await formPayload(e.target));
    e.target.reset();
    toast('Gathering published');
    await loadDigital();
  } catch (err) { toast(err.message); }
});

$('#bulletinForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    await api('/api/digital/bulletins', 'POST', await formPayload(e.target));
    e.target.reset();
    toast('Bulletin published');
    await loadDigital();
  } catch (err) { toast(err.message); }
});
$('#newsForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  try { await api('/api/news', 'POST', await formPayload(e.target)); e.target.reset(); toast('News published'); loadNews(); }
  catch (err) { toast(err.message); }
});

/* ---------- photo gallery and social links ---------- */
async function loadGallery() {
  const photos = await api('/api/gallery');
  $('#galleryAdminList').innerHTML = photos.length ? photos.map((photo) => `<div class="item"><div>
      ${adminImage(photo.image, photo.title || 'Church photo')}
      <h4>${esc(photo.title || 'Church photo')}${photo.swTitle ? ` · ${esc(photo.swTitle)}` : ''}</h4>
      <p>Added ${new Date(photo.createdAt).toLocaleDateString('en-GB')}</p>
    </div><button class="del" data-del="gallery/${esc(photo.id)}">Delete</button></div>`).join('')
    : '<div class="empty">No gallery photos yet.</div>';
}

async function loadSocialLinks() {
  const links = await api('/api/social-links');
  for (const platform of ['tiktok', 'instagram', 'youtube']) {
    $('#socialLinksForm').elements[platform].value = links[platform] || '';
  }
}

$('#galleryForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    await api('/api/gallery', 'POST', await formPayload(e.target));
    e.target.reset();
    toast('Photo added to the gallery');
    await loadGallery();
  } catch (err) { toast(err.message); }
});

$('#socialLinksForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    await api('/api/social-links', 'PUT', Object.fromEntries(new FormData(e.target)));
    toast('Social links saved');
  } catch (err) { toast(err.message); }
});

/* ---------- groups ---------- */
async function loadGroups() {
  groups = await api('/api/groups');
  $('#groupList').innerHTML = groups.length ? groups.map((g) => `<div class="item"><div>
      ${adminImage(g.image, g.name)}
      <h4>${esc(g.name)}${g.swName ? ' · ' + esc(g.swName) : ''} <small style="color:var(--muted);font-weight:400">· ${g.memberCount} member${g.memberCount === 1 ? '' : 's'}</small></h4>
      <p>${esc(g.motto)}</p><p>${esc(g.meeting)}${g.leader ? ' · Leader: ' + esc(g.leader) : ''}</p>
      <p>${g.whatsappLink ? 'WhatsApp invite link is set' : 'No WhatsApp invite link'}</p></div>
      <div class="actions"><button class="edit" data-edit="${g.id}">Edit</button><button class="del" data-del="groups/${g.id}">Delete</button></div></div>`).join('')
    : '<div class="empty">No family groups yet.</div>';
  $('#memberGroupFilter').innerHTML = '<option value="">All groups</option>' + groups.map((g) => `<option value="${g.id}">${esc(g.name)}${g.swName ? ' · ' + esc(g.swName) : ''}</option>`).join('');
}

const groupForm = $('#groupForm');
function resetGroupForm() {
  groupForm.reset(); groupForm.elements.id.value = '';
  $('#groupFormTitle').textContent = 'Add a family group';
  $('#groupSubmit').textContent = 'Add group'; $('#groupCancel').hidden = true;
}
$('#groupCancel').addEventListener('click', resetGroupForm);
groupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  let data;
  try { data = await formPayload(groupForm); }
  catch (err) { toast(err.message); return; }
  const id = data.id; delete data.id;
  try {
    if (id) await api(`/api/groups/${id}`, 'PUT', data); else await api('/api/groups', 'POST', data);
    toast(id ? 'Group updated' : 'Group added'); resetGroupForm(); loadGroups();
  } catch (err) { toast(err.message); }
});

/* ---------- members ---------- */
const groupName = (id) => groups.find((g) => g.id === id)?.name || 'Unassigned';

function renderMembers() {
  const gid = $('#memberGroupFilter').value;
  const q = $('#memberSearch').value.toLowerCase().trim();
  const rows = members.filter((m) => (!gid || m.groupId === gid) && (!q || m.name.toLowerCase().includes(q) || m.phone.includes(q)));
  $('#memberStats').innerHTML = `<div class="stat"><b>${members.length}</b>Total members</div>` +
    groups.map((g) => `<div class="stat"><b>${members.filter((m) => m.groupId === g.id).length}</b>${esc(g.name)}</div>`).join('');
  $('#memberRows').innerHTML = rows.length ? rows.map((m) => `<tr>
      <td>${esc(m.name)}</td><td>${esc(m.phone)}</td><td>${esc(m.email)}</td><td>${esc(m.course)}</td><td>${esc(m.year)}</td>
      <td>${esc(groupName(m.groupId))}</td><td>${fmtDate(m.joinedAt.slice(0, 10))}</td>
      <td><button class="del" data-del="members/${m.id}">Remove</button></td></tr>`).join('')
    : '<tr><td colspan="8" style="text-align:center;color:var(--muted)">No members found.</td></tr>';
}
async function loadMembers() { members = await api('/api/members'); renderMembers(); }
$('#memberGroupFilter').addEventListener('change', renderMembers);
$('#memberSearch').addEventListener('input', renderMembers);

$('#exportCsv').addEventListener('click', () => {
  const q = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const head = ['Name', 'Phone', 'Email', 'Course', 'Year', 'Group', 'Joined'];
  const lines = [head.map(q).join(',')].concat(members.map((m) =>
    [m.name, m.phone, m.email, m.course, m.year, groupName(m.groupId), m.joinedAt].map(q).join(',')));
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/csv' }));
  a.download = 'kcau-sda-family-group-members.csv'; a.click();
});

/* ---------- messages ---------- */
async function loadMessages() {
  const list = await api('/api/messages');
  $('#messageList').innerHTML = list.length ? list.map((m) => `<div class="item"><div>
      <h4>${esc(m.name)} <small style="color:var(--muted);font-weight:400">${esc(m.email)}</small></h4>
      <p>${new Date(m.sentAt).toLocaleString('en-GB')}</p><p style="color:var(--ink)">${esc(m.message)}</p></div>
      <button class="del" data-del="messages/${m.id}">Delete</button></div>`).join('') : '<div class="empty">No messages yet.</div>';
}

/* ---------- shared: edit + delete clicks ---------- */
document.addEventListener('click', async (e) => {
  const qrButton = e.target.closest('[data-qr]');
  if (qrButton) {
    const panel = $('#eventQrPanel');
    try {
      const data = await api(`/api/events/${encodeURIComponent(qrButton.dataset.qr)}/check-in-qr`);
      panel.hidden = false;
      panel.innerHTML = `<h3>${esc(data.event.title)} · Event check-in</h3>
        <p>Current anonymous check-ins: <strong>${data.count}</strong></p>
        <img src="${esc(data.qr)}" alt="Check-in QR code for ${esc(data.event.title)}" />
        <p><a href="${esc(data.url)}" target="_blank" rel="noopener noreferrer">Open check-in page</a></p>`;
      panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (err) { toast(err.message); }
    return;
  }
  const edit = e.target.closest('[data-edit]');
  if (edit) {
    const g = groups.find((x) => x.id === edit.dataset.edit); if (!g) return;
    for (const k of ['name', 'swName', 'motto', 'swMotto', 'meeting', 'swMeeting', 'leader', 'whatsappLink', 'description', 'swDescription']) groupForm.elements[k].value = g[k] || '';
    groupForm.elements.imageFile.value = '';
    groupForm.elements.id.value = g.id;
    $('#groupFormTitle').textContent = 'Edit family group';
    $('#groupSubmit').textContent = 'Save changes'; $('#groupCancel').hidden = false;
    groupForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }
  const del = e.target.closest('[data-del]');
  if (!del) return;
  const [kind] = del.dataset.del.split('/');
  const warn = kind === 'groups' ? 'Delete this family group? Its members stay on record as "Unassigned".' : 'Delete this item? This cannot be undone.';
  if (!confirm(warn)) return;
  try { await api(`/api/${del.dataset.del}`, 'DELETE'); toast('Deleted'); loadAll(); }
  catch (err) { toast(err.message); }
});

async function loadAll() {
  try { await loadGroups(); await Promise.all([loadEvents(), loadNews(), loadDigital(), loadMembers(), loadMessages()]); }
  catch (err) { if (token) toast(err.message); }
  try { await Promise.all([loadGallery(), loadSocialLinks()]); }
  catch (err) { if (token) toast(err.message); }
}
