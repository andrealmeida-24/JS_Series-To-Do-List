"use strict";

const inputTxt = document.getElementById("input--txt");
const inputBtn = document.getElementById("add-task--btn");
const parentContainer = document.getElementById("full-container");
const modalWindow = document.getElementById("myModal");
const fullListContainer = document.querySelector(".new-full-container");
const closeFullListContainer = document.getElementById("close-new--btn");
const reloadPageBtn = document.getElementById("reload-page--btn");
const tasksCompletedContainer = document.querySelector(
  ".tasks-completed-container"
);
const completedTasksTxt = document.getElementById("modular--txt");

const addTask = function () {
  let taskTxt = String(inputTxt.value);

  function createTask() {
    const txtToLowerCase = taskTxt.toLowerCase();
    const txtFinal =
      txtToLowerCase.slice(0, 1).toUpperCase() + txtToLowerCase.slice(1);

    //Creating new div to insert the task elements
    const newDivTask = document.createElement("div");
    parentContainer.appendChild(newDivTask);
    newDivTask.classList.add("task-row");

    //Creating the text of the new div
    const newTaskTxt = document.createElement("h2");
    newTaskTxt.textContent = txtFinal;
    newDivTask.appendChild(newTaskTxt);

    //Creating delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "DEL";
    newDivTask.appendChild(deleteBtn);
    deleteBtn.classList.add("task-delete--btn");
    deleteBtn.setAttribute("id", "deleteBtn");

    inputTxt.value = "";

    const current_tasks = document.getElementsByClassName("task-delete--btn");
    for (let i = 0; i < current_tasks.length; i++) {
      current_tasks[i].addEventListener("click", function () {
        this.parentNode.classList.add("mark-as-done");
        current_tasks[i].classList.add("visibility");
        const tasks = [document.getElementsByClassName("mark-as-done")];
        if (tasks[0].length === current_tasks.length) {
          tasksCompleted();
        }
      });
    }

    function reloadPage() {
      location.reload();
    }

    function tasksCompleted() {
      modalWindow.style.visibility = "visible";
      tasksCompletedContainer.style.visibility = "visible";
      if (current_tasks.length === 1) {
        completedTasksTxt.textContent = `You've completed your ${current_tasks.length} task for today. 🥳`;
      } else {
        completedTasksTxt.textContent = `You've completed all your ${current_tasks.length} tasks for today. 🥳`;
      }
      setTimeout(reloadPage, 4000);
    }

    function listFull() {
      modalWindow.style.visibility = "visible";
      fullListContainer.style.visibility = "visible";

      closeFullListContainer.addEventListener("click", function () {
        modalWindow.style.visibility = "hidden";
        fullListContainer.style.visibility = "hidden";
      });

      reloadPageBtn.addEventListener("click", function () {
        location.reload();
      });
    }

    if (current_tasks.length >= 7) {
      listFull();
    }
  }

  taskTxt != "" ? createTask() : alert("Please insert a valid task!");
};

inputBtn.addEventListener("click", addTask);
