import { getStuff } from "./getData.js";
import { addStuff } from "./getData.js";
import { removeStuff } from "./getData.js";
import { clear } from "./getData.js";
import { list } from "./getData.js";

import { budget } from "./getData.js";
import { setBudget } from "./getData.js";

let totalSpent = 0;

class Expense{
    name;
    amount;

    constructor(n, a){
        this.name = n;
        this.amount = a;
    }
}

const add = document.getElementById("add");
const clearBtn = document.getElementById("clearBtn");
const inputName = document.getElementById("inputName");
const inputSpent = document.getElementById("inputSpent");
const warning = document.getElementById("warning");
const modal = new bootstrap.Modal(document.getElementById('exampleModal'));

const inputBudget = document.getElementById("inputBudget");
const submit = document.getElementById("submit");
const current = document.getElementById("current");
const total = document.getElementById("total");
const remain = document.getElementById("remain");
const container = document.getElementById("container");
const warning2 = document.getElementById("warning2");
const resetBudegt = document.getElementById("resetBudegt");

current.innerText = "Current Budget: $"+budget;
getTotal();
populate();

submit.addEventListener('click', () => {
    if(parseFloat(inputBudget.value)){
        setBudget(parseFloat(inputBudget.value));
        current.innerText = "Current Budget: $"+budget;
        getTotal();
    }
    else{
        warning2.innerText = "Please only enter a number.";
    }
})

resetBudegt.addEventListener('click', () => {
    setBudget(0);
    current.innerText = "Current Budget: $"+budget;
    getTotal();
})

add.addEventListener('click', function(e){
    warning.innerText = '';
    if((inputName.value != "" && inputSpent.value != "") && parseFloat(inputSpent.value)){
        addStuff(new Expense(inputName.value, parseFloat(inputSpent.value)));
        getTotal();
        populate();
        modal.hide();
    }
    else{
        warning.innerText = "Please fill out all fields. Only enter numbers into the Amount Spent.";
    }
})

clearBtn.addEventListener('click', () => {
    clear();
    getTotal();
    populate();
});

function getTotal(){
    let sum = 0;
    list.forEach(element => {
        sum += element.amount;
    });
    totalSpent = sum;
    total.innerText = "Total Spent: $"+totalSpent;

    remainder();
}

function remainder(){
    remain.innerText = "Remaining: $"+(budget - totalSpent);
}

function populate(){
    container.innerHTML = '';
    list.forEach(element => {
        const div = document.createElement("div");
        container.appendChild(div);

        const header = document.createElement("h3");
        header.innerText = element.name;
        div.appendChild(header);

        const thing = document.createElement("p");
        thing.innerText = "$"+element.amount;
        div.appendChild(thing);

        const btn = document.createElement("button");
        btn.className = "btn btn-warning";
        btn.innerText = "Remove";
        btn.addEventListener('click', () => {
            removeStuff(element);
            getTotal();
            populate();
        })
        div.appendChild(btn);

        container.appendChild(document.createElement("hr"));
    });
}