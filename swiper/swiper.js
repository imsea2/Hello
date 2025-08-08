// Swiper 카드 효과: 보이는 탭에서만 초기화
document.addEventListener("DOMContentLoaded", () => {
  window.swipers = {};

  const createCardsSwiper = (selector) => {
    return new Swiper(selector, {
      effect: 'cards',
      grabCursor: true,
      loop: true,
      threshold: 8,
      cardsEffect: {
        perSlideOffset: 8,
        perSlideRotate: 2,
        rotate: true,
        slideShadows: false,
      },
    });
  };

  // 초기: 단품만 생성 (보이는 탭)
  window.swipers.single = createCardsSwiper('#swiper-single');

  // 탭 열릴 때 필요한 것만 지연 초기화
  window.initSwiperFor = (key) => {
    if (key === 'limited' && !window.swipers.limited) {
      window.swipers.limited = createCardsSwiper('#swiper-limited');
    } else if (key === 'set' && !window.swipers.set) {
      window.swipers.set = createCardsSwiper('#swiper-set');
    } else if (window.swipers[key]) {
      // 이미 만들어진 건 레이아웃 갱신
      window.swipers[key].update();
    }
  };
});
