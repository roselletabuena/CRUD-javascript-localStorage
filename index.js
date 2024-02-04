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

const table = document.querySelector('table tbody');

populateTable();

const btnDelete = document.querySelectorAll('.delete-btn');
const btnEdit = document.querySelectorAll('.edit-btn');

btnEdit.forEach((btn) => {
  const id = btn.getAttribute('student-id');

  btn.addEventListener('click', () => {
    dialog.showModal();

    const student = studentList.find((student) => id == student.id);

    document.getElementById('name').value = student.name;
    document.getElementById('email').value = student.email;
    document.getElementById('course').value = student.course;
  });
});

btnDelete.forEach((btn) => {
  const id = btn.getAttribute('student-id');
  const row = btn.parentNode.parentNode;
  const table = document.querySelector('table');

  btn.addEventListener('click', () => {
    const newStudentList = studentList.filter((student) => id != student.id);

    table.deleteRow(row.rowIndex);

    localStorage.setItem('studentList', JSON.stringify(newStudentList));
  });
});

studentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(studentForm);
  formData.append('id', generateRandomId());

  const student = formDataToObject(formData);

  studentList.push(student);
  localStorage.setItem('studentList', JSON.stringify(studentList));

  const newRow = table.insertRow(-1);
  newRow.innerHTML = tableRowHTML(student);
});

// READ FUNCTIONALITY

function populateTable() {
  let tableRow = '';
  studentList.forEach((student) => {
    tableRow += tableRowHTML(student);
  });

  table.innerHTML = tableRow;
}

// utilities

const generateRandomId = () => Math.floor(Math.random() * 99999);

const formDataToObject = (formData) => {
  const object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  return object;
};

function tableRowHTML(student) {
  return `<tr>
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
            <td class="actions">
            <button student-id="${student.id}" action-type="edit" class="edit-btn">Edit</button>
            <button student-id="${student.id}" action-type="delete" class="delete-btn">Delete</button>
            </td>
        </tr>`;
}
