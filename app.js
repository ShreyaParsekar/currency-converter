const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns) {
    for (val in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = val;
        // newOption.value = val;
        if(select.name === "from" && val ==="USD"){
            newOption.selected = "selected";
        } else if (select.name === "to" && val ==="INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    
}
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let res = await fetch(URL);
    let data = await res.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};
const updateFlag = (select) => {
    let val = select.value;
    let countryCode = countryList[val];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = select.parentElement.querySelector("img");
    img.src = newsrc;

}
btn.addEventListener("click",  (evt) => {
    evt.preventDefault();
    updateExchangeRate();
    
});

window.addEventListener("load", () => {
    updateExchangeRate();
});

