/**
 * KCAU SDA Church website - server
 * Run:  npm install  then  npm start   (opens on http://localhost:3000)
 * Admin dashboard: http://localhost:3000/admin.html
 *
 * IMPORTANT: change the admin password! Either edit ADMIN_PASSWORD below
 * or set it as an environment variable:  ADMIN_PASSWORD="mySecret" npm start
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const os = require('os');

const envResult = require('dotenv').config();
if (envResult.error && envResult.error.code !== 'ENOENT') {
  console.error('Could not load the .env configuration file:', envResult.error.message);
}

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (process.env.VERCEL ? '' : 'kcau-sda-admin');
const SUPPORT_EMAIL = 'kcausdasupport@gmail.com';
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = (process.env.SMTP_USER || '').trim();
const SMTP_PASS = (process.env.SMTP_PASS || '').replace(/\s/g, '');
const SMTP_SECURE = process.env.SMTP_SECURE
  ? process.env.SMTP_SECURE.toLowerCase() === 'true'
  : SMTP_PORT === 465;
// Vercel Functions can only write to /tmp, and that storage is temporary.
const VERCEL_DATA_ROOT = process.env.VERCEL ? path.join(os.tmpdir(), 'kcau-sda') : null;
const DATA_DIR = process.env.DATA_DIR || (VERCEL_DATA_ROOT ? path.join(VERCEL_DATA_ROOT, 'data') : path.join(__dirname, 'data'));
const UPLOAD_DIR = process.env.UPLOAD_DIR || (VERCEL_DATA_ROOT ? path.join(VERCEL_DATA_ROOT, 'uploads') : path.join(__dirname, 'public', 'uploads'));

app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));

/* ---------- tiny JSON "database" ---------- */
const FILES = {
  events: 'events.json',
  news: 'news.json',
  groups: 'groups.json',
  members: 'members.json',
  messages: 'messages.json',
  sessions: 'sessions.json',
  bulletins: 'bulletins.json',
  attendance: 'attendance.json',
  gallery: 'gallery.json',
  socialLinks: 'social-links.json',
};

const today = new Date();
const inDays = (n) => {
  const d = new Date(today);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
};

const SEED = {
  events: [
    { id: 'e1', title: 'Sabbath Divine Service', swTitle: 'Ibada Kuu ya Sabato', date: inDays(3), time: '11:00', location: 'Main Auditorium, KCAU', description: 'Join us for worship, the Word and fellowship every Sabbath.', swDescription: 'Jiunge nasi kwa ibada, Neno la Mungu na ushirika kila Sabato.' },
    { id: 'e2', title: 'Youth Vespers (AY)', swTitle: 'Ibada ya Jioni ya Vijana (AY)', date: inDays(10), time: '17:30', location: 'Chapel Hall', description: 'An evening of songs, testimonies and a short devotional led by the youth.', swDescription: 'Jioni ya nyimbo, shuhuda na tafakari fupi inayoongozwa na vijana.' },
    { id: 'e3', title: 'Week of Prayer', swTitle: 'Juma la Maombi', date: inDays(24), time: '18:00', location: 'Main Auditorium, KCAU', description: 'A week of daily prayer and Bible study. Come expecting a blessing.', swDescription: 'Juma la maombi ya kila siku na kujifunza Biblia. Njoo ukitarajia baraka.' },
  ],
  news: [
    { id: 'n1', title: 'Welcome to the new semester!', swTitle: 'Karibu katika muhula mpya!', date: inDays(-2), body: 'We warmly welcome all new and continuing students to KCAU SDA Church. Join a family group this week and find your spiritual home on campus.', swBody: 'Tunawakaribisha kwa furaha wanafunzi wapya na wanaoendelea katika Kanisa la KCAU SDA. Jiunge na kikundi cha familia wiki hii upate makao yako ya kiroho chuoni.' },
    { id: 'n2', title: 'Choir auditions open', swTitle: 'Usaili wa kwaya umefunguliwa', date: inDays(-6), body: 'The church choir is looking for new voices. All voice parts are welcome. Speak to any choir member after service.', swBody: 'Kwaya ya kanisa inatafuta waimbaji wapya. Sauti zote zinakaribishwa. Zungumza na mwanakwaya yeyote baada ya ibada.' },
  ],
  groups: [
    { id: 'g1', name: 'Family Group 1', swName: 'Kikundi cha Familia 1', motto: 'Rooted in the Word', swMotto: 'Imara katika Neno', meeting: 'Wednesdays, 7:00 PM', swMeeting: 'Jumatano, saa 1:00 usiku', leader: '', description: 'A warm circle for Bible study, prayer and friendship.', swDescription: 'Kikundi chenye ukarimu kwa kujifunza Biblia, maombi na urafiki.' },
    { id: 'g2', name: 'Family Group 2', swName: 'Kikundi cha Familia 2', motto: 'Together in Christ', swMotto: 'Pamoja katika Kristo', meeting: 'Wednesdays, 7:00 PM', swMeeting: 'Jumatano, saa 1:00 usiku', leader: '', description: 'Fellowship, shared meals and growing together in faith.', swDescription: 'Ushirika, milo ya pamoja na kukua pamoja katika imani.' },
    { id: 'g3', name: 'Family Group 3', swName: 'Kikundi cha Familia 3', motto: 'Lights on the Hill', swMotto: 'Nuru juu ya Kilima', meeting: 'Thursdays, 7:00 PM', swMeeting: 'Alhamisi, saa 1:00 usiku', leader: '', description: 'Mission-minded friends serving our campus and community.', swDescription: 'Marafiki wenye moyo wa utume wanaohudumia chuo na jamii.' },
    { id: 'g4', name: 'Family Group 4', swName: 'Kikundi cha Familia 4', motto: 'Faith in Action', swMotto: 'Imani kwa Vitendo', meeting: 'Thursdays, 7:00 PM', swMeeting: 'Alhamisi, saa 1:00 usiku', leader: '', description: 'Prayer, praise and practical service to others.', swDescription: 'Maombi, sifa na huduma ya vitendo kwa wengine.' },
    { id: 'g5', name: 'Family Group 5', swName: 'Kikundi cha Familia 5', motto: 'Hope for Every Heart', swMotto: 'Tumaini kwa Kila Moyo', meeting: 'Fridays, 6:30 PM', swMeeting: 'Ijumaa, saa 12:30 jioni', leader: '', description: 'A welcoming space to ask questions and grow in grace.', swDescription: 'Mahali pa ukaribisho pa kuuliza maswali na kukua katika neema.' },
  ],
  members: [],
  messages: [],
  sessions: [],
  bulletins: [],
  attendance: [],
  gallery: [],
  socialLinks: { tiktok: '', instagram: '', youtube: '' },
};

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
app.use('/uploads', express.static(UPLOAD_DIR));
for (const key of Object.keys(FILES)) {
  const f = path.join(DATA_DIR, FILES[key]);
  if (!fs.existsSync(f)) fs.writeFileSync(f, JSON.stringify(SEED[key], null, 2));
}

const CHECKIN_KEY_FILE = path.join(DATA_DIR, '.checkin-key');
if (!fs.existsSync(CHECKIN_KEY_FILE)) fs.writeFileSync(CHECKIN_KEY_FILE, crypto.randomBytes(32).toString('hex'), { mode: 0o600 });
const CHECKIN_SECRET = fs.readFileSync(CHECKIN_KEY_FILE, 'utf8').trim();
const loginRequestAttempts = new Map();
const contactAttempts = new Map();
let emailTransport;

const getEmailTransport = () => {
  if (SMTP_USER.toLowerCase() !== SUPPORT_EMAIL || !SMTP_PASS || !Number.isInteger(SMTP_PORT) || SMTP_PORT < 1 || SMTP_PORT > 65535) {
    throw new Error(`Email is not configured. Set SMTP_USER to ${SUPPORT_EMAIL} and configure SMTP_PASS.`);
  }
  if (!emailTransport) {
    emailTransport = require('nodemailer').createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }
  return emailTransport;
};

const sendSupportEmail = async (message) => getEmailTransport().sendMail({
  ...message,
  from: { name: 'KCAU SDA Church Support', address: SUPPORT_EMAIL },
  to: SUPPORT_EMAIL,
});

const isRateLimited = (store, key, limit, windowMs) => {
  const now = Date.now();
  const recent = (store.get(key) || []).filter((time) => now - time < windowMs);
  if (recent.length >= limit) {
    store.set(key, recent);
    return true;
  }
  recent.push(now);
  store.set(key, recent);
  if (store.size > 2000) {
    for (const [storedKey, times] of store) {
      if (!times.some((time) => now - time < windowMs)) store.delete(storedKey);
    }
  }
  return false;
};
const requestIp = (req) => req.ip || req.socket.remoteAddress || 'unknown';

const read = (key) => {
  try { return JSON.parse(fs.readFileSync(path.join(DATA_DIR, FILES[key]), 'utf8')); }
  catch { return []; }
};
const write = (key, data) =>
  fs.writeFileSync(path.join(DATA_DIR, FILES[key]), JSON.stringify(data, null, 2));
const newId = () => crypto.randomBytes(6).toString('hex');
const clean = (v, max = 500) => String(v ?? '').trim().slice(0, max);
const MAX_IMAGE_BYTES = 3 * 1024 * 1024;
const storeImage = (value) => {
  if (!value) return { url: '', error: '', status: 200 };
  if (typeof value !== 'string' || value.length > Math.ceil(MAX_IMAGE_BYTES * 4 / 3) + 100) {
    return { url: '', error: 'Images must be 3 MB or smaller.', status: 400 };
  }
  const match = /^data:image\/(jpeg|png|webp);base64,([A-Za-z\d+/]+={0,2})$/.exec(value);
  if (!match) return { url: '', error: 'Choose a JPEG, PNG or WebP image.', status: 400 };
  const image = Buffer.from(match[2], 'base64');
  if (!image.length || image.length > MAX_IMAGE_BYTES) return { url: '', error: 'Images must be 3 MB or smaller.', status: 400 };

  const signatures = {
    jpeg: image.length >= 3 && image[0] === 0xff && image[1] === 0xd8 && image[2] === 0xff,
    png: image.length >= 8 && image.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
    webp: image.length >= 12 && image.toString('ascii', 0, 4) === 'RIFF' && image.toString('ascii', 8, 12) === 'WEBP',
  };
  if (!signatures[match[1]]) return { url: '', error: 'The selected file is not a valid image.', status: 400 };

  const extension = match[1] === 'jpeg' ? 'jpg' : match[1];
  const filename = `${crypto.randomBytes(16).toString('hex')}.${extension}`;
  try {
    fs.writeFileSync(path.join(UPLOAD_DIR, filename), image, { flag: 'wx' });
  } catch (error) {
    console.error('Could not save uploaded church image:', error);
    return { url: '', error: 'Could not save the image. Please try again.', status: 500 };
  }
  return { url: `/uploads/${filename}`, error: '', status: 200 };
};
const deleteStoredImage = (url) => {
  const match = /^\/uploads\/([\da-f]{32}\.(?:jpg|png|webp))$/.exec(String(url || ''));
  if (!match) return;
  try { fs.unlinkSync(path.join(UPLOAD_DIR, match[1])); }
  catch (error) {
    if (error.code !== 'ENOENT') console.error('Could not remove church image:', error);
  }
};
for (const [key, translations] of Object.entries({
  events: [['title', 'swTitle'], ['description', 'swDescription']],
  news: [['title', 'swTitle'], ['body', 'swBody']],
  groups: [['name', 'swName'], ['motto', 'swMotto'], ['meeting', 'swMeeting'], ['description', 'swDescription']],
})) {
  const items = read(key);
  let changed = false;
  for (const item of items) {
    const seed = SEED[key].find((candidate) => candidate.id === item.id);
    if (!seed) continue;
    for (const [source, translated] of translations) {
      if (!item[translated] && item[source] === seed[source] && seed[translated]) {
        item[translated] = seed[translated];
        changed = true;
      }
    }
  }
  if (changed) write(key, items);
}
const isDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
};
const isTime = (value) => !value || /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
const safeUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : '';
  } catch { return ''; }
};
const safeWhatsAppGroupLink = (value) => {
  if (!value) return '';
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname.toLowerCase() === 'chat.whatsapp.com'
      && !url.username && !url.password && url.pathname.length > 1 && !url.search && !url.hash
      ? url.toString() : '';
  } catch { return ''; }
};
const safeSocialUrl = (value, domain) => {
  if (!value) return '';
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    return url.protocol === 'https:' && !url.username && !url.password
      && (hostname === domain || hostname.endsWith(`.${domain}`)) ? url.toString() : '';
  } catch { return ''; }
};
const checkinSignature = (eventId) => crypto.createHmac('sha256', CHECKIN_SECRET).update(eventId).digest('hex');
const safeHexEqual = (left, right) => {
  if (!/^[\da-f]{64}$/i.test(left) || !/^[\da-f]{64}$/i.test(right)) return false;
  return crypto.timingSafeEqual(Buffer.from(left, 'hex'), Buffer.from(right, 'hex'));
};
const checkinAttempts = new Map();

/* ---------- admin auth (simple token) ---------- */
const tokens = new Set();

app.post('/api/login', (req, res) => {
  if (!ADMIN_PASSWORD) {
    return res.status(503).json({ error: 'Admin sign-in is not configured. Set ADMIN_PASSWORD in the Vercel project settings.' });
  }
  if (isRateLimited(loginRequestAttempts, requestIp(req), 10, 15 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many sign-in attempts. Please wait and try again.' });
  }
  const given = Buffer.from(String(req.body.password || ''));
  const real = Buffer.from(ADMIN_PASSWORD);
  const ok = given.length === real.length && crypto.timingSafeEqual(given, real);
  if (!ok) return res.status(401).json({ error: 'Wrong password' });
  const token = crypto.randomBytes(24).toString('hex');
  tokens.add(token);
  res.json({ token });
});

const admin = (req, res, next) => {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  if (!tokens.has(token)) return res.status(401).json({ error: 'Not authorised' });
  next();
};

/* ---------- events ---------- */
app.get('/api/events', (req, res) => {
  const list = read('events').sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  res.json(list);
});

app.post('/api/events', admin, (req, res) => {
  const { title, swTitle, date, time, location, description, swDescription } = req.body;
  if (!clean(title) || !clean(date)) return res.status(400).json({ error: 'Title and date are required' });
  const image = storeImage(req.body.image);
  if (image.error) return res.status(image.status).json({ error: image.error });
  const item = { id: newId(), title: clean(title, 120), swTitle: clean(swTitle, 120), date: clean(date, 10), time: clean(time, 5), location: clean(location, 120), description: clean(description, 600), swDescription: clean(swDescription, 600), image: image.url };
  const list = read('events'); list.push(item); write('events', list);
  res.json(item);
});

app.delete('/api/events/:id', admin, (req, res) => {
  read('events').filter((event) => event.id === req.params.id).forEach((event) => deleteStoredImage(event.image));
  write('events', read('events').filter((e) => e.id !== req.params.id));
  write('attendance', read('attendance').filter((item) => item.eventId !== req.params.id));
  res.json({ ok: true });
});

/* ---------- live streams, online meetings and weekly bulletin ---------- */
app.get('/api/digital/sessions', (req, res) => {
  const cutoff = Date.now() - 3 * 60 * 60 * 1000;
  res.json(read('sessions')
    .filter((item) => new Date(`${item.date}T${item.time || '00:00'}:00`).getTime() >= cutoff)
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)));
});

app.post('/api/digital/sessions', admin, (req, res) => {
  const { title, swTitle, type, date, time, url, description, swDescription } = req.body;
  const allowedTypes = ['stream', 'bible-study', 'prayer'];
  const link = clean(url, 500);
  if (!clean(title) || !allowedTypes.includes(type) || !isDate(date) || !isTime(time)) {
    return res.status(400).json({ error: 'Enter a title, valid session type, date and time.' });
  }
  if (link && !safeUrl(link)) return res.status(400).json({ error: 'Session link must be a valid HTTPS URL.' });
  const image = storeImage(req.body.image);
  if (image.error) return res.status(image.status).json({ error: image.error });
  const item = {
    id: newId(), title: clean(title, 120), swTitle: clean(swTitle, 120), type, date, time: clean(time, 5),
    url: link ? safeUrl(link) : '', description: clean(description, 600), swDescription: clean(swDescription, 600),
    image: image.url,
  };
  const list = read('sessions');
  list.push(item);
  write('sessions', list);
  res.json(item);
});

app.delete('/api/digital/sessions/:id', admin, (req, res) => {
  read('sessions').filter((item) => item.id === req.params.id).forEach((item) => deleteStoredImage(item.image));
  write('sessions', read('sessions').filter((item) => item.id !== req.params.id));
  res.json({ ok: true });
});

app.get('/api/digital/bulletins', (req, res) => {
  res.json(read('bulletins').sort((a, b) => b.weekOf.localeCompare(a.weekOf)));
});

app.post('/api/digital/bulletins', admin, (req, res) => {
  const { title, weekOf, body, swTitle, swBody } = req.body;
  if (!clean(title) || !isDate(weekOf) || !clean(body)) {
    return res.status(400).json({ error: 'Enter a title, week date and bulletin content.' });
  }
  const image = storeImage(req.body.image);
  if (image.error) return res.status(image.status).json({ error: image.error });
  const item = {
    id: newId(), title: clean(title, 140), weekOf, body: clean(body, 6000),
    swTitle: clean(swTitle, 140), swBody: clean(swBody, 6000), publishedAt: new Date().toISOString(),
    image: image.url,
  };
  const list = read('bulletins');
  list.push(item);
  write('bulletins', list);
  res.json(item);
});

app.delete('/api/digital/bulletins/:id', admin, (req, res) => {
  read('bulletins').filter((item) => item.id === req.params.id).forEach((item) => deleteStoredImage(item.image));
  write('bulletins', read('bulletins').filter((item) => item.id !== req.params.id));
  res.json({ ok: true });
});

/* ---------- church photo gallery and social links ---------- */
app.get('/api/gallery', (req, res) => {
  res.json(read('gallery').slice().reverse());
});

app.post('/api/gallery', admin, (req, res) => {
  const image = storeImage(req.body.image);
  if (image.error) return res.status(image.status).json({ error: image.error });
  if (!image.url) return res.status(400).json({ error: 'Choose a photo for the gallery.' });
  const item = {
    id: newId(), image: image.url, title: clean(req.body.title, 120),
    swTitle: clean(req.body.swTitle, 120), createdAt: new Date().toISOString(),
  };
  const gallery = read('gallery');
  gallery.push(item);
  write('gallery', gallery);
  res.json(item);
});

app.delete('/api/gallery/:id', admin, (req, res) => {
  const gallery = read('gallery');
  gallery.filter((item) => item.id === req.params.id).forEach((item) => deleteStoredImage(item.image));
  write('gallery', gallery.filter((item) => item.id !== req.params.id));
  res.json({ ok: true });
});

const SOCIAL_DOMAINS = { tiktok: 'tiktok.com', instagram: 'instagram.com', youtube: 'youtube.com' };
app.get('/api/social-links', (req, res) => res.json(read('socialLinks')));

app.put('/api/social-links', admin, (req, res) => {
  const links = {};
  for (const [platform, domain] of Object.entries(SOCIAL_DOMAINS)) {
    const value = clean(req.body[platform], 500);
    links[platform] = value ? safeSocialUrl(value, domain) : '';
    if (value && !links[platform] && platform === 'youtube' && safeSocialUrl(value, 'youtu.be')) links[platform] = safeSocialUrl(value, 'youtu.be');
    if (value && !links[platform]) return res.status(400).json({ error: `Enter a valid HTTPS ${platform} profile link.` });
  }
  write('socialLinks', links);
  res.json(links);
});

app.get('/api/digital/search', (req, res) => {
  const query = clean(req.query.q, 120).toLocaleLowerCase();
  if (query.length < 2) return res.json([]);
  const results = [
    ...read('events').map((item) => ({ kind: 'Event', swKind: 'Tukio', title: item.title, swTitle: item.swTitle, text: item.description, swText: item.swDescription, href: '#events', date: item.date })),
    ...read('news').map((item) => ({ kind: 'Notice', swKind: 'Tangazo', title: item.title, swTitle: item.swTitle, text: item.body, swText: item.swBody, href: '#news', date: item.date })),
    ...read('bulletins').map((item) => ({ kind: 'Bulletin', swKind: 'Taarifa', title: item.title, swTitle: item.swTitle, text: item.body, swText: item.swBody, href: '#digital', date: item.weekOf })),
    ...read('sessions').map((item) => ({ kind: 'Online gathering', swKind: 'Mkutano wa mtandaoni', title: item.title, swTitle: item.swTitle, text: item.description, swText: item.swDescription, href: '#digital', date: item.date })),
  ];
  res.json(results
    .filter((item) => `${item.title} ${item.swTitle || ''} ${item.text} ${item.swText || ''}`.toLocaleLowerCase().includes(query))
    .slice(0, 20));
});

app.get('/api/events/:id/check-in-qr', admin, async (req, res) => {
  const event = read('events').find((item) => item.id === req.params.id);
  if (!event) return res.status(404).json({ error: 'Event not found.' });
  const checkinUrl = new URL('/', `${req.protocol}://${req.get('host')}`);
  checkinUrl.searchParams.set('checkin', event.id);
  checkinUrl.searchParams.set('token', checkinSignature(event.id));
  try {
    const qr = await require('qrcode').toDataURL(checkinUrl.toString(), { width: 320, margin: 2, errorCorrectionLevel: 'M' });
    res.json({
      event: { id: event.id, title: event.title, date: event.date, time: event.time },
      url: checkinUrl.toString(),
      qr,
      count: read('attendance').filter((item) => item.eventId === event.id).length,
    });
  } catch (error) {
    console.error('Could not generate event check-in QR code:', error);
    res.status(500).json({ error: 'Could not generate the check-in QR code.' });
  }
});

app.post('/api/check-in', (req, res) => {
  const eventId = clean(req.body.eventId, 40);
  const signature = String(req.body.token || '');
  const attendanceId = String(req.body.attendanceId || '');
  if (!safeHexEqual(signature, checkinSignature(eventId))) return res.status(403).json({ error: 'This check-in link is invalid.' });

  const now = Date.now();
  const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
  const recentAttempts = (checkinAttempts.get(clientIp) || []).filter((time) => now - time < 60_000);
  if (recentAttempts.length >= 20) return res.status(429).json({ error: 'Too many check-in attempts. Please wait a minute and try again.' });
  recentAttempts.push(now);
  checkinAttempts.set(clientIp, recentAttempts);
  if (checkinAttempts.size > 1000) {
    for (const [ip, times] of checkinAttempts) {
      if (!times.some((time) => now - time < 60_000)) checkinAttempts.delete(ip);
    }
  }

  const event = read('events').find((item) => item.id === eventId);
  if (!event) return res.status(404).json({ error: 'This event is no longer available.' });
  if (!/^[\da-f-]{36}$/i.test(attendanceId)) return res.status(400).json({ error: 'Please reload the check-in page and try again.' });

  const startsAt = new Date(`${event.date}T${event.time || '11:00'}:00`).getTime();
  if (now < startsAt - 2 * 60 * 60 * 1000 || now > startsAt + 6 * 60 * 60 * 1000) {
    return res.status(400).json({ error: 'Check-in is available from two hours before until six hours after the event.' });
  }

  const fingerprint = crypto.createHash('sha256').update(`${eventId}:${attendanceId}`).digest('hex');
  const attendance = read('attendance');
  if (attendance.some((item) => item.fingerprint === fingerprint)) {
    return res.json({ ok: true, alreadyCheckedIn: true });
  }
  attendance.push({ eventId, fingerprint, checkedAt: new Date().toISOString() });
  write('attendance', attendance);
  res.json({ ok: true, alreadyCheckedIn: false });
});

app.get('/api/attendance', admin, (req, res) => {
  const eventId = clean(req.query.eventId, 40);
  const records = read('attendance').filter((item) => !eventId || item.eventId === eventId);
  res.json(records.reduce((counts, item) => {
    counts[item.eventId] = (counts[item.eventId] || 0) + 1;
    return counts;
  }, {}));
});

/* ---------- news ---------- */
app.get('/api/news', (req, res) => {
  res.json(read('news').sort((a, b) => b.date.localeCompare(a.date)));
});

app.post('/api/news', admin, (req, res) => {
  const { title, swTitle, body, swBody, date } = req.body;
  if (!clean(title) || !clean(body, 3000)) return res.status(400).json({ error: 'Title and message are required' });
  const image = storeImage(req.body.image);
  if (image.error) return res.status(image.status).json({ error: image.error });
  const item = { id: newId(), title: clean(title, 140), swTitle: clean(swTitle, 140), body: clean(body, 3000), swBody: clean(swBody, 3000), date: clean(date, 10) || new Date().toISOString().slice(0, 10), image: image.url };
  const list = read('news'); list.push(item); write('news', list);
  res.json(item);
});

app.delete('/api/news/:id', admin, (req, res) => {
  read('news').filter((item) => item.id === req.params.id).forEach((item) => deleteStoredImage(item.image));
  write('news', read('news').filter((n) => n.id !== req.params.id));
  res.json({ ok: true });
});

/* ---------- family groups ---------- */
app.get('/api/groups', (req, res) => {
  const members = read('members');
  res.json(read('groups').map((g) => ({
    ...g,
    whatsappLink: safeWhatsAppGroupLink(g.whatsappLink || ''),
    memberCount: members.filter((m) => m.groupId === g.id).length,
  })));
});

app.post('/api/groups', admin, (req, res) => {
  const { name, swName, motto, swMotto, meeting, swMeeting, leader, description, swDescription } = req.body;
  if (!clean(name)) return res.status(400).json({ error: 'Group name is required' });
  const whatsappLink = clean(req.body.whatsappLink, 500);
  if (whatsappLink && !safeWhatsAppGroupLink(whatsappLink)) {
    return res.status(400).json({ error: 'Enter a valid HTTPS WhatsApp group invite link from chat.whatsapp.com.' });
  }
  const image = storeImage(req.body.image);
  if (image.error) return res.status(image.status).json({ error: image.error });
  const item = { id: newId(), name: clean(name, 80), swName: clean(swName, 80), motto: clean(motto, 100), swMotto: clean(swMotto, 100), meeting: clean(meeting, 100), swMeeting: clean(swMeeting, 100), leader: clean(leader, 80), description: clean(description, 400), swDescription: clean(swDescription, 400), whatsappLink: whatsappLink ? safeWhatsAppGroupLink(whatsappLink) : '', image: image.url };
  const list = read('groups'); list.push(item); write('groups', list);
  res.json(item);
});

app.put('/api/groups/:id', admin, (req, res) => {
  const list = read('groups');
  const g = list.find((x) => x.id === req.params.id);
  if (!g) return res.status(404).json({ error: 'Not found' });
  const limits = { name: 80, swName: 80, motto: 100, swMotto: 100, meeting: 100, swMeeting: 100, leader: 80, description: 400, swDescription: 400 };
  if (req.body.whatsappLink !== undefined) {
    const whatsappLink = clean(req.body.whatsappLink, 500);
    if (whatsappLink && !safeWhatsAppGroupLink(whatsappLink)) {
      return res.status(400).json({ error: 'Enter a valid HTTPS WhatsApp group invite link from chat.whatsapp.com.' });
    }
    g.whatsappLink = whatsappLink ? safeWhatsAppGroupLink(whatsappLink) : '';
  }
  for (const [key, limit] of Object.entries(limits)) {
    if (req.body[key] !== undefined) g[key] = clean(req.body[key], limit);
  }
  if (req.body.image) {
    const image = storeImage(req.body.image);
    if (image.error) return res.status(image.status).json({ error: image.error });
    deleteStoredImage(g.image);
    g.image = image.url;
  }
  write('groups', list);
  res.json(g);
});

app.delete('/api/groups/:id', admin, (req, res) => {
  read('groups').filter((group) => group.id === req.params.id).forEach((group) => deleteStoredImage(group.image));
  write('groups', read('groups').filter((g) => g.id !== req.params.id));
  // members of a deleted group stay on record but are marked unassigned
  write('members', read('members').map((m) => (m.groupId === req.params.id ? { ...m, groupId: '' } : m)));
  res.json({ ok: true });
});

/* ---------- joining a family group (public) ---------- */
app.post('/api/join', (req, res) => {
  const name = clean(req.body.name, 80);
  const phone = clean(req.body.phone, 20);
  const email = clean(req.body.email, 120);
  const course = clean(req.body.course, 100);
  const year = clean(req.body.year, 20);
  const groupId = clean(req.body.groupId, 40);

  if (name.length < 3) return res.status(400).json({ error: 'Please enter your full name.' });
  if (!/^[+\d][\d\s-]{8,17}$/.test(phone)) return res.status(400).json({ error: 'Please enter a valid phone number.' });
  if (email && !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'That email does not look right.' });

  const group = read('groups').find((g) => g.id === groupId);
  if (!group) return res.status(400).json({ error: 'Please choose a family group.' });

  const members = read('members');
  const digits = phone.replace(/\D/g, '');
  if (members.some((m) => m.phone.replace(/\D/g, '') === digits)) {
    return res.status(409).json({ error: 'This phone number has already joined a family group.' });
  }

  members.push({ id: newId(), name, phone, email, course, year, groupId, joinedAt: new Date().toISOString() });
  write('members', members);
  res.json({ ok: true, group: group.name, whatsappLink: safeWhatsAppGroupLink(group.whatsappLink || '') });
});

/* ---------- admin: members & messages ---------- */
app.get('/api/members', admin, (req, res) => res.json(read('members')));

app.delete('/api/members/:id', admin, (req, res) => {
  write('members', read('members').filter((m) => m.id !== req.params.id));
  res.json({ ok: true });
});

app.post('/api/contact', async (req, res) => {
  if (isRateLimited(contactAttempts, requestIp(req), 5, 15 * 60 * 1000)) {
    return res.status(429).json({ error: 'Too many messages were sent from this connection. Please wait and try again.' });
  }
  const name = clean(req.body.name, 80);
  const email = clean(req.body.email, 120);
  const message = clean(req.body.message, 2000);
  if (name.length < 2 || message.length < 5) return res.status(400).json({ error: 'Please fill in your name and message.' });
  if (email && !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'That email does not look right.' });
  const list = read('messages');
  const savedMessage = { id: newId(), name, email, message, sentAt: new Date().toISOString() };
  list.push(savedMessage);
  write('messages', list);
  try {
    await sendSupportEmail({
      subject: `Website contact message from ${name.replace(/[\r\n]/g, ' ')}`,
      replyTo: email || undefined,
      text: [
        'A visitor sent a message through the KCAU SDA Church website.',
        '',
        `Name: ${name}`,
        `Email: ${email || 'Not provided'}`,
        `Received: ${savedMessage.sentAt}`,
        '',
        message,
      ].join('\n'),
    });
  } catch (error) {
    console.error('Could not deliver contact message email:', error.message);
    return res.status(503).json({
      code: 'EMAIL_DELIVERY_FAILED',
      error: `Your message was saved, but could not be emailed. Please contact ${SUPPORT_EMAIL} directly.`,
    });
  }
  res.json({ ok: true });
});

app.get('/api/messages', admin, (req, res) => res.json(read('messages').reverse()));

app.delete('/api/messages/:id', admin, (req, res) => {
  write('messages', read('messages').filter((m) => m.id !== req.params.id));
  res.json({ ok: true });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`KCAU SDA Church website running on http://localhost:${PORT}`);
    console.log(`Admin dashboard:               http://localhost:${PORT}/admin.html`);
    if (!process.env.ADMIN_PASSWORD) console.log('Using the DEFAULT admin password - please change it (see server.js).');
    if (SMTP_USER.toLowerCase() !== SUPPORT_EMAIL || !SMTP_PASS) {
      console.warn(`Email is not configured. Set SMTP_USER=${SUPPORT_EMAIL} and SMTP_PASS in .env to enable contact email.`);
    } else {
      console.log(`SMTP credentials configured for ${SUPPORT_EMAIL}; actual delivery will be checked when an email is sent.`);
    }
  });
}

module.exports = app;
