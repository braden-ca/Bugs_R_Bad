// ADD TASK
var taskName = document.querySelector(".taskName");
var description = document.querySelector(".description");
var dueDate = document.querySelector(".dueDate");
var priority = document.querySelector(".priority");
var button = document.querySelector(".submit-task");

button.addEventListener("click", ()=> { // when button is clicked
  if (taskName.value && dueDate.value && priority.value) { // check values are enteres
    if (priority.value >= 1 && priority.value <= 3) { // check priority is in bounds
      // save data into an object 
      var obj={ 
        name: taskName.value,
        description: description.value || "", // Include description if it's not empty
        date: dueDate.value,
        priority: priority.value
      };
      // send data to backend (where to send data, data sent)
      fetch("http://localhost:3000/task", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },  // data being sent in vars
        body: JSON.stringify(obj) // transform json data into string
      })
    }
    else {
      console.error("Priority must be between 1 and 3");
    }
  }
  else {
    console.error("Please fill in all fields.");
  }
})

// GET TASKS FROM BACKEND
function renderTasks(tasks) { // function to show tasks in the frontend UI
  const dueToday = document.querySelector("#due-today");  // referencing html classes
  const overDue = document.querySelector("#over-due");
  const dueLater = document.querySelector("#due-later");

  dueToday.innerHTML = "";  // clear existing tasks
  overDue.innerHTML = "";
  dueLater.innerHTML = "";

  tasks.sort((a, b) => {  // sort by due date and priority
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    if (dateA < dateB) return -1; // If the result is negative, a is sorted before b.
    if (dateA > dateB) return 1;  // If the result is positive, b is sorted before a.
    // If the result is 0, no changes are done with the sort order of the two values.
    return a.priority - b.priority; // if they have the same date sort by priority
  });

  tasks.forEach(task => { // iterates through each task
    const taskItem = document.createElement("li");  // creates a list item for each task 
    const taskDetails = document.createElement("div");  // create a container for task details
    
    taskDetails.classList.add("task-details"); // add class so i can style css

    // Check if the task is overdue
    const currentDate = new Date(); // get current date
    currentDate.setHours(0, 0, 0, 0); // set the time to midnight so hours dont affect time comparison
    const dueDate = new Date(task.date);  // turn task date to date object

    if (dueDate < currentDate) {  // check if task date is overdue
      taskItem.classList.add("over-due"); // add over due class if it is
      overDue.appendChild(taskItem); // add to overdue list (ul element w overdue id)
    }
    else if (dueDate > currentDate) {
      taskItem.classList.add("due-later");
      dueLater.appendChild(taskItem);
    }
    else {
      taskItem.classList.add("due-today");
      dueToday.appendChild(taskItem); // add to regular list
    }

    // // Log the dates for debugging
    // console.log("Current Date:", currentDate);
    // console.log("Due Date:", dueDate);

    // populate task details & add a edit and delete button for each task 
    taskDetails.innerHTML = `
    <div class="task-info">
        <h3><strong>${task.name}</strong></h3>
        <p> Description: ${task.description}</p>
        <p>Due Date: ${task.date}</p>
        <p>Priority: ${task.priority}</p>
    </div>
    <div class="btns">  
        <button class="edit-btn" onclick="openEditForm('${task.id}')">Edit</button>
        <button class="delete-btn" onclick="deleteTask('${task}')">Delete</button>
    </div>    
      `;

    taskItem.appendChild(taskDetails);  // add details to each task name
  });
}

function fetchTasks() { // get tasks from backend
  fetch("http://localhost:3000")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(tasks => {
      // call renderTasks to render the retrieved tasks
      renderTasks(tasks);
    })
    .catch(error => {
      console.error("Error fetching tasks:", error);
    });
}

// call fetchTasks when page is loaded
window.addEventListener("load", fetchTasks);    

// DELETE TASK
function deleteTask(taskId) {
  fetch(`http://localhost:3000/task/${taskId}`, {
    method: "DELETE",
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      // Reload the tasks after deletion
      fetchTasks();
    })
    .catch(error => {
      console.error("Error deleting task:", error);
    });
}

// EDIT TASK 
function openEditForm(taskId) {
  // Show the edit task modal
  document.getElementById("editTaskModal").style.display = "block";

  // Prefill form fields with task information
  document.getElementById("editTaskName").value = task.name;
  document.getElementById("editDescription").value = task.description;
  document.getElementById("editDueDate").value = task.date;
  document.getElementById("editPriority").value = task.priority;
}

// Get the close button element
var closeButton = document.querySelector(".close");

// Add an event listener to the popup close button
closeButton.addEventListener("click", function() {
  // Hide the edit task modal
  document.getElementById("editTaskModal").style.display = "none";
});

  



  