const STORAGE_KEY = "kayan_news_items_v1";
const defaultNews = [
  {
    id: "1",
    title: "إطلاق النسخة الجديدة من منصة كيان نيوز الإخبارية",
    category: "محلية",
    breaking: true,
    body: "متابعة مستمرة لأبرز الأحداث المحلية والعربية والدولية على مدار الساعة.",
    createdAt: new Date().toLocaleString("ar-EG")
  }
];

let currentCategory = "الكل";
let newsList = loadNews();

const toggleAdminBtn = document.getElementById("toggleAdminBtn");
const adminPanel = document.getElementById("adminPanel");
const newsForm = document.getElementById("newsForm");
const newsFeed = document.getElementById("newsFeed");
const categoryNav = document.getElementById("categoryNav");
const breakingTicker = document.getElementById("breakingTicker");

function loadNews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) && parsed.length ? parsed : [...defaultNews];
  } catch {
    return [...defaultNews];
  }
}

function saveNews(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function renderTicker() {
  const breakingItems = newsList.filter((item) => item.breaking);
  breakingTicker.textContent = breakingItems.length
    ? breakingItems.map((b) => `• ${b.title}`).join("   ")
    : "مرحباً بكم في منصة كيان نيوز الإخبارية";
}

function renderFeed() {
  const filtered = currentCategory === "الكل"
    ? newsList
    : newsList.filter((item) => item.category === currentCategory);

  if (!filtered.length) {
    newsFeed.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:#64748b;">لا توجد أخبار في قسم "${currentCategory}" حالياً.</p>`;
    return;
  }

  newsFeed.innerHTML = filtered.map((item) => `
    <article class="news-card">
      <div class="news-meta">
        <span class="news-cat">${escapeHtml(item.category)}</span>
        <span>${escapeHtml(item.createdAt)}</span>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.body)}</p>
    </article>
  `).join("");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

toggleAdminBtn.addEventListener("click", () => {
  adminPanel.classList.toggle("hidden");
});

categoryNav.addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-cat]");
  if (!btn) return;
  currentCategory = btn.dataset.cat;
  categoryNav.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderFeed();
});

newsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("newsTitle").value.trim();
  const category = document.getElementById("newsCategory").value;
  const breaking = document.getElementById("isBreaking").checked;
  const body = document.getElementById("newsBody").value.trim();

  if (!title || !body) return;

  const newItem = {
    id: String(Date.now()),
    title,
    category,
    breaking,
    body,
    createdAt: new Date().toLocaleString("ar-EG")
  };

  newsList = [newItem, ...newsList];
  saveNews(newsList);
  renderTicker();
  renderFeed();

  newsForm.reset();
  adminPanel.classList.add("hidden");
});

renderTicker();
renderFeed();
