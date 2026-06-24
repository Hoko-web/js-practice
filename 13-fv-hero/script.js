const splittext = document.querySelector(".js-splittext");

const text = splittext.textContent; // 文字を取得しておく
splittext.setAttribute("aria-label", text); // スクリーンリーダーには元の文を読ませる
splittext.textContent = ""; // 一旦カラにする、これからspanで入れ直す

[...text].forEach((char, i) => {
  // 配列にして、charとして一つづつ取り出す
  const span = document.createElement("span"); // spanを作る
  span.textContent = char; // そのspanに１文字入れる
  span.style.transitionDelay = `${i * 0.05}s`; // 一文字ごとに遅延させる、ずらす
  splittext.appendChild(span); // 1文字づつspanをh1に追加する
});

requestAnimationFrame(() => {
  splittext.classList.add("is-show");
});
