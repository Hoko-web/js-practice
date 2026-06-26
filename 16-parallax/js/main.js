// パララックス：スクロールに合わせて、各要素を別々の速さで縦に動かす

const items = document.querySelectorAll(".js-parallax");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  items.forEach((item) => {
    const speed = Number(item.dataset.speed);
    item.style.transform = `translateY(${scrollY * speed}px)`;
  });
});
