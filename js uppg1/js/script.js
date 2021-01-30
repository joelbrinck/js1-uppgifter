let users = []
let changeUser;

const form = document.querySelector('#user-form');
const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const email = document.querySelector('#email');
const userList = document.querySelector('#user-list');
const addBtn = document.querySelector('#addBtn');

const listUsers = () => {
  userList.innerHTML = ''

  users.forEach(user => {
    userList.innerHTML += `<div id="${user.id}" class="bg-white border rounded py-1 px-2 d-flex justify-content-between align-items-center mt-1"> <div> <div>${user.firstName} ${user.lastName}</div><small>${user.email}</small></div><div><button class="btn btn-primary px-3 change-btn">Change</button> <button class="btn btn-danger px-3 remove-btn">Remove</button></div></div>` 
  });
}

function validateFirstName() {
  const firstNameValue = firstName.value.trim();
  const errorMsgFirstName = document.querySelector('.error-msg-first-name');

  function validFirstName(firstName) {
    return /^[a-zåäöA-ZÅÄÖ\-\’]+$/.test(firstName);
  }

  if(firstNameValue === '' || firstNameValue.length < 2 || firstNameValue.length > 15) {
    firstName.classList.add('is-invalid');
    errorMsgFirstName.innerHTML = 'Enter a first name, it should be between 2-15 letters';
    firstName.focus();    
  } else if(!validFirstName(firstNameValue)) {
    firstName.classList.add('is-invalid');
    errorMsgFirstName.innerHTML = 'First name can only contain letters a-ö';
    firstName.focus();    
  } else {
    firstName.classList.remove('is-invalid');
    errorMsgFirstName.innerHTML = '';
    firstName.classList.add('is-valid');    
  }
}

function validateLastName() {
  const lastNameValue = lastName.value.trim();
  const errorMsgLastName = document.querySelector('.error-msg-last-name');
  
  function validLastName(lastName) {
    return /^[a-zåäöA-ZÅÄÖ\-\’]+$/.test(lastName);
  }

  if(lastNameValue === '' || lastNameValue.length < 2 || lastNameValue.length > 15) {
    lastName.classList.add('is-invalid');
    errorMsgLastName.innerHTML = 'Enter a last name, it should be between 2-15 letters';
    lastName.focus();    
  } else if(!validLastName(lastNameValue)) {
    lastName.classList.add('is-invalid');
    errorMsgLastName.innerHTML = 'Last name can only contain letters a-ö';
    lastName.focus();    
  } else {
    lastName.classList.remove('is-invalid');
    errorMsgLastName.innerHTML = '';
    lastName.classList.add('is-valid');    
  }
}

function validateEmail() {
  const emailValue = email.value.trim();
  const errorMsgEmail = document.querySelector('.error-msg-email');
  
  function validEmail(email) {
    return /^\w+([\.-]?\w+)+@\w+([\.:]?\w+)+(\.[a-zA-Z0-9]{2,3})+$/.test(email);
  }

  if(emailValue === '') {
    email.classList.add('is-invalid');
    errorMsgEmail.innerHTML = 'Enter an email adresss';
    email.focus();    
  } else if(!validEmail(emailValue)) {
    email.classList.add('is-invalid');
    errorMsgEmail.innerHTML = 'Email is not valid. Valid example: someone@example.com';
    email.focus();    
  } else {
    email.classList.remove('is-invalid');
    errorMsgEmail.innerHTML ='';
    email.classList.add('is-valid');   
  }
}

function emailTaken() {
  const emailValue = email.value.trim();
  const emailTaken = users.some(user => user.email === emailValue);
  const errorMsgEmail = document.querySelector('.error-msg-email');

  if(emailTaken) {
    email.classList.add('is-invalid');
    errorMsgEmail.innerHTML = 'Email is already taken';
    email.focus();
    return false    
  } else {
    return true
  }
}

function addUser() {
  if(!addBtn.classList.contains('btn-success')) {
  let user = {
    id: Date.now().toString(),
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
  };

  users.push(user);
  listUsers();
  form.reset();
} else if(addBtn.classList.contains('btn-success')) {
    users = users.map(user => {
      if(user.id === changeUser[0].id) 
        user = {
        id: user.id,
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
      }; 
      return user;
    });
   
    listUsers();
    form.reset(); 
    
    addBtn.classList.remove('btn-success');
    addBtn.value = 'Add User';
  }
}

listUsers();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  validateFirstName();
  validateLastName();
  validateEmail();
  
  if(!firstName.classList.contains('is-invalid') && !lastName.classList.contains('is-invalid') && !email.classList.contains('is-invalid') && !addBtn.classList.contains('btn-success') && emailTaken()) {
    document.querySelectorAll('.is-valid').forEach(valid => valid.classList.remove('is-valid'));
    addUser();
  } else if(!firstName.classList.contains('is-invalid') && !lastName.classList.contains('is-invalid') && !email.classList.contains('is-invalid') && addBtn.classList.contains('btn-success')) {
    document.querySelectorAll('.is-valid').forEach(valid => valid.classList.remove('is-valid'));
    if(changeUser[0].email === email.value) {
      addUser();
    } else if(!(changeUser[0].email === email.value) && emailTaken()){
      addUser();
    }
  }
});

userList.addEventListener('click', (e) => {
  if(e.target.classList.contains('remove-btn') && !addBtn.classList.contains('btn-success')) {
    users = users.filter(user => user.id !== e.target.parentNode.parentNode.id);
  } else if(e.target.classList.contains('change-btn') && !addBtn.classList.contains('btn-success')) {
    changeUser = users.filter(user => user.id === e.target.parentNode.parentNode.id);
    firstName.value = changeUser[0].firstName;
    lastName.value = changeUser[0].lastName;
    email.value = changeUser[0].email; 
  
    addBtn.value = 'Save';
    addBtn.classList.add('btn-success');
  } 
  listUsers();
});