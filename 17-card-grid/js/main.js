const cards = document.querySelectorAll(".js-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;

      setTimeout(() => {
        entry.target.classList.add("is-show");
      }, i * 150);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 },
);

cards.forEach((card) => observer.observe(card));
