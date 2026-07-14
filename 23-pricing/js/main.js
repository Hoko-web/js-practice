(() => {
  const toggle = document.querySelector(".js-price-toggle");
  const prices = document.querySelectorAll(".js-price");
  // どちらかがなければ、return
  if (!toggle || !prices.length) return;
  // buttons = 月額、年額ボタン
  const buttons = toggle.querySelectorAll(".p-pricing__switch-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // 一旦全てのbuttonからis-activeを外す
      buttons.forEach((b) => b.classList.remove("is-active"));
      // クリックされたbuttonにだけis-activeをつける
      button.classList.add("is-active");

      // term = 押されたボタンのdata-termの値（monthly,yearly）
      const term = button.dataset.term;
      prices.forEach((price) => {
        // term が "monthly" → price.dataset.monthly、
        // "yearly" → price.dataset.yearly
        price.textContent = price.dataset[term];
      });
    });
  });
})();
