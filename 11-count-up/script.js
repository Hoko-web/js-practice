// 数字を０ → 目標値へ
// lerpで減速しながらカウントアップ

const counters = document.querySelectorAll(".js-count");

// １つずつcounterとして取り出す
counters.forEach((counter) => {
  // ゴール（data-targetを文字列から数値に変換）
  const target = Number(counter.dataset.target);
  // ０から始める
  let current = 0;

  // １コマ分の処理（updateをループする）
  function update() {
    // lerp：残りの５％だけ進む→だんだん減速
    current += (target - current) * 0.05;

    // ゴールまで0.５未満に近づいたら、ゴールぴったりにして終わる
    if (target - current < 0.5) {
      counter.textContent = target; // 目標値ちょうど
      return; // requestAnimationFrameを呼ばずにループ停止
    }

    // 少数を切り捨てて整数で表示
    counter.textContent = Math.floor(current);
    // update呼び出し
    requestAnimationFrame(update);
  }
  update(); // 最初の1回を起動（後はループ）
});
