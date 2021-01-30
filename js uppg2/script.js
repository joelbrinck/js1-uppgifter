const form = document.querySelector('#form');
const input = document.querySelector('#input');
const output = document.querySelector('#output');


let todos = [];


const fetchTodos = async () => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
    const data = await res.json();
  
    todos = data;
    listTodos();
  }
  catch(error) {
    console.log(error);
  }
}
fetchTodos();


const createTodo = async (title) => {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos',{
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  });
  const data = await res.json();

  todos.unshift(data);
  listTodos();
  }
  catch(error) {
    console.log(error);
  }
}


const listTodos = () => {
  output.innerHTML = '';
  todos.forEach(todo => {
    newTodo(todo);
  })
}


const validate = (input) => {
  const error = document.querySelector('#error');

  if(input.value.trim() === '') {
    error.innerText = 'Textfältet är tomt';
    input.focus();
    return false;
  }
  else {
    error.innerText = '';
    return true;
  }
}


const newTodo = (todo) => {
  let div = document.createElement('div')
  div.classList.add('border', 'border-dark', 'rounded-end', 'todo-bg', 'bg-warning', 'p-2', 'my-3');
  div.setAttribute("id", `${todo.id}`);

  let innerDiv = document.createElement('div');
  innerDiv.classList.add('d-flex', 'justify-content-between', 'align-items-center');

  let title = document.createElement('h4');
  title.classList.add('title', 'd-flex');
  title.innerText = todo.title;

  let btnDiv = document.createElement('div');
  btnDiv.classList.add('btn-group');

  let btnCheck = document.createElement('button');
  btnCheck.classList.add('btn', 'btn-dark', 'text-nowrap');
  btnCheck.innerText = 'Klar';

  let btnDelete = document.createElement('button');
  btnDelete.classList.add('btn', 'btn-danger', 'btn-disable');
  btnDelete.innerText = 'Radera';
  
  innerDiv.appendChild(title);
  innerDiv.appendChild(btnDiv);
  btnDiv.appendChild(btnCheck);
  btnDiv.appendChild(btnDelete);
  div.appendChild(innerDiv);
  output.appendChild(div);

  if(todo.completed === true) {
    title.classList.add('check');
    btnCheck.innerText = 'Ej klar';
    btnCheck.classList.remove('btn-dark');
    btnCheck.classList.add('btn-outline-dark');
    btnDelete.classList.remove('btn-disable');
  }

  btnCheck.addEventListener('click', (e) => {
    e.target.parentElement.previousSibling.classList.toggle('check');
    e.target.nextSibling.classList.toggle('btn-disable');
    e.target.classList.toggle('btn-dark');
    e.target.classList.toggle('btn-outline-dark');
    if(e.target.innerText === 'Klar') {
      e.target.innerText = 'Ej Klar';
      todo.completed = true;
    } else {
      e.target.innerText = 'Klar';
      todo.completed = false;
    }
  });

  btnDelete.addEventListener('click', (e) => {
    todos = todos.filter(todo => todo.id != e.target.parentElement.parentElement.parentElement.id);
    listTodos();
  });
}


form.addEventListener('submit', e => {
  e.preventDefault();
  
  if(validate(input)) {
    createTodo(input.value);
    input.value = '';
  }
  input.focus();
})