# カードグリッド（CSS Grid ＋ スクロールで順次フェードイン）

制作実績のような画像カードを **CSS Grid** で並べ、スクロールして画面に入ると **1枚ずつ時間差でフワッと表示**するセクション。

## 何を作ったか

カードをグリッドで配置（PC3列・タブレット2列・スマホ1列）。スクロールでカードがビューに入ると、IntersectionObserver ＋ stagger で順にフェードインする。ホバーでカードが浮く。

## なぜ・どこで使うか

Works（制作実績）・サービス一覧・ブログ一覧など、**カードを並べるセクション**全般。CSS Grid は「行と列のマス目に揃えて並べる」のが得意で、こうしたカード並びの定番レイアウト。

## 実装のポイント（HTML/CSS：CSS Grid が新スキル）

- **CSS Grid でカードを並べる**：`.p-works__list` に `display: grid` ＋ `grid-template-columns`。
  - `repeat(3, 1fr)` ＝「`1fr`（均等幅）を3つ」＝3等分の3列。`1fr` は余りスペースを均等に分ける単位。
  - `gap` でマス目の隙間（縦横まとめて）。
  - **モバイルファースト**：base 1列 → `mq(tb)` で2列 → `mq(pc)` で3列。
  - `max-width` ＋ `margin-inline: auto` で広がりすぎ防止＆中央寄せ。
- **カードの高さを揃える**：画像に `height: 220px; object-fit: cover` を付けて、カードの大きさを揃える（バラつくとグリッドが汚くなる）。
- **リッチ化**：`overflow: hidden` ＋ `border-radius` ＋ `box-shadow`、ホバーで `translateY(-6px)` 浮き上がり。

## 実装のポイント（JS：スクロールで順次フェードイン）

- **IntersectionObserver**：各カードを監視し、画面に入ったら（`isIntersecting`）`is-show` を付けて表示（day6フェードインの再利用）。`unobserve` で一度きり。
- **stagger（時間差）**：`entries.forEach((entry, i) => setTimeout(..., i * 120))`。同時に入った行のカードを120msずつズラして1枚ずつ出す。
  - **`transition-delay` でなく `setTimeout` を使う理由**：`transition-delay` だとホバーの動きまで遅れる。`setTimeout` なら「表示のタイミング」だけズラせて、ホバーは即反応のまま。
- フェード自体は CSS の `opacity` の `transition`（`is-show` で 0→1）。

## つまづき＆気づき

- **`transition` に `opacity` を書き忘れて、フェードせずパッと出た**：`opacity: 0 → 1` を切り替えても、`transition` に `opacity` が無いとアニメしない。「**動かしたいプロパティは transition に全部書く**」。
- **CSS Grid の基本**：`grid-template-columns` / `repeat()` / `1fr` / `gap`。flex と違い「縦横のマス目」で揃えられる。

## デモ

（GitHub Pages を設定したらリンクを貼る）
