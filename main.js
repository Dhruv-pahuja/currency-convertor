const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const btn = document.querySelector("button");
const dropdowns = document.querySelectorAll(".dropdown select");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

let msg = document.querySelector(".msg");

let updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let image = element.parentElement.querySelector('img');
    image.src = newSrc;
}

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if (select.name === 'from' && currCode === 'USD') {
            newOption.selected = "selected";
        } else if (select.name === 'to' && currCode === 'INR') {
            newOption.selected = "selected";
        }
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}


const updateRate = async () => {
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 0) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];


    price = rate * amtVal;

    msgInnerText = `${amtVal} ${fromCurr.value} = ${price} ${toCurr.value}`

    msg.innerText = msgInnerText;
}

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateRate();
})

window.addEventListener("load", () => {
    updateRate();
    updateFlag();
})