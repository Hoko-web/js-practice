const fadeEls = document.querySelectorAll(".fade");
//監視の設定
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      //判定エリアに入った時だけ処理する
      if (entry.isIntersecting) {
        //入った要素にis-showをつける
        entry.target.classList.add("is-show");
        //その要素の監視をやめる
        observer.unobserve(entry.target);
      }
    });
  },
  {
    //判定エリアの下を１０％削る（画面の下ピッタリじゃなくて、少し入ってから出す）
    rootMargin: "0px 0px -10px 0px",
  },
);
//監視対象として”fadeEls”を登録（登録しないと発火しない）
fadeEls.forEach((el) => observer.observe(el));
