# FVヒーロー（背景画像）＋ スプリットテキスト

**LPのFV（ファーストビュー）をHTML/CSSで土台から組み、そこにJSで見出しの1文字ずつ表示（スプリットテキスト）を乗せた**。

## 何を作ったか

- **FV**：全画面の背景画像＋暗いオーバーレイ＋中央に飾りキャッチ・主見出し・CTAボタン。レスポンシブ対応。
- **JS（主役）**：ページを開くと主見出しが**1文字ずつパラパラと浮かび上がる**スプリットテキスト演出。

## なぜ・どこで使うか

FVはほぼ全LPの先頭にある。スプリットテキストはモダンLPのヒーローで頻出の見出し演出。
技術的には **「文字列を1文字ずつ `<span>` に分割してDOMを作り、遅延をずらしてアニメさせる」** ＝ JSで要素を動的生成する基礎（トースト・リスト生成等にも通じる）。

## 実装のポイント（JS：スプリットテキスト）

- **DOMを動的生成**：`textContent` を保存 → 空に → `[...text].forEach` で1文字ずつ `document.createElement("span")` → `span.textContent = char` → `appendChild`。「既存HTMLの操作」でなく「JSで要素を作る」初実装。
- **stagger（波打ち）**：各 span に `span.style.transitionDelay = ${i * 0.05}s` を設定。文字ごとに開始を0.05sずつ遅らせて、順に出る。
- **アニメ発火**：分割後に `requestAnimationFrame(() => splittext.classList.add("is-show"))`。1フレーム待つのは、隠れた初期状態（opacity:0）を一度描画させてから transition を効かせるため。
- **CSS**：span は `display: inline-block`（inlineだと `translateY` が効かない）＋ 初期 `opacity:0`/`translateY`、`.is-show span` で表示。状態は `&.is-show`。
- **a11y**：分割すると `<span>` 1文字ずつでSRが読みにくいので、`aria-label` に元の文章を入れて**読み上げは元の文・見た目だけ分割**に分離。`prefers-reduced-motion` で即表示（モーション配慮）。

## 実装のポイント（HTML/CSSの土台）

- **セマンティック**：`main > section` 構造、主見出しは `<h1>` 1つ、飾りキャッチは `<p>`、装飾の背景画像は `alt=""`（SRに読ませない）。
- **FVレイアウト**：主役画像は **`<img>`**（CSS background ではない）→ LCP最適化のため `fetchpriority="high"`・`width/height`（CLS防止）・`decoding="async"`。`object-fit: cover` は **img** に。文字のコントラストは半透明オーバーレイで確保（WCAG AA）。重なりは `position`＋`z-index`。
- **SCSS設計（FLOCSS）**：`foundation`（変数・mixin・reset・base）/ `component`（c-btn）/ `project`（p-fv）に分割。`@use` / `@forward` でモジュール管理、`mq()` mixin（`map.get`）でブレイクポイント一元化。
- **モバイルファースト**：base＝スマホ（小さめ）、`@include mq(pc)` で大きく。min-width で下から積む。
- **Google Fonts**：`preconnect` ＋ `display=swap`（FOIT防止）＋ 使うウェイトだけ（perf）。
- **ボタン（c-btn）**：hoverで色反転/透過、`:focus-visible`、タップ範囲44px以上。

## つまづき＆気づき

- **head の `<script>` は `defer` 必須**：無いとbody（h1）を読む前に実行され、`querySelector` が `null` になる。
- **inline要素は `transform` が効かない** → span を `display: inline-block` に。
- **`object-fit` は img（置換要素）専用**。ラッパーの div に付けても無効。
- **destyle は見出しのサイズ/太さも消す**ので、見た目は全部CSSで付ける（「意味はHTML・見た目はCSS」が強制される）。

## デモ

（GitHub Pages を設定したらリンクを貼る）
