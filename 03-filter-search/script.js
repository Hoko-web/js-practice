const searchInput = document.getElementById("search");
const buttons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");
const countEl = document.getElementById("count");
const emptyEl = document.getElementById("empty");
//今選ばれているカテゴリを入れておく。最初はAll
let currentCategory = "all";
//絞り込みの関数
function applyFilter() {
  //検索ボックスに今入ってる文字を変数に入れる。前後の空白は trim()で消し、toLowerCase()で小文字に揃える
  const keyword = searchInput.value.trim().toLowerCase();
  //cardsを1枚ずつcardと呼んで調べる。trueのカードだけmatchedに入る
  const matched = [...cards].filter((card) => {
    //そのcardのタイトル文字を取り出して小文字にする
    const title = card.querySelector(".card-title").textContent.toLowerCase();
    //そのcardのdata-categoryの値を取り出す
    const category = card.dataset.category;
    //titleにkeywordが含まれるか、true or false
    const matchKeyword = title.includes(keyword);
    //「すべて」表示中か、categoryが一致　→ true or false
    const matchCategory =
      currentCategory === "all" || category === currentCategory;
    //２つともtrueの時だけtrueを返す それをmatchedに入れる
    return matchKeyword && matchCategory;
  });
  //全カードにis-hiddenをつける　（display: none）
  cards.forEach((card) => card.classList.add("is-hidden"));
  //matchedのカードだけis-hiddenを外す
  matched.forEach((card) => card.classList.remove("is-hidden"));
  //matchedの枚数を「◯件表示中」と表示
  countEl.textContent = `${matched.length}件表示中`;
  //枚数が1以上なら該当なしメッセージを隠す
  emptyEl.hidden = matched.length > 0;
}

applyFilter();
//検索ボックスに文字が入力されるたびにapplyFilter()を実行
searchInput.addEventListener("input", () => {
  applyFilter();
});

//ボタンを１個ずつbuttonと呼んで、それぞれに下記の設定をする
buttons.forEach((button) => {
  //「押されたボタン」がクリックされたら、中の処理を実行する
  button.addEventListener("click", () => {
    //押したボタンのカテゴリを「今の条件」として記憶
    currentCategory = button.dataset.filter;
    //ボタンから選択中の見た目を外す（次の行で1個だけ付け直すため）
    buttons.forEach((b) => b.classList.remove("is-active"));
    // 押したボタンだけ選択中にする
    button.classList.add("is-active");
    // 条件が変わったので絞り込みをやり直す
    applyFilter();
  });
});
