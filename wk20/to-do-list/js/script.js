// Değişkenler
const taskInput = document.getElementById("task");
const taskList = document.getElementById("list");

// Sayfa yüklendiğinde localStorage'dan verileri alınması ve listeye eklenmesi
document.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(taskText => {
    addTaskToList(taskText);
  });
});

// Yeni bir görev ekleme işlemi
function newElement() {
  const taskText = taskInput.value.trim(); // Boşlukları temizle

  if (taskText === "") {
    showToast("error", "Listeye boş ekleme yapamazsınız!");
    return;
  }

  addTaskToList(taskText);
  taskInput.value = "";
}

// Görevi listeye ekleyen fonksiyon
function addTaskToList(taskText) {
  const taskItem = document.createElement("li");
  taskItem.textContent = taskText;

  // Görevi silmek için tıklama işlemi
  taskItem.addEventListener("click", () => {
    taskItem.classList.toggle("checked");
    updateLocalStorage();
  });

  taskList.appendChild(taskItem);
  showToast("success", "Listeye eklendi!");
  updateLocalStorage();
}

// Local Storage'daki verileri güncelleyen fonksiyon
function updateLocalStorage() {
  const tasks = Array.from(taskList.children).map(taskItem => ({
    text: taskItem.textContent,
    completed: taskItem.classList.contains("checked"),
  }));

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Bootstrap Toast bildirimini gösteren fonksiyon
function showToast(type, message) {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  const toastId = type === "success" ? "successToast" : "errorToast";

  const toastContainer = document.getElementById(toastId);

  if (toastContainer) {
    toastContainer.appendChild(toast);

    const toastInstance = new bootstrap.Toast(toast);
    toastInstance.show();

    toast.addEventListener("hidden.bs.toast", () => {
      toastContainer.removeChild(toast);
    });
  }
}
