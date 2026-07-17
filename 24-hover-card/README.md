# ホバーで詳細が出る実績カード（ギャラリー）

## 何を作ったか

実績カードを並べたギャラリー。カードにホバーすると画像がズーム＋暗いオーバーレイがふわっと出て、カテゴリ・作品名・View more が浮かび上がる。CSSのみ（JS無し）。

## なぜ・どこで使うか

実績一覧・制作事例・ギャラリー・ブログサムネで頻出。`transform` / `transition` / `overflow` / `object-fit` / 重ね順（`position`）といったCSSの主要テクが一度に練習できる。

## 実装のポイント

- **ホバーの連動**：`.p-works__image` 側に `.p-works__card:hover &`（＝`.p-works__card:hover .p-works__image`）と書き、**親カードのホバーを子（画像・オーバーレイ）に効かせる**。`.p-works__image:hover` にしないのは、上に乗ったオーバーレイにカーソルが移った瞬間チラつくのを防ぐため（カード全体をトリガーにすると効き続ける）。
- **ズームのクリップ**：カードに `overflow: hidden`、画像に `transform: scale(1.08)`。拡大ではみ出た分が枠で切り取られ、枠内だけでズームする。
- **オーバーレイ**：`position: absolute; inset: 0` でカード全面に重ね、`opacity: 0 → 1` の `transition` でフェードイン。
- **画像の形を揃える**：カードに `aspect-ratio: 4 / 3`、画像に `object-fit: cover`。列数が変わっても6枚が同じ比率に揃う。
- **レスポンシブ**：CSS Grid で SP1列 → タブレット2列 → PC3列。
- **a11y / perf**：カード丸ごと `<a>`、`alt` は作品名、画像は `loading="lazy"` / `decoding="async"` / `width`・`height` 明示。

## デモ

（GitHub Pages 未設定）
