function orderModal() {
    let surname = document.querySelector("#surname").value;
    let name = document.querySelector("#name").value;
    let cost = document.querySelector(".cost").textContent;

    alert(`Заказчик: ${surname} ${name}\nИтого: ${cost}р.`);
}

function costCounter() {
    let total = 0;
    order.forEach(element => {
        total += parseInt(element.cost) * parseInt(element.quantity);
    });
    cost.textContent = total;
}

let inputs = document.getElementsByTagName("input");

for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].type == "checkbox") inputs[i].checked = false;
    if (inputs[i].type == "text") inputs[i].value = "";
}

let order = new Set();
let cost = document.querySelector(".cost");

let menu = document.querySelectorAll(".coffee");

for (let i = 0; i < menu.length; i++) {
    let coffeeCheckbox = menu[i].querySelector(".coffee__checkbox");
    let coffeeInput = menu[i].querySelector(".coffee__input");

    let coffee = {
        name: menu[i].querySelector(".coffee__label").textContent,
        cost: parseInt(coffeeCheckbox.value),
        quantity: 1
    };

    coffeeCheckbox.addEventListener('change', () => {
        if (coffeeCheckbox.checked) {
            order.add(coffee);
            coffeeInput.style.pointerEvents = "all";
            coffeeInput.style.opacity = "1";
            coffeeInput.value = 1;
        } else {
            coffee.quantity = 1;
            order.delete(coffee);
            coffeeInput.style.pointerEvents = "none";
            coffeeInput.style.opacity = "0.65";
            coffeeInput.value = 0;
        }
        costCounter();
    });

    coffeeInput.addEventListener('change', () => {
        if (coffeeInput.value <= 0 || isNaN(parseInt(coffeeInput.value))) {
            coffeeInput.value = 0;
            coffee.quantity = 1;
            order.delete(coffee);
            coffeeCheckbox.checked = false;
            coffeeInput.style.pointerEvents = "none";
            coffeeInput.style.opacity = "0.65";
        }
        else coffee.quantity = parseInt(coffeeInput.value);
        costCounter();
    });
}