(() => {
  const loadMoreButton = document.querySelector(".js-load-more");
  const newsList = document.querySelector(".js-news-list");

  if (!loadMoreButton || !newsList) return;

  const VISIBLE = 4;

  const newsItems = newsList.querySelectorAll(".p-news__item");
  let isOpen = false;

  loadMoreButton.addEventListener("click", () => {
    isOpen = !isOpen;

    newsItems.forEach((item, index) => {
      if (index >= VISIBLE) {
        item.classList.toggle("is-hidden", !isOpen);
      }
    });

    loadMoreButton.textContent = isOpen ? "Close" : "More";
  });
})();
