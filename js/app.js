
(function () {

    // HTML elements
    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const errorMsg = document.getElementById("error-msg");
    const counter = document.getElementById("counter");

    const filterAll = document.getElementById("filter-all");
    const filterActive = document.getElementById("filter-active");
    const filterDone = document.getElementById("filter-done");

    let currentFilter = "all";


    // Add new task
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const taskText = input.value.trim();

        if (taskText === "") {
            errorMsg.classList.remove("hidden");
            return;
        }

        errorMsg.classList.add("hidden");

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.classList.add("item-text");
        span.textContent = taskText;

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";

        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);

        input.value = "";

        applyFilter();
        updateCounter();
    });


    // Handle task clicks using event delegation
    todoList.addEventListener("click", function (event) {

        if (event.target.classList.contains("delete-btn")) {
            const li = event.target.closest("li");
            li.remove();

            updateCounter();
        }

        else if (event.target.classList.contains("item-text")) {
            const li = event.target.closest("li");
            li.classList.toggle("completed");

            applyFilter();
            updateCounter();
        }

    });


    // Apply the selected filter
    function applyFilter() {

        const items = todoList.querySelectorAll("li");

        items.forEach(function (item) {

            const isCompleted = item.classList.contains("completed");

            if (currentFilter === "all") {
                item.style.display = "";
            }
            else if (currentFilter === "active") {
                item.style.display = isCompleted ? "none" : "";
            }
            else if (currentFilter === "done") {
                item.style.display = isCompleted ? "" : "none";
            }

        });
    }


    // Filter buttons
    filterAll.addEventListener("click", function () {
        currentFilter = "all";
        applyFilter();
    });

    filterActive.addEventListener("click", function () {
        currentFilter = "active";
        applyFilter();
    });

    filterDone.addEventListener("click", function () {
        currentFilter = "done";
        applyFilter();
    });


    // Update the counter
    function updateCounter() {

        const items = todoList.querySelectorAll("li");
        let remaining = 0;

        items.forEach(function (item) {
            if (!item.classList.contains("completed")) {
                remaining++;
            }
        });

        counter.textContent = remaining +
            (remaining === 1 ? " item left" : " items left");
    }

})();
