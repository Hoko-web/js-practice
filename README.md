# js-practice

毎日ひとつ、何かしらを実装する練習ログ。
HTML / CSS / JavaScript の基礎〜実務スキルを、小さく作りながら身につけていく。

## 実装一覧

| No. | 実装 | 内容 |
| --- | --- | --- |
| 01 | [フォームバリデーション](./01-form-validation/) | お問い合わせフォームの入力チェック（必須・メール形式・文字数）を JavaScript で実装 |
| 02 | [スクロールスパイ](./02-scroll-spy/) | スクロールで現在地のセクションを目次にハイライト（IntersectionObserver + rootMargin） |
| 03 | [検索＆絞り込みフィルター](./03-filter-search/) | 実績一覧をキーワード検索とカテゴリで絞り込み（配列 filter + dataset） |
| 04 | [モーダル（dialog）](./04-modal/) | ボタンで開くお知らせモーダル。閉じる3パターン（dialog + showModal + e.target判定） |
| 05 | [アコーディオン（FAQ）](./05-accordion/) | クリックで開閉するFAQ。1つ開くと他は閉じる（details/summary + name + toggle） |
| 06 | [スクロールでフェードイン](./06-fade-in/) | スクロールで要素をふわっと表示。AOSを使わず自作（IntersectionObserver + unobserve + CSS transition） |
| 07 | [パーティクルテキスト（canvas）](./07-particle-text/) | スクロールで「canvas」の文字が飛び散る／戻るパーティクル演出。canvas基礎〜線形補間まで4日連載で実装（`getImageData` + `requestAnimationFrame` + スクロール進捗×lerp） |
| 08 | [プリローダー（ローディング画面）](./08-preloader/) | 0→100%カウント後、黒幕がフェードアウトして中身が出る演出（setInterval + transitionend + remove） |
| 09 | [3Dチルトカード（マウス追従）](./09-tilt-card/) | マウスの位置に合わせてカードが3Dで傾く演出。すりガラス風・複数対応（mousemove + getBoundingClientRect + transform + perspective） |
| 10 | [マウスストーカー（カスタムカーソル）](./10-mouse-stalker/) | マウスに遅れて追うリング＋即追従ドットのカスタムカーソル。ホバーで拡大・中心から伸びる下線（mousemove + requestAnimationFrame + lerp + mix-blend-mode） |
| 11 | [数字カウントアップ（lerpで減速）](./11-count-up/) | 実績数字が0→目標値へ減速しながらカウント。lerpを数字に応用（requestAnimationFrame + lerp + data-target + グラデ文字） |
| 12 | [ハンバーガーメニュー＋ドロワー](./12-hamburger-drawer/) | スマホ定番の開閉ナビ。閉じる4トリガー・スクロール固定・aria同期のアクセシブル実装（aria-expanded/aria-label + e.target判定 + 状態の関数化） |
| 13 | [FVヒーロー＋スプリットテキスト](./13-splittext/) | 背景画像のFVを土台から実装＋見出しを1文字ずつ表示するJS演出。HTML/CSSにも本格着手（FLOCSS設計 + 動的DOM生成 + stagger + a11y/perf） |
| 14 | [スワイプカード（Tinder風）](./14-swipe-cards/) | カードをドラッグで左右に弾いて次々めくるUI。pointerドラッグ＋しきい値判定＋連続スワイプ（pointer events + setPointerCapture + transitionend + touch-action） |
| 15 | [スクロール連動マーキー](./15-marquee/) | 文字の行が左右交互に無限スクロール、スクロールで加速して戻る背景演出（requestAnimationFrame + cloneNode無限ループ + スクロール速度の減衰） |
| 16 | [パララックス](./16-parallax/) | スクロールで背景・透かし文字・見出しが別々の速さで動く奥行き演出（data-speed × scrollY → translateY） |
| 17 | [カードグリッド（CSS Grid）](./17-card-grid/) | 画像カードをGridで並べ、スクロールで1枚ずつ順次フェードイン（CSS Grid + IntersectionObserver + stagger） |
| 18 | [タブUI（アクセシブル）](./18-tabs/) | クリック＋矢印キーで切り替わるWAI-ARIA準拠のタブUI（role=tablist/tab/tabpanel + aria-controls + ロービングtabindex + aria-selected同期） |
| 19 | [画像比較スライダー（before/after）](./19-clip-path/) | 2枚の画像を仕切りのドラッグ＋矢印キーで見比べるUI（clip-path + pointer events + setPointerCapture + role=slider / aria-valuenow） |
