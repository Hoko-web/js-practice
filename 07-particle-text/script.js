// canvas基礎②(文字の位置を記憶して、その位置にドットを配置する)

const canvas = document.querySelector(".js-practice-canvas");
// canvasを画面の大きさに合わせる
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
// canvasを使うときに呼ぶ（２D用）　ctxにして使い回す
const ctx = canvas.getContext("2d");
// スタイルの指定
ctx.fillStyle = "#fff";
ctx.font = "bold 150px sans-serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
// 中心におきたいので、画面幅　÷２をする
ctx.fillText("canvas", canvas.width / 2, canvas.height / 2);
//　 どのピクセルが文字で埋まっているかデータとして取り出す、引数は (左上x, 左上y, 幅, 高さ)
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
// 色の数字の列だけ取り出す（１ピクセル　＝　R,G,B,Aの４つ）
const data = imageData.data;
// 文字があった場所を覚えておく空の箱
const dots = [];
// ６個に１個だけ調べる（間隔空けるため）
const gap = 6;
// 画面を上から下へ、左から右へ、６個飛ばしでチェック
for (let y = 0; y < canvas.height; y += gap) {
  for (let x = 0; x < canvas.width; x += gap) {
    // 今チェックしてる場所に文字があるか、あれば記憶する
    const index = (y * canvas.width + x) * 4; // この点の数字がはじまる場所
    const alpha = data[index + 3]; // そこから４個目（R、G、B、AのA＝透明度）
    // 文字がある、値が１２８より大きいなら
    if (alpha > 128) {
      // その場所を記憶する
      dots.push({ x, y });
    }
  }
}
// さっき描いた文字を一旦消す（この後にドットでかきなおす）
ctx.clearRect(0, 0, canvas.width, canvas.height);
// 記憶していた位置に、ドットを打っていく
ctx.fillStyle = "#fff";
for (const dot of dots) {
  // dotsから１個取り出して「dot」と呼ぶ
  ctx.fillRect(dot.x, dot.y, 2, 2); // 引数（x座標, y座標, ドットの幅, ドットの高さ）
}
