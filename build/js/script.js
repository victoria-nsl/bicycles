/* eslint-disable no-unused-vars */
const REGULAR_EXPRESSION_PHONE =/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

const navigationMain = document.querySelector('.main-navigation');
const navigationToggle = navigationMain.querySelector('.main-navigation__toggle');
const navigationList = navigationMain.querySelector('.main-navigation__list');

const form = document.querySelector('.promo__form');
const userInputPhone = form.querySelector('#tel');
const userInputName = form.querySelector('#customer-name');

/*======ОТКРЫТИЕ/ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ============*/
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

/*=====ПЕРЕХОД ПО ССЫЛКЕ ИЗ МЕНЮ В ПЛАНШЕТНОЙ/МОБИЛЬНОЙ ВЕРСИИ============*/
navigationList.addEventListener('click', (evt) => {
  if(evt.target.matches('a')) {
    if (navigationMain.classList.contains('main-navigation--opened')) {
      navigationMain.classList.remove('main-navigation--opened');
      navigationMain.classList.add('main-navigation--closed');
    }
  }
});

/*======ПРОВЕРКА LocalStorage============*/

let isStorageSupport = true;
let storageTel = '';
let storageName = '';

try {
  storageTel = localStorage.getItem('tel');
  storageName = localStorage.getItem('name');

} catch (err) {
  isStorageSupport = false;
}

form.addEventListener('submit', (evt)  => {
  if(!userInputPhone.value || !userInputName.value) {
    evt.preventDefault();

  }  else {
    if(isStorageSupport) {
      localStorage.setItem('tel',  userInputPhone.value);
      localStorage.setItem('name', userInputName.value);
    }
  }
});

/*======ВАЛИДАЦИЯ ПОЛЯ ТЕЛЕФОН============*/

const checkInputPhone = (inputText) => {
  if(!REGULAR_EXPRESSION_PHONE.test(inputText.value)) {
    inputText.setCustomValidity(
      'Номер телефона содержит только цифры, пробелы, символы: - () +');
  } else {
    inputText.setCustomValidity('');
  }
  inputText.reportValidity();
};

userInputPhone.addEventListener('input',(evt) => {
  checkInputPhone(evt.target);
});
