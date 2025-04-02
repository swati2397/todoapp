document.addEventListener("DOMContentLoaded", loadTasks);
        
        function addTask() {
            let taskInput = document.getElementById("taskInput");
            let taskText = taskInput.value.trim();
            if (taskText === "") return;
            
            let taskList = document.getElementById("taskList");
            let li = document.createElement("li");
            li.innerHTML = `
                <span class="task-text">${taskText}</span>
                <div>
                    <button class="edit" onclick="editTask(this)"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button class="delete" onclick="removeTask(this)">X</button>
                </div>
            `;
            li.onclick = (event) => {
                if (!event.target.classList.contains("edit") && !event.target.classList.contains("delete")) {
                    li.classList.toggle("done");
                    saveTasks();
                }
            };
            
            taskList.appendChild(li);
            saveTasks();
            taskInput.value = "";
        }
        
        function editTask(button) {
            let li = button.closest("li");
            let span = li.querySelector(".task-text");
            let taskInput = document.getElementById("taskInput");
            
            taskInput.value = span.innerText;
            taskInput.focus();
            
            removeTask(button);
        }
        
        function removeTask(button) {
            button.closest("li").remove();
            saveTasks();
        }
        
        function saveTasks() {
            let tasks = [];
            document.querySelectorAll("#taskList li").forEach(li => {
                tasks.push({
                    text: li.querySelector(".task-text").innerText,
                    done: li.classList.contains("done")
                });
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
        
        function loadTasks() {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            let taskList = document.getElementById("taskList");
            tasks.forEach(task => {
                let li = document.createElement("li");
                li.innerHTML = `
                    <span class="task-text">${task.text}</span>
                    <div>
                        <button class="edit" onclick="editTask(this)"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="delete" onclick="removeTask(this)">X</button>
                    </div>
                `;
                if (task.done) li.classList.add("done");
                li.onclick = (event) => {
                    if (!event.target.classList.contains("edit") && !event.target.classList.contains("delete")) {
                        li.classList.toggle("done");
                        saveTasks();
                    }
                };
                taskList.appendChild(li);
            });
        }