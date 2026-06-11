// canvas基礎①(ドットをランダムにばら撒く)

const canvas = document.querySelector(".js-practice-canvas");
// canvasを画面の大きさに合わせる
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
// canvasを使うときに呼ぶ（２D用）　ctxにして使い回す
const ctx = canvas.getContext("2d");
// 色（スタイル）の指定
ctx.fillStyle = "#fff";
// このカッコの中を３００回繰り返す
for (let i = 0; i < 300; i++) {
  // 横の位置を「０〜画面の幅」の中からランダムに決める
  const x = Math.random() * canvas.width;
  // 縦の位置を「0〜画面の高さ」の中からランダムに決める
  const y = Math.random() * canvas.height;
  // さっき決めた（x、y）の場所に、４px角の四角（ドット）を作る
  ctx.fillRect(x, y, 4, 4);
}
