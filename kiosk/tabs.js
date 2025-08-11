// tabs.js  — 탭 전환 전용

// DOM이 이미 하단에 스크립트를 넣었으니 필수는 아니지만, 안전하게 감싸도 OK
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels  = document.querySelectorAll(".tab-panel");

  function showTab(target) {
    // 1) 모든 버튼/패널 초기화
    tabButtons.forEach(btn => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
    });
    tabPanels.forEach(panel => {
      panel.hidden = true;          // 접근성 친화적 숨김
      panel.classList.remove("active");
    });

    // 2) 타겟 패널/버튼 활성화
    const panel = document.querySelector(`#tab-${target}`);
    const btn   = Array.from(tabButtons).find(b => b.dataset.tabTarget === target);

    if (panel) {
      panel.hidden = false;
      panel.classList.add("active");
    }
    if (btn) {
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
    }
  }

  // 버튼 클릭으로 탭 전환
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      showTab(btn.dataset.tabTarget);
    });
  });

  // 새로고침 시 현재 active 버튼 기준으로 초기 탭 보이기
  const initiallyActive = document.querySelector(".tab-btn.active")?.dataset.tabTarget || "single";
  showTab(initiallyActive);
});
