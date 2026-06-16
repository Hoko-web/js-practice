# プリローダー（ローディング画面）

## 何を作ったか

ページを開くと黒い全画面が出て、`0%` から `100%` までカウントアップ。100%になると黒幕がフェードアウトして、裏のコンテンツが現れる演出。フェード後は黒幕をDOMから完全に撤去する。

## なぜ・どこで使うか

ブランドサイト・制作会社サイト・ポートフォリオ・キャンペーンLPなど“魅せる系”で定番の演出。重いFV（動画・WebGL・canvas）の読み込みを隠す実用目的でも使う。
ただし表示速度・UX とのトレードオフがあり、普通のコーポレート・EC・情報サイトでは使わない（むしろ邪魔）。「場面を選ぶ飛び道具」という位置づけ。

## 実装のポイント

- **カウントは `setInterval`**：`setInterval(処理, 20)` で20msごとに `count++` し、表示を `${count}%` に更新。100に達したら `clearInterval(timer)` で止める。
  - `setInterval` は「タイマーのID」を返すので、それを変数に保持して `clearInterval` に渡して止める。
  - 連続して滑らかに描く `requestAnimationFrame` と違い、「一定間隔で繰り返す」用途は `setInterval` が素直。
- **フェードアウトは「JSでクラス付け → CSS transition」**：100%で `preloader.classList.add("is-hidden")`。CSS側の `.is-hidden { opacity: 0 }` ＋ `transition: opacity 0.8s` で動く（06のフェードインと同じ型）。
- **透明 ≠ 消えた**：`opacity: 0` でも要素は全画面・最前面に残り、裏のクリックを奪う。`.is-hidden` に `pointer-events: none` を足して、クリックを裏へ素通りさせる。
- **フェード後にDOMごと撤去**：`transitionend`（transition完了で発火するイベント）を使い、`preloader.remove()` で削除。残しておくとキーボードのフォーカスやスクリーンリーダーに引っかかるため、a11y的にも撤去が望ましい。
- **`prefers-reduced-motion` の注意点**：アニメ抑制設定の人にはフェードをほぼ一瞬にする。ただし `transition: none` にすると `transitionend` が発火せず `remove()` が動かないので、`transition-duration: 0.01ms`（完全ゼロにしない）にして、イベントは起きるが見た目は一瞬、という形にした。
- **小ネタ**：カウンターに `font-variant-numeric: tabular-nums` を付けて、数字の幅を揃えカウント中のガタつきを防止。

## つまづき＆気づき

- `if (count = 100)` と書いてしまい、1%で即停止した。`=`（代入）と `>=`/`===`（比較）の違い。`if` の中で `=` を1個書くのは典型ミス、と覚えた。
- 「透明にしただけでは要素は残っていてクリックを奪う」のが盲点だった。`pointer-events: none` ＋ `remove()` まででワンセット。

## デモ

（GitHub Pages を設定したらリンクを貼る）
