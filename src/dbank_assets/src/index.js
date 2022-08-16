import {dbank} from "../../declarations/dbank";

window.addEventListener("load", async () => {
    update();
})

document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = event.target.querySelector("#submit-btn");
    
    const inputAmount = parseFloat(document.getElementById("input-amount").value);
    const withdrawAmount = parseFloat(document.getElementById("withdraw-amount").value);

    button.setAttribute("disabled", true);
    
    if (document.getElementById("input-amount").value.length != 0) {
        await dbank.topUp(inputAmount);
    } 
    
    if (document.getElementById("withdraw-amount").value.length != 0) {
        await dbank.withdraw(withdrawAmount);
    }

    dbank.compound();

    update();

    document.getElementById("input-amount").value = "";
    document.getElementById("withdraw-amount").value = "";

    button.removeAttribute("disabled");
})

async function update () { 
    const currentAmount = await dbank.checkBalance();
    document.getElementById("value").innerText = currentAmount.toFixed(2);
 }