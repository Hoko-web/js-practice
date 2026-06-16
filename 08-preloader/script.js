const preloader = document.querySelector(".js-preloader");
preloader.addEventListener("transitionend", () => {
  preloader.remove();
});
const countEl = document.querySelector(".js-count");
let count = 0;

const timer = setInterval(() => {
  count++;
  countEl.textContent = `${count}%`;
  if (count >= 100) {
    clearInterval(timer);
    preloader.classList.add("is-hidden");
  }
}, 20);
