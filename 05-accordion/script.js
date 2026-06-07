const items = document.querySelectorAll(".faq-item");

items.forEach((item) => {
  //toggle = <details> が開いた/閉じた時に発火する
  item.addEventListener("toggle", () => {
    //開いた時だけ処理処理（閉じた時は何もしない）
    if (item.open) {
      //自分以外のfaq-itemを全部閉じる
      items.forEach((other) => {
        if (other !== item) {
          other.open = false;
        }
      });
    }
  });
});
