// ローディング画面（０-100%カウント後、黒幕をフェードアウト）

const preloader = document.querySelector(".js-preloader");
// フェードが終わったら黒幕を消す
// （消さないと常に上に被さってる状態になるからボタンなどが押せなくなる）
preloader.addEventListener("transitionend", () => {
  preloader.remove();
});

const countEl = document.querySelector(".js-count");
let count = 0;
// 20msごとにカウントアップ
const timer = setInterval(() => {
  count++;
  countEl.textContent = `${count}%`;
  // １００％になったら、タイマーを止める、フェードアウト開始
  if (count >= 100) {
    clearInterval(timer);
    preloader.classList.add("is-hidden");
  }
}, 20);
