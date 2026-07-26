(() => {
  const dropdownItems = document.querySelectorAll(".js-dropdown");

  // 全てのliからis-openを外して、開いてるものを全て閉じる
  const closeAll = () => {
    dropdownItems.forEach((item) => {
      item.classList.remove("is-open");
      const toggle = item.querySelector(".js-dropdown-toggle");
      if (toggle) {
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  };

  dropdownItems.forEach((item) => {
    const toggle = item.querySelector(".js-dropdown-toggle");

    // toggleがなかったら、return
    if (!toggle) return;

    toggle.addEventListener("click", () => {
      // is-Open = クリックされた時点で、このliにis-openがついているかどうか
      const isOpen = item.classList.contains("is-open");

      closeAll(); // is-open外す（先にずべて外しておく）
      if (!isOpen) {
        item.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  });
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".js-dropdown")) {
      closeAll();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAll();
    }
  });
})();
