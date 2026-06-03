//監視したいセクションをまとめて取得
const sections = document.querySelectorAll(".section");
//ハイライトをつけ外しするリンクを全て取得
const links = document.querySelectorAll(".toc-link");

//監視の設定
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      //判定エリアに「入った」時だけ処理する（出て行く時は無視）
      if (entry.isIntersecting) {
        const id = entry.target.id; //判定エリアに来たid　例”service”を取得
        //一旦全リンクからis-activeを外す（常に一つだけ光らせるため）
        links.forEach((link) => {
          link.classList.remove("is-active");
        });
        //そのidを指しているリンクにis-activeを付け光らせる
        const activeLink = document.querySelector(`.toc-link[href="#${id}"]`);
        activeLink.classList.add("is-active");
      }
    });
  },
  //判定エリアを画面中央の線だけに絞る（上下を５０％ずつ削る）　→現在地が常に一つに定まる
  {
    rootMargin: "-50% 0px -50% 0px",
  },
);

//監視対象として”section”を登録（登録しないと発火しない）
sections.forEach((section) => {
  observer.observe(section);
});
