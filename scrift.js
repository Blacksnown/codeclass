function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => (page.style.display = "none"));

  const target = document.getElementById(pageId);
  if (target) {
    target.style.display = "block";
  }
}

// Hiển thị mặc định trang chủ
document.addEventListener("DOMContentLoaded", () => {
  showPage("overview");
});

// Xử lý form thành viên
const memberForm = document.getElementById("member-form");
const memberBox = document.getElementById("member-info");

if (memberForm) {
  memberForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const joinDate = document.getElementById("join-date").value.trim();

    if (name && dob && joinDate) {
      const dobDate = new Date(dob);
      const joinDateDate = new Date(joinDate);
      memberBox.innerHTML = `
        <p>Họ tên: ${name}</p>
        <p>Ngày sinh: ${dobDate.toLocaleDateString("vi-VN")}</p>
        <p>Ngày vào Đảng: ${joinDateDate.toLocaleDateString("vi-VN")}</p>
      `;
    } else {
      memberBox.innerHTML =
        "<p style='color:red;'>Vui lòng nhập đầy đủ thông tin.</p>";
    }
  });
}
function updateVisitorCount() {
  const counterEl = document.getElementById("counter");
  if (!counterEl) return;

  const namespace = "a4-k58-mda"; // đổi nếu muốn
  const key = "visits";

  // CountAPI: mỗi lần gọi sẽ tăng 1
  fetch(
    `https://api.countapi.xyz/hit/${encodeURIComponent(
      namespace
    )}/${encodeURIComponent(key)}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data && data.value !== undefined) {
        counterEl.textContent = data.value;
      }
    })
    .catch(() => {
      // fallback: localStorage (đếm theo trình duyệt)
      try {
        const k = "a4_local_visits";
        const v = Number(localStorage.getItem(k) || 0) + 1;
        localStorage.setItem(k, v);
        counterEl.textContent = v;
      } catch (e) {
        // nếu localStorage không dùng được thì hiển thị 0
        counterEl.textContent = "0";
      }
    });
}

// Gọi khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", () => {
  showPage("overview");
  updateVisitorCount();
});

// ...existing code...
