const hamburger = document.querySelector(".js-hamburger");
const drawer = document.querySelector(".js-drawer");
// 両方揃ってる時だけ動かす
if (hamburger && drawer) {
  const openDrawer = () => {
    drawer.classList.add("is-open");
    hamburger.classList.add("is-open");
    hamburger.setAttribute("aria-expanded", "true"); // ドロワーが開いたら、fals（閉じてる）　→ true（開いてる）へ書き換え
    hamburger.setAttribute("aria-label", "メニューを閉じる"); // SRのラベルも「閉じる」に書き換え
  };

  const closeDrawer = () => {
    drawer.classList.remove("is-open");
    hamburger.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "メニューを開く");
  };
  // ハンバーガーボタンクリックで、開閉を切り替える
  hamburger.addEventListener("click", () => {
    // hamburgerをクリックしたときに、
    if (drawer.classList.contains("is-open")) {
      // drawerに”is-open”が含まれていたら
      closeDrawer(); // closeDrawerの処理（ドロワーを閉じる）
    } else {
      // それ以外なら
      openDrawer(); // openDrawerの処理（開く）
    }
  });
  // 背景オーバーレイをクリックしたら閉じる
  drawer.addEventListener("click", (e) => {
    // drawer がクリックされたら、中の処理を実行（そのクリック情報を e で受け取る）
    if (e.target === drawer) {
      // もし、クリックされた要素(e.target) が drawer そのものなら
      closeDrawer(); // ドロワーを閉じる
    }
  });
  // メニュー内のリンクをクリックしたら閉じる
  const links = drawer.querySelectorAll(".p-drawer__link");
  links.forEach((link) => {
    link.addEventListener("click", () => closeDrawer());
  });
  // ESCキーで閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDrawer();
    }
  });
}
