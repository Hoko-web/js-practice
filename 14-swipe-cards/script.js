const area = document.querySelector(".js-swipe");

function setTopCard() {
  const cards = document.querySelectorAll(".js-card");
  const card = cards[cards.length - 1];
  if (!card) return;

  let startX = 0;
  let startY = 0;
  let isDragging = false;

  card.addEventListener("pointerdown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    card.style.transition = "none";
    card.setPointerCapture(e.pointerId);
  });

  card.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    card.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx * 0.05}deg)`;
  });

  card.addEventListener("pointerup", (e) => {
    isDragging = false;
    const dx = e.clientX - startX;
    card.style.transition = "transform 0.4s ease";

    if (Math.abs(dx) > 120) {
      const dir = dx > 0 ? 1 : -1;
      card.style.transform = `translate(${dir * 1000}px) rotate(${dir * 30}deg)`;

      card.addEventListener(
        "transitionend",
        () => {
          card.remove();
          setTopCard();
        },
        { once: true },
      );
    } else {
      card.style.transform = "";
    }
  });
}

setTopCard();
