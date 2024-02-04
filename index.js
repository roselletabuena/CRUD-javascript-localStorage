const dialog = document.querySelector('dialog');
const showButton = document.querySelector('#btn-add');
const closeButton = document.querySelector('#btn-close');

showButton.addEventListener('click', () => {
  dialog.showModal();
});

closeButton.addEventListener('click', () => {
  dialog.close();
});

const studentList = JSON.parse(localStorage.getItem('studentList')) || [];

const studentForm = document.querySelector('#student-form');

studentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(studentForm);
  formData.append('id', generateRandomId());

  const data = formDataToObject(formData);

  studentList.push(data);

  localStorage.setItem('studentList', JSON.stringify(studentList));

  const table = document.querySelector('table tbody');

  // Insert a new row at the last position of the table
  const newRow = table.insertRow(-1);

  newRow.innerHTML = `
    <tr>
    <td>${data.id}</td>
    <td>${data.name}</td>
    <td>${data.email}</td>
    <td>${data.course}</td>
    <td class="actions">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </td>
    </tr>

    `;
});

const generateRandomId = () => Math.floor(Math.random() * 99999);

const formDataToObject = (formData) => {
  const object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  return object;
};

const table = document.querySelector('table tbody');

let tableRow = '';

studentList.forEach(({ id, name, email, course }) => {
  tableRow += `<tr>
    <td>${id}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${course}</td>
    <td class="actions">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </td>
    </tr>`;
});

table.innerHTML = tableRow;
