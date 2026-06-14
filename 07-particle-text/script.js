// canvas基礎③ばらばらのドットを文字の位置に集めるアニメ（requestAnimationFrame）

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
      dots.push({
        x: Math.random() * canvas.width, // 今の位置（最初はランダムにばら撒く）
        y: Math.random() * canvas.height,
        baseX: x, // ゴールの位置（文字の座標）
        baseY: y,
      });
    }
  }
}

function animate() {
  // 前のコマを消す（毎フレーム描き直すため）
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  for (const dot of dots) {
    // ゴールとの差の５％だけ近づける（だんだん減速して止まる）
    dot.x += (dot.baseX - dot.x) * 0.05;
    dot.y += (dot.baseY - dot.y) * 0.05;
    ctx.fillRect(dot.x, dot.y, 2, 2); // 引数（x座標, y座標, ドットの幅, ドットの高さ）
  }
  // 次のコマでまた自分を呼ぶ（ループ）
  requestAnimationFrame(animate);
}
// 最初の一回を起動
animate();
