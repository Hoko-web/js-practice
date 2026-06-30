const tabs = document.querySelectorAll(".js-tab");
const panels = document.querySelectorAll(".js-panel");

tabs.forEach((tab, i) => {
  // このタブがクリックされたら、中を実行
  tab.addEventListener("click", () => {
    // 全てのタブからis-activeを外す
    tabs.forEach((t) => t.classList.remove("is-active"));
    // 全てのパネルからis-activeを外す
    panels.forEach((p) => p.classList.remove("is-active"));
    // クリックされたタブにis-activeをつける
    tab.classList.add("is-active");
    // 同じ番号の i のパネルにもつける
    panels[i].classList.add("is-active");
  });
});
