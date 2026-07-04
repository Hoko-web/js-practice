const tabs = document.querySelectorAll(".js-tab");
const panels = document.querySelectorAll(".js-panel");

// activeTab ＝「指定した1つのタブだけをアクティブにする」関数。
// クリックでも矢印キーでも、切り替えは必ずこの関数を通す（同じ処理を1か所にまとめるため）
const activeTab = (tab) => {
  tabs.forEach((t) => {
    // まず全タブを「非アクティブ」に戻す
    t.classList.remove("is-active");
    t.setAttribute("aria-selected", "false");
    t.tabIndex = -1;
  });
  // パネルも全部いったん非表示に戻す
  panels.forEach((p) => p.classList.remove("is-active"));

  // 指定されたタブだけを「アクティブ」にする
  tab.classList.add("is-active");
  tab.setAttribute("aria-selected", "true");
  tab.tabIndex = 0;

  // そのタブに対応するパネルを表示する
  const targetId = tab.getAttribute("aria-controls");
  document.getElementById(targetId).classList.add("is-active");

  tab.focus(); // 矢印キーで動いたとき、見た目の選択とフォーカス位置をそろえる
};

// クリックされたら、そのタブをアクティブにする
tabs.forEach((tab) => {
  tab.addEventListener("click", () => activeTab(tab));
});
// 矢印キーで隣のタブに移動する（i ＝ そのタブが何番目か）
tabs.forEach((tab, i) => {
  tab.addEventListener("keydown", (e) => {
    let nextIndex;
    if (e.key === "ArrowRight") {
      nextIndex = (i + 1) % tabs.length; // 右へ一つ移動、右端まで来たら先頭に戻る
    } else if (e.key === "ArrowLeft") {
      nextIndex = (i - 1 + tabs.length) % tabs.length; // 左へ一つ移動、左端で押したら、末尾へ回る
    } else {
      return; // 矢印以外のキーは何もしない
    }
    activeTab(tabs[nextIndex]); // 移動先のタブをアクティブに
  });
});
