// kiosk.js

// 1) 장바구니 데이터 저장소
const cart = {};

// 2) 화면 요소 참조
const menu        = document.querySelector("#menu");
const cartDisplay = document.querySelector("#cart");
const totalDisplay= document.querySelector("#total");
const checkoutBtn = document.querySelector("#checkoutBtn");  // ★ 밖으로
const clearBtn    = document.querySelector("#clearBtn");     // ★ 밖으로

// 3) 메뉴 클릭 시 장바구니에 담기
menu.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button || !button.hasAttribute("data-name")) return;

  const name  = button.getAttribute("data-name");
  const price = Number(button.getAttribute("data-price"));

  cart[name]
    ? cart[name].count++
    : (cart[name] = { price, count: 1 });

  updateCart();
});

// 4) 장바구니 화면 렌더링
function updateCart() {
  cartDisplay.innerHTML = "";
  cartDisplay.style.display       = "flex";
  cartDisplay.style.flexDirection = "column";
  cartDisplay.style.alignItems    = "center";
  cartDisplay.style.rowGap        = "12px";

  let total = 0;
  for (const name in cart) {
    const { price, count } = cart[name];
    total += price * count;

    const box = document.createElement("div");
    box.style = `
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 8px 12px;
      width: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      margin: 8px 0;
    `;

    const btnMinus = document.createElement("button");
    btnMinus.textContent = "−";
    btnMinus.style = `
      width:24px; height:24px; font-size:18px; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
    `;
    btnMinus.addEventListener("click", (e) => {
      e.stopPropagation();
      if (cart[name].count > 1) cart[name].count--;
      else delete cart[name];
      updateCart();
    });

    const info = document.createElement("span");
    info.textContent = `${name} x${count} (${(price * count).toLocaleString()}원)`;

    const btnPlus = document.createElement("button");
    btnPlus.textContent = "+";
    btnPlus.style = `
      width:24px; height:24px; font-size:18px; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
    `;
    btnPlus.addEventListener("click", (e) => {
      e.stopPropagation();
      cart[name].count++;
      updateCart();
    });

    box.append(btnMinus, info, btnPlus);
    cartDisplay.appendChild(box);
  }

  totalDisplay.textContent = total.toLocaleString();
}

// 5) 결제하기 버튼 이벤트 (한 번만 등록)
checkoutBtn.addEventListener("click", () => {
  if (Object.keys(cart).length === 0) {
    alert("장바구니가 비어있습니다 😢");
    return;
  }
  alert("주문 감사합니다 🐰");
  for (const key in cart) delete cart[key];
  updateCart();
});

// 6) 모두 삭제 버튼 이벤트 (한 번만 등록)
clearBtn.addEventListener("click", () => {
  for (const key in cart) delete cart[key];
  updateCart();
});

// 7) 초기 렌더링 (선택)
updateCart();
