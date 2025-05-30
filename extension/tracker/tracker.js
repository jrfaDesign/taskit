// Mock session (replace later with real auth check)
const user = { id: "user123", name: "Jane" }; // set to null to test logged-out UI

// Mock tasks for today
const tasks = [
  { id: 1, title: "Write focus timer", done: false },
  { id: 2, title: "Design dashboard", done: true },
];

// UI logic
const app = document.getElementById("app");

function renderLoggedOut() {
  app.innerHTML = `
    <h3>You're not logged in</h3>
    <button id="login-btn">Login</button>
  `;
  document.getElementById("login-btn").addEventListener("click", () => {
    console.log("Login clicked — no backend yet.");
  });
}

function renderLoggedIn(user, tasks) {
  app.innerHTML = `<h3>Hello, ${user.name}</h3>`;

  const taskList = tasks.filter(task => !task.done);
  const doneTasks = tasks.filter(task => task.done);

  if (tasks.length === 0 || taskList.length === 0) {
    app.innerHTML += `<p>No active tasks.</p>`;
    app.innerHTML += `<button id="create-btn">Create New Task</button>`;
  } else {
    app.innerHTML += `<div><strong>Today’s Tasks:</strong></div>`;
    taskList.forEach(task => {
      app.innerHTML += `<div class="task">${task.title}</div>`;
    });

    if (doneTasks.length > 0) {
      app.innerHTML += `
        <button id="start-btn">Start Working</button>
        <button id="create-btn">Create New Task</button>
      `;
    }
  }

  document.getElementById("create-btn")?.addEventListener("click", () => {
    console.log("Create new task clicked");
  });

  document.getElementById("start-btn")?.addEventListener("click", () => {
    console.log("Start working clicked");
  });
}

// Boot logic
if (!user) {
  renderLoggedOut();
} else {
  renderLoggedIn(user, tasks);
}
