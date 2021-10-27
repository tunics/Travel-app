const todoInput = document.getElementById("todo-input");
const todoBtn = document.getElementById("todo-submit");
const htmlList = document.getElementById("list");

let packingList = [];

function updateUiList(list) {
    let txtList = "";

    for (let i = 0; i < list.length; i++) {
        txtList += `<li>${list[i]}<button id="item-remove-${i}" onclick="Client.itemRemoval(event, ${i})"><span class="material-icons">
        delete_outline</span></button></li>`;
    }
    htmlList.innerHTML = txtList;
}

function itemRemoval(event, n) {
    event.preventDefault();
    let txtList = packingList;

    for (let i = 0; i < packingList.length; i++) {
        if (i == n) {
            packingList.splice(i, 1);
        }
    }
    updateUiList(packingList);
    console.log(packingList);
    return packingList;
}

function addToList(event) {
    event.preventDefault();

    packingList.push(todoInput.value);
    todoInput.value = ""; //clear input

    updateUiList(packingList);
    console.log(packingList);
    return packingList;
}

export { addToList, itemRemoval };
