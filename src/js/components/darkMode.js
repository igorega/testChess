let darkMode = localStorage.getItem('darkMode');
let triggerChecked = document.querySelector('#triggerChecked');
const darkModeToggle = document.querySelectorAll('.js-darkmodeToggle');

const enableDarkMode = () => {
  document.body.classList.add('darkmode');
  triggerChecked.checked = true;
  localStorage.setItem('darkMode', 'enable');
};

const disableDarkMode = () => {
  document.body.classList.remove('darkmode');
  localStorage.setItem('darkMode', null);
};

if (darkMode === 'enable') {
  enableDarkMode();
}

for (let i = 0; i < darkModeToggle.length; i++) {
  darkModeToggle[i].addEventListener('click', () => {
    darkMode = localStorage.getItem('darkMode');

    if (darkMode !== 'enable') {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });
};
