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
