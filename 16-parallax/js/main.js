// パララックス：スクロールに合わせて、各要素を別々の速さで縦に動かす

const items = document.querySelectorAll(".js-parallax");
// スクロースするたびに実行
window.addEventListener("scroll", () => {
  // ページを上から何PXスクロールしたか
  const scrollY = window.scrollY;
  // 各要素を１つずつ処理
  items.forEach((item) => {
    // その要素の動く速さ　（HTMLのdata-speedの値）
    const speed = Number(item.dataset.speed);
    // その要素を「スクロール量　＊　速さ」 だけ縦にずらす
    item.style.transform = `translateY(${scrollY * speed}px)`;
  });
});
