// main.js
import { quotes } from './quotes.js';

const btn = document.getElementById("quoteBtn");
const display = document.getElementById("quoteDisplay");

btn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    display.textContent = quotes[randomIndex];
});
