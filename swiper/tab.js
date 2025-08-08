document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tab-btn");
  const panels = {
    single: document.getElementById("tab-single"),
    limited: document.getElementById("tab-limited"),
    set: document.getElementById("tab-set")
  };

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // 버튼 상태
      buttons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      // 패널 토글
      Object.values(panels).forEach(p => p.classList.add("hidden"));
      const key = btn.dataset.tabTarget;
      panels[key].classList.remove("hidden");

      // 탭 열릴 때 Swiper 초기화 or 업데이트
      if (window.initSwiperFor && typeof window.initSwiperFor === "function") {
        window.initSwiperFor(key);
      }
    });
  });
});
