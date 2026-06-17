// マウス位置に追従して３Dで傾くカード

const cards = document.querySelectorAll(".js-tilt");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    // カードの画面上の位置とサイズをとる
    const rect = card.getBoundingClientRect();
    // カードの中心座標XとY（左端　+幅　÷２）から
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // マウスが中心からどれだけズレてるか（マウス座標　-　中心）
    const offsetX = e.clientX - centerX;
    const offsetY = e.clientY - centerY;
    // ズレを　-15~15度の傾きに変換（中心０　端で１５）
    const rotateY = (offsetX / (rect.width / 2)) * 15;
    const rotateX = -(offsetY / (rect.height / 2)) * 15;
    // カード傾ける　＋　少し拡大scale
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener("mouseenter", () => {
    // ホバーした瞬間は早く傾き追従
    card.style.transition = "transform 0.1s ease";
  });

  card.addEventListener("mouseleave", () => {
    // 離した瞬間はゆっくり戻る
    card.style.transition = "transform 0.6s ease";
    // 傾き0に戻す
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});
