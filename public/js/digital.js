/* ===== KCAU SDA digital church features ===== */
const DIGITAL_API_BASE = document.documentElement.dataset.apiBase || '';
const digitalApiUrl = (url) => `${DIGITAL_API_BASE}${url}`;
const digitalImageUrl = (image) => DIGITAL_API_BASE
  ? `${DIGITAL_API_BASE}${image}`
  : location.hostname.endsWith('github.io') ? `/KCAUSDA${image}` : image;
const digitalCopy = {
  en: {
    brandChurch: 'Church', mainNavigation: 'Main navigation', navAbout: 'About', navEvents: 'Events', navNews: 'News', navGallery: 'Gallery', navDigital: 'Digital Hub',
    navGroups: 'Family Groups', navMinistries: 'Ministries', navContact: 'Contact', navJoinGroup: 'Join a Group',
    languageLabel: 'Language', heroEyebrow: 'Welcome to KCAU SDA Church',
    heroLineOne: 'A family of faith,', heroHope: 'hope', heroAnd: 'and', heroLove: 'love', heroCampus: 'on campus.',
    heroLead: 'Worship with us every Sabbath, grow in a family group, and find friends who will walk with you through your university journey.',
    heroJoin: 'Join a Family Group', heroEvents: 'See Upcoming Events', nextEvent: 'Next event',
    timeSchool: 'Sabbath School', timeSchoolTime: 'Saturday · 9:00 AM', timeService: 'Divine Service',
    timeServiceTime: 'Saturday · 11:00 AM', timeVespers: 'Youth Vespers', timeVespersTime: 'Friday · 6:30 PM',
    timePrayer: 'Midweek Prayer', timePrayerTime: 'Wednesday · 7:00 PM',
    aboutEyebrow: 'Who we are', aboutTitle: 'Christ-centred. Student-led. Mission-driven.',
    aboutTextOne: 'KCAU SDA Church is a vibrant community of Seventh-day Adventist students, lecturers and staff. We gather to worship God, study His Word, and serve one another and the wider community.',
    aboutTextTwo: 'Whether you have been an Adventist all your life or are just curious, there is a seat for you here.',
    aboutTickOne: 'Bible-based preaching and teaching', aboutTickTwo: 'Small family groups for real friendship',
    aboutTickThree: 'Opportunities to serve, sing and lead',
    missionTitle: 'Our Mission', missionText: 'To love God, love people and share the good news of Jesus on and off campus.',
    visionTitle: 'Our Vision', visionText: 'A campus family transformed by Christ and ready for His soon return.',
    valuesTitle: 'Our Values', valuesText: 'Faith · Fellowship · Service · Integrity · Hope',
    eventsEyebrow: 'What’s happening', eventsTitle: 'Upcoming Events', filterUpcoming: 'Upcoming',
    filterAll: 'All', filterPast: 'Past', newsEyebrow: 'Stay informed', newsTitle: 'Digital Noticeboard',
    newsIntro: 'The latest church news and announcements, published by the church team.',
    groupsEyebrow: 'Find your people', groupsTitle: 'Family Groups',
    groupsIntro: 'Family groups are small circles that meet during the week for prayer, Bible study and friendship. Pick one and join in under a minute.',
    ministriesEyebrow: 'Get involved', ministriesTitle: 'Our Ministries',
    ministryChoir: 'Choir & Praise Team', ministryChoirText: 'Lead the congregation in song and worship.',
    ministryYouth: 'Adventist Youth (AY)', ministryYouthText: 'Fun, faith and service for young people.',
    ministryBible: 'Bible Study', ministryBibleText: 'Dig deeper into Scripture with friends.',
    ministryOutreach: 'Community Outreach', ministryOutreachText: 'Serve our neighbours with love and action.',
    ministryMedia: 'Media & Sound', ministryMediaText: 'Help us share the message with the world.',
    ministryHospitality: 'Hospitality', ministryHospitalityText: 'Welcome every guest like family.',
    verseText: '“For where two or three gather in my name, there am I with them.”',
    contactEyebrow: 'Say hello', contactTitle: 'Contact Us',
    contactIntro: 'Have a question, prayer request or want to serve? Send a message to the church team.',
    contactDeliveryNote: 'Messages sent with this form are saved in the church admin dashboard and emailed to kcausdasupport@gmail.com. For direct support, email us.',
    contactFormLink: 'Send a message using the form',
    contactLocation: 'KCAU Campus Chapel', contactHours: 'Sabbath: 9:00 AM – 1:00 PM',
    formName: 'Your name', formEmail: 'Email (optional)', formMessage: 'Message', sendMessage: 'Send message',
    footerChurch: 'KCAU SDA Church', footerMotto: 'Worship · Fellowship · Service',
    footerGroups: 'Groups', footerAdmin: 'Admin', copyright: 'KCAU SDA Church. All rights reserved.',
    close: 'Close', joinTitle: 'Join a Family Group', fullName: 'Full name', phoneNumber: 'Phone number',
    course: 'Course', year: 'Year', select: 'Select', yearOne: 'Year 1', yearTwo: 'Year 2', yearThree: 'Year 3',
    yearFour: 'Year 4', yearStaff: 'Staff', yearOther: 'Other', joinButton: 'Join this group',
    joinSuccessTitle: 'Welcome to the family!', doneButton: 'Done',
    joinWhatsAppGroup: 'Join the WhatsApp group',
    whatsAppInviteNote: 'WhatsApp will ask you to accept the group invitation.',
    eventEmptyUpcoming: 'There are no upcoming events right now. Please check back soon!',
    eventEmptyPast: 'There are no past events to show.', eventEmptyAll: 'There are no events to show right now.',
    englishFallbackNote: 'Kiswahili translation not provided; showing English.',
    eventLoadError: 'Could not load events. Please refresh the page.', newsEmpty: 'No news yet. Check back soon!',
    newsLoadError: 'Could not load news. Please refresh the page.', groupsEmpty: 'Family groups will be announced soon.',
    groupsLoadError: 'Could not load family groups. Please refresh.', members: 'members', member: 'member',
    leaderPrefix: 'Leader:',
    joinGroupPrefix: 'Join', readMore: 'Read more', showLess: 'Show less', joining: 'Joining...',
    contactSuccess: 'Thank you! Your message was sent to the church team.',
    contactEmailFailed: 'Your message was saved, but email delivery failed. Please email kcausdasupport@gmail.com directly.',
    contactInvalid: 'Please enter a valid email address.', contactGenericError: 'We could not send your message. Please try again.',
    contactNameRequired: 'Please enter your name (at least 2 characters).',
    contactMessageRequired: 'Please enter a message (at least 5 characters).',
    contactUnavailable: 'The message could not be sent right now. Please try again later.',
    joining: 'Joining...', joinRequestSuccess: 'You have joined {group}. A group leader will contact you soon. God bless you!',
    menuOpen: 'Open menu', menuClose: 'Close menu',
    countdownDays: 'days', countdownHours: 'hrs', countdownMinutes: 'min', countdownSeconds: 'sec',
    digitalEyebrow: 'Worship and grow wherever you are', digitalTitle: 'KCAU Digital Church',
    digitalIntro: 'Join online gatherings, follow a Bible reading plan, and find church updates in one place.',
    searchLabel: 'Search church updates and resources', searchPlaceholder: 'Try “prayer” or “Bible study”', searchButton: 'Search',
    searchNote: 'Search matches published text. AI-powered search and sermon transcription are not connected.',
    gatheringsEyebrow: 'Gather online', gatheringsTitle: 'Livestream, Bible study & prayer',
    gatheringsIntro: 'Links are shared by church administrators. If no meeting is listed, check back for the next gathering.',
    providerNote: 'Online meetings use the link published by the church. No streaming provider is connected to this website.',
    bulletinEyebrow: 'Church life', bulletinTitle: 'Weekly digital bulletin', readingEyebrow: 'Time in the Word',
    readingTitle: 'A new Bible book each week', readingIntro: 'Complete the selected readings to unlock the next Bible book. Progress is saved only in this browser.',
    readingWeek: (week, total, book) => `Week ${week} of ${total} · ${book}`,
    readingBook: (book, chapter) => `${book} ${chapter}`,
    readingComplete: 'All 66 books in this reading plan are complete. You can start again whenever you like.',
    readingRestart: 'Start the plan again',
    galleryEyebrow: 'Life together', galleryTitle: 'Church Photo Gallery',
    galleryIntro: 'Moments from worship, fellowship and service at KCAU SDA Church.',
    galleryEmpty: 'Church photos will be added here soon.', galleryLoadError: 'The photo gallery could not be loaded. Please refresh the page.',
    galleryUntitled: 'Church photo', socialLabel: (platform) => `Follow us on ${platform}`,
    socialLoadError: 'Social account links could not be loaded.',
    socialTikTok: 'TikTok', socialInstagram: 'Instagram', socialYouTube: 'YouTube',
    quizTitle: 'Quick Bible quiz', faqEyebrow: 'Need a hand?', faqTitle: 'Church FAQ helper',
    faqIntro: 'Ask about service times, joining a group, or how to find us. Answers are prepared by the church, not AI-generated.',
    faqInputLabel: 'Your question', faqPlaceholder: 'How can I join a group?', askButton: 'Ask',
    checkinPrivacy: 'Event QR check-in is anonymous and limited to one check-in per browser. It is not identity-verified attendance.',
    checkinTitle: 'Event check-in', checkinConsent: 'Continue to record one anonymous check-in from this browser. No name or contact details are collected.',
    checkinButton: 'Check in', searchMin: 'Enter at least two characters to search.',
    noResults: 'No matching church resources found.', searchError: 'Search is temporarily unavailable. Please try again.',
    noSessions: 'No upcoming online gatherings have been published.', noLink: 'The meeting link has not been published yet.',
    typeStream: 'Livestream', typePrayer: 'Prayer meeting', typeStudy: 'Bible study',
    resourceBiblePlan: 'Bible reading plan', resourceFAQ: 'Church FAQ', resourceEvent: 'Event',
    resourceNotice: 'Notice', resourceBulletin: 'Bulletin', resourceGathering: 'Online gathering',
    joinOnline: 'Join online', noBulletins: 'No weekly bulletin has been published yet.',
    swMissing: 'A Kiswahili version has not been published; showing the English bulletin.',
    done: 'Read', markRead: 'Mark as read', progress: (done, total) => `${done} of ${total} readings complete on this device.`,
    quizComplete: (score, total) => `Quiz complete: ${score} of ${total} correct.`, quizNext: 'Next question',
    quizRestart: 'Try again', correct: 'That is correct!', incorrect: 'Not quite. The correct answer is shown.',
    faqAnswer: 'For current information, use the contact form below to reach the church team.',
    checkinSuccess: 'Your anonymous check-in has been recorded. Thank you!',
    checkinDuplicate: 'This browser has already checked in for this event.',
    checkinError: 'Check-in could not be completed. Check the QR code and event time, then try again.',
  },
  sw: {
    brandChurch: 'Kanisa', mainNavigation: 'Menyu kuu', navAbout: 'Kuhusu', navEvents: 'Matukio', navNews: 'Habari', navGallery: 'Picha', navDigital: 'Huduma za Kidijitali',
    navGroups: 'Vikundi vya Familia', navMinistries: 'Huduma', navContact: 'Mawasiliano', navJoinGroup: 'Jiunge na Kikundi',
    languageLabel: 'Lugha', heroEyebrow: 'Karibu katika Kanisa la KCAU SDA',
    heroLineOne: 'Familia ya imani,', heroHope: 'tumaini', heroAnd: 'na', heroLove: 'upendo', heroCampus: 'chuoni.',
    heroLead: 'Abudu nasi kila Sabato, komaa katika kikundi cha familia, na upate marafiki watakaosafiri nawe katika maisha ya chuo.',
    heroJoin: 'Jiunge na Kikundi cha Familia', heroEvents: 'Tazama Matukio Yajayo', nextEvent: 'Tukio linalofuata',
    timeSchool: 'Shule ya Sabato', timeSchoolTime: 'Jumamosi · 9:00 asubuhi', timeService: 'Ibada Kuu',
    timeServiceTime: 'Jumamosi · 11:00 asubuhi', timeVespers: 'Ibada ya Vijana', timeVespersTime: 'Ijumaa · 6:30 jioni',
    timePrayer: 'Maombi ya Katikati ya Wiki', timePrayerTime: 'Jumatano · 7:00 jioni',
    aboutEyebrow: 'Sisi ni nani', aboutTitle: 'Kristo katikati. Wanafunzi wanaongoza. Utume mbele.',
    aboutTextOne: 'Kanisa la KCAU SDA ni jumuiya hai ya wanafunzi, wahadhiri na wafanyakazi Waadventista Wasabato. Tunakusanyika kumwabudu Mungu, kujifunza Neno lake na kuhudumiana pamoja na jamii.',
    aboutTextTwo: 'Iwe umekuwa Muadventista wa Sabato maisha yako yote au una hamu ya kujua, kuna nafasi yako hapa.',
    aboutTickOne: 'Mahubiri na mafundisho yanayotegemea Biblia', aboutTickTwo: 'Vikundi vidogo vya familia kwa urafiki wa kweli',
    aboutTickThree: 'Fursa za kuhudumu, kuimba na kuongoza',
    missionTitle: 'Dhamira Yetu', missionText: 'Kumpenda Mungu, kuwapenda watu na kushiriki habari njema za Yesu chuoni na nje ya chuo.',
    visionTitle: 'Maono Yetu', visionText: 'Familia ya chuoni iliyobadilishwa na Kristo na iliyo tayari kwa kurudi kwake hivi karibuni.',
    valuesTitle: 'Maadili Yetu', valuesText: 'Imani · Ushirika · Huduma · Uadilifu · Tumaini',
    eventsEyebrow: 'Yanayoendelea', eventsTitle: 'Matukio Yajayo', filterUpcoming: 'Yajayo',
    filterAll: 'Yote', filterPast: 'Yaliyopita', newsEyebrow: 'Pata habari', newsTitle: 'Ubao wa Matangazo wa Kidijitali',
    newsIntro: 'Habari na matangazo ya hivi karibuni yaliyochapishwa na timu ya kanisa.',
    groupsEyebrow: 'Pata marafiki', groupsTitle: 'Vikundi vya Familia',
    groupsIntro: 'Vikundi vya familia ni miduara midogo inayokutana katikati ya wiki kwa maombi, kujifunza Biblia na urafiki. Chagua kikundi ujiunge kwa urahisi.',
    ministriesEyebrow: 'Shiriki', ministriesTitle: 'Huduma Zetu',
    ministryChoir: 'Kwaya na Timu ya Sifa', ministryChoirText: 'Ongoza kanisa katika nyimbo na ibada.',
    ministryYouth: 'Vijana Waadventista (AY)', ministryYouthText: 'Furaha, imani na huduma kwa vijana.',
    ministryBible: 'Kujifunza Biblia', ministryBibleText: 'Jifunze Maandiko kwa undani pamoja na marafiki.',
    ministryOutreach: 'Huduma kwa Jamii', ministryOutreachText: 'Wahudumie jirani zetu kwa upendo na matendo.',
    ministryMedia: 'Habari na Sauti', ministryMediaText: 'Tusaidie kueneza ujumbe duniani.',
    ministryHospitality: 'Ukarimu', ministryHospitalityText: 'Mkaribishe kila mgeni kama familia.',
    verseText: '“Kwa maana walipo wawili watatu wamekusanyika kwa jina langu, nami nipo papo hapo katikati yao.”',
    contactEyebrow: 'Tusalimie', contactTitle: 'Wasiliana Nasi',
    contactIntro: 'Una swali, ombi la maombi au ungependa kuhudumu? Tuma ujumbe kwa timu ya kanisa.',
    contactDeliveryNote: 'Ujumbe unaotumwa kupitia fomu huhifadhiwa kwenye dashibodi ya kanisa na kutumwa kwa kcausdasupport@gmail.com. Kwa msaada wa moja kwa moja, tutumie barua pepe.',
    contactFormLink: 'Tuma ujumbe ukitumia fomu',
    contactLocation: 'Kanisa la Chuo cha KCAU', contactHours: 'Sabato: 9:00 asubuhi – 1:00 alasiri',
    formName: 'Jina lako', formEmail: 'Barua pepe (si lazima)', formMessage: 'Ujumbe', sendMessage: 'Tuma ujumbe',
    footerChurch: 'Kanisa la KCAU SDA', footerMotto: 'Ibada · Ushirika · Huduma',
    footerGroups: 'Vikundi', footerAdmin: 'Usimamizi', copyright: 'Kanisa la KCAU SDA. Haki zote zimehifadhiwa.',
    close: 'Funga', joinTitle: 'Jiunge na Kikundi cha Familia', fullName: 'Jina kamili', phoneNumber: 'Nambari ya simu',
    course: 'Kozi', year: 'Mwaka', select: 'Chagua', yearOne: 'Mwaka wa 1', yearTwo: 'Mwaka wa 2',
    yearThree: 'Mwaka wa 3', yearFour: 'Mwaka wa 4', yearStaff: 'Mfanyakazi', yearOther: 'Nyingine',
    joinButton: 'Jiunge na kikundi hiki', joinSuccessTitle: 'Karibu katika familia!', doneButton: 'Maliza',
    joinWhatsAppGroup: 'Jiunge na kikundi cha WhatsApp',
    whatsAppInviteNote: 'WhatsApp itakuomba ukubali mwaliko wa kikundi.',
    eventEmptyUpcoming: 'Hakuna matukio yajayo kwa sasa. Tafadhali angalia tena baadaye!',
    eventEmptyPast: 'Hakuna matukio yaliyopita ya kuonyesha.', eventEmptyAll: 'Hakuna matukio ya kuonyesha kwa sasa.',
    englishFallbackNote: 'Tafsiri ya Kiswahili haijatolewa; maandishi ya Kiingereza yanaonyeshwa.',
    eventLoadError: 'Matukio hayakuweza kupakiwa. Tafadhali onyesha upya ukurasa.',
    newsEmpty: 'Hakuna habari bado. Angalia tena baadaye!', newsLoadError: 'Habari hazikuweza kupakiwa. Tafadhali onyesha upya ukurasa.',
    groupsEmpty: 'Vikundi vya familia vitatangazwa hivi karibuni.',
    groupsLoadError: 'Vikundi vya familia havikuweza kupakiwa. Tafadhali jaribu tena.',
    members: 'wanachama', member: 'mwanachama', joinGroupPrefix: 'Jiunge na',
    leaderPrefix: 'Kiongozi:',
    readMore: 'Soma zaidi', showLess: 'Onyesha kidogo', joining: 'Inajiunga...',
    contactSuccess: 'Asante! Ujumbe wako umetumwa kwa uongozi wa kanisa.',
    contactEmailFailed: 'Ujumbe wako umehifadhiwa, lakini haukuweza kutumwa kwa barua pepe. Tafadhali tuma barua pepe kwa kcausdasupport@gmail.com.',
    contactInvalid: 'Tafadhali weka anwani sahihi ya barua pepe.',
    contactGenericError: 'Ujumbe wako haukuweza kutumwa. Tafadhali jaribu tena.',
    contactNameRequired: 'Tafadhali weka jina lako (angalau herufi 2).',
    contactMessageRequired: 'Tafadhali andika ujumbe (angalau herufi 5).',
    contactUnavailable: 'Ujumbe haukuweza kutumwa kwa sasa. Tafadhali jaribu tena baadaye.',
    joining: 'Inajiunga...', joinRequestSuccess: 'Umejiunga na {group}. Kiongozi wa kikundi atawasiliana nawe. Mungu akubariki!',
    menuOpen: 'Fungua menyu', menuClose: 'Funga menyu',
    countdownDays: 'siku', countdownHours: 'saa', countdownMinutes: 'dak', countdownSeconds: 'sek',
    digitalEyebrow: 'Abudu na ukue popote ulipo', digitalTitle: 'Kanisa la KCAU Kidijitali',
    digitalIntro: 'Jiunge na mikutano ya mtandaoni, fuata mpango wa usomaji wa Biblia, na upate matangazo ya kanisa.',
    searchLabel: 'Tafuta matangazo na rasilimali za kanisa', searchPlaceholder: 'Tafuta “maombi” au “somo la Biblia”', searchButton: 'Tafuta',
    searchNote: 'Utafutaji hulinganisha maandishi yaliyochapishwa. Utafutaji wa AI na unukuzi wa mahubiri haujaunganishwa.',
    gatheringsEyebrow: 'Kutana mtandaoni', gatheringsTitle: 'Ibada ya moja kwa moja, Biblia na maombi',
    gatheringsIntro: 'Viungo hutolewa na wasimamizi wa kanisa. Ikiwa hakuna mkutano ulioorodheshwa, angalia tena baadaye.',
    providerNote: 'Mikutano hutumia kiungo kilichotolewa na kanisa. Tovuti hii haijaunganishwa na huduma ya utiririshaji.',
    bulletinEyebrow: 'Maisha ya kanisa', bulletinTitle: 'Taarifa ya kila wiki', readingEyebrow: 'Neno la Mungu',
    readingTitle: 'Kitabu kipya cha Biblia kila wiki', readingIntro: 'Kamilisha masomo yaliyochaguliwa ili kufungua kitabu kinachofuata. Maendeleo yanahifadhiwa kwenye kivinjari hiki pekee.',
    readingWeek: (week, total, book) => `Wiki ya ${week} kati ya ${total} · ${book}`,
    readingBook: (book, chapter) => `${book} ${chapter}`,
    readingComplete: 'Umekamilisha vitabu vyote 66 vya mpango huu wa usomaji. Unaweza kuanza tena wakati wowote.',
    readingRestart: 'Anza mpango tena',
    galleryEyebrow: 'Maisha pamoja', galleryTitle: 'Picha za Kanisa',
    galleryIntro: 'Picha za ibada, ushirika na huduma katika Kanisa la KCAU SDA.',
    galleryEmpty: 'Picha za kanisa zitaongezwa hapa hivi karibuni.', galleryLoadError: 'Picha za kanisa hazikuweza kupakiwa. Tafadhali onyesha upya ukurasa.',
    galleryUntitled: 'Picha ya kanisa', socialLabel: (platform) => `Tufuate kwenye ${platform}`,
    socialLoadError: 'Viungo vya mitandao ya kijamii havikuweza kupakiwa.',
    socialTikTok: 'TikTok', socialInstagram: 'Instagram', socialYouTube: 'YouTube',
    quizTitle: 'Maswali mafupi ya Biblia', faqEyebrow: 'Unahitaji msaada?', faqTitle: 'Msaidizi wa maswali ya kanisa',
    faqIntro: 'Uliza kuhusu muda wa ibada, kujiunga na kikundi, au mahali tulipo. Majibu yameandaliwa na kanisa, si AI.',
    faqInputLabel: 'Swali lako', faqPlaceholder: 'Ninawezaje kujiunga na kikundi?', askButton: 'Uliza',
    checkinPrivacy: 'Kuingia kwa QR ni kwa siri na mara moja tu kwa kila kivinjari. Hakuthibitishi utambulisho.',
    checkinTitle: 'Kuingia kwenye tukio', checkinConsent: 'Endelea kurekodi kuingia kwa siri kutoka kwenye kivinjari hiki. Hatukusanyi jina au mawasiliano.',
    checkinButton: 'Ingia', searchMin: 'Andika angalau herufi mbili kutafuta.',
    noResults: 'Hakuna rasilimali za kanisa zinazolingana.', searchError: 'Utafutaji haupatikani kwa sasa. Jaribu tena.',
    noSessions: 'Hakuna mikutano ya mtandaoni ijayo iliyochapishwa.', noLink: 'Kiungo cha mkutano bado hakijachapishwa.',
    typeStream: 'Ibada ya moja kwa moja', typePrayer: 'Mkutano wa maombi', typeStudy: 'Somo la Biblia',
    resourceBiblePlan: 'Mpango wa usomaji wa Biblia', resourceFAQ: 'Maswali ya kanisa',
    resourceEvent: 'Tukio', resourceNotice: 'Tangazo', resourceBulletin: 'Taarifa', resourceGathering: 'Mkutano wa mtandaoni',
    joinOnline: 'Jiunge mtandaoni', noBulletins: 'Hakuna taarifa ya wiki iliyochapishwa bado.',
    swMissing: 'Toleo la Kiswahili halijachapishwa; taarifa ya Kiingereza inaonyeshwa.',
    done: 'Imesomwa', markRead: 'Weka kuwa imesomwa', progress: (done, total) => `Masomo ${done} kati ya ${total} yamekamilika kwenye kifaa hiki.`,
    quizComplete: (score, total) => `Maswali yamekamilika: ${score} kati ya ${total} sahihi.`, quizNext: 'Swali linalofuata',
    quizRestart: 'Jaribu tena', correct: 'Jibu ni sahihi!', incorrect: 'Si hivyo. Jibu sahihi limeonyeshwa.',
    faqAnswer: 'Kwa taarifa za sasa, tumia fomu ya mawasiliano hapa chini kuwasiliana na kanisa.',
    checkinSuccess: 'Kuingia kwako kwa siri kumerekodiwa. Asante!', checkinDuplicate: 'Kivinjari hiki tayari kimeingia kwenye tukio hili.',
    checkinError: 'Kuingia hakukufaulu. Hakikisha QR na muda wa tukio ni sahihi, kisha ujaribu tena.',
  },
};

const readingBooks = [
  ['Genesis', 'Mwanzo', 50], ['Exodus', 'Kutoka', 40], ['Leviticus', 'Mambo ya Walawi', 27],
  ['Numbers', 'Hesabu', 36], ['Deuteronomy', 'Kumbukumbu la Torati', 34], ['Joshua', 'Yoshua', 24],
  ['Judges', 'Waamuzi', 21], ['Ruth', 'Ruthu', 4], ['1 Samuel', '1 Samweli', 31],
  ['2 Samuel', '2 Samweli', 24], ['1 Kings', '1 Wafalme', 22], ['2 Kings', '2 Wafalme', 25],
  ['1 Chronicles', '1 Mambo ya Nyakati', 29], ['2 Chronicles', '2 Mambo ya Nyakati', 36],
  ['Ezra', 'Ezra', 10], ['Nehemiah', 'Nehemia', 13], ['Esther', 'Esta', 10],
  ['Job', 'Ayubu', 42], ['Psalms', 'Zaburi', 150], ['Proverbs', 'Mithali', 31],
  ['Ecclesiastes', 'Mhubiri', 12], ['Song of Solomon', 'Wimbo Ulio Bora', 8],
  ['Isaiah', 'Isaya', 66], ['Jeremiah', 'Yeremia', 52], ['Lamentations', 'Maombolezo', 5],
  ['Ezekiel', 'Ezekieli', 48], ['Daniel', 'Danieli', 12], ['Hosea', 'Hosea', 14],
  ['Joel', 'Yoeli', 3], ['Amos', 'Amosi', 9], ['Obadiah', 'Obadia', 1], ['Jonah', 'Yona', 4],
  ['Micah', 'Mika', 7], ['Nahum', 'Nahumu', 3], ['Habakkuk', 'Habakuki', 3],
  ['Zephaniah', 'Sefania', 3], ['Haggai', 'Hagai', 2], ['Zechariah', 'Zekaria', 14],
  ['Malachi', 'Malaki', 4], ['Matthew', 'Mathayo', 28], ['Mark', 'Marko', 16],
  ['Luke', 'Luka', 24], ['John', 'Yohana', 21], ['Acts', 'Matendo ya Mitume', 28],
  ['Romans', 'Warumi', 16], ['1 Corinthians', '1 Wakorintho', 16], ['2 Corinthians', '2 Wakorintho', 13],
  ['Galatians', 'Wagalatia', 6], ['Ephesians', 'Waefeso', 6], ['Philippians', 'Wafilipi', 4],
  ['Colossians', 'Wakolosai', 4], ['1 Thessalonians', '1 Wathesalonike', 5],
  ['2 Thessalonians', '2 Wathesalonike', 3], ['1 Timothy', '1 Timotheo', 6],
  ['2 Timothy', '2 Timotheo', 4], ['Titus', 'Tito', 3], ['Philemon', 'Filemoni', 1],
  ['Hebrews', 'Waebrania', 13], ['James', 'Yakobo', 5], ['1 Peter', '1 Petro', 5],
  ['2 Peter', '2 Petro', 3], ['1 John', '1 Yohana', 5], ['2 John', '2 Yohana', 1],
  ['3 John', '3 Yohana', 1], ['Jude', 'Yuda', 1], ['Revelation', 'Ufunuo', 22],
].map(([title, swTitle, chapterCount]) => ({
  title, swTitle, chapterCount,
  readings: Array.from({ length: Math.min(7, chapterCount) }, (_, index) => {
    const count = Math.min(7, chapterCount);
    return count === 1 ? 1 : Math.round(index * (chapterCount - 1) / (count - 1)) + 1;
  }),
}));
const readingDays = readingBooks.flatMap((book) => book.readings.map((chapter) => ({
  ref: `${book.title} ${chapter}`, sw: `${book.swTitle} ${chapter}`,
  title: `Read chapter ${chapter}`, swTitle: `Soma sura ya ${chapter}`,
})));

const quizQuestions = [
  {
    en: { question: 'Where did Jesus say His followers could find rest?', answers: ['In Him', 'In a palace', 'At the temple market'], correct: 0 },
    sw: { question: 'Yesu alisema wafuasi wake wangepata pumziko wapi?', answers: ['Ndani yake', 'Ikulu', 'Sokoni hekaluni'], correct: 0 },
  },
  {
    en: { question: 'Who built the ark?', answers: ['Moses', 'Noah', 'David'], correct: 1 },
    sw: { question: 'Nani aliijenga safina?', answers: ['Musa', 'Nuhu', 'Daudi'], correct: 1 },
  },
  {
    en: { question: 'Which book begins with “In the beginning”?', answers: ['Genesis', 'Psalms', 'Acts'], correct: 0 },
    sw: { question: 'Ni kitabu gani kinaanza kwa maneno “Hapo mwanzo”?', answers: ['Mwanzo', 'Zaburi', 'Matendo'], correct: 0 },
  },
];

const faqEntries = [
  { keys: ['service', 'sabbath', 'time', 'worship', 'ibada', 'sabato', 'muda'], en: 'Sabbath School begins at 9:00 AM and Divine Service at 11:00 AM on Saturday. Check the noticeboard for changes.', sw: 'Shule ya Sabato huanza saa 3:00 asubuhi na Ibada Kuu saa 5:00 asubuhi Jumamosi. Angalia ubao wa matangazo kwa mabadiliko.' },
  { keys: ['group', 'family', 'join', 'kikundi', 'jiunge'], en: 'Visit the Family Groups section and choose “Join” on the group that suits you.', sw: 'Tembelea sehemu ya Vikundi vya Familia na uchague “Jiunge” kwenye kikundi unachopenda.' },
  { keys: ['where', 'location', 'campus', 'find', 'wapi', 'mahali'], en: 'We meet at the KCAU Campus Chapel. Use the Contact section below if you need directions.', sw: 'Tunakutana katika Kanisa la Chuo cha KCAU. Tumia sehemu ya Mawasiliano hapa chini ukihitaji maelekezo.' },
  { keys: ['prayer', 'pray', 'maombi', 'omba'], en: 'Midweek Prayer is Wednesday at 7:00 PM. Online prayer meetings are listed here when a link is available.', sw: 'Maombi ya katikati ya wiki ni Jumatano saa 1:00 usiku. Mikutano ya maombi mtandaoni itaorodheshwa hapa kiungo kinapopatikana.' },
  { keys: ['study', 'bible', 'somo', 'biblia'], en: 'See this Digital Church section for the current reading plan, quiz, and any scheduled online Bible study.', sw: 'Angalia sehemu hii ya Kanisa la Kidijitali kwa mpango wa usomaji, maswali, na masomo ya Biblia mtandaoni.' },
];

const digitalLanguageSelect = document.querySelector('#languageSwitcher');
let language = 'en';
try {
  language = localStorage.getItem('kcau-language') === 'sw' ? 'sw' : 'en';
} catch { /* Use English if browser storage is unavailable. */ }

const copy = (key) => digitalCopy[language][key];
const escapeDigital = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]));
const imageMarkup = (image, alt) => /^\/uploads\/[\da-f]{32}\.(?:jpg|png|webp)$/.test(image || '')
  ? `<img class="content-image" src="${escapeDigital(digitalImageUrl(image))}" alt="${escapeDigital(alt)}" loading="lazy" />` : '';

function applyLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = copy(element.dataset.i18n);
    if (value) element.textContent = value;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    const value = copy(element.dataset.i18nPlaceholder);
    if (value) element.placeholder = value;
  });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    const value = copy(element.dataset.i18nAriaLabel);
    if (value) element.setAttribute('aria-label', value);
  });
  if (digitalLanguageSelect) digitalLanguageSelect.value = language;
  window.kcauText = (key, fallback = key) => digitalCopy[language][key] ?? fallback;
  renderReadingPlan();
  renderQuiz();
  loadDigitalContent();
  loadGalleryAndSocial();
  window.dispatchEvent(new Event('kcau-language-change'));
}

if (digitalLanguageSelect) {
  digitalLanguageSelect.addEventListener('change', () => {
    language = digitalLanguageSelect.value === 'sw' ? 'sw' : 'en';
    try { localStorage.setItem('kcau-language', language); } catch { /* Keep selection for this page only. */ }
    applyLanguage();
  });
}

/* ---------- browser-only, book-by-book Bible plan progress ---------- */
function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem('kcau-reading-progress') || '{}');
    if (saved && Number.isInteger(saved.week) && saved.week >= 0 && Array.isArray(saved.completed)) return saved;
  } catch { /* Start a fresh plan when browser storage is unavailable or invalid. */ }
  return { week: 0, completed: [] };
}

function renderReadingPlan() {
  const list = document.querySelector('#readingPlan');
  if (!list) return;
  const saved = readProgress();
  const finished = saved.week >= readingBooks.length;
  const book = readingBooks[saved.week];
  const completed = new Set(book ? saved.completed.filter((index) =>
    Number.isInteger(index) && index >= 0 && index < book.readings.length) : []);
  const restart = document.querySelector('#readingRestart');
  restart.hidden = !finished;
  document.querySelector('#readingWeek').textContent = finished ? '' : copy('readingWeek')(
    saved.week + 1, readingBooks.length, language === 'sw' ? book.swTitle : book.title,
  );
  document.querySelector('#readingProgress').textContent = finished
    ? copy('readingComplete') : copy('progress')(completed.size, book.readings.length);
  list.innerHTML = finished ? '' : book.readings.map((chapter, index) => {
    const complete = completed.has(index);
    const bookName = language === 'sw' ? book.swTitle : book.title;
    return `<li><label><input type="checkbox" data-reading="${index}" ${complete ? 'checked' : ''} />
      <span><strong>${escapeDigital(bookName)} ${chapter}</strong></span>
      <small>${complete ? copy('done') : copy('markRead')}</small></label></li>`;
  }).join('');
  list.querySelectorAll('[data-reading]').forEach((input) => input.addEventListener('change', () => {
    const next = new Set(readProgress().completed);
    const index = Number(input.dataset.reading);
    if (input.checked) next.add(index); else next.delete(index);
    const nextWeek = readProgress().week;
    const updated = nextWeek < readingBooks.length
      && next.size === readingBooks[nextWeek].readings.length
      ? { week: nextWeek + 1, completed: [] }
      : { week: nextWeek, completed: [...next] };
    try { localStorage.setItem('kcau-reading-progress', JSON.stringify(updated)); } catch { /* Progress remains usable until this page is closed. */ }
    renderReadingPlan();
  }));
}
document.querySelector('#readingRestart')?.addEventListener('click', () => {
  try { localStorage.setItem('kcau-reading-progress', JSON.stringify({ week: 0, completed: [] })); } catch { /* The plan can still restart for this page. */ }
  renderReadingPlan();
});

/* ---------- local Bible quiz ---------- */
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function renderQuiz() {
  const question = document.querySelector('#quizQuestion');
  const answers = document.querySelector('#quizAnswers');
  const feedback = document.querySelector('#quizFeedback');
  if (!question || !answers || !feedback) return;
  feedback.textContent = '';
  feedback.className = 'form-msg';
  if (quizIndex >= quizQuestions.length) {
    question.textContent = copy('quizComplete')(quizScore, quizQuestions.length);
    answers.innerHTML = `<button type="button" class="btn btn-navy" id="quizRestart">${copy('quizRestart')}</button>`;
    document.querySelector('#quizRestart').addEventListener('click', () => {
      quizIndex = 0;
      quizScore = 0;
      quizAnswered = false;
      renderQuiz();
    });
    return;
  }
  const item = quizQuestions[quizIndex][language];
  question.textContent = item.question;
  answers.innerHTML = item.answers.map((answer, index) =>
    `<button type="button" class="quiz-answer" data-answer="${index}">${escapeDigital(answer)}</button>`).join('');
  quizAnswered = false;
  answers.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => {
    if (quizAnswered) return;
    quizAnswered = true;
    const chosen = Number(button.dataset.answer);
    const correct = chosen === item.correct;
    if (correct) quizScore += 1;
    answers.querySelectorAll('[data-answer]').forEach((answerButton) => {
      answerButton.disabled = true;
      if (Number(answerButton.dataset.answer) === item.correct) answerButton.classList.add('correct');
    });
    feedback.textContent = correct ? copy('correct') : copy('incorrect');
    feedback.classList.add(correct ? 'ok' : 'err');
    const next = document.createElement('button');
    next.type = 'button';
    next.className = 'btn btn-navy';
    next.textContent = quizIndex === quizQuestions.length - 1 ? copy('quizRestart') : copy('quizNext');
    answers.append(next);
    next.addEventListener('click', () => {
      if (quizIndex === quizQuestions.length - 1) {
        quizIndex = quizQuestions.length;
      } else {
        quizIndex += 1;
      }
      renderQuiz();
    });
  }));
}

/* ---------- gatherings and bulletins ---------- */
async function loadDigitalContent() {
  const sessionsElement = document.querySelector('#digitalSessions');
  const bulletinsElement = document.querySelector('#digitalBulletins');
  if (!sessionsElement || !bulletinsElement) return;
  try {
    const [sessions, bulletins] = await Promise.all([
      fetch(digitalApiUrl('/api/digital/sessions')).then(async (response) => {
        if (!response.ok) throw new Error('sessions unavailable');
        return response.json();
      }),
      fetch(digitalApiUrl('/api/digital/bulletins')).then(async (response) => {
        if (!response.ok) throw new Error('bulletins unavailable');
        return response.json();
      }),
    ]);
    sessionsElement.innerHTML = sessions.length ? sessions.map((item) => {
      const date = new Date(`${item.date}T00:00:00`).toLocaleDateString(language === 'sw' ? 'sw-KE' : 'en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      });
      const type = item.type === 'stream' ? copy('typeStream') : item.type === 'prayer' ? copy('typePrayer') : copy('typeStudy');
      const title = language === 'sw' ? item.swTitle || item.title : item.title;
      const description = language === 'sw' ? item.swDescription || item.description : item.description;
      const missingTranslation = language === 'sw' && (!item.swTitle || (item.description && !item.swDescription));
      return `<article class="digital-item">${imageMarkup(item.image, title)}<h4>${escapeDigital(title)}</h4>
        <p>${escapeDigital(date)}${item.time ? ` · ${escapeDigital(item.time)}` : ''} · ${type}</p>
        ${description ? `<p>${escapeDigital(description)}</p>` : ''}
        ${missingTranslation ? `<p class="provider-note">${copy('englishFallbackNote')}</p>` : ''}
        ${item.url ? `<a class="btn btn-gold btn-sm" href="${escapeDigital(item.url)}" target="_blank" rel="noopener noreferrer">${copy('joinOnline')}</a>` : `<p class="provider-note">${copy('noLink')}</p>`}
      </article>`;
    }).join('') : `<p class="empty">${copy('noSessions')}</p>`;
    bulletinsElement.innerHTML = bulletins.length ? bulletins.map((item) => {
      const translated = language === 'sw' && (item.swTitle || item.swBody);
      const title = translated ? item.swTitle || item.title : item.title;
      const body = translated ? item.swBody || item.body : item.body;
      const date = new Date(`${item.weekOf}T00:00:00`).toLocaleDateString(language === 'sw' ? 'sw-KE' : 'en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      });
      return `<article class="digital-item">${imageMarkup(item.image, title)}<h4>${escapeDigital(title)}</h4><p>${escapeDigital(date)}</p>
        <p class="bulletin-body">${escapeDigital(body).replace(/\n/g, '<br>')}</p>
        ${language === 'sw' && (!item.swTitle || !item.swBody) ? `<p class="provider-note">${copy('swMissing')}</p>` : ''}
      </article>`;
    }).join('') : `<p class="empty">${copy('noBulletins')}</p>`;
  } catch {
    sessionsElement.innerHTML = `<p class="empty">${copy('searchError')}</p>`;
    bulletinsElement.innerHTML = `<p class="empty">${copy('searchError')}</p>`;
  }
}

async function loadGalleryAndSocial() {
  const gallery = document.querySelector('#galleryGrid');
  const social = document.querySelector('#socialLinks');
  const socialStatus = document.querySelector('#socialLinksStatus');
  if (!gallery || !social || !socialStatus) return;

  try {
    const response = await fetch(digitalApiUrl('/api/gallery'));
    if (!response.ok) throw new Error('Gallery unavailable');
    const photos = await response.json();
    gallery.innerHTML = photos.length ? photos.map((photo) => {
      const title = language === 'sw' ? photo.swTitle || photo.title : photo.title;
      const caption = title || copy('galleryUntitled');
      return `<figure class="gallery-card">${imageMarkup(photo.image, caption)}${title ? `<figcaption>${escapeDigital(title)}</figcaption>` : ''}</figure>`;
    }).join('') : `<p class="empty">${copy('galleryEmpty')}</p>`;
  } catch {
    gallery.innerHTML = `<p class="empty">${copy('galleryLoadError')}</p>`;
  }

  try {
    const response = await fetch(digitalApiUrl('/api/social-links'));
    if (!response.ok) throw new Error('Social links unavailable');
    const links = await response.json();
    const platforms = [
      ['tiktok', 'socialTikTok'], ['instagram', 'socialInstagram'], ['youtube', 'socialYouTube'],
    ];
    social.innerHTML = platforms.filter(([key]) => links[key]).map(([key, label]) =>
      `<a href="${escapeDigital(links[key])}" target="_blank" rel="noopener noreferrer" aria-label="${escapeDigital(copy('socialLabel')(copy(label)))}">${escapeDigital(copy(label))}</a>`
    ).join('');
    socialStatus.textContent = '';
  } catch {
    socialStatus.textContent = copy('socialLoadError');
  }
}

/* ---------- public resource search ---------- */
document.querySelector('#resourceSearch')?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = document.querySelector('#resourceQuery').value.trim();
  const results = document.querySelector('#resourceResults');
  if (query.length < 2) {
    results.textContent = copy('searchMin');
    return;
  }
  results.textContent = '…';
  try {
    const response = await fetch(digitalApiUrl(`/api/digital/search?q=${encodeURIComponent(query)}`));
    if (!response.ok) throw new Error('Search failed');
    const list = await response.json();
    const normalizedQuery = query.toLocaleLowerCase();
    const localResults = [
      ...readingDays.filter((day) => `${day.ref} ${day.sw} ${day.title} ${day.swTitle}`.toLocaleLowerCase().includes(normalizedQuery))
        .map((day) => ({
          kind: 'Bible reading plan',
          swKind: copy('resourceBiblePlan'),
          title: day.title,
          swTitle: day.swTitle,
          text: day.ref,
          swText: day.sw,
          href: '#digital',
        })),
      ...faqEntries.filter((entry) => entry.keys.some((key) => key.includes(normalizedQuery) || normalizedQuery.includes(key)))
        .map((entry) => ({
          kind: 'Church FAQ',
          swKind: copy('resourceFAQ'),
          title: entry.en,
          swTitle: entry.sw,
          text: entry.en,
          swText: entry.sw,
          href: '#digital',
        })),
    ];
    const matches = [...list, ...localResults].slice(0, 20);
    results.innerHTML = matches.length ? matches.map((item) => {
      const title = language === 'sw' ? item.swTitle || item.title : item.title;
      const description = language === 'sw' ? item.swText || item.text : item.text;
      const kind = language === 'sw' ? item.swKind || item.kind : item.kind;
      return
      `<a class="resource-result" href="${escapeDigital(item.href)}">
        <strong>${escapeDigital(title)}</strong><span>${escapeDigital(kind)} · ${escapeDigital(description || '')}</span>
      </a>`;
    }).join('') : `<p>${copy('noResults')}</p>`;
  } catch {
    results.textContent = copy('searchError');
  }
});

/* ---------- church-prepared FAQ answers (not AI) ---------- */
document.querySelector('#faqForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const question = document.querySelector('#faqQuestion').value.toLocaleLowerCase();
  const match = faqEntries.find((entry) => entry.keys.some((key) => question.includes(key)));
  document.querySelector('#faqAnswer').textContent = match ? match[language] : copy('faqAnswer');
});

/* ---------- anonymous QR attendance check-in ---------- */
const checkinParams = new URLSearchParams(location.search);
const checkinEventId = checkinParams.get('checkin');
const checkinToken = checkinParams.get('token');
const checkinForm = document.querySelector('#checkinPanel');
function newAttendanceId() {
  if (crypto.randomUUID) return crypto.randomUUID();
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}
if (checkinEventId && checkinToken && checkinForm) {
  checkinForm.hidden = false;
  fetch(digitalApiUrl('/api/events')).then((response) => response.json()).then((events) => {
    const event = events.find((item) => item.id === checkinEventId);
    document.querySelector('#checkinEventName').textContent = event ? event.title : '';
    checkinForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }).catch(() => {
    document.querySelector('#checkinEventName').textContent = '';
  });
}

checkinForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = document.querySelector('#checkinMsg');
  const button = checkinForm.querySelector('button[type="submit"]');
  button.disabled = true;
  message.textContent = '';
  message.className = 'form-msg';
  try {
    const storageKey = `kcau-checkin-${checkinEventId}`;
    let attendanceId;
    try { attendanceId = localStorage.getItem(storageKey); } catch { attendanceId = ''; }
    if (!attendanceId) {
      attendanceId = newAttendanceId();
      try { localStorage.setItem(storageKey, attendanceId); } catch { /* Server still de-duplicates during this attempt. */ }
    }
    const response = await fetch(digitalApiUrl('/api/check-in'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId: checkinEventId, token: checkinToken, attendanceId }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || copy('checkinError'));
    message.textContent = data.alreadyCheckedIn ? copy('checkinDuplicate') : copy('checkinSuccess');
    message.classList.add('ok');
  } catch (error) {
    message.textContent = error.message || copy('checkinError');
    message.classList.add('err');
  } finally {
    button.disabled = false;
  }
});

applyLanguage();
