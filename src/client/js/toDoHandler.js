import { postData } from "./formHandler";

const todoInput = document.getElementById("todo-input");
const todoBtn = document.getElementById("todo-submit");
const htmlList = document.getElementById("list");

let packingList = [];

async function updateUiList() {
    try {
        const resp = await fetch("http://localhost:3000/toDoList");
        const data = await resp.json();
        let txtList = "";

        for (let i = 0; i < data.list.length; i++) {
            txtList += `<li>${data.list[i]}<button id="item-remove-${i}" onclick="Client.itemRemoval(event, ${i})">Remove</button></li>`;
        }
        htmlList.innerHTML = txtList;
        packingList = data.list;
        console.log(packingList);
    } catch (error) {
        console.error(error);
    }
}

function addToList(event) {
    event.preventDefault();

    packingList.push(todoInput.value);
    todoInput.value = ""; //clear input

    try {
        postData("http://localhost:3000/toDoList", {
            list: packingList,
        }).then(updateUiList());

        return packingList;
    } catch (error) {
        console.error(error);
    }
}

function itemRemoval(event, n) {
    event.preventDefault();

    for (let i = 0; i < packingList.length; i++) {
        if (i == n) {
            packingList.splice(i, 1);
        }
    }
    try {
        postData("http://localhost:3000/toDoList", {
            list: packingList,
        }).then(updateUiList());

        return packingList;
    } catch (error) {
        console.error(error);
    }
}

export { addToList, itemRemoval };
