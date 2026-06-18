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
