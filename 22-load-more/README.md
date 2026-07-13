# お知らせ一覧（もっと見る／閉じる）

## 何を作ったか

お知らせ一覧を最初は4件だけ表示し、「More」ボタンで残りを開く／「Close」でまた閉じられるトグルUI。開閉は高さがなめらかにアニメする。

## なぜ・どこで使うか

ニュース・ブログ・実績一覧など「一覧を長く出したいけど、最初は畳んでおきたい」場面で使う。同じ部品（状態クラスのトグル＋高さの開閉アニメ）は、アコーディオン・FAQ・「続きを読む」にそのまま流用できる。

## 実装のポイント

- **状態は `is-collapsed` クラスのトグルで表現**。JSは開閉フラグ `isOpen` を持ち、`classList.toggle("is-collapsed", !isOpen)` の第2引数で付け外しを制御（if/elseを書かずに済む）。
- **高さのアニメは `grid-template-rows` を `1fr ⇄ 0fr`**。`max-height` と違って中身の高さぴったりに畳めるのが利点。子要素に `overflow: hidden` / `min-height: 0` が必須（これが無いと0まで潰れない）。
- **ハマり：`overflow: hidden` では `padding` は消えない**。中身は潰れても上下paddingぶんの高さが残り、閉じてもボタンが下にズレた。→ 閉じた時に `padding-top` / `padding-bottom` も `0` にして（transitionにも入れて）完全に高さ0にした。
- **最初に隠す分は最初からHTMLに `is-collapsed` を付ける**。JSで読み込み後に隠すと一瞬全部見えてチラつくため。
- **a11y**：項目リンクは `<a>`、ボタンは `type="button"`、日付は `<time datetime>` で機械可読に。

## デモ

（GitHub Pages 未設定）
