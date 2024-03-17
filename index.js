const dialog = document.querySelector('dialog');
const showButton = document.querySelector('#btn-add');
const closeButton = document.querySelector('#btn-close');

showButton.addEventListener('click', () => {
  resetForm();
  dialog.showModal();
});

closeButton.addEventListener('click', () => {
  dialog.close();
});

const studentForm = document.getElementById('student-form');
const table = document.querySelector('table tbody');

populateTable();

table.addEventListener('click', (event) => {
  const target = event.target;
  const id = target.getAttribute('student-id');

  if (target.classList.contains('edit-btn')) {
    dialog.showModal();

    const student = getStudentList().find((student) => id == student.id);

    document.getElementById('student-id').value = student.id;
    document.getElementById('name').value = student.name;
    document.getElementById('email').value = student.email;
    document.getElementById('course').value = student.course;
  } else if (target.classList.contains('delete-btn')) {
    const row = target.parentNode.parentNode;
    const newStudentList = getStudentList().filter(
      (student) => id != student.id
    );

    document.querySelector('table').deleteRow(row.rowIndex);

    localStorage.setItem('studentList', JSON.stringify(newStudentList));
  }
});

studentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(studentForm);

  const isEditMode = formData.get('id') != '';

  if (isEditMode) {
    editForm(formData);
  } else {
    addForm(formData);
  }

  resetForm();
  dialog.close();
});

// EDIT FUNCTION

const editForm = (formData) => {
  const studentForm = formDataToObject(formData);
  const studentList = getStudentList();

  const studentIndex = getStudentList().findIndex(
    (student) => studentForm.id == student.id
  );

  if (studentIndex == -1) return;

  studentList[studentIndex] = {
    ...studentList[studentIndex],
    ...studentForm,
  };

  localStorage.setItem('studentList', JSON.stringify(studentList));

  document.querySelector('#std_' + studentForm.id).innerHTML =
    tableRowHTML(studentForm);
};

// ADD FUNCTION

const addForm = (formData) => {
  formData.append('id', generateRandomId());

  const student = formDataToObject(formData);

  const studentList = getStudentList();
  studentList.push(student);

  localStorage.setItem('studentList', JSON.stringify(studentList));

  const newRow = table.insertRow(-1);
  newRow.id = 'std_' + student.id;
  newRow.innerHTML = tableRowHTML(student);
};

// READ FUNCTIONALITY

function populateTable() {
  let tableRow = '';
  getStudentList().forEach((student) => {
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
  return `<tr id='std_${student.id}'>
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

function resetForm() {
  document.querySelector('#student-id').value = '';
  studentForm.reset();
}

function getStudentList() {
  return JSON.parse(localStorage.getItem('studentList')) || [];
}
