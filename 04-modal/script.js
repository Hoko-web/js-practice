const openBtn = document.getElementById("open-btn");
const closeBtn = document.getElementById("close-btn");
const modal = document.getElementById("modal");

//ボタン押したらモーダル開く
openBtn.addEventListener("click", () => {
  modal.showModal();
});
//閉じるボタン押したらモーダル閉じる
closeBtn.addEventListener("click", () => {
  modal.close();
});
//背景押したら閉じる
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.close();
  }
});
