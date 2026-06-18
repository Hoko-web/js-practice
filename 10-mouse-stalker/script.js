/**
 * マウス追従カーソル（ドット　＋　遅れて追うリング）
 */
const stalker = document.querySelector(".js-stalker");
const hoverLinks = document.querySelectorAll(".js-hover");
const dot = document.querySelector(".js-dot");
// マウスの目標位置
let mouseX = 0;
let mouseY = 0;
// マウスが動くたびに現在地の座標を取得 eにその情報を入れる
window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

let currentX = 0;
let currentY = 0;
let scale = 1;
let currentScale = 1;
// hoverLinksの中身を１つづつlinkとして取り出して、繰り返す
hoverLinks.forEach((link) => {
  // ホバーしたら、１→2.５にスケール、is-hoverをつける、ドットを消す
  link.addEventListener("mouseenter", () => {
    scale = 2.5;
    stalker.classList.add("is-hover");
    dot.style.opacity = 0;
  });
  // ホバーをやめたら、全部戻す
  link.addEventListener("mouseleave", () => {
    scale = 1;
    stalker.classList.remove("is-hover");
    dot.style.opacity = 1;
  });
});

function animate() {
  // 目標との差の１５ ％だけ近づく　→ 遅れて追い、マウス止まると減速
  currentX += (mouseX - currentX) * 0.15;
  currentY += (mouseY - currentY) * 0.15;
  currentScale += (scale - currentScale) * 0.15;
  // リングの位置が、カーソルの中心になるように
  stalker.style.transform = `translate(${currentX}px,${currentY}px) translate(-50%, -50%) scale(${currentScale})`;
  // ドットの位置が、カーソルの中心になるように
  dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animate);
}
animate();
