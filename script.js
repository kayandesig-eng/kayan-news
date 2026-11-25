const DB_URL = "https://kayan-news-575ab-default-rtdb.firebaseio.com/news.json";
const SETTINGS_DB_URL = "https://kayan-news-575ab-default-rtdb.firebaseio.com/settings.json";
const STORAGE_KEY = "kayan_news_items_v5";
const SETTINGS_STORAGE_KEY = "kayan_news_settings_v3";
const SUB_STORAGE_KEY = "kayan_news_sub_v1";
const ENGAGE_STORAGE_KEY = "kayan_news_engage_v1";
const AUTO_FETCH_KEY = "kayan_news_last_auto_fetch_v5";
const ADMIN_PASSCODE = "kayan2026";
const KAYAN_TAG = "خاص لموقع كيان نيوز KAYAN NEWS";
const SITE_URL = "https://kayandesig-eng.github.io/kayan-news/";

const DEFAULT_SETTINGS = {
  siteName: "كيان نيوز",
  subtitle: "KAYAN NEWS • OFFICIAL PORTAL",
  logoUrl: "",
  accentColor: "#1d4ed8",
  aboutText: "منصة إخبارية عربية رسمية تابعة لكيان نيوز (KAYAN NEWS)، تُعنى بتقديم تغطية سياسية ورياضية وثقافية موثوقة ومنظمة.",
  overviewText: "نجمع الأخبار من مصادر معتمدة مع إتاحة النشر والتحرير والتصنيف المتعدد النوافذ، وتجربة تفاعلية متكاملة على الهاتف والويب.",
  emailText: "kayandesig@gmail.com",
  socialHandle: "@kayan_news",
  orgText: "مؤسسة كيان للتصميم / KAYAN DESIGNS"
};

const TRUSTED_FEEDS = [
  { name: "الجزيرة", url: "https://www.aljazeera.net/aljazeerarss/a7c186be-1baa-4bd4-9d80-a84db769f779/73d0e1b4-532f-45ef-b135-bfdff8b8cab9", hint: "سياسة عربية" },
  { name: "بي بي سي عربي", url: "https://feeds.bbci.co.uk/arabic/rss.xml", hint: "سياسة دولية" },
  { name: "العربية", url: "https://www.alarabiya.net/.mrss/ar.xml", hint: "سياسة عربية" },
  { name: "الحدث", url: "https://www.alarabiya.net/.mrss/ar/alhadath.xml", hint: "سياسة عربية" },
  { name: "يمن شباب", url: "https://yemenshabab.net/rss", hint: "سياسة محلية" },
  { name: "عدن المستقلة", url: "https://aic-aden.com/feed", hint: "سياسة محلية" },
  { name: "الجزيرة نت - رياضة", url: "https://www.aljazeera.net/aljazeerarss/sport/rss.xml", hint: "رياضة عربية" },
  { name: "موقع رياضة (Riyadahh)", url: "https://riyadahh.com/feed", hint: "رياضة عربية" },
  { name: "منصة يمن تيم (Yemen Team)", url: "https://yementeam.com/feed", hint: "رياضة محلية" },
  { name: "موقع كووورة", url: "https://www.kooora.com/rss.aspx", hint: "رياضة عربية" },
  { name: "القسم الرياضي في يمن مونيتور", url: "https://yemenmonitor.com/category/sports/feed", hint: "رياضة محلية" },
  { name: "موقع في الجول (FilGoal)", url: "https://www.filgoal.com/rss", hint: "رياضة عربية" },
  { name: "موقع يلا كورة (Yallakora)", url: "https://www.yallakora.com/rss/feed.aspx", hint: "رياضة عربية" },
  { name: "موقع السبورت (Elsport)", url: "https://www.elsport.com/rss/arabic", hint: "رياضة دولية" },
  { name: "سوفا سكور (Sofascore)", url: "https://www.sofascore.com/rss", hint: "رياضة دولية" },
  { name: "فلاش سكور (Flashscore)", url: "https://www.flashscore.com/rss", hint: "رياضة دولية" },
  { name: "منصة TOD / beIN SPORTS", url: "https://www.beinsports.com/ar-mena/rss", hint: "رياضة دولية" },
  { name: "منصة شاهد (Shahid VIP)", url: "https://shahid.mbc.net/rss", hint: "منوعات وثقافة" }
];

const defaultNews = [
  {
    id: "kayan_pol_1", timestamp: Date.now() - 1000,
    title: "تغطية سياسية موسعة لأبرز المستجدات المحلية والإقليمية عبر كيان نيوز",
    source: "كيان نيوز", category: "سياسة محلية", breaking: true, image: "", link: "",
    body: "تواصل منصة كيان نيوز رصد وتوثيق التطورات السياسية المحلية والعربية والدولية بدقة ومهنية عالية.",
    createdAt: new Date().toLocaleString("ar-EG")
  },
  {
    id: "kayan_sp_1", timestamp: Date.now() - 2000,
    title: "نافذة الرياضة في كيان نيوز تضم تغطية شاملة للبطولات المحلية والعربية والدولية",
    source: "كيان نيوز • الرياضة", category: "رياضة عربية", breaking: false, image: "", link: "",
    body: "متابعة حية لأخبار المنتخبات والأندية والبطولات عبر نخبة المصادر الرياضية المحلية والعربية والعالمية.",
    createdAt: new Date().toLocaleString("ar-EG")
  },
  {
    id: "kayan_cul_1", timestamp: Date.now() - 3000,
    title: "نافذة منوعات وثقافة: إضاءات فكرية وفنية ومجتمعية متجددة",
    source: "كيان نيوز • الثقافة", category: "منوعات وثقافة", breaking: false, image: "", link: "",
    body: "مساحة ثقافية وفنية ومجتمعية تبرز الإبداع والفعاليات المتنوعة بروح عصرية.",
    createdAt: new Date().toLocaleString("ar-EG")
  }
];

let activeWindow = "politics";
let activeSubCat = "الكل";
let searchQuery = "";
let newsList = loadLocalNews();
let siteSettings = loadLocalSettings();
let subState = loadSubState();
let engageState = loadEngageState();
let isUnlocked = false;
let editingId = null;
let currentModalNewsId = null;

const el = (id) => document.getElementById(id);
const toggleAdminBtn = el("toggleAdminBtn"), refreshAutoBtn = el("refreshAutoBtn"), lockAdminBtn = el("lockAdminBtn");
const adminPanel = el("adminPanel"), autoSyncStatus = el("autoSyncStatus");
const siteTitleText = el("siteTitleText"), siteSubtitleText = el("siteSubtitleText"), defaultLogoSvg = el("defaultLogoSvg"), customLogoImg = el("customLogoImg");
const footerAboutText = el("footerAboutText"), footerOverviewText = el("footerOverviewText"), footerEmailText = el("footerEmailText"), footerEmailLink = el("footerEmailLink"), footerOrgText = el("footerOrgText"), footerCopyrightText = el("footerCopyrightText");
const subscriberContactInput = el("subscriberContactInput"), subscribeBtn = el("subscribeBtn"), sendLatestDigestBtn = el("sendLatestDigestBtn"), subStatusText = el("subStatusText");
const mainWindowsNav = el("mainWindowsNav"), subCategoriesBar = el("subCategoriesBar"), windowBanner = el("windowBanner"), bannerIcon = el("bannerIcon"), bannerTitle = el("bannerTitle"), bannerDesc = el("bannerDesc");
const newsFeed = el("newsFeed"), searchInput = el("searchInput"), breakingTicker = el("breakingTicker");

function loadLocalNews() {
  try { const p = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); if (Array.isArray(p) && p.length) return p; } catch {}
  return [...defaultNews];
}
function saveLocalNews(items) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {} }
function loadLocalSettings() {
  try { const p = JSON.parse(localStorage.getItem(SETTINGS_STORAGE_KEY) || "null"); if (p && typeof p === "object") return { ...DEFAULT_SETTINGS, ...p }; } catch {}
  return { ...DEFAULT_SETTINGS };
}
function saveLocalSettings(cfg) { try { localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(cfg)); } catch {} }
function loadSubState() {
  try { const p = JSON.parse(localStorage.getItem(SUB_STORAGE_KEY) || "null"); if (p && typeof p === "object") return { subscribed: Boolean(p.subscribed), contact: p.contact || "" }; } catch {}
  return { subscribed: false, contact: "" };
}
function saveSubState(s) { try { localStorage.setItem(SUB_STORAGE_KEY, JSON.stringify(s)); } catch {} }
function loadEngageState() {
  try { const p = JSON.parse(localStorage.getItem(ENGAGE_STORAGE_KEY) || "null"); if (p && typeof p === "object") return { likedIds: Array.isArray(p.likedIds) ? p.likedIds : [], extraLikes: p.extraLikes || {}, comments: p.comments || {} }; } catch {}
  return { likedIds: [], extraLikes: {}, comments: {} };
}
function saveEngageState(s) { try { localStorage.setItem(ENGAGE_STORAGE_KEY, JSON.stringify(s)); } catch {} }

function isSafeImageSrc(src) {
  if (!src || typeof src !== "string") return false;
  const t = src.trim();
  if (/^data:image\/(jpeg|jpg|png|webp|gif);base64,[A-Za-z0-9+/=]+$/i.test(t)) return true;
  try { const u = new URL(t); return u.protocol === "https:" || u.protocol === "http:"; } catch { return false; }
}
function isSafeExternalUrl(url) {
  if (!url || typeof url !== "string") return false;
  try { const u = new URL(url.trim()); return u.protocol === "https:" || u.protocol === "http:"; } catch { return false; }
}

function compressImageFile(file, maxWidth = 800, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      const img = new Image();
      img.onload = () => {
        const sc = img.width > maxWidth ? maxWidth / img.width : 1;
        const c = document.createElement("canvas");
        c.width = Math.round(img.width * sc); c.height = Math.round(img.height * sc);
        c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
        resolve(c.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject; img.src = r.result;
    };
    r.onerror = reject; r.readAsDataURL(file);
  });
}

function classifyArticle(title, body, sourceName, hintCategory) {
  const text = `${title} ${body} ${sourceName}`.toLowerCase();
  const localKw = ["اليمن", "يمني", "يمنية", "صنعاء", "عدن", "تعز", "مأرب", "حضرموت", "المكلا", "الحديدة", "إب", "ذمار", "شبوة", "لحج", "أبين", "المهرة", "يمن تيم", "يمن مونيتور", "يمن شباب"];
  const arabKw = ["السعودية", "مصر", "الإمارات", "قطر", "الكويت", "البحرين", "عمان", "الأردن", "لبنان", "سوريا", "العراق", "فلسطين", "غزة", "السودان", "ليبيا", "تونس", "الجزائر", "المغرب", "عربي", "عربية", "الخليج", "كووورة", "في الجول", "يلا كورة", "رياضة"];
  const sportKw = ["رياضة", "كرة القدم", "مباراة", "هدف", "بطولة", "دوري", "منتخب", "كأس", "مدرب", "لاعب", "فريق", "ريال مدريد", "برشلونة", "مانشستر", "ليفربول", "أرسنال", "بايرن", "كووورة", "في الجول", "يلا كورة", "السبورت", "سوفا سكور", "فلاش سكور", "bein", "tod", "يمن تيم", "يمن مونيتور", "رياضة"];
  const cultureKw = ["ثقافة", "فن", "فنية", "سينما", "مسرح", "رواية", "شعر", "كتاب", "أدب", "تراث", "موسيقى", "معرض", "منوعات", "شاهد", "shahid", "تكنولوجيا", "صحة", "سفر"];

  if (hintCategory && ["سياسة محلية", "سياسة عربية", "سياسة دولية", "رياضة محلية", "رياضة عربية", "رياضة دولية", "منوعات وثقافة"].includes(hintCategory)) return hintCategory;
  const isLocal = localKw.some((k) => text.includes(k));
  const isArab = arabKw.some((k) => text.includes(k));
  const isSport = sportKw.some((k) => text.includes(k));
  const isCulture = cultureKw.some((k) => text.includes(k));

  if (isSport) {
    if (isLocal) return "رياضة محلية";
    if (isArab) return "رياضة عربية";
    return "رياضة دولية";
  }
  if (isCulture) return "منوعات وثقافة";
  if (isLocal) return "سياسة محلية";
  if (isArab) return "سياسة عربية";
  return "سياسة دولية";
}

function matchesCurrentWindowAndSub(itemCategory) {
  const cat = classifyArticle(itemCategory, "", "", itemCategory);
  if (activeWindow === "politics") {
    if (!cat.startsWith("سياسة")) return false;
    if (activeSubCat === "محلية") return cat === "سياسة محلية";
    if (activeSubCat === "عربي") return cat === "سياسة عربية";
    if (activeSubCat === "دولية") return cat === "سياسة دولية";
    return true;
  }
  if (activeWindow === "sports") {
    if (!cat.startsWith("رياضة")) return false;
    if (activeSubCat === "محلية") return cat === "رياضة محلية";
    if (activeSubCat === "عربي") return cat === "رياضة عربية";
    if (activeSubCat === "دولية") return cat === "رياضة دولية";
    return true;
  }
  return cat === "منوعات وثقافة";
}

function getCategoryBadgeClass(cat) {
  const map = { "سياسة محلية": "cat-pol-local", "سياسة عربية": "cat-pol-arab", "سياسة دولية": "cat-pol-intl", "رياضة محلية": "cat-sp-local", "رياضة عربية": "cat-sp-arab", "رياضة دولية": "cat-sp-intl", "منوعات وثقافة": "cat-culture" };
  return map[cat] || "cat-pol-intl";
}

function renderWindowHeader() {
  mainWindowsNav.querySelectorAll(".win-tab").forEach((b) => b.classList.toggle("active", b.dataset.win === activeWindow));
  windowBanner.className = `window-banner banner-${activeWindow}`;

  if (activeWindow === "politics") {
    subCategoriesBar.classList.remove("hidden");
    subCategoriesBar.innerHTML = ["الكل", "محلية", "عربي", "دولية"].map((s) => {
      const ico = s === "محلية" ? "🏛️" : s === "عربي" ? "🕌" : s === "دولية" ? "🌐" : "📌";
      return `<button type="button" class="sub-cat-btn ${activeSubCat === s ? "active" : ""}" data-sub="${s}">${ico} ${s === "الكل" ? "جميع السياسية" : "سياسة " + s}</button>`;
    }).join("");
    bannerIcon.textContent = "🏛️";
    bannerTitle.textContent = activeSubCat === "الكل" ? "النافذة السياسية — جميع الأقسام السياسية" : `النافذة السياسية — قسم ${activeSubCat}`;
    bannerDesc.textContent = "متابعة رسمية للشؤون والملفات السياسية بأقسامها: محلية، عربي، ودولية.";
  } else if (activeWindow === "sports") {
    subCategoriesBar.classList.remove("hidden");
    subCategoriesBar.innerHTML = ["الكل", "محلية", "عربي", "دولية"].map((s) => {
      const ico = s === "محلية" ? "🏟️" : s === "عربي" ? "🏆" : s === "دولية" ? "🌍" : "⚽";
      return `<button type="button" class="sub-cat-btn ${activeSubCat === s ? "active" : ""}" data-sub="${s}">${ico} ${s === "الكل" ? "جميع الرياضية" : "رياضة " + s}</button>`;
    }).join("");
    bannerIcon.textContent = "⚽";
    bannerTitle.textContent = activeSubCat === "الكل" ? "النافذة الرياضية — جميع الأقسام الرياضية" : `النافذة الرياضية — قسم ${activeSubCat}`;
    bannerDesc.textContent = "تغطية رياضية متكاملة (محلية، عربي، دولية) من كووورة، في الجول، يلا كورة، يمن تيم، يمن مونيتور، رياضة، السبورت، سوفا سكور، فلاش سكور، TOD، والجزيرة نت.";
  } else {
    subCategoriesBar.classList.add("hidden");
    subCategoriesBar.innerHTML = "";
    bannerIcon.textContent = "🎭";
    bannerTitle.textContent = "نافذة منوعات وثقافة";
    bannerDesc.textContent = "إضاءات فكرية وفنية وثقافية ومجتمعية ومحتوى متنوع.";
  }
}

function getLikesCount(id) { return (engageState.extraLikes[id] || 0) + (engageState.likedIds.includes(id) ? 1 : 0); }
function getCommentsList(id) { return Array.isArray(engageState.comments[id]) ? engageState.comments[id] : []; }

function renderTicker() {
  const br = newsList.filter((i) => i.breaking);
  breakingTicker.textContent = br.length ? br.map((b) => `• ${b.title}`).join("      ") : newsList.slice(0, 6).map((n) => `• [${n.category}] ${n.title}`).join("      ");
}

function renderFeed() {
  const q = searchQuery.trim().toLowerCase();
  const filtered = newsList.filter((item) => {
    const cat = classifyArticle(item.title, item.body, item.source, item.category);
    const matchesSearch = !q || String(item.title || "").toLowerCase().includes(q) || String(item.body || "").toLowerCase().includes(q) || String(item.source || "").toLowerCase().includes(q) || cat.toLowerCase().includes(q);
    return matchesCurrentWindowAndSub(cat) && matchesSearch;
  });

  if (!filtered.length) {
    newsFeed.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#475569;padding:30px;font-weight:700;">لا توجد أخبار منشورة في هذا القسم حالياً.</p>`;
    return;
  }

  newsFeed.innerHTML = filtered.map((item) => {
    const idStr = String(item.id);
    const cat = classifyArticle(item.title, item.body, item.source, item.category);
    const liked = engageState.likedIds.includes(idStr);
    const likesCnt = getLikesCount(idStr);
    const commentsCnt = getCommentsList(idStr).length;
    const imgBlock = isSafeImageSrc(item.image)
      ? `<div class="news-img-container"><img class="news-thumb" src="${escapeAttr(item.image)}" alt="${escapeAttr(item.title)}" loading="lazy" onerror="this.closest('.news-img-container').style.display='none'" /><div class="img-watermark-bar"><span>🎙️</span><span>${escapeHtml(KAYAN_TAG)}</span></div></div>`
      : "";
    const adminControls = isUnlocked ? `<div class="admin-actions"><button class="btn-edit" data-edit="${escapeAttr(idStr)}" type="button">تعديل</button><button class="btn-delete" data-del="${escapeAttr(idStr)}" type="button">حذف</button></div>` : "";
    return `<article class="news-card" data-open="${escapeAttr(idStr)}">${imgBlock}<div class="news-body-wrap"><div class="news-meta"><span class="news-cat ${getCategoryBadgeClass(cat)}">${escapeHtml(cat)}</span><span class="news-source">${escapeHtml(item.source || siteSettings.siteName)}</span><span>${escapeHtml(item.createdAt || "")}</span></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p><div class="article-signature-box">🎙️ ${escapeHtml(KAYAN_TAG)}</div><div class="card-engagement"><button type="button" class="card-like-btn ${liked ? "liked" : ""}" data-like="${escapeAttr(idStr)}">❤️ إعجاب (${likesCnt})</button><span class="card-comment-hint">💬 تعليقات (${commentsCnt})</span></div>${adminControls}</div></article>`;
  }).join("");
}

function extractImageFromEntry(entry) {
  if (isSafeImageSrc(entry.thumbnail)) return entry.thumbnail;
  if (isSafeImageSrc(entry.enclosure?.link) && /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(entry.enclosure.link)) return entry.enclosure.link;
  const imgMatch = `${entry.description || ""} ${entry.content || ""}`.match(/<img[^>]+src=["']([^"']+)["']/i);
  return imgMatch && isSafeImageSrc(imgMatch[1]) ? imgMatch[1] : "";
}

async function fetchSingleFeed(feed) {
  const res = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`);
  if (!res.ok) throw new Error("Feed fetch failed");
  const data = await res.json();
  const entries = Array.isArray(data.items) ? data.items.slice(0, 5) : [];
  const sourceTitle = (feed.name || data.feed?.title || "مصدر إخباري").trim();
  return entries.map((entry, idx) => {
    const title = cleanHtmlText(entry.title);
    const body = cleanHtmlText(entry.description || entry.content || "");
    const link = isSafeExternalUrl(entry.link) ? entry.link : "";
    const image = extractImageFromEntry(entry);
    const parsedTime = entry.pubDate ? Date.parse(entry.pubDate) : NaN;
    const timestamp = Number.isFinite(parsedTime) ? parsedTime : (Date.now() - idx * 60000);
    const category = feed.category && feed.category !== "تلقائي" ? feed.category : classifyArticle(title, body, sourceTitle, feed.hint);
    return {
      id: `rss_${btoa(unescape(encodeURIComponent(`${sourceTitle}_${title.slice(0, 40)}_${idx}`))).replace(/[^a-zA-Z0-9]/g, "").slice(0, 24)}`,
      timestamp, title, source: sourceTitle, category, breaking: false, image, link,
      body: body || "اضغط لقراءة التفاصيل الكاملة للخبر.", createdAt: new Date(timestamp).toLocaleString("ar-EG")
    };
  }).filter((item) => item.title.length > 3);
}

async function runAutomaticFeeds(force = false) {
  const lastRun = Number(localStorage.getItem(AUTO_FETCH_KEY) || 0);
  if (!force && Date.now() - lastRun < 15 * 60 * 1000 && newsList.length > 3) { autoSyncStatus.textContent = "الأخبار محدثة"; return; }
  autoSyncStatus.textContent = "جاري تحديث الأخبار...";
  const existingKeys = new Set(newsList.map((n) => `${n.title.trim()}|${n.source || ""}`));
  const newly = [];
  for (const feed of TRUSTED_FEEDS) {
    try {
      const items = await fetchSingleFeed(feed);
      for (const item of items) {
        const key = `${item.title.trim()}|${item.source || ""}`;
        if (!existingKeys.has(key)) { existingKeys.add(key); newly.push(item); }
      }
    } catch {}
  }
  if (newly.length) {
    newsList = [...newly, ...newsList].sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0)).slice(0, 150);
    saveLocalNews(newsList); renderTicker(); renderFeed();
    for (const item of newly.slice(0, 25)) await saveItemToCloud(item);
  }
  localStorage.setItem(AUTO_FETCH_KEY, String(Date.now()));
  autoSyncStatus.textContent = `آخر تحديث: ${new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}`;
}

async function syncFromCloud() {
  try {
    const res = await fetch(DB_URL);
    if (!res.ok) return;
    const data = await res.json();
    if (!data) return;
    const cloudList = Array.isArray(data) ? data.filter(Boolean) : Object.entries(data).map(([k, v]) => ({ id: k, ...v }));
    if (cloudList.length) {
      const map = new Map();
      [...cloudList, ...newsList].forEach((i) => { if (i && i.id) map.set(String(i.id), i); });
      newsList = Array.from(map.values()).sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0)).slice(0, 150);
      saveLocalNews(newsList); renderTicker(); renderFeed();
    }
  } catch {}
}

async function saveItemToCloud(item) {
  try {
    if (String(item.image || "").length > 900000) return;
    await fetch(`https://kayan-news-575ab-default-rtdb.firebaseio.com/news/${encodeURIComponent(String(item.id))}.json`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item)
    });
  } catch {}
}

async function deleteItemFromCloud(id) {
  try { await fetch(`https://kayan-news-575ab-default-rtdb.firebaseio.com/news/${encodeURIComponent(String(id))}.json`, { method: "DELETE" }); } catch {}
}

async function syncSettingsFromCloud() {
  try {
    const res = await fetch(SETTINGS_DB_URL);
    if (!res.ok) return;
    const data = await res.json();
    if (data && typeof data === "object") { const m = { ...DEFAULT_SETTINGS, ...data }; saveLocalSettings(m); applySiteSettings(m); }
  } catch {}
}

async function saveSettingsToCloud(cfg) {
  try {
    if (String(cfg.logoUrl || "").length > 250000) return;
    await fetch(SETTINGS_DB_URL, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cfg) });
  } catch {}
}

function applySiteSettings(cfg) {
  siteSettings = { ...DEFAULT_SETTINGS, ...(cfg || {}) };
  siteTitleText.textContent = siteSettings.siteName;
  siteSubtitleText.textContent = siteSettings.subtitle;
  document.title = `${siteSettings.siteName} | ${siteSettings.subtitle}`;
  const hex = /^#[0-9a-fA-F]{6}$/.test(siteSettings.accentColor) ? siteSettings.accentColor : DEFAULT_SETTINGS.accentColor;
  document.documentElement.style.setProperty("--accent", hex);
  document.documentElement.style.setProperty("--accent-dark", hex);
  const hasLogo = isSafeImageSrc(siteSettings.logoUrl);
  customLogoImg.src = hasLogo ? siteSettings.logoUrl.trim() : "";
  customLogoImg.classList.toggle("hidden", !hasLogo);
  defaultLogoSvg.classList.toggle("hidden", hasLogo);
  footerAboutText.textContent = siteSettings.aboutText;
  footerOverviewText.textContent = siteSettings.overviewText;
  footerEmailText.textContent = siteSettings.emailText;
  footerEmailLink.href = `mailto:${siteSettings.emailText}`;
  footerOrgText.textContent = siteSettings.orgText;
  footerCopyrightText.textContent = `© 2026 ${siteSettings.siteName} | ${siteSettings.subtitle} — جميع الحقوق محفوظة`;
  el("cfgSiteName").value = siteSettings.siteName;
  el("cfgSubtitle").value = siteSettings.subtitle;
  el("cfgLogoUrl").value = siteSettings.logoUrl;
  el("cfgAccentColor").value = hex;
  el("accentHexLabel").textContent = hex;
  el("cfgAboutText").value = siteSettings.aboutText;
  el("cfgOverviewText").value = siteSettings.overviewText;
  el("cfgEmailText").value = siteSettings.emailText;
  el("cfgSocialHandle").value = siteSettings.socialHandle;
  el("cfgOrgText").value = siteSettings.orgText;
}

function renderSubStatus() {
  subStatusText.textContent = subState.subscribed
    ? `أنت مشترك ومتابع في كيان نيوز${subState.contact ? " (" + subState.contact + ")" : ""} — ستصلك التحديثات.`
    : "اشترك لتصلك آخر الأخبار والتحديثات أولاً بأول.";
  subscribeBtn.textContent = subState.subscribed ? "✓ مشترك" : "اشتراك ومتابعة";
}

function toggleLike(idStr) {
  const idx = engageState.likedIds.indexOf(idStr);
  if (idx >= 0) engageState.likedIds.splice(idx, 1);
  else engageState.likedIds.push(idStr);
  saveEngageState(engageState);
  renderFeed();
  if (currentModalNewsId === idStr) renderModalEngagement(idStr);
}

function renderCommentsList(idStr) {
  const list = getCommentsList(idStr);
  el("modalCommentsCount").textContent = String(list.length);
  el("commentsList").innerHTML = list.length
    ? list.map((c) => `<div class="comment-item"><div class="comment-meta"><span>${escapeHtml(c.author)}</span><span>${escapeHtml(c.date)}</span></div><div class="comment-body">${escapeHtml(c.text)}</div></div>`).join("")
    : `<p style="color:#64748b;font-size:0.86rem;">لا توجد تعليقات بعد؛ كن أول من يشارك برأيه.</p>`;
}

function renderModalEngagement(idStr) {
  const liked = engageState.likedIds.includes(idStr);
  const btn = el("modalLikeBtn");
  btn.classList.toggle("liked", liked);
  el("modalLikeCount").textContent = String(getLikesCount(idStr));
  renderCommentsList(idStr);
}

function openArticleModal(idStr) {
  const item = newsList.find((n) => String(n.id) === String(idStr));
  if (!item) return;
  currentModalNewsId = String(item.id);
  const cat = classifyArticle(item.title, item.body, item.source, item.category);
  el("modalTitle").textContent = item.title || "";
  el("modalBody").textContent = item.body || "";
  el("modalCat").textContent = cat;
  el("modalCat").className = `news-cat ${getCategoryBadgeClass(cat)}`;
  el("modalSource").textContent = item.source ? `المصدر: ${item.source}` : "";
  el("modalDate").textContent = item.createdAt || "";
  const hasImg = isSafeImageSrc(item.image);
  el("modalImg").src = hasImg ? item.image : "";
  el("modalImgWrap").classList.toggle("hidden", !hasImg);
  const hasLink = isSafeExternalUrl(item.link);
  el("modalLink").href = hasLink ? item.link : "#";
  el("modalLink").classList.toggle("hidden", !hasLink);
  renderModalEngagement(currentModalNewsId);
  el("articleModal").classList.remove("hidden");
}

function closeArticleModal() { currentModalNewsId = null; el("articleModal").classList.add("hidden"); }
function escapeHtml(t) { const d = document.createElement("div"); d.textContent = t ?? ""; return d.innerHTML; }
function escapeAttr(t) { return escapeHtml(t).replace(/"/g, "&quot;"); }
function cleanHtmlText(h) { const d = document.createElement("div"); d.innerHTML = h || ""; return (d.textContent || d.innerText || "").replace(/\s+/g, " ").trim(); }

async function shareTextOrLink(title, text, url) {
  const payload = `${title}\n${text}\n${url}\n${KAYAN_TAG}`;
  if (navigator.share) {
    try { await navigator.share({ title, text: `${text}\n${KAYAN_TAG}`, url }); return; } catch {}
  }
  try { await navigator.clipboard.writeText(payload); alert("تم نسخ آخر الأخبار والتحديثات مع رابط الموقع بنجاح!"); }
  catch { prompt("انسخ النص والرابط التالي:", payload); }
}

subscribeBtn.addEventListener("click", async () => {
  const contact = subscriberContactInput.value.trim() || subState.contact;
  if ("Notification" in window && Notification.permission === "default") {
    try { await Notification.requestPermission(); } catch {}
  }
  subState = { subscribed: true, contact };
  saveSubState(subState);
  renderSubStatus();
  alert("تم اشتراكك ومتابعتك في منصة كيان نيوز (KAYAN NEWS) بنجاح!");
});

sendLatestDigestBtn.addEventListener("click", async () => {
  const topThree = newsList.slice(0, 3).map((n, i) => `${i + 1}. ${n.title} (${n.source || siteSettings.siteName})`).join("\n");
  await shareTextOrLink("آخر أخبار وتحديثات كيان نيوز | KAYAN NEWS", topThree || "تابع أحدث الأخبار السياسية والرياضية والثقافية.", SITE_URL);
});

mainWindowsNav.addEventListener("click", (e) => {
  const btn = e.target.closest(".win-tab");
  if (!btn) return;
  activeWindow = btn.dataset.win;
  activeSubCat = "الكل";
  renderWindowHeader();
  renderFeed();
});

subCategoriesBar.addEventListener("click", (e) => {
  const btn = e.target.closest(".sub-cat-btn");
  if (!btn) return;
  activeSubCat = btn.dataset.sub;
  renderWindowHeader();
  renderFeed();
});

searchInput.addEventListener("input", (e) => { searchQuery = e.target.value; renderFeed(); });
refreshAutoBtn.addEventListener("click", () => runAutomaticFeeds(true));

toggleAdminBtn.addEventListener("click", () => {
  if (!isUnlocked) {
    const code = prompt("أدخل رمز الدخول للوحة الإدارة:");
    if (code !== ADMIN_PASSCODE) { if (code !== null) alert("رمز الدخول غير صحيح."); return; }
    isUnlocked = true; renderFeed();
  }
  adminPanel.classList.toggle("hidden");
});

lockAdminBtn.addEventListener("click", () => { isUnlocked = false; adminPanel.classList.add("hidden"); renderFeed(); });

el("newsImageFile").addEventListener("change", async (e) => {
  const f = e.target.files?.[0];
  if (!f) return;
  try {
    const c = await compressImageFile(f, 780, 0.68);
    el("newsImage").value = c;
    el("newsImgPreview").src = c;
    el("newsImgPreviewWrap").classList.remove("hidden");
    el("clearNewsImgBtn").classList.remove("hidden");
  } catch { alert("تعذر قراءة الصورة."); }
});

el("clearNewsImgBtn").addEventListener("click", () => {
  el("newsImageFile").value = ""; el("newsImage").value = ""; el("newsImgPreview").src = "";
  el("newsImgPreviewWrap").classList.add("hidden"); el("clearNewsImgBtn").classList.add("hidden");
});

el("cfgLogoFile").addEventListener("change", async (e) => {
  const f = e.target.files?.[0];
  if (!f) return;
  try { el("cfgLogoUrl").value = await compressImageFile(f, 220, 0.75); el("settingsStatus").textContent = "تم اختيار الشعار، اضغط حفظ الإعدادات."; }
  catch { el("settingsStatus").textContent = "تعذر تحميل الشعار."; }
});

el("clearLogoBtn").addEventListener("click", () => { el("cfgLogoFile").value = ""; el("cfgLogoUrl").value = ""; });
el("cfgAccentColor").addEventListener("input", (e) => { el("accentHexLabel").textContent = e.target.value; });

el("siteSettingsForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!isUnlocked) return;
  const rawLogo = el("cfgLogoUrl").value.trim();
  const updated = {
    siteName: el("cfgSiteName").value.trim() || DEFAULT_SETTINGS.siteName,
    subtitle: el("cfgSubtitle").value.trim() || DEFAULT_SETTINGS.subtitle,
    logoUrl: isSafeImageSrc(rawLogo) ? rawLogo : "",
    accentColor: el("cfgAccentColor").value || DEFAULT_SETTINGS.accentColor,
    aboutText: el("cfgAboutText").value.trim() || DEFAULT_SETTINGS.aboutText,
    overviewText: el("cfgOverviewText").value.trim() || DEFAULT_SETTINGS.overviewText,
    emailText: el("cfgEmailText").value.trim() || DEFAULT_SETTINGS.emailText,
    socialHandle: el("cfgSocialHandle").value.trim() || DEFAULT_SETTINGS.socialHandle,
    orgText: el("cfgOrgText").value.trim() || DEFAULT_SETTINGS.orgText
  };
  applySiteSettings(updated); saveLocalSettings(updated); await saveSettingsToCloud(updated);
  el("settingsStatus").textContent = "تم حفظ إعدادات الموقع بنجاح.";
});

el("resetSettingsBtn").addEventListener("click", async () => {
  if (!isUnlocked) return;
  applySiteSettings(DEFAULT_SETTINGS); saveLocalSettings(DEFAULT_SETTINGS); await saveSettingsToCloud(DEFAULT_SETTINGS);
  el("settingsStatus").textContent = "تمت استعادة الإعدادات الافتراضية.";
});

el("newsForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!isUnlocked) return;
  const title = el("newsTitle").value.trim();
  const body = el("newsBody").value.trim();
  if (!title || !body) return;
  const item = {
    id: editingId || `manual_${Date.now()}`,
    timestamp: Date.now(),
    title,
    source: el("newsSource").value.trim() || siteSettings.siteName,
    image: isSafeImageSrc(el("newsImage").value.trim()) ? el("newsImage").value.trim() : "",
    category: el("newsCategory").value,
    breaking: el("isBreaking").checked,
    link: "",
    body,
    createdAt: new Date().toLocaleString("ar-EG")
  };
  newsList = editingId ? newsList.map((n) => String(n.id) === String(editingId) ? item : n) : [item, ...newsList];
  editingId = null; el("editNewsId").value = ""; el("newsForm").reset(); el("clearNewsImgBtn").click();
  saveLocalNews(newsList); renderTicker(); renderFeed(); await saveItemToCloud(item);
});

el("rssForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!isUnlocked) return;
  const url = el("rssUrl").value.trim();
  if (!isSafeExternalUrl(url)) { el("rssStatus").textContent = "أدخل رابط RSS صحيح."; return; }
  el("rssStatus").textContent = "جاري سحب الأخبار...";
  try {
    const cat = el("rssCategory").value;
    const items = await fetchSingleFeed({ name: el("rssSourceName").value.trim(), url, category: cat, hint: cat === "تلقائي" ? "سياسة عربية" : cat });
    if (!items.length) { el("rssStatus").textContent = "لا توجد عناصر في المصدر."; return; }
    newsList = [...items, ...newsList].sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0));
    saveLocalNews(newsList); renderTicker(); renderFeed();
    for (const it of items) await saveItemToCloud(it);
    el("rssStatus").textContent = `تمت إضافة ${items.length} أخبار.`; el("rssForm").reset();
  } catch { el("rssStatus").textContent = "تعذر جلب الرابط حالياً."; }
});

newsFeed.addEventListener("click", async (e) => {
  const likeBtn = e.target.closest("button[data-like]");
  if (likeBtn) { e.stopPropagation(); toggleLike(likeBtn.dataset.like); return; }
  const editBtn = e.target.closest("button[data-edit]");
  if (editBtn && isUnlocked) {
    e.stopPropagation();
    const target = newsList.find((n) => String(n.id) === String(editBtn.dataset.edit));
    if (!target) return;
    editingId = target.id; el("newsTitle").value = target.title; el("newsSource").value = target.source || "";
    el("newsImage").value = target.image || ""; el("newsCategory").value = target.category || "سياسة محلية";
    el("isBreaking").checked = Boolean(target.breaking); el("newsBody").value = target.body || "";
    adminPanel.classList.remove("hidden"); adminPanel.scrollIntoView({ behavior: "smooth" });
    return;
  }
  const delBtn = e.target.closest("button[data-del]");
  if (delBtn && isUnlocked) {
    e.stopPropagation();
    const id = delBtn.dataset.del;
    newsList = newsList.filter((n) => String(n.id) !== String(id));
    saveLocalNews(newsList); renderTicker(); renderFeed(); await deleteItemFromCloud(id);
    return;
  }
  const card = e.target.closest("article[data-open]");
  if (card) openArticleModal(card.dataset.open);
});

el("modalLikeBtn").addEventListener("click", () => { if (currentModalNewsId) toggleLike(currentModalNewsId); });
el("modalShareArticleBtn").addEventListener("click", () => {
  const item = newsList.find((n) => String(n.id) === String(currentModalNewsId));
  if (item) shareTextOrLink(item.title, item.body, SITE_URL);
});

el("commentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!currentModalNewsId) return;
  const txt = el("commentTextInput").value.trim();
  if (!txt) return;
  const author = el("commentAuthorInput").value.trim() || "قارئ كيان";
  const arr = getCommentsList(currentModalNewsId);
  arr.unshift({ author, text: txt, date: new Date().toLocaleString("ar-EG") });
  engageState.comments[currentModalNewsId] = arr;
  saveEngageState(engageState);
  el("commentTextInput").value = "";
  renderCommentsList(currentModalNewsId);
  renderFeed();
});

el("closeModalBtn").addEventListener("click", closeArticleModal);
el("articleModal").addEventListener("click", (e) => { if (e.target === el("articleModal")) closeArticleModal(); });

applySiteSettings(siteSettings);
renderSubStatus();
renderWindowHeader();
renderTicker();
renderFeed();
syncSettingsFromCloud();
syncFromCloud();
runAutomaticFeeds(false);
