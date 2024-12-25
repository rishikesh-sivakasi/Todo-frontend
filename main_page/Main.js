
document.getElementById('userName').innerHTML = sessionStorage.getItem('userName');

if (!sessionStorage.getItem('userName')) {
    window.location.replace('index.html') ; 
}

document.getElementById('task').addEventListener('submit', (event) => {
    event.preventDefault();

    let taskInput = document.getElementById('taskValue');
    let task = taskInput.value.trim(); 

    if (task) {
        const taskDiv = document.getElementById('list-task');
        const taskElement = document.createElement("div");
        taskElement.className = "task-item";
        taskElement.innerText = task;
        taskElement.style = "font-size:25px";
        
        const arrow = document.createElement("span");
        arrow.className = "arrow";
        arrow.innerHTML = "<img src='right.png' alt='arrow'>";

        const taskElementDiv = document.createElement("div");
        taskElementDiv.className = "task-div";

        const complete = document.createElement("span");
        complete.className = "complete";
        complete.innerHTML = "COMPLETED";

        const close = document.createElement("span");
        close.className = "close";
        close.innerHTML = "DELETE";
        const email = sessionStorage.getItem('email');

        complete.addEventListener("click",()=>{

            fetch('http://172.17.59.155:8080/Todo_Backend/updateTask', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({email,task})
            }).then((res)=>{
                if(res.ok){
                    console.log("Task Completed");
                }
            }).catch((err)=>{
                console.error(err);
            })

            taskDiv.removeChild(taskElementDiv);

        })

        close.addEventListener("click",()=>{

            fetch('http://172.17.59.155:8080/Todo_Backend/deleteTask', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, task })
              })
              .then((res) => {
                if (res.ok) {
                  console.log('Task deleted successfully');
                } else {
                  console.error('Task deletion failed');
                }
              })
              .catch((err) => console.error(err));
            
            taskDiv.removeChild(taskElementDiv);

        })
        
        taskElementDiv.appendChild(arrow);
        taskElementDiv.appendChild(taskElement);
        taskElementDiv.appendChild(complete);
        taskElementDiv.appendChild(close);
        taskDiv.appendChild(taskElementDiv);

        fetch('http://172.17.59.155:8080/Todo_Backend/addTask', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email,task,status:"pending"})
        }).then((res)=>{
            if(res.ok){
                console.log("Task Added");
            }
        }).catch((err)=>{
            console.error(err);
        })

        taskInput.value = "";
    } else {
        alert("Please enter a valid task.");
    }
});

document.getElementById("logout").addEventListener("click",()=>{
    fetch('http://172.17.59.155:8080/Todo_Backend/logout', {
        method: 'POST',
    }).then((res)=>{
        if(res){
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('email');
            window.location.href = 'index.html';
        }
    }).catch((err)=>{
        console.error(err);
    })
})

document.addEventListener('DOMContentLoaded', function() {
    const email = sessionStorage.getItem('email');
    const status = 'pending';

    fetch('http://172.17.59.155:8080/Todo_Backend/fetchTask', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email,status})
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch pending tasks');
        }
        return response.json();
    })
    .then(tasks => {
        const tasksContainer = document.getElementById('list-task');

        if (tasks.length === 0) {
            return;
        }
        tasks.forEach(t => {
            const task = t.task;
            const taskElement = document.createElement("div");
            taskElement.className = "task-item";
            taskElement.innerText = task;
            taskElement.style = "font-size:25px";
            
            const arrow = document.createElement("span");
            arrow.className = "arrow";
            arrow.innerHTML = "<img src='right.png' alt='arrow'>";

            const taskElementDiv = document.createElement("div");
            taskElementDiv.className = "task-div";

            const complete = document.createElement("span");
            complete.className = "complete";
            complete.innerHTML = "COMPLETED";

            const close = document.createElement("span");
            close.className = "close";
            close.innerHTML = "DELETE";

            complete.addEventListener("click",()=>{

                fetch('http://172.17.59.155:8080/Todo_Backend/updateTask', {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify({email,task})
                }).then((res)=>{
                    if(res.ok){
                        console.log("Task Completed");
                    }
                }).catch((err)=>{
                    console.error(err);
                })

                tasksContainer.removeChild(taskElementDiv);

            })

            close.addEventListener("click",()=>{

                fetch('http://172.17.59.155:8080/Todo_Backend/deleteTask', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, task })
                })
                .then((res) => {
                    if (res.ok) {
                    console.log('Task deleted successfully');
                    } else {
                    console.error('Task deletion failed');
                    }
                })
                .catch((err) => console.error(err));
                
                tasksContainer.removeChild(taskElementDiv);

            })

            taskElementDiv.appendChild(arrow);
            taskElementDiv.appendChild(taskElement);
            taskElementDiv.appendChild(complete);
            taskElementDiv.appendChild(close);
            tasksContainer.appendChild(taskElementDiv);

            });
        })
        .catch(error => {
            console.error(error);
        });
});

document.getElementById('completed').addEventListener('click',()=>{
    const email = sessionStorage.getItem('email');
    const status = 'completed';
    const tasksContainer = document.getElementById('list-task');
    tasksContainer.innerHTML=''

    const text = document.createElement('div');
    text.className = "text"
    const textSpan = document.createElement('span');
    textSpan.innerText = "Completed Task";
    textSpan.style.paddingBottom = "20px";
    text.appendChild(textSpan);
    tasksContainer.appendChild(text);

    fetch('http://172.17.59.155:8080/Todo_Backend/fetchTask', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({email,status})
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch pending tasks');
        }
        return response.json();
    })
    .then(tasks => {
        const goback = document.createElement("span");
        goback.id = "go";
        goback.innerText = "GO BACK";
        const taskElementDiv = document.createElement("div");
        taskElementDiv.className = "go-back";

        if (tasks.length === 0) {
            taskElementDiv.appendChild(goback);
            tasksContainer.appendChild(taskElementDiv);

            goback.addEventListener('click',()=>{
                location.reload();
            }) 
            return;
        }
        tasks.forEach(t => {
            const task = t.task;
            const taskElement = document.createElement("div");
            taskElement.className = "task-item";
            taskElement.innerText = task;
            taskElement.style = "font-size:25px";
            
            const arrow = document.createElement("span");
            arrow.className = "arrow";
            arrow.innerHTML = "<img src='/images/right.png' alt='arrow'>";

            const complete = document.createElement("span");
            complete.className = "complete";
            complete.innerHTML = t.date;

            const taskElementDiv = document.createElement("div");
            taskElementDiv.className = "task-div";

            taskElementDiv.appendChild(arrow);
            taskElementDiv.appendChild(taskElement);
            taskElementDiv.appendChild(complete);
            tasksContainer.appendChild(taskElementDiv);

            });
            
            taskElementDiv.appendChild(goback);
            tasksContainer.appendChild(taskElementDiv);

            goback.addEventListener('click',()=>{
                location.reload();
            })  

        })
        .catch(error => {
            console.error(error);
        });
})
