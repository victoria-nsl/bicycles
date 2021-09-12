const REGULAR_EXPRESSION_PHONE =/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

const navigationMain = document.querySelector('.main-navigation');
const navigationToggle = navigationMain.querySelector('.main-navigation__toggle');
const anchorsLinks = navigationMain.querySelectorAll('.main-navigation__list a[href*="#"]');

const form = document.querySelector('.promo__form');
const userInputPhone = form.querySelector('#tel');
const userInputName = form.querySelector('#customer-name');

/*======ОТКРЫТИЕ/ЗАКРЫТИЕ МОБИЛЬНОГО МЕНЮ и ПЛАВНАЯ ПРОКРУТКА СТРАНИЦЫ ДО ЯКОРЯ============*/
if (navigationMain) {

  navigationMain.classList.remove('main-navigation--nojs');

  const closeMenu = () => {
    navigationMain.classList.add('main-navigation--closed');
    navigationMain.classList.remove('main-navigation--opened');
  };

  const openMenu = () => {
    navigationMain.classList.remove('main-navigation--closed');
    navigationMain.classList.add('main-navigation--opened');
  };

  navigationToggle.addEventListener('click', () => {
    if (navigationMain.classList.contains('main-navigation--closed')) {
      openMenu();
      return;
    }
    closeMenu();
  });

  anchorsLinks.forEach((anchorLink) => {
    anchorLink.addEventListener('click', (evt) => {
      evt.preventDefault();

      const blockId = anchorLink.getAttribute('href').substr(1);

      document.getElementById(blockId).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      if (navigationMain.classList.contains('main-navigation--opened')) {
        closeMenu();
      }
    });
  });

}

/*======ПРОВЕРКА LocalStorage============*/
if (form) {

  let isStorageSupport = true;
  let storageTel = '';
  let storageName = '';

  try {
    storageTel = localStorage.getItem('tel');
    storageName = localStorage.getItem('name');

  } catch (err) {
    isStorageSupport = false;
  }

  if (storageName || storageTel) {
    userInputPhone.value = storageTel || '';
    userInputName.value = storageName || '' ;
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
}


/*======ВАЛИДАЦИЯ ПОЛЯ ТЕЛЕФОН============*/

const checkInputPhone = (inputText) => {
  if(!REGULAR_EXPRESSION_PHONE.test(inputText.value)) {
    inputText.setCustomValidity('Заполните номер телефона. Номер должен содержать только цифры, пробелы, символы: - () +');
  } else {
    inputText.setCustomValidity('');
  }
  inputText.reportValidity();
};

if (userInputPhone) {
  userInputPhone.addEventListener('input',(evt) => {
    checkInputPhone(evt.target);
  });
}

