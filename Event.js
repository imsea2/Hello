let btn1 = document.querySelector("#btn1");

btn1.addEventListener("click", () => {
    console.log("버튼클릭");
    
});

function greet(name){
    return `안녕, ${name}님!`;
}
console.log(greet("바다"));