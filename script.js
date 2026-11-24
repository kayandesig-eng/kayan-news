const DB_URL = "https://kayan-news-575ab-default-rtdb.firebaseio.com/news.json";
const STORAGE_KEY = "kayan_news_items_v2";
const ADMIN_PASSCODE = "kayan2026";

const defaultNews = [
  {
    id: "1",
    title: "إطلاق النسخة الجديدة من منصة كيان نيوز الإخبارية",
    category: "محلية",
    breaking: true,
    image: "",
    body: "متابعة مستمرة لأبرز الأحداث المحلية والعربية والدولية على مدار الساعة.",
    createdAt: new Date().toLocaleString("ar-EG")
  }
];

let currentCategory = "الكل";
let newsList = loadLocalNews();
let isUnlocked = false;

const toggleAdminBtn = document.getElementById("toggleAdminBtn");
const lockAdminBtn = document.getElementById("lockAdminBtn");
const adminPanel = document.getElementById("adminPanel");
const newsForm = document.getElementById("newsForm");
const rssForm = document.getElementById("rssForm");
const rssStatus = document.getElementById("rssStatus");
const newsFeed = document.getElementById("newsFeed");
const categoryNav = document.getElementById("categoryNav");
const breakingTicker = document.getElementById("breakingTicker");

function loadLocalNews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultNews];
  } catch {
    return [...defaultNews];
  }
}

function saveLocalNews(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
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
      cloudList.sort((a, b) => Number(b.timestamp || 0) - Number(a.timestamp || 0));
      newsList = cloudList;
      saveLocalNews(newsList);
      renderTicker();
      renderFeed();
    }
  } catch {}
}

async function saveItemToCloud(item) {
  try {
    await fetch(`https://kayan-news-575ab-default-rtdb.firebaseio.com/news/${item.id}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });
  } catch {}
}

async function deleteItemFromCloud(id) {
  try {
    await fetch(`https://kayan-news-575ab-default-rtdb.firebaseio.com/news/${id}.json`, {
      method: "DELETE"
    });
  } catch {}
}

function renderTicker() {
  const breakingItems = newsList.filter((item) => item.breaking);
  breakingTicker.textContent = breakingItems.length
    ? breakingItems.map((b) => `• ${b.title}`).join("     ")
    : "مرحباً بكم في منصة كيان نيوز الإخبارية — متابعة مستمرة على مدار الساعة";
}

function renderFeed() {
  const filtered = currentCategory === "الكل"
    ? newsList
    : newsList.filter((item) => item.category === currentCategory);

  if (!filtered.length) {
    newsFeed.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#64748b;padding:24px;">لا توجد أخبار في قسم "${escapeHtml(currentCategory)}" حالياً.</p>`;
    return;
  }

  newsFeed.innerHTML = filtered.map((item) => {
    const safeImg = isSafeUrl(item.image)
      ? `<img class="news-thumb" src="${escapeAttr(item.image)}" alt="${escapeAttr(item.title)}" loading="lazy" />`
      : "";
    const delBtn = isUnlocked
      ? `<button class="btn-delete" data-del="${escapeAttr(String(item.id))}" type="button">حذف</button>`
      : "";

    return `
      <article class="news-card">
        ${safeImg}
        <div class="news-body-wrap">
          <div class="news-meta">
            <span class="news-cat">${escapeHtml(item.category || "عام")}</span>
            <span>${escapeHtml(item.createdAt || "")}</span>
          </div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.body)}</p>
          ${delBtn}
        </div>
      </article>
    `;
  }).join("");
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
  adminPanel.classList.remove("hidden");
});

lockAdminBtn.addEventListener("click", () => {
  isUnlocked = false;
  adminPanel.classList.add("hidden");
  renderFeed();
});

categoryNav.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-cat]");
  if (!btn) return;
  currentCategory = btn.dataset.cat;
  categoryNav.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderFeed();
});

newsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!isUnlocked) return;

  const title = document.getElementById("newsTitle").value.trim();
  const image = document.getElementById("newsImage").value.trim();
  const category = document.getElementById("newsCategory").value;
  const breaking = document.getElementById("isBreaking").checked;
  const body = document.getElementById("newsBody").value.trim();

  if (!title || !body) return;

  const now = Date.now();
  const newItem = {
    id: String(now),
    timestamp: now,
    title,
    image: isSafeUrl(image) ? image : "",
    category,
    breaking,
    body,
    createdAt: new Date(now).toLocaleString("ar-EG")
  };

  newsList = [newItem, ...newsList];
  saveLocalNews(newsList);
  renderTicker();
  renderFeed();
  await saveItemToCloud(newItem);

  newsForm.reset();
});

rssForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!isUnlocked) return;

  const feedUrl = document.getElementById("rssUrl").value.trim();
  const category = document.getElementById("rssCategory").value;
  if (!isSafeUrl(feedUrl)) {
    rssStatus.textContent = "يرجى إدخال رابط RSS صحيح يبدأ بـ http أو https.";
    return;
  }

  rssStatus.textContent = "جاري سحب الأخبار...";
  try {
    const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
    const res = await fetch(api);
    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items.slice(0, 6) : [];

    if (!items.length) {
      rssStatus.textContent = "لم يتم العثور على عناصر في هذا الرابط.";
      return;
    }

    const added = [];
    items.forEach((entry, idx) => {
      const title = cleanHtmlText(entry.title);
      const body = cleanHtmlText(entry.description || entry.content || entry.link || "");
      const thumb = isSafeUrl(entry.thumbnail) ? entry.thumbnail : (isSafeUrl(entry.enclosure?.link) ? entry.enclosure.link : "");
      if (!title) return;

      const ts = Date.now() - idx * 1000;
      added.push({
        id: `rss_${ts}_${idx}`,
        timestamp: ts,
        title,
        image: thumb,
        category,
        breaking: false,
        body: body || "تفاصيل الخبر متاحة عبر المصدر.",
        createdAt: new Date(ts).toLocaleString("ar-EG")
      });
    });

    newsList = [...added, ...newsList];
    saveLocalNews(newsList);
    renderFeed();
    for (const item of added) {
      await saveItemToCloud(item);
    }
    rssStatus.textContent = `تمت إضافة ${added.length} أخبار بنجاح.`;
    rssForm.reset();
  } catch {
    rssStatus.textContent = "تعذر جلب الرابط حالياً؛ تأكد من صحة رابط RSS أو الاتصال.";
  }
});

newsFeed.addEventListener("click", async (e) => {
  const btn = e.target.closest("button[data-del]");
  if (!btn || !isUnlocked) return;
  const id = btn.dataset.del;
  newsList = newsList.filter((item) => String(item.id) !== String(id));
  saveLocalNews(newsList);
  renderTicker();
  renderFeed();
  await deleteItemFromCloud(id);
});

renderTicker();
renderFeed();
syncFromCloud();
