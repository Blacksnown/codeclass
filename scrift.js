// // Lưu trữ lượt truy cập (giả lập bằng localStorage)
// let count = parseInt(localStorage.getItem("visitCount") || "0", 10);
// count++;
// localStorage.setItem("visitCount", count);
// const counterEl = document.getElementById("counter");
// if (counterEl) {
//   counterEl.textContent = count;
// }

// // Xử lý form thành viên
// const memberForm = document.getElementById("member-form");
// if (memberForm) {
//   memberForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const name = document.getElementById("name").value.trim();
//     const dob = document.getElementById("dob").value;

//     const infoBox = document.getElementById("member-info");
//     if (name && dob) {
//       const dobDate = new Date(dob);
//       const formattedDob = dobDate.toLocaleDateString("vi-VN");
//       infoBox.innerHTML = `
//         <h3>Thông tin thành viên</h3>
//         <p><strong>Họ và tên:</strong> ${name}</p>
//         <p><strong>Ngày sinh:</strong> ${formattedDob}</p>
//         <p>Chào mừng bạn đến với các tinh tú 12A4</p>
//       `;
//     } else {
//       infoBox.innerHTML = `<p style="color:red;">Vui lòng nhập đúng Tên và Ngày sinh của mình.</p>`;
//     }
//   });
// }

// // Chuyển trang (show/hide)
// function showPage(pageId) {
//   // Ẩn tất cả các trang
//   const pages = document.querySelectorAll(".page");
//   pages.forEach((page) => (page.style.display = "none"));

//   // Hiện trang được chọn
//   document.getElementById(pageId).style.display = "block";
// }

// document.addEventListener("DOMContentLoaded", () => {
//   showPage("overview");
// });

// Chuyển trang (ẩn/hiện)
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
