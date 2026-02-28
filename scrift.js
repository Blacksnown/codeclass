// ...existing code...
function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => (page.style.display = "none"));

  const target = document.getElementById(pageId);
  if (target) {
    target.style.display = "block";
  }
}

// Visitor counter + other initializations
function updateVisitorCount() {
  const counterEl = document.getElementById("counter");
  if (!counterEl) return;

  const namespace = "a4-k58-mda";
  const key = "visits";

  fetch(`https://api.countapi.xyz/hit/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`)
    .then((res) => res.json())
    .then((data) => {
      if (data && data.value !== undefined) {
        counterEl.textContent = data.value;
      }
    })
    .catch(() => {
      try {
        const k = "a4_local_visits";
        const v = Number(localStorage.getItem(k) || 0) + 1;
        localStorage.setItem(k, v);
        counterEl.textContent = v;
      } catch (e) {
        counterEl.textContent = "0";
      }
    });
}

/* ---------- Homepage showcase ---------- */
const showcaseProfiles = [
  { name: "Nguyễn A", title: "Học sinh xuất sắc", img: "picture/p1.jpg", note: "HSG Toán toàn quốc" },
  { name: "Trần B", title: "Tài năng nghệ thuật", img: "picture/p2.jpg", note: "Giải nhì văn nghệ" },
  { name: "Lê C", title: "Thủ khoa lớp", img: "picture/p3.jpg", note: "Điểm TB cao nhất" }
];

function renderHomepageShowcase() {
  const el = document.getElementById("home-showcase");
  if (!el) return;
  el.innerHTML = "";
  showcaseProfiles.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "profile-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}" />
      <h4>${p.name}</h4>
      <p class="small">${p.title}</p>
      <p class="caption">${p.note}</p>
    `;
    el.appendChild(card);
  });
}

/* ---------- Book of profiles (5 authors + 51 students) ---------- */
const authors = [
  { name: "Thầy A", role: "Giáo viên chủ nhiệm", img: "picture/teacher1.jpg", bio: "Giáo viên Toán" },
  { name: "Cô B", role: "Giáo viên Văn", img: "picture/teacher2.jpg", bio: "Giáo viên Văn" },
  { name: "Thầy C", role: "Giáo viên Anh", img: "picture/teacher3.jpg", bio: "Giáo viên Anh" },
  { name: "Cô D", role: "Giáo viên Lý", img: "picture/teacher4.jpg", bio: "Giáo viên Lý" },
  { name: "Thầy E", role: "Giáo viên Hóa", img: "picture/teacher5.jpg", bio: "Giáo viên Hóa" }
];

const students = Array.from({ length: 51 }).map((_, i) => {
  const no = i + 1;
  return {
    id: no,
    name: `Học sinh ${no}`,
    class: "12A4",
    note: `Mô tả ngắn cho HS ${no}`,
    img: `picture/stu${(no % 10) + 1}.jpg`
  };
});

// mỗi "trang" hiển thị 1 profile (mô phỏng cuốn sách)
const BOOK_PAGES = authors.length + students.length;
let currentBookPage = 1;

function renderBookPage(page) {
  const container = document.getElementById("book-container");
  const pageNumEl = document.getElementById("book-page-num");
  const totalEl = document.getElementById("book-page-total");
  if (!container || !pageNumEl || !totalEl) return;

  totalEl.textContent = BOOK_PAGES;
  pageNumEl.textContent = page;

  container.innerHTML = "";
  let data;
  if (page <= authors.length) {
    data = authors[page - 1];
    container.innerHTML = `
      <div class="book-page-card author">
        <img src="${data.img}" alt="${data.name}" />
        <h3>${data.name}</h3>
        <p class="small">${data.role}</p>
        <p>${data.bio}</p>
      </div>
    `;
  } else {
    const idx = page - authors.length - 1;
    data = students[idx];
    container.innerHTML = `
      <div class="book-page-card student">
        <img src="${data.img}" alt="${data.name}" />
        <h3>${data.name}</h3>
        <p class="small">${data.class} • #${data.id}</p>
        <p>${data.note}</p>
      </div>
    `;
  }
}

function setupBookControls() {
  document.getElementById("book-prev").addEventListener("click", () => {
    if (currentBookPage > 1) currentBookPage--;
    renderBookPage(currentBookPage);
  });
  document.getElementById("book-next").addEventListener("click", () => {
    if (currentBookPage < BOOK_PAGES) currentBookPage++;
    renderBookPage(currentBookPage);
  });
  document.getElementById("jump-go").addEventListener("click", () => {
    const v = Number(document.getElementById("jump-to").value);
    if (v >= 1 && v <= BOOK_PAGES) {
      currentBookPage = v;
      renderBookPage(currentBookPage);
    }
  });
}

/* ---------- Achievements: tabs + timeline + countdown ---------- */
const timelineEvents = [
  { date: "2023-05-12", title: "Kỷ niệm 1", desc: "Sự kiện lớn 1" },
  { date: "2024-01-20", title: "Tham dự giao lưu", desc: "Giao lưu văn nghệ" },
  { date: "2024-11-10", title: "Hội thao", desc: "Cờ vua, kéo co" }
];

function renderTimeline() {
  const el = document.getElementById("timeline");
  if (!el) return;
  el.innerHTML = "<h4>Dòng thời gian</h4>";
  timelineEvents.forEach((t) => {
    const item = document.createElement("div");
    item.className = "timeline-item";
    item.innerHTML = `<strong>${t.date}</strong> — <em>${t.title}</em><p>${t.desc}</p>`;
    el.appendChild(item);
  });
}

function setupAchievementsTabs() {
  document.querySelectorAll(".subtab").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".subtab").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const tab = btn.dataset.tab;
      const content = document.getElementById("tab-content");
      if (!content) return;
      if (tab === "grade10") {
        content.innerHTML = "<h3>Lớp 10</h3><p>Ảnh, sự kiện lớp 10</p>";
      } else if (tab === "grade11") {
        content.innerHTML = "<h3>Lớp 11</h3><p>Ảnh, sự kiện lớp 11</p>";
      } else {
        content.innerHTML = "<h3>Lớp 12</h3><p>Ảnh, sự kiện lớp 12</p>";
      }
    });
  });
  // kích hoạt tab đầu
  const first = document.querySelector(".subtab");
  if (first) first.click();
}

const examDates = [
  { name: "HSA đợt 1", day: 7, month: 3 },
  { name: "HSA đợt 2", day: 21, month: 3 },
  { name: "THPT", day: 1, month: 6 }
];

function getNextExam() {
  const now = new Date();
  const year = now.getFullYear();
  for (const e of examDates) {
    const dt = new Date(year, e.month - 1, e.day, 9, 0, 0);
    if (dt > now) return { dt, name: e.name };
  }
  // nếu đã qua tất cả, trả về kỳ đầu năm sau
  const e = examDates[0];
  return { dt: new Date(year + 1, e.month - 1, e.day, 9, 0, 0), name: e.name };
}

function startExamCountdown() {
  const el = document.getElementById("exam-countdown");
  if (!el) return;
  function tick() {
    const next = getNextExam();
    const diff = next.dt - new Date();
    if (diff <= 0) {
      el.textContent = `${next.name} — Đang diễn ra`;
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    el.textContent = `${next.name} — ${days}d ${hours}h ${mins}m ${secs}s`;
  }
  tick();
  setInterval(tick, 1000);
}

/* ---------- Study & modern achievements ---------- */
function renderModernAchievements() {
  const el = document.getElementById("modern-achievements");
  if (!el) return;
  const items = [
    { title: "Top HSG Toán", desc: "Học sinh đạt giải", img: "picture/award1.jpg" },
    { title: "Văn nghệ xuất sắc", desc: "Sân khấu ấn tượng", img: "picture/award2.jpg" },
    { title: "Tỉ lệ đỗ 100%", desc: "Kết quả tốt", img: "picture/award3.jpg" }
  ];
  el.innerHTML = items.map(it => `
    <div class="achievement-card">
      <img src="${it.img}" alt="${it.title}" />
      <h4>${it.title}</h4>
      <p class="caption">${it.desc}</p>
    </div>
  `).join("");
}

/* ---------- Games & Horoscope ---------- */
function setupHoroscope() {
  const form = document.getElementById("horoscope-form");
  const out = document.getElementById("horoscope-result");
  if (!form || !out) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const bd = document.getElementById("birthdate").value;
    if (!bd) return;
    const d = new Date(bd);
    const msgs = [
      "Hôm nay thuận lợi cho học hành.",
      "Cần cẩn trọng trong giao tiếp.",
      "Ngày thích hợp để khởi động dự án mới.",
      "Chú ý sức khỏe, nghỉ ngơi đầy đủ."
    ];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    out.innerHTML = `<p>Chúc mừng! Dựa trên ngày sinh ${bd}: ${msg}</p>`;
  });
}

/* ---------- Init on DOM ready ---------- */
document.addEventListener("DOMContentLoaded", () => {
  showPage("overview");
  updateVisitorCount();
  renderHomepageShowcase();
  renderBookPage(currentBookPage);
  setupBookControls();
  renderTimeline();
  setupAchievementsTabs();
  startExamCountdown();
  renderModernAchievements();
  setupHoroscope();
});
// ...existing code...