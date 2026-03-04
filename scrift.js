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

  fetch(
    `https://api.countapi.xyz/hit/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`,
  )
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
  {
    name: "Nguyễn Anh Duy",
    title: "HSG Toán",
    img: "picture/p1.jpg",
    note: "Nhất Thành phố",
  },
  {
    name: "...",
    title: ".....",
    img: "picture/p2.jpg",
    note: "...",
  },
  {
    name: "...",
    title: "....",
    img: "picture/p3.jpg",
    note: "....",
  },
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
  {
    name: "Cô Phùng Thị Hường",
    role: "Giáo viên chủ nhiệm",
    img: "picture/teacher1.jpg",
    bio: "Giáo viên Vật lý",
  },
  {
    name: "Cô ..",
    role: "Giáo viên Văn",
    img: "picture/teacher2.jpg",
    bio: "Giáo viên Văn",
  },
  {
    name: "Cô ",
    role: "Giáo viên Anh",
    img: "picture/teacher3.jpg",
    bio: "Giáo viên Anh",
  },
  {
    name: "Cô ...",
    role: "Giáo viên Lý",
    img: "picture/teacher4.jpg",
    bio: "Giáo viên Lý",
  },
  {
    name: "Thầy E",
    role: "Giáo viên Hóa",
    img: "picture/teacher5.jpg",
    bio: "Giáo viên Hóa",
  },
];

const students = Array.from({ length: 51 }).map((_, i) => {
  const no = i + 1;
  return {
    id: no,
    name: `Học sinh ${no}`,
    class: "12A4",
    note: `Mô tả ngắn cho HS ${no}`,
    img: `picture/stu${(no % 10) + 1}.jpg`,
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
  { date: "2023-01-9", title: "Kỷ niệm 1", desc: "....." },
  { date: "2024-26-03", title: "Tham dự giao lưu", desc: "Giao lưu văn nghệ" },
  { date: "2025-26-03", title: "Hội thao", desc: "Kéo co" },
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
      document
        .querySelectorAll(".subtab")
        .forEach((b) => b.classList.remove("active"));
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
  { name: "THPT", day: 1, month: 6 },
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
    {
      title: "HSG Toán",
      desc: "Giải nhất",
      img: "picture/award1.jpg",
    },
    {
      title: "Văn nghệ",
      desc: "Giải đặc biệt",
      img: "picture/award2.jpg",
    },
    { title: "Tỉ lệ đỗ 100%", desc: "Khiêm tốn ", img: "picture/award3.jpg" },
  ];
  el.innerHTML = items
    .map(
      (it) => `
    <div class="achievement-card">
      <img src="${it.img}" alt="${it.title}" />
      <h4>${it.title}</h4>
      <p class="caption">${it.desc}</p>
    </div>
  `,
    )
    .join("");
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
      "Chú ý sức khỏe, nghỉ ngơi đầy đủ.",
      "Có thể gặp gỡ người bạn cũ.",
      "Nên dành thời gian cho gia đình.",
      "Công việc sẽ có bước tiến mới.",
      "Hãy tin vào trực giác của mình.",
      "Một cơ hội bất ngờ sẽ đến.",
      "Nên tránh những quyết định lớn hôm nay.",
      "Hãy dành thời gian cho sở thích cá nhân.",
      "Có thể có tin vui từ người thân.",
      "Ngày thích hợp để giải quyết mâu thuẫn.",
      "Hãy mở lòng với những ý tưởng mới.",
      "Cần chú ý đến chi tiêu tài chính.",
      "Một ngày bình yên và thư giãn.",
      "Có thể nhận được lời mời tham gia sự kiện.",
      "Hãy dành thời gian cho bản thân.",
      "Một ngày tốt để học hỏi điều mới.",
      "Có thể gặp khó khăn nhỏ trong công việc.",
      "Hãy tin tưởng vào khả năng của mình.",
      "Một ngày đầy cảm hứng sáng tạo.",
      "Nên dành thời gian cho bạn bè.",
      "Có thể có cơ hội du lịch hoặc khám phá.",
      "Hãy chú ý đến sức khỏe tinh thần.",
      "Một ngày tốt để bắt đầu thói quen mới.",
      "Có thể có tin vui trong tình cảm.",
      "Hãy dành thời gian cho những người thân yêu.",
      "Một ngày tốt để giải quyết công việc tồn đọng.",
      "Có thể có cơ hội học hỏi từ người khác.",
      "Hãy tin tưởng vào bản thân và đi theo con đường của mình.",
      "Một ngày tốt để thể hiện bản thân.",
      "Có thể có cơ hội hợp tác mới.",
      "Hãy chú ý đến cảm xúc của mình.",
      "Một ngày tốt để kết nối với người khác.",
      "Có thể có cơ hội thăng tiến trong công việc.",
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
