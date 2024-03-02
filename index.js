const dialog = document.querySelector('dialog');
const showButton = document.querySelector('#btn-add');
const closeButton = document.querySelector('#btn-close');

showButton.addEventListener('click', () => {
  dialog.showModal();
});

closeButton.addEventListener('click', () => {
  dialog.close();
});
