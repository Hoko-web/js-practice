const frame = document.querySelector(".p-compare__frame");
const before = document.querySelector(".p-compare__before");
const handle = document.querySelector(".js-handle");
// 3つ揃ってる時だけ実行
if (frame && before && handle) {
  let current = 50; // 今の仕切り（ハンドル）位置。矢印キーで「今の位置から＋ー」するので記憶させる

  // percent(0~100)を受け取り、ハンドル位置とbeforeの見える量を更新する
  const setPosition = (percent) => {
    // percentが　0〜100の範囲からはみ出さないようにする。マイナスなら0、100超えなら100に
    const clamped = Math.min(100, Math.max(0, percent));
    current = clamped; // 今の位置として覚え直す
    handle.style.left = `${clamped}%`; // ハンドルの横位置を更新
    before.style.clipPath = `inset(0 ${100 - clamped}% 0 0)`; // beforeの右側を「１００　- 位置」％隠す = 見える量が変わる
    handle.setAttribute("aria-valuenow", Math.round(clamped)); // 読み上げ用に今の％を同期
  };

  // マウス（指）が今、枠の左から何%の位置にいるかを計算。その%をスライダーやバーの位置に渡してる。
  const moveToPointer = (e) => {
    const rect = frame.getBoundingClientRect(); // rect = 枠の位置と大きさ
    const x = e.clientX - rect.left; // x = マウスの位置 - frameの左端の位置 = 「画面基準」を引き算で「枠基準」に直す
    const percent = (x / rect.width) * 100; // x　÷ frameの幅　 ×　１００　で割合％に変換
    setPosition(percent);
  };
  let dragging = false; // 今ドラッグ中かどうか

  frame.addEventListener("pointerdown", (e) => {
    dragging = true; // ドラッグ開始
    frame.setPointerCapture(e.pointerId); // マウスを枠の外まで追い続ける
    moveToPointer(e); // クリックした位置にすぐ仕切り（ハンドル）を移動
  });
  // 動かしたとき：ドラッグ中だけ仕切りを追従させる
  frame.addEventListener("pointermove", (e) => {
    if (!dragging) return; // draggingがfalse（ドラッグされてない）ならreturn
    moveToPointer(e);
  });
  // 離したとき：ドラッグ終了
  frame.addEventListener("pointerup", () => {
    dragging = false;
  });

  // 矢印キーでハンドルを動かせるように（a11y）
  handle.addEventListener("keydown", (e) => {
    const step = 5; // step ＝ キー1回で仕切りを動かす量（%）

    // 右／上キーが押されたら：現在地から step 分だけ増やす(current + step)
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      setPosition(current + step);
      // 左／下キーが押されたら：現在地から step 分だけ減らす(current - step)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      setPosition(current - step);
      // Home キー：一気に 0%（左端）へ
    } else if (e.key === "Home") {
      setPosition(0);
      // End キー：一気に 100%（右端）へ
    } else if (e.key === "End") {
      setPosition(100);
    } else {
      return;
    }
    e.preventDefault();
  });
}
