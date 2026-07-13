(() => {
  const loadMoreButton = document.querySelector(".js-load-more");
  const newsList = document.querySelector(".js-news-list");
  // ボタンか、ニュースリストがなければ、リターンする
  if (!loadMoreButton || !newsList) return;
  // 最初に見せておく件数
  const VISIBLE = 4;
  // newsItems ＝ お知らせ項目（<li>）の全部を取得
  const newsItems = newsList.querySelectorAll(".p-news__item");
  // 全件見えている状態か　（true = 全部表示中　/ false = 閉じている）
  let isOpen = false;

  loadMoreButton.addEventListener("click", () => {
    // クリックされるたびにisOpenを反転　（false → true → false...）
    isOpen = !isOpen;
    // VISIBLE件目より後ろの項目だけ、開いてるなら表示・閉じてるなら隠す
    newsItems.forEach((item, index) => {
      if (index >= VISIBLE) {
        // toggle の第2引数で「付ける/外す」を指定：
        // isOpen=true のとき !isOpen=false → is-collapsed を外す（表示）
        // isOpen=false のとき !isOpen=true → is-collapsed を付ける（隠す）
        item.classList.toggle("is-collapsed", !isOpen);
      }
    });
    // ボタンの文字を状態に合わせて切り替え（開　Close / 閉More）
    loadMoreButton.textContent = isOpen ? "Close" : "More";
  });
})();
