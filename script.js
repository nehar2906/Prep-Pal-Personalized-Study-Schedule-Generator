// =======================
// Digital Clock (top bar)
// =======================
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

// =======================
// To-do List
// =======================
const todoList = document.getElementById("todo-list");
const addTaskBtn = document.getElementById("add-task");
const newTaskInput = document.getElementById("new-task");

addTaskBtn.addEventListener("click", () => {
  const taskText = newTaskInput.value.trim();
  if (taskText !== "") {
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox"> ${taskText}`;
    todoList.appendChild(li);
    newTaskInput.value = "";
  }
});

// =======================
// Slideshow
// =======================
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide() {
  slides.forEach((slide, i) => {
    slide.style.display = i === slideIndex ? "block" : "none";
  });
  slideIndex = (slideIndex + 1) % slides.length;
}
setInterval(showSlide, 3000);
showSlide();

// =======================
// Analog Clock
// =======================
const canvas = document.getElementById("analogClock");
const ctx = canvas.getContext("2d");
const radius = canvas.height / 2;
ctx.translate(radius, radius);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();

  ctx.strokeStyle = "#333";
  ctx.lineWidth = 5;
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "#333";
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  ctx.font = radius * 0.15 + "px Poppins";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (let num = 1; num <= 12; num++) {
    let ang = (num * Math.PI) / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  // Hour hand
  hour = hour % 12;
  hour =
    (hour * Math.PI) / 6 +
    (minute * Math.PI) / (6 * 60) +
    (second * Math.PI) / (360 * 60);
  drawHand(ctx, hour, radius * 0.5, 6);

  // Minute hand
  minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
  drawHand(ctx, minute, radius * 0.8, 4);

  // Second hand
  second = (second * Math.PI) / 30;
  drawHand(ctx, second, radius * 0.9, 2, "red");
}

function drawHand(ctx, pos, length, width, color = "#333") {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.strokeStyle = color;
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

setInterval(drawClock, 1000);
drawClock();
// =======================
// Subjects Page Logic
// =======================
const subjectInput = document.getElementById("subject-input");
const priorityInput = document.getElementById("priority-input");
const addSubjectBtn = document.getElementById("add-subject");
const subjectList = document.getElementById("subject-list");

if (addSubjectBtn) {
  addSubjectBtn.addEventListener("click", () => {
    const subject = subjectInput.value.trim();
    const priority = priorityInput.value;

    if (subject !== "") {
      const li = document.createElement("li");
      li.innerHTML = `
        ${subject}
        <span class="priority ${priority}">${priority}</span>
        <button class="delete-btn">✖</button>
      `;

      // Delete subject
      li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
      });

      subjectList.appendChild(li);
      subjectInput.value = "";
    }
  });
}
