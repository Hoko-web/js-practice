/**
 * スワイプカード
 */

const area = document.querySelector(".js-swipe");

// 一番上のカードにドラッグ操作を仕込む。1枚消すたびに再帰で呼び直して次のカードに付け替える。
function setTopCard() {
  const cards = document.querySelectorAll(".js-card");
  const card = cards[cards.length - 1]; // 後ろのDOMほど手前に重なる
  if (!card) return; // カードが尽きたら終了

  let startX = 0; // ドラッグ開始時のX座標（移動量の基準）
  let startY = 0;
  let isDragging = false; // ドラッグ中かどうかの旗（move/upで使う）

  card.addEventListener("pointerdown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    card.style.transition = "none"; // ドラッグ中は遅延ゼロで指にぴったり追従させる
    card.setPointerCapture(e.pointerId); // 指がカードの外に出ても move/up を取りこぼさない
  });

  card.addEventListener("pointermove", (e) => {
    if (!isDragging) return; // 押していないときのカーソル移動は無視
    const dx = e.clientX - startX; // 開始位置からの移動量
    const dy = e.clientY - startY;
    // 動かした分だけ平行移動 ＋ 横移動に応じて少し傾ける（dx × 0.05deg）でカードらしさを出す
    card.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 0.05}deg)`;
  });

  card.addEventListener("pointerup", (e) => {
    isDragging = false;
    const dx = e.clientX - startX;
    card.style.transition = "transform 0.4s ease"; // 指を離した後は滑らかに動かす

    if (Math.abs(dx) > 120) {
      // 横に120pxより大きく動かしたらスワイプ成立
      const dir = dx > 0 ? 1 : -1; // 右なら+1左なら-1（カードを飛ばす向き）
      card.style.transform = `translate(${dir * 1000}px) rotate(${dir * 30}deg)`; // 画面外へ飛ばす

      // 飛ばすアニメが終わったタイミングでカードを削除 → 次のカードを有効化
      card.addEventListener(
        "transitionend",
        () => {
          card.remove();
          setTopCard(); // 再帰：次の一番上カードに同じイベントを付け直す
        },
        { once: true }, // 1回だけ実行して自動で外れる（毎回積み重ならないように）
      );
    } else {
      card.style.transform = ""; // 閾値未満なら transform を消してスナップ（元の位置に戻る）
    }
  });
}

setTopCard(); // 最初の一番上カードにイベントをセット
