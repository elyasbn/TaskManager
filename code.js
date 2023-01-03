// Define elements
const taskTitle = document.getElementById("title");
const taskDescription = document.getElementById("description");
const taskDate = document.getElementById("date");
const taskAdd = document.getElementById("add");
const search = document.getElementById("search");
const cardsBox = document.querySelector(".tasks-list");
const form = document.querySelector("form");



let tasks;

if (localStorage.getItem('localTasks')) {
    tasks = JSON.parse(localStorage.getItem('localTasks'));

    tasks.forEach(function (item) {
        cardsBox.innerHTML += 
        `<div class="task-card">
        <div class="card-title">${item}
        <br><span class="erase"><i class="fa-solid fa-eraser"></i></span><span class="done" style="color: black"><i class="fa-regular fa-square-check"></i></span></div>
        </div>
    </div>`;
    });
} else {
    tasks = [];
}
const btnRemove = document.querySelectorAll(".erase");
const btnDone = document.querySelectorAll(".done");

removeIt(btnRemove);
markAsDone(btnDone);

taskAdd.addEventListener("click", function (e) {
    e.preventDefault();
    let title = taskTitle.value;

    if (tasks.includes(title)) {
        alert("This task is already listed!");
        form.reset();

    } else if (title == "") {
        alert("Please enter the title!");
    } else {
        tasks.push(title);
        localStorage.setItem("localTasks", JSON.stringify(tasks));
        cardsBox.innerHTML += `<div class="task-card">
        <div class="card-title">${title}
        <br><span class="erase"><i class="fa-solid fa-eraser"></i></span><span class="done" style="color: black"><i class="fa-regular fa-square-check"></i></span></div>
        </div>
    </div>`;
        form.reset();
    }
    removeIt(btnRemove);
    markAsDone(btnDone);
})

function removeIt(btn) {
            
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", function () {
            let removedText = this.parentElement.innerText.trim();
            this.parentElement.remove();
            for (let j = 0; j < tasks.length; j++) {
                if (tasks[j] == removedText) {
                    tasks.splice(j, 1);
                    localStorage.setItem("localTasks", JSON.stringify(tasks));
                    console.log(tasks);
                }
                
            }
        })
    }
}

function markAsDone(done) {
    for (let d = 0; d < done.length; d++) {
        done[d].addEventListener("click", function () {
            if (done[d].style.color == "black") {
                this.parentElement.style.textDecoration = "line-through";
                this.parentElement.style.color = "gray";
                done[d].style.color = "green";
            } else {
                this.style.color = "black";
                this.parentElement.style.textDecoration = "none";
                this.parentElement.style.color = "black";
            }
        })
        
    }
}

search.addEventListener("keyup", function () {
    let searchedValue = search.value;
    let itemBox = document.querySelectorAll(".card-title")
    
    itemBox.forEach(item => { 
        let taskText = item.innerText;
    if (taskText.startsWith(searchedValue)) {
        item.parentElement.style.display = "block";
     } else {
        item.parentElement.style.display = "none";
     }
    });
})