export { list };
export { addStuff };
export { getStuff };
export { removeStuff };
export { clear };

export { setBudget };
export { budget };

let list = [];
let budget = 0;

getBudgetLocalStorage();
getStuff();

function getStuff(){
    if(localStorage.getItem("list") != undefined){
        list = JSON.parse(localStorage.getItem("list"));
    }
}

function pushStuff(){
    localStorage.setItem("list", JSON.stringify(list));
    console.log(list);
}

function addStuff(object){
    list.push(object);
    pushStuff();
}

function removeStuff(object){
    list.splice(list.indexOf(object), 1);
    pushStuff();
}

function clear(){
    list = [];
    pushStuff();
}

function setBudget(number){
    budget = number;
    localStorage.setItem("budget", budget);
}

function getBudgetLocalStorage(){
    if(localStorage.getItem("budget") != undefined){
        budget = localStorage.getItem("budget");
    }
}