// マーキー　 : 文字列を無限に流す　＋ スクロールで加速

const rows = document.querySelectorAll(".js-row");

let scrollSpeed = 0; // スクロールで足す速度
let lastY = window.scrollY; // １フレーム前のスクロール位置（スクロール量を測るため覚えておく）

window.addEventListener("scroll", () => {
  // スクロール毎実行
  scrollSpeed += window.scrollY - lastY; // 「今のスクロール位置 − さっきの位置」＝ 今スクロールした量。それをscrollSpeedへ
  lastY = window.scrollY; // 「さっきの位置(lastY)」を今の位置に更新（次のスクロール量を測るため）
});
// scrollSpeed を毎フレーム0.9倍して、だんだん0に戻すための関数
function decay() {
  scrollSpeed *= 0.9; // scrollSpeedを0.9倍（スクロールを止めたら元の速さへ戻る）
  requestAnimationFrame(decay); // 次のコマでまたdecayを呼ぶ＝ループ
}
decay(); // decay ループを起動

rows.forEach((row, i) => {
  // 行を1本ずつ処理する（row ＝ その行、 i ＝ 何番目の行か）
  const group = row.querySelector(".p-marquee__group");
  row.appendChild(group.cloneNode(true)); // その文字グループを複製して、その行に追加(ループ用)

  const groupWidth = group.offsetWidth; // 文字グループ1枚の幅(px)。「1枚分動いたか」の基準
  const direction = i % 2 === 0 ? -1 : 1; // その行の流れる向き（偶数行は左 -1 / 奇数行は右 1）
  let offset = 0; // その行を元の位置から横に何pxずらすか（最初は0＝元の位置）
  const speed = 0.5; // その行の基本の速さ（1フレームに動くpx）

  function animate() {
    // その行のズレ(offset)を更新：（基本速度 ＋ スクロール上乗せ）×向き分動かす
    offset += (speed + Math.abs(scrollSpeed) * 0.1) * direction;
    // その行（HOKO...）が左にズレ切ったら、行（HOKO...）を戻す（2枚目が同じ位置に来てて継ぎ目なく流れるように見える）
    if (offset <= -groupWidth) offset += groupWidth;
    // その行が右に流れ切ったら、1枚行戻す（さっきの逆向き版）
    if (offset >= 0) offset -= groupWidth;
    //  計算し終わった offsetをtranslateXに入れて、その行を実際に横へ動かす
    row.style.transform = `translateX(${offset}px)`;
    requestAnimationFrame(animate);
  }
  animate();
});
