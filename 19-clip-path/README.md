# 画像比較スライダー（before/after・clip-path）

## 何を作ったか

2枚の画像を重ね、中央の仕切りを**ドラッグ（＋矢印キー）**で動かして before / after を見比べるUI。`clip-path` で上の画像を切り、pointer events でドラッグ、キーボードでも操作できるようにした。

## なぜ・どこで使うか

リフォーム・美容・写真レタッチ・制作実績など、「**施工前後・加工前後を見せる**」場面。1枚に収めて比較できるので、実績訴求（Before→Afterの説得力）に強い。

## 実装のポイント（CSS）

- **2枚を重ねる**：`frame` を `position: relative` の基準にして、after を土台（通常フロー）、before を `position: absolute` で真上に。
- **`clip-path: inset(0 X% 0 0)` で切る**：上の画像の右側を X% 隠す。X を変えると見える量が変わる。※`width` で切ると画像が潰れるので、幅ではなく **clip-path で切る**のがミソ。
- **absolute は自動で block 化**：だから before に `display: block` は不要。after は通常フローなので、img下の隙間を消すため `display: block` が要る。
- **`touch-action: none` ＋ 画像の `pointer-events: none`**：スマホでドラッグがスクロールに化けるのと、画像が掴まれてドラッグを邪魔するのを防ぐ。
- **丸ツマミ**：`::before` で円を作り、`translate(-50%, -50%)` で線の中央に合わせる。タップ領域は 44px 確保。

## 実装のポイント（JS）

- **座標計算**：`percent = (clientX - rect.left) / rect.width * 100`。`rect.left` を引いて「枠の中での位置」に直し、幅で割って % に。
- **`setPointerCapture`**：枠の外にポインタが出ても掴んだまま動かせる（これが無いと外に出た瞬間 `pointermove` が届かない）。
- **入口を1か所に集約**：位置変更は `setPosition` 関数だけ。ドラッグも矢印キーも同じ関数を呼ぶ。`current` 変数で現在の % を保持。
- **a11y**：`role="slider"` ＋ `aria-valuenow` を同期。矢印キー（←→↑↓）/ Home / End で操作、`preventDefault` でページスクロールを抑制。

## つまづき＆気づき

- **`clip-path: inset()` は `inset(上 右 下 左)`** の順。右を隠す量は「`100 - ハンドル位置%`」。
- **`e.key` は大文字小文字を区別する**：右矢印は `"ArrowRight"`（A大文字）。`"arrowRight"` だと一致せず効かない。
- **変数の宣言忘れ（`let current`）**：キーを先に押すと `undefined - 5` で NaN に。暗黙のグローバルで「たまたま動く」状態の怖さを実感。
- **`position: absolute` にすると `display: block` が自動で効く**：重ねる要素に `display` を書かなくていい理由。

## デモ

（GitHub Pages を設定したらリンクを貼る）
