const newGameTab = document.querySelector('.js-new-game');
const archiveTab = document.querySelector('.js-archive');
const newGameContent = document.querySelector('#new-game');
const archiveContent = document.querySelector('#archive');

newGameTab.addEventListener('click', () => {
  archiveTab.classList.remove('underline');
  newGameTab.classList.add('underline');
  archiveContent.classList.remove('is-show');
  newGameContent.classList.add('is-show');
});

archiveTab.addEventListener('click', () => {
  newGameTab.classList.remove('underline');
  archiveTab.classList.add('underline');
  newGameContent.classList.remove('is-show');
  archiveContent.classList.add('is-show');
});