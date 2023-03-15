const startHover = (el: HTMLElement) => {
  const colors = ["85C7F2", "533A7B", "44FFD1"];

  let elapsed = 0;
  const interval = setInterval(() => {
    elapsed++;
    const xOffset1 = Math.cos(elapsed / 60) * (Math.random() * 4) + 5;
    const yOffset1 = Math.cos(elapsed / 50) * (Math.random() * 8) - 2;
    const color1 = colors[elapsed % colors.length];

    const xOffset2 = Math.cos((elapsed / Math.random()) * 40) * (Math.random() * 4) - 15;
    const yOffset2 = Math.cos(elapsed / 30) + Math.random() * 8 - 2;
    const color2 = colors[(elapsed - 1) % colors.length];

    const xOffset3 = Math.cos(elapsed / 20) * (Math.random() * 4) - 15;
    const yOffset3 = Math.cos(elapsed / 10) + Math.random() * 8 - 2;
    const color3 = colors[(elapsed - 2) % colors.length];

    el.style.filter = `drop-shadow(${xOffset1}px ${yOffset1}px 0 #${color1})
                         drop-shadow(${xOffset2}px ${yOffset2}px 1px #${color2})
                         drop-shadow(${xOffset3}px ${yOffset3}px 2px #${color3})`;
  }, 100);

  el.dataset.interval = interval.toString();
};

const stopHover = (el: HTMLElement) => {
  el.style.filter = "";
  if (!el.dataset.interval) return;
  clearInterval(+el.dataset.interval);
  delete el.dataset.interval;
};

export function init() {
  for (const el of document.querySelectorAll("[data-hover]")) {
    el.addEventListener("mouseover", (e: Event) => startHover(e.target as HTMLElement));
    el.addEventListener("mouseout", (e: Event) => stopHover(e.target as HTMLElement));
  }
}
