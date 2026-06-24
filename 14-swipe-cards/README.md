# スワイプカード（Tinder風）

カードをドラッグして左右に弾くと、傾きながら飛んでいって次のカードが出る。pointer系イベントでマウスもタッチも対応。

## 何を作ったか

重なったカードの一番上を**ドラッグ → しきい値を超えて弾くと飛んでいって消え、次のカードが出る**。届かなければ中央にスッと戻る。

## なぜ・どこで使うか

スワイプUI（マッチング・診断・ギャラリー送り）で使う。技術的には **「pointerで掴む → 移動量で操作 → 離して判定」** という、ドラッグ系インタラクション全般（並び替え・自作スライダー等）に通じる基礎。

## 実装のポイント（JS：主役）

- **pointer系イベント**：`pointerdown`（掴む）/ `pointermove`（動かす）/ `pointerup`（離す）で、**マウスもタッチも同じコードで扱える**。掴んだら `setPointerCapture` で要素外に出ても追従。
- **移動量で動かす**：`dx = e.clientX - startX`（今の位置 − 掴んだ位置）。チルトカード(09)の「ズレ」と同じ発想。`transform: translate() rotate()` で移動＋傾き。
- **しきい値で分岐**：`Math.abs(dx) > 120` で「弾いたか」を判定（左右どちらでも絶対値で）。向きは三項演算子 `dx > 0 ? 1 : -1`。超えたら画面外へ飛ばす／届かなければ `transform = ""` で戻す。
- **transitionの切り替え**：ドラッグ中は `transition: none`（即追従）、離したら `0.4s`（飛ぶ/戻るをアニメ）。キビキビとヌルッの使い分け。
- **連続スワイプ**：セットアップを `setTopCard()` 関数にまとめ、飛ぶアニメ完了（`transitionend`）→ `card.remove()` → `setTopCard()` を再呼び出しで**次の一番上にイベントを付け直す**。`transitionend`＋`remove` はプリローダー(08)の再利用。

## 実装のポイント（HTML/CSS）

- **カードの重なり**：土台 `.p-swipe__cards` を `position: relative` ＋ サイズ固定、各 `.c-card` を `position: absolute; inset: 0` で**全部同じ位置に重ねる**。
- **カードデザイン**：画像を `object-fit: cover`、下に `linear-gradient` のグラデ＋白文字（FVの応用）。BEMは flat に記述。
- **ドラッグUIの定番対策（重要）**：
  - `touch-action: none` … ブラウザの既定タッチ操作（スクロール）と喧嘩してカクつくのを防ぐ。
  - 画像に `pointer-events: none` … 写真のネイティブD&D（ゴースト画像）が掴みを奪うのを防ぐ。
  - `user-select: none` … ドラッグ中の文字選択を防ぐ。
- SCSSはFLOCSS（foundation / component / project）＋ `@use` を13から流用。

## つまづき＆気づき

- **「重い・掴めない」の正体はDevToolsとドラッグUI対策不足**：高頻度の `transform` 更新はDevTools開いてると重い。加えて `touch-action: none`／画像ドラッグ無効化が無いとカクつく＆掴めない。pointerドラッグ自作はこの3点セットが必須。
- **関数は定義しただけでは動かない**：`setTopCard()` の呼び出しを忘れて無反応に。定義＋呼び出しでワンセット。
- **スペルミスは黙ってスルーされる**：`pointermove` を `pointmove`、`Math.abs` を `Math.ads` と書いて無反応/エラー。動かない時はまずスペルを疑う。

## a11y メモ（上司目線）

今はマウス/タッチ専用で、キーボードだけの人は操作できない。実プロダクトなら **LIKE/NOPE ボタン**を足して、ボタン（＝キーボード）でも捌けるようにするのが望ましい。

## デモ

（GitHub Pages を設定したらリンクを貼る）
