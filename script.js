const DB_URL = "https://kayan-news-575ab-default-rtdb.firebaseio.com/news.json";
const STORAGE_KEY = "kayan_news_items_v3";
const AUTO_FETCH_KEY = "kayan_news_last_auto_fetch_v3";
const ADMIN_PASSCODE = "kayan2026";

const TRUSTED_FEEDS = [
  { name: "الجزيرة", url: "https://www.aljazeera.net/aljazeerarss/a7c186be-1baa-4bd4-9d80-a84db769f779/73d0e1b4-532f-45ef-b135-bfdff8b8cab9", hint: "عربية" },
  { name: "بي بي سي عربي", url: "https://feeds.bbci.co.uk/arabic/rss.xml", hint: "دولية" },
  { name: "الجزيرة نت - رياضة", url: "https://www.aljazeera.net/aljazeerarss/sport/rss.xml", hint: "رياضة عربية" },
  { name: "يمن شباب / محليات", url: "https://yemenshabab.net/rss", hint: "محلية" },
  { name: "العربية", url: "https://www.alarabiya.net/.mrss/ar.xml", hint: "عربية" },
  { name: "الحدث", url: "https://www.alarabiya.net/.mrss/ar/alhadath.xml", hint: "عربية" },
  { name: "عدن المستقلة / محلي", url: "https://aic-aden.com/feed", hint: "محلية" },
  { name: "بي إن سبورت / رياضة", url: "https://www.beinsports.com/ar-mena/rss", hint: "رياضة دولية" },
  { name: "SSC / رياضة", url: "https://www.ssc.sa/rss", hint: "رياضة عربية" }
];

const defaultNews = [
  {
    id: "welcome_kayan_1",
    timestamp: Date.now(),
    title: "انطلاق منصة كيان نيوز بحلتها الجديدة وتصنيفاتها المتكاملة",
    source: "كيان نيوز",
    category: "محلية",
    breaking: true,
    image: "",
    link: "",
    body: "مرحباً بكم في منصة كيان نيوز (KAYAN NEWS)؛ متابعة شاملة ومصنفة للأخبار المحلية والرياضية والعربية والدولية على مدار الساعة.",
    createdAt: new Date().toLocaleString("ar-EG")
  }
];

let currentCategory = "الكل";
let searchQuery = "";
let newsList = loadLocalNews();
let isUnlocked = false;
let editingId = null;

const toggleAdminBtn = document.getElementById("toggleAdminBtn");
const refreshAutoBtn = document.getElementById("refreshAutoBtn");
const lockAdminBtn = document.getElementById("lockAdminBtn");
const adminPanel = document.getElementById("adminPanel");
const autoSyncStatus = document.getElementById("autoSyncStatus");

const newsForm = document.getElementById("newsForm");
const newsFormTitle = document.getElementById("newsFormTitle");
const editNewsIdInput = document.getElementById("editNewsId");
const newsTitleInput = document.getElementById("newsTitle");
const newsSourceInput = document.getElementById("newsSource");
const newsImageInput = document.getElementById("newsImage");
const newsCategorySelect = document.getElementById("newsCategory");
const isBreakingCheckbox = document.getElementById("isBreaking");
const newsBodyInput = document.getElementById("newsBody");
const submitNewsBtn = document.getElementById("submitNewsBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

const rssForm = document.getElementById("rssForm");
const rssUrlInput = document.getElementById("rssUrl");
const rssSourceNameInput = document.getElementById("rssSourceName");
const rssCategorySelect = document.getElementById("rssCategory");
const rssStatus = document.getElementById("rssStatus");

const newsFeed = document.getElementById("newsFeed");
const categoryNav = document.getElementById("categoryNav");
const searchInput = document.getElementById("searchInput");
const breakingTicker = document.getElementById("breakingTicker");

const articleModal = document.getElementById("articleModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalImg = document.getElementById("modalImg");
const modalCat = document.getElementById("modalCat");
const modalSource = document.getElementById("modalSource");
const modalDate = document.getElementById("modalDate");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalLink = document.getElementById("modalLink");

function loadLocalNews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    if (Array.isArray(parsed) && parsed.length) return parsed;
  } catch {}
  return [...defaultNews];
}

function saveLocalNews(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

function classifyArticle(title, body, sourceName, hintCategory) {
  const text = `${title} ${body} ${sourceName}`.toLowerCase();

  const yemenKeywords = ["اليمن", "يمني", "يمنية", "صنعاء", "عدن", "تعز", "مأرب", "حضرموت", "المكلا", "الحديدة", "إب", "ذمار", "شبوة", "لحج", "أبين", "المهرة", "سقطرى", "حجة", "عمران", "صعدة", "البيضاء", "الجوف", "الضالع", "ريمة"];
  const arabKeywords = ["السعودية", "مصر", "الإمارات", "قطر", "الكويت", "البحرين", "عمان", "الأردن", "لبنان", "سوريا", "العراق", "فلسطين", "غزة", "السودان", "ليبيا", "تونس", "الجزائر", "المغرب", "موريتانيا", "الصومال", "جيبوتي", "جزر القمر", "عربي", "عربية", "الخليج"];
  const arabSportKeywords = ["دوري روشن", "الدوري السعودي", "الدوري المصري", "الزمالك", "الأهلي", "الهلال", "النصر", "الاتحاد", "كأس العرب", "المنتخب السعودي", "منتخب مصر", "منتخب المغرب", "منتخب قطر", "منتخب الجزائر", "البطولة العربية", "دوري أبطال أفريقيا", "الدوري الإماراتي", "الدوري القطري"];
  const sportKeywords = ["رياضة", "كرة القدم", "مباراة", "هدف", "بطولة", "دوري", "منتخب", "كأس", "مدرب", "لاعب", "فريق", "ريال مدريد", "برشلونة", "مانشستر", "ليفربول", "أرسنال", "بايرن", "باريس", "يوفنتوس", "إنتر", "ميلان", "تشيلسي", "دوري أبطال أوروبا", "كأس العالم", "فورمولا", "تنس", "سلة"];

  const isYemen = yemenKeywords.some((k) => text.includes(k));
  const isArab = arabKeywords.some((k) => text.includes(k));
  const isSport = sportKeywords.some((k) => text.includes(k));
  const isArabSport = arabSportKeywords.some((k) => text.includes(k));

  if (isYemen && isSport) return "رياضة محلية";
  if (isYemen) return "محلية";
  if (isSport && (isArab || isArabSport)) return "رياضة عربية";
  if (isSport) return "رياضة دولية";
  if (hintCategory === "رياضة محلية" || hintCategory === "رياضة عربية" || hintCategory === "رياضة دولية") {
    return hintCategory;
  }
  if (isArab) return "عربية";
  if (hintCategory && hintCategory !== "تلقائي") return hintCategory;
  return "دولية";
}

function extractImageFromEntry(entry) {
  if (isSafeUrl(entry.thumbnail)) return entry.thumbnail;
  if (isSafeUrl(entry.enclosure?.link) && /\.(jpg|jpeg|png|webp|gif)(\?|$)/i.test(entry.enclosure.link)) {
    return entry.enclosure.link;
  }
  const htmlChunk = `${entry.description || ""} ${entry.content || ""}`;
  const imgMatch = htmlChunk.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch && isSafeUrl(imgMatch[1])) return imgMatch[1];
  return "";
}

async function fetchSingleFeed(feed) {
  const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`;
  const res = await fetch(api);
  if (!res.ok) throw new Error("Feed fetch failed");
  const data = await res.json();
  const entries = Array.isArray(data.items) ? data.items.slice(0, 5) : [];
  const sourceTitle = (feed.name || data.feed?.title || "مصدر إخباري").trim();

  return entries.map((entry, idx) => {
    const title = cleanHtmlText(entry.title);
    const body = cleanHtmlText(entry.description || entry.content || "");
    const link = isSafeUrl(entry.link) ? entry.link : "";
    const image = extractImageFromEntry(entry);
    const parsedTime = entry.pubDate ? Date.parse(entry.pubDate) : NaN;
    const timestamp = Number.isFinite(parsedTime) ? parsedTime : (Date.now() - idx * 60000);
    const category = feed.category && feed.category !== "تلقائي"
      ? feed.category
      : classifyArticle(title, body, sourceTitle, feed.hint);

    return {
      id: `rss_${btoa(unescape(encodeURIComponent(`${sourceTitle}_${title.slice(0, 40)}_${idx}`))).replace(/[^a-zA-Z0-9]/g, "").slice(0, 24)}`,
      timestamp,
      title,
      source: sourceTitle,
      category,
      breaking: false,
      image,
      link,
      body: body || "اضغط لقراءة التفاصيل الكاملة للخبر.",
      createdAt: new Date(timestamp).toLocaleString("ar-EG")
    };
  }).filter((item) => item.title.length > 3);
}

async function runAutomaticFeeds(force = false) {
  const lastRun = Number(localStorage.getItem(AUTO_FETCH_KEY) || 0);
  const fifteenMinutes = 15 * 60 * 1000;
  if (!force && Date.now() - lastRun < fifteenMinutes && newsList.length > 1) {
    autoSyncStatus.textContent = "الأخبار محدثة";
    return;
  }

  autoSyncStatus.textContent = "جاري تحديث الأخبار من المصادر...";
  const existingKeys = new Set(newsList.map((n) => `${n.title.trim()}|${n.source || ""}`));
  const newlyCollected = [];

  for (const feed of TRUSTED_FEEDS) {
    try {
      const items = await fetchSingleFeed(feed);
      for (const item of items) {
        const key = `${item.title.trim()}|${item.source || ""}`;
        if (!existingKeys.has(key)) {
          existingKeys.add(key);
          newlyCollected.push(item);
        }
      }
    } catch {}
  }

  if (newlyCollected.length) {
    newsList = [...newlyCollected, ...newsList];
    newsList.sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0));
    newsList = newsList.slice(0, 120);
    saveLocalNews(newsList);
    renderTicker();
    renderFeed();
    for (const item of newlyCollected.slice(0, 20)) {
      await saveItemToCloud(item);
    }
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

    const cloudList = Array.isArray(data)
      ? data.filter(Boolean)
      : Object.entries(data).map(([key, val]) => ({ id: key, ...val }));

    if (cloudList.length) {
      const mergedMap = new Map();
      [...cloudList, ...newsList].forEach((item) => {
        if (item && item.id) mergedMap.set(String(item.id), item);
      });
      newsList = Array.from(mergedMap.values())
        .sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0))
        .slice(0, 120);
      saveLocalNews(newsList);
      renderTicker();
      renderFeed();
    }
  } catch {}
}

async function saveItemToCloud(item) {
  try {
    await fetch(`https://kayan-news-575ab-default-rtdb.firebaseio.com/news/${encodeURIComponent(String(item.id))}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });
  } catch {}
}

async function deleteItemFromCloud(id) {
  try {
    await fetch(`https://kayan-news-575ab-default-rtdb.firebaseio.com/news/${encodeURIComponent(String(id))}.json`, {
      method: "DELETE"
    });
  } catch {}
}

function renderTicker() {
  const breakingItems = newsList.filter((item) => item.breaking);
  breakingTicker.textContent = breakingItems.length
    ? breakingItems.map((b) => `• ${b.title}`).join("      ")
    : newsList.slice(0, 5).map((n) => `• [${n.category}] ${n.title}`).join("      ");
}

function renderFeed() {
  const q = searchQuery.trim().toLowerCase();
  const filtered = newsList.filter((item) => {
    const matchesCat = currentCategory === "الكل" || item.category === currentCategory;
    const matchesSearch = !q ||
      String(item.title || "").toLowerCase().includes(q) ||
      String(item.body || "").toLowerCase().includes(q) ||
      String(item.source || "").toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  if (!filtered.length) {
    newsFeed.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#64748b;padding:28px;">لا توجد أخبار في قسم "${escapeHtml(currentCategory)}" حالياً.</p>`;
    return;
  }

  newsFeed.innerHTML = filtered.map((item) => {
    const safeImg = isSafeUrl(item.image)
      ? `<img class="news-thumb" src="${escapeAttr(item.image)}" alt="${escapeAttr(item.title)}" loading="lazy" onerror="this.style.display='none'" />`
      : "";
    const adminControls = isUnlocked
      ? `<div class="admin-actions">
           <button class="btn-edit" data-edit="${escapeAttr(String(item.id))}" type="button">تعديل</button>
           <button class="btn-delete" data-del="${escapeAttr(String(item.id))}" type="button">حذف</button>
         </div>`
      : "";

    return `
      <article class="news-card" data-open="${escapeAttr(String(item.id))}">
        ${safeImg}
        <div class="news-body-wrap">
          <div class="news-meta">
            <span class="news-cat">${escapeHtml(item.category || "دولية")}</span>
            <span class="news-source">${escapeHtml(item.source || "كيان نيوز")}</span>
            <span>${escapeHtml(item.createdAt || "")}</span>
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.body)}</p>
          ${adminControls}
        </div>
      </article>
    `;
  }).join("");
}

function startEditingNews(id) {
  const target = newsList.find((n) => String(n.id) === String(id));
  if (!target) return;

  editingId = target.id;
  editNewsIdInput.value = target.id;
  newsTitleInput.value = target.title || "";
  newsSourceInput.value = target.source || "كيان نيوز";
  newsImageInput.value = target.image || "";
  newsCategorySelect.value = target.category || "محلية";
  isBreakingCheckbox.checked = Boolean(target.breaking);
  newsBodyInput.value = target.body || "";

  newsFormTitle.textContent = "تعديل الخبر المحدد";
  submitNewsBtn.textContent = "حفظ التعديلات";
  cancelEditBtn.classList.remove("hidden");
  adminPanel.classList.remove("hidden");
  adminPanel.scrollIntoView({ behavior: "smooth" });
}

function resetNewsForm() {
  editingId = null;
  editNewsIdInput.value = "";
  newsForm.reset();
  newsFormTitle.textContent = "إضافة خبر جديد";
  submitNewsBtn.textContent = "نشر الخبر";
  cancelEditBtn.classList.add("hidden");
}

function openArticleModal(id) {
  const item = newsList.find((n) => String(n.id) === String(id));
  if (!item) return;

  modalTitle.textContent = item.title || "";
  modalBody.textContent = item.body || "";
  modalCat.textContent = item.category || "دولية";
  modalSource.textContent = item.source ? `المصدر: ${item.source}` : "";
  modalDate.textContent = item.createdAt || "";

  if (isSafeUrl(item.image)) {
    modalImg.src = item.image;
    modalImg.alt = item.title || "";
    modalImg.classList.remove("hidden");
  } else {
    modalImg.src = "";
    modalImg.classList.add("hidden");
  }

  if (isSafeUrl(item.link)) {
    modalLink.href = item.link;
    modalLink.classList.remove("hidden");
  } else {
    modalLink.href = "#";
    modalLink.classList.add("hidden");
  }

  articleModal.classList.remove("hidden");
}

function closeArticleModal() {
  articleModal.classList.add("hidden");
}

function isSafeUrl(url) {
  if (!url || typeof url !== "string") return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

function escapeAttr(text) {
  return escapeHtml(text).replace(/"/g, "&quot;");
}

function cleanHtmlText(htmlStr) {
  const div = document.createElement("div");
  div.innerHTML = htmlStr || "";
  return (div.textContent || div.innerText || "").replace(/\s+/g, " ").trim();
}

toggleAdminBtn.addEventListener("click", () => {
  if (!isUnlocked) {
    const code = prompt("أدخل رمز الدخول للوحة الإدارة:");
    if (code !== ADMIN_PASSCODE) {
      if (code !== null) alert("رمز الدخول غير صحيح.");
      return;
    }
    isUnlocked = true;
    renderFeed();
  }
  adminPanel.classList.toggle("hidden");
});

lockAdminBtn.addEventListener("click", () => {
  isUnlocked = false;
  resetNewsForm();
  adminPanel.classList.add("hidden");
  renderFeed();
});

refreshAutoBtn.addEventListener("click", () => {
  runAutomaticFeeds(true);
});

cancelEditBtn.addEventListener("click", resetNewsForm);

categoryNav.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-cat]");
  if (!btn) return;
  currentCategory = btn.dataset.cat;
  categoryNav.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderFeed();
});

searchInput.addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderFeed();
});

newsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!isUnlocked) return;

  const title = newsTitleInput.value.trim();
  const source = newsSourceInput.value.trim() || "كيان نيوز";
  const image = newsImageInput.value.trim();
  const category = newsCategorySelect.value;
  const breaking = isBreakingCheckbox.checked;
  const body = newsBodyInput.value.trim();

  if (!title || !body) return;

  if (editingId) {
    newsList = newsList.map((item) => {
      if (String(item.id) !== String(editingId)) return item;
      const updated = {
        ...item,
        title,
        source,
        image: isSafeUrl(image) ? image : "",
        category,
        breaking,
        body
      };
      saveItemToCloud(updated);
      return updated;
    });
    saveLocalNews(newsList);
    renderTicker();
    renderFeed();
    resetNewsForm();
    return;
  }

  const now = Date.now();
  const newItem = {
    id: `manual_${now}`,
    timestamp: now,
    title,
    source,
    image: isSafeUrl(image) ? image : "",
    category,
    breaking,
    link: "",
    body,
    createdAt: new Date(now).toLocaleString("ar-EG")
  };

  newsList = [newItem, ...newsList];
  saveLocalNews(newsList);
  renderTicker();
  renderFeed();
  await saveItemToCloud(newItem);
  resetNewsForm();
});

rssForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!isUnlocked) return;

  const feedUrl = rssUrlInput.value.trim();
  const sourceName = rssSourceNameInput.value.trim();
  const category = rssCategorySelect.value;

  if (!isSafeUrl(feedUrl)) {
    rssStatus.textContent = "يرجى إدخال رابط RSS صحيح يبدأ بـ http أو https.";
    return;
  }

  rssStatus.textContent = "جاري سحب الأخبار...";
  try {
    const items = await fetchSingleFeed({
      name: sourceName,
      url: feedUrl,
      category,
      hint: category === "تلقائي" ? "دولية" : category
    });

    if (!items.length) {
      rssStatus.textContent = "لم يتم العثور على عناصر في هذا الرابط.";
      return;
    }

    newsList = [...items, ...newsList];
    newsList.sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0));
    saveLocalNews(newsList);
    renderTicker();
    renderFeed();
    for (const item of items) {
      await saveItemToCloud(item);
    }
    rssStatus.textContent = `تمت إضافة ${items.length} أخبار بنجاح.`;
    rssForm.reset();
  } catch {
    rssStatus.textContent = "تعذر جلب الرابط حالياً؛ تأكد من صحة رابط RSS أو الاتصال.";
  }
});

newsFeed.addEventListener("click", async (e) => {
  const editBtn = e.target.closest("button[data-edit]");
  if (editBtn && isUnlocked) {
    e.stopPropagation();
    startEditingNews(editBtn.dataset.edit);
    return;
  }

  const delBtn = e.target.closest("button[data-del]");
  if (delBtn && isUnlocked) {
    e.stopPropagation();
    const id = delBtn.dataset.del;
    newsList = newsList.filter((item) => String(item.id) !== String(id));
    saveLocalNews(newsList);
    renderTicker();
    renderFeed();
    await deleteItemFromCloud(id);
    return;
  }

  const card = e.target.closest("article[data-open]");
  if (card) {
    openArticleModal(card.dataset.open);
  }
});

closeModalBtn.addEventListener("click", closeArticleModal);
articleModal.addEventListener("click", (e) => {
  if (e.target === articleModal) closeArticleModal();
});

renderTicker();
renderFeed();
syncFromCloud();
runAutomaticFeeds(false);
