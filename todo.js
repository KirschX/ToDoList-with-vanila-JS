const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

let toDos = [];

// todolist localstorage에 저장
function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

// 삭제
function deleteToDo(event) {
  let li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((item) => item.id !== parseInt(li.id));
  saveToDos();
}

// 업데이트
function update(text, id) {
  event.target.parentElement.children[0].innerText = text;
  event.target.remove();

  toDos.map((item) => {
    if (item.id === parseInt(id)) {
      item.text = text;
    }
  });

  saveToDos();
}

function updateToDo(event) {
  let li = event.target.parentElement;
  let inputElem = document.createElement("input");
  inputElem.style.position = "absolute";
  let inputText = event.target.parentElement.children[0].innerText;
  inputElem.value = inputText;

  inputElem.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      update(e.target.value, li.id);
    }
  });

  li.appendChild(inputElem);
}

// 생성
function paintToDo(newToDo) {
  const li = document.createElement("li");
  li.id = newToDo.id;
  const span = document.createElement("span");
  const buttonDelete = document.createElement("button");
  const buttonUpdate = document.createElement("button");
  li.appendChild(span);
  li.appendChild(buttonUpdate);
  li.appendChild(buttonDelete);
  buttonDelete.addEventListener("click", deleteToDo);
  buttonUpdate.addEventListener("click", updateToDo);
  buttonUpdate.innerText = "수정";
  buttonDelete.innerText = "삭제";
  span.innerText = newToDo.text;
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;

  const newToDoObj = {
    text: newToDo,
    id: Date.now(),
  };

  toDos.push(newToDoObj);
  toDoInput.value = "";

  paintToDo(newToDoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem("todos");

// 첫 시작시 localstorage에서 저장된 toDoList 가져오기
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  console.log(parsedToDos);
  parsedToDos.forEach(paintToDo);
}
