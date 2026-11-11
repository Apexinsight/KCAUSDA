# KCAU SDA Church Website

## Run it
1. Install Node.js (https://nodejs.org, LTS version)
2. In this folder run:
   npm install
   npm start
3. Open http://localhost:3000
4. Admin dashboard: http://localhost:3000/admin.html
5. Support email: kcausdasupport@gmail.com

The Contact form saves submissions in Admin > Messages and emails them to the support address. Admin sign-in uses the admin password configured below and does not require email.

## Required setup before using email or publishing (IMPORTANT)
Configure Gmail SMTP with an App Password for `kcausdasupport@gmail.com`. Enable 2-Step Verification on the Google account, create an App Password in Google Account security settings, and never put the real App Password in source code or share it in chat.

For local development, copy `.env.example` to `.env` in the project folder, then edit `.env` and replace both `SMTP_PASS` and `ADMIN_PASSWORD` with your own values. `.env` is ignored by Git and loaded automatically when the server starts:
```powershell
Copy-Item .env.example .env
npm start
```

Alternatively, on a hosting provider set the same values in its environment/secrets settings. `SMTP_USER` must be the support mailbox, and `SMTP_PASS` must be its Google App Password (not the normal Google account password). Without working SMTP credentials, contact messages will still be saved, but sending email notifications will report a clear error. At startup, the server logs whether the required email settings are present; failed delivery logs the underlying SMTP error.

## Deploy to Render
The included `render.yaml` configures a Node web service and persistent storage for site data and uploaded images. To publish and enable automatic deploys when GitHub changes are pushed:
1. Push this project to the `Apexinsight/KCAUSDA` GitHub repository.
2. In Render, choose **New > Blueprint**, connect that repository, and apply the `render.yaml` blueprint.
3. Set the prompted `ADMIN_PASSWORD` to a unique strong password and `SMTP_PASS` to the support mailbox's Gmail App Password.
4. After deployment, open the Render URL and add `/admin.html` for the dashboard.

Keep `.env` and real passwords out of GitHub. Render receives secrets through its environment settings.

## Change the admin password (IMPORTANT)
The default password is `kcau-sda-admin`; do not use it on a public deployment. Set a unique strong password using the `ADMIN_PASSWORD` environment variable above. Admin sign-in checks this password directly and does not send an email code.

## What you can do in Admin
- Events: add/delete upcoming events (shown on the site + countdown)
- Optional JPEG, PNG or WebP posters/photos (up to 3 MB) for events, news, family groups, online gatherings and bulletins
- Gallery & Social: add/remove church gallery photos, and set TikTok, Instagram and YouTube profile links
- Event check-in: create a signed QR code and view anonymous check-in totals
- News: post/delete announcements
- Digital Church: publish livestream, online Bible study and prayer-meeting links
- Digital Church: publish weekly bulletins in English and optionally Kiswahili
- Events, notices and family groups can include optional Kiswahili titles and descriptions; visitors can switch the website interface between English and Kiswahili
- Family Groups: add more groups, edit names/meeting times/leaders, set an optional WhatsApp group invite link, delete. Members can open the invite after registering; WhatsApp requires members to accept and does not allow the site to add them automatically.
- Members: see everyone who joined, filter by group, download CSV
- Messages: read contact-form messages (also emailed to the support inbox)

## Digital Church release
- Visitors can browse scheduled online gatherings and open links published by an administrator. The site does not provide or host video streaming or meeting rooms.
- Event QR check-in stores an opaque browser identifier and timestamp, not a visitor's name or contact details. It allows one check-in per event per browser, is available from two hours before until six hours after the event, and is **not identity-verified attendance**.
- The Bible reading plan and quiz run in the browser. Reading progress stays in that browser.
- The reading plan moves through all 66 Bible books; completing the selected readings for one book unlocks the next book. Progress is browser-local and can be restarted after completion.
- The FAQ helper uses church-written answers; resource search is keyword-based. Neither feature uses AI.
- The English/Kiswahili switcher translates the visitor interface. Bulletin and uploaded-photo captions can be entered in either language; user-published content without Kiswahili text falls back to English.
- AI sermon transcription, AI-powered search, counselling bookings, member accounts/cards, alumni portal, and the other items in the attached full-platform specification are not part of this first release.

The QR signing key is created in `data/.checkin-key` on first launch. Keep the `data` folder and `public/uploads/` backed up; losing the key invalidates previously generated check-in QR codes, while losing uploads removes published photos.

## Files
server.js            backend + API
data/                saved events, news, groups, members, gallery and digital content (JSON files, auto-created)
public/index.html    main website
public/admin.html    admin dashboard
public/uploads/      uploaded church images (created on first launch)
public/css/style.css design
public/js/main.js    website interactivity
public/js/digital.js Digital Church interactions
public/js/admin.js   admin interactivity

## Edit by hand
- Service times, about text, ministries, contact details: public/index.html
- Colours: the :root variables at the top of public/css/style.css
- The 5 starter family groups are placeholders ("Family Group 1-5"): rename them in Admin > Family Groups

## Putting it online
Needs a host that runs Node.js (Render, Railway, a VPS). Before launch, set a unique strong `ADMIN_PASSWORD`, configure SMTP environment secrets for contact email as described above, configure a persistent disk for `data/` and `public/uploads/`, and check that church contact hours and starter family-group details are current. Contact-form messages appear in Admin > Messages and are emailed to the support inbox.
Note: on free hosts the data/ folder can reset on redeploy - use a persistent disk.
