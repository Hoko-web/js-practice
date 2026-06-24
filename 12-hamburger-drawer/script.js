// ハンバーガーメニュー　ドロワー

const hamburger = document.querySelector(".js-hamburger");
const drawer = document.querySelector(".js-drawer");

function openDrawer() {
  drawer.classList.add("is-open");
  hamburger.classList.add("is-open");
  document.body.classList.add("is-locked");
  hamburger.setAttribute("aria-expanded", "true"); // 「開いている」と伝える
  hamburger.setAttribute("aria-label", "メニューを閉じる"); // 次の操作を伝える
}

function closeDrawer() {
  drawer.classList.remove("is-open");
  hamburger.classList.remove("is-open");
  document.body.classList.remove("is-locked");
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.setAttribute("aria-label", "メニューを開く");
}

hamburger.addEventListener("click", () => {
  if (drawer.classList.contains("is-open")) {
    closeDrawer();
  } else {
    openDrawer();
  }
});
// 暗幕クリックでドロワーを閉じる
drawer.addEventListener("click", (e) => {
  if (e.target === drawer) {
    closeDrawer();
  }
});
// リンククリックで閉じる
const drawerLinks = drawer.querySelectorAll("a");
drawerLinks.forEach((link) => {
  link.addEventListener("click", closeDrawer);
});
// ESCキーで閉じる
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDrawer();
  }
});
