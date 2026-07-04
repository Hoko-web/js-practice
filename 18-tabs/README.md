# タブUI（アクセシブル・キーボード操作対応）

## 何を作ったか

クリックで中身が切り替わるタブUI。マウスだけでなく**矢印キーでもタブ移動**でき、スクリーンリーダーにも状態が伝わるよう、W3Cの **WAI-ARIA「Tabs」パターン**に沿って実装した。

## なぜ・どこで使うか

サービス紹介・料金プラン・商品詳細・FAQなど、**限られたスペースで情報を切り替えて見せる**定番UI。1ページに全部並べると長くなる内容を、タブでコンパクトにまとめる場面で頻出。

## 実装のポイント（HTML：WAI-ARIA Tabsパターン）

- **役割を明示**：`role="tablist"`（タブの集まり）/ `role="tab"`（各ボタン）/ `role="tabpanel"`（中身）。
- **タブ↔パネルを相互に紐付け**：`aria-controls`（タブ→パネルのid）と `aria-labelledby`（パネル→タブのid）を**ペアで逆向き**に指し合う。番号（tab-1↔panel-1）を揃える。
- **選択状態は `aria-selected`**（`true`/`false`）。開閉ボタン用の `aria-expanded` とは別物。タブは「選択」なので `aria-selected`。
- **ロービング tabindex**：アクティブなタブだけ `0`（Tabで入れる）、他は `-1`（Tabでは飛ばす）。タブ内の移動は矢印キーに任せる。
- タブは `<button type="button">`（ネイティブでフォーカス可・Enter/Space対応）。

## 実装のポイント（JS）

- **切替処理を1つの関数（`activeTab`）に集約**：クリックも矢印キーも同じ関数を呼ぶ。同じ処理を2か所に書かないため。
- **状態は3点セットで同期**：切り替えるたびに `is-active`（見た目）/ `aria-selected`（読み上げ）/ `tabIndex`（キーボード）を必ずまとめて付け替える。
- **パネルの紐付けは `aria-controls` を再利用**：`getElementById(tab.getAttribute("aria-controls"))` でパネルを取得。a11y用の属性がそのままJSのリンクになるので、`data-target` は不要。
- **矢印キーでタブ移動**：`(i + 1) % tabs.length` で右端の次は先頭へ、`(i - 1 + tabs.length) % tabs.length` で左端の前は末尾へループ。

## つまづき＆気づき

- **`aria-selected` と `aria-expanded` は別物**：タブは「選択」＝`aria-selected`。`aria-expanded` はアコーディオン等の「開閉」用。役割で使い分ける。
- **`tabindex`（HTML属性）と `tabIndex`（JSプロパティ）は書き方が違う**：JSで小文字 `t.tabindex = -1` と書いても**効かない**。DOMプロパティはキャメルケースの `tabIndex`。`className`/`htmlFor` と同じ仲間。
- **キーボード対応を足したら「構造」が変わった**：クリックだけなら元の短いコードでよかったが、矢印キーも同じ「切替」をするので、処理を関数に切り出す必要が出た。**機能を増やすと設計を見直す**、という実務でよくある流れを体験。
- **`data-target` は要らなかった**：`aria-controls` が既にパネルのidを持っているので、紐付け情報を1か所にまとめられた。

## デモ

（GitHub Pages を設定したらリンクを貼る）
