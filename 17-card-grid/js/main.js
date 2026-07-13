const cards = document.querySelectorAll(".js-card");
// カードが画面に入ったらis-showをつけて表示する監視
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return; // 画面に入ってなければ無視

      setTimeout(() => {
        entry.target.classList.add("is-show");
        // 150msずつ遅らせて１枚ずつ出す
      }, i * 150);
      observer.unobserve(entry.target); // 一度出したら監視解除
    });
  },
  { threshold: 0.3 }, // カードが３０％見えたら発火
);
// 全カードを監視対象に
cards.forEach((card) => observer.observe(card));
