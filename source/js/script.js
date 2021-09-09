const navigationMain = document.querySelector('.main-navigation');
const navigationToggle = navigationMain.querySelector('.main-navigation__toggle');
const navigationList = navigationMain.querySelector('.main-navigation__list');

navigationMain.classList.remove('main-navigation--nojs');

navigationToggle.addEventListener('click', () => {
  if (navigationMain.classList.contains('main-navigation--closed')) {
    navigationMain.classList.remove('main-navigation--closed');
    navigationMain.classList.add('main-navigation--opened');
    return;
  }

  navigationMain.classList.add('main-navigation--closed');
  navigationMain.classList.remove('main-navigation--opened');
});

navigationList.addEventListener('click', () => {
  if (navigationMain.classList.contains('main-navigation--opened')) {
    navigationMain.classList.remove('main-navigation--opened');
    navigationMain.classList.add('main-navigation--closed');
  }
});
